import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import s from './Navbar.module.css'

const navCategories = [
  { label: 'Mobiles', path: '/products/mobiles' },
  { label: 'Electronics', path: '/products/electronics' },
  { label: 'Fashion', path: '/products/fashion' },
  { label: 'Appliances', path: '/products/appliances' },
  { label: 'Furniture', path: '/products/furniture' },
  { label: 'Beauty', path: '/products/beauty' },
  { label: 'Sports', path: '/products/sports' },
  { label: 'Books', path: '/products/books' },
  { label: 'Toys', path: '/products/toys' },
  { label: 'Grocery', path: '/products/grocery' },
]

export default function Navbar() {
  const { cartCount, wishlist, user, logout } = useApp()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) { navigate(`/products?q=${encodeURIComponent(search)}`); setSearch('') }
  }

  return (
    <header className={s.header}>
      <div className={s.nav}>
        <Link to="/" className={s.logo}>
          <span className={s.logoText}>ShopEasy</span>
          <span className={s.logoSub}>Explore <em>Plus</em></span>
        </Link>

        <form className={s.searchForm} onSubmit={handleSearch}>
          <input className={s.searchInput} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for products, brands and more" />
          <button type="submit" className={s.searchBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </form>

        <div className={s.actions}>
          {user ? (
            <div className={s.userMenu}>
              <button className={s.navBtn}>
                <span className={s.navBtnIcon}>👤</span>
                <span>{user.name.split(' ')[0]}</span>
                <span className={s.arrow}>▾</span>
              </button>
              <div className={s.dropdown}>
                <div className={s.dropHeader}>My Account</div>
                <Link to="/orders">My Orders</Link>
                <Link to="/wishlist">My Wishlist</Link>
                <div className={s.dropDivider}/>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className={s.loginBtn}>Login</Link>
          )}

          <div className={s.navItem}>
            <Link to="/products" className={s.navBtn}>
              <span>More</span><span className={s.arrow}>▾</span>
            </Link>
          </div>

          <Link to="/cart" className={s.cartBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>Cart</span>
            {cartCount > 0 && <span className={s.cartBadge}>{cartCount}</span>}
          </Link>

          <Link to="/admin" className={s.adminBtn}>Admin</Link>
        </div>

        <button className={s.menuBtn} onClick={() => setMenuOpen(o => !o)}>☰</button>
      </div>

      <div className={s.catBar}>
        {navCategories.map(c => (
          <Link key={c.path} to={c.path} className={s.catLink}>{c.label}</Link>
        ))}
      </div>

      {menuOpen && (
        <div className={s.mobileMenu}>
          <form onSubmit={handleSearch} className={s.mobileSearch}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." />
            <button type="submit">Go</button>
          </form>
          {navCategories.map(c => <Link key={c.path} to={c.path} onClick={() => setMenuOpen(false)}>{c.label}</Link>)}
          <Link to="/cart" onClick={() => setMenuOpen(false)}>🛒 Cart ({cartCount})</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>❤️ Wishlist</Link>
          {user ? (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)}>📦 My Orders</Link>
              <button onClick={() => { logout(); setMenuOpen(false) }}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login / Sign Up</Link>
          )}
        </div>
      )}
    </header>
  )
}
