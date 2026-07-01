# 09. API ARCHITECTURE

This document maps out the backend API specifications, request validation schemas, and security requirements.

---

## 1. Authentication Endpoints

### POST `/api/auth/login`
* **Access:** Public.
* **Payload Request:**
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "token": "eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "username": "admin"
    }
  }
  ```
* **Failure Response (401 Unauthorized):**
  ```json
  {
    "success": false,
    "message": "Invalid username or password"
  }
  ```

---

## 2. Public Catalog APIs

### GET `/api/products`
* **Access:** Public.
* **Query Parameters:**
  - `category` (optional): `hair-mists | oriental-perfumes | private-collection`
  - `search` (optional): string keyword
  - `sort` (optional): `featured | newest | price_asc | price_desc | bestseller`
* **Success Response (200 OK):** Returns a list of available (non-hidden, non-archived) products with metrics and note arrays.

### GET `/api/products/:slug`
* **Access:** Public.
* **Success Response (200 OK):** Returns full product details, fragrance note arrays, and stock status.
* **Failure Response (404 Not Found):** Returns a "Product not found" message.

---

## 3. Order & Checkout APIs

### POST `/api/orders`
* **Access:** Public (Guest Checkout).
* **Payload Request (Validates with Zod schema):**
  ```json
  {
    "name": "Mohammad Ahmad",
    "phone": "0791234567",
    "city": "amman",
    "address": "Gardens Street, Building 14, 2nd Floor",
    "notes": "Please call before arrival",
    "items": [
      {
        "productId": "hair-mist-dahab",
        "quantity": 2
      }
    ]
  }
  ```
* **Server-side Validation Rules:**
  - `name`: String, minimum 3 characters.
  - `phone`: Regex validation matching Jordanian prefixes (`077`, `078`, `079`) followed by exactly 7 digits.
  - `city`: Enum value (`amman`, `zarqa`, `irbid`, `salt`, `aqaba`, `other`).
  - `address`: Detailed address string, minimum 8 characters.
  - `items`: Array cannot be empty. For each item, the requested quantity must be greater than 0 and less than or equal to the current database stock level.
* **Success Response (201 Created):** Calculates totals, deducts inventory levels, registers the invoice, and returns the formatted order structure.

---

## 4. Admin Management APIs

### GET `/api/admin/orders`
* **Access:** Authenticated Admin only.
* **Success Response (200 OK):** Returns the full order history ledger.

### PUT `/api/admin/orders/:id/status`
* **Access:** Authenticated Admin only.
* **Payload Request:**
  ```json
  {
    "status": "confirmed"
  }
  ```
* **Success Response (200 OK):** Updates the database status log and returns the updated order data.

### POST `/api/admin/products`
* **Access:** Authenticated Admin only.
* **Request Validation:** Ensures all required fields (SKU, title, price, descriptions, initial stock) are present.
* **Success Response (201 Created):** Creates the new product record and seeds its initial inventory.

### PUT `/api/admin/products/:id`
* **Access:** Authenticated Admin only.
* **Success Response (200 OK):** Updates fields and saves changes to the database.

### DELETE `/api/admin/products/:id`
* **Access:** Authenticated Admin only.
* **Success Response (200 OK):** Sets the product's `archived` flag to `true` (soft delete).
