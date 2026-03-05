
import useCart from '../store/cartStore'
import { Link } from 'react-router-dom'

export default function Cart(){
  const { items, update, remove, total, clear } = useCart()
  const sum = total()

  if(items.length === 0){
    return (
      <div className="py-10 text-center">
        <p>Your cart is empty.</p>
        <Link className="inline-block mt-4 text-brand-gold" to="/">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div className="py-8">
      <h1 className="font-display text-3xl">Your Cart</h1>
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map(i=>(
            <div key={i.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-brand-gold/10 shadow-card">
              <img src={i.image} alt={i.name} className="w-24 h-24 object-cover rounded-lg"/>
              <div className="flex-1">
                <p className="font-medium">{i.name}</p>
                <p className="text-sm text-brand-navy/70">₹{i.price.toLocaleString('en-IN')}</p>
                <div className="mt-2 flex items-center gap-2">
                  <input type="number" min={1} value={i.qty} onChange={(e)=>update(i.id, parseInt(e.target.value || 1))} className="w-20 h-9 rounded border border-brand-gold/40 px-2"/>
                  <button onClick={()=>remove(i.id)} className="text-sm text-red-600">Remove</button>
                </div>
              </div>
              <div className="font-semibold">₹{(i.price * i.qty).toLocaleString('en-IN')}</div>
            </div>
          ))}
        </div>
        <aside className="bg-white p-5 rounded-2xl border border-brand-gold/10 shadow-card">
          <h2 className="font-medium">Order Summary</h2>
          <div className="mt-3 flex justify-between">
            <span>Total</span>
            <span className="font-semibold">₹{sum.toLocaleString('en-IN')}</span>
          </div>
          <button className="mt-5 w-full h-11 rounded-full bg-brand-gold text-white hover:bg-brand-goldDark">Checkout</button>
          <button className="mt-3 w-full h-11 rounded-full border border-brand-gold text-brand-navy hover:bg-brand-gold hover:text-white" onClick={clear}>Clear Cart</button>
        </aside>
      </div>
    </div>
  )
}
