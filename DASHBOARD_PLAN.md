# Admin Dashboard — Build Plan

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| **React 18** | `^18.3.1` | UI framework |
| **TypeScript** | via Vite | Type safety |
| **Vite** | `6.3.5` | Dev server & bundler |
| **Tailwind CSS v4** | `4.1.12` | Styling — loaded via `@tailwindcss/vite` plugin (not PostCSS) |
| **Lucide React** | `^0.487.0` | All icons — import from `lucide-react` |
| **i18next + react-i18next** | `^26` / `^17` | Translations (AR/EN) |
| **Axios** | `^1.15.2` | HTTP client for future API calls |
| **Recharts** | `^2.15.2` | Charts on the dashboard |
| **shadcn/ui** | (local) | UI components in `src/components/ui/` |

> All pages to be built — including the Coming Soon admin pages — use the same stack above. No additional libraries should be introduced.

### i18n Setup

Translation files live in `src/i18n/locales/ar.json` and `src/i18n/locales/en.json`. The i18next instance is initialized in `src/i18n/index.ts` and imported once in `main.tsx`.

`LanguageContext` wraps i18next and exposes the same `{ language, toggleLanguage, t }` API so all existing components stay unchanged. Language switches call `i18n.changeLanguage()` and update `document.dir` for RTL/LTR.

```ts
// Using translations in a component
const { language, t } = useLanguage();
t('nav.home')           // looks up key in active locale JSON
product.name[language]  // bilingual data objects — index directly
```

### Axios Setup

A pre-configured instance is in `src/lib/axios.ts`:
- `baseURL` defaults to `/api`, overridden by `VITE_API_URL` env var
- Automatically attaches `Authorization: Bearer <adminToken>` from localStorage

```ts
import api from '@/lib/axios';
// api.get('/products'), api.post('/orders'), etc.
```

**The backend is not configured yet.** All admin pages currently use hardcoded demo data defined inline in each page file. When the backend is ready, replace the mock arrays with `api.get(...)` calls inside a `useEffect` (or a data-fetching hook).

---

## Demo Data (No Backend)

Since no backend exists, the dashboard and all admin pages use **static demo data** defined directly in each component. This applies to:

- Dashboard stats (sales total, order count, appointment count, user count)
- Recent orders table
- Upcoming appointments list
- Quick stats (total products, site visits, conversion rate)

When building new admin pages (appointments, articles, users, branches), follow the same pattern — define a mock array at the top of the component file. Example:

```ts
// Top of AdminAppointmentsPage.tsx
const mockAppointments = [
  { id: '#APT-001', patient: 'علي محمود', doctor: 'د. أحمد السيد', ... },
  ...
];
```

Replace with `api.get('/appointments')` once the backend is ready.

---

## What Exists (Already Implemented)

| Route | File | Status |
|---|---|---|
| `/admin/login` | `pages/admin/AdminLoginPage.tsx` | ✅ Done |
| `/admin/dashboard` | `pages/admin/AdminDashboardPage.tsx` | ✅ Done (static data) |
| `/admin/products` | `pages/admin/AdminProductsPage.tsx` | ✅ Done |
| `/admin/orders` | `pages/admin/AdminOrdersPage.tsx` | ✅ Done |
| `/admin/payment-methods` | `pages/admin/AdminPaymentMethodsPage.tsx` | ✅ Done |

All implemented pages use `AdminLayout` from `src/components/admin/AdminLayout.tsx`.

---

## Pages to Build (Currently "Coming Soon")

### 1. Appointments Management — `/admin/appointments`

**File to create:** `src/pages/admin/AdminAppointmentsPage.tsx`

Fields per appointment: ID, patient name, doctor, service type, date, time, branch, status (pending / confirmed / cancelled)

Features needed:
- Table with search by patient name or doctor
- Filter by status and branch
- Confirm / cancel appointment (status toggle)
- Add new appointment (modal form)
- Edit appointment details
- Delete with confirmation dialog

---

### 2. Articles Management — `/admin/articles`

**File to create:** `src/pages/admin/AdminArticlesPage.tsx`

Data source: `src/data/articles.ts` (same pattern as products — bilingual `{ ar, en }` fields)

Features needed:
- Table listing all articles (title, category, date, status)
- Search by title
- Add new article (modal with bilingual title + body + image URL + category)
- Edit article
- Delete with confirmation
- Toggle published/draft status

---

### 3. Users Management — `/admin/users`

**File to create:** `src/pages/admin/AdminUsersPage.tsx`

Since there is no backend, use a hardcoded users array (same pattern as products/orders).

Fields: ID, name, email, phone, registration date, status (active / disabled), role (customer / admin)

Features needed:
- Table with search by name or email
- Filter by status and role
- Add new user (modal)
- Edit user
- Toggle active/disabled
- Delete with confirmation

---

