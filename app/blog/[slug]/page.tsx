import type React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, BookOpen, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Types for better type safety
interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
  author: string
  readTime?: string
  content: string
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
    author: "Rifa",
    readTime: "8 min read",
    content: `
      <h2>1. Harmonic Groups</h2>
      <ul>
        <li><strong>Competency (1, 3, 5):</strong></li>
        <li><strong>Positive Outlook (2, 7, 9):</strong></li>
        <li><strong>Reactive (4, 6, 8):</strong></li>
      </ul>

      <h2>2. Hornevian Groups</h2>
      <ul>
        <li><strong>Compliant (1, 2, 6):</strong></li>
        <li><strong>Assertive (3, 7, 8):</strong></li>
        <li><strong>Withdrawn (4, 5, 9):</strong></li>
      </ul>

      <h2>3. Object Relations</h2>
      <ul>
        <li><strong>Frustration (1, 4, 7):</strong></li>
        <li><strong>Rejection (2, 5, 8):</strong></li>
        <li><strong>Attachment (3, 6, 9):</strong></li>
      </ul>

      <h2>Kombinasi masing-masing tipe Enneagram berdasarkan 3 jenis pengelompokkan enneagram dari Harmonic, Hornevian dan Objek Relasi secara berturut-turut</h2>
      <ul>
        <li><strong>Tipe 1:</strong> Competency, Compliant, Frustration</li>
        <li><strong>Tipe 2:</strong> Positive Outlook, Compliant, Rejection</li>
        <li><strong>Tipe 3:</strong> Competency, Assertive, Attachment</li>
        <li><strong>Tipe 4:</strong> Reactive, Withdrawn, Frustration</li>
        <li><strong>Tipe 5:</strong> Competency, Withdrawn, Rejection</li>
        <li><strong>Tipe 6:</strong> Reactive, Compliant, Attachment</li>
        <li><strong>Tipe 7:</strong> Positive Outlook, Assertive, Frustration</li>
        <li><strong>Tipe 8:</strong> Reactive, Assertive, Rejection</li>
        <li><strong>Tipe 9:</strong> Positive Outlook, Withdrawn, Attachment</li>
      </ul>
      
     <h2>Garis besar dari masing-masing istilah diatas</h2>
     <h3>Harmonic </h3>
     <ul>
        <li><strong>Competency (1, 3, 5):</strong> Kompeten, Bertanggungjawab. </li>
        <li><strong>Positive Outlook (2, 7, 9):</strong> Positif thinking adalah jalan ninjaku, sering optimis dan ceria.</li>
        <li><strong>Reactive (4, 6, 8):</strong> Reaktif, cepat tanggap. </li>
      </ul>
      <h3>Hornevian </h3>
     <ul>
        <li><strong>Compliant (1, 2, 6):</strong> Setia, Loyalist.</li>
        <li><strong>Assertive (3, 7, 8):</strong> Tegas, To the point. </li>
        <li><strong>Withdrawn (4, 5, 9):</strong> Menjauhi sosial, fokus ke dunianya sendiri.</li>
      </ul>
      <h3>Objek Relasi  </h3>
      <ul>
        <li><strong>Frustration (1, 4, 7):</strong> Idealis, Perfeksionis </li>
        <li><strong>Rejection (2, 5, 8):</strong> Mandiri, Tidak suka ketergantungan, merasa dirinya bisa selalu </li>
        <li><strong>Attachment (3, 6, 9):</strong> Ketergantungan, mudah bucin</li>
      </ul>
      
      <hr />
      <p><strong>Referensi:</strong></p>
      <ol>
        <li><a href="https://enneagramexplained.com/enneagram-harmonic-groups/" target="_blank">Harmonic Groups</a></li>
        <li><a href="https://enneagramexplained.com/enneagram-hornevian-groups/" target="_blank">Hornevian Groups</a></li>
        <li><a href="https://notmytypeenneagram.com/object-relations" target="_blank">Object Relations</a></li>
        <li><a href="https://docs.google.com/presentation/d/1b8cY9G8uLvz8z7adz3xUBLHsySpOQxblBtN9TM9Q150/edit?usp=drivesdk" target="_blank">Slide Kombinasi</a></li>
      </ol>
    `,
  },
  {
  id: 2,
  title: "Flowchart Tujuan Hidup: Panduan Singkat Menemukan Arah",
  excerpt: "Cara praktis menyusun flowchart tujuan hidup agar lebih terarah dan bermakna.",
  date: "May 19, 2025",
  category: "Self-Improvement",
  slug: "flowchart-tujuan-hidup",
  author: "Naufalicious",
  readTime: "3 min read",
  content: `
    <h2>Mengapa Flowchart Tujuan Hidup?</h2>
    <p>Flowchart adalah cara visual untuk merancang arah hidup secara sistematis. Ini membantu kita keluar dari lingkaran overthinking dan mulai melangkah dengan sadar.</p>

    <h2>Langkah Membuat Flowchart Tujuan Hidup</h2>
    <ol>
      <li><strong>Tentukan Nilai Utama:</strong> Apa yang paling penting dalam hidupmu? (Contoh: Keluarga, Iman, Keadilan)</li>
      <li><strong>Pilih Visi Besar:</strong> Hidup seperti apa yang ingin kamu bangun? (Contoh: Menjadi guru yang menginspirasi)</li>
      <li><strong>Turunkan ke Misi Spesifik:</strong> Apa yang harus kamu lakukan untuk mewujudkannya? (Contoh: Lulus kuliah, jadi relawan, ikut pelatihan)</li>
      <li><strong>Buat Keputusan Cabang:</strong> Jika A gagal, maka lakukan B. Buat skenario.</li>
      <li><strong>Evaluasi & Adaptasi:</strong> Revisi tiap 6 bulan. Hidup dinamis, arah bisa menyesuaikan tanpa kehilangan kompas.</li>
    </ol>

    <h2>Tips Visual</h2>
    <ul>
      <li>Gunakan <em>shape</em> berbeda: lingkaran untuk nilai, kotak untuk aksi, belah ketupat untuk keputusan.</li>
      <li>Panah menunjukkan alur. Jangan buat terlalu rumit, cukup logis dan mudah dipahami dirimu sendiri.</li>
    </ul>

    <h2>Penutup</h2>
    <p>Flowchart tujuan hidup bukan peta mutlak, tapi kompas sadar. Tanpa arah, langkah kita hanya reaksi. Dengan arah, hidup menjadi keputusan.</p>
  `,
},

]

