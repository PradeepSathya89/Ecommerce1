import { useParams, Link } from 'react-router-dom'
import s from './OrderSuccess.module.css'
export default function OrderSuccess() {
  const { orderId } = useParams()
  return (
    <div className={s.page}>
      <div className={s.card}>
        <div className={s.tick}>✓</div>
        <h1>Order Confirmed!</h1>
        <p className={s.id}>Order ID: <strong>{orderId}</strong></p>
        <p className={s.msg}>Your order has been placed successfully! You will receive a confirmation email shortly.</p>
        <div className={s.steps}>
          {['Order Placed','Confirmed','Shipped','Out for Delivery','Delivered'].map((st,i) => (
            <div key={st} className={`${s.step} ${i===0?s.done:''}`}>
              <div className={s.dot}/>{i<4&&<div className={`${s.line}`}/>}<span>{st}</span>
            </div>
          ))}
        </div>
        <div className={s.actions}>
          <Link to="/orders" className={s.btnPrimary}>Track Order</Link>
          <Link to="/" className={s.btnSecondary}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
