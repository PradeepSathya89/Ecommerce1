import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import s from './OrderHistory.module.css'
const statusColor = { 'Order Placed':'#fb641b','Confirmed':'#2874f0','Shipped':'#9c27b0','Out for Delivery':'#ff9800','Delivered':'#388e3c' }
export default function OrderHistory() {
  const { orders, user } = useApp()
  if (!user) return <div className={s.empty}><span>🔐</span><h2>Please login</h2><Link to="/login" className={s.btn}>Login</Link></div>
  if (orders.length===0) return <div className={s.empty}><span>📦</span><h2>No orders yet</h2><p>Order something!</p><Link to="/products" className={s.btn}>Shop Now</Link></div>
  return (
    <div className={s.page}>
      <h1>My Orders</h1>
      <div className={s.orders}>
        {orders.map(order => (
          <div key={order.id} className={s.order}>
            <div className={s.orderTop}>
              <div className={s.orderId}>Order #{order.id}</div>
              <div className={s.orderDate}>{order.date}</div>
              <div className={s.orderTotal}>₹{order.total.toLocaleString()}</div>
              <div className={s.orderPay}>{order.payment?.toUpperCase()}</div>
            </div>
            <div className={s.tracker}>
              {order.statusSteps.map((st,i) => (
                <div key={st} className={`${s.tStep} ${i<=order.currentStep?s.tDone:''}`}>
                  <div className={s.tDot}/>{i<order.statusSteps.length-1&&<div className={`${s.tLine} ${i<order.currentStep?s.tLineDone:''}`}/>}
                  <span>{st}</span>
                </div>
              ))}
            </div>
            <div className={s.items}>
              {order.items.map(item => (
                <div key={item.id} className={s.item}>
                  <span className={s.itemEmoji}>{item.emoji}</span>
                  <div className={s.itemInfo}><p className={s.itemName}>{item.name}</p><p className={s.itemMeta}>{item.brand} · Qty: {item.qty}</p></div>
                  <span className={s.itemPrice}>₹{(item.price*item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className={s.orderFooter}>
              <span className={s.statusBadge} style={{background:statusColor[order.status]+'18',color:statusColor[order.status]}}>{order.status}</span>
              <span className={s.addr}>📍 {order.address}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
