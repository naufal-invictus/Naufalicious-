import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample blog posts data (in a real app, this would come from an API or database)
const blogPosts = [
  {
    id: 1,
    title: "Atomic Habits by James Clear",
    excerpt: "A comprehensive summary of how small changes can lead to remarkable results.",
    date: "May 2, 2023",
    category: "Self-Improvement",
    slug: "atomic-habits",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "Deep Work by Cal Newport",
    excerpt: "How to develop the superpower of deep focus and concentration in a distracted world.",
    date: "April 15, 2023",
    category: "Productivity",
    slug: "deep-work",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "Thinking, Fast and Slow by Daniel Kahneman",
    excerpt: "Understanding the two systems that drive the way we think and make decisions.",
    date: "March 28, 2023",
    category: "Psychology",
    slug: "thinking-fast-and-slow",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    title: "The Psychology of Money by Morgan Housel",
    excerpt: "Timeless lessons on wealth, greed, and happiness that explore the strange ways people think about money.",
    date: "March 10, 2023",
    category: "Finance",
    slug: "psychology-of-money",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 5,
    title: "Sapiens by Yuval Noah Harari",
    excerpt: "A brief history of humankind, exploring how Homo sapiens came to dominate the planet.",
    date: "February 22, 2023",
    category: "History",
    slug: "sapiens",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 6,
    title: "The Four Agreements by Don Miguel Ruiz",
    excerpt: "A practical guide to personal freedom based on ancient Toltec wisdom.",
    date: "February 5, 2023",
    category: "Self-Improvement",
    slug: "four-agreements",
    image: "/placeholder.svg?height=300&width=500",
  },
]

// Categories
const categories = ["All", "Self-Improvement", "Productivity", "Psychology", "Finance", "History", "Business"]

export default function BlogPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">
            Book Summaries
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Book Summary Blog</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 mb-8">
            Concise summaries of the best books on psychology, self-improvement, and personal growth.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Input
              type="text"
              placeholder="Search book summaries..."
              className="pl-10 border-gray-300 focus-visible:ring-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-4xl mx-auto mb-12">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="w-full flex overflow-x-auto pb-2 justify-start md:justify-center">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="flex-shrink-0">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {blogPosts
                    .filter((post) => category === "All" || post.category === category)
                    .map((post) => (
                      <div
                        key={post.id}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20 border-none">
                            {post.category}
                          </Badge>
                          <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{post.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">by Naufal • {post.date}</span>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 p-0">
                              <Link href={`/blog/${post.slug}`} className="flex items-center">
                                Read Summary <ArrowRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
