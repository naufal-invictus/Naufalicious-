"use client";

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
                <motion.div whileHover={{ scale: 1.05 }} className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary relative">
                  <img
                    src="https://i.ibb.co/Kxp3bc2Y/GRlu4-V5b-MAAAk1-M.jpg?height=200&width=200"
                    alt="My Photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/30 mix-blend-multiply"></div>
                </motion.div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex gap-3 mb-4">
                  <Badge className="bg-primary text-white">ISFJ</Badge>
                  <Badge className="bg-secondary text-white">Enneagram 1w2</Badge>
                </div>
                <p className="text-lg text-gray-700 mb-4">
                  I'm Naufal, with a passion for self-development books and IT tech. I'm
                  also an aspiring writer.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Driven by my passion for personality psychology, I've created
                  an card generator to make self-discovery enjoyable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center font-bold text-primary mb-4">
            More Than Just a Developer
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed text-center">
            My skills extend beyond the realm of coding. I possess an eye for
            design and a creative mindset that allows me to approach projects
            with both technical proficiency and aesthetic sensibility.
          </p>
          <p className="text-gray-600 leading-relaxed text-center">
            Furthermore, I bring a unique perspective by sharing philosophical
            insights from Islamic, Stoic, and Chinese traditions.
          </p>
        </div>
      </section>

      {/* About My Personality */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">My Core Values</h2>
            <p className="text-gray-700 mb-10">
              These values drive everything I do, both personally and
              professionally.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">
                  Integrity and Wisdom
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Guided by principles of honesty, ethical conduct, and the
                  timeless wisdom found in diverse philosophical traditions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">
                  Emphaty and Service
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A deep-seated belief in the importance of understanding and
                  supporting others.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Continuous Growth</h3>
                <p className="text-gray-700 leading-relaxed">
                  A commitment to lifelong learning, self-improvement, and the
                  pursuit of knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-left">
            <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">
              My Principles
            </Badge>
            <h2 className="text-3xl font-bold text-primary mb-4">The Noble Wound</h2>
            <p className="text-gray-700 mb-8 italic">
              I find a strange solace in the consistent presence of my solitude
              and suffering.
            </p>

            <div className="space-y-8 text-gray-800 leading-relaxed text-base md:text-lg">
              <div className="space-y-1">
                <p>I suffer, yet I utter no sound,</p>
                <p>For this wound is solely mine, unbound.</p>
                <p>I let not the world taste my sacred pain,</p>
                <p>For this sorrow is a holy reign.</p>
              </div>

              <div className="space-y-1">
                <p>I am lonely, yet I seek no replacement,</p>
                <p>No soul I invite to my spirit's vacant space.</p>
                <p>It never departs though the world may fall,</p>
                <p>Faithful as a shadow without a body's thrall.</p>
              </div>

              <div className="space-y-1">
                <p>Suffering will never demand of anyone,</p>
                <p>It only wishes to be remembered in silence spun.</p>
                <p>Suffering never betrays or takes its flight,</p>
                <p>It remains when even laughter bids goodnight.</p>
              </div>

              <div className="space-y-1">
                <p>Loneliness is no foe, but a steadfast friend,</p>
                <p>In solitude, I learn to love this unending trend.</p>
                <p>It stays when all others disappear,</p>
                <p>As if it's the only one truly held dear.</p>
              </div>
            </div>

            <div className="mt-10 text-right text-sm text-gray-500 italic">
              — Naufalicious
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
<section className="py-16 bg-gray-100">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">Experience</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Technician & Graphic Designer</h3>
        <p className="text-gray-700 mb-1"><span className="font-semibold">PT. Lini Kreatif Indonesia</span></p>
        <ul className="list-disc list-inside text-gray-600">
          <li>Learned and collaborated with the graphic designer team, developing visual design skills and product content creation.</li>
          <li>Collaborated with the technical team to ensure events ran smoothly.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">HR & Personnel Administrator</h3>
        <p className="text-gray-700 mb-1"><span className="font-semibold">PT. Sinar Jaya Megah Langgeng</span></p>
        <ul className="list-disc list-inside text-gray-600">
          <li>Managed and reviewed employee salary and BPJS (Social Security Agency) data.</li>
          <li>Supported the HR team in the recruitment process, including candidate screening.</li>
          <li>Managed personnel document archives and ensured the completeness of personal data.</li>
          <li>Utilized Microsoft Excel to process attendance, salary, and allowance data, as well as compile necessary reports.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* Skills Section */}
