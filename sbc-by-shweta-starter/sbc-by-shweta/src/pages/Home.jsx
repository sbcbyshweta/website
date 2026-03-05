
import Hero from '../components/Hero'
import FeatureBar from '../components/FeatureBar'
import ProductGrid from '../components/ProductGrid'
import { byCategory } from '../data/products'

export default function Home(){
  const kanha = byCategory('kanha-ji-dress')
  const sarees = byCategory('sarees')

  return (
    <div className="py-6">
      <Hero />
      <FeatureBar />

      <section className="mt-12">
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-2xl">Divine Kanha Ji Dresses</h2>
        </div>
        <ProductGrid products={kanha} />
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-2xl">Exquisite Sarees Collection</h2>
        </div>
        <ProductGrid products={sarees} />
      </section>
    </div>
  )
}
