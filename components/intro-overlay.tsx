"use client"

import { useEffect, useState } from "react"
import ThreeSymbol from "./three-symbol"

export function IntroOverlay() {
  const [show, setShow] = useState(true)
  const [animating, setAnimating] = useState(false) // animation state

  useEffect(() => {
    try {
      const seen = typeof window !== "undefined" && window.sessionStorage.getItem("introSeen") === "1"
      if (seen) setShow(false)
    } catch {
      // ignore
    }
  }, [])

  const handleEnter = () => {
    setAnimating(true)
    window.setTimeout(() => {
      try {
        window.sessionStorage.setItem("introSeen", "1")
      } catch {
        // ignore
      }
      setShow(false)
    }, 750) // matches transition duration below
  }

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black text-white transition-opacity duration-700 ease-out ${
        animating ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      {/* Foreground content */}
      <div className="relative mx-auto flex max-w-xl flex-col items-center px-6 text-center">
        <div
          className={`mb-6 h-28 w-28 transform-gpu transition-all duration-700 ease-out md:h-36 md:w-36 ${
            animating ? "scale-[6] opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <ThreeSymbol variant="dollar" />
        </div>

        <h2 id="welcome-title" className="font-serif text-3xl tracking-tight md:text-5xl">
          Welcome to Kinn Consultancy
        </h2>
        <p className="mt-3 text-sm leading-relaxed opacity-90 md:text-base">
          Simple, transparent coverage from a personal team that cares.
        </p>

        <button
          onClick={handleEnter}
          className="mt-7 inline-flex items-center rounded-md bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="Enter site"
        >
          Enter site
        </button>
      </div>
    </div>
  )
}
