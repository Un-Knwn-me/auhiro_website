# EV Showroom Website - Implementation Plan

## Project Overview
Next.js 14 website for an EV two-wheeler showroom (e-cycles, e-scooters, e-mopeds) with full CMS, lead generation, and marketing integrations.

## Tech Stack
| Layer | Technology | Reason |
|-------|------------|--------|
| Framework | Next.js 14 (App Router) | SEO, SSR, ISR for performance |
| Styling | Tailwind CSS + shadcn/ui | Fast development, modern UI |
| Database | PostgreSQL | Relational for product variants |
| ORM | Prisma | Type-safe, easy migrations |
| Auth | NextAuth.js | Admin-only authentication |

### Deployment Options

**Option A: Vercel + Supabase (Recommended for starting)**
| Service | Purpose | Cost |
|---------|---------|------|
| Vercel | Hosting | Free tier (100GB bandwidth) |
| Supabase | PostgreSQL + Storage + Auth | Free tier (500MB DB) |

**Option B: AWS (For enterprise scale)**
| Service | Purpose | Cost |
|---------|---------|------|
| AWS Amplify | Next.js hosting | ~$0.01/build minute + $0.15/GB |
| Amazon RDS (PostgreSQL) | Database | ~$15/month (db.t3.micro) |
| Amazon S3 | Image storage | ~$0.023/GB |
| Amazon CloudFront | CDN | ~$0.085/GB |
| Amazon SES | Email (leads) | $0.10/1000 emails |

*AWS Free Tier includes: 12 months of RDS, S3 5GB, CloudFront 1TB/month*

## Database Schema

```
Product
├── id, name, slug, description, category (e-cycle/e-scooter/e-moped)
├── basePrice, specifications (JSON), features (JSON)
├── seoTitle, seoDescription, seoKeywords
└── createdAt, updatedAt

ProductVariant
├── id, productId (FK), name, price
├── motorPower, batteryCapacity, range, topSpeed
├── weight, chargingTime
└── isDefault

ProductColor
├── id, variantId (FK), name, hexCode, images[]

Gallery
├── id, title, description, imageUrl, category, order

Blog
├── id, title, slug, content, excerpt, coverImage
├── author, tags[], publishedAt, seoTitle, seoDescription

Lead
├── id, name, email, phone, productInterest
├── message, source (form/whatsapp), status, createdAt

Contact
├── id, name, email, phone, subject, message, createdAt
```

## Pages Structure

```
/                           # Home - Hero, featured products, testimonials
/products                   # All products grid
/products/[slug]            # Product detail with variant selector
/gallery                    # Image gallery with categories
/blog                       # Blog listing with pagination
/blog/[slug]                # Blog post detail
/about                      # About company, mission, team
/contact                    # Contact form, map, WhatsApp button

/admin                      # Admin dashboard
/admin/products             # Manage products & variants
/admin/gallery              # Manage gallery
/admin/blog                 # Manage blog posts
/admin/leads                # View & manage leads
/admin/settings             # Site settings
```

## Products Configuration (5 Products)

| Product | Variants | Colors per Variant |
|---------|----------|-------------------|
| Product 1 (e.g., City E-Scooter) | 2 variants (Standard, Pro) | 4-5 colors each |
| Product 2 (e.g., Commuter E-Cycle) | 1 variant | 3-4 colors |
| Product 3 (e.g., Sport E-Moped) | 1 variant | 3-4 colors |
| Product 4 (e.g., Fold E-Bike) | 1 variant | 3-4 colors |
| Product 5 (e.g., Premium E-Scooter) | 3 variants (Lite, Plus, Max) | 4-5 colors each |

## Marketing & SEO Features

1. **SEO Optimization**
   - Dynamic meta tags per page
   - JSON-LD structured data (Product, Organization, BreadcrumbList)
   - Sitemap.xml auto-generation
   - robots.txt configuration
   - Open Graph & Twitter cards

