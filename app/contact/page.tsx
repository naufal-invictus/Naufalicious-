import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Facebook, MessageCircle, Send, BookOpen } from "lucide-react"

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Get in Touch</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Contact Information</CardTitle>
              <CardDescription>Reach out to me through these channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-secondary" />
                  <span className="text-gray-700">naufalarpharazon@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-secondary" />
                  <span className="text-gray-700">+62 878-4740-9803</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-secondary" />
                  <span className="text-gray-700">West Java, Indonesia</span>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium text-primary mb-3">Social Media</h3>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full text-primary border-primary hover:bg-primary/10"
                      asChild
                    >
                      <a
                        href="https://facebook.com/arpharazons"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full text-secondary border-secondary hover:bg-secondary/10"
                      asChild
                    >
                      <a href="https://quora.com/naufal-221" target="_blank" rel="noopener noreferrer" aria-label="Quora">
                        <BookOpen className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full text-green-600 border-green-600 hover:bg-green-600/10"
                      asChild
                    >
                      <a
                        href="https://wa.me/6287847409803"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                      >
                        <MessageCircle className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full text-accent border-accent hover:bg-accent/10"
                      asChild
                    >
                      <a href="https://t.me/Emirnawfal" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                        <Send className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  )
}
