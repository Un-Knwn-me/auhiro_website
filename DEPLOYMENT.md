# Auhiro Motors - Deployment Guide

## Architecture Overview

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend & Backend | Next.js 14 (App Router) | Server-side rendering, API routes |
| Database | Supabase PostgreSQL | Data storage, managed PostgreSQL |
| Hosting | AWS Amplify | Next.js deployment, CI/CD |
| CDN | AWS CloudFront (via Amplify) | Global content delivery |

---

## Prerequisites

- Node.js 18+ installed locally
- AWS Account with appropriate permissions
- Supabase Account (free tier available)
- Git repository (GitHub/GitLab/CodeCommit)

---

## Step 1: Supabase Database Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Fill in:
   - **Name**: `auhiro-motors`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., `ap-south-1` for India)
4. Click **"Create new project"** and wait for setup

### 1.2 Get Database Connection String

1. Go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **URI** tab
4. Copy the connection string:
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
5. Replace `[password]` with your database password

### 1.3 Configure for Prisma

For Prisma with Supabase, use the **Transaction pooler** connection (port 6543):

```env
# .env.local
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

### 1.4 Push Database Schema

```bash
cd auhiro_website

# Push schema to Supabase
npx prisma db push

# Generate Prisma client
npx prisma generate

# (Optional) View data in Prisma Studio
npx prisma studio
```

---

## Step 2: Configure Environment Variables

### 2.1 Local Development (.env.local)

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Auhiro Motors"

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER="+919876543210"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Microsoft Clarity (Heatmaps)
NEXT_PUBLIC_CLARITY_PROJECT_ID=""
```

### 2.2 Production Environment Variables

Generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## Step 3: AWS Amplify Deployment

### 3.1 Prepare Repository

1. Initialize git (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/auhiro-website.git
   git branch -M main
   git push -u origin main
   ```

### 3.2 Create AWS Amplify App

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **"Create new app"**
3. Select **"Host web app"**
4. Choose **GitHub** and authorize AWS Amplify
5. Select your repository and branch (`main`)
6. Amplify will auto-detect Next.js - verify build settings

### 3.3 Configure Build Settings

Amplify should auto-detect Next.js. If not, use this `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
        - npx prisma generate
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

Create `amplify.yml` in project root if needed.

### 3.4 Add Environment Variables in Amplify

1. In Amplify Console, go to your app
2. Navigate to **Hosting** → **Environment variables**
3. Add the following variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Supabase connection string (with pgbouncer) |
| `DIRECT_URL` | Your Supabase direct connection string |
| `NEXTAUTH_URL` | `https://your-app.amplifyapp.com` (or custom domain) |
| `NEXTAUTH_SECRET` | Your generated secret |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.amplifyapp.com` |
| `NEXT_PUBLIC_SITE_NAME` | `Auhiro Motors` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `+919876543210` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Your GA4 ID |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Your Clarity ID |

### 3.5 Deploy

1. Click **"Save and deploy"**
2. Wait for build to complete (first build takes longer)
3. Access your app at the Amplify URL

---

## Step 4: Custom Domain (Optional)

### 4.1 Add Domain in Amplify

1. Go to **Hosting** → **Domain management**
2. Click **"Add domain"**
3. Enter your domain (e.g., `auhiromotors.com`)
4. Configure subdomains as needed

### 4.2 Update DNS

Add the CNAME records provided by Amplify to your domain registrar.

### 4.3 Update Environment Variables

After domain is configured, update:
- `NEXTAUTH_URL` → `https://auhiromotors.com`
- `NEXT_PUBLIC_SITE_URL` → `https://auhiromotors.com`

---

## Step 5: Create Admin User

### Option 1: Using Prisma Studio

```bash
npx prisma studio
```

Then manually create a user in the `User` table.

### Option 2: Using Supabase Dashboard

1. Go to Supabase Dashboard → **Table Editor**
2. Select `User` table
3. Click **"Insert"** and add admin user

### Option 3: Using Script

Create `scripts/create-admin.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('your-password', 12);

  const user = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@auhiromotors.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run it:
```bash
npx ts-node scripts/create-admin.ts
```

---

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (localhost:3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server locally |
| `npm run lint` | Run ESLint |
| `npx prisma db push` | Push schema changes to database |
| `npx prisma generate` | Regenerate Prisma client |
| `npx prisma studio` | Open database GUI |
| `npx prisma migrate dev` | Create and apply migrations |

---

## Production Deployment Workflow

### Automatic Deployment (CI/CD)

With Amplify connected to GitHub:
1. Push changes to `main` branch
2. Amplify automatically builds and deploys
3. Check build status in Amplify Console

### Manual Deployment

```bash
# Build locally
npm run build

# Push to trigger deployment
git add .
git commit -m "Update: description of changes"
git push origin main
```

---

## Monitoring & Logs

### AWS Amplify Logs

1. Go to Amplify Console → Your App
2. Click on **"Hosting"** → **"Monitoring"**
3. View access logs and build logs

### Supabase Logs

1. Go to Supabase Dashboard → **Logs**
2. View database queries and API logs

---

## Cost Estimate

| Service | Free Tier | Paid (Estimated) |
|---------|-----------|------------------|
| **AWS Amplify** | 1000 build mins/mo, 15GB hosting | ~$5-15/month |
| **Supabase** | 500MB database, 1GB storage | $25/month (Pro) |
| **Domain** | - | ~$12/year |
| **Total** | **Free to start** | **~$30-40/month at scale** |

---

## Troubleshooting

### Database Connection Issues

```bash
# Test connection locally
npx prisma db pull
```

If connection fails:
- Verify DATABASE_URL is correct
- Check Supabase project is active
- Ensure IP is not blocked (Supabase allows all IPs by default)

### Build Failures on Amplify

1. Check build logs in Amplify Console
2. Common issues:
   - Missing environment variables
   - Prisma client not generated (`npx prisma generate`)
   - Node version mismatch

### Prisma Client Issues

```bash
# Regenerate client
rm -rf node_modules/.prisma
npx prisma generate
```

### Environment Variable Not Available

For `NEXT_PUBLIC_*` variables:
- Must be set before build (not runtime)
- Trigger a new build after adding them

---

## Security Checklist

- [ ] NEXTAUTH_SECRET is a strong random value
- [ ] Database password is secure and not committed
- [ ] .env files are in .gitignore
- [ ] Admin passwords are strong
- [ ] CORS is configured correctly (if needed)
- [ ] Rate limiting is enabled for API routes (consider adding)

---

## Next Steps After Deployment

1. **Test all pages** - Home, Products, Contact forms
2. **Create admin account** - Login to `/admin`
3. **Add products** - Use admin panel to add vehicles
4. **Configure analytics** - Add GA4 and Clarity IDs
5. **Set up monitoring** - CloudWatch alerts (optional)
6. **Backup strategy** - Supabase has automatic backups on paid plans
