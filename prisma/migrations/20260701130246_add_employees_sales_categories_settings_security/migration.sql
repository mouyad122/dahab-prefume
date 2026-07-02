-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name_ar" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "description_ar" TEXT,
    "description_en" TEXT,
    "image" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "discount_type" TEXT NOT NULL DEFAULT 'percentage',
    "discount_value" REAL NOT NULL,
    "original_price" INTEGER NOT NULL,
    "discounted_price" INTEGER NOT NULL,
    "starts_at" DATETIME,
    "ends_at" DATETIME,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "label_ar" TEXT,
    "label_en" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'employee',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EmployeePermission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "can_access_counter" BOOLEAN NOT NULL DEFAULT true,
    "can_view_invoices" BOOLEAN NOT NULL DEFAULT true,
    "can_print_reports" BOOLEAN NOT NULL DEFAULT true,
    "can_add_notes" BOOLEAN NOT NULL DEFAULT true,
    "can_view_inventory" BOOLEAN NOT NULL DEFAULT false,
    "can_manage_products" BOOLEAN NOT NULL DEFAULT false,
    "can_manage_employees" BOOLEAN NOT NULL DEFAULT false,
    "can_view_accounting" BOOLEAN NOT NULL DEFAULT false,
    "can_view_settings" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "EmployeePermission_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoice_number" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "discount_total" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "amount_received" INTEGER NOT NULL DEFAULT 0,
    "change_amount" INTEGER NOT NULL DEFAULT 0,
    "payment_method" TEXT NOT NULL DEFAULT 'cash',
    "status" TEXT NOT NULL DEFAULT 'completed',
    "notes" TEXT,
    "employee_note" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Sale_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SaleItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "saleId" TEXT NOT NULL,
    "productId" TEXT,
    "product_name_ar" TEXT NOT NULL,
    "product_name_en" TEXT,
    "product_sku" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "volume" TEXT,
    CONSTRAINT "SaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SaleItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "value_type" TEXT NOT NULL DEFAULT 'string',
    "category" TEXT NOT NULL DEFAULT 'general',
    "label_ar" TEXT,
    "label_en" TEXT,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip_address" TEXT NOT NULL,
    "username" TEXT,
    "user_type" TEXT NOT NULL DEFAULT 'admin',
    "success" BOOLEAN NOT NULL DEFAULT false,
    "employeeId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LoginAttempt_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SecurityEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip_address" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "details" TEXT,
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,
    "expires_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name_ar" TEXT NOT NULL,
    "name_en" TEXT,
    "inspired_by" TEXT,
    "main_category" TEXT NOT NULL DEFAULT 'general',
    "gender" TEXT NOT NULL DEFAULT 'unisex',
    "season" TEXT NOT NULL DEFAULT 'all',
    "fragrance_family_raw" TEXT NOT NULL DEFAULT '',
    "short_description_ar" TEXT NOT NULL DEFAULT '',
    "short_description_en" TEXT,
    "long_description_ar" TEXT,
    "long_description_en" TEXT,
    "keywords_ar" TEXT NOT NULL DEFAULT '',
    "image_filename" TEXT NOT NULL DEFAULT '',
    "images_360" TEXT,
    "needs_image" BOOLEAN NOT NULL DEFAULT true,
    "visible_on_website" BOOLEAN NOT NULL DEFAULT true,
    "featured_on_frontend" BOOLEAN NOT NULL DEFAULT false,
    "uses_general_pricing" BOOLEAN NOT NULL DEFAULT true,
    "price_50ml_fils" INTEGER,
    "price_100ml_fils" INTEGER,
    "price_200ml_fils" INTEGER,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "low_stock_threshold" INTEGER NOT NULL DEFAULT 5,
    "notes_top" TEXT,
    "notes_heart" TEXT,
    "notes_base" TEXT,
    "notes" TEXT,
    "research_confidence" TEXT NOT NULL DEFAULT 'medium',
    "needs_review" BOOLEAN NOT NULL DEFAULT false,
    "source_excel_row" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "categoryId" TEXT,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("created_at", "featured_on_frontend", "fragrance_family_raw", "gender", "id", "image_filename", "inspired_by", "keywords_ar", "main_category", "name_ar", "needs_image", "needs_review", "notes", "price_100ml_fils", "price_200ml_fils", "price_50ml_fils", "research_confidence", "season", "short_description_ar", "sku", "slug", "source_excel_row", "updated_at", "uses_general_pricing", "visible_on_website") SELECT "created_at", "featured_on_frontend", "fragrance_family_raw", "gender", "id", "image_filename", "inspired_by", "keywords_ar", "main_category", "name_ar", "needs_image", "needs_review", "notes", "price_100ml_fils", "price_200ml_fils", "price_50ml_fils", "research_confidence", "season", "short_description_ar", "sku", "slug", "source_excel_row", "updated_at", "uses_general_pricing", "visible_on_website" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_source_excel_row_key" ON "Product"("source_excel_row");
