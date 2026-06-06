# Frontend Design System — Claude Guidelines

This is a **Next.js 16 + Tailwind v4 + shadcn (base-nova style)** project for a college student academic course management system. Follow every rule below when generating or editing UI code.

## Art Direction — "The Register"

The design language is **academic ledger**: official, typographically precise, data-first. It should feel like a well-designed university transcript, not a SaaS dashboard.

- **Numbers are the hero.** GPA, credit hours, course counts are displayed at `text-5xl` or `text-6xl` in `font-mono tabular-nums`. Never small.
- **Dot-grid background.** The page background has a subtle 20px dot-grid (defined in `globals.css`). Cards are opaque so the grid only shows in gaps — do not override this with solid backgrounds on wrappers.
- **No shadows on cards.** Use `border` + `hover:border-primary/30 transition-colors` instead of `shadow-sm hover:shadow-md`.
- **Mono for metadata.** Course codes, student IDs, labels below stat numbers: `font-mono text-xs uppercase tracking-widest text-muted-foreground`.
- **Border-left for callouts.** Use `border-l-2 border-l-accent` on a `bg-card` container instead of gradient backgrounds for AI recommendation banners and notices.
- **Primary is institutional slate-indigo** (`oklch(0.49 0.195 258)`) — slightly more blue and less chroma than standard indigo. Never use it as a background fill on large areas.

---

## Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router, RSC-first) |
| Styling | Tailwind v4 — utility classes only, no arbitrary `style={}` |
| Components | shadcn/ui with **base-nova** style, built on `@base-ui/react` |
| Drawer | `vaul` (used by the `Drawer` shadcn component) |
| Icons | `lucide-react` — always use `className="size-4"` (not `w-4 h-4`) |
| Theme | CSS variables in `app/globals.css`, mapped via `@theme inline` |
| Dark mode | Class-based (`.dark`). Press **D** to toggle in dev. |
| Fonts | Inter (`--font-sans`) for UI, Geist Mono (`--font-mono`) for code/IDs |

---

## Color Tokens — always use semantic names, never raw hex or oklch

### Core
| Token | Usage |
|---|---|
| `bg-primary` / `text-primary` | Indigo — primary actions, active nav, links |
| `bg-accent` / `text-accent` | Amber — AI recommendations, highlights, achievements |
| `bg-background` | Page background |
| `bg-card` | Card / panel surface |
| `bg-muted` | Subtle backgrounds, disabled states |
| `text-foreground` | Primary text |
| `text-muted-foreground` | Supporting / helper text |
| `border-border` | All borders |

### Semantic (course statuses & feedback)
| Token | Usage |
|---|---|
| `bg-success` / `text-success` | Completed courses, passed, positive feedback |
| `bg-info` / `text-info` | Enrolled / in-progress courses |
| `bg-warning` / `text-warning` | Prerequisite warnings, caution states |
| `bg-destructive` / `text-destructive` | Errors, drop course, delete actions |

### Course status pattern
```tsx
// Always use this pattern for course status indicators:
// available   → bg-secondary        text-secondary-foreground
// enrolled    → bg-info/15          text-info
// completed   → bg-success/15       text-success
// locked      → bg-muted            text-muted-foreground
// recommended → bg-accent/15        text-amber-700 dark:text-accent
```

---

## Typography

```tsx
// Page title
<h1 className="font-heading text-5xl font-bold tracking-tight text-foreground">

// Section heading
<h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">

// Card title
<h3 className="font-semibold leading-snug text-foreground">

// Sub-label
<h4 className="text-lg font-medium text-foreground">

// Body
<p className="text-base text-foreground">

// Supporting / muted
<p className="text-sm text-muted-foreground">

// Metadata (course codes, IDs, numbers)
<p className="font-mono text-xs text-muted-foreground">
```

---

## Spacing & Radius

- **Page padding:** `px-8 py-14` on outer wrapper, `max-w-4xl mx-auto` for content
- **Card padding:** `p-5` (standard), `p-6` (spacious)
- **Section spacing:** `space-y-16` between page sections, `space-y-6` inside a section
- **Gap inside cards:** `gap-3` or `gap-4`
- **Border radius:** always use semantic scale — `rounded-lg` (default cards/inputs), `rounded-xl` (large cards/panels), `rounded-full` (pills/badges/avatars)

---

## Components

### Button
Import from `@/components/ui/button`. Use `variant` prop — never write custom button classes from scratch.

```tsx
import { Button, buttonVariants } from "@/components/ui/button"

<Button>Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

// Use buttonVariants() when you need className on a non-Button element (e.g. DialogTrigger)
<DialogTrigger className={buttonVariants({ variant: "outline" })}>Open</DialogTrigger>
```

