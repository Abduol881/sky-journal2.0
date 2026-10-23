export const kpis = [
  { id: 'units', label: 'Units on hand', value: '4,345', delta: -3.2, spark: [12, 14, 13, 16, 15, 18, 17, 20, 19, 17], tone: 'text-primary' },
  { id: 'value', label: 'Total stock value', value: '$32,041', delta: 4.9, spark: [10, 11, 13, 12, 15, 16, 15, 19, 21, 24], tone: 'text-success' },
  { id: 'low', label: 'Low stock items', value: '7', delta: 1.0, spark: [4, 5, 4, 6, 5, 7, 6, 8, 7, 7], tone: 'text-warning' },
]

export const revenue = [8, 12, 9, 14, 11, 18, 13, 22, 15, 12, 19, 26, 17, 21, 28]

export const goal = { pct: 69.8, sales: 48, total: '$17,113' }

export const stockMonths = [
  { month: 'Jan', in: 7200, out: 6900, value: 26000 },
  { month: 'Feb', in: 7900, out: 7400, value: 26500 },
  { month: 'Mar', in: 11800, out: 10900, value: 27000 },
  { month: 'Apr', in: 13000, out: 12400, value: 27500 },
  { month: 'May', in: 13600, out: 12900, value: 28500 },
  { month: 'Jun', in: 13900, out: 12700, value: 28000 },
  { month: 'Jul', in: 13700, out: 12200, value: 29500 },
  { month: 'Aug', in: 12900, out: 12000, value: 30000 },
  { month: 'Sep', in: 11500, out: 11800, value: 29800 },
  { month: 'Oct', in: 6232, out: 4732, value: 32041 },
]
export type StockMonth = (typeof stockMonths)[number]

export const todo = { orders: 2, batches: 2 }