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
    date: "May 2, 2025",
    category: "Self-Improvement",
    slug: "atomic-habits",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Naufalicious",
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
  image: "/placeholder.svg?height=600&width=1200",
  author: "Rifa",
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
  `
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


        </div>
      </div>
    </div>
  )
}
