import { useState } from 'react'
import { products as initial } from '../../data/products'
import s from './Admin.module.css'
const sColor = { Active:'#2e7d32', 'Out of Stock':'#c62828' }
export default function AdminProducts() {
  const [items, setItems] = useState(initial.map(p => ({ ...p, status: p.inStock ? 'Active' : 'Out of Stock' })))
  const [search, setSearch] = useState('')
  const filtered = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <div className={s.pageHeader}><h1>Products ({items.length})</h1></div>
      <div className={s.card}>
        <div className={s.tableHeader}>
          <h2 className={s.cardTitle}>All Products</h2>
          <input className={s.search} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <table className={s.table}>
          <thead><tr><th>Product</th><th>Brand</th><th>Category</th><th>Price</th><th>MRP</th><th>Rating</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><div style={{display:'flex',alignItems:'center',gap:'0.6rem'}}><span style={{fontSize:'1.4rem'}}>{p.emoji}</span><strong>{p.name}</strong></div></td>
                <td>{p.brand}</td>
                <td style={{textTransform:'capitalize'}}>{p.category}</td>
                <td>₹{p.price.toLocaleString()}</td>
                <td>₹{p.mrp.toLocaleString()}</td>
                <td>{p.rating} ★</td>
                <td><span className={s.badge} style={{background:sColor[p.status]+'18',color:sColor[p.status]}}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
