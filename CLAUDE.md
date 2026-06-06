# Claude Guidelines — Academic Course System Frontend

## UI Rule

**Before writing any UI code, read `.claude/design-system.md` in full.**

Every component, color, spacing value, pattern, and overlay must follow that file. It is the single source of truth for how this frontend looks and behaves. Do not guess at tokens, invent new patterns, or use raw colors — the answers are already in the design system doc.

## Icon & Copy Rule

**Never use `Sparkles`, `Wand2`, `Magic`, or any glitter/sparkle icon for AI features.** These look generic and cheap ("AI slop"). Use `Brain` for AI/recommendations instead.

**Never use emojis** in UI text, headings, buttons, labels, or copy — not even 👋 or ✅. Use lucide-react icons instead.

**Never write AI-sounding filler copy** like "Unlock the power of…", "Supercharge your…", "Seamlessly…", "Leverage cutting-edge…". Write plainly and specifically.

## Component Organization Rule

**One component per file.** If a component is only used as a sub-part of one parent, put it in a sibling file — not defined inline in the parent.

**When a page or feature needs more than ~2 components, create a folder:**

```
feature-name/
├── index.tsx          ← public API; composes sub-components, no JSX logic of its own
├── animations.ts      ← shared framer-motion variants (if >1 file uses them)
├── data.ts            ← static data/constants/types (if >1 file uses them)
├── hero.tsx           ← one component per file
├── roadmap.tsx
└── features/
    ├── index.tsx
    ├── planner-preview.tsx
    └── gpa-preview.tsx
```

**File size limit: ~150 lines.** If a single-component file grows past this, consider splitting into smaller composable pieces.

**`index.tsx` is a composer, not a dumping ground.** It imports and composes; it must not define sub-components itself.

**Data and animation constants are not components.** Extract them to `data.ts` / `animations.ts` when shared across ≥2 files in the same folder.

## Project Overview

College student academic course management system. Students can register for courses, view their academic progress, and receive AI-powered course recommendations.

- **Working directory:** `front/`
- **Framework:** Next.js 16, App Router, React Server Components by default
- **Styling:** Tailwind v4 + shadcn/ui (base-nova style)
- **Data:** axios instance at `lib/axios.ts` (client) and `lib/axios-server.ts` (server), React Query via `components/providers.tsx`
- **Live design reference:** run the dev server and visit `/design-system`
- **Design system:** `.claude/design-system.md`

