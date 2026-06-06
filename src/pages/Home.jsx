import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { products, categories, offers } from '../data/products'
import ProductCard from '../components/ProductCard'
import s from './Home.module.css'

const banners = [
  { bg: 'linear-gradient(135deg,#1a237e 0%,#283593 100%)', title: 'Big Billion Days', subtitle: 'Up to 80% off on Electronics', cta: 'Shop Now', link: '/products/electronics', emoji: '⚡' },
  { bg: 'linear-gradient(135deg,#880e4f 0%,#c2185b 100%)', title: 'Fashion Sale', subtitle: 'Min 50% off on Top Brands', cta: 'Explore', link: '/products/fashion', emoji: '👗' },
  { bg: 'linear-gradient(135deg,#004d40 0%,#00796b 100%)', title: 'Mobile Mania', subtitle: 'Latest phones at best prices', cta: 'Buy Now', link: '/products/mobiles', emoji: '📱' },
]

export default function Home() {
  const [bannerIdx, setBannerIdx] = useState(0)
  useEffect(() => { const t = setInterval(() => setBannerIdx(i => (i + 1) % banners.length), 4000); return () => clearInterval(t) }, [])

  const topDeals = products.filter(p => p.badge && ['Bestseller','#1 Bestseller','Top Rated','Popular'].includes(p.badge)).slice(0, 8)
  const mobiles = products.filter(p => p.category === 'mobiles')
  const electronics = products.filter(p => p.category === 'electronics')
  const fashion = products.filter(p => p.category === 'fashion')

  return (
    <div className={s.page}>
      {/* HERO BANNER */}
      <div className={s.heroSection}>
        <div className={s.bannerWrap}>
          {banners.map((b, i) => (
            <div key={i} className={`${s.banner} ${i === bannerIdx ? s.bannerActive : ''}`} style={{ background: b.bg }}>
              <div className={s.bannerContent}>
                <span className={s.bannerEmoji}>{b.emoji}</span>
                <h1>{b.title}</h1>
                <p>{b.subtitle}</p>
                <Link to={b.link} className={s.bannerCta}>{b.cta} →</Link>
              </div>
            </div>
          ))}
          <div className={s.bannerDots}>
            {banners.map((_, i) => <button key={i} className={`${s.dot} ${i === bannerIdx ? s.dotActive : ''}`} onClick={() => setBannerIdx(i)} />)}
          </div>
        </div>

        <div className={s.offerCards}>
          {offers.map(o => (
            <Link key={o.id} to={o.link} className={s.offerCard} style={{ background: o.bg }}>
              <span className={s.offerEmoji}>{o.emoji}</span>
              <div>
                <strong>{o.title}</strong>
                <span>{o.subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className={s.catSection}>
        <h2>Shop by Category</h2>
        <div className={s.catGrid}>
          {categories.map(c => (
            <Link key={c.id} to={`/products/${c.id}`} className={s.catItem} style={{ background: c.color }}>
              <span className={s.catEmoji}>{c.emoji}</span>
              <span className={s.catName}>{c.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* TOP DEALS */}
      <div className={s.section}>
        <div className={s.sectionHead}>
          <h2>🔥 Top Deals Today</h2>
          <Link to="/products" className={s.viewAll}>View All</Link>
        </div>
        <div className={s.productGrid}>
          {topDeals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      {/* PROMO STRIP */}
      <div className={s.promoStrip}>
        {[
          { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹499' },
          { icon: '🔒', title: 'Secure Payments', desc: 'UPI, Cards, Net Banking' },
          { icon: '🔄', title: 'Easy Returns', desc: '10-day return policy' },
          { icon: '⚡', title: 'Fast Delivery', desc: 'Express in 24 hours' },
          { icon: '💰', title: 'Best Prices', desc: 'Lowest price guaranteed' },
        ].map(p => (
          <div key={p.title} className={s.promoItem}>
            <span>{p.icon}</span>
            <div><strong>{p.title}</strong><p>{p.desc}</p></div>
          </div>
        ))}
      </div>

      {/* MOBILES */}
      <div className={s.section}>
        <div className={s.sectionHead}>
          <h2>📱 Mobiles</h2>
          <Link to="/products/mobiles" className={s.viewAll}>View All</Link>
        </div>
        <div className={s.productGrid}>
          {mobiles.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      {/* ELECTRONICS */}
      <div className={s.section}>
        <div className={s.sectionHead}>
          <h2>💻 Electronics</h2>
          <Link to="/products/electronics" className={s.viewAll}>View All</Link>
        </div>
        <div className={s.productGrid}>
          {electronics.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      {/* FASHION */}
      <div className={s.section}>
        <div className={s.sectionHead}>
          <h2>👗 Fashion</h2>
          <Link to="/products/fashion" className={s.viewAll}>View All</Link>
        </div>
        <div className={s.productGrid}>
          {fashion.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      {/* ALL PRODUCTS */}
      <div className={s.section}>
        <div className={s.sectionHead}>
          <h2>🛍️ All Products</h2>
          <Link to="/products" className={s.viewAll}>View All</Link>
        </div>
        <div className={s.productGrid}>
          {products.slice(0, 12).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  )
}
