import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Category from './pages/Category'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

export default function App(){
  return (
    <div className="bg-brand-cream min-h-screen font-body text-brand-navy flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/kanha-ji-dress" element={<Category slug="kanha-ji-dress" title="Divine Kanha Ji Dresses" />} />
            <Route path="/sarees" element={<Category slug="sarees" title="Exquisite Sarees Collection" />} />
            <Route path="/other-products" element={<Category slug="other-products" title="Other Products" />} />
            <Route path="/product/:id" element={<ProductDetail/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}