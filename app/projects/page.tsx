import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      id: "mbti-generator",
      title: "MBTI Card Generator",
      description: "Create personalized MBTI personality cards with custom templates and styling options.",
      gradient: "from-primary to-accent",
      textColor: "text-primary",
      borderColor: "border-primary",
      hoverBg: "hover:bg-primary/10",
      link: "https://idcard-generator-lyart.vercel.app/mbti",
    },
    {
      id: "enneagram-generator",
      title: "Enneagram Card Generator",
      description: "Warning: Entering this website is at your own risk. You may encounter bugs, errors, and existential crisis.",
      gradient: "from-purple-600 to-orange-600",
      textColor: "text-secondary",
      borderColor: "border-secondary",
      hoverBg: "hover:bg-secondary/10",
      link: "/projects/enneagram-generator",
    },
      {
      id: "dev-compass",
      title: "Developer Compass",
      description: "Just click around, you'll figure it out.",
      gradient: "from-secondary to-orange-500",
      textColor: "text-secondary",
      borderColor: "border-secondary",
      hoverBg: "hover:bg-secondary/10",
      link: "/projects/pg",
    },
    {
      id: "math-game",
      title: "Fast Math Game",
      description:
        "Test your math skills with this fast-paced game featuring different operations and difficulty levels.",
      gradient: "from-accent to-blue-400",
      textColor: "text-accent",
      borderColor: "border-accent",
      hoverBg: "hover:bg-accent/10",
      link: "/projects/math-game",
    },
    {
      id: "visual-memory-game",
      title: "Visual Memory Game",
      description:
        "Enhance your right-brain functions with this visual pattern memory game that improves spatial recognition.",
      gradient: "from-purple-600 to-violet-500",
      textColor: "text-purple-600",
      borderColor: "border-purple-600",
      hoverBg: "hover:bg-purple-600/10",
      link: "/projects/visual-memory-game",
    },
    {
      id: "text-memory-game",
      title: "Abstract Text Memory",
      description:
        "Challenge your cognitive abilities with this abstract text-based memory game featuring very hard difficulty levels.",
      gradient: "from-emerald-600 to-teal-500",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-600",
      hoverBg: "hover:bg-emerald-600/10",
      link: "/projects/text-memory-game",
    },
        {
      id: "facebook-cover-generator",
      title: "Facebook Cover Generator",
      description:
        "the developer was too busy coding (or napping) to write a proper description. Just click around, you'll figure it out.",
      gradient: "from-emerald-600 to-teal-500",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-600",
      hoverBg: "hover:bg-emerald-800/10",
      link: "https://fb-cover-generator.vercel.app/",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-primary">My Projects</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center text-white text-xl font-bold`}
            >
              {project.title}
            </div>
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-2 ${project.textColor}`}>{project.title}</h3>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <Button
                asChild
                variant="outline"
                className={`${project.textColor} ${project.borderColor} ${project.hoverBg}`}
              >
                <Link href={project.link}>
                  View Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
