# Genius Zone Model School

A Next.js + TypeScript + Supabase school website starter for Genius Zone Model School, Rangpur.

## Features in this starter
- Responsive Bangla/English school homepage with school profile, staff, facilities, notices and statistics.
- Online admission application with server-side validation, unique application ID, Supabase storage/database, and downloadable PDF confirmation.
- Public result lookup that returns published results only.
- Protected admin area for dashboard, admission review, student/staff records, notices and examination/result publishing.
- Supabase PostgreSQL schema with Row Level Security policies.

> This is a deployable foundation. Configure Supabase and create the first admin before using it with real student data. The first dashboard release focuses on core records and admission/result workflows; attendance, fees, SMS and advanced bulk-import can be added later.

## 1. Create Supabase project
1. Create a project at https://supabase.com.
2. Open SQL Editor and run `supabase/schema.sql`.
3. In Storage, create a public bucket named `student-photos` (or keep photos private and implement signed URLs before production).
4. Copy Project URL and anon key from Project Settings → API.
5. Keep the service-role key secret; it is only used by the server-side admin bootstrap script.

## 2. Configure environment
Copy `.env.example` to `.env.local` and fill in the Supabase URL and anon key. Set a strong temporary admin password. Never commit `.env.local` or expose the service-role key in a `NEXT_PUBLIC_` variable.

## 3. Create the first admin
The login username is `daloer9102`. Supabase Auth uses an internal email alias `daloer9102@admin.geniuszone.edu.bd` for username-style login. Run:

```bash
npm install
npm run create-admin
```

This uses `SUPABASE_SERVICE_ROLE_KEY` on your local machine to create the Auth user and `admins` row. Change the temporary password immediately after first login. If you already created the account, do not run the bootstrap script again.

## 4. Run locally
```bash
npm run dev
```
Open http://localhost:3000.

## 5. GitHub and Vercel
1. Create a new empty GitHub repository.
2. Upload/extract this project and push the files to the repository's main branch.
3. In Vercel, choose Add New → Project and import that GitHub repository.
4. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel Environment Variables. Add `SUPABASE_SERVICE_ROLE_KEY` only if a server-side feature needs it; do not add initial admin password after bootstrap.
5. Deploy. Vercel detects Next.js automatically; build command is `npm run build`.

## Security notes
- Public result lookup is restricted to published result rows by database policy and server query.
- Admin routes verify Supabase Auth and the `admins` table.
- The service-role key bypasses RLS: use only in trusted server scripts, never in browser code.
- Review storage policies, privacy notices, backups, and local education/legal requirements before collecting real children’s data.
- Use a strong password (at least 12–16 characters), not the sample password from the project brief.

## Initial public statistics
The homepage displays 80 students and 8 teachers/staff as school-provided figures. Update them in `src/lib/school.ts` when the counts change.
