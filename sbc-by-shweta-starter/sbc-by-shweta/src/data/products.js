
export const products = [
  { id: 'k1', category: 'kanha-ji-dress', name: 'Peacock Feather Dress', price: 1499, image: '/placeholder/k1.svg', badges:['Premium','Handcrafted'] },
  { id: 'k2', category: 'kanha-ji-dress', name: 'Golden Rajwadi Dress',  price: 1699, image: '/placeholder/k2.svg' },
  { id: 'k3', category: 'kanha-ji-dress', name: 'Floral Yellow Dress',   price: 1599, image: '/placeholder/k3.svg' },
  { id: 'k4', category: 'kanha-ji-dress', name: 'Red Embroidered Dress', price: 1799, image: '/placeholder/k4.svg' },

  { id: 's1', category: 'sarees', name: 'Red Kanjivaram Silk Saree',  price: 5599, image: '/placeholder/s1.svg', discount: 0.15 },
  { id: 's2', category: 'sarees', name: 'Royal Blue Paithani',       price: 6299, image: '/placeholder/s2.svg' },
  { id: 's3', category: 'sarees', name: 'Green & Gold Banarasi',     price: 5999, image: '/placeholder/s3.svg' },
  { id: 's4', category: 'sarees', name: 'Gold Phasru Banlge',        price: 5899, image: '/placeholder/s4.svg' },

  { id: 'o1', category: 'other-products', name: 'Flute Accessory', price: 399, image: '/placeholder/o1.svg' },
]

export function byCategory(slug){
  return products.filter(p => p.category === slug)
}

export function getById(id){
  return products.find(p => p.id === id)
}
