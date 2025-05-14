export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">About Me</h1>

        <div className="prose max-w-none">
          <p className="text-lg mb-6 text-gray-700">
            Hello! I'm Naufal, i'm passionate about creating interactive and user-friendly applications.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">My Interests</h2>
          <p className="text-gray-700">
            I'm particularly interested in personality psychology, which is reflected in my projects like the MBTI and
            Enneagram card generators. I believe that understanding personality types can help people better understand
            themselves and others.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">My Journey</h2>
          <p className="text-gray-700">
            My journey in web development started with a curiosity about how websites work. Over time, I've developed a
            passion for creating tools that help people express themselves and share their unique personalities with
            others.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary">My Skills & Expertise</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm mt-4">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Experienced in computer troubleshooting, including diagnosing and resolving software bugs and hardware malfunctions. Proficient in networking fundamentals such as LAN and WAN, including router installation and configuration (Mercusys, TP-Link), LAN/WAN administration, network topology, FTP server setup, and remote printing. Skilled in operating system installation (Windows, Linux), virtualization (VMware, VirtualBox), and understanding BIOS/UEFI. Familiar with programming fundamentals in Python and JavaScript, and adept in front-end development using Svelte or React with Tailwind CSS. Certified in Google IT Support (Coursera), 3D Model Drawing CAD (BNSP), and Quality Assurance Bootcamp (Gits.id). Strong soft skills include effective teamwork, adaptability to new environments, stress management under pressure, and critical information filtering. Driven by personal growth and continuous learning.
               </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
