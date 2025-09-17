import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-navy-900 leading-none">404</h1>
          <div className="w-24 h-1 bg-navy-900 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-navy-900">Page Not Found</h2>
          <p className="text-lg text-muted-foreground font-normal">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button asChild className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3">
            <Link href="/">Return Home</Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="w-full border-navy-900 text-navy-900 hover:bg-navy-50 bg-transparent"
          >
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground font-normal">
            Need help? Visit our{" "}
            <Link href="/services" className="text-navy-900 hover:underline font-semibold">
              services page
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-navy-900 hover:underline font-semibold">
              get in touch
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
