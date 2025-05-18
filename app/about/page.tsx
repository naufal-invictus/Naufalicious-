import { Badge } from "@/components/ui/badge"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-20">

      {/* Section: About Me */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-primary text-left">About Me</h1>
          <p className="text-lg mb-6 text-gray-700 text-left">
            Hello! I'm Naufal, a developer passionate about creating interactive and user-friendly applications.
          </p>
        </div>
      </section>

      {/* Section: What I Stand For */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-secondary text-left">What I Stand For</h2>
          <p className="text-gray-700 text-left">
            I strive to be someone who not only builds great software, but also uplifts those around me through kindness,
            resilience, and ethical conduct. My approach is guided by a balance of critical thinking, compassion, and continuous improvement.
          </p>
        </div>
      </section>

      {/* Section: My Interests */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-secondary text-left">My Interests</h2>
          <p className="text-gray-700 text-left">
            I'm particularly interested in personality psychology, which is reflected in my projects like the MBTI and
            Enneagram card generators. I believe that understanding personality types can help people better understand
            themselves and others.
          </p>
        </div>
      </section>

      {/* Section: My Journey */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-secondary text-left">My Journey</h2>
          <p className="text-gray-700 text-left">
            My journey in web development started with a curiosity about how websites work. Over time, I've developed a
            passion for creating tools that help people express themselves and share their unique personalities with
            others.
          </p>
        </div>
      </section>

      {/* Section: My Skills & Expertise */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-secondary text-left">My Skills & Expertise</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm mt-4">
            <ul className="space-y-4 text-gray-700 text-left">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Experienced in computer troubleshooting, networking (LAN/WAN), router setup (Mercusys, TP-Link), FTP servers, remote printing, OS installation, virtualization, and BIOS/UEFI. Proficient in Python & JavaScript; front-end using Svelte/React + Tailwind CSS. Certified in Google IT Support, 3D CAD Drawing (BNSP), and QA Bootcamp (Gits.id). Strong soft skills: teamwork, adaptability, critical thinking, stress management.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: Achievements */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-secondary text-left">Achievements</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 text-left">
            <li>Built and published multiple personality-based tools used by hundreds of users.</li>
            <li>Completed multiple certifications from Coursera, BNSP, and industry-recognized bootcamps.</li>
            <li>Led collaborative community projects focused on mental wellness and tech education.</li>
          </ul>
        </div>
      </section>

      {/* Section: Continuous Learning */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-secondary text-left">Continuous Learning</h2>
          <p className="text-gray-700 text-left">
            I'm a firm believer in lifelong learning. Whether it's reading philosophy, exploring new frameworks, or improving my problem-solving mindset through Stoicism and Islamic values, I always aim to grow a little every day.
          </p>
        </div>
      </section>

      {/* Section: Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-left">
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

{/* Section: Gallery */}
<section>
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-4 text-secondary text-left">Gallery</h2>
    <p className="text-gray-700 mb-6 text-left">A glimpse into some of my activities and creations.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <img src="/images/gallery1.jpg" alt="Gallery 1" className="rounded-lg shadow-md object-cover w-full h-64" />
      <img src="/images/gallery2.jpg" alt="Gallery 2" className="rounded-lg shadow-md object-cover w-full h-64" />
      <img src="/images/gallery3.jpg" alt="Gallery 3" className="rounded-lg shadow-md object-cover w-full h-64" />
    </div>
  </div>
</section>

{/* Section: My Certificates */}
<section>
  <div className="max-w-3xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-4 text-secondary text-left">My Certificates</h2>
    <ul className="list-disc pl-5 space-y-3 text-gray-700 text-left">
      <li>
        <strong>Google IT Support Certificate</strong> – Coursera
        <br /><span className="text-sm text-gray-500">Issued: 2024</span>
      </li>
      <li>
        <strong>3D Model Drawing CAD Certification</strong> – BNSP
        <br /><span className="text-sm text-gray-500">Issued: 2023</span>
      </li>
      <li>
        <strong>Quality Assurance Bootcamp</strong> – Gits.id
        <br /><span className="text-sm text-gray-500">Issued: 2022</span>
      </li>
    </ul>
  </div>
</section>


    </div>
  )
}
