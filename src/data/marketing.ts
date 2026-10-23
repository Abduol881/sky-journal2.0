import { BarChart3, BellRing, BookOpenText, Boxes, FileDown, Users } from 'lucide-react'

export const features = [
  { icon: Boxes, title: 'Inventory tracking', text: 'Every product, batch and location in one list, with stock counts that update as you sell.' },
  { icon: BarChart3, title: 'Sales analytics', text: 'Revenue by channel, best sellers and period comparisons you can read at a glance.' },
  { icon: BellRing, title: 'Low-stock alerts', text: 'Get warned before you run out, with a reorder list built for you.' },
  { icon: BookOpenText, title: 'Business journal', text: 'Daily notes tied to your numbers, so you remember why a good or bad day happened.' },
  { icon: Users, title: 'Team access', text: 'Invite staff and decide who can view, edit or only log sales.' },
  { icon: FileDown, title: 'Reports and export', text: 'One-click CSV exports for your accountant, your bank or your own records.' },
]

export const steps = [
  { n: '01', title: 'Add your products', text: 'Import a spreadsheet or add items by hand. Set your cost, price and reorder level.' },
  { n: '02', title: 'Log stock and sales', text: 'Record what comes in and what goes out. SkyLedger keeps every count current.' },
  { n: '03', title: 'Read the whole business', text: 'Open the dashboard and see sales, stock value and alerts together, then write the day in your journal.' },
]

export const plans = [
  { name: 'Starter', price: '$0', note: 'For trying it out', perks: ['Up to 50 products', '1 user', 'Basic dashboard', 'CSV export'], featured: false },
  { name: 'Growth', price: '$19', note: 'per month, for small businesses', perks: ['Unlimited products', '5 users', 'Sales analytics', 'Low-stock alerts', 'Business journal'], featured: true },
  { name: 'Scale', price: '$49', note: 'per month, for teams', perks: ['Everything in Growth', '20 users', 'Multiple locations', 'Priority support'], featured: false },
]

export const faqs = [
  { q: 'Is my data safe?', a: 'Your data is stored securely and only the people you invite can see it. Full details will be published before launch.' },
  { q: 'Can I import what I already have?', a: 'Yes. You will be able to import products and past sales from a CSV file.' },
  { q: 'Do I need to install anything?', a: 'No. SkyLedger runs in your browser on phone, tablet and computer.' },
  { q: 'Can I change plans later?', a: 'Yes. You can move up or down at any time.' },
]