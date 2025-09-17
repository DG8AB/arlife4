"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/ar4life-logo.webp" alt="AR4Life Logo" width={120} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/services/salesforce"
                className="text-navy-900 hover:text-purple-600 transition-colors duration-200 font-bold text-lg"
              >
                Salesforce
              </Link>
              <Link
                href="/services/erp"
                className="text-navy-900 hover:text-purple-600 transition-colors duration-200 font-bold text-lg"
              >
                ERP
              </Link>
              <Link
                href="/services/sourcing-staffing"
                className="text-navy-900 hover:text-purple-600 transition-colors duration-200 font-bold text-lg"
              >
                Sourcing & Staffing
              </Link>
              <Link
                href="/contact"
                className="text-navy-900 hover:text-purple-600 transition-colors duration-200 font-bold text-lg"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <Button asChild className="bg-navy-900 hover:bg-navy-800 text-white font-bold px-8 py-2 text-lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-navy-900">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                href="/services/salesforce"
                className="block px-3 py-2 text-navy-900 hover:text-purple-600 transition-colors duration-200 font-bold text-lg"
              >
                Salesforce
              </Link>
              <Link
                href="/services/erp"
                className="block px-3 py-2 text-navy-900 hover:text-purple-600 transition-colors duration-200 font-bold text-lg"
              >
                ERP
              </Link>
              <Link
                href="/services/sourcing-staffing"
                className="block px-3 py-2 text-navy-900 hover:text-purple-600 transition-colors duration-200 font-bold text-lg"
              >
                Sourcing & Staffing
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-navy-900 hover:text-purple-600 transition-colors duration-200 font-bold text-lg"
              >
                Contact
              </Link>
              <div className="px-3 py-2">
                <Button asChild className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
