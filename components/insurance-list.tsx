"use client"

import { useState } from "react"

type Service = {
  id: string
  name: string
  summary: string
  priceFrom: number
  features: string[]
}

const SERVICES: Service[] = [
  {
    id: "probate-filing",
    name: "Probate Filing & Documentation",
    summary: "Complete probate petition preparation and court filing services.",
    priceFrom: 850,
    features: ["Petition preparation", "Court filing", "Notice requirements", "Document organization"],
  },
  {
    id: "estate-administration",
    name: "Estate Administration",
    summary: "Full administration support from start to final distribution.",
    priceFrom: 2500,
    features: ["Asset management", "Creditor notifications", "Tax preparation", "Final accounting"],
  },
  {
    id: "asset-discovery",
    name: "Asset Discovery & Valuation",
    summary: "Comprehensive search and valuation of estate assets.",
    priceFrom: 1200,
    features: ["Financial account search", "Property valuation", "Business interests", "Personal property inventory"],
  },
  {
    id: "court-representation",
    name: "Court Representation",
    summary: "Professional representation for probate court proceedings.",
    priceFrom: 1500,
    features: ["Hearings attendance", "Legal document review", "Court communications", "Compliance support"],
  },
  {
    id: "final-distribution",
    name: "Final Distribution",
    summary: "Assistance with final asset distribution to beneficiaries.",
    priceFrom: 1000,
    features: ["Distribution planning", "Beneficiary coordination", "Transfer documentation", "Closing support"],
  },
]

export function InsuranceList() {
  const [query, setQuery] = useState("")

  const filtered = SERVICES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.summary.toLowerCase().includes(query.toLowerCase()) ||
      s.features.some((f) => f.toLowerCase().includes(query.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <label className="w-full md:max-w-sm">
          <span className="sr-only">Search probate services</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services (e.g., filing, assets, distribution)..."
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => (
          <article key={service.id} className="flex flex-col rounded-lg border p-5">
            <header>
              <h3 className="text-lg font-medium">{service.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{service.summary}</p>
            </header>
            <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground">
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              <p className="text-sm">
                From <span className="text-foreground">${service.priceFrom.toLocaleString()}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
