import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import s from './Wishlist.module.css'
export default function Wishlist() {
  const { wishlist } = useApp()
  if (wishlist.length === 0) return (
    <div className={s.empty}><span>♡</span><h2>Empty Wishlist</h2><p>You have no items in your wishlist. Start adding!</p><Link to="/products" className={s.btn}>Continue Shopping</Link></div>
  )
  return (
    <div className={s.page}>
      <div className={s.header}><h2>My Wishlist ({wishlist.length})</h2></div>
      <div className={s.grid}>{wishlist.map(p => <ProductCard key={p.id} product={p} />)}</div>
    </div>
  )
}
