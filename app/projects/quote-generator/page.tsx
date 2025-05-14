"use client"

import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Download, RefreshCw, LayoutTemplate, Type, Palette, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const mbtiTemplates = [
  {
    id: "INTJ",
    name: "INTJ - Architect",
    gradient: "from-indigo-950 via-purple-900 to-slate-900",
    textColor: "text-white",
    accent: "border-indigo-400",
    description: "Strategic, independent, analytical",
  },
  {
    id: "INTP",
    name: "INTP - Logician",
    gradient: "from-cyan-900 via-blue-800 to-slate-800",
    textColor: "text-white",
    accent: "border-cyan-400",
    description: "Logical, innovative, abstract",
  },
  {
    id: "ENTJ",
    name: "ENTJ - Commander",
    gradient: "from-red-900 via-purple-900 to-amber-800",
    textColor: "text-white",
    accent: "border-red-400",
    description: "Decisive, efficient, strategic",
  },
  {
    id: "ENTP",
    name: "ENTP - Debater",
    gradient: "from-orange-600 via-red-600 to-yellow-600",
    textColor: "text-white",
    accent: "border-orange-400",
    description: "Innovative, argumentative, curious",
  },
  {
    id: "INFJ",
    name: "INFJ - Advocate",
    gradient: "from-teal-800 via-purple-800 to-emerald-900",
    textColor: "text-white",
    accent: "border-teal-400",
    description: "Insightful, principled, complex",
  },
  {
    id: "INFP",
    name: "INFP - Mediator",
    gradient: "from-sky-700 via-indigo-600 to-violet-700",
    textColor: "text-white",
    accent: "border-sky-400",
    description: "Idealistic, compassionate, creative",
  },
  {
    id: "ENFJ",
    name: "ENFJ - Protagonist",
    gradient: "from-rose-700 via-purple-600 to-pink-700",
    textColor: "text-white",
    accent: "border-rose-400",
    description: "Charismatic, inspiring, empathetic",
  },
  {
    id: "ENFP",
    name: "ENFP - Campaigner",
    gradient: "from-yellow-500 via-orange-500 to-pink-500",
    textColor: "text-white",
    accent: "border-yellow-400",
    description: "Enthusiastic, creative, sociable",
  },
  {
    id: "ISTJ",
    name: "ISTJ - Logistician",
    gradient: "from-slate-900 via-gray-800 to-blue-900",
    textColor: "text-white",
    accent: "border-slate-400",
    description: "Practical, reliable, systematic",
  },
  {
    id: "ISFJ",
    name: "ISFJ - Defender",
    gradient: "from-emerald-800 via-blue-700 to-teal-800",
    textColor: "text-white",
    accent: "border-emerald-400",
    description: "Protective, dedicated, observant",
  },
  {
    id: "ESTJ",
    name: "ESTJ - Executive",
    gradient: "from-blue-900 via-red-900 to-emerald-900",
    textColor: "text-white",
    accent: "border-blue-400",
    description: "Organized, practical, traditional",
  },
  {
    id: "ESFJ",
    name: "ESFJ - Consul",
    gradient: "from-green-700 via-amber-600 to-emerald-700",
    textColor: "text-white",
    accent: "border-green-400",
    description: "Supportive, social, organized",
  },
  {
    id: "ISTP",
    name: "ISTP - Virtuoso",
    gradient: "from-zinc-900 via-slate-800 to-neutral-800",
    textColor: "text-white",
    accent: "border-zinc-400",
    description: "Practical, logical, spontaneous",
  },
  {
    id: "ISFP",
    name: "ISFP - Adventurer",
    gradient: "from-pink-700 via-purple-600 to-rose-600",
    textColor: "text-white",
    accent: "border-pink-400",
    description: "Artistic, sensitive, exploratory",
  },
  {
    id: "ESTP",
    name: "ESTP - Entrepreneur",
    gradient: "from-amber-600 via-red-700 to-orange-600",
    textColor: "text-white",
    accent: "border-amber-400",
    description: "Energetic, practical, spontaneous",
  },
  {
    id: "ESFP",
    name: "ESFP - Entertainer",
    gradient: "from-pink-500 via-yellow-500 to-orange-500",
    textColor: "text-white",
    accent: "border-pink-400",
    description: "Enthusiastic, spontaneous, fun-loving",
  },
]

const cardLayouts = [
  { id: "square", name: "Square", aspectRatio: "aspect-square", className: "flex flex-col" },
  { id: "horizontal", name: "Horizontal", aspectRatio: "aspect-[7/3] min-h-[240px]", className: "flex flex-col" },
]


export default function QuoteCardGenerator() {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("INFJ")
  const [selectedLayout, setSelectedLayout] = useState("square")
  const [cardTitle, setCardTitle] = useState("My Quote Card")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()
  const cardRef = useRef<HTMLDivElement>(null)

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const template = mbtiTemplates.find((t) => t.id === selectedTemplate) || mbtiTemplates[0]
  const layout = cardLayouts.find((l) => l.id === selectedLayout) || cardLayouts[0]

  const handleDownload = async () => {
    if (!quote.trim() || !author.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both a quote and an author name.",
        variant: "destructive",
      })
      return
    }

    if (cardRef.current) {
      try {
        setIsGenerating(true)

        const dataUrl = await toPng(cardRef.current, {
          quality: 1,
          pixelRatio: 2,
          skipFonts: false,
        })

        const link = document.createElement("a")
        link.download = `${selectedTemplate}-${selectedLayout}-quote-card.png`
        link.href = dataUrl
        link.click()

        toast({
          title: "Success!",
          description: "Your quote card has been downloaded.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate image. Please try again.",
          variant: "destructive",
        })
        console.error("Error generating image:", error)
      } finally {
        setIsGenerating(false)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">MBTI Quote Card Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Quote Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="content" className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <span className="hidden sm:inline">Content</span>
                  </TabsTrigger>
                  <TabsTrigger value="template" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Template</span>
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="flex items-center gap-2">
                    <LayoutTemplate className="h-4 w-4" />
                    <span className="hidden sm:inline">Layout</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-title">Card Title</Label>
                    <Input
                      id="card-title"
                      value={cardTitle}
                      onChange={(e) => setCardTitle(e.target.value)}
                      placeholder="My Quote Card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quote">Your Quote</Label>
                    <Textarea
                      id="quote"
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Enter your quote here..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author name"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="template" className="space-y-4">
                  <Label>MBTI Template</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto p-2">
                    {mbtiTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={cn(
                          "cursor-pointer rounded-md overflow-hidden h-28 flex flex-col border-2 transition-all",
                          selectedTemplate === template.id ? template.accent : "border-transparent",
                          selectedTemplate === template.id ? "ring-2 ring-offset-2" : "",
                        )}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div
                          className={cn(
                            "flex-1 bg-gradient-to-br w-full h-full flex items-center justify-center",
                            template.gradient,
                          )}
                        >
                          <span className={cn("text-sm font-bold", template.textColor)}>{template.id}</span>
                        </div>
                        <div className="bg-background py-1 px-2">
                          <div className="text-center text-xs font-medium">{template.name.split(" - ")[1]}</div>
                          <div className="text-center text-[10px] text-muted-foreground truncate">
                            {template.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="space-y-4">
                  <Label>Card Layout</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {cardLayouts.map((layout) => (
                      <div
                        key={layout.id}
                        className={cn(
                          "cursor-pointer rounded-md overflow-hidden border-2 transition-all",
                          selectedLayout === layout.id ? "border-primary ring-2 ring-offset-2" : "border-muted",
                        )}
                        onClick={() => setSelectedLayout(layout.id)}
                      >
                        <div className={cn("bg-muted w-full flex items-center justify-center p-2", layout.aspectRatio)}>
                          <div className="bg-background border border-border w-full h-full flex items-center justify-center">
                            <span className="text-xs font-medium">{layout.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleDownload}
                disabled={isGenerating || !quote.trim() || !author.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download as PNG
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="relative w-full overflow-hidden">
            <div
              ref={cardRef}
              data-layout={selectedLayout}
              className={cn(
                "w-full rounded-lg overflow-hidden bg-gradient-to-br shadow-lg",
                layout.aspectRatio,
                layout.className,
                template.gradient,
              )}
            >
              <div
                className={cn(
                  "p-5 sm:p-6 border-b border-white/20",
                  selectedLayout === "horizontal" ? "flex justify-between items-center" : "",
                )}
              >
                <h3 className={cn("text-lg sm:text-xl font-bold", template.textColor)}>
                  {cardTitle || "My Quote Card"}
                </h3>
                <p className={cn("text-xs sm:text-sm opacity-80", template.textColor)}>{currentDate}</p>
              </div>

              <div
                className={cn(
                  "flex-1 flex flex-col justify-center",
                  selectedLayout === "square" ? "p-6 sm:p-8" : "p-5 sm:p-6",
                )}
              >
                {quote ? (
                  <p
                    className={cn(
                      "mb-4 leading-relaxed whitespace-pre-line",
                      template.textColor,
                      selectedLayout === "square" ? "text-base sm:text-xl" : "text-sm sm:text-base",
                      selectedLayout === "horizontal" ? "text-center max-w-3xl mx-auto" : "",
                    )}
                  >
                    "{quote}"
                  </p>
                ) : (
                  <p
                    className={cn(
                      "mb-4 italic opacity-70",
                      template.textColor,
                      selectedLayout === "square" ? "text-base sm:text-xl" : "text-sm sm:text-base",
                      selectedLayout === "horizontal" ? "text-center max-w-3xl mx-auto" : "",
                    )}
                  >
                    "Your quote will appear here..."
                  </p>
                )}

                {author ? (
                  <p
                    className={cn(
                      "font-semibold",
                      template.textColor,
                      selectedLayout === "horizontal" ? "text-center" : "text-right",
                    )}
                  >
                    — {author}
                  </p>
                ) : (
                  <p
                    className={cn(
                      "italic opacity-70",
                      template.textColor,
                      selectedLayout === "horizontal" ? "text-center" : "text-right",
                    )}
                  >
                    — Author name
                  </p>
                )}
              </div>

              <div
                className={cn(
                  "border-t border-white/20 flex justify-between items-center",
                  selectedLayout === "square" ? "p-5 sm:p-6 mt-auto" : "p-4 sm:p-5 mt-auto",
                  selectedLayout === "horizontal" ? "text-xs" : "",
                )}
              >
                <div className={cn("flex items-center text-xs sm:text-sm", template.textColor)}>
                  <span>Made by {selectedTemplate}</span>
                </div>
                <p className={cn("flex items-center text-xs sm:text-sm", template.textColor)}>
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>Generated with purpose</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-1">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
