
import { Link } from 'react-router-dom'
import Badge from './Badge'
import classNames from 'classnames'

export default function ProductCard({ product }){
  const { id, name, price, image, badges=[], discount } = product
  const finalPrice = discount ? Math.round(price*(1-discount)) : price

  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-luxury hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-brand-gold/10">
      <Link to={`/product/${id}`}>
        <div className="aspect-square bg-brand-lightCream overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover"/>
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">{badges.map(b=> <Badge key={b}>{b}</Badge>)}</div>
        <h3 className="font-medium text-brand-navy">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-brand-gold font-semibold">₹{finalPrice.toLocaleString('en-IN')}</span>
          {discount && <span className="text-sm line-through opacity-60">₹{price.toLocaleString('en-IN')}</span>}
        </div>
        <Link
          to={`/product/${id}`}
          className="inline-flex items-center justify-center w-full rounded-full h-10 text-sm bg-brand-gold text-white hover:bg-brand-goldDark transition"
        >
          View
        </Link>
      </div>
    </div>
  )
}
