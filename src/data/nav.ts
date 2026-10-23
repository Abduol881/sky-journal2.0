import { BarChart3, BookOpenText, LayoutGrid, Package, Settings, ShoppingCart, Users } from 'lucide-react'

export const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutGrid, end: true, badge: 0 },
  { to: '/dashboard/products', label: 'Products', icon: Package, end: false, badge: 3 },
  { to: '/dashboard/journal', label: 'Journal', icon: BookOpenText, end: false, badge: 0 },
  { to: '/dashboard/orders', label: 'Orders', icon: ShoppingCart, end: false, badge: 7 },
  { to: '/dashboard/reports', label: 'Reports', icon: BarChart3, end: false, badge: 0 },
  { to: '/dashboard/team', label: 'Team', icon: Users, end: false, badge: 0 },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings, end: false, badge: 0 },
]

export const tabs = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/sales', label: 'Sales', end: false },
  { to: '/dashboard/stock', label: 'Stock health', end: false },
]