2. **Analytics & Tracking**
   - Google Analytics 4 integration
   - Google Tag Manager ready
   - Microsoft Clarity / Hotjar for heatmaps
   - Lead conversion tracking

3. **Lead Generation**
   - Contact forms with validation
   - Product inquiry forms
   - WhatsApp click-to-chat button
   - Lead capture popup (optional)

4. **WhatsApp Integration**
   - Floating WhatsApp button
   - Pre-filled message with product interest
   - Click tracking for analytics

## Project Structure

```
auhiro_motors/
├── prisma/
│   └── schema.prisma
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (site)/              # Public pages
│   │   │   ├── page.tsx         # Home
│   │   │   ├── products/
│   │   │   ├── gallery/
│   │   │   ├── blog/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── admin/               # Admin CMS
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── products/
│   │   │   ├── gallery/
│   │   │   ├── blog/
│   │   │   └── leads/
│   │   ├── api/                 # API routes
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── leads/
│   │   │   └── upload/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                  # shadcn components
│   │   ├── layout/              # Header, Footer, etc.
│   │   ├── products/            # Product cards, variant selector
│   │   ├── forms/               # Contact, lead forms
│   │   └── admin/               # Admin components
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── supabase.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── package.json
└── README.md
```

## Implementation Steps

### Phase 1: Project Setup
1. Initialize Next.js 14 project with TypeScript
2. Configure Tailwind CSS + shadcn/ui
3. Setup Prisma with PostgreSQL
4. Create database schema and run migrations
5. Configure environment variables

### Phase 2: Database & API
1. Create Prisma models
2. Build API routes for CRUD operations
3. Setup image storage
4. Implement NextAuth.js for admin auth

### Phase 3: Public Pages
1. Home page with hero, features, products preview
2. Products listing and detail pages
3. Gallery page with lightbox
4. Blog listing and detail pages
5. About and Contact pages

### Phase 4: Admin CMS
1. Admin layout with sidebar navigation
2. Products management (CRUD + variants + colors)
3. Gallery management
4. Blog management (rich text editor)
5. Leads dashboard

### Phase 5: Integrations
1. Google Analytics 4 setup
2. WhatsApp integration
3. Heatmap tool (Clarity/Hotjar)
4. SEO optimization (meta, sitemap, schema)

### Phase 6: Deployment

**Option A: Vercel + Supabase**
1. Create Supabase project, run migrations
2. Configure Vercel project, link GitHub repo
3. Set environment variables in Vercel
4. Deploy and test

**Option B: AWS**
1. Setup AWS Amplify app, connect GitHub repo
2. Create RDS PostgreSQL instance
3. Create S3 bucket for images + CloudFront CDN
4. Configure environment variables in Amplify
5. Setup custom domain with Route 53 (optional)
6. Deploy and test

## Verification
1. Run `npm run dev` - verify all pages render
2. Test admin login and CRUD operations
3. Submit test lead form
4. Check SEO meta tags in page source
5. Verify WhatsApp button links correctly
6. Run Lighthouse audit for performance/SEO scores
7. Test on mobile devices

## Cost Estimate (Monthly)

**Option A: Vercel + Supabase**
| Service | Free Tier | Paid (if exceeded) |
|---------|-----------|-------------------|
| Vercel | 100GB bandwidth | $20/mo Pro |
| Supabase | 500MB DB, 1GB storage | $25/mo Pro |
| Domain | - | ~$12/year |
| **Total** | **$0-1/month** | **$45+ at scale** |

**Option B: AWS (estimated)**
| Service | Free Tier (12 months) | After Free Tier |
|---------|----------------------|-----------------|
| Amplify | 1000 build mins, 15GB | ~$5-10/month |
| RDS PostgreSQL | db.t3.micro free | ~$15/month |
| S3 + CloudFront | 5GB + 1TB CDN | ~$5/month |
| **Total** | **~$5/month** | **~$25-30/month** |

*Recommendation: Start with Vercel + Supabase, migrate to AWS when scaling*
