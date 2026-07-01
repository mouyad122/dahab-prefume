# DEPLOYMENT GUIDE
### DAHAB PERFUMES — Next.js Production & Staging Rollout

This guide outlines the steps to deploy the DAHAB PERFUMES application as a demo preview and prepare it for production deployment.

---

## 1. Recommended Deployment Platform: Vercel
Since DAHAB PERFUMES is built on Next.js, **Vercel** is the recommended hosting platform. It provides native support for Next.js features, dynamic edge routing, automatic SSL certificates, global CDN caching, and instant static site generation (SSG) rebuilds.

---

## 2. Preparing the Build

Before deploying, verify that the project builds successfully on your local system:
- **Build Command**: `npm run build`
- **Expected Output**: Renders dynamic routes and static pages (38/38) with zero errors or bundle warnings.

---

## 3. Environment Variables Setup
Vercel allows you to define environment variables in the project settings panel. Configure these key parameters:

| Variable Name | Purpose | Example Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | The public base URL for canonical tags | `https://dahabperfume.com` |
| `NEXT_PUBLIC_DEMO_ADMIN_EMAIL` | Admin login user | `admin` |
| `NEXT_PUBLIC_DEMO_ADMIN_PASSWORD` | Admin login password | `dahab101` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Store WhatsApp number | `962785050655` |

*Refer to [ENVIRONMENT_VARIABLES.md](file:///c:/Users/DELL%205500/OneDrive/Desktop/perfume/ENVIRONMENT_VARIABLES.md) for more details.*

---

## 4. Deploying to Vercel (Step-by-Step)

### Option A: Via GitHub Integration (Recommended)
1. Push the code repository to a private GitHub, GitLab, or Bitbucket repository.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New** > **Project**.
3. Import your code repository.
4. Expand **Environment Variables** and enter the variables listed in Section 3.
5. Click **Deploy**. Vercel will build the project and provide a secure URL (e.g. `dahab-perfumes.vercel.app`).

### Option B: Via Vercel CLI
If you prefer deploying directly from the command line:
1. Install Vercel globally: `npm install -g vercel`
2. Run `vercel login` and follow the authentication prompts.
3. Navigate to the project root and run: `vercel`
4. Set up the project configuration and deploy.

---

## 5. Domain Configuration (`dahabperfume.com`)

Once the staging deployment is approved, route the custom domain:
1. In your Vercel Dashboard, go to **Settings** > **Domains**.
2. Type `dahabperfume.com` and click **Add**.
3. Vercel will display the required DNS records:

### Recommended DNS Configurations

| Record Type | Host / Name | Value | TTL |
|---|---|---|---|
| **A Record** | `@` (Root) | `76.76.21.21` (Vercel IP) | Auto / 3600 |
| **CNAME Record** | `www` | `cname.vercel-dns.com` | Auto / 3600 |

4. Access your domain registrar control panel (e.g. GoDaddy, Namecheap) and input these records.
5. Vercel will automatically generate a secure **Let's Encrypt SSL Certificate** for the domain within a few minutes of DNS propagation.

---

## 6. Post-Deployment SEO Verification

### 1. Verify Robots & Sitemap
- Open `https://dahabperfume.com/robots.txt` in your browser. Verify it disallows `/admin` routes and references the sitemap.
- Open `https://dahabperfume.com/sitemap.xml` in your browser. Verify it includes all static paths, category collections, and the 9 dynamic products.

### 2. Verify Social Previews
- Use the [Meta Tags Validator](https://metatags.io/) or Facebook Sharing Debugger to test link card previews.
- Input your product URLs (e.g. `https://dahabperfume.com/products/eragon-100ml`) to verify that the product image, title, and description display correctly.

### 3. Google Search Console
- Log in to [Google Search Console](https://search.google.com/search-console).
- Add the property `https://dahabperfume.com`.
- Go to **Sitemaps** and input `sitemap.xml` to submit it for indexing.

---

## 7. Delivery Handoff Checklist
- Confirm that the cart slides open on all viewports.
- Verify checkout redirects to the success page.
- Test WhatsApp confirmation message templates.
- Confirm `/admin` redirects to login when accessed directly.
