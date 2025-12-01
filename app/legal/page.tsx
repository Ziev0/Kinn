// app/legal-disclaimers/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"

export default function LegalDisclaimersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                Legal Disclaimers
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Last Updated: November 29, 2024
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimers Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="prose prose-gray max-w-none">
              {/* Important Notice */}
              <div className="mb-12 rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
                <h2 className="font-serif text-2xl font-semibold tracking-tight">
                  IMPORTANT LEGAL INFORMATION
                </h2>
                <p className="mt-4 font-medium text-muted-foreground">
                  Please read these disclaimers carefully before using Kinn Consultancy's services.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="mb-12 rounded-lg border bg-muted/30 p-6">
                <h3 className="mb-4 font-serif text-xl font-semibold">Table of Contents</h3>
                <nav className="grid gap-2 text-sm">
                  {[
                    "1. Not a Law Firm",
                    "2. No Attorney-Client Relationship", 
                    "3. Your Responsibility",
                    "4. No Outcome Guarantee",
                    "5. AI Limitations",
                    "6. State-Specific Limitations",
                    "7. Public Records Notice",
                    "8. Third-Party Services",
                    "9. Testimonials and Reviews",
                    "10. Financial and Tax Advice",
                    "11. No Fiduciary Duty",
                    "12. Information Accuracy",
                    "13. Limitation Periods",
                    "14. Confidentiality Limits",
                    "15. Link Disclaimer",
                    "16. Accessibility",
                    "17. Emergency Situations",
                    "18. Updates to Disclaimers"
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

              {/* Disclaimer Sections */}
              <div className="space-y-12">
                {/* Section 1 */}
                <section id="1" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">1. NOT A LAW FIRM</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">Kinn Consultancy is NOT a law firm and does NOT provide legal advice.</p>
                      <p className="mt-2">We are a legal document preparation service registered under applicable state laws.</p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">What We Cannot Do</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Advise on which documents to file</li>
                          <li>• Recommend legal strategies</li>
                          <li>• Represent you in court</li>
                          <li>• Answer questions requiring legal judgment</li>
                        </ul>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">What We Can Do</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Prepare legal documents at your direction</li>
                          <li>• Provide self-help services</li>
                          <li>• Assist with form completion</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        If you need legal advice, you should consult a licensed attorney.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section id="2" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">2. NO ATTORNEY-CLIENT RELATIONSHIP</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>Using Kinn Consultancy's Services does NOT create an attorney-client relationship, except:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• When you purchase our Premium tier with partner attorneys</li>
                        <li>• During consultations with our partner law firm</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        Our paralegals and staff are NOT attorneys and cannot provide legal advice.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="3" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">3. YOUR RESPONSIBILITY</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">You are ultimately responsible for:</h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">✓</span>
                          <span>Reviewing all documents for accuracy before filing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">✓</span>
                          <span>Making final decisions about your estate settlement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">✓</span>
                          <span>Ensuring compliance with all court deadlines</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">✓</span>
                          <span>Providing complete and truthful information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">✓</span>
                          <span>Following all applicable laws</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">Kinn Consultancy provides tools and assistance, but YOU are the decision-maker.</p>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section id="4" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">4. NO OUTCOME GUARANTEE</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">We cannot and do not guarantee:</p>
                      <ul className="mt-2 space-y-2">
                        <li>• That your probate petition will be approved</li>
                        <li>• The timeline for your specific case</li>
                        <li>• The outcome of any legal proceeding</li>
                        <li>• That you will qualify for probate alternatives</li>
                        <li>• The actions of courts, judges, or third parties</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        Every estate is unique. Results depend on factors outside our control.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 5 */}
                <section id="5" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">5. AI LIMITATIONS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">AI Capabilities</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Assists with form preparation</li>
                          <li>• High accuracy rate</li>
                          <li>• Continuously improved</li>
                        </ul>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <h3 className="font-semibold">AI Limitations</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• May make errors</li>
                          <li>• Cannot replace human judgment</li>
                          <li>• Requires human review</li>
                        </ul>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        YOU are responsible for reviewing all AI-generated content before filing.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 6 */}
                <section id="6" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">6. STATE-SPECIFIC LIMITATIONS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">Our Services are currently available in select states only.</p>
                      <p className="mt-2">Probate laws vary significantly by state and county. We make reasonable efforts to stay current with local rules, but you are responsible for verifying local requirements.</p>
                    </div>
                  </div>
                </section>

                {/* Section 7 */}
                <section id="7" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">7. PUBLIC RECORDS NOTICE</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">Probate is a public court process.</p>
                      <p className="mt-2">Documents filed with the court become part of the public record and can be accessed by anyone, including:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• Petitions listing estate assets</li>
                        <li>• Names and addresses of beneficiaries</li>
                        <li>• Estate inventory and valuations</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        We cannot control public access to court records.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 8 */}
                <section id="8" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">8. THIRD-PARTY SERVICES</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>Our Services integrate with third parties for payments, AI processing, and court e-filing.</p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">We are not responsible for:</h3>
                      <ul className="mt-2 space-y-1">
                        <li>• Third-party service outages or errors</li>
                        <li>• Changes to third-party terms or pricing</li>
                        <li>• Data breaches at third-party providers</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 9 */}
                <section id="9" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">9. TESTIMONIALS AND REVIEWS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>Client testimonials represent individual experiences and may not be typical. Results vary based on estate complexity, court jurisdiction, and other factors.</p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        Past performance does not guarantee future results.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 10 */}
                <section id="10" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">10. FINANCIAL AND TAX ADVICE</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">Kinn Consultancy does NOT provide:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• Financial planning advice</li>
                        <li>• Tax advice or preparation</li>
                        <li>• Investment recommendations</li>
                        <li>• Estate planning recommendations</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        Consult a CPA, financial advisor, or tax attorney for these matters.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 11 */}
                <section id="11" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">11. NO FIDUCIARY DUTY</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>Kinn Consultancy is a service provider, not a fiduciary. We do not owe you a fiduciary duty except:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• Attorney services (Premium tier) create fiduciary duties</li>
                        <li>• As required by law for our document preparation services</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        You, as executor, owe fiduciary duties to the estate and beneficiaries.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 12 */}
                <section id="12" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">12. INFORMATION ACCURACY</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>We make reasonable efforts to ensure information on our website is accurate and current, but:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• Laws change frequently</li>
                        <li>• Court rules vary</li>
                        <li>• We may make errors</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        Always verify critical information with official sources or an attorney.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 13 */}
                <section id="13" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">13. LIMITATION PERIODS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>Legal claims related to probate may be subject to statutes of limitations. Delays in filing or acting may bar your rights.</p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        We provide deadline tracking tools, but YOU are responsible for timely action.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 14 */}
                <section id="14" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">14. CONFIDENTIALITY LIMITS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>While we protect your privacy (see Privacy Policy), information may be disclosed:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• When filing documents with courts (becomes public)</li>
                        <li>• If required by law or court order</li>
                        <li>• To prevent fraud or illegal activity</li>
                        <li>• With your consent</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        Attorney-client communications (Premium tier) are privileged except as required by law.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 15 */}
                <section id="15" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">15. LINK DISCLAIMER</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>Our website may contain links to third-party websites. We do not:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• Endorse third-party content</li>
                        <li>• Control third-party websites</li>
                        <li>• Assume responsibility for third-party services</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        Click links at your own risk.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 16 */}
                <section id="16" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">16. ACCESSIBILITY</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>We strive to make our website accessible to individuals with disabilities (WCAG 2.1 AA standards).</p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        If you experience accessibility issues, contact: accessibility@kinnconsultancy.com
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 17 */}
                <section id="17" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">17. EMERGENCY SITUATIONS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>Our Services are not appropriate for emergencies or time-critical situations requiring immediate legal intervention.</p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="font-semibold">
                        If you need urgent legal help: Contact an attorney directly or call your local bar association's referral service.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 18 */}
                <section id="18" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">18. UPDATES TO DISCLAIMERS</h2>
                  <div className="mt-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p>These disclaimers may be updated periodically. Check this page regularly for changes.</p>
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">QUESTIONS?</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-card p-4">
                      <p><strong>Email:</strong> legal@kinnconsultancy.com</p>
                      <p><strong>Phone:</strong> (555) 123-4567</p>
                    </div>
                  </div>
                </section>

                {/* Final Acceptance */}
                <div className="mt-12 rounded-lg border-2 border-primary/20 bg-primary/5 p-6 text-center">
                  <p className="font-semibold text-primary">
                    BY USING KINN CONSULTANCY'S SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THESE DISCLAIMERS.
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
              Need Legal Clarification?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contact our team for questions about these disclaimers or consult an attorney for legal advice.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Contact Our Team
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
      <SiteFooter />
    </div>
  )
}
