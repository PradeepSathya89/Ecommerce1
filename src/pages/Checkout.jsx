import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import s from './Checkout.module.css'

export default function Checkout() {
  const { cart, cartTotal, user, placeOrder } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [address, setAddress] = useState({ name: user?.name||'', phone: user?.phone||'', street:'', area:'', city:'Hyderabad', pincode:'', state:'Telangana', type:'Home' })
  const [payment, setPayment] = useState('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [placing, setPlacing] = useState(false)

  const delivery = cartTotal >= 499 ? 0 : 49
  const total = cartTotal + delivery
  const savings = cart.reduce((s,i) => s + (i.mrp - i.price)*i.qty, 0)

  if (cart.length === 0) return <div className={s.empty}><h2>Cart is empty</h2><Link to="/products" className={s.shopBtn}>Shop Now</Link></div>

  const handlePlace = async () => {
    setPlacing(true)
    await new Promise(r => setTimeout(r, 1500))
    const orderId = placeOrder({ total, address: `${address.street}, ${address.area}, ${address.city} - ${address.pincode}`, payment })
    navigate(`/order-success/${orderId}`)
  }

  return (
    <div className={s.page}>
      <div className={s.layout}>
        <div className={s.main}>
          {/* Step 1: Login */}
          <div className={s.stepCard}>
            <div className={s.stepHead}>
              <div className={`${s.stepNum} ${step>=1?s.done:''}`}>1</div>
              <span>LOGIN</span>
              {user && <span className={s.stepInfo}>{user.name} — {user.email}</span>}
            </div>
          </div>

          {/* Step 2: Address */}
          <div className={`${s.stepCard} ${step===2?s.active:''}`}>
            <div className={s.stepHead} onClick={() => step>2&&setStep(2)} style={{cursor:step>2?'pointer':'default'}}>
              <div className={`${s.stepNum} ${step>2?s.done:step===2?s.current:''}`}>{step>2?'✓':'2'}</div>
              <span>DELIVERY ADDRESS</span>
              {step>2 && <span className={s.stepInfo}>{address.street}, {address.city}</span>}
            </div>
            {step===2 && (
              <div className={s.stepBody}>
                <div className={s.addrTypes}>
                  {['Home','Work','Other'].map(t => <button key={t} className={`${s.typeBtn} ${address.type===t?s.typeActive:''}`} onClick={() => setAddress(a=>({...a,type:t}))}>{t}</button>)}
                </div>
                <div className={s.formGrid}>
                  {[{l:'Name',k:'name',p:'Full Name'},{l:'Phone',k:'phone',p:'10-digit mobile'},{l:'Pincode',k:'pincode',p:'6-digit pincode'},{l:'City',k:'city',p:'City'},{l:'State',k:'state',p:'State'}].map(f => (
                    <div key={f.k} className={s.fld}><label>{f.l}</label><input value={address[f.k]} onChange={e=>setAddress(a=>({...a,[f.k]:e.target.value}))} placeholder={f.p}/></div>
                  ))}
                  <div className={s.fld} style={{gridColumn:'1/-1'}}><label>Address (House No, Street, Area)</label><input value={address.street} onChange={e=>setAddress(a=>({...a,street:e.target.value}))} placeholder="House No., Street Name"/></div>
                  <div className={s.fld} style={{gridColumn:'1/-1'}}><label>Locality / Area</label><input value={address.area} onChange={e=>setAddress(a=>({...a,area:e.target.value}))} placeholder="Area, Colony, Sector"/></div>
                </div>
                <button className={s.nextBtn} onClick={() => setStep(3)}>DELIVER HERE</button>
              </div>
            )}
          </div>

          {/* Step 3: Payment */}
          <div className={`${s.stepCard} ${step===3?s.active:''}`}>
            <div className={s.stepHead} onClick={() => step>3&&setStep(3)} style={{cursor:step>3?'pointer':'default'}}>
              <div className={`${s.stepNum} ${step>3?s.done:step===3?s.current:''}`}>{step>3?'✓':'3'}</div>
              <span>PAYMENT OPTIONS</span>
            </div>
            {step===3 && (
              <div className={s.stepBody}>
                <div className={s.payLayout}>
                  <div className={s.payMethods}>
                    {[
                      {id:'upi', label:'UPI', icon:'📱'},
                      {id:'card', label:'Credit / Debit Card', icon:'💳'},
                      {id:'netbanking', label:'Net Banking', icon:'🏦'},
                      {id:'wallet', label:'Wallets', icon:'👛'},
                      {id:'cod', label:'Cash on Delivery', icon:'💵'},
                      {id:'emi', label:'EMI (No Cost)', icon:'📅'},
                    ].map(m => (
                      <button key={m.id} className={`${s.payMethod} ${payment===m.id?s.payActive:''}`} onClick={() => setPayment(m.id)}>
                        <span>{m.icon}</span><span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className={s.payDetail}>
                    {payment==='upi' && <div className={s.payForm}><h4>Pay via UPI</h4><input value={upiId} onChange={e=>setUpiId(e.target.value)} placeholder="Enter UPI ID (e.g. ram@upi)"/><div className={s.upiApps}>{['GPay','PhonePe','Paytm','BHIM'].map(a=><span key={a} className={s.upiApp}>{a}</span>)}</div></div>}
                    {payment==='card' && <div className={s.payForm}><h4>Credit / Debit Card</h4><input value={cardNum} onChange={e=>setCardNum(e.target.value)} placeholder="Card Number" maxLength={16}/><div className={s.cardRow}><input placeholder="MM/YY"/><input placeholder="CVV" maxLength={3}/></div><input placeholder="Name on Card"/></div>}
                    {payment==='netbanking' && <div className={s.payForm}><h4>Select Bank</h4><div className={s.bankGrid}>{['SBI','HDFC','ICICI','Axis','Kotak','PNB'].map(b=><button key={b} className={s.bankBtn} onClick={() => {}}>{b}</button>)}</div></div>}
                    {payment==='cod' && <div className={s.payForm}><h4>Cash on Delivery</h4><p>Pay ₹{total.toLocaleString()} when your order is delivered.</p></div>}
                    {payment==='emi' && <div className={s.payForm}><h4>No Cost EMI</h4>{[3,6,9,12].map(m=><div key={m} className={s.emiRow}><input type="radio" name="emi" id={`emi${m}`}/><label htmlFor={`emi${m}`}>{m} months — ₹{Math.round(total/m).toLocaleString()}/month</label></div>)}</div>}
                    {payment==='wallet' && <div className={s.payForm}><h4>Wallets</h4><div className={s.bankGrid}>{['Paytm','PhonePe','Amazon Pay','Mobikwik'].map(w=><button key={w} className={s.bankBtn}>{w}</button>)}</div></div>}
                    <button className={s.placeBtn} onClick={handlePlace} disabled={placing}>
                      {placing ? '⏳ Placing Order...' : `PAY ₹${total.toLocaleString()}`}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className={s.summary}>
          <div className={s.summaryCard}>
            <h3>PRICE DETAILS</h3>
            <div className={s.sumRows}>
              <div className={s.sumRow}><span>Price ({cart.length} items)</span><span>₹{cartTotal.toLocaleString()}</span></div>
              {savings>0&&<div className={`${s.sumRow} ${s.green}`}><span>Discount</span><span>− ₹{savings.toLocaleString()}</span></div>}
              <div className={s.sumRow}><span>Delivery</span><span className={delivery===0?s.green:''}>{delivery===0?'FREE':'₹'+delivery}</span></div>
              <div className={s.sumTotal}><span>Total Amount</span><span>₹{total.toLocaleString()}</span></div>
            </div>
            {savings>0&&<p className={s.saveMsg}>🎉 You will save ₹{savings.toLocaleString()} on this order</p>}
          </div>
          <div className={s.safeCard}><span>🔒</span><span>Safe and Secure Payments</span></div>
        </div>
      </div>
    </div>
  )
}
