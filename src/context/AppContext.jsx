import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('se_cart') || '[]'))
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('se_wishlist') || '[]'))
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('se_user') || 'null'))
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('se_orders') || '[]'))
  const [toast, setToast] = useState(null)

  useEffect(() => { localStorage.setItem('se_cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('se_wishlist', JSON.stringify(wishlist)) }, [wishlist])
  useEffect(() => { localStorage.setItem('se_user', JSON.stringify(user)) }, [user])
  useEffect(() => { localStorage.setItem('se_orders', JSON.stringify(orders)) }, [orders])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2500)
  }

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    showToast(`${product.name} added to cart!`)
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const updateQty = (id, qty) => { if (qty < 1) return removeFromCart(id); setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i)) }
  const clearCart = () => setCart([])

  const toggleWishlist = (product) => {
    const exists = wishlist.find(i => i.id === product.id)
    if (exists) { setWishlist(prev => prev.filter(i => i.id !== product.id)); showToast('Removed from wishlist', 'info') }
    else { setWishlist(prev => [...prev, product]); showToast('Added to Wishlist ❤️') }
  }
  const isWishlisted = (id) => wishlist.some(i => i.id === id)

  const login = (userData) => { setUser(userData); showToast(`Welcome, ${userData.name.split(' ')[0]}! 👋`) }
  const logout = () => { setUser(null); showToast('Logged out', 'info') }

  const placeOrder = (orderData) => {
    const order = {
      id: `SE${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      total: orderData.total,
      address: orderData.address,
      payment: orderData.payment,
      status: 'Order Placed',
      statusSteps: ['Order Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'],
      currentStep: 0,
    }
    setOrders(prev => [order, ...prev])
    clearCart()
    showToast('Order placed successfully! 🎉')
    return order.id
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <AppContext.Provider value={{ cart, wishlist, user, orders, toast, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, isWishlisted, login, logout, placeOrder, cartCount, cartTotal, showToast }}>
      {children}
      {toast && (
        <div style={{ position:'fixed', bottom:'1.5rem', left:'50%', transform:'translateX(-50%)', background: toast.type==='success'?'#212121':toast.type==='info'?'#1565c0':'#c62828', color:'#fff', padding:'0.7rem 1.5rem', borderRadius:'4px', fontFamily:'Roboto,sans-serif', fontSize:'0.88rem', fontWeight:500, boxShadow:'0 4px 20px rgba(0,0,0,0.3)', zIndex:9999, animation:'fadeUp 0.3s ease', whiteSpace:'nowrap' }}>
          {toast.msg}
        </div>
      )}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
