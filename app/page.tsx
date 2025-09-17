import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <div className="bg-yellow-200 border-2 border-yellow-600 p-4 m-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-yellow-800 mb-2">🎲 Random Test Element</h2>
        <p className="text-yellow-700">
          This is a completely random element that serves no purpose. Feel free to delete me!
        </p>
        <div className="mt-2 text-sm text-yellow-600">ID: random-delete-me-element-12345</div>
      </div>
      <ServicesSection />
      <Footer />
    </main>
  )
}
