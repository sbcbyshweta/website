
import { create } from 'zustand'

const useCart = create((set, get) => ({
  items: [],
  add(product, qty=1){
    const items = [...get().items]
    const idx = items.findIndex(i => i.id === product.id)
    if(idx >= 0){ items[idx].qty += qty } else { items.push({ ...product, qty }) }
    set({ items })
  },
  update(id, qty){
    if(qty <= 0) return get().remove(id)
    set({ items: get().items.map(i => i.id === id ? { ...i, qty } : i) })
  },
  remove(id){ set({ items: get().items.filter(i => i.id !== id) }) },
  clear(){ set({ items: [] }) },
  total(){ return get().items.reduce((sum, i) => sum + i.price * i.qty, 0) },
}))

export default useCart
