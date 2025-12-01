// app/terms-of-service/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Last Updated: November 29, 2024
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="prose prose-gray max-w-none">
              {/* Introduction */}
              <div className="mb-12 rounded-lg border bg-card p-6">
                <p className="text-lg font-medium text-muted-foreground">
                  PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR SERVICES.
                </p>
                <p className="mt-4">
                  By accessing or using Kinn Consultancy's website, services, or products, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our services.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="mb-12 rounded-lg border bg-muted/30 p-6">
                <h3 className="mb-4 font-serif text-xl font-semibold">Table of Contents</h3>
                <nav className="grid gap-2 text-sm md:grid-cols-2">
                  {[
                    "1. Definitions",
                    "2. Scope of Services",
                    "3. User Obligations",
                    "4. Fees and Payment",
                    "5. Service Guarantees",
                    "6. Limitation of Liability",
                    "7. Disclaimer of Warranties",
                    "8. Intellectual Property",
                    "9. Privacy and Data Security",
                    "10. Termination",
                    "11. Dispute Resolution",
                    "12. General Provisions",
                    "13. Changes to Terms",
                    "14. Contact Information"
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

              {/* Terms Sections */}
              <div className="space-y-12">
                {/* Section 1 */}
                <section id="1" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">1. DEFINITIONS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p><strong>1.1 "Kinn Consultancy," "we," "us," or "our"</strong> refers to Kinn Consultancy, with principal offices in Los Angeles, California.</p>
                    <p><strong>1.2 "Services"</strong> refers to all products, services, website, software, and support provided by Kinn Consultancy, including but not limited to document preparation, probate guidance, AI-powered tools, and case management.</p>
                    <p><strong>1.3 "User," "you," or "your"</strong> refers to any individual or entity accessing or using our Services.</p>
                    <p><strong>1.4 "Client"</strong> refers to a User who has purchased a paid Service from Kinn Consultancy.</p>
                    <p><strong>1.5 "Estate"</strong> refers to the deceased person's estate being administered through our Services.</p>
                  </div>
                </section>

                {/* Section 2 */}
                <section id="2" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">2. SCOPE OF SERVICES</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">2.1 Legal Document Preparation Service</h3>
                      <p className="mt-2">Kinn Consultancy is a legal document preparation service. We prepare legal documents at your direction and provide self-help services.</p>
                    </div>
                    
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">2.2 Not Legal Advice</h3>
                      <p className="mt-2">KINN CONSULTANCY DOES NOT PROVIDE LEGAL ADVICE. Our Services are not a substitute for the advice of an attorney. We cannot advise you on what documents to file, recommend specific legal strategies, represent you in court proceedings, or answer questions requiring legal judgment.</p>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">2.3 Attorney Services</h3>
                      <p className="mt-2">When you purchase our Premium tier or request attorney consultation, you are entering into a separate attorney-client relationship with our partner law firm. That relationship is governed by a separate engagement letter.</p>
                    </div>

                    <p><strong>2.4 No Attorney-Client Relationship</strong> - Unless you explicitly engage our attorney services (Premium tier), no attorney-client relationship exists between you and Kinn Consultancy or its employees.</p>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="3" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">3. USER OBLIGATIONS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p><strong>3.1 Accurate Information</strong> - You agree to provide complete, accurate, and truthful information. You are responsible for reviewing all documents we prepare and ensuring accuracy before filing.</p>
                    <p><strong>3.2 Executor/Administrator Authority</strong> - You represent that you have legal authority to act on behalf of the Estate. If you are not the appointed executor/administrator, you agree to obtain proper authorization before using our Services.</p>
                    <p><strong>3.3 Compliance with Laws</strong> - You agree to comply with all applicable federal, state, and local laws in connection with your use of our Services.</p>
                    
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">3.4 Prohibited Uses</h3>
                      <p className="mt-2">You may not use our Services to commit fraud, prepare documents for unauthorized practice of law, circumvent legal requirements, harass others, or violate intellectual property rights.</p>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section id="4" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">4. FEES AND PAYMENT</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p><strong>4.1 Pricing</strong> - All fees are clearly stated on our website and during the purchase process. Prices are subject to change, but you will be charged the price displayed at the time of purchase.</p>
                    <p><strong>4.2 Payment Terms</strong> - Payment is due at the time of service purchase unless otherwise agreed in writing.</p>
                    
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">4.3 Refunds</h3>
                      <div className="mt-2 space-y-2">
                        <p><strong>Digital Products (Free & Starter):</strong> 7-day money-back guarantee from purchase date. No refund if documents have been filed with court.</p>
                        <p><strong>Service Tiers (Pro & Premium):</strong> 14-day money-back guarantee if we have not yet prepared documents. Partial refund (50%) if documents prepared but not filed. No refund after filing with court.</p>
                        <p><strong>Premium Tier:</strong> Refund policy governed by attorney engagement letter.</p>
                        <p className="text-sm">To request a refund, email support@kinnconsultancy.com with your order number and reason.</p>
                      </div>
                    </div>

                    <p><strong>4.4 Upgrades</strong> - If you upgrade from a lower tier to a higher tier, we will credit your original payment toward the new tier price.</p>
                  </div>
                </section>

                {/* Section 5 */}
                <section id="5" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">5. SERVICE GUARANTEES AND LIMITATIONS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">5.1 Document Accuracy Guarantee</h3>
                      <p className="mt-2">We guarantee our AI-generated and reviewed documents are accurate and compliant with applicable state law. If an error in our document preparation causes court rejection, we will correct the error at no cost and reimburse any court fees incurred due to our error (up to $500).</p>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">5.2 Timeline Guarantee (Pro & Premium Tiers)</h3>
                      <p className="mt-2">We guarantee completion within specified timeframes for standard cases, provided you respond to our requests promptly and no disputes arise.</p>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">5.3 Limitations of AI Services</h3>
                      <p className="mt-2">Our AI tools are designed to assist with document preparation but are not perfect. You acknowledge that AI may make errors, you are responsible for reviewing all AI-generated content, and we are not liable for decisions you make based on AI output.</p>
                    </div>
                  </div>
                </section>

                {/* Section 6 */}
                <section id="6" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">6. LIMITATION OF LIABILITY</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p><strong>6.1 No Consequential Damages</strong> - To the maximum extent permitted by law, Kinn Consultancy shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
                      <p className="mt-2"><strong>6.2 Cap on Liability</strong> - Kinn Consultancy's total liability for any claim arising from our Services shall not exceed the amount you paid for the service in question.</p>
                    </div>
                  </div>
                </section>

                {/* Section 7 */}
                <section id="7" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">7. DISCLAIMER OF WARRANTIES</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">7.1 "AS IS" Service</h3>
                      <p className="mt-2">OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.</p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <h3 className="font-semibold">7.2 No Outcome Guarantee</h3>
                      <p className="mt-2">We cannot guarantee court approval of your documents, specific timelines, or the outcome of your probate case. Every estate is unique, and outcomes depend on factors outside our control.</p>
                    </div>
                  </div>
                </section>

                {/* Section 8 */}
                <section id="8" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">8. INTELLECTUAL PROPERTY</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p><strong>8.1 Ownership</strong> - All content, software, trademarks, and materials on our website and in our Services are owned by Kinn Consultancy or our licensors.</p>
                    <p><strong>8.2 License to You</strong> - We grant you a limited, non-exclusive, non-transferable license to access and use our Services for their intended purpose.</p>
                    <p><strong>8.3 Your Content</strong> - You retain ownership of all information and documents you upload to our Services.</p>
                  </div>
                </section>

                {/* Section 9 */}
                <section id="9" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">9. PRIVACY AND DATA SECURITY</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p><strong>9.1 Privacy Policy</strong> - Our collection and use of personal information is governed by our Privacy Policy.</p>
                    <p><strong>9.2 Data Security</strong> - We implement reasonable security measures to protect your information, but no system is 100% secure.</p>
                    <p><strong>9.3 Sensitive Information</strong> - Estate information may include sensitive personal and financial data.</p>
                  </div>
                </section>

                {/* Section 10 */}
                <section id="10" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">10. TERMINATION</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p><strong>10.1 By You</strong> - You may terminate your use of our Services at any time.</p>
                    <p><strong>10.2 By Us</strong> - We may suspend or terminate your access to Services if you violate these Terms.</p>
                    <p><strong>10.3 Effect of Termination</strong> - Upon termination, your right to use our Services immediately ceases.</p>
                  </div>
                </section>

                {/* Section 11 */}
                <section id="11" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">11. DISPUTE RESOLUTION</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p><strong>11.1 Informal Resolution</strong> - Before filing any legal action, you agree to contact us and attempt to resolve the dispute informally.</p>
                    <p><strong>11.2 Binding Arbitration</strong> - Any dispute arising from these Terms shall be resolved by binding arbitration.</p>
                    <p><strong>11.3 Class Action Waiver</strong> - You agree to arbitrate disputes on an individual basis only.</p>
                    <p><strong>11.4 Opt-Out</strong> - You may opt out of arbitration by emailing us within 30 days of first using our Services.</p>
                  </div>
                </section>

                {/* Section 12 */}
                <section id="12" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">12. GENERAL PROVISIONS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p><strong>12.1 Governing Law</strong> - These Terms are governed by the laws of the State of California.</p>
                    <p><strong>12.2 Severability</strong> - If any provision is found unenforceable, the remaining provisions remain in full effect.</p>
                    <p><strong>12.3 Entire Agreement</strong> - These Terms constitute the entire agreement between you and Kinn Consultancy.</p>
                    <p><strong>12.4 Notices</strong> - Legal notices must be sent to our designated address.</p>
                  </div>
                </section>

                {/* Section 13 */}
                <section id="13" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">13. CHANGES TO TERMS</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p>We may update these Terms at any time. Material changes will be notified via email and take effect 30 days after posting. Your continued use of our Services after changes take effect constitutes acceptance of the new Terms.</p>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="14" className="scroll-mt-20">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">14. CONTACT INFORMATION</h2>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    <p>Questions about these Terms?</p>
                    <div className="rounded-lg border bg-card p-4">
                      <p><strong>Email:</strong> legal@kinnconsultancy.com</p>
                      <p><strong>Phone:</strong> (555) 123-4567</p>
                      <p><strong>Mail:</strong> Kinn Consultancy<br />123 Main Street, Suite 400<br />Los Angeles, CA 90001</p>
                    </div>
                  </div>
                </section>

                {/* Acceptance Notice */}
                <div className="mt-12 rounded-lg border-2 border-primary/20 bg-primary/5 p-6 text-center">
                  <p className="font-semibold text-primary">
                    BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
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
              Questions About Our Terms?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contact our legal team for clarification or concerns about our Terms of Service.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Contact Legal Team
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center rounded-md border border-primary/20 px-6 py-3 text-sm font-medium transition hover:bg-primary/10"
              >
                View Privacy Policy
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
