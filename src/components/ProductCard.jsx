import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import s from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp()
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)

  return (
    <div className={s.card}>
      <button className={`${s.wishBtn} ${isWishlisted(product.id) ? s.wishlisted : ''}`} onClick={() => toggleWishlist(product)} title="Wishlist">
        {isWishlisted(product.id) ? '❤️' : '♡'}
      </button>

      <Link to={`/product/${product.id}`} className={s.imgArea}>
        <div className={s.emoji}>{product.emoji}</div>
      </Link>

      <div className={s.info}>
        <p className={s.brand}>{product.brand}</p>
        <Link to={`/product/${product.id}`} className={s.name}>{product.name}</Link>

        <div className={s.ratingRow}>
          <span className={s.ratingBadge}>{product.rating} ★</span>
          <span className={s.reviews}>({product.reviews.toLocaleString()})</span>
        </div>

        <div className={s.priceRow}>
          <span className={s.price}>₹{product.price.toLocaleString()}</span>
          {discount > 0 && <>
            <span className={s.mrp}>₹{product.mrp.toLocaleString()}</span>
            <span className={s.discount}>{discount}% off</span>
          </>}
        </div>

        {product.freeDelivery && <p className={s.freeDelivery}>Free Delivery</p>}

        <button className={s.addBtn} onClick={() => addToCart(product)}>ADD TO CART</button>
      </div>
    </div>
  )
}
