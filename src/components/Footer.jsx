import { Link } from 'react-router-dom'
import s from './Footer.module.css'
export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div className={s.col}><h4>ABOUT</h4><Link to="#">About Us</Link><Link to="#">Careers</Link><Link to="#">Press</Link><Link to="#">Corporate Information</Link></div>
        <div className={s.col}><h4>HELP</h4><Link to="#">Payments</Link><Link to="#">Shipping</Link><Link to="#">Cancellation & Returns</Link><Link to="#">FAQ</Link></div>
        <div className={s.col}><h4>CONSUMER POLICY</h4><Link to="#">Cancellation & Returns</Link><Link to="#">Terms Of Use</Link><Link to="#">Security</Link><Link to="#">Privacy</Link></div>
        <div className={s.col}><h4>MY ACCOUNT</h4><Link to="/login">Login</Link><Link to="/orders">My Orders</Link><Link to="/cart">Cart</Link><Link to="/wishlist">Wishlist</Link></div>
        <div className={s.col}>
          <h4>SHOP BY CATEGORY</h4>
          {['Mobiles','Electronics','Fashion','Appliances','Furniture','Beauty','Sports','Books'].map(c => (
            <Link key={c} to={`/products/${c.toLowerCase()}`}>{c}</Link>
          ))}
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.bottomLeft}>
          <span className={s.logoText}>ShopEasy</span>
          <span>© 2026 ShopEasy.com</span>
          <span>|</span>
          <Link to="#">Terms</Link>
          <span>|</span>
          <Link to="#">Privacy</Link>
        </div>
        <div className={s.bottomRight}>
          <span>🔒 Secure Payments</span>
          <span>💳 💵 📱 🏦</span>
        </div>
      </div>
    </footer>
  )
}
