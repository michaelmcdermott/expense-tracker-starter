import {
  PieChart,
  Pie,
  Sector,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Rectangle,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Fixed categorical order/hues so a category always gets the same color,
// regardless of how the data is sorted or filtered.
const CATEGORY_COLORS = {
  food: '#2a78d6',
  housing: '#1baf7a',
  utilities: '#eda100',
  transport: '#008300',
  entertainment: '#4a3aa7',
  salary: '#e34948',
  other: '#e87ba4',
}
const OTHER_COLOR = '#898781'

// Past this many slices/bars, adjacent ones blur together - fold the
// smallest into a single "Other" entry instead of generating another hue.
const MAX_SLICES = 6

const RADIAN = Math.PI / 180

function colorFor(category) {
  return category === 'Other' ? OTHER_COLOR : CATEGORY_COLORS[category] || OTHER_COLOR
}

function ColoredSector(props) {
  return <Sector {...props} fill={colorFor(props.payload.category)} stroke="#fff" strokeWidth={2} />
}

function ColoredBar(props) {
  const { x, y, width, height, payload } = props
  return <Rectangle x={x} y={y} width={width} height={height} radius={[4, 4, 0, 0]} fill={colorFor(payload.category)} />
}

// Label sparingly: only slices big enough to read comfortably get a
// direct label; the legend and tooltip carry the rest.
function renderSliceLabel({ cx, cy, midAngle, outerRadius, percent, payload }) {
  if (percent < 0.05) return null
  const radius = outerRadius + 18
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fill="#666" fontSize={12}>
      {`${payload.category} ${Math.round(percent * 100)}%`}
    </text>
  )
}

function renderValueLabel({ x, y, width, value }) {
  return (
    <text x={x + width / 2} y={y} dy={-6} textAnchor="middle" fill="#333" fontSize={12}>
      ${value}
    </text>
  )
}

function SpendingChart({ transactions, categories }) {
  const totals = categories
    .map(category => ({
      category,
      amount: transactions
        .filter(t => t.type === 'expense' && t.category === category)
        .reduce((sum, t) => sum + t.amount, 0),
    }))
    .filter(c => c.amount > 0)
    .sort((a, b) => b.amount - a.amount)

  if (totals.length === 0) {
    return null
  }

  const data =
    totals.length <= MAX_SLICES
      ? totals
      : [
          ...totals.slice(0, MAX_SLICES - 1),
          {
            category: 'Other',
            amount: totals.slice(MAX_SLICES - 1).reduce((sum, c) => sum + c.amount, 0),
          },
        ]

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <div className="spending-chart-panels">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              outerRadius="65%"
              shape={ColoredSector}
              label={renderSliceLabel}
              labelLine={false}
              isAnimationActive={false}
            />
            <Tooltip formatter={(value, name, props) => [`$${value} (${Math.round(props.payload.percent * 100)}%)`, name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="#e1e0d9" vertical={false} />
            <XAxis dataKey="category" tick={{ fill: '#666', fontSize: 13 }} />
            <YAxis tick={{ fill: '#898781', fontSize: 12 }} tickFormatter={value => `$${value}`} />
            <Tooltip formatter={value => [`$${value}`, 'Spent']} cursor={{ fill: '#f5f5f5' }} />
            <Bar dataKey="amount" shape={ColoredBar} label={renderValueLabel} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SpendingChart
