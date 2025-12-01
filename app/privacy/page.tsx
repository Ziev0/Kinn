// app/privacy/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Last Updated: November 29, 2024
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="prose prose-gray max-w-none">
              {/* Introduction */}
              <div className="mb-12 rounded-lg border bg-card p-6">
                <h2 className="font-serif text-2xl font-semibold tracking-tight">INTRODUCTION</h2>
                <p className="mt-4 text-lg font-medium text-muted-foreground">
                  Kinn Consultancy ("Kinn," "we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, services, and products.
                </p>
                <p className="mt-4">
                  This Policy applies to our website, web and mobile applications, and all products and services we offer. By using our Services, you agree to the collection and use of information as described in this Policy.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="mb-12 rounded-lg border bg-muted/30 p-6">
                <h3 className="mb-4 font-serif text-xl font-semibold">Table of Contents</h3>
                <nav className="grid gap-2 text-sm md:grid-cols-2">
                  {[
                    "1. Information We Collect",
                    "2. How We Use Your Information",
                    "3. How We Share Your Information",
                    "4. Data Security",
                    "5. Data Retention",
                    "6. Your Rights and Choices",
                    "7. Children's Privacy",
                    "8. International Data Transfers",
                    "9. Changes to This Policy",
                    "10. Contact Us"
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href={`#${item.split(' ')[0]}`}
                      className="transition hover:text-primary"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Privacy Sections */}
              <div className="space-y-12">
                {/* Section 1 */}
                <section id="1" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">1. INFORMATION WE COLLECT</h2>
                  <div className="mt-4 space-y-6 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">1.1 Information You Provide to Us</h3>
                      <div className="mt-3 space-y-3 text-sm">
                        <p><strong>Account Information:</strong> Name, email address, phone number, password (encrypted), billing address</p>
                        <p><strong>Estate Information:</strong> Decedent's information, executor/administrator details, beneficiary information, will contents, asset details, creditor information</p>
                        <p><strong>Financial Information:</strong> Payment details (processed securely via Stripe), estate asset values, transaction history</p>
                        <p><strong>Communications:</strong> Messages, survey responses, support ticket content</p>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">1.2 Information Automatically Collected</h3>
                      <div className="mt-3 space-y-2 text-sm">
                        <p><strong>Usage Data:</strong> IP address, browser type, device information, pages visited, click patterns</p>
                        <p><strong>Cookies and Tracking:</strong> Session cookies, analytics cookies, local storage data</p>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">1.3 Information from Third Parties</h3>
                      <div className="mt-3 space-y-2 text-sm">
                        <p><strong>Court Records:</strong> Public probate filing information, court case numbers</p>
                        <p><strong>Financial Data:</strong> Bank account balances, investment data, real estate valuations (with consent)</p>
                        <p><strong>Identity Verification:</strong> Background check data for fraud prevention</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section id="2" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">2. HOW WE USE YOUR INFORMATION</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Provide Services</h3>
                        <p className="mt-2 text-sm">Generate probate documents, file with courts, track deadlines, manage your account and case</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Process Payments</h3>
                        <p className="mt-2 text-sm">Charge payments, detect fraud, issue invoices and receipts</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Communicate with You</h3>
                        <p className="mt-2 text-sm">Send service updates, provide customer support, share educational content</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Improve Services</h3>
                        <p className="mt-2 text-sm">Analyze usage patterns, train AI models, develop new features</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Legal and Safety</h3>
                        <p className="mt-2 text-sm">Comply with legal obligations, enforce Terms of Service, prevent fraud</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Marketing</h3>
                        <p className="mt-2 text-sm">Send newsletters, display advertising, conduct research (with consent)</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="3" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">3. HOW WE SHARE YOUR INFORMATION</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">We do not sell your personal information.</p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Service Providers</h3>
                        <p className="mt-2 text-sm">Payment processors, cloud hosting, analytics, customer support - all contractually obligated to protect your data</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Partner Attorneys</h3>
                        <p className="mt-2 text-sm">If you use Premium tier, information shared with partner law firm for legal services</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Courts and Government</h3>
                        <p className="mt-2 text-sm">When required by law: court filings, subpoenas, tax reporting, law enforcement</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Business Transfers</h3>
                        <p className="mt-2 text-sm">In case of merger, acquisition, or asset sale - with notification</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">With Your Consent</h3>
                        <p className="mt-2 text-sm">When you explicitly consent to sharing</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">De-Identified Data</h3>
                        <p className="mt-2 text-sm">Aggregated, anonymized data that cannot identify you</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section id="4" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">4. DATA SECURITY</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Encryption</h3>
                        <p className="mt-2 text-sm">TLS 1.3 for data in transit, AES-256 for data at rest, database encryption</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Access Controls</h3>
                        <p className="mt-2 text-sm">Role-based access, multi-factor authentication, regular access audits</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Compliance</h3>
                        <p className="mt-2 text-sm">Industry-standard security practices, employee training, regular audits</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Incident Response</h3>
                        <p className="mt-2 text-sm">24-hour monitoring, incident response plan, notification within 72 hours for breaches</p>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-sm"><strong>Note:</strong> No system is 100% secure. You are responsible for maintaining the security of your account password.</p>
                    </div>
                  </div>
                </section>

                {/* Section 5 */}
                <section id="5" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">5. DATA RETENTION</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">During Active Service</h3>
                        <p className="mt-2 text-sm">For the duration of your case</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">After Completion</h3>
                        <p className="mt-2 text-sm">7 years (California statute of limitations)</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Account Data</h3>
                        <p className="mt-2 text-sm">Until you request deletion (with exceptions)</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Financial Records</h3>
                        <p className="mt-2 text-sm">7 years (IRS requirements)</p>
                      </div>
                    </div>
                    <p>We may retain certain information longer if required by law or to resolve disputes.</p>
                  </div>
                </section>

                {/* Section 6 */}
                <section id="6" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">6. YOUR RIGHTS AND CHOICES</h2>
                  <div className="mt-4 space-y-6 text-muted-foreground">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Access and Portability</h3>
                        <p className="mt-2 text-sm">Access your personal information and download data in portable format</p>
                        <p className="mt-2 text-xs">Request: privacy@kinnconsultancy.com</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Correction</h3>
                        <p className="mt-2 text-sm">Update inaccurate information via account settings or email</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Deletion</h3>
                        <p className="mt-2 text-sm">Request deletion of your data (with legal exceptions)</p>
                        <p className="mt-2 text-xs">Typically processed within 30 days</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">Opt-Out of Marketing</h3>
                        <p className="mt-2 text-sm">Unsubscribe from emails or adjust preferences</p>
                        <p className="mt-2 text-xs">Transactional emails still sent for case updates</p>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">California Residents (CCPA/CPRA Rights)</h3>
                      <div className="mt-3 space-y-2 text-sm">
                        <p>Right to know, request deletion, opt-out of sale (we do not sell data), non-discrimination</p>
                        <p>To exercise rights: privacy@kinnconsultancy.com or call (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">European Residents (GDPR Rights)</h3>
                      <div className="mt-3 space-y-2 text-sm">
                        <p>Right to access, rectification, erasure, restrict processing, data portability, object to processing</p>
                        <p>Legal basis: consent, contract performance, legal obligation, legitimate interests</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 7 */}
                <section id="7" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">7. CHILDREN'S PRIVACY</h2>
                  <div className="mt-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>Our Services are not intended for individuals under 18. We do not knowingly collect information from children. If you believe we have collected a child's information, contact us immediately at privacy@kinnconsultancy.com.</p>
                    </div>
                  </div>
                </section>

                {/* Section 8 */}
                <section id="8" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">8. INTERNATIONAL DATA TRANSFERS</h2>
                  <div className="mt-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>Our Services are based in the United States. If you access our Services from outside the U.S., your information will be transferred to and processed in the U.S. We use appropriate safeguards to protect your data during international transfers.</p>
                    </div>
                  </div>
                </section>

                {/* Section 9 */}
                <section id="9" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">9. CHANGES TO THIS POLICY</h2>
                  <div className="mt-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>We may update this Privacy Policy periodically. Changes will be posted on this page with a new "Last Updated" date.</p>
                      <p className="mt-2">For material changes, we will email account holders and provide 30 days to review before changes take effect. Your continued use after changes constitutes acceptance.</p>
                    </div>
                  </div>
                </section>

                {/* Section 10 */}
                <section id="10" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">10. CONTACT US</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p>Questions or concerns about privacy?</p>
                    <div className="rounded-lg border bg-card p-4">
                      <p><strong>Email:</strong> privacy@kinnconsultancy.com</p>
                      <p><strong>Phone:</strong> (555) 123-4567</p>
                      <p><strong>Mail:</strong> Kinn Consultancy<br />Attn: Privacy Officer<br />123 Main Street, Suite 400<br />Los Angeles, CA 90001</p>
                    </div>
                    <p className="text-sm">Response time: We will respond to privacy requests within 30 days (45 days for complex requests).</p>
                  </div>
                </section>

                {/* Consent Notice */}
                <div className="mt-12 rounded-lg border-2 border-primary/20 bg-primary/5 p-6 text-center">
                  <p className="font-semibold text-primary">
                    BY USING OUR SERVICES, YOU CONSENT TO THE COLLECTION, USE, AND SHARING OF YOUR INFORMATION AS DESCRIBED IN THIS PRIVACY POLICY.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/40 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-2xl font-semibold tracking-tight md:text-3xl">
              Questions About Your Privacy?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contact our privacy team for any questions or to exercise your data rights.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Contact Privacy Team
              </Link>
              <Link
                href="/terms-of-service"
                className="inline-flex items-center rounded-md border border-primary/20 px-6 py-3 text-sm font-medium transition hover:bg-primary/10"
              >
                View Terms of Service
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
