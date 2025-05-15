"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface FontLoaderProps {
  children: React.ReactNode
}

export function FontLoader({ children }: FontLoaderProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    // Check if the document is available (client-side)
    if (typeof document !== "undefined") {
      // Use the document.fonts API if available
      if ("fonts" in document) {
        Promise.all([
          document.fonts.load("1em Playfair Display"),
          document.fonts.load("1em Caveat"),
          document.fonts.load("1em Cormorant Garamond"),
          document.fonts.load("1em Montserrat"),
          document.fonts.load("1em Lora"),
          document.fonts.load("1em Merriweather"),
          document.fonts.load("1em Crimson Pro"),
        ])
          .then(() => {
            setFontsLoaded(true)
          })
          .catch((error) => {
            console.error("Error loading fonts:", error)
            // Set fonts as loaded anyway to prevent UI from being stuck
            setFontsLoaded(true)
          })
      } else {
        // Fallback for browsers that don't support the fonts API
        // Just set a timeout to assume fonts are loaded after 1 second
        const timer = setTimeout(() => {
          setFontsLoaded(true)
        }, 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  return <div className={fontsLoaded ? "font-loaded" : "font-loading"}>{children}</div>
}
