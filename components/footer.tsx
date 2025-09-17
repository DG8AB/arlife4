import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t-4 border-purple-500 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex flex-wrap justify-center gap-8 text-navy-900 font-medium">
          <Link href="/services/salesforce" className="hover:text-purple-600 transition-colors">
            Salesforce
          </Link>
          <Link href="/services/erp" className="hover:text-purple-600 transition-colors">
            ERP
          </Link>
          <Link href="/services/sourcing-staffing" className="hover:text-purple-600 transition-colors">
            Sourcing & Staffing
          </Link>
          <Link href="/about" className="hover:text-purple-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-purple-600 transition-colors">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  )
}
