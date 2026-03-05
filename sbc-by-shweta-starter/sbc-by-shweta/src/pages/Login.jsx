
export default function Login(){
  return (
    <div className="py-10 max-w-md mx-auto">
      <h1 className="font-display text-3xl">Login</h1>
      <form className="mt-6 space-y-4 bg-white p-6 rounded-2xl border border-brand-gold/10 shadow-card">
        <div>
          <label className="text-sm">Email</label>
          <input className="mt-1 w-full h-10 border border-brand-gold/40 rounded px-3" type="email" placeholder="you@example.com"/>
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input className="mt-1 w-full h-10 border border-brand-gold/40 rounded px-3" type="password" placeholder="••••••••"/>
        </div>
        <button className="w-full h-10 rounded-full bg-brand-gold text-white hover:bg-brand-goldDark">Login</button>
      </form>
    </div>
  )
}
