# Sarab Ali Khan — Portfolio (Next.js )
Monorepo:
- `apps/web` — Next.js (App Router) TypeScript + Tailwind + Framer Motion + next-themes

## Requirements
- npm 9+

## Setup
From repo root:
```bash
npm install
```

Copy env examples:
```bat
copy apps\web\.env.local.example apps\web\.env.local
copy apps\api\.env.example apps\api\.env
```

## Run (one command)
```bash
npm run dev
```

Web: http://localhost:3000  

## Personalize
- `apps/web/src/config/site.ts` (links + content)
- `apps/web/src/features/projects/data/projects.data.ts` (project links)
- Replace `apps/web/public/avatar.jpg` if needed
