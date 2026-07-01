-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name_ar" TEXT NOT NULL,
    "inspired_by" TEXT NOT NULL,
    "main_category" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "fragrance_family_raw" TEXT NOT NULL,
    "short_description_ar" TEXT NOT NULL,
    "keywords_ar" TEXT NOT NULL,
    "image_filename" TEXT NOT NULL,
    "needs_image" BOOLEAN NOT NULL DEFAULT true,
    "visible_on_website" BOOLEAN NOT NULL,
    "featured_on_frontend" BOOLEAN NOT NULL,
    "uses_general_pricing" BOOLEAN NOT NULL,
    "price_50ml_fils" INTEGER,
    "price_100ml_fils" INTEGER,
    "price_200ml_fils" INTEGER,
    "notes" TEXT,
    "research_confidence" TEXT NOT NULL,
    "needs_review" BOOLEAN NOT NULL DEFAULT false,
    "source_excel_row" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProductAccord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "name_ar" TEXT NOT NULL,
    "strength" INTEGER NOT NULL,
    CONSTRAINT "ProductAccord_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductFamilyTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "tag_ar" TEXT NOT NULL,
    CONSTRAINT "ProductFamilyTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GlobalPricingSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price_50ml_fils" INTEGER NOT NULL,
    "price_100ml_fils" INTEGER NOT NULL,
    "price_200ml_fils" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'JOD',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_source_excel_row_key" ON "Product"("source_excel_row");

-- CreateIndex
CREATE INDEX "Product_slug_idx" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_sku_idx" ON "Product"("sku");

-- CreateIndex
CREATE INDEX "Product_source_excel_row_idx" ON "Product"("source_excel_row");

-- CreateIndex
CREATE INDEX "Product_visible_on_website_idx" ON "Product"("visible_on_website");

-- CreateIndex
CREATE INDEX "Product_featured_on_frontend_idx" ON "Product"("featured_on_frontend");

-- CreateIndex
CREATE INDEX "Product_gender_idx" ON "Product"("gender");

-- CreateIndex
CREATE INDEX "Product_season_idx" ON "Product"("season");

-- CreateIndex
CREATE INDEX "Product_main_category_idx" ON "Product"("main_category");

-- CreateIndex
CREATE INDEX "Product_needs_review_idx" ON "Product"("needs_review");

-- CreateIndex
CREATE INDEX "ProductAccord_name_ar_idx" ON "ProductAccord"("name_ar");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAccord_productId_position_key" ON "ProductAccord"("productId", "position");

-- CreateIndex
CREATE INDEX "ProductFamilyTag_tag_ar_idx" ON "ProductFamilyTag"("tag_ar");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFamilyTag_productId_tag_ar_key" ON "ProductFamilyTag"("productId", "tag_ar");
