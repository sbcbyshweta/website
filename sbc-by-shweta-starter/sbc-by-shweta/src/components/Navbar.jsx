import { Link, NavLink } from 'react-router-dom'
import useCart from '../store/cartStore'

const base =
  "relative text-brand-navy font-medium tracking-wide transition-all duration-300 hover:text-brand-gold after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:h-[2px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full"

const active =
  "relative text-brand-gold after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:h-[2px] after:w-full after:bg-brand-gold"

export default function Navbar() {
  const items = useCart((s) => s.items)
  const qty = items.reduce((n, i) => n + i.qty, 0)

  return (
    <header className="bg-[#fdf6ee] border-b border-[#f3e5d8] shadow-sm sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/light_logo.jpg"
            alt="SBC by Shweta"
            className="h-20 object-contain"
          />
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-10 text-sm">
          <NavLink to="/" className={({ isActive }) => (isActive ? active : base)}>
            Home
          </NavLink>

          <NavLink to="/kanha-ji-dress" className={({ isActive }) => (isActive ? active : base)}>
            Kanha Ji Dress
          </NavLink>

          <NavLink to="/sarees" className={({ isActive }) => (isActive ? active : base)}>
            Sarees
          </NavLink>

          <NavLink to="/other-products" className={({ isActive }) => (isActive ? active : base)}>
            Other Products
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden sm:inline text-sm font-medium text-brand-navy hover:text-brand-gold transition"
          >
            Login
          </Link>

          <Link to="/cart" className="relative">
            <span className="inline-flex h-10 px-5 items-center rounded-full border border-brand-gold text-brand-navy font-medium hover:bg-brand-gold hover:text-white transition-all duration-300 shadow-sm">
              Cart
            </span>

            {qty > 0 && (
              <span className="absolute -right-2 -top-2 text-xs bg-brand-gold text-white rounded-full px-1.5 py-0.5 shadow">
                {qty}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}