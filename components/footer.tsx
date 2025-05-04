import Link from "next/link"
import { Facebook, MessageCircle, Send, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-700">© {new Date().getFullYear()} Naufalicious. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full text-primary border-primary hover:bg-primary/10"
              asChild
            >
              <Link
                href="https://facebook.com/arpharazons"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full text-secondary border-secondary hover:bg-secondary/10"
              asChild
            >
              <Link href="https://quora.com/naufal-221" target="_blank" rel="noopener noreferrer" aria-label="Quora">
                <BookOpen className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full text-green-600 border-green-600 hover:bg-green-600/10"
              asChild
            >
              <Link href="https://wa.me/087847409803" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full text-accent border-accent hover:bg-accent/10"
              asChild
            >
              <Link href="https://t.me/Emirnawfal" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <Send className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
