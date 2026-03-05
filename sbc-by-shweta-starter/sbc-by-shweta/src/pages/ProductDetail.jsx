
import { useParams } from 'react-router-dom'
import { getById } from '../data/products'
import useCart from '../store/cartStore'
import { useState } from 'react'

export default function ProductDetail(){
  const { id } = useParams()
  const product = getById(id)
  const add = useCart(s=>s.add)
  const [qty, setQty] = useState(1)

  if(!product) return <div className="py-10">Product not found.</div>
  const { name, image, price, discount } = product
  const finalPrice = discount ? Math.round(price*(1-discount)) : price

  return (
    <div className="py-8 grid md:grid-cols-2 gap-8">
      <div className="rounded-2xl overflow-hidden bg-white border border-brand-gold/20">
        <img src={image} alt={name} className="w-full object-cover"/>
      </div>

      <div>
        <h1 className="font-display text-3xl text-brand-navy">{name}</h1>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl text-brand-gold font-semibold">₹{finalPrice.toLocaleString('en-IN')}</span>
          {discount && <span className="text-sm line-through opacity-60">₹{price.toLocaleString('en-IN')}</span>}
        </div>
        <p className="mt-4 text-brand-navy/80">
          Made with care using premium fabrics and craftsmanship.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <label className="text-sm">Qty</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e)=>setQty(parseInt(e.target.value || 1))}
            className="w-20 h-10 rounded border border-brand-gold/40 px-2"
          />
          <button
            onClick={()=>add(product, qty)}
            className="inline-flex items-center rounded-full h-10 px-6 bg-brand-gold text-white hover:bg-brand-goldDark transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
