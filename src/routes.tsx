import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LensesPage } from './pages/SunglassesPage';
import { EyeglassesPage } from './pages/EyeglassesPage';
import { EyeglassesSubPage } from './pages/EyeglassesSubPage';
import { ArtificialEyesPage } from './pages/ArtificialEyesPage';
import { LightFiltersPage } from './pages/LightFiltersPage';
import { ClinicsPage } from './pages/ClinicsPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { BranchesPage } from './pages/BranchesPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminPaymentMethodsPage } from './pages/admin/AdminPaymentMethodsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'lenses', Component: LensesPage },
      { path: 'eyeglasses', Component: EyeglassesPage },
      { path: 'eyeglasses/:category', Component: EyeglassesSubPage },
      { path: 'artificial-eyes', Component: ArtificialEyesPage },
      { path: 'light-filters', Component: LightFiltersPage },
      { path: 'clinics', Component: ClinicsPage },
      { path: 'articles', Component: ArticlesPage },
      { path: 'article/:id', Component: ArticleDetailPage },
      { path: 'branches', Component: BranchesPage },
      { path: 'contact', Component: ContactPage },
      { path: 'product/:id', Component: ProductDetailPage },
      { path: 'cart', Component: CartPage },
      { path: 'checkout', Component: CheckoutPage },
      { path: 'wishlist', Component: WishlistPage },
      {
        path: '*',
        element: (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="mb-4">404</h1>
              <p className="text-muted-foreground">Page not found</p>
            </div>
          </div>
        ),
      },
    ],
  },
  // Admin Routes (without Layout)
  {
    path: '/admin/login',
    Component: AdminLoginPage,
  },
  {
    path: '/admin/dashboard',
    Component: AdminDashboardPage,
  },
  {
    path: '/admin/products',
    Component: AdminProductsPage,
  },
  {
    path: '/admin/orders',
    Component: AdminOrdersPage,
  },
  {
    path: '/admin/appointments',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4">Coming Soon</h1>
          <p className="text-muted-foreground">Appointments Management</p>
        </div>
      </div>
    ),
  },
  {
    path: '/admin/articles',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4">Coming Soon</h1>
          <p className="text-muted-foreground">Articles Management</p>
        </div>
      </div>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4">Coming Soon</h1>
          <p className="text-muted-foreground">Users Management</p>
        </div>
      </div>
    ),
  },
  {
    path: '/admin/payment-methods',
    Component: AdminPaymentMethodsPage,
  },
  {
    path: '/admin/branches',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4">Coming Soon</h1>
          <p className="text-muted-foreground">Branches Management</p>
        </div>
      </div>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4">Coming Soon</h1>
          <p className="text-muted-foreground">Settings</p>
        </div>
      </div>
    ),
  },
]);
