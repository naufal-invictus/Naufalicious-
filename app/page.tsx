"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
                  Naufalicious <span className="text-secondary">Kebab</span>
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                  Driven by my passion for personality psychology, I've created a card generator to make self-discovery enjoyable.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
                    <Link href="/projects" className="flex items-center">
                      Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Link href="/about" className="flex items-center">
                      Learn More About Me <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 rounded-lg overflow-hidden">
                  <img
                    src="https://i.ibb.co.com/Qjcw4yjw/wallpaperflare-com-wallpaper-removebg-preview.png?height=400&width=600"
                    alt="Personality Cards"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Overview Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-4">Featured Projects</h2>
          <p className="text-gray-700 mb-6">
            Explore a curated collection of tools built around personality science,.
          </p>
          <Link href="/projects" className="text-secondary font-medium hover:underline">
            View All Projects →
          </Link>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-4">My Tech Stack</h2>
          <p className="text-gray-700 mb-6">
            Built with Next.js, Tailwind CSS, and Tsx.
          </p>
        </div>
      </section>
    </div>
  )
}
