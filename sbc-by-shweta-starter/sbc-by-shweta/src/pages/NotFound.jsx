
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="py-10 text-center">
      <h1 className="font-display text-4xl">404</h1>
      <p className="mt-2">Page not found.</p>
      <Link to="/" className="mt-4 inline-block text-brand-gold">Go Home</Link>
    </div>
  )
}
