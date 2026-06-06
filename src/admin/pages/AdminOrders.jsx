import { useState } from 'react'
import s from './Admin.module.css'
const ordersData = [
  { id:'SE1001', customer:'Priya Sharma', product:'iPhone 15 Pro Max', amount:159900, date:'28 May 2026', status:'Delivered' },
  { id:'SE1002', customer:'Rohan Mehta', product:'Samsung Galaxy S24', amount:129999, date:'27 May 2026', status:'Shipped' },
  { id:'SE1003', customer:'Ananya Krishnan', product:'MacBook Air M3', amount:114900, date:'26 May 2026', status:'Processing' },
  { id:'SE1004', customer:'Vikram Nair', product:"Levi's Slim Jeans", amount:2499, date:'25 May 2026', status:'Delivered' },
  { id:'SE1005', customer:'Sneha Iyer', product:'Sony WH-1000XM5', amount:24990, date:'24 May 2026', status:'Cancelled' },
  { id:'SE1006', customer:'Karthik Reddy', product:'LG 1.5 Ton AC', amount:42990, date:'23 May 2026', status:'Shipped' },
]
const sColor = { Delivered:'#2e7d32', Shipped:'#1565c0', Processing:'#e65100', Cancelled:'#c62828' }
const allStatuses = ['All','Delivered','Shipped','Processing','Cancelled']
export default function AdminOrders() {
  const [orders, setOrders] = useState(ordersData)
  const [filter, setFilter] = useState('All')
  const filtered = filter==='All' ? orders : orders.filter(o => o.status===filter)
  const updateStatus = (id, status) => setOrders(prev => prev.map(o => o.id===id ? {...o,status} : o))
  return (
    <div>
      <div className={s.pageHeader}><h1>Orders ({orders.length})</h1></div>
      <div className={s.card}>
        <div className={s.tableHeader}>
          <div className={s.filters}>{allStatuses.map(st => <button key={st} className={`${s.filterBtn} ${filter===st?s.filterActive:''}`} onClick={() => setFilter(st)}>{st}</button>)}</div>
        </div>
        <table className={s.table}>
          <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Date</th><th>Amount</th><th>Status</th><th>Update</th></tr></thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id}>
                <td className={s.mono}>{o.id}</td><td>{o.customer}</td><td>{o.product}</td><td>{o.date}</td>
                <td>₹{o.amount.toLocaleString()}</td>
                <td><span className={s.badge} style={{background:sColor[o.status]+'18',color:sColor[o.status]}}>{o.status}</span></td>
                <td><select className={s.select} value={o.status} onChange={e => updateStatus(o.id,e.target.value)}>
                  {['Processing','Shipped','Delivered','Cancelled'].map(st => <option key={st}>{st}</option>)}
                </select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