// Utility function to calculate estimated reading time
function getReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readTime} min read`
}

// Component for post metadata
function PostMetadata({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      {icon}
      <span className="ml-1">{children}</span>
    </div>
  )
}

// Component for the article slug/URL display
function ArticleSlug({ slug }: { slug: string }) {
  return (
    <div className="mb-4 mt-2">
      <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
        <span className="text-sm font-mono text-gray-500 dark:text-gray-400 select-all">blog/{slug}</span>
      </div>
    </div>
  )
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the post by slug
  const post = blogPosts.find((post) => post.slug === params.slug)

  // If post doesn't exist, return 404
  if (!post) {
    notFound()
  }

  // Calculate read time if not provided
  const readTime = post.readTime || getReadTime(post.content)

  return (
    <article className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Button variant="ghost" className="text-primary hover:text-primary/90 p-0" asChild>
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
          </div>

          {/* Display the slug in a visually appealing way */}
          <ArticleSlug slug={post.slug} />

          {/* Post header */}
          <header className="mb-10">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-5">
              <PostMetadata icon={<Calendar className="h-4 w-4 mr-1" />}>{post.date}</PostMetadata>
              <PostMetadata icon={<BookOpen className="h-4 w-4 mr-1" />}>{readTime}</PostMetadata>
              <PostMetadata icon={<User className="h-4 w-4 mr-1" />}>{post.author}</PostMetadata>
            </div>
          </header>

          {/* Post content with enhanced typography */}
          <div className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-semibold prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-strong:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-li:leading-relaxed prose-hr:border-gray-200">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Share section */}
          <div className="mt-16 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Share this post</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" aria-label="Share on Twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on Facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" aria-label="Copy link">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}
