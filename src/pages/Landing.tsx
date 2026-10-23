import Faq from '../components/Faq'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Pricing from '../components/Pricing'

export default function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  )
}