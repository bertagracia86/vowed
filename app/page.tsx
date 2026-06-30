import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Features from './components/Features'
import DashPreview from './components/DashPreview'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <Features />
      <DashPreview />
      <Footer />
    </main>
  )
}
