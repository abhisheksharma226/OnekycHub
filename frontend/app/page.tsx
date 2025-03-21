import Link from "next/link"
import Image from "next/image"
import { Shield, Lock, Clock, Building, CheckCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-black sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-black/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-black dark:text-white" />
            <span className="text-xl font-bold tracking-tight">OneKYCHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#partners"
              className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Partners
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                Log in
              </Button>
            </Link> */}
            <Link href="/login">
              <Button
                size="sm"
                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-sm"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 lg:py-36 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 mb-2 w-fit">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Trusted by 500+ financial institutions
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                    Streamline KYC{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400">
                      Verification
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 text-lg md:text-xl dark:text-gray-400">
                    OneKYCHub simplifies identity verification for financial institutions, reducing redundancy and
                    ensuring privacy-focused, fraud-resistant verification.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="gap-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-md transition-all"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600 transition-all"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden bg-gray-100 dark:bg-gray-800"
                      >
                        <Image
                          src={`/ratings.jpg?height=32&width=32&text=${i}`}
                          width={32}
                          height={32}
                          alt="User"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-black dark:text-white">4.9/5</span> from over 1,200 reviews
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[90%] h-[90%] rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src="/kycc.png?height=600&width=800&text=KYC+Dashboard"
                        width={800}
                        height={600}
                        alt="KYC Verification Platform"
                        className="object-cover w-full h-full"
                        priority
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="py-12 border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-black">
          <div className="container px-4 md:px-6">
            <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
              TRUSTED BY LEADING FINANCIAL INSTITUTIONS
            </p>
            <div className="mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Building className="h-8 w-auto text-gray-400 dark:text-gray-600" />
                  <span className="ml-2 text-gray-600 dark:text-gray-400 font-medium">Company {i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 lg:py-36 bg-white dark:bg-black relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(0,0,0,0.02),transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,rgba(255,255,255,0.02),transparent)]"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
                <span className="font-medium">Features</span>
              </div>
              <div className="space-y-3 max-w-[800px]">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose OneKYCHub?</h2>
                <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform offers a comprehensive solution for KYC verification needs with industry-leading security
                  and ease of use.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
                  <Shield className="h-7 w-7 text-black dark:text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Secure KYC</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    End-to-end encryption and secure document handling for maximum protection of sensitive data.
                  </p>
                </div>
                <div className="pt-2">
                  <ul className="space-y-2">
                    {["256-bit encryption", "Secure document storage", "Access controls"].map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
                  <Lock className="h-7 w-7 text-black dark:text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Privacy-Focused</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Granular control over your data with consent management and complete transparency.
                  </p>
                </div>
                <div className="pt-2">
                  <ul className="space-y-2">
                    {["Consent management", "Data minimization", "Audit trails"].map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
                  <Clock className="h-7 w-7 text-black dark:text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Fast Processing</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Quick verification turnaround with real-time status updates and notifications.
                  </p>
                </div>
                <div className="pt-2">
                  <ul className="space-y-2">
                    {["Real-time verification", "Automated workflows", "Instant notifications"].map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-28 lg:py-36 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
                <span className="font-medium">Testimonials</span>
              </div>
              <div className="space-y-3 max-w-[800px]">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Financial Institutions
                </h2>
                <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  See what our clients have to say about our KYC verification platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-8 md:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-800 dark:bg-gray-950 relative">
                <div className="absolute -top-4 -left-4 text-6xl text-black/10 dark:text-white/10 font-serif">"</div>
                <div className="space-y-4 relative">
                  <p className="text-gray-700 text-lg leading-relaxed dark:text-gray-300">
                    "OneKYCHub has transformed our verification process. We've reduced our KYC processing time by 70%
                    while improving security and compliance. The platform is intuitive and our team loves working with
                    it."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 mt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="rounded-full bg-gray-100 p-1 dark:bg-gray-800 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=56&width=56&text=SJ"
                      width={56}
                      height={56}
                      alt="Sarah Johnson"
                      className="rounded-full h-14 w-14 object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-black dark:text-white">Sarah Johnson</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">CTO, Global Finance Corp</p>
                  </div>
                  <div className="ml-auto flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 fill-current text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-800 dark:bg-gray-950 relative">
                <div className="absolute -top-4 -left-4 text-6xl text-black/10 dark:text-white/10 font-serif">"</div>
                <div className="space-y-4 relative">
                  <p className="text-gray-700 text-lg leading-relaxed dark:text-gray-300">
                    "The fraud detection capabilities have saved us millions in potential losses. The platform is
                    intuitive and our customers love the seamless experience. OneKYCHub has become an essential part of
                    our onboarding process."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 mt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="rounded-full bg-gray-100 p-1 dark:bg-gray-800 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=56&width=56&text=MC"
                      width={56}
                      height={56}
                      alt="Michael Chen"
                      className="rounded-full h-14 w-14 object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-black dark:text-white">Michael Chen</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Head of Security, Apex Banking</p>
                  </div>
                  <div className="ml-auto flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 fill-current text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-20 md:py-28 lg:py-36 bg-white dark:bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
                <span className="font-medium">Partners</span>
              </div>
              <div className="space-y-3 max-w-[800px]">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted Partners</h2>
                <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We work with leading financial institutions around the world.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-8 py-8 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-all"
                >
                  <Building className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="font-medium text-gray-900 dark:text-gray-100">Partner {i}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Financial Services</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="contact"
          className="py-20 md:py-28 lg:py-36 bg-black text-white dark:bg-white dark:text-black relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,255,255,0.1),transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,rgba(0,0,0,0.1),transparent)]"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="mx-auto max-w-3xl flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="text-xl/relaxed opacity-90 max-w-[700px]">
                  Join thousands of financial institutions that trust OneKYCHub for their KYC verification needs.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-white text-white hover:bg-white/10 dark:border-black dark:text-black dark:hover:bg-black/10 shadow-sm"
                  >
                    Sign Up Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800 shadow-sm"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
              <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div className="flex flex-col items-center p-6 rounded-xl bg-white/10 dark:bg-black/10">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-sm opacity-80">Financial Institutions</div>
                </div>
                <div className="flex flex-col items-center p-6 rounded-xl bg-white/10 dark:bg-black/10">
                  <div className="text-3xl font-bold mb-2">10M+</div>
                  <div className="text-sm opacity-80">Verifications Processed</div>
                </div>
                <div className="flex flex-col items-center p-6 rounded-xl bg-white/10 dark:bg-black/10">
                  <div className="text-3xl font-bold mb-2">99.9%</div>
                  <div className="text-sm opacity-80">Uptime Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-black">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-black dark:text-white" />
                <span className="text-xl font-bold">OneKYCHub</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                Simplifying identity verification for financial institutions with security and privacy at the core.
              </p>
              <div className="flex space-x-4">
                {["twitter", "linkedin", "facebook"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <span className="text-xs">{social[0].toUpperCase()}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-white mb-4">Product</h3>
              <ul className="space-y-2">
                {["Features", "Security", "Pricing", "Customers"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Terms", "Privacy", "Cookies", "Licenses"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} OneKYCHub. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <select className="text-sm bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 dark:bg-gray-900 dark:border-gray-800 text-gray-600 dark:text-gray-400">
                <option>English (US)</option>
                <option>Español</option>
                <option>Français</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

