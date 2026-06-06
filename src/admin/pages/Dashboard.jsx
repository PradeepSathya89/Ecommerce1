import { products } from '../../data/products'
import s from './Admin.module.css'
const stats = [
  { label:'Total Revenue', value:'₹18,45,200', change:'+22%', icon:'💰', color:'#1565c0' },
  { label:'Total Orders', value:'1,247', change:'+15%', icon:'📦', color:'#2e7d32' },
  { label:'Products', value: products.length, change:'+5%', icon:'🛍️', color:'#e65100' },
  { label:'Customers', value:'8,920', change:'+31%', icon:'👥', color:'#6a1b9a' },
]
const recentOrders = [
  { id:'SE001', customer:'Priya Sharma', product:'iPhone 15 Pro Max', amount:159900, status:'Delivered' },
  { id:'SE002', customer:'Rohan Mehta', product:'Samsung S24 Ultra', amount:129999, status:'Shipped' },
  { id:'SE003', customer:'Ananya K', product:'MacBook Air M3', amount:114900, status:'Processing' },
  { id:'SE004', customer:'Vikram Nair', product:"Levi's Jeans", amount:2499, status:'Delivered' },
  { id:'SE005', customer:'Sneha Iyer', product:'Sony WH-1000XM5', amount:24990, status:'Cancelled' },
]
const sColor = { Delivered:'#2e7d32', Shipped:'#1565c0', Processing:'#e65100', Cancelled:'#c62828' }
export default function Dashboard() {
  return (
    <div>
      <div className={s.pageHeader}><h1>Dashboard</h1><span className={s.date}>{new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</span></div>
      <div className={s.statsGrid}>
        {stats.map(st => (
          <div key={st.label} className={s.statCard}>
            <div className={s.statTop}><span className={s.statLabel}>{st.label}</span><span className={s.statIcon} style={{background:st.color+'18'}}>{st.icon}</span></div>
            <div className={s.statValue}>{st.value}</div>
            <div className={s.statChange}>{st.change} this month</div>
          </div>
        ))}
      </div>
      <div className={s.card}>
        <h2 className={s.cardTitle}>Recent Orders</h2>
        <table className={s.table}>
          <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {recentOrders.map(o => (
              <tr key={o.id}>
                <td className={s.mono}>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td>₹{o.amount.toLocaleString()}</td>
                <td><span className={s.badge} style={{background:sColor[o.status]+'18',color:sColor[o.status]}}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
