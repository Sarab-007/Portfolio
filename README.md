# Sarab Ali Khan — Portfolio (Next.js + Node API)

Monorepo:
- `apps/web` — Next.js (App Router) TypeScript + Tailwind + Framer Motion + next-themes
- `apps/api` — Node.js (Express) TypeScript backend (contact endpoint)

## Requirements
- Node.js 18+ (recommended 20+)
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
API: http://localhost:4000/health

## Personalize
- `apps/web/src/config/site.ts` (links + content)
- `apps/web/src/features/projects/data/projects.data.ts` (project links)
- Replace `apps/web/public/avatar.jpg` if needed
