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

// Komponen untuk memuat font
const FontLoader = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Memuat font kustom
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

    // Menambahkan kelas font kustom ke dokumen
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

// Templat desain
const designTemplates = [
  {
    id: "warlord",
    name: "Warlord",
    gradient: "from-red-950 via-red-900 to-black",
    textColor: "text-red-50",
    accent: "border-red-600",
    description: "Brutal, penuh perintah, dan tanpa kompromi",
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
    description: "Digital, futuristik, dan pemberontak",
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
    description: "Berapi-api, intens, dan tak terhentikan",
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
    description: "Tersembunyi, misterius, dan tanpa ampun",
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
    description: "Ditempa dalam api, dikeraskan oleh perjuangan",
    icon: <Hammer className="h-6 w-6 text-amber-600" />,
    borderStyle: "border-y-4 border-amber-600",
    numberStyle: "text-amber-600 font-bold",
  },
]

// Opsi font
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

// Tata letak kartu
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

// Opsi ukuran
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

// Penskalaan ukuran font berdasarkan ukuran kartu
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

// Penskalaan padding berdasarkan ukuran kartu
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

  // State opsi ukuran
  const [selectedSize, setSelectedSize] = useState("medium")
  const [customWidth, setCustomWidth] = useState(600)
  const [customHeight, setCustomHeight] = useState(800)
  const [previewScale, setPreviewScale] = useState(1)

  // State pemilihan font
  const [selectedFont, setSelectedFont] = useState("bebas")

  // State overflow konten
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

  // Mendapatkan opsi ukuran yang sesuai berdasarkan tata letak yang dipilih
  const availableSizes = sizeOptions[selectedLayout as keyof typeof sizeOptions]
  const selectedSizeOption = availableSizes.find((size) => size.id === selectedSize) || availableSizes[1]

  // Mendapatkan dimensi saat ini berdasarkan ukuran yang dipilih
  const currentWidth = selectedSize === "custom" ? customWidth : selectedSizeOption.width
  const currentHeight = selectedSize === "custom" ? customHeight : selectedSizeOption.height

  // Mendapatkan skala ukuran font dan padding berdasarkan ukuran yang dipilih
  const fontScale = fontSizeScales[selectedSize as keyof typeof fontSizeScales]
  const paddingScale = paddingScales[selectedSize as keyof typeof paddingScales]

  // Memproses prinsip menjadi array jika dalam mode bernomor
  const principlesArray =
    displayMode === "numbered" ? principles.split("\n").filter((line) => line.trim() !== "") : [principles]

  // Memeriksa apakah font sudah dimuat
  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      // Membuat elemen uji untuk memeriksa apakah font sudah dimuat
      const testFont = async () => {
        try {
          await document.fonts.ready
          setFontLoaded(true)
        } catch (e) {
          console.error("Error loading fonts:", e)
          // Tetapkan sebagai dimuat untuk mencegah UI macet
          setFontLoaded(true)
        }
      }

      testFont()
    } else {
      // Fallback untuk browser tanpa API pemuatan font
      const timer = setTimeout(() => {
        setFontLoaded(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Menghitung skala pratinjau saat tata letak, ukuran, atau kontainer berubah
  useEffect(() => {
    const updatePreviewScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.clientWidth
        const cardWidth = currentWidth

        // Hitung skala agar sesuai dengan kontainer pratinjau (dengan margin)
        const newScale = Math.min(1, (containerWidth - 40) / cardWidth)
        setPreviewScale(newScale)
      }
    }

    updatePreviewScale()

    // Tambahkan listener resize
    window.addEventListener("resize", updatePreviewScale)
    return () => window.removeEventListener("resize", updatePreviewScale)
  }, [currentWidth, selectedLayout, selectedSize])

  // Tambahkan efek untuk memeriksa overflow konten
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight
        setContentOverflow(isOverflowing)
      }
    }

    // Periksa setelah render dan setiap kali konten berubah
    checkOverflow()

    // Gunakan ResizeObserver untuk mendeteksi perubahan di area konten
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

  // Fungsi untuk memvalidasi jumlah kata berdasarkan tata letak
  const validateFooterText = (text: string) => {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length
    const wordLimit = selectedLayout === "creed" ? 6 : 20

    if (wordCount > wordLimit) {
      toast({
        title: `Batas kata terlampaui`,
        description: `Harap batasi teks footer Anda hingga ${wordLimit} kata untuk tata letak ini.`,
        variant: "destructive",
      })
      return false
    }
    return true
  }

  // Tangani perubahan tata letak
  const handleLayoutChange = (newLayout: string) => {
    setSelectedLayout(newLayout)

    // Reset ke ukuran sedang saat mengubah tata letak untuk memastikan rasio aspek yang benar
    setSelectedSize("medium")

    // Setel dimensi kustom default berdasarkan tata letak baru
    const defaultSize = sizeOptions[newLayout as keyof typeof sizeOptions].find((s) => s.id === "medium")
    if (defaultSize) {
      setCustomWidth(defaultSize.width)
      setCustomHeight(defaultSize.height)
    }
  }

  // Tangani perubahan font dengan verifikasi
  const handleFontChange = (fontId: string) => {
    setSelectedFont(fontId)

    // Verifikasi font telah dimuat
    const selectedFontOption = fontOptions.find((f) => f.id === fontId)
    if (selectedFontOption) {
      // Untuk font kustom, tampilkan toast pemuatan
      const fontName = selectedFontOption.name
      toast({
        title: `Memuat font ${fontName}...`,
        description: "Harap tunggu sementara kami menyiapkan font yang Anda pilih.",
      })
    }
  }

  const handleDownload = async () => {
    if (!principles.trim()) {
      toast({
        title: "Kesalahan Validasi",
        description: "Harap masukkan prinsip Anda sebelum mengunduh.",
        variant: "destructive",
      })
      return
    }

    if (cardRef.current) {
      try {
        setIsGenerating(true)

        // Pastikan font dimuat sebelum membuat gambar
        if (typeof document !== "undefined" && "fonts" in document) {
          await document.fonts.ready;
        }

        const dataUrl = await toPng(cardRef.current, {
          quality: 4,
          pixelRatio: 2,
          skipFonts: false,
          width: currentWidth,
          height: currentHeight,
          fontEmbedCSS: Array.from(document.styleSheets)
            .map(sheet => sheet.href)
            .filter(href => href) // Remove null or undefined hrefs
            .join(' '), // Join all CSS URLs
        });

        const link = document.createElement("a")
        link.download = `${selectedTemplate}-${selectedLayout}-principles.png`
        link.href = dataUrl
        link.click()

        toast({
          title: "Berhasil!",
          description: "Prinsip Anda telah diunduh.",
        })
      } catch (error) {
        toast({
          title: "Kesalahan",
          description: "Gagal membuat gambar. Silakan coba lagi.",
          variant: "destructive",
        })
        console.error("Error generating image:", error)
      } finally {
        setIsGenerating(false)
      }
    }
  }

  // Hasilkan kelas gradien kustom
  const customGradient = `bg-gradient-to-br from-[${gradientStart}] via-[${gradientMiddle}] to-[${gradientEnd}]`
  const customTextColorClass = `text-[${customTextColor}]`
  const customAccentBorder = `border-[${customAccentColor}]`

  // Tentukan gaya mana yang akan digunakan berdasarkan apakah warna kustom diaktifkan
  const activeGradient = useCustomColors ? customGradient : template.gradient
  const activeTextColor = useCustomColors ? customTextColorClass : template.textColor
  const activeAccent = useCustomColors ? customAccentBorder : template.accent
  const activeBorderStyle = useCustomColors
    ? `border-${["t", "l", "b", "r", "y", "x"][Math.floor(Math.random() * 6)]}-4 ${customAccentBorder}`
    : template.borderStyle

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
                      <Input id="card-title" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} placeholder="MY PRINCIPLES" className="bg-zinc-800 border-zinc-700 focus:border-zinc-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="display-mode">DISPLAY MODE</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="single-mode" checked={displayMode === "single"} onChange={() => setDisplayMode("single")} className="text-red-600 focus:ring-red-600" />
                            <Label htmlFor="single-mode" className="cursor-pointer text-sm"> SINGLE </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="numbered-mode" checked={displayMode === "numbered"} onChange={() => setDisplayMode("numbered")} className="text-red-600 focus:ring-red-600" />
                            <Label htmlFor="numbered-mode" className="cursor-pointer text-sm"> NUMBERED </Label>
                          </div>
                        </div>
                      </div>
                      <Label htmlFor="principles" className="text-sm text-zinc-400">
                        {displayMode === "numbered"
                          ? "ENTER EACH PRINCIPLE ON A NEW LINE"
                          : "ENTER YOUR PRINCIPLE"}
                      </Label>
                      <Textarea id="principles" value={principles} onChange={(e) => setPrinciples(e.target.value)} placeholder={
                        displayMode === "numbered"
                          ? "NEVER BACK DOWN.\nSHOW NO WEAKNESS.\nTRUST NO ONE."
                          : "STRENGTH THROUGH DISCIPLINE. DISCIPLINE THROUGH WILL. WILL THROUGH POWER."
                      } className="min-h-[150px] bg-zinc-800 border-zinc-700 focus:border-zinc-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">AUTHOR (OPTIONAL)</Label>
                      <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="YOUR NAME" className="bg-zinc-800 border-zinc-700 focus:border-zinc-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="footer-text">
                        {" "}
                        FOOTER TEXT {selectedLayout === "creed" ? "(MAX 6 WORDS)" : "(MAX 20 WORDS)"}
                      </Label>
                      <Input id="footer-text" value={footerText} onChange={(e) => {
                        const newValue = e.target.value
                        if (validateFooterText(newValue)) {
                          setFooterText(newValue)
                        }
                      }} placeholder="NO MERCY. NO SURRENDER." className="bg-zinc-800 border-zinc-700 focus:border-zinc-600" />
                    </div>
                  </TabsContent>
                  <TabsContent value="design" className="space-y-4">
                    <div className="space-y-2">
                      <Label>DESIGN TEMPLATE</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto p-2">
                        {designTemplates.map((template) => (
                          <div
                            key={template.id}
                            className={cn(
                              "flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200",
                              "border-2 border-transparent",
                              selectedTemplate === template.id
                                ? "ring-2 ring-offset-2 ring-zinc-500 bg-zinc-800/80"
                                : "bg-zinc-900/90 hover:bg-zinc-800/50 hover:border-zinc-700",
                            )}
                            onClick={() => setSelectedTemplate(template.id)}
                          >
                            <div className="mb-2">{template.icon}</div>
                            <p className="text-sm font-medium text-center">{template.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>FONT</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto p-2">
                        {fontOptions.map((fontOption) => (
                          <div
                            key={fontOption.id}
                            className={cn(
                              "flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200",
                              "border-2 border-transparent",
                              selectedFont === fontOption.id
                                ? "ring-2 ring-offset-2 ring-zinc-500 bg-zinc-800/80"
                                : "bg-zinc-900/90 hover:bg-zinc-800/50 hover:border-zinc-700",
                            )}
                            onClick={() => handleFontChange(fontOption.id)}
                          >
                            <p className={cn("text-sm font-medium", fontOption.fontFamily)}>
                              {fontOption.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="colors" className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="use-custom-colors"
                        checked={useCustomColors}
                        onChange={(e) => setUseCustomColors(e.target.checked)}
                        className="h-5 w-5 text-red-600 focus:ring-red-600 rounded border-zinc-700"
                      />
                      <Label htmlFor="use-custom-colors">USE CUSTOM COLORS</Label>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>GRADIENT START</Label>
                        <Input
                          type="color"
                          value={gradientStart}
                          onChange={(e) => setGradientStart(e.target.value)}
                          className="w-full h-10 mt-1"
                          disabled={!useCustomColors}
                        />
                      </div>
                      <div>
                        <Label>GRADIENT MIDDLE</Label>
                        <Input
                          type="color"
                          value={gradientMiddle}
                          onChange={(e) => setGradientMiddle(e.target.value)}
                          className="w-full h-10 mt-1"
                          disabled={!useCustomColors}
                        />
                      </div>
                      <div>
                        <Label>GRADIENT END</Label>
                        <Input
                          type="color"
                          value={gradientEnd}
                          onChange={(e) => setGradientEnd(e.target.value)}
                          className="w-full h-10 mt-1"
                          disabled={!useCustomColors}
                        />
                      </div>
                      <div>
                        <Label>TEXT COLOR</Label>
                        <Input
                          type="color"
                          value={customTextColor}
                          onChange={(e) => setCustomTextColor(e.target.value)}
                          className="w-full h-10 mt-1"
                          disabled={!useCustomColors}
                        />
                      </div>
                      <div>
                        <Label>ACCENT COLOR</Label>
                        <Input
                          type="color"
                          value={customAccentColor}
                          onChange={(e) => setCustomAccentColor(e.target.value)}
                          className="w-full h-10 mt-1"
                          disabled={!useCustomColors}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="layout" className="space-y-4">
                    <div className="space-y-2">
                      <Label>CARD LAYOUT</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
                        {cardLayouts.map((layoutOption) => (
                          <div
                            key={layoutOption.id}
                            className={cn(
                              "flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-200",
                              "border-2 border-transparent",
                              selectedLayout === layoutOption.id
                                ? "ring-2 ring-offset-2 ring-zinc-500 bg-zinc-800/80"
                                : "bg-zinc-900/90 hover:bg-zinc-800/50 hover:border-zinc-700",
                            )}
                            onClick={() => handleLayoutChange(layoutOption.id)}
                          >
                            <div
                              className={cn(
                                "w-24 h-24 mb-2 rounded-md border-2 border-dashed border-zinc-500",
                                layoutOption.aspectRatio,
                              )}
                            ></div>
                            <p className="text-sm font-medium text-center">
                              {layoutOption.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>CARD SIZE</Label>
                      <RadioGroup
                        defaultValue={selectedSize}
                        className="flex items-center space-x-4"
                        onValueChange={(value) => setSelectedSize(value)}
                      >
                        {availableSizes.map((size) => (
                          <div key={size.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={size.id} id={`size-${size.id}`} className="text-red-600 focus:ring-red-600" />
                            <Label htmlFor={`size-${size.id}`} className="cursor-pointer text-sm">
                              {size.name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {selectedSize === "custom" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="custom-width">CUSTOM WIDTH (px)</Label>
                          <Input
                            id="custom-width"
                            type="number"
                            value={customWidth}
                            onChange={(e) => setCustomWidth(parseInt(e.target.value, 10))}
                            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="custom-height">CUSTOM HEIGHT (px)</Label>
                          <Input
                            id="custom-height"
                            type="number"
                            value={customHeight}
                            onChange={(e) => setCustomHeight(parseInt(e.target.value, 10))}
                            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600"
                          />
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>PREVIEW SCALE</Label>
                      <Slider
                        defaultValue={[1]}
                        max={1}
                        min={0.2}
                        step={0.01}
                        onValueChange={(value) => setPreviewScale(value[0])}
                        className="w-full"
                      />
                      <p className="text-sm text-zinc-400 text-center">
                        {Math.round(previewScale * 100)}%
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t border-zinc-800">
                <Button variant="outline" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700" onClick={() => {
                  setPrinciples("")
                  setAuthor("")
                  setCardTitle("MY PRINCIPLES")
                  setFooterText("NO MERCY. NO SURRENDER.")
                  setSelectedTemplate("warlord")
                  setSelectedLayout("manifesto")
                  setSelectedSize("medium")
                  setCustomWidth(600)
                  setCustomHeight(800)
                  setUseCustomColors(false)
                  setGradientStart("#1a0505")
                  setGradientMiddle("#7a1e1e")
                  setGradientEnd("#000000")
                  setCustomTextColor("#ffffff")
                  setCustomAccentColor("#ff4040")
                }}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  RESET
                </Button>
                <Button
                  variant="default"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDownload}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      DOWNLOAD
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <div
              ref={previewContainerRef}
              className="w-full flex justify-center items-center"
            >
              <div
                ref={cardRef}
                style={{
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                  width: `${currentWidth}px`,
                  height: `${currentHeight}px`,
                }}
                className={cn(
                  "bg-cover bg-center rounded-xl shadow-2xl transition-all duration-300",
                  "overflow-hidden flex flex-col justify-between",
                  layout.className,
                  activeGradient,
                  font.fontFamily,
                  `w-[${currentWidth}px] h-[${currentHeight}px]`,
                )}
              >
                {/* Header section */}
                <div
                  className={cn(
                    "flex-shrink-0 flex items-center justify-between",
                    paddingScale.header,
                  )}
                >
                  <h2 className={cn("uppercase tracking-wider", activeTextColor, fontScale.title)}>
                    {cardTitle}
                  </h2>
                  <p className={cn("text-xs text-zinc-400")}>{currentDate}</p>
                </div>

                {/* Main content section */}
                <div
                  ref={contentRef}
                  className={cn(
                    "flex-grow flex flex-col justify-center items-center text-center",
                    paddingScale.content,
                    "relative overflow-hidden",
                  )}
                >
                  {displayMode === "numbered" ? (
                    principlesArray.map((principle, index) => (
                      <div
                        key={index}
                        className={cn(
                          "mb-4 last:mb-0 flex items-start gap-3",
                          "w-full",
                          activeTextColor,
                          fontScale.principle,
                        )}
                      >
                        <span className={cn(template.numberStyle, fontScale.number)}>
                          {index + 1}.
                        </span>
                        <p className="text-left">{principle.trim()}</p>
                      </div>
                    ))
                  ) : (
                    <p className={cn("leading-relaxed", activeTextColor, fontScale.principle)}>
                      {principles}
                    </p>
                  )}

                  {author && (
                    <p className={cn("absolute bottom-4 right-4 text-sm italic", activeTextColor, fontScale.author)}>
                      - {author}
                    </p>
                  )}

                  {/* Overflow indicator */}
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

                {/* Bagian footer */}
                <div
                  className={cn(
                    "flex-shrink-0 flex items-center justify-center",
                    useCustomColors ? `border-b-4 ${customAccentBorder}` : template.borderStyle,
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
    </FontLoader>
  )
}

