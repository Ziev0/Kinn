# Testing Guide for Kinn Authentication & Payments

## Testing Authentication

### 1. Test Sign Up
\`\`\`
URL: http://localhost:3000/auth/signup

1. Click "Sign Up"
2. Fill in:
   - Full Name: John Doe
   - Email: test@example.com
   - Password: TestPass123
   - Confirm Password: TestPass123
3. Click "Sign Up"
4. Should see "Check Your Email" message
5. Check Supabase → Authentication for confirmation email
\`\`\`

### 2. Test Email Verification
\`\`\`
1. In Supabase, go to Authentication → Users
2. Find your test user
3. Click the three dots → Copy "Confirm user"
4. Paste URL in browser
5. Should redirect to dashboard
6. Should see user profile created in Supabase → user_profiles table
\`\`\`

### 3. Test Login
\`\`\`
URL: http://localhost:3000/auth/login

1. Enter email: test@example.com
2. Enter password: TestPass123
3. Click "Sign In"
4. Should redirect to /dashboard
5. Should see user's name and dashboard content
\`\`\`

### 4. Test Logout
\`\`\`
1. In dashboard, click "Sign Out" in sidebar
2. Should redirect to home page
3. Try accessing /dashboard directly
4. Should redirect to /auth/login
\`\`\`

## Testing Forms

### 1. Test Form Submission
\`\`\`
URL: http://localhost:3000/dashboard/forms/new

1. Fill in all fields:
   - Deceased's Name: Jane Smith
   - Date of Death: 01/15/2024
   - Relationship: Spouse
   - Estate Value: 500000
   - Has Will: Yes
   - Heirs: John Doe (Son), Mary Doe (Daughter)
   - Debts: Mortgage $300,000
   - Notes: Estate is straightforward

2. Click "Submit Form"
3. Should see success message
4. Form should appear in /dashboard/forms
5. Check Supabase → forms table for new entry
\`\`\`

### 2. Test Form Retrieval
\`\`\`
URL: http://localhost:3000/dashboard/forms

1. Should see list of all submitted forms
2. Should see form type, submission date, and status
3. Click "View Details" to see full form
4. Check data matches what was submitted
\`\`\`

### 3. Test Form Data in Supabase
\`\`\`
1. Go to Supabase → forms table
2. Find your submitted form
3. Click on "data" column
4. Should see JSON with all submitted information
5. Verify user_id matches your user
\`\`\`

## Testing Payments

### 1. Test Pricing Page
\`\`\`
URL: http://localhost:3000/pricing

1. Should see 5 pricing tiers
2. Click "Get Started" on any tier
3. If logged in: Should redirect to Stripe checkout
4. If not logged in: Should redirect to /auth/login
\`\`\`

### 2. Test Stripe Checkout (Logged In)
\`\`\`
1. Login to your account
2. Go to /pricing
3. Click "Get Started" on a plan
4. Should redirect to Stripe checkout page
5. Verify plan name appears
6. Verify pricing is correct
\`\`\`

### 3. Test Stripe Payment (Test Card)
\`\`\`
1. On Stripe checkout page:
   - Email: pre-filled with your email
   - Card: 4242 4242 4242 4242
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)

2. Click "Pay"
3. Should redirect to /payments/success
4. Check Supabase:
   - payments table: New payment record
   - subscriptions table: New subscription record
\`\`\`

### 4. Test Failed Payment (Test Card)
\`\`\`
1. On Stripe checkout page:
   - Card: 4000 0000 0000 0002 (decline card)
   - Fill other fields
2. Should show error
3. Payment should NOT be recorded in Supabase
\`\`\`

### 5. Test Webhook (Production Testing)
\`\`\`
1. Go to Stripe Dashboard → Webhooks
2. Find your endpoint
3. Click "Send test event"
4. Select "checkout.session.completed"
5. Should see 200 response
6. Check Supabase payment updated
\`\`\`

## Testing Dashboard

### 1. Test Dashboard Overview
\`\`\`
URL: http://localhost:3000/dashboard

1. Should display:
   - Welcome message with user's name
   - Account status (plan name if subscribed)
   - Number of forms submitted
   - Recent forms list
   - Next steps checklist
\`\`\`

### 2. Test Subscription Status
\`\`\`
1. Without payment:
   - Should show "No active plan"
   - Should show "Choose a Plan" button

2. After payment:
   - Should show plan name (e.g., "Concierge Probate")
   - Should show "active" status
   - Should show subscription dates
\`\`\`

### 3. Test Sidebar Navigation
\`\`\`
1. Click "Overview" → /dashboard
2. Click "My Forms" → /dashboard/forms
3. Click "Settings" → /dashboard/settings (if created)
4. Click "Sign Out" → Home page
\`\`\`

## Testing Security

### 1. Test Route Protection
\`\`\`
1. Not logged in:
   - Try accessing /dashboard → Redirected to /auth/login
   - Try accessing /dashboard/forms → Redirected to /auth/login

2. Logged in:
   - Try accessing /auth/login → Redirected to /dashboard
   - Try accessing /auth/signup → Redirected to /dashboard
\`\`\`

### 2. Test User Data Isolation
\`\`\`
1. Create 2 test accounts:
   - test1@example.com
   - test2@example.com

2. Submit form with test1
3. Login as test2
4. Go to /dashboard/forms
5. Should NOT see test1's forms
6. Check /api/forms/get returns only test2's forms
\`\`\`

### 3. Test RLS Policies
\`\`\`
1. In Supabase → Table Editor
2. Click any form submitted by test1
3. Try to manually change user_id to test2's ID
4. RLS should prevent the update
5. Query should still show original user_id
\`\`\`

## Testing Error Scenarios

### 1. Test Invalid Email
\`\`\`
1. Go to /auth/signup
2. Enter: invalidemail
3. Should show validation error
4. Cannot submit form
\`\`\`

### 2. Test Password Too Short
\`\`\`
1. Go to /auth/signup
2. Enter password: "12345"
3. Click signup
4. Should show "Password must be at least 6 characters"
\`\`\`

### 3. Test Passwords Don't Match
\`\`\`
1. Go to /auth/signup
2. Password: "TestPass123"
3. Confirm: "Different123"
4. Click signup
5. Should show "Passwords do not match"
\`\`\`

### 4. Test Form Submission Without Auth
\`\`\`
1. Make POST request to /api/forms/submit without auth token
2. Should return 401 Unauthorized error
3. Check console for error message
\`\`\`

## Database Verification Checklist

- [ ] user_profiles table has user records
- [ ] All user emails are unique
- [ ] forms table has submitted forms
- [ ] Each form has correct user_id
- [ ] Form data is valid JSON
- [ ] payments table has payment records (after Stripe webhook)
- [ ] Payment amounts match Stripe prices
- [ ] subscriptions table has active subscriptions
- [ ] RLS policies prevent cross-user data access

## Performance Testing

\`\`\`bash
# Test concurrent signups
ab -n 100 -c 10 http://localhost:3000/auth/signup

# Test form submissions
ab -n 50 -c 5 http://localhost:3000/api/forms/submit

# Load test dashboard
ab -n 100 -c 20 http://localhost:3000/dashboard
\`\`\`

## Final Checklist

- [ ] All auth pages accessible
- [ ] Sign up creates user profile
- [ ] Email verification works
- [ ] Login successful
- [ ] Forms can be submitted
- [ ] Forms appear in dashboard
- [ ] Pricing page shows all tiers
- [ ] Stripe checkout works
- [ ] Payments recorded in database
- [ ] Dashboard shows subscription
- [ ] Logout clears session
- [ ] Protected routes redirect correctly
- [ ] User data is isolated
- [ ] Error messages display properly
