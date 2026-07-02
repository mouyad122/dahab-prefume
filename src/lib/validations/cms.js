import { z } from 'zod';

export const siteSettingsSchema = z.object({
  settings: z.array(
    z.object({
      key: z.string().min(1, 'Key is required'),
      value: z.any().transform(v => String(v)), // Store as string in DB
      value_type: z.enum(['string', 'number', 'boolean', 'json', 'color', 'url']).default('string'),
      category: z.enum(['colors', 'content', 'social', 'hours', 'general', 'branding', 'contact', 'hero', 'layout']).default('general'),
      label_ar: z.string().optional(),
      label_en: z.string().optional(),
    })
  ).min(1, 'Settings array cannot be empty')
});
