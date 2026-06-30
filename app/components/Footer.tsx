const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const MUTE = '#7A93B5'

export default function Footer() {
  return (
    <footer style={{padding:'32px 48px',borderTop:'1px solid #EEF2F7',display:'flex',alignItems:'center',justifyContent:'space-between',background:'white'}}>
      <div style={{fontFamily:F,fontSize:20,fontStyle:'italic',fontWeight:700,color:BLUE}}>vowed</div>
      <p style={{fontSize:12,color:MUTE}}>Hecho con ♡ para parejas que quieren disfrutar de su boda</p>
      <p style={{fontSize:11,color:MUTE}}>2025</p>
    </footer>
  )
}
