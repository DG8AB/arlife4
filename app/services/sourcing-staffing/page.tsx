import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SourcingStaffingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Sourcing & Staffing</h1>
            <p className="text-xl text-muted-foreground">Connecting Talent with Opportunity</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <img src="/recruitment-team-meeting.png" alt="Sourcing and Staffing" className="w-full rounded-lg mb-8" />

            <h2 className="text-3xl font-bold text-primary mb-4">Find the Right Talent</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our sourcing and staffing solutions connect exceptional talent with outstanding opportunities, helping
              both candidates and companies achieve their goals.
            </p>

            <h3 className="text-2xl font-semibold text-primary mb-4">Our Staffing Solutions</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Executive search and recruitment</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Contract and temporary staffing</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Permanent placement services</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Talent acquisition consulting</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Skills assessment and screening</span>
              </li>
            </ul>

            <div className="text-center">
              <Link href="/#contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Connect with Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
