# Togurt

A desktop-style web app for the **short film ecosystem**: indie/short film creators, producers, directors, actors, and crew. Find shootings and jobs by location and role—styled like Indeed.

## How it works

1. **Select your location** – City, state, or zip in the location field.
2. **Select your demographic** – Role: directing, acting, writers, or crew (search or use the role field).
3. **Search** – See the most recent shootings and jobs. Click a listing to view full details in the right panel.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech stack

- **Next.js 16** (App Router), TypeScript, Tailwind CSS
- **Data**: Mock data in `src/lib/mock-jobs.ts` (Supabase to be added later)
- **Auth**: Not implemented yet; “Sign in” and “Producers / Post project” are placeholders for a future auth layer

## Project structure

- `src/app/page.tsx` – Home with search bar and “Get started”
- `src/app/search/page.tsx` – Results: list (left) + job detail (right), filters
- `src/components/` – `Header`, `SearchBar`, `SearchResults`
- `src/lib/` – `types.ts`, `mock-jobs.ts` (filtering by location/demographic)

Build: `npm run build`
