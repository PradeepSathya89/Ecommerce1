import { useState } from 'react'
import s from './Admin.module.css'
const customersData = [
  { id:1, name:'Priya Sharma', email:'priya@example.com', orders:12, spent:485000, joined:'Jan 2024', tier:'VIP' },
  { id:2, name:'Rohan Mehta', email:'rohan@example.com', orders:4, spent:52000, joined:'Mar 2025', tier:'Regular' },
  { id:3, name:'Ananya Krishnan', email:'ananya@example.com', orders:7, spent:98000, joined:'Nov 2024', tier:'Premium' },
  { id:4, name:'Vikram Nair', email:'vikram@example.com', orders:21, spent:310000, joined:'Jun 2023', tier:'VIP' },
  { id:5, name:'Sneha Iyer', email:'sneha@example.com', orders:40, spent:520000, joined:'Feb 2023', tier:'VIP' },
  { id:6, name:'Karthik Reddy', email:'karthik@example.com', orders:3, spent:42000, joined:'Apr 2026', tier:'Regular' },
]
const tColor = { VIP:'#e65100', Premium:'#1565c0', Regular:'#2e7d32' }
export default function AdminCustomers() {
  const [search, setSearch] = useState('')
  const filtered = customersData.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <div className={s.pageHeader}><h1>Customers ({customersData.length})</h1></div>
      <div className={s.card}>
        <div className={s.tableHeader}><h2 className={s.cardTitle}>All Customers</h2><input className={s.search} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <table className={s.table}>
          <thead><tr><th>Name</th><th>Email</th><th>Orders</th><th>Total Spent</th><th>Joined</th><th>Tier</th></tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td><strong>{c.name}</strong></td>
                <td style={{color:'var(--gray2)'}}>{c.email}</td>
                <td>{c.orders}</td>
                <td>₹{c.spent.toLocaleString()}</td>
                <td>{c.joined}</td>
                <td><span className={s.badge} style={{background:tColor[c.tier]+'18',color:tColor[c.tier]}}>{c.tier}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
