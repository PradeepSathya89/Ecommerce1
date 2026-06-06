import { useState, useMemo } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import s from './Products.module.css'

export default function Products() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [sort, setSort] = useState('relevance')
  const [maxPrice, setMaxPrice] = useState(200000)
  const [minRating, setMinRating] = useState(0)
  const [freeOnly, setFreeOnly] = useState(false)
  const [activeCategory, setActiveCategory] = useState(category || 'all')

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory)
    if (query) list = list.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()))
    list = list.filter(p => p.price <= maxPrice)
    if (minRating > 0) list = list.filter(p => p.rating >= minRating)
    if (freeOnly) list = list.filter(p => p.freeDelivery)
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'reviews') list.sort((a, b) => b.reviews - a.reviews)
    return list
  }, [activeCategory, query, sort, maxPrice, minRating, freeOnly])

  const currentCat = categories.find(c => c.id === activeCategory)

  return (
    <div className={s.page}>
      <div className={s.breadcrumb}>
        <Link to="/">Home</Link> &rsaquo;
        <Link to="/products">All Categories</Link>
        {currentCat && <><span>›</span><span>{currentCat.name}</span></>}
        {query && <><span>›</span><span>"{query}"</span></>}
      </div>

      <div className={s.layout}>
        {/* FILTERS */}
        <aside className={s.sidebar}>
          <div className={s.filterHeader}>
            <h3>Filters</h3>
            <button onClick={() => { setMaxPrice(200000); setMinRating(0); setFreeOnly(false); setActiveCategory('all') }} className={s.clearBtn}>Clear All</button>
          </div>

          <div className={s.filterGroup}>
            <h4>Category</h4>
            <label className={s.filterCheck}>
              <input type="radio" name="cat" checked={activeCategory === 'all'} onChange={() => setActiveCategory('all')} /> All
            </label>
            {categories.map(c => (
              <label key={c.id} className={s.filterCheck}>
                <input type="radio" name="cat" checked={activeCategory === c.id} onChange={() => setActiveCategory(c.id)} />
                {c.emoji} {c.name}
              </label>
            ))}
          </div>

          <div className={s.filterGroup}>
            <h4>Price</h4>
            <p className={s.priceLabel}>Up to ₹{maxPrice.toLocaleString()}</p>
            <input type="range" min="500" max="200000" step="500" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className={s.range} />
            <div className={s.rangeLabels}><span>₹500</span><span>₹2,00,000</span></div>
          </div>

          <div className={s.filterGroup}>
            <h4>Customer Rating</h4>
            {[4, 3, 2].map(r => (
              <label key={r} className={s.filterCheck}>
                <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(minRating === r ? 0 : r)} />
                {r}★ & above
              </label>
            ))}
          </div>

          <div className={s.filterGroup}>
            <h4>Delivery</h4>
            <label className={s.filterCheck}>
              <input type="checkbox" checked={freeOnly} onChange={e => setFreeOnly(e.target.checked)} />
              Free Delivery
            </label>
          </div>
        </aside>

        {/* MAIN */}
        <div className={s.main}>
          <div className={s.mainHeader}>
            <p className={s.count}><strong>{filtered.length}</strong> results {query && `for "${query}"`}</p>
            <div className={s.sortRow}>
              <span>Sort by</span>
              {[
                { val: 'relevance', label: 'Relevance' },
                { val: 'price_asc', label: 'Price: Low → High' },
                { val: 'price_desc', label: 'Price: High → Low' },
                { val: 'rating', label: 'Rating' },
              ].map(o => (
                <button key={o.val} className={`${s.sortBtn} ${sort === o.val ? s.sortActive : ''}`} onClick={() => setSort(o.val)}>{o.label}</button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className={s.empty}>
              <span>😕</span>
              <h3>No results found</h3>
              <p>Try different filters or search terms</p>
              <button onClick={() => { setActiveCategory('all'); setMaxPrice(200000); setMinRating(0); setFreeOnly(false) }} className={s.tryAgainBtn}>Clear All Filters</button>
            </div>
          ) : (
            <div className={s.grid}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