### Badge
Import from `@/components/ui/badge`.

```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="ghost">Ghost</Badge>
```

### Dialog (Modal)
Use for focused single actions: course registration, editing a record, confirming a small form.

```tsx
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog"

// Trigger: use buttonVariants() since DialogTrigger is a base-ui component
<DialogTrigger className={buttonVariants({ variant: "outline" })}>Open</DialogTrigger>

// Footer: showCloseButton adds a shadcn Close button automatically
<DialogFooter showCloseButton>
  <Button>Confirm</Button>
</DialogFooter>
```

### Alert Dialog
Use for destructive confirmations only (drop course, delete record). Always include an icon in `AlertDialogMedia`.

```tsx
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogMedia, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog"

<AlertDialogTrigger className={buttonVariants({ variant: "outline" })}>
  Trigger
</AlertDialogTrigger>
<AlertDialogFooter>
  <AlertDialogCancel>Cancel</AlertDialogCancel>
  <AlertDialogAction variant="destructive">Confirm</AlertDialogAction>
</AlertDialogFooter>
```

### Sheet (Side Panel)
Use for richer detail views that don't need a full page: course details, student profile, filter panel.

```tsx
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetDescription, SheetFooter, SheetClose,
} from "@/components/ui/sheet"

// Trigger: use buttonVariants() (base-ui component)
<SheetTrigger className={buttonVariants({ variant: "outline" })}>Open</SheetTrigger>

// side prop: "right" (default), "left", "top", "bottom"
<SheetContent side="right">...</SheetContent>

// Close: use buttonVariants() directly on SheetClose
<SheetClose className={buttonVariants({ variant: "outline" })}>Close</SheetClose>
```

### Drawer (Bottom Sheet)
Use for mobile-first flows: course lists, quick actions, swipeable cards. Uses `vaul` — supports `asChild`.

```tsx
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
  DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
} from "@/components/ui/drawer"

// Drawer uses vaul → use asChild with Button
<DrawerTrigger asChild>
  <Button variant="outline">Open</Button>
</DrawerTrigger>

<DrawerClose asChild>
  <Button variant="outline">Dismiss</Button>
</DrawerClose>
```

### Input & Label
Import from `@/components/ui/input` and `@/components/ui/label`. Always pair them with `htmlFor`/`id`. Use `aria-invalid` for error state — the red ring is automatic.

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-1.5">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="student@university.edu"
    aria-invalid={!!error}   // triggers red border automatically
  />
  {error && <p className="text-destructive text-xs">{error}</p>}
</div>
```

### DropdownMenu
Built on `@base-ui/react/menu`. `DropdownMenuTrigger` does **not** support `asChild` — style it with `buttonVariants()`.

```tsx
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { buttonVariants } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
    Open
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-52">
    {/* DropdownMenuLabel MUST be inside DropdownMenuGroup — base-ui requirement */}
    <DropdownMenuGroup>
      <DropdownMenuLabel>Label</DropdownMenuLabel>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem onClick={handler}>Item</DropdownMenuItem>
      <DropdownMenuItem variant="destructive" onClick={handler}>Delete</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

Use `onClick` + `router.push()` on `DropdownMenuItem` for navigation (not `render` or `asChild`).

### Tooltip
Wrap the app root with `TooltipProvider` (already done in `app/layout.tsx`).

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger className={buttonVariants({ variant: "ghost" })}>
    Hover me
  </TooltipTrigger>
  <TooltipContent side="top">Helpful hint</TooltipContent>
</Tooltip>
```

---

## Auth Store

Import from `@/store/auth`. The store persists `user` + `isAuthenticated` to `localStorage` and the token to cookies.

```tsx
import { useAuthStore } from "@/store/auth"

// Read
const { user, isAuthenticated } = useAuthStore()

// Write — called after successful login
const setAuth = useAuthStore((s) => s.setAuth)
setAuth(data.user, data.token)  // sets cookie + localStorage

// Clear — called on sign out
const clearAuth = useAuthStore((s) => s.clearAuth)
clearAuth()
```

`User` type: `{ id, studentId, email, firstName, lastName }`

## Form Error Pattern

Standard field + error layout used in all forms:

```tsx
// Field errors: Record<string, string>, validated on submit
// Server error: string, from catch block

