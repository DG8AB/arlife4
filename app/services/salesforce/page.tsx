import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SalesforcePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Salesforce Services</h1>
            <p className="text-xl text-muted-foreground">Implementation and Support Services</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <img src="/salesforce-dashboard-implementation.jpg" alt="Salesforce Implementation" className="w-full rounded-lg mb-8" />

            <h2 className="text-3xl font-bold text-primary mb-4">Transform Your Business with Salesforce</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our expert team provides comprehensive Salesforce implementation and support services to help your
              organization maximize its CRM potential and drive sustainable growth.
            </p>

            <h3 className="text-2xl font-semibold text-primary mb-4">Our Salesforce Expertise</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Complete Salesforce implementation and configuration</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Custom development and integrations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Data migration and system optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>User training and ongoing support</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Performance monitoring and enhancement</span>
              </li>
            </ul>

            <div className="text-center">
              <Link href="/#contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
