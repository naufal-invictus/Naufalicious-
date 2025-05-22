"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Types for better type safety
interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
  author?: string
}

// Sample blog posts data (in a real app, this would come from an API or database)
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Mengenal Pengelompokkan Enneagram: Harmonic, Hornevian, dan Objek Relasi",
    excerpt: "Pemetaan kepribadian dari tiga perspektif yang menyibak pola tersembunyi dalam dinamika Enneagram.",
    date: "May 19, 2025",
    category: "Psychology",
    slug: "pengelompokkan-enneagram",
    author: "Ritsu",
  },
  {
    id: 2,
    title: "Flowchart Tujuan Hidup: Panduan Singkat Menemukan Arah",
    excerpt: "Cara praktis menyusun flowchart tujuan hidup agar lebih terarah",
    date: "May 20, 2025",
    category: "Self-Development",
    slug: "flowchart-tujuan-hidup",
    author: "Naufal",
  },
    {
    id: 3,
    title: "6 Kunci Membangkitkan Semangat Belajar: Dari Kemalasan Menuju Prestasi Gemilang",
    excerpt: "Motivasi bukan tujuan akhir, tapi pemicu awal. Temukan 6 strategi jitu untuk mengubah kemalasan menjadi produktivitas dan mencapai tujuan belajar yang luar biasa.",
    date: "May 20, 2025",
    category: "Self-Development",
    slug: "kunci-semangat-belajar-mahasiswa",
    author: "Naufal",
  },
      {
    id: 4,
    title: "Cara Kerja Tes Kepribadian Online",
    excerpt: "Mengupas proses di balik layar tes MBTI dan kepribadian online",
    date: "May 22, 2025",
    category: "Technology",
    slug: "cara-kerja-tes-kepribadian",
    author: "Naufal",
  },
]

// Categories - derived from blog posts to ensure consistency
const allCategories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))].sort()

// BlogCard component for better organization
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="p-6">
        <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20 border-none">{post.category}</Badge>
        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            by {post.author || "Anonymous"} • {post.date}
          </span>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 p-0" asChild>
            <Link href={`/blog/${post.slug}`} className="flex items-center">
              Read Summary <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  // Filter posts based on search query and active category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = activeCategory === "All" || post.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value)
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">
            Book Summaries
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Book Summary Blog</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6" aria-hidden="true"></div>
          <p className="text-lg text-gray-700 mb-8">
            Concise summaries of the best books on psychology, self-improvement, and personal growth.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Input
              type="text"
              placeholder="Search book summaries..."
              className="pl-10 border-gray-300 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search book summaries"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </header>

        {/* Categories */}
        <div className="max-w-4xl mx-auto mb-12">
          <Tabs defaultValue="All" value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
            <TabsList className="w-full flex overflow-x-auto pb-2 justify-start md:justify-center">
              {allCategories.map((category) => (
                <TabsTrigger key={category} value={category} className="flex-shrink-0">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory}>
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No posts found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