{serverError && (
  <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
    <AlertCircle className="text-destructive size-4 shrink-0" />
    <span className="text-destructive">{serverError}</span>
  </div>
)}
```

Extract axios error message:
```ts
const msg =
  (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ??
  "Something went wrong. Please try again."
```

---

## Course Card Pattern

Standard card layout used for all course listings:

```tsx
<div className="bg-card border-border group flex flex-col gap-3 rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md">
  {/* Header row */}
  <div className="flex items-start justify-between gap-2">
    <div>
      <p className="text-muted-foreground font-mono text-xs">{code}</p>
      <h3 className="text-foreground mt-0.5 font-semibold leading-snug">{name}</h3>
    </div>
    <StatusBadge status={status} />
  </div>

  {/* Description */}
  <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>

  {/* Footer row */}
  <div className="border-border flex items-center justify-between border-t pt-3">
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground text-xs">{department}</span>
      <span className="bg-border h-3 w-px" />
      <span className="text-muted-foreground text-xs">{credits} cr</span>
    </div>
    <button className="text-primary text-xs font-medium">Details →</button>
  </div>
</div>
```

---

## AI Recommendation Banner Pattern

Border-left accent on a card surface. No gradients, no icon backgrounds.

```tsx
<div className="bg-card border-border border-l-accent rounded-lg border border-l-2 p-5">
  <div className="flex items-start gap-4">
    <Brain className="text-accent mt-0.5 size-5 shrink-0" />
    <div className="flex-1">
      <p className="text-foreground font-medium">Heading</p>
      <p className="text-muted-foreground mt-1 text-sm">Supporting description.</p>
    </div>
    <Button variant="outline" size="sm" className="shrink-0">Action</Button>
  </div>
</div>
```

---

## Stat Strip Pattern (Ledger)

Numbers are the hero. No icons. Displayed large in a divided strip.

```tsx
<div className="bg-card border-border grid grid-cols-2 divide-x divide-y sm:divide-y-0 sm:grid-cols-4 overflow-hidden rounded-xl border">
  {stats.map(({ value, label, color }) => (
    <div key={label} className="px-6 py-5">
      <p className={`font-mono text-5xl font-bold tabular-nums ${color}`}>{value}</p>
      <p className="text-muted-foreground mt-2 text-xs uppercase tracking-wider">{label}</p>
    </div>
  ))}
</div>
```

---

## GPA Ring Pattern

SVG progress ring — always 96×96, r=36, strokeWidth=8:

```tsx
function GpaRing({ gpa }: { gpa: number }) {
  const r = 36, circ = 2 * Math.PI * r
  const offset = circ - (gpa / 4) * circ
  return (
    <div className="relative flex size-24 items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="absolute inset-0 -rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" strokeWidth="8" className="stroke-muted" />
        <circle cx="48" cy="48" r={r} fill="none" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          className="stroke-primary transition-all duration-700" />
      </svg>
      <div className="relative flex flex-col items-center leading-tight">
        <span className="text-foreground text-xl font-bold">{gpa.toFixed(2)}</span>
        <span className="text-muted-foreground text-[10px]">GPA</span>
      </div>
    </div>
  )
}
```

---

## Rules

1. **No `Sparkles`, `Wand2`, or glitter icons.** Use `Brain` for anything AI-related. These icons look generic and cheap.
2. **No emojis** anywhere in the UI — not in headings, buttons, labels, or copy. Use lucide-react icons instead.
3. **No AI filler copy** — never write "Unlock the power of…", "Supercharge your…", "Seamlessly…", "Cutting-edge…". Write plainly: "AI course recommendations" not "Supercharged AI-powered course intelligence".
4. **Never use raw colors.** Always use semantic token classes (`bg-primary`, `text-success`, etc.).
2. **Never use `style={}`** for anything achievable with Tailwind.
3. **`"use client"` only when necessary** — interactive overlays (Dialog, Sheet, Drawer, Tooltip), state hooks, event handlers. Everything else is a Server Component.
4. **Icons:** always `lucide-react`, always `className="size-4"` (not `w-4 h-4`).
5. **`buttonVariants()` on base-ui trigger/close components** — `DialogTrigger`, `AlertDialogTrigger`, `SheetTrigger`, `SheetClose`, `TooltipTrigger` do not support `asChild`; apply styles via `className={buttonVariants({ variant })}`. Vaul-based `DrawerTrigger` and `DrawerClose` use `asChild`.
6. **Overlays split into client components** — keep interactive overlay wrappers in separate `*-client.tsx` or `overlay-showcase.tsx` files; import them into Server Component pages.
7. **Spacing consistency:** `p-5` on standard cards, `p-6` on form panels, `gap-3`/`gap-4` inside cards, `space-y-16` between page sections.
8. **No arbitrary Tailwind values** unless there is no semantic equivalent (e.g. `text-[10px]` for the GPA ring label is acceptable).
9. **Dark mode is automatic** — use semantic tokens and it works. Never hardcode `dark:bg-[#...]`.
10. **`/design-system` page is the source of truth** — any new pattern added to the codebase should be reflected there.
