ALTER TABLE "Product" ADD COLUMN "media_display_type" TEXT NOT NULL DEFAULT 'normal';
ALTER TABLE "Product" ADD COLUMN "ai360_status" TEXT NOT NULL DEFAULT 'idle';
ALTER TABLE "Product" ADD COLUMN "ai360_quality" INTEGER NOT NULL DEFAULT 12;
ALTER TABLE "Product" ADD COLUMN "ai360_background" TEXT NOT NULL DEFAULT 'luxury_black_gold';
ALTER TABLE "Product" ADD COLUMN "ai360_lighting" TEXT NOT NULL DEFAULT 'soft_gold';
ALTER TABLE "Product" ADD COLUMN "ai360_source_image" TEXT;
ALTER TABLE "Product" ADD COLUMN "ai360_reference_image" TEXT;
