import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, BookOpen, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample blog posts data (in a real app, this would come from an API or database)
const blogPosts = [
  {
    id: 1,
    title: "Atomic Habits by James Clear",
    excerpt: "A comprehensive summary of how small changes can lead to remarkable results.",
    date: "May 2, 2023",
    category: "Self-Improvement",
    slug: "atomic-habits",
    image: "/placeholder.svg?height=600&width=1200",
    author: "John Doe",
    content: `
      <h2>Book Overview</h2>
      <p>In "Atomic Habits," James Clear presents a practical framework for improving every day. The book draws on proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible.</p>
      
      <h2>Key Takeaways</h2>
      <ul>
        <li><strong>Habits are the compound interest of self-improvement</strong>: Small changes often appear to make no difference until you cross a critical threshold. The most powerful outcomes are the result of many small decisions over time.</li>
        <li><strong>Focus on your identity, not outcomes</strong>: The most effective way to change your habits is to focus on who you want to become, not what you want to achieve.</li>
        <li><strong>The Four Laws of Behavior Change</strong>: Make it obvious, make it attractive, make it easy, and make it satisfying.</li>
        <li><strong>Environment is the invisible hand that shapes human behavior</strong>: The most practical way to change your habits is to change your environment.</li>
        <li><strong>The Goldilocks Rule</strong>: Humans experience peak motivation when working on tasks that are right on the edge of their current abilities—not too hard, not too easy.</li>
      </ul>
      
      <h2>Practical Applications</h2>
      <p>Here are some practical ways to apply the concepts from Atomic Habits:</p>
      <ol>
        <li><strong>Habit Stacking</strong>: Identify a current habit you already do each day and then stack your new behavior on top.</li>
        <li><strong>Implementation Intentions</strong>: "I will [BEHAVIOR] at [TIME] in [LOCATION]."</li>
        <li><strong>Habit Tracking</strong>: Don't break the chain of successful days.</li>
        <li><strong>The Two-Minute Rule</strong>: When you start a new habit, it should take less than two minutes to do.</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Atomic Habits provides a proven framework for improving every day. By focusing on small changes and building better habits, you can make remarkable progress over time. The key is to focus on systems rather than goals, identity rather than outcomes, and the process rather than the results.</p>
    `,
  },
  // More blog posts would be defined here
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Post Not Found</h1>
        <p className="text-gray-700 mb-8">The blog post you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Button variant="ghost" className="text-primary hover:text-primary/90 p-0" asChild>
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
          </div>

          {/* Post header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Naufal</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>5 min read</span>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
          </div>

          {/* Post content */}
          <div className="prose max-w-none prose-blue prose-headings:text-primary prose-a:text-secondary">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Share buttons */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Share this summary</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
                {/* Add more social share buttons here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
