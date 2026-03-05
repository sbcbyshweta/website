
import ProductGrid from '../components/ProductGrid'
import { byCategory } from '../data/products'

export default function Category({ slug, title }){
  const items = byCategory(slug)
  return (
    <div className="py-8">
      <h1 className="font-display text-3xl">{title}</h1>
      <p className="mt-2 text-brand-navy/70">Carefully curated pieces from our collection.</p>
      <div className="mt-6">
        <ProductGrid products={items} />
      </div>
    </div>
  )
}
