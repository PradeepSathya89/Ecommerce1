import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import s from './ProductDetail.module.css'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const { addToCart, toggleWishlist, isWishlisted } = useApp()
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()

  if (!product) return <div className={s.notFound}><h2>Product not found</h2><Link to="/">Go Home</Link></div>

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5)

  return (
    <div className={s.page}>
      <div className={s.breadcrumb}>
        <Link to="/">Home</Link> › <Link to="/products">Products</Link> › <Link to={`/products/${product.category}`}>{product.category}</Link> › <span>{product.name}</span>
      </div>
      <div className={s.detail}>
        <div className={s.imgCol}>
          <div className={s.imgBox}>
            <div className={s.bigEmoji}>{product.emoji}</div>
            {product.badge && <span className={s.badge}>{product.badge}</span>}
          </div>
          <div className={s.imgActions}>
            <button className={s.addCartBig} onClick={() => { for(let i=0;i<qty;i++) addToCart(product) }}>🛒 ADD TO CART</button>
            <button className={s.buyNowBig} onClick={() => { addToCart(product); navigate('/checkout') }}>⚡ BUY NOW</button>
          </div>
          <button className={`${s.wishBig} ${isWishlisted(product.id)?s.wishlisted:''}`} onClick={() => toggleWishlist(product)}>
            {isWishlisted(product.id) ? '❤️ Wishlisted' : '♡ Add to Wishlist'}
          </button>
        </div>
        <div className={s.infoCol}>
          <p className={s.brand}>{product.brand}</p>
          <h1 className={s.title}>{product.name}</h1>
          <div className={s.ratingRow}>
            <span className={s.ratingBadge}>{product.rating} ★</span>
            <span className={s.reviews}>{product.reviews.toLocaleString()} Ratings & Reviews</span>
          </div>
          <div className={s.priceSec}>
            <span className={s.price}>₹{product.price.toLocaleString()}</span>
            {discount > 0 && <><span className={s.mrp}>₹{product.mrp.toLocaleString()}</span><span className={s.discount}>{discount}% off</span></>}
          </div>
          {discount > 0 && <p className={s.savings}>You save ₹{(product.mrp - product.price).toLocaleString()}</p>}
          <div className={s.offersBox}>
            <h3>Available Offers</h3>
            <p>💳 <strong>Bank Offer:</strong> 10% off on SBI Credit Card, max ₹1500</p>
            <p>📱 <strong>No Cost EMI</strong> starting from ₹{Math.round(product.price/12).toLocaleString()}/month</p>
            <p>🔄 <strong>Partner Offer:</strong> Buy 2, save extra 5%</p>
          </div>
          <div className={s.qtyRow}>
            <span>Quantity:</span>
            <div className={s.qtyCtrl}>
              <button onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q+1)}>+</button>
            </div>
          </div>
          <div className={s.deliverySec}>
            <h3>Delivery</h3>
            <div className={s.deliveryRow}>
              {product.freeDelivery ? <span className={s.freeTag}>🚚 Free Delivery</span> : <span className={s.paidTag}>🚚 ₹49 Delivery</span>}
              <span className={s.deliveryDate}>by {new Date(Date.now()+product.deliveryDays*86400000).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})}</span>
            </div>
            <p className={s.returnPolicy}>🔄 10 Day Replacement Policy</p>
          </div>
          {product.specs && (
            <div className={s.specsSec}>
              <h3>Specifications</h3>
              <table className={s.specsTable}><tbody>
                {Object.entries(product.specs).map(([k,v]) => (
                  <tr key={k}><td className={s.specKey}>{k}</td><td className={s.specVal}>{v}</td></tr>
                ))}
              </tbody></table>
            </div>
          )}
          <div className={s.descSec}><h3>Description</h3><p>{product.description}</p></div>
        </div>
      </div>
      {related.length > 0 && (
        <div className={s.related}>
          <h2>Similar Products</h2>
          <div className={s.relatedGrid}>{related.map(p => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      )}
    </div>
  )
}
