import { NavLink, Outlet, Link } from 'react-router-dom'
import s from './AdminLayout.module.css'
const nav = [
  { to:'/admin', label:'Dashboard', icon:'📊', end:true },
  { to:'/admin/products', label:'Products', icon:'🛍️' },
  { to:'/admin/orders', label:'Orders', icon:'📦' },
  { to:'/admin/customers', label:'Customers', icon:'👥' },
]
export default function AdminLayout() {
  return (
    <div className={s.shell}>
      <aside className={s.sidebar}>
        <div className={s.brand}><span className={s.logo}>ShopEasy</span><span className={s.tag}>Admin</span></div>
        <nav className={s.nav}>
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({isActive}) => `${s.item} ${isActive?s.active:''}`}>
              <span>{n.icon}</span><span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className={s.bottom}><Link to="/" className={s.back}>← Back to Store</Link></div>
      </aside>
      <main className={s.main}><Outlet /></main>
    </div>
  )
}
