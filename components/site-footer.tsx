import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="transition hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-primary">
                  View Plans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
 
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="transition hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="transition hover:text-primary">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="transition hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal" className="transition hover:text-primary">
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            href="/assessment/quiz"
          >
            Start Assessment
          </Link>
        </div>
      </div>
    </footer>
  )
}
