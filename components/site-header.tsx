import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary/15 ring-1 ring-primary/30" aria-hidden="true" />
          <span className="font-serif text-lg font-semibold tracking-tight">Kinn Consultancy</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link className="transition hover:text-primary" href="/probate">
            Probate
          </Link>
          <Link className="transition hover:text-primary" href="/estate-management">
            Estate Management
          </Link>
          <Link className="transition hover:text-primary" href="/asset-discovery">
            Asset Discovery
          </Link>
          <Link className="transition hover:text-primary" href="/insurances">
            Services & Pricing
          </Link>
          <Link className="transition hover:text-primary" href="/reviews">
            Reviews
          </Link>
          <Link className="transition hover:text-primary" href="/contact">
            Contact
          </Link>
          <Link
            className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-primary-foreground transition hover:opacity-90"
            href="/book-call"
          >
            Book a call
          </Link>
        </nav>
      </div>
    </header>
  )
}
