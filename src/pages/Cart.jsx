import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import s from './Cart.module.css'

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, user } = useApp()
  const navigate = useNavigate()
  const delivery = cartTotal >= 499 ? 0 : 49
  const total = cartTotal + delivery
  const savings = cart.reduce((s,i) => s + (i.mrp - i.price)*i.qty, 0)

  if (cart.length === 0) return (
    <div className={s.empty}>
      <span>🛒</span>
      <h2>Your cart is empty!</h2>
      <p>Add items to it now.</p>
      <Link to="/products" className={s.shopBtn}>Shop Now</Link>
    </div>
  )

  return (
    <div className={s.page}>
      <div className={s.layout}>
        <div className={s.left}>
          <div className={s.cartHeader}>
            <h2>My Cart ({cart.length})</h2>
            {savings > 0 && <span className={s.savingsTag}>🎉 You are saving ₹{savings.toLocaleString()} on this order!</span>}
          </div>
          {cart.map(item => {
            const disc = Math.round(((item.mrp - item.price)/item.mrp)*100)
            return (
              <div key={item.id} className={s.item}>
                <Link to={`/product/${item.id}`} className={s.itemImg}>{item.emoji}</Link>
                <div className={s.itemInfo}>
                  <p className={s.itemBrand}>{item.brand}</p>
                  <Link to={`/product/${item.id}`} className={s.itemName}>{item.name}</Link>
                  <p className={s.itemUnit}>{item.unit || ''}</p>
                  <div className={s.itemPrice}>
                    <span className={s.price}>₹{item.price.toLocaleString()}</span>
                    <span className={s.mrp}>₹{item.mrp.toLocaleString()}</span>
                    {disc > 0 && <span className={s.disc}>{disc}% off</span>}
                  </div>
                  {item.freeDelivery && <p className={s.free}>Free Delivery</p>}
                  <div className={s.itemActions}>
                    <div className={s.qtyCtrl}>
                      <button onClick={() => updateQty(item.id, item.qty-1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty+1)}>+</button>
                    </div>
                    <button className={s.removeBtn} onClick={() => removeFromCart(item.id)}>REMOVE</button>
                    <button className={s.saveBtn} onClick={() => removeFromCart(item.id)}>SAVE FOR LATER</button>
                  </div>
                </div>
              </div>
            )
          })}
          <div className={s.placeRow}>
            <button className={s.placeBtn} onClick={() => user ? navigate('/checkout') : navigate('/login')}>
              PLACE ORDER
            </button>
          </div>
        </div>

        <div className={s.right}>
          <div className={s.priceCard}>
            <h3>PRICE DETAILS</h3>
            <div className={s.priceRows}>
              <div className={s.priceRow}><span>Price ({cart.length} item{cart.length>1?'s':''})</span><span>₹{cartTotal.toLocaleString()}</span></div>
              {savings > 0 && <div className={`${s.priceRow} ${s.green}`}><span>Discount</span><span>− ₹{savings.toLocaleString()}</span></div>}
              <div className={s.priceRow}><span>Delivery Charges</span><span className={delivery===0?s.green:''}>{delivery===0?'FREE':'₹'+delivery}</span></div>
            </div>
            <div className={s.totalRow}><span>TOTAL AMOUNT</span><span>₹{total.toLocaleString()}</span></div>
            {savings > 0 && <p className={s.savingsNote}>🎉 You will save ₹{savings.toLocaleString()} on this order</p>}
          </div>

          <div className={s.safeCard}>
            <span>🔒</span> <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
