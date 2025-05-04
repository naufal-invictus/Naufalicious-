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
                <span>
                  <strong>Computer Troubleshooting:</strong> Experienced in diagnosing and resolving various computer
                  issues.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Software and Hardware Troubleshooting:</strong> Skilled in identifying and fixing software
                  bugs and hardware malfunctions.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Networking:</strong> Knowledgeable in LAN, WAN, and other networking technologies.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Programming:</strong> Proficient in Python and JavaScript.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Tech Stack:</strong> Experienced with Svelte or React with Tailwind CSS.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Self-development:</strong> Passionate about personal growth and continuous learning.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <strong>Teamwork:</strong> Excellent collaboration and communication skills in team environments.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