### 4. Branches Management — `/admin/branches`

**File to create:** `src/pages/admin/AdminBranchesPage.tsx`

Current branches: فريال (Ferial), الحقوقيين (Hoqoqyin) — see `src/context/LanguageContext.tsx` for existing translation keys.

Fields: name (ar/en), address (ar/en), phone, working hours, Google Maps URL, status

Features needed:
- Cards or table listing branches
- Add / edit branch (modal)
- Delete with confirmation
- Toggle active/inactive

---

### 5. Settings — `/admin/settings`

**File to create:** `src/pages/admin/AdminSettingsPage.tsx`

Sections (use tabs or accordion):
- **General**: site name, logo URL, contact email, phone, social media links
- **Notifications**: toggle email notifications on new order / appointment
- **Shipping**: flat rate, free shipping threshold
- **SEO**: meta title, meta description

Since there is no backend, save settings to `localStorage` under key `lotfy-settings`.

---

## Wiring New Pages into the Router

Edit `src/routes.tsx` — replace each "Coming Soon" element with the real component:

```tsx
// Example for appointments:
import { AdminAppointmentsPage } from './pages/admin/AdminAppointmentsPage';

// In the router array, replace the inline element with:
{ path: '/admin/appointments', Component: AdminAppointmentsPage },
```

Repeat for articles, users, branches, settings.

---

## Dashboard Enhancements (`/admin/dashboard`)

The current dashboard uses **static hardcoded data**. Improvements:

1. **Real stats** — derive from the same mock arrays used in each admin page:
   - Total products → `products.length` from `src/data/products.ts`
   - Orders → count from orders mock array
   - Appointments → count from appointments mock array

2. **Charts** — `recharts` is already installed. Add to the dashboard:
   - Bar chart: monthly sales (last 6 months)
   - Pie chart: orders by status
   - Line chart: daily site visits (static/mock data is fine)

3. **Low stock alert** — filter `products` where `stock < 5` and show a warning card.

---

## Color Palette

Defined in `src/styles/globals.css` under `@theme {}` and available as Tailwind utilities (e.g. `bg-primary`, `text-secondary`).

### Brand Colors
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#ECB273` | Gold — buttons, active states, icons, highlights |
| `primary-dark` | `#D89F5F` | Hover state for primary |
| `secondary` | `#2C3E50` | Navy — sidebar background, headings, text |
| `secondary-light` | `#34495E` | Lighter navy — sidebar hover states |

### Base / UI Colors
| Token | Hex | Usage |
|---|---|---|
| `background` | `#F8F9FA` | Page background |
| `foreground` | `#1a202c` | Body text |
| `muted` | `#6B7280` | Secondary text |
| `muted-foreground` | `#9CA3AF` | Placeholder / hint text |
| `border` | `#E5E7EB` | Card and input borders |
| `card` | `#ffffff` | Card backgrounds |
| `destructive` | `#dc3545` | Delete / error actions |
| `success` | `#28a745` | Success states |

### Status Badge Colors (Tailwind classes)
| Status | Classes |
|---|---|
| completed / confirmed | `bg-green-100 text-green-700 border-green-200` |
| pending | `bg-yellow-100 text-yellow-700 border-yellow-200` |
| processing | `bg-blue-100 text-blue-700 border-blue-200` |
| cancelled / error | `bg-red-100 text-red-700 border-red-200` |

### Stat Card Icon Colors (used in Dashboard)
| Color | Tailwind class | Used for |
|---|---|---|
| Green | `bg-green-500` | Sales |
| Blue | `bg-blue-500` | Orders |
| Purple | `bg-purple-500` | Appointments |
| Orange | `bg-orange-500` | Users |

### Typography
- **Headings**: `Tajawal` (Arabic-first), falls back to `Noto Sans Arabic`
- **Body**: `Noto Sans Arabic`, then system sans-serif
- Both fonts loaded from Google Fonts in `src/styles/globals.css`

---

## Shared Patterns to Follow

- Wrap each page in `<AdminLayout>`.
- Use `const { language } = useLanguage()` for bilingual labels — inline `language === 'ar' ? '...' : '...'` for one-off strings, or `t('key')` for strings already in `LanguageContext`.
- Bilingual data objects always follow `{ ar: string; en: string }` shape; display with `obj[language]`.
- Modals: use the existing shadcn/ui `Dialog` component from `src/components/ui/dialog.tsx`.
- Confirmation on delete: use shadcn/ui `AlertDialog` from `src/components/ui/alert-dialog.tsx`.
- Status badges: follow the color convention already in `AdminDashboardPage` and `AdminOrdersPage` (`bg-green-100 text-green-700` for completed/confirmed, `bg-yellow-100` for pending, `bg-blue-100` for processing, `bg-red-100` for cancelled).
- No backend calls — all state is local (component state or localStorage).
