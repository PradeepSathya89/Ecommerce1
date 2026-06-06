import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import s from './Login.module.css'
export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'' })
  const [errors, setErrors] = useState({})
  const { login } = useApp()
  const navigate = useNavigate()
  const validate = () => {
    const e = {}
    if (!isLogin && !form.name.trim()) e.name = 'Name is required'
    if (!form.email.includes('@')) e.email = 'Enter a valid email'
    if (form.password.length < 6) e.password = 'Min. 6 characters'
    return e
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    login({ name: form.name || 'Customer', email: form.email, phone: form.phone })
    navigate('/')
  }
  const change = (f, v) => { setForm(p => ({...p,[f]:v})); setErrors(e => ({...e,[f]:''})) }
  return (
    <div className={s.page}>
      <div className={s.left}>
        <h1>Login</h1>
        <p>Get access to your Orders, Wishlist and Recommendations</p>
        <div className={s.leftImg}>🛍️</div>
      </div>
      <div className={s.right}>
        <div className={s.tabs}>
          <button className={`${s.tab} ${isLogin?s.active:''}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`${s.tab} ${!isLogin?s.active:''}`} onClick={() => setIsLogin(false)}>New User? Sign Up</button>
        </div>
        <form className={s.form} onSubmit={handleSubmit}>
          {!isLogin && <div className={s.field}><label>Full Name</label><input value={form.name} onChange={e => change('name',e.target.value)} placeholder="Ram Sathya Pradeep"/>{errors.name && <span className={s.err}>{errors.name}</span>}</div>}
          <div className={s.field}><label>Email Address</label><input type="email" value={form.email} onChange={e => change('email',e.target.value)} placeholder="you@example.com"/>{errors.email && <span className={s.err}>{errors.email}</span>}</div>
          {!isLogin && <div className={s.field}><label>Mobile Number</label><input value={form.phone} onChange={e => change('phone',e.target.value)} placeholder="+91 98765 43210"/></div>}
          <div className={s.field}><label>Password</label><input type="password" value={form.password} onChange={e => change('password',e.target.value)} placeholder="Min. 6 characters"/>{errors.password && <span className={s.err}>{errors.password}</span>}</div>
          {isLogin && <p className={s.hint}>💡 Demo: any email + password (6+ chars)</p>}
          <p className={s.terms}>By continuing, you agree to ShopEasy's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>
          <button type="submit" className={s.submitBtn}>{isLogin ? 'Login' : 'Create Account'}</button>
        </form>
        <p className={s.toggle}><button onClick={() => setIsLogin(l => !l)}>{isLogin ? 'New to ShopEasy? Create an account' : 'Existing user? Log in'}</button></p>
      </div>
    </div>
  )
}
