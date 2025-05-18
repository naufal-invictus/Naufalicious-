// About/page.tsx
import { Badge } from "@/components/ui/badge"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-20">
      
      {/* Section: About Me */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-primary">About Me</h1>
          <p className="text-lg mb-6 text-gray-700">
            Hello! I'm Naufal, I'm passionate about creating interactive and user-friendly applications.
          </p>
        </div>
      </section>

            {/* Section: Core Values */}
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

      {/* Section: My Interests */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">My Interests</h2>
          <p className="text-gray-700">
            I'm particularly interested in personality psychology, which is reflected in my projects like the MBTI and
            Enneagram card generators. I believe that understanding personality types can help people better understand
            themselves and others.
          </p>
        </div>
      </section>

      {/* Section: My Journey */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">My Journey</h2>
          <p className="text-gray-700">
            My journey in web development started with a curiosity about how websites work. Over time, I've developed a
            passion for creating tools that help people express themselves and share their unique personalities with
            others.
          </p>
        </div>
      </section>

      {/* Section: My Skills */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">My Skills & Expertise</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm mt-4">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                Experienced in computer troubleshooting, including diagnosing and resolving software bugs and hardware malfunctions. Proficient in networking fundamentals such as LAN and WAN, including router installation and configuration (Mercusys, TP-Link), LAN/WAN administration, network topology, FTP server setup, and remote printing. Skilled in operating system installation (Windows, Linux), virtualization (VMware, VirtualBox), and understanding BIOS/UEFI. Familiar with programming fundamentals in Python and JavaScript, and adept in front-end development using Svelte or React with Tailwind CSS. Certified in Google IT Support (Coursera), 3D Model Drawing CAD (BNSP), and Quality Assurance Bootcamp (Gits.id). Strong soft skills include effective teamwork, adaptability to new environments, stress management under pressure, and critical information filtering. Driven by personal growth and continuous learning.
              </li>
            </ul>
          </div>
        </div>
      </section>



    </div>
  )
}