<section className="py-16">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">Skills</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Technical Skills</h3>
        <p className="text-gray-700">
          Router installation and configuration (Mercusys, TP Link), LAN; LAN/WAN network administration, network topology; OS installation (Windows, Linux), troubleshooting; FTP server configuration, remote printing; Virtualization (VMware, VirtualBox); Basic programming language (Python), understanding BIOS/UEFI; Front-End (Svelte, Tailwind).
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Soft Skills</h3>
        <p className="text-gray-700">
          Possesses teamwork abilities, can manage stress and remain productive in high-pressure situations. Quickly adapts to new environments and is capable of critically filtering information.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Awards</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Internship Participant Certificate with Good/Satisfactory Grade from PT. Sinar Jaya Megah Langgeng | No. 001/SDM/PKL/III/2023 | 2023</li>
        </ul>
      </div>
    </div>
  </div>
</section>

      
 {/* Certificates Section */}
<section className="py-16">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Certificates
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
        <p className="text-gray-700 mt-4">
          Here are some of the certificates I've earned.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Certificate 1 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              MikroTik Certified Network Associate (MTCNA)
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                MTCNA
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Mikrotik
            </p>
            <p className="text-gray-600 text-sm">
              13-04-2023
            </p>
          </div>
        </motion.div>

        {/* Example Certificate 2 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Ready For Security Training
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Training
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Microsoft & InfraDigital
            </p>
            <p className="text-gray-600 text-sm">
              August-September - 2023
            </p>
          </div>
        </motion.div>

        {/* Example Certificate 3 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Foundations of Cybersecurity
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Course
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Coursera
            </p>
            <p className="text-gray-600 text-sm">
              2023
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Technical Support
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Certificate
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Coursera
            </p>
            <p className="text-gray-600 text-sm">
              2023
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              IT Infrastructure Services and Systems Administration
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Certificate
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Coursera
            </p>
            <p className="text-gray-600 text-sm">
              2023
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Dev OPS- Basics
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Certificate
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Dicoding
            </p>
            <p className="text-gray-600 text-sm">
              2023
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Introduction to Information Security Course
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Course
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Cyber Academy
            </p>
            <p className="text-gray-600 text-sm">
              2022
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Samsung Innovation Campuss
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Campuss
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Samsung
            </p>
            <p className="text-gray-600 text-sm">
              2022
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Mechanical Engineer CAD ASEAN
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                ASEAN
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              BBPVP Bandung & Kemenaker
            </p>
            <p className="text-gray-600 text-sm">
              2022
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              IT Support Google
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Support
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Coursera & Google
            </p>
            <p className="text-gray-600 text-sm">
              2022
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              The Ins and Outs of Computer Networking.
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Networking
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Coursera & Google
            </p>
            <p className="text-gray-600 text-sm">
              2023
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Web Development Wizardry
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Development
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Udemy
            </p>
            <p className="text-gray-600 text-sm">
              2024
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Bootcamp Quality Assurance
            </h3>
            <div className="flex items-center justify-start mb-2">
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                Bootcamp
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">
              Gits ID
            </p>
            <p className="text-gray-600 text-sm">
              2024
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>
      {/* My Design Collection Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">My Design Collection</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="https://i.ibb.co/1t2HRrPW/pi1.jpg" // Replace with your image path
                    alt="Design Project 1"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-primary mb-2">
                    PI-1
                  </h3>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Web Design
                    </Badge>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="https://i.ibb.co/ZzD50xHs/pi2.jpg" // Replace with your image path
                    alt="PI-2"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-primary mb-2">
                    PI-2
                  </h3>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Web Design
                    </Badge>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="https://i.ibb.co/fYd9rZ0W/pi3.jpg" // Replace with your image path
                    alt="PI-3"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-primary mb-2">
                    PI-3
                  </h3>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Web Design
                    </Badge>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="https://i.ibb.co/35NS6DNv/pi4.jpg" // Replace with your image path
                    alt="PI-3"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-primary mb-2">PI-4</h3>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Web Design
                    </Badge>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="https://i.ibb.co/NnyGnDfW/D1.jpg" // Replace with your image path
                    alt="Affinity Design Soviet & Japan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-primary mb-2">Soviet & Japan</h3>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">Affinity Designer</Badge>

                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="https://i.ibb.co/35rgTLrH/D2.jpg" // Replace with your image path
                    alt="Game Card Design"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-primary mb-2">Game Card Design</h3>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">Affinity Designer</Badge>

                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
