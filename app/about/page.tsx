"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Hi, I'm Naufal – Aspiring Writer
            </h1>
            <p className="text-lg text-gray-700 mb-8">
A highly motivated and introspective individual with a passion for personal growth and understanding human behavior through the lens of MBTI psychology. As an aspiring writer, I am driven to explore and share insightful perspectives. While inherently introverted, I possess a strong desire to contribute positively to the lives of others. My diverse interests span  self-development web development, design, self-development literature, and strategic gaming, allowing for a multifaceted approach to problem-solving and creative expression.            </p>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="A"
              className="rounded-xl shadow-lg object-cover"
            />
            <div>
              <Badge className="mb-4 bg-secondary/10 text-secondary border-none">About Me</Badge>
              <h2 className="text-3xl font-bold text-primary mb-4">
                More Than Just a Developer
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
My skills extend beyond the realm of coding. I possess an eye for design and a creative mindset that allows me to approach projects with both technical proficiency and aesthetic sensibility. My interest in strategic games cultivates analytical thinking and the ability to plan effectively.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Furthermore, I am driven by a desire to share inspiration and philosophical insights drawn from Islamic teachings, Stoicism, and traditional Chinese philosophy, enriching my interactions and contributions with a unique perspective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-none">Personality</Badge>
            <h2 className="text-3xl font-bold text-primary mb-4">My Core Values</h2>
            <p className="text-gray-700 mb-10">
              These values drive everything I do, both personally and professionally.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Integrity and Wisdom</h3>
                <p className="text-gray-700 leading-relaxed">
                   Guided by principles of honesty, ethical conduct, and the timeless wisdom found in diverse philosophical traditions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Emphaty and Service</h3>
                <p className="text-gray-700 leading-relaxed">
                 A deep-seated belief in the importance of understanding and supporting others.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Continuous Growth</h3>
                <p className="text-gray-700 leading-relaxed">
                 A commitment to lifelong learning, self-improvement, and the pursuit of knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Collection Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-secondary/10 text-secondary border-none">Portfolio</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                My Design Collection
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-video">
                    <img
                      src={`/placeholder.svg?height=200&width=400`}
                      alt={`Design Project ${item}`}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-primary mb-2">
                      Design Project {item}
                    </h3>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">UI/UX</Badge>
                      <Button variant="ghost" size="sm" className="text-secondary p-0 h-auto">
                        <span className="flex items-center text-sm">
                          View <ArrowUpRight className="ml-1 h-3 w-3" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
