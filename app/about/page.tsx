"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">About Me</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">My Personality Profile</h2>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/3 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }} 
            className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary relative"
          >
            <img
              src="https://i.ibb.co.com/Kxp3bc2Y/GRlu4-V5b-MAAAk1-M.jpg?height=200&width=200"
              alt="My Photo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/30 mix-blend-multiply"></div>
          </motion.div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="flex gap-3 mb-4">
            <Badge className="bg-primary text-white">ENFP</Badge>
            <Badge className="bg-secondary text-white">Enneagram 1w2</Badge>
          </div>
          <p className="text-lg text-gray-700 mb-4">
            I'm Naufal, with a passion for self-development books and IT tech. I'm
            also an aspiring writer.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Driven by my passion for personality psychology, I've created an card generator to make self-discovery
            enjoyable.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* About Me Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img src="/placeholder.svg?height=400&width=600" alt="John Doe" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">About Me</Badge>
              <h2 className="text-3xl font-bold text-primary mb-4">More Than Just a Designer</h2>
              <p className="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p className="text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About My Personality */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">Personality</Badge>
            <h2 className="text-3xl font-bold text-primary mb-4">My Core Values</h2>
            <p className="text-gray-700 mb-8">
              These values drive everything I do, both personally and professionally.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Integrity</h3>
                <p className="text-gray-700">Honesty and transparency in all interactions.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Innovation</h3>
                <p className="text-gray-700">Constantly seeking new and creative solutions.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Collaboration</h3>
                <p className="text-gray-700">Working together to achieve common goals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Design Collection Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">Portfolio</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">My Design Collection</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=200&width=400`}
                      alt={`Design Project ${item}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-primary mb-2">Design Project {item}</h3>
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
