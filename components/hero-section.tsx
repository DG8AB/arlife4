import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-accent/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Image
              src="/ar4life-logo.webp"
              alt="AR4Life Logo"
              width={400}
              height={120}
              className="h-24 md:h-32 lg:h-40 w-auto"
            />
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl text-navy-900 font-bold mb-6">
            Amazing Resources, Relationships, Results, and Reunions for Life
          </h2>

          <p className="text-xl md:text-2xl text-navy-800 mb-12 font-semibold">
            Our path to Destiny is believing in the Journey
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-4 text-lg font-bold rounded-lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
