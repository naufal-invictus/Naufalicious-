import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-extrabold text-red-600 mb-4 animate-bounce">404 Braincell Not Found</h1>
      <p className="text-gray-500 italic mb-6">
        The universe has misplaced the blog post you're looking for. Or maybe it's hiding.
      </p>
      <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mb-6">
        <code className="text-sm">
          ERROR CODE: BLOG_404_FATAL<br/>
          MESSAGE: "You seem lost, mortal. Did you try turning your brain off and on again?"
        </code>
      </div>
      <Button asChild>
        <Link href="/blog" className="hover:underline">
          🌀 Take me back before I embarrass myself further
        </Link>
      </Button>
    </div>
  )
}
