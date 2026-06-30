import Link from 'next/link'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const INK = '#2C3E5C'

export default function NavBar() {
  return (
    <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'24px 48px',background:'white'}}>
      <div style={{fontFamily:F,fontSize:24,fontStyle:'italic',fontWeight:700,color:BLUE}}>vowed</div>
      <div style={{display:'flex',alignItems:'center',gap:32,fontSize:13,color:INK}}>
        <span style={{cursor:'pointer'}}>Funciones</span>
        <span style={{cursor:'pointer'}}>Precios</span>
        <span style={{cursor:'pointer'}}>Inspiración</span>
        <span style={{cursor:'pointer'}}>Sobre nosotros</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <Link href="/dashboard" style={{fontSize:13,color:INK}}>Acceder</Link>
        <Link href="/dashboard" style={{background:BLUE,color:'white',borderRadius:999,padding:'11px 26px',fontSize:13,fontWeight:500}}>
          Empezar gratis
        </Link>
      </div>
    </nav>
  )
}
