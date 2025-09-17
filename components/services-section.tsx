import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Salesforce",
    description: "Implementation and Support Services",
    image: "/salesforce-implementation-team-meeting.jpg",
    slug: "salesforce",
  },
  {
    title: "ERP",
    description: "Consulting & Automation services",
    image: "/erp-warehouse-automation-systems.jpg",
    slug: "erp",
  },
  {
    title: "Sourcing & Staffing",
    description: "Connecting talent with opportunity",
    image: "/recruitment-team-meeting.png",
    slug: "sourcing-staffing",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering your success with cutting-edge solutions
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group border border-border hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-primary text-center">{service.title}</CardTitle>
                <CardDescription className="text-center text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0 text-center">
                <Link href={`/services/${service.slug}`}>
                  <Button variant="ghost" className="group/btn text-primary hover:text-primary/80 font-semibold">
                    Learn More
                    <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
