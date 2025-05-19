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
    title: "Atomic Habits by James Clear",
    excerpt: "A comprehensive summary of how small changes can lead to remarkable results.",
    date: "May 2, 2025",
    category: "Self-Improvement",
    slug: "atomic-habits",
    author: "Naufalicious",
    readTime: "5 min read",
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
  {
    id: 2,
    title: "Mengenal Pengelompokkan Enneagram: Harmonic, Hornevian, dan Objek Relasi",
    excerpt: "Pemetaan kepribadian dari tiga perspektif yang menyibak pola tersembunyi dalam dinamika Enneagram.",
    date: "May 19, 2025",
    category: "Psychology",
    slug: "pengelompokkan-enneagram",
    author: "Rifa",
    readTime: "8 min read",
    content: `
      <h2>Pendahuluan</h2>
      <p>Enneagram bukan hanya sekadar sembilan tipe kepribadian. Ia adalah peta kompleks yang memiliki lapisan-lapisan dalam. Tiga di antaranya—<em>Harmonic Groups</em>, <em>Hornevian Groups</em>, dan <em>Object Relations</em>—memberikan dimensi tambahan yang membantu kita memahami bagaimana masing-masing tipe berinteraksi dengan konflik, orang lain, dan kebutuhan batin mereka.</p>

      <h2>1. Harmonic Groups</h2>
      <p><strong>Bagaimana tipe kepribadian menghadapi konflik dan masalah hidup.</strong></p>
      <ul>
        <li><strong>Competency (1, 3, 5):</strong> Fokus pada logika dan tanggung jawab. Cenderung mengandalkan kecakapan dan standar pribadi.</li>
        <li><strong>Positive Outlook (2, 7, 9):</strong> Mengandalkan optimisme dan harapan. Emosi negatif cenderung dihindari atau diredam.</li>
        <li><strong>Reactive (4, 6, 8):</strong> Sangat responsif terhadap ketegangan dan konflik. Ekspresif, kadang konfrontatif.</li>
      </ul>

      <h2>2. Hornevian Groups</h2>
      <p><strong>Bagaimana tipe-tipe mencari perhatian atau pemenuhan sosial.</strong></p>
      <ul>
        <li><strong>Compliant (1, 2, 6):</strong> Ingin diterima melalui kesesuaian dengan otoritas atau norma. Loyal dan taat.</li>
        <li><strong>Assertive (3, 7, 8):</strong> Menuntut tempatnya di dunia. Tegas, mandiri, dan seringkali dominan.</li>
        <li><strong>Withdrawn (4, 5, 9):</strong> Menarik diri ke dalam. Reflektif, mandiri, dan kadang terasing.</li>
      </ul>

      <h2>3. Object Relations</h2>
      <p><strong>Pola hubungan bawah sadar yang dibentuk sejak kecil.</strong></p>
      <ul>
        <li><strong>Frustration (1, 4, 7):</strong> Mengejar ideal yang sering tidak terpenuhi. Kekecewaan mendalam atas ketidaksempurnaan dunia.</li>
        <li><strong>Rejection (2, 5, 8):</strong> Menghindari ketergantungan. Percaya bahwa cinta harus diperoleh, bukan diberikan tanpa syarat.</li>
        <li><strong>Attachment (3, 6, 9):</strong> Merindukan keterikatan emosional. Mudah membaur, tetapi rentan kehilangan identitas sendiri.</li>
      </ul>

      <h2>Kombinasi Unik Setiap Tipe</h2>
      <p>Dengan menyatukan ketiga kategori di atas, setiap tipe memiliki kombinasi khas yang memperkaya pemahaman kita terhadapnya.</p>
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

      <h2>Penutup</h2>
      <p>Jika kita selama ini melihat Enneagram hanya dari satu dimensi, maka ketiga klasifikasi ini bagaikan prisma yang membelokkan cahaya menjadi spektrum warna. Mereka menantang kita untuk tidak puas hanya dengan label "tipe", tapi menelusuri bagaimana kita bereaksi, menjalin hubungan, dan bertumbuh. Maka, pertanyaannya: apakah kita cukup jujur pada diri sendiri untuk mengenali pola kita sendiri?</p>

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
    id: 3,
    title: "Understanding MBTI: The 16 Personality Types Explained",
    excerpt:
      "A deep dive into the Myers-Briggs Type Indicator and how it can help you understand yourself and others better.",
    date: "April 10, 2025",
    category: "Psychology",
    slug: "understanding-mbti",
    author: "Sarah",
    readTime: "7 min read",
    content: `
      <h2>Introduction to MBTI</h2>
      <p>The Myers-Briggs Type Indicator (MBTI) is one of the most widely used personality assessments in the world. Developed by Isabel Briggs Myers and her mother, Katharine Briggs, based on Carl Jung's theory of psychological types, the MBTI categorizes people into 16 distinct personality types based on four dichotomies.</p>
      
      <h2>The Four Dichotomies</h2>
      
      <h3>1. Extraversion (E) vs. Introversion (I)</h3>
      <p>This dimension reflects where you focus your attention and get your energy:</p>
      <ul>
        <li><strong>Extraversion (E):</strong> Focus on the outer world of people and activities. Energized by social interaction.</li>
        <li><strong>Introversion (I):</strong> Focus on the inner world of ideas and impressions. Energized by quiet reflection and time alone.</li>
      </ul>
      
      <h3>2. Sensing (S) vs. Intuition (N)</h3>
      <p>This dimension describes how you take in information:</p>
      <ul>
        <li><strong>Sensing (S):</strong> Focus on concrete, tangible facts and details that can be observed directly.</li>
        <li><strong>Intuition (N):</strong> Focus on patterns, possibilities, and meanings beyond the immediate data.</li>
      </ul>
      
      <h3>3. Thinking (T) vs. Feeling (F)</h3>
      <p>This dimension reflects how you make decisions:</p>
      <ul>
        <li><strong>Thinking (T):</strong> Base decisions on logical analysis, consistency, and objective criteria.</li>
        <li><strong>Feeling (F):</strong> Base decisions on personal values and how actions affect others.</li>
      </ul>
      
      <h3>4. Judging (J) vs. Perceiving (P)</h3>
      <p>This dimension describes how you orient to the external world:</p>
      <ul>
        <li><strong>Judging (J):</strong> Prefer structure, planning, and resolving matters definitively.</li>
        <li><strong>Perceiving (P):</strong> Prefer flexibility, spontaneity, and keeping options open.</li>
      </ul>
      
      <h2>The 16 MBTI Personality Types</h2>
      
      <h3>Analysts (NT)</h3>
      <ul>
        <li><strong>INTJ:</strong> The Architect - Strategic, innovative, and driven by a vision for improvement.</li>
        <li><strong>INTP:</strong> The Logician - Inventive, logical, and fascinated by theoretical possibilities.</li>
        <li><strong>ENTJ:</strong> The Commander - Decisive, efficient, and natural leaders who implement vision.</li>
        <li><strong>ENTP:</strong> The Debater - Quick-thinking, curious, and intellectually versatile.</li>
      </ul>
      
      <h3>Diplomats (NF)</h3>
      <ul>
        <li><strong>INFJ:</strong> The Advocate - Idealistic, principled, and driven to help others.</li>
        <li><strong>INFP:</strong> The Mediator - Compassionate, creative, and guided by strong personal values.</li>
        <li><strong>ENFJ:</strong> The Protagonist - Charismatic, empathetic, and natural mentors.</li>
        <li><strong>ENFP:</strong> The Campaigner - Enthusiastic, creative, and people-centered.</li>
      </ul>
      
      <h3>Sentinels (SJ)</h3>
      <ul>
        <li><strong>ISTJ:</strong> The Logistician - Practical, fact-minded, and reliable.</li>
        <li><strong>ISFJ:</strong> The Defender - Dedicated, warm, and protective of loved ones.</li>
        <li><strong>ESTJ:</strong> The Executive - Efficient, outspoken, and traditional.</li>
        <li><strong>ESFJ:</strong> The Consul - Caring, social, and harmony-seeking.</li>
      </ul>
      
      <h3>Explorers (SP)</h3>
      <ul>
        <li><strong>ISTP:</strong> The Virtuoso - Bold, practical, and hands-on problem solvers.</li>
        <li><strong>ISFP:</strong> The Adventurer - Flexible, charming, and artistic.</li>
        <li><strong>ESTP:</strong> The Entrepreneur - Energetic, perceptive, and risk-takers.</li>
        <li><strong>ESFP:</strong> The Entertainer - Spontaneous, energetic, and enthusiastic.</li>
      </ul>
      
      <h2>Applications of MBTI</h2>
      <p>The MBTI is widely used in various contexts:</p>
      <ul>
        <li><strong>Personal Development:</strong> Understanding your preferences can help you leverage strengths and develop areas of growth.</li>
        <li><strong>Career Guidance:</strong> Different types tend to thrive in different work environments and roles.</li>
        <li><strong>Team Building:</strong> Understanding type differences can improve communication and collaboration.</li>
        <li><strong>Relationship Dynamics:</strong> Recognizing how different types interact can enhance personal and professional relationships.</li>
      </ul>
      
      <h2>Limitations and Criticisms</h2>
      <p>While the MBTI is popular, it has limitations:</p>
      <ul>
        <li>It measures preferences, not abilities or skills.</li>
        <li>The dichotomous nature (either/or) doesn't capture the complexity of human personality.</li>
        <li>Some psychologists question its scientific validity and reliability.</li>
        <li>Type can be influenced by context and may change over time.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The MBTI provides a useful framework for understanding differences in how people perceive the world and make decisions. When used as a tool for self-reflection and appreciating diversity rather than as a rigid categorization system, it can offer valuable insights into personality dynamics and interpersonal relationships.</p>
      
      <hr />
      <p><strong>References:</strong></p>
      <ol>
        <li>Myers, I. B., & Myers, P. B. (1995). Gifts Differing: Understanding Personality Type.</li>
        <li>The Myers & Briggs Foundation - <a href="https://www.myersbriggs.org" target="_blank">myersbriggs.org</a></li>
        <li>Quenk, N. L. (2009). Essentials of Myers-Briggs Type Indicator Assessment.</li>
      </ol>
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
          <div className="mb-8">
            <Button variant="ghost" className="text-primary hover:text-primary/90 p-0" asChild>
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
          </div>

          {/* Post header */}
          <header className="mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-4">
              <PostMetadata icon={<Calendar className="h-4 w-4 mr-1" />}>{post.date}</PostMetadata>
              <PostMetadata icon={<BookOpen className="h-4 w-4 mr-1" />}>{readTime}</PostMetadata>
              <PostMetadata icon={<User className="h-4 w-4 mr-1" />}>{post.author}</PostMetadata>
            </div>
          </header>

          {/* Post content */}
          <div className="prose max-w-none prose-blue prose-headings:text-primary prose-a:text-secondary">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Share section */}
          <div className="mt-12 pt-6 border-t border-gray-200">
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
