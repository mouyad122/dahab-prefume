'use client';
import { useState, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import LuxuryButton from '../ui/LuxuryButton';

export default function ImageUpload({ value, onChange, label = 'Image', className = '' }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (e.g. 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage bucket named 'images'
      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Pass URL back to parent
      onChange(publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-300">{label}</label>
      
      <div className="flex items-start gap-4">
        {/* Preview Area */}
        <div className="relative w-32 h-32 flex-shrink-0 bg-gray-800/50 rounded-xl border border-gray-700/50 flex items-center justify-center overflow-hidden group">
          {value ? (
            <>
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <LuxuryButton
                type="button"
                variant="icon"
                onClick={handleRemove}
                className="absolute top-1 right-1 !w-6 !h-6 !min-h-0 !min-w-0 !p-1 bg-red-500/80 hover:!bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
                aria-label="Remove image"
              >
                <X size={14} />
              </LuxuryButton>
            </>
          ) : (
            <ImageIcon size={32} className="text-gray-500" />
          )}
          
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <Loader2 className="w-6 h-6 text-[var(--color-gold)] animate-spin" />
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex flex-col justify-center gap-2 h-32">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
            id={`image-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          
          <LuxuryButton
            type="button"
            variant="admin"
            size="sm"
            onClick={() => document.getElementById(`image-upload-${label.replace(/\s+/g, '-').toLowerCase()}`).click()}
            className="w-fit"
            iconLeft={(props) => <Upload size={16} {...props} />}
          >
            {isUploading ? 'Uploading...' : (value ? 'Change Image' : 'Upload Image')}
          </LuxuryButton>
          
          <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
            Supported formats: JPG, PNG, WEBP. Max size: 5MB.
          </p>
          
          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
