"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, Sparkles, Users, Lightbulb, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  // Handle hydration issues with animations
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-white">
      {/* Hero Section - Simplified Introduction */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
                  Naufalicious <span className="text-secondary">Kebab</span>
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                  Driven by my passion for personality psychology, I've created a card generator to make self-discovery
                  enjoyable.
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
                  <div className="absolute"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Projects Section */}
<section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-primary mb-8 text-center">Featured Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Featured Project 1 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://i.ibb.co/hJSnRrWf/facebook-cover-TANKY-TENSHI-2.png"
          alt="Facebook Cover Generator"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Facebook Cover Generator</h3>
          <p className="text-gray-600 text-sm mb-4">
            Generate personalized Facebook covers with custom colors or based on your MBTI personality.
          </p>
          <Link href="https://fb-cover-generator.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="md">
              View Project <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Project 2 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://i.ibb.co/M5xSLmqz/TANKY-TENSHI-ID-Card.png"
          alt="SCP ID Card Generator"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">SCP ID Card Generator</h3>
          <p className="text-gray-600 text-sm mb-4">
            A fun project to create your own SCP Foundation-style identification card.
          </p>
          <Link href="/project/scp-card-generator" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="md">
              View Project <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Project 3 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://i.ibb.co/FqKmGgBc/TANKY-TENSHI-MBTI-Card.png"
          alt="MBTI ID Card Generator"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">MBTI ID Card Generator</h3>
          <p className="text-gray-600 text-sm mb-4">
            Design a unique ID card showcasing your Myers-Briggs Type Indicator personality type.
          </p>
          <Link href="https://idcard-generator-lyart.vercel.app/mbti" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="md">
              View Project <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-secondary/20 text-secondary hover:bg-secondary/30 border-none">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Unlock the fun of self-discovery</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our personality card generator offers exciting insights into your unique typology, making every discovery a joyful experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Cards</h3>
              <p className="text-gray-600">
                Generate unique personality cards based on your individual traits and preferences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-secondary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Level Up Your Mind!</h3>
              <p className="text-gray-600">
                 Our brain training feature offers a variety of simple engaging games and activities designed to sharpen your focus, memory, and thinking skills.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Show Off Your Unique MBTI Personality on Facebook!</h3>
              <p className="text-gray-600">
                Time to let your true colors shine on Facebook! With our cover generator, you can create a personalized design that perfectly matches your MBTI type. 
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-secondary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Results</h3>
              <p className="text-gray-600">
                Get your personality cards in seconds with our fast and efficient generator.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 border-none">Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Creating your personality cards is simple and fun with our easy-to-follow process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Click The Project Tab</h3>
              <p className="text-gray-600">
                Enter your name in the field provided.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate Cards</h3>
              <p className="text-gray-600">
                Our algorithm processes your responses and creates personalized cards that reflect your personality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download</h3>
              <p className="text-gray-600">
                Download your personality ID Card.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-secondary/20 text-secondary hover:bg-secondary/30 border-none">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from people who have discovered new insights about themselves with our personality cards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">..</span>
                </div>
                <div>
                  <h4 className="font-semibold">No Name</h4>
                  <p className="text-sm text-gray-500">Role</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Kosong."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-secondary font-bold">MJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">No Name 2.</h4>
                  <p className="text-sm text-gray-500">Role</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Review Kosong"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">..</span>
                </div>
                <div>
                  <h4 className="font-semibold">Manusia</h4>
                  <p className="text-sm text-gray-500">Teacher</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Review Kosong"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary/90 to-secondary/90 rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Time to Have Fun Getting to Know Yourself!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start your journey today with our personality card generator.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="https://idcard-generator-lyart.vercel.app/mbti" className="flex items-center">
                Generate Your Cards <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Changelog Section */}
<section className="py-16 bg-gray-100">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">Changelog</h2>
      <p className="text-gray-700 mb-6 text-center">Recent updates and improvements to the portfolio.</p>

      <div className="space-y-4">
        <div className="bg-white rounded-md shadow-sm p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">May 19, 2025</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li><span className="font-semibold">Project SCP ID Card Generator:</span> Implemented bug fixes and expanded the project list.</li>
          </ul>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">May 18, 2025</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li><span className="font-semibold">About Me Section:</span> Restructured into multiple distinct sections for improved readability and organization.</li>
            <li><span className="font-semibold">Project SCP ID Card Generator:</span> Introduced as a new project.</li>
          </ul>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">May 15, 2025</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li><span className="font-semibold">Home Section:</span> Modularized into several sections to enhance content flow and user experience.</li>
          </ul>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">May 14, 2025</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li><span className="font-semibold">Project Quote Card Generator:</span> Added as a new portfolio item.</li>
          </ul>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">May 13, 2025</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li>Consolidated all individual project pages into a single, comprehensive <code className="font-mono text-sm bg-gray-200 rounded px-1">page.tsx</code> file.</li>
          </ul>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">May 12, 2025</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li><span className="font-semibold">Project MBTI ID Card Generator:</span> Addressed color inconsistencies and applied fixes.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
