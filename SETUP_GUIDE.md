# Kinn Authentication & Payment Setup Guide

This guide will help you set up Supabase authentication and Stripe payments for the Kinn application.

## Prerequisites

- Node.js 18+ installed
- Git installed
- A Vercel account (for deployment)
- A Supabase account
- A Stripe account

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: kinn
   - **Database Password**: Choose a strong password (save this)
   - **Region**: Choose closest to your users

### 1.2 Get Your Supabase Keys

1. Go to Project Settings → API
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret)

### 1.3 Enable Email Authentication

1. Go to Authentication → Providers
2. Find "Email" and enable it
3. Go to Authentication → Email Templates
4. Update the confirmation template to use your app URL

### 1.4 Create Database Tables

1. Go to SQL Editor
2. Run the SQL from `/scripts/01-create-tables.sql`
3. Tables created: `user_profiles`, `forms`, `payments`, `subscriptions`

## Step 2: Stripe Setup

### 2.1 Create a Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for an account
3. Complete identity verification

### 2.2 Get Your Stripe Keys

1. Go to Developers → API keys
2. Copy these values:
   - **Publishable Key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret Key** → `STRIPE_SECRET_KEY` (keep secret)

### 2.3 Create Stripe Price IDs

You need to create prices for each tier:

1. Go to Products → Create a product
2. Fill in the product details (e.g., "DIY Probate Kit")
3. Add pricing (e.g., $299)
4. Copy the Price ID

**Create prices for:**
- DIY Probate Kit - $299 → `price_diy_kit`
- AI-Powered Probate - $999 → `price_ai_probate`
- Concierge Probate - $1,999 → `price_concierge`
- Full Service - $3,499 → `price_full_service`
- Premium - $6,999+ → `price_premium`

### 2.4 Setup Webhook

1. Go to Developers → Webhooks
2. Click "Add endpoint"
3. Set URL to: `https://yourdomain.com/api/payments/webhook`
4. Select events: `checkout.session.completed`, `charge.refunded`
5. Copy the Signing Secret → `STRIPE_WEBHOOK_SECRET`

## Step 3: Environment Variables

Create a `.env.local` file in the root directory with:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## Step 4: Update Pricing Page

In `/app/pricing/page.tsx`, replace the `stripePriceId` values with your actual Stripe Price IDs:

\`\`\`typescript
stripePriceId: "price_1ABC123DEF456" // Replace with your actual Price ID
\`\`\`

## Step 5: Run Locally

\`\`\`bash
# Install dependencies
npm install

# Create database tables
# Run the SQL from /scripts/01-create-tables.sql in your Supabase SQL editor

# Start development server
npm run dev
\`\`\`

Visit `http://localhost:3000` and test:

1. Sign up at `/auth/signup`
2. Login at `/auth/login`
3. Check pricing at `/pricing`
4. Submit forms at `/dashboard/forms/new`

## Step 6: Deploy to Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel Settings → Environment Variables
4. Deploy
5. Update Stripe webhook URL to production domain
6. Update `NEXT_PUBLIC_APP_URL` to your production URL

## Testing Stripe Payments

Use Stripe test cards:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date and CVC

## Troubleshooting

### "No user found" error
- Ensure user is logged in
- Check Supabase RLS policies are enabled

### Stripe webhook not receiving events
- Verify webhook URL is correct
- Check webhook signing secret
- Ensure app is publicly accessible

### Email verification not working
- Check Supabase email provider settings
- Verify email template URL
- Ensure email is configured in Authentication

## API Endpoints

- `POST /api/payments/create-checkout` - Create Stripe checkout session
- `POST /api/payments/webhook` - Handle Stripe webhooks
- `POST /api/forms/submit` - Submit a form
- `GET /api/forms/get` - Retrieve forms

## Security Notes

- Never commit `.env.local` to version control
- Always use Stripe webhook signing verification
- Enable Row Level Security (RLS) on all tables
- Validate all form inputs on the server
- Use HTTPS in production