CREATE INDEX "Product_slug_idx" ON "Product"("slug");
CREATE INDEX "Product_sku_idx" ON "Product"("sku");
CREATE INDEX "Product_visible_on_website_idx" ON "Product"("visible_on_website");
CREATE INDEX "Product_featured_on_frontend_idx" ON "Product"("featured_on_frontend");
CREATE INDEX "Product_gender_idx" ON "Product"("gender");
CREATE INDEX "Product_season_idx" ON "Product"("season");
CREATE INDEX "Product_main_category_idx" ON "Product"("main_category");
CREATE INDEX "Product_needs_review_idx" ON "Product"("needs_review");
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_is_active_idx" ON "Category"("is_active");

-- CreateIndex
CREATE INDEX "Discount_productId_idx" ON "Discount"("productId");

-- CreateIndex
CREATE INDEX "Discount_is_active_idx" ON "Discount"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "Employee"("username");

-- CreateIndex
CREATE INDEX "Employee_username_idx" ON "Employee"("username");

-- CreateIndex
CREATE INDEX "Employee_is_active_idx" ON "Employee"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeePermission_employeeId_key" ON "EmployeePermission"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_invoice_number_key" ON "Sale"("invoice_number");

-- CreateIndex
CREATE INDEX "Sale_employeeId_idx" ON "Sale"("employeeId");

-- CreateIndex
CREATE INDEX "Sale_status_idx" ON "Sale"("status");

-- CreateIndex
CREATE INDEX "Sale_created_at_idx" ON "Sale"("created_at");

-- CreateIndex
CREATE INDEX "Sale_invoice_number_idx" ON "Sale"("invoice_number");

-- CreateIndex
CREATE INDEX "SaleItem_saleId_idx" ON "SaleItem"("saleId");

-- CreateIndex
CREATE INDEX "SaleItem_productId_idx" ON "SaleItem"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSettings_key_key" ON "SiteSettings"("key");

-- CreateIndex
CREATE INDEX "SiteSettings_key_idx" ON "SiteSettings"("key");

-- CreateIndex
CREATE INDEX "SiteSettings_category_idx" ON "SiteSettings"("category");

-- CreateIndex
CREATE INDEX "LoginAttempt_ip_address_idx" ON "LoginAttempt"("ip_address");

-- CreateIndex
CREATE INDEX "LoginAttempt_created_at_idx" ON "LoginAttempt"("created_at");

-- CreateIndex
CREATE INDEX "LoginAttempt_user_type_idx" ON "LoginAttempt"("user_type");

-- CreateIndex
CREATE INDEX "SecurityEvent_ip_address_idx" ON "SecurityEvent"("ip_address");

-- CreateIndex
CREATE INDEX "SecurityEvent_is_blocked_idx" ON "SecurityEvent"("is_blocked");

-- CreateIndex
CREATE INDEX "SecurityEvent_created_at_idx" ON "SecurityEvent"("created_at");
