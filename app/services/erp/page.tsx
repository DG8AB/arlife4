import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ERPPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">ERP Solutions</h1>
            <p className="text-xl text-muted-foreground">Consulting & Automation Services</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <img src="/erp-warehouse-automation-systems.jpg" alt="ERP Systems" className="w-full rounded-lg mb-8" />

            <h2 className="text-3xl font-bold text-primary mb-4">Streamline Operations with ERP</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our ERP consulting and automation services help businesses optimize their operations, improve efficiency,
              and drive digital transformation across all departments.
            </p>

            <h3 className="text-2xl font-semibold text-primary mb-4">ERP Services We Provide</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>ERP system selection and implementation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Business process automation and optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Supply chain management solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Financial management and reporting</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
                <span>Integration with existing systems</span>
              </li>
            </ul>

            <div className="text-center">
              <Link href="/#contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Discover ERP Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
