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
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <span className="drift absolute -left-24 top-24 size-96 rounded-full bg-sand/60 blur-3xl dark:bg-accent/20" />
        <span className="drift absolute -right-24 top-1/2 size-[28rem] rounded-full bg-accent/30 blur-3xl [animation-delay:-9s] dark:bg-primary/10" />
      </div>
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