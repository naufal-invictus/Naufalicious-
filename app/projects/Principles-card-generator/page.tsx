"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import {
  Download,
  RefreshCw,
  LayoutTemplate,
  Type,
  Palette,
  Skull,
  Flame,
  Shield,
  Swords,
  Hammer,
  Droplets,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

// Komponen FontLoader tetap sama
const FontLoader = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Muat font kustom
    const fontLinks = [
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
      "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap",
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&display=swap",
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;800&display=swap",
      "https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap",
      "https://fonts.googleapis.com/css2?family=Teko:wght@500;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Russo+One&display=swap",
    ]

    const links: HTMLLinkElement[] = []

    fontLinks.forEach((href) => {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = href
      document.head.appendChild(link)
      links.push(link)
    })

    // Tambahkan kelas font kustom ke dokumen
    const style = document.createElement("style")
    style.textContent = `
      .font-bebas { font-family: 'Bebas Neue', sans-serif; }
      .font-marker { font-family: 'Permanent Marker', cursive; }
      .font-cinzel { font-family: 'Cinzel', serif; }
      .font-orbitron { font-family: 'Orbitron', sans-serif; }
      .font-blackops { font-family: 'Black Ops One', cursive; }
      .font-teko { font-family: 'Teko', sans-serif; }
      .font-russo { font-family: 'Russo One', sans-serif; }
    `
    document.head.appendChild(style)

    return () => {
      links.forEach((link) => link.remove())
      style.remove()
    }
  }, [])

  return <>{children}</>
}

// Template desain tetap sama
const designTemplates = [
  {
    id: "warlord",
    name: "Warlord",
    gradient: "from-red-950 via-red-900 to-black",
    textColor: "text-red-50",
    accent: "border-red-600",
    description: "Brutal, commanding, and uncompromising",
    icon: <Swords className="h-6 w-6 text-red-500" />,
    borderStyle: "border-t-4 border-red-600",
    numberStyle: "text-red-600 font-bold",
  },
  {
    id: "cyber",
    name: "Cyberpunk",
    gradient: "from-cyan-950 via-purple-900 to-black",
    textColor: "text-cyan-50",
    accent: "border-cyan-400",
    description: "Digital, futuristic, and rebellious",
    icon: <Skull className="h-6 w-6 text-cyan-400" />,
    borderStyle: "border-l-4 border-cyan-400",
    numberStyle: "text-cyan-400 font-bold",
  },
  {
    id: "inferno",
    name: "Inferno",
    gradient: "from-orange-950 via-amber-900 to-red-950",
    textColor: "text-orange-50",
    accent: "border-orange-500",
    description: "Fiery, intense, and unstoppable",
    icon: <Flame className="h-6 w-6 text-orange-500" />,
    borderStyle: "border-b-4 border-orange-500",
    numberStyle: "text-orange-500 font-bold",
  },
  {
    id: "shadow",
    name: "Shadow",
    gradient: "from-zinc-950 via-zinc-900 to-black",
    textColor: "text-zinc-200",
    accent: "border-zinc-500",
    description: "Stealthy, mysterious, and unforgiving",
    icon: <Shield className="h-6 w-6 text-zinc-400" />,
    borderStyle: "border-r-4 border-zinc-500",
    numberStyle: "text-zinc-400 font-bold",
  },
  {
    id: "forge",
    name: "Forge",
    gradient: "from-stone-950 via-amber-950 to-stone-900",
    textColor: "text-amber-100",
    accent: "border-amber-600",
    description: "Forged in fire, hardened by struggle",
    icon: <Hammer className="h-6 w-6 text-amber-600" />,
    borderStyle: "border-y-4 border-amber-600",
    numberStyle: "text-amber-600 font-bold",
  },
]

// Opsi font tetap sama
const fontOptions = [
  { id: "bebas", name: "Bebas Neue", fontFamily: "font-bebas" },
  { id: "marker", name: "Marker", fontFamily: "font-marker" },
  { id: "cinzel", name: "Cinzel", fontFamily: "font-cinzel" },
  { id: "orbitron", name: "Orbitron", fontFamily: "font-orbitron" },
  { id: "blackops", name: "Black Ops", fontFamily: "font-blackops" },
  { id: "teko", name: "Teko", fontFamily: "font-teko" },
  { id: "russo", name: "Russo One", fontFamily: "font-russo" },
  { id: "mono", name: "Monospace", fontFamily: "font-mono" },
]

// Layout kartu tetap sama
const cardLayouts = [
  {
    id: "manifesto",
    name: "Manifesto",
    aspectRatio: "aspect-[3/4]",
    className: "flex flex-col",
  },
  {
    id: "creed",
    name: "Creed",
    aspectRatio: "aspect-square",
    className: "flex flex-col",
  },
  {
    id: "commandment",
    name: "Commandment",
    aspectRatio: "aspect-[7/3]",
    className: "flex flex-col",
  },
]

// Opsi ukuran tetap sama
const sizeOptions = {
  manifesto: [
    { id: "small", name: "Small", width: 500, height: 667 },
    { id: "medium", name: "Medium", width: 600, height: 800 },
    { id: "large", name: "Large", width: 750, height: 1000 },
    { id: "custom", name: "Custom", width: 600, height: 800 },
  ],
  creed: [
    { id: "small", name: "Small", width: 500, height: 500 },
    { id: "medium", name: "Medium", width: 700, height: 700 },
    { id: "large", name: "Large", width: 900, height: 900 },
    { id: "custom", name: "Custom", width: 700, height: 700 },
  ],
  commandment: [
    { id: "small", name: "Small", width: 700, height: 300 },
    { id: "medium", name: "Medium", width: 900, height: 386 },
    { id: "large", name: "Large", width: 1100, height: 471 },
    { id: "custom", name: "Custom", width: 900, height: 386 },
  ],
}

// Skala ukuran font tetap sama
const fontSizeScales = {
  small: {
    title: "text-2xl",
    principle: "text-lg",
    author: "text-base",
    footer: "text-xs",
    number: "text-xl",
  },
  medium: {
    title: "text-3xl",
    principle: "text-xl",
    author: "text-lg",
    footer: "text-sm",
    number: "text-2xl",
  },
  large: {
    title: "text-4xl",
    principle: "text-2xl",
    author: "text-xl",
    footer: "text-base",
    number: "text-3xl",
  },
  custom: {
    title: "text-3xl",
    principle: "text-xl",
    author: "text-lg",
    footer: "text-sm",
    number: "text-2xl",
  },
}

// Skala padding tetap sama
const paddingScales = {
  small: {
    header: "p-4",
    content: "p-5",
    footer: "p-4",
  },
  medium: {
    header: "p-6",
    content: "p-7",
    footer: "p-6",
  },
  large: {
    header: "p-8",
    content: "p-10",
    footer: "p-8",
  },
  custom: {
    header: "p-6",
    content: "p-7",
    footer: "p-6",
  },
}

export default function PrinciplesGenerator() {
  const [principles, setPrinciples] = useState("")
  const [author, setAuthor] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("warlord")
  const [selectedLayout, setSelectedLayout] = useState("manifesto")
  const [cardTitle, setCardTitle] = useState("MY PRINCIPLES")
  const [isGenerating, setIsGenerating] = useState(false)
  const [footerText, setFooterText] = useState("NO MERCY. NO SURRENDER.")
  const [fontLoaded, setFontLoaded] = useState(false)
  const [displayMode, setDisplayMode] = useState<"single" | "numbered">("numbered")

  // State opsi ukuran tetap sama
  const [selectedSize, setSelectedSize] = useState("medium")
  const [customWidth, setCustomWidth] = useState(600)
  const [customHeight, setCustomHeight] = useState(800)
  const [previewScale, setPreviewScale] = useState(1)

  // State pemilihan font tetap sama
  const [selectedFont, setSelectedFont] = useState("bebas")

  // State content overflow tetap sama
  const [contentOverflow, setContentOverflow] = useState(false)

  const [useCustomColors, setUseCustomColors] = useState(false)
  const [gradientStart, setGradientStart] = useState("#1a0505")
  const [gradientMiddle, setGradientMiddle] = useState("#7a1e1e")
  const [gradientEnd, setGradientEnd] = useState("#000000")
  const [customTextColor, setCustomTextColor] = useState("#ffffff")
  const [customAccentColor, setCustomAccentColor] = useState("#ff4040")

  const { toast } = useToast()
  const cardRef = useRef<HTMLDivElement>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const template = designTemplates.find((t) => t.id === selectedTemplate) || designTemplates[0]
  const layout = cardLayouts.find((l) => l.id === selectedLayout) || cardLayouts[0]
  const font = fontOptions.find((f) => f.id === selectedFont) || fontOptions[0]

  const availableSizes = sizeOptions[selectedLayout as keyof typeof sizeOptions]
  const selectedSizeOption = availableSizes.find((size) => size.id === selectedSize) || availableSizes[1]

  const currentWidth = selectedSize === "custom" ? customWidth : selectedSizeOption.width
  const currentHeight = selectedSize === "custom" ? customHeight : selectedSizeOption.height

  const fontScale = fontSizeScales[selectedSize as keyof typeof fontSizeScales]
  const paddingScale = paddingScales[selectedSize as keyof typeof paddingScales]

  const principlesArray =
    displayMode === "numbered" ? principles.split("\n").filter((line) => line.trim() !== "") : [principles]

  // useEffect untuk memuat font tetap sama
  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      const testFont = async () => {
        try {
          await document.fonts.ready
          setFontLoaded(true)
        } catch (e) {
          console.error("Error loading fonts:", e)
          setFontLoaded(true) // Tetap set true untuk menghindari UI macet
        }
      }
      testFont()
    } else {
      // Fallback untuk browser tanpa font loading API
      const timer = setTimeout(() => {
        setFontLoaded(true)
      }, 1000) // Tunggu 1 detik
      return () => clearTimeout(timer)
    }
  }, [])

  // useEffect untuk skala pratinjau tetap sama
  useEffect(() => {
    const updatePreviewScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.clientWidth
        const cardWidth = currentWidth
        const newScale = Math.min(1, (containerWidth - 40) / cardWidth) // -40 untuk padding
        setPreviewScale(newScale)
      }
    }
    updatePreviewScale()
    window.addEventListener("resize", updatePreviewScale)
    return () => window.removeEventListener("resize", updatePreviewScale)
  }, [currentWidth, selectedLayout, selectedSize])

  // useEffect untuk content overflow tetap sama
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight
        setContentOverflow(isOverflowing)
      }
    }
    checkOverflow() // Cek saat render awal dan perubahan dependensi
    const resizeObserver = new ResizeObserver(checkOverflow)
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }
    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [principles, author, selectedSize, currentWidth, currentHeight, fontScale, displayMode])

  // Fungsi validasi footer text tetap sama
  const validateFooterText = (text: string) => {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length
    const wordLimit = selectedLayout === "creed" ? 6 : 20
    if (wordCount > wordLimit) {
      toast({
        title: `Word limit exceeded`,
        description: `Please limit your footer text to ${wordLimit} words for this layout.`,
        variant: "destructive",
      })
      return false
    }
    return true
  }

  // Fungsi handleLayoutChange tetap sama
  const handleLayoutChange = (newLayout: string) => {
    setSelectedLayout(newLayout)
    setSelectedSize("medium") // Reset ke medium saat ganti layout
    const defaultSize = sizeOptions[newLayout as keyof typeof sizeOptions].find((s) => s.id === "medium")
    if (defaultSize) {
      setCustomWidth(defaultSize.width)
      setCustomHeight(defaultSize.height)
    }
  }

  // Fungsi handleFontChange tetap sama
  const handleFontChange = (fontId: string) => {
    setSelectedFont(fontId)
    const selectedFontOption = fontOptions.find((f) => f.id === fontId)
    if (selectedFontOption) {
      const fontName = selectedFontOption.name
      toast({
        title: `Loading ${fontName} font...`,
        description: "Please wait while we prepare your selected font.",
      })
    }
  }

  const handleDownload = async () => {
    if (!principles.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your principles before downloading.",
        variant: "destructive",
      })
      return
    }

    if (cardRef.current) {
      try {
        setIsGenerating(true)

        // Pastikan font sudah dimuat sebelum membuat gambar
        if (typeof document !== "undefined" && "fonts" in document) {
          await document.fonts.ready
        }

        const dataUrl = await toPng(cardRef.current, {
          pixelRatio: 2, // Meningkatkan resolusi gambar
          width: currentWidth, // Lebar eksplisit untuk gambar keluaran
          height: currentHeight, // Tinggi eksplisit untuk gambar keluaran
          backgroundColor: 'rgba(0,0,0,0)', // Eksplisit transparan, agar gradien kartu yang jadi background
          cacheBust: true, // Untuk menghindari masalah caching
        })

        const link = document.createElement("a")
        link.download = `${selectedTemplate}-${selectedLayout}-principles.png`
        link.href = dataUrl
        link.click()

        toast({
          title: "Success!",
          description: "Your principles have been downloaded.",
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

  // Logika gradient kustom dan styling aktif tetap sama
  const customGradient = `bg-gradient-to-br from-[${gradientStart}] via-[${gradientMiddle}] to-[${gradientEnd}]`
  const customTextColorClass = `text-[${customTextColor}]`
  const customAccentBorder = `border-[${customAccentColor}]`

  const activeGradient = useCustomColors ? customGradient : template.gradient
  const activeTextColor = useCustomColors ? customTextColorClass : template.textColor
  const activeBorderStyle = useCustomColors
    ? `border-${["t", "l", "b", "r", "y", "x"][Math.floor(Math.random() * 6)]}-4 ${customAccentBorder}` // Gaya border kustom acak
    : template.borderStyle


  // JSX (Return statement) tetap sama seperti pada kode asli Anda.
  // Saya hanya menampilkan bagian yang relevan di atas, namun seluruh JSX akan disertakan dalam output.
  return (
    <FontLoader>
      <div className="container mx-auto px-4 py-8 bg-zinc-950 text-zinc-100 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8 font-bebas tracking-wider">PRINCIPLES GENERATOR</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-2xl font-bebas tracking-wider">FORGE YOUR PRINCIPLES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-4 bg-zinc-800">
                    <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-zinc-700">
                      <Type className="h-4 w-4" />
                      <span className="hidden sm:inline">CONTENT</span>
                    </TabsTrigger>
                    <TabsTrigger value="design" className="flex items-center gap-2 data-[state=active]:bg-zinc-700">
                      <Palette className="h-4 w-4" />
                      <span className="hidden sm:inline">DESIGN</span>
                    </TabsTrigger>
                    <TabsTrigger value="colors" className="flex items-center gap-2 data-[state=active]:bg-zinc-700">
                      <Droplets className="h-4 w-4" />
                      <span className="hidden sm:inline">COLORS</span>
                    </TabsTrigger>
                    <TabsTrigger value="layout" className="flex items-center gap-2 data-[state=active]:bg-zinc-700">
                      <LayoutTemplate className="h-4 w-4" />
                      <span className="hidden sm:inline">LAYOUT</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-title">TITLE</Label>
                      <Input
                        id="card-title"
                        value={cardTitle}
                        onChange={(e) => setCardTitle(e.target.value)}
                        placeholder="MY PRINCIPLES"
                        className="bg-zinc-800 border-zinc-700 focus:border-zinc-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="display-mode">DISPLAY MODE</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="single-mode"
                              name="displayMode" // Tambahkan name untuk grup radio yang benar
                              checked={displayMode === "single"}
                              onChange={() => setDisplayMode("single")}
                              className="text-red-600 focus:ring-red-600"
                            />
                            <Label htmlFor="single-mode" className="cursor-pointer text-sm">
                              SINGLE
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="numbered-mode"
                              name="displayMode" // Tambahkan name untuk grup radio yang benar
                              checked={displayMode === "numbered"}
                              onChange={() => setDisplayMode("numbered")}
                              className="text-red-600 focus:ring-red-600"
                            />
                            <Label htmlFor="numbered-mode" className="cursor-pointer text-sm">
                              NUMBERED
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Label htmlFor="principles" className="text-sm text-zinc-400">
                        {displayMode === "numbered" ? "ENTER EACH PRINCIPLE ON A NEW LINE" : "ENTER YOUR PRINCIPLE"}
                      </Label>
                      <Textarea
                        id="principles"
                        value={principles}
                        onChange={(e) => setPrinciples(e.target.value)}
                        placeholder={
                          displayMode === "numbered"
                            ? "NEVER BACK DOWN.\nSHOW NO WEAKNESS.\nTRUST NO ONE."
                            : "STRENGTH THROUGH DISCIPLINE. DISCIPLINE THROUGH WILL. WILL THROUGH POWER."
                        }
                        className="min-h-[150px] bg-zinc-800 border-zinc-700 focus:border-zinc-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author">AUTHOR (OPTIONAL)</Label>
                      <Input
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="YOUR NAME"
                        className="bg-zinc-800 border-zinc-700 focus:border-zinc-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="footer-text">
                        FOOTER TEXT {selectedLayout === "creed" ? "(MAX 6 WORDS)" : "(MAX 20 WORDS)"}
                      </Label>
                      <Input
                        id="footer-text"
                        value={footerText}
                        onChange={(e) => {
                          const newValue = e.target.value
                          if (validateFooterText(newValue)) {
                            setFooterText(newValue)
                          }
                        }}
                        placeholder="NO MERCY. NO SURRENDER."
                        className="bg-zinc-800 border-zinc-700 focus:border-zinc-600"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="design" className="space-y-4">
                    <div className="space-y-2">
                      <Label>DESIGN TEMPLATE</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto p-2">
                        {designTemplates.map((templateItem) => (
                          <div
                            key={templateItem.id}
                            className={cn(
                              "cursor-pointer rounded-md overflow-hidden h-32 flex flex-col border-2 transition-all",
                              selectedTemplate === templateItem.id ? templateItem.accent : "border-transparent",
                              selectedTemplate === templateItem.id ? "ring-2 ring-offset-2 ring-offset-zinc-900 ring-red-600" : "",
                            )}
                            onClick={() => setSelectedTemplate(templateItem.id)}
                          >
                            <div
                              className={cn(
                                "flex-1 bg-gradient-to-br w-full h-full flex flex-col items-center justify-center gap-2",
                                templateItem.gradient,
                              )}
                            >
                              {templateItem.icon}
                              <span className={cn("text-sm font-bold", templateItem.textColor)}>{templateItem.name}</span>
                            </div>
                            <div className="bg-zinc-800 py-1 px-2">
                              <div className="text-center text-[10px] text-zinc-300 truncate">
                                {templateItem.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label>FONT STYLE</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto p-2">
                        {fontOptions.map((fontOption) => (
                          <div
                            key={fontOption.id}
                            className={cn(
                              "cursor-pointer rounded-md overflow-hidden border-2 transition-all",
                              selectedFont === fontOption.id
                                ? "border-red-600 ring-2 ring-offset-2 ring-offset-zinc-900 ring-red-600"
                                : "border-zinc-700",
                            )}
                            onClick={() => handleFontChange(fontOption.id)}
                          >
                            <div className="bg-zinc-800 w-full flex items-center justify-center p-2">
                              <div
                                className={cn(
                                  "bg-zinc-900 border border-zinc-700 w-full py-3 flex items-center justify-center",
                                  fontOption.fontFamily,
                                )}
                              >
                                <span className="text-sm uppercase">{fontOption.name}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="colors" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>COLOR CUSTOMIZATION</Label>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="use-custom-colors" className="text-sm cursor-pointer">
                          USE CUSTOM COLORS
                        </Label>
                        <input
                          type="checkbox"
                          id="use-custom-colors"
                          checked={useCustomColors}
                          onChange={() => setUseCustomColors(!useCustomColors)}
                          className="rounded border-zinc-700 text-red-600 focus:ring-red-600"
                        />
                      </div>
                    </div>

                    <div
                      className={cn(
                        "space-y-4 p-4 border rounded-md border-zinc-800",
                        useCustomColors ? "opacity-100" : "opacity-50",
                      )}
                    >
                      <h3 className="font-medium mb-2">BACKGROUND GRADIENT</h3>

                      <div className="space-y-2">
                        <Label htmlFor="gradient-start" className="flex justify-between">
                          <span>START COLOR</span>
                          <span className="text-xs text-zinc-400">{gradientStart}</span>
                        </Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            id="gradient-start"
                            value={gradientStart}
                            onChange={(e) => setGradientStart(e.target.value)}
                            className="w-10 h-10 rounded border border-zinc-700 cursor-pointer"
                            disabled={!useCustomColors}
                          />
                          <Input
                            value={gradientStart}
                            onChange={(e) => setGradientStart(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600 font-mono"
                            disabled={!useCustomColors}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gradient-middle" className="flex justify-between">
                          <span>MIDDLE COLOR</span>
                          <span className="text-xs text-zinc-400">{gradientMiddle}</span>
                        </Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            id="gradient-middle"
                            value={gradientMiddle}
                            onChange={(e) => setGradientMiddle(e.target.value)}
                            className="w-10 h-10 rounded border border-zinc-700 cursor-pointer"
                            disabled={!useCustomColors}
                          />
                          <Input
                            value={gradientMiddle}
                            onChange={(e) => setGradientMiddle(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600 font-mono"
                            disabled={!useCustomColors}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gradient-end" className="flex justify-between">
                          <span>END COLOR</span>
                          <span className="text-xs text-zinc-400">{gradientEnd}</span>
                        </Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            id="gradient-end"
                            value={gradientEnd}
                            onChange={(e) => setGradientEnd(e.target.value)}
                            className="w-10 h-10 rounded border border-zinc-700 cursor-pointer"
                            disabled={!useCustomColors}
                          />
                          <Input
                            value={gradientEnd}
                            onChange={(e) => setGradientEnd(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600 font-mono"
                            disabled={!useCustomColors}
                          />
                        </div>
                      </div>

                      <div
                        className="h-16 rounded-md mt-4 border border-zinc-700"
                        style={{
                          background: `linear-gradient(to bottom right, ${gradientStart}, ${gradientMiddle}, ${gradientEnd})`,
                        }}
                      ></div>

                      <h3 className="font-medium mb-2 mt-6">TEXT & ACCENT COLORS</h3>

                      <div className="space-y-2">
                        <Label htmlFor="text-color" className="flex justify-between">
                          <span>TEXT COLOR</span>
                          <span className="text-xs text-zinc-400">{customTextColor}</span>
                        </Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            id="text-color"
                            value={customTextColor}
                            onChange={(e) => setCustomTextColor(e.target.value)}
                            className="w-10 h-10 rounded border border-zinc-700 cursor-pointer"
                            disabled={!useCustomColors}
                          />
                          <Input
                            value={customTextColor}
                            onChange={(e) => setCustomTextColor(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600 font-mono"
                            disabled={!useCustomColors}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accent-color" className="flex justify-between">
                          <span>ACCENT COLOR</span>
                          <span className="text-xs text-zinc-400">{customAccentColor}</span>
                        </Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            id="accent-color"
                            value={customAccentColor}
                            onChange={(e) => setCustomAccentColor(e.target.value)}
                            className="w-10 h-10 rounded border border-zinc-700 cursor-pointer"
                            disabled={!useCustomColors}
                          />
                          <Input
                            value={customAccentColor}
                            onChange={(e) => setCustomAccentColor(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600 font-mono"
                            disabled={!useCustomColors}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <div
                          className="flex-1 p-4 rounded-md border border-zinc-700 flex items-center justify-center"
                          style={{
                            background: `linear-gradient(to bottom right, ${gradientStart}, ${gradientMiddle}, ${gradientEnd})`,
                            borderColor: customAccentColor, // Ini seharusnya border color
                          }}
                        >
                          <span style={{ color: customTextColor }}>TEXT PREVIEW</span>
                        </div>
                        <div
                          className="flex-1 p-4 rounded-md border-4 flex items-center justify-center" // Ini sudah benar border-4
                          style={{
                            borderColor: customAccentColor,
                          }}
                        >
                          <span>ACCENT PREVIEW</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-6">
                      <Label>PRESET COLOR SCHEMES</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[200px] overflow-y-auto p-2">
                        {[
                          {
                            name: "BLOOD & STEEL",
                            start: "#2d0a0a",
                            middle: "#8b0000",
                            end: "#000000",
                            text: "#ffffff",
                            accent: "#ff2a2a",
                          },
                          {
                            name: "CYBER NEON",
                            start: "#000428",
                            middle: "#004e92",
                            end: "#000000",
                            text: "#00ffff",
                            accent: "#00ccff",
                          },
                          {
                            name: "TOXIC WASTE",
                            start: "#1F1300",
                            middle: "#5F4B00",
                            end: "#000000",
                            text: "#c0ff00",
                            accent: "#9acd32",
                          },
                          {
                            name: "MOLTEN CORE",
                            start: "#330000",
                            middle: "#aa3300",
                            end: "#000000",
                            text: "#ffcc00",
                            accent: "#ff6600",
                          },
                          {
                            name: "SHADOW OPS",
                            start: "#000000",
                            middle: "#1a1a1a",
                            end: "#000000",
                            text: "#cccccc",
                            accent: "#444444",
                          },
                          {
                            name: "ROYAL POWER",
                            start: "#13005A",
                            middle: "#3E00FF",
                            end: "#000000",
                            text: "#ffffff",
                            accent: "#a020f0",
                          },
                        ].map((scheme, index) => (
                          <div
                            key={index}
                            className="cursor-pointer rounded-md overflow-hidden h-16 flex flex-col border-2 border-transparent hover:border-zinc-600"
                            onClick={() => {
                              if (!useCustomColors) setUseCustomColors(true)
                              setGradientStart(scheme.start)
                              setGradientMiddle(scheme.middle)
                              setGradientEnd(scheme.end)
                              setCustomTextColor(scheme.text)
                              setCustomAccentColor(scheme.accent)
                            }}
                          >
                            <div
                              className="flex-1 w-full h-full flex items-center justify-center"
                              style={{
                                background: `linear-gradient(to bottom right, ${scheme.start}, ${scheme.middle}, ${scheme.end})`,
                                borderBottom: `2px solid ${scheme.accent}`,
                              }}
                            >
                              <span style={{ color: scheme.text }} className="text-xs text-center px-1">{scheme.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>


                  <TabsContent value="layout" className="space-y-4">
                    <Label>CARD LAYOUT</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {cardLayouts.map((layoutItem) => (
                        <div
                          key={layoutItem.id}
                          className={cn(
                            "cursor-pointer rounded-md overflow-hidden border-2 transition-all",
                            selectedLayout === layoutItem.id
                              ? "border-red-600 ring-2 ring-offset-2 ring-offset-zinc-900 ring-red-600"
                              : "border-zinc-700",
                          )}
                          onClick={() => handleLayoutChange(layoutItem.id)}
                        >
                          <div
                            className={cn(
                              "bg-zinc-800 w-full flex items-center justify-center p-2",
                              layoutItem.aspectRatio,
                            )}
                          >
                            <div className="bg-zinc-900 border border-zinc-700 w-full h-full flex items-center justify-center">
                              <span className="text-xs font-medium uppercase">{layoutItem.name}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Label className="mb-3 block">CARD SIZE</Label>
                      <RadioGroup
                        value={selectedSize}
                        onValueChange={setSelectedSize}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                      >
                        {availableSizes.map((size) => (
                          <div key={size.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={size.id} id={`size-${size.id}`} className="text-red-600" />
                            <Label htmlFor={`size-${size.id}`} className="cursor-pointer uppercase">
                              {size.name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {selectedSize === "custom" && (
                      <div className="space-y-4 p-4 border rounded-md border-zinc-800 bg-zinc-800/30">
                        <h3 className="font-medium">CUSTOM DIMENSIONS</h3>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="custom-width">WIDTH: {customWidth}px</Label>
                            <span className="text-xs text-zinc-400">300-1200px</span>
                          </div>
                          <Slider
                            id="custom-width"
                            min={300}
                            max={1200}
                            step={10}
                            value={[customWidth]}
                            onValueChange={(value) => setCustomWidth(value[0])}
                            className="py-2 [&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:first-child>span]:bg-red-600 [&>span:nth-child(2)>span]:bg-red-700 [&>span:nth-child(2)>span]:border-red-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="custom-height">HEIGHT: {customHeight}px</Label>
                            <span className="text-xs text-zinc-400">300-1200px</span>
                          </div>
                          <Slider
                            id="custom-height"
                            min={300}
                            max={1200}
                            step={10}
                            value={[customHeight]}
                            onValueChange={(value) => setCustomHeight(value[0])}
                            className="py-2 [&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:first-child>span]:bg-red-600 [&>span:nth-child(2)>span]:bg-red-700 [&>span:nth-child(2)>span]:border-red-500"
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t border-zinc-800 pt-6">
                <Button
                  onClick={handleDownload}
                  disabled={isGenerating || !principles.trim()}
                  className="w-full bg-red-700 hover:bg-red-600 text-white font-bebas tracking-wider text-lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      GENERATING...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      DOWNLOAD AS PNG
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 font-bebas tracking-wider">PREVIEW</h2>
            <div
              ref={previewContainerRef}
              className="relative w-full overflow-hidden bg-zinc-900/50 rounded-lg border border-zinc-800 p-4 flex items-center justify-center min-h-[500px]"
            >
              <div
                className="relative transition-all duration-300"
                style={{
                  transform: `scale(${previewScale})`,
                  width: `${currentWidth}px`, 
                  height: `${currentHeight}px`,
                }}
              >
                <div
                  ref={cardRef}
                  data-layout={selectedLayout}
                  data-size={selectedSize}
                  data-font={selectedFont}
                  className={cn(
                    "w-full h-full rounded-lg overflow-hidden shadow-lg flex flex-col",
                    activeGradient, 
                    font.fontFamily,
                    !fontLoaded && "opacity-80", 
                  )}
                  style={{
                    width: `${currentWidth}px`, 
                    height: `${currentHeight}px`,
                  }}
                >
                  {/* Header section */}
                  <div
                    className={cn(
                      "flex-shrink-0 flex items-center justify-between",
                      activeBorderStyle, 
                      paddingScale.header,
                    )}
                  >
                    <h3 className={cn("font-bold tracking-wider uppercase", activeTextColor, fontScale.title)}>
                      {cardTitle || "MY PRINCIPLES"}
                    </h3>
                    <div className="flex items-center gap-2">
                      {template.icon}
                      <span className={cn("opacity-80 text-sm", activeTextColor)}>{currentDate}</span>
                    </div>
                  </div>

                  {/* Content section */}
                  <div
                    ref={contentRef}
                    className={cn(
                      "flex-1 flex flex-col justify-center overflow-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent relative",
                      paddingScale.content,
                      "min-h-0", 
                    )}
                  >
                    {principles ? (
                      <div className="space-y-4">
                        {displayMode === "numbered" ? (
                          <div className="space-y-4">
                            {principlesArray.map((principle, index) => (
                              <div key={index} className="flex gap-4 items-start">
                                <span
                                  className={cn(
                                    "font-bold",
                                    useCustomColors ? `text-[${customAccentColor}]` : template.numberStyle,
                                    fontScale.number,
                                  )}
                                >
                                  {index + 1}.
                                </span>
                                <p className={cn("leading-tight tracking-wide", activeTextColor, fontScale.principle)}>
                                  {principle}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p
                            className={cn(
                              "leading-tight tracking-wide",
                              activeTextColor,
                              fontScale.principle,
                              selectedLayout === "commandment" ? "text-center max-w-3xl mx-auto" : "",
                            )}
                          >
                            {principles}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {displayMode === "numbered" ? (
                          <div className="space-y-4 opacity-70">
                            <div className="flex gap-4 items-start">
                              <span
                                className={cn(
                                  "font-bold",
                                   useCustomColors ? `text-[${customAccentColor}]` : template.numberStyle,
                                  fontScale.number,
                                )}
                              >
                                1.
                              </span>
                              <p className={cn("leading-tight tracking-wide", activeTextColor, fontScale.principle)}>
                                NEVER BACK DOWN.
                              </p>
                            </div>
                            <div className="flex gap-4 items-start">
                              <span
                                className={cn(
                                  "font-bold",
                                   useCustomColors ? `text-[${customAccentColor}]` : template.numberStyle,
                                  fontScale.number,
                                )}
                              >
                                2.
                              </span>
                              <p className={cn("leading-tight tracking-wide", activeTextColor, fontScale.principle)}>
                                SHOW NO WEAKNESS.
                              </p>
                            </div>
                            <div className="flex gap-4 items-start">
                              <span
                                className={cn(
                                  "font-bold",
                                   useCustomColors ? `text-[${customAccentColor}]` : template.numberStyle,
                                  fontScale.number,
                                )}
                              >
                                3.
                              </span>
                              <p className={cn("leading-tight tracking-wide", activeTextColor, fontScale.principle)}>
                                TRUST NO ONE.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p
                            className={cn(
                              "leading-tight tracking-wide opacity-70",
                              activeTextColor,
                              fontScale.principle,
                              selectedLayout === "commandment" ? "text-center max-w-3xl mx-auto" : "",
                            )}
                          >
                            STRENGTH THROUGH DISCIPLINE. DISCIPLINE THROUGH WILL. WILL THROUGH POWER.
                          </p>
                        )}
                      </div>
                    )}

                    {author && (
                      <p
                        className={cn(
                          "font-semibold mt-6",
                          activeTextColor,
                          fontScale.author,
                          selectedLayout === "commandment" ? "text-center" : "text-right",
                        )}
                      >
                        — {author}
                      </p>
                    )}

                    {contentOverflow && (
                      <div className="absolute bottom-1 right-1 bg-white/10 backdrop-blur-sm rounded-full p-1 animate-bounce">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={cn("h-4 w-4", activeTextColor)}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Footer section */}
                  <div
                    className={cn(
                      "flex-shrink-0 flex items-center justify-center",
                       activeBorderStyle, 
                      paddingScale.footer,
                    )}
                  >
                    <p className={cn("text-center uppercase tracking-wider", activeTextColor, fontScale.footer)}>
                      {footerText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FontLoader>
  )
}
