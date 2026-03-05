
export default function Badge({children}){
  return (
    <span className="inline-flex text-xs px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/30">
      {children}
    </span>
  )
}
