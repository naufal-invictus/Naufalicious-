"use client"

import { useState, useRef, useEffect } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Download, RefreshCw, LayoutTemplate, Type, Palette, PaintBucket } from "lucide-react"
import { cn } from "@/lib/utils"
import { FontLoader } from "@/components/font-loader"

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

// Add these new color palettes to the beginning of the colorPalettes array
const newColorPalettes = [
  {
    id: "dark-night",
    name: "Dark Night",
    gradient: "from-slate-950 via-blue-950 to-purple-950",
    textColor: "text-slate-200",
    accent: "border-blue-500",
    description: "Deep, mysterious night sky with subtle blue and purple tones",
  },
  {
    id: "aurora",
    name: "Aurora",
    gradient: "from-green-500 via-teal-400 to-blue-600",
    textColor: "text-white",
    accent: "border-green-300",
    description: "Vibrant northern lights inspired colors",
  },
  {
    id: "desert-sunset",
    name: "Desert Sunset",
    gradient: "from-amber-500 via-orange-600 to-rose-700",
    textColor: "text-white",
    accent: "border-amber-300",
    description: "Warm desert sunset tones",
  },
  {
    id: "ocean-depths",
    name: "Ocean Depths",
    gradient: "from-blue-900 via-cyan-800 to-teal-900",
    textColor: "text-white",
    accent: "border-cyan-400",
    description: "Deep ocean blues with mysterious undertones",
  },
  {
    id: "forest-mist",
    name: "Forest Mist",
    gradient: "from-emerald-800 via-green-700 to-lime-800",
    textColor: "text-white",
    accent: "border-emerald-300",
    description: "Misty forest greens with earthy tones",
  },
  {
    id: "cosmic",
    name: "Cosmic",
    gradient: "from-violet-800 via-fuchsia-700 to-purple-900",
    textColor: "text-white",
    accent: "border-violet-300",
    description: "Cosmic purples and violets inspired by nebulae",
  },
  {
    id: "vintage",
    name: "Vintage",
    gradient: "from-amber-200 via-yellow-100 to-amber-300",
    textColor: "text-slate-800",
    accent: "border-amber-600",
    description: "Warm vintage tones with a nostalgic feel",
  },
  {
    id: "neon-city",
    name: "Neon City",
    gradient: "from-pink-600 via-purple-600 to-blue-700",
    textColor: "text-white",
    accent: "border-pink-400",
    description: "Vibrant neon colors inspired by city lights",
  },
  {
    id: "autumn",
    name: "Autumn",
    gradient: "from-amber-600 via-orange-500 to-red-700",
    textColor: "text-white",
    accent: "border-amber-400",
    description: "Rich autumn colors with warm undertones",
  },
  {
    id: "winter-frost",
    name: "Winter Frost",
    gradient: "from-blue-100 via-slate-200 to-blue-200",
    textColor: "text-slate-800",
    accent: "border-blue-400",
    description: "Frosty winter colors with icy blue tones",
  },
]

// Color palettes based on color psychology principles
const colorPalettes = [
  ...newColorPalettes,
  {
    id: "stunning",
    name: "Stunning",
    gradient: "from-purple-700 via-violet-600 to-indigo-800",
    textColor: "text-white",
    accent: "border-purple-400",
    description: "Bold and captivating colors that demand attention",
  },
  {
    id: "gorgeous",
    name: "Gorgeous",
    gradient: "from-rose-500 via-pink-600 to-fuchsia-700",
    textColor: "text-white",
    accent: "border-rose-300",
    description: "Rich and luxurious tones that exude elegance",
  },
  {
    id: "lovely",
    name: "Lovely",
    gradient: "from-pink-400 via-rose-300 to-red-400",
    textColor: "text-slate-900",
    accent: "border-pink-600",
    description: "Soft and warm colors that evoke affection",
  },
  {
    id: "pretty",
    name: "Pretty",
    gradient: "from-sky-300 via-teal-200 to-emerald-300",
    textColor: "text-slate-900",
    accent: "border-sky-500",
    description: "Delicate and pleasing colors with a gentle appeal",
  },
  {
    id: "aesthetic",
    name: "Aesthetic",
    gradient: "from-amber-200 via-yellow-100 to-orange-200",
    textColor: "text-slate-900",
    accent: "border-amber-500",
    description: "Harmonious and visually balanced color combinations",
  },
  {
    id: "elegant",
    name: "Elegant",
    gradient: "from-slate-900 via-gray-800 to-zinc-900",
    textColor: "text-white",
    accent: "border-slate-400",
    description: "Sophisticated and refined colors with timeless appeal",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    gradient: "from-gray-50 via-slate-100 to-gray-200",
    textColor: "text-slate-900",
    accent: "border-slate-400",
    description: "Clean and simple colors that emphasize content",
  },
  {
    id: "industrial",
    name: "Industrial",
    gradient: "from-zinc-700 via-stone-600 to-neutral-700",
    textColor: "text-white",
    accent: "border-zinc-400",
    description: "Raw and utilitarian colors inspired by urban environments",
  },
  {
    id: "bohemian",
    name: "Bohemian",
    gradient: "from-amber-600 via-red-500 to-purple-600",
    textColor: "text-white",
    accent: "border-amber-400",
    description: "Eclectic and vibrant colors with artistic flair",
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
    gradient: "from-blue-50 via-slate-100 to-gray-100",
    textColor: "text-slate-900",
    accent: "border-blue-300",
    description: "Light and airy colors inspired by Nordic design",
  },
  {
    id: "contemporary",
    name: "Contemporary",
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    textColor: "text-white",
    accent: "border-emerald-300",
    description: "Modern and trendy colors with a fresh perspective",
  },
  {
    id: "anime-clear-sky",
    name: "Anime Clear Sky",
    gradient: "from-sky-400 via-blue-300 to-indigo-400",
    textColor: "text-slate-900",
    accent: "border-sky-500",
    description: "Bright and optimistic blues inspired by anime skies",
  },
  {
    id: "anime-forest",
    name: "Anime Forest",
    gradient: "from-emerald-500 via-green-400 to-teal-500",
    textColor: "text-white",
    accent: "border-emerald-300",
    description: "Lush and vibrant greens from animated forest scenes",
  },
  {
    id: "medieval",
    name: "Medieval",
    gradient: "from-amber-800 via-yellow-700 to-red-900",
    textColor: "text-white",
    accent: "border-amber-500",
    description: "Rich and rustic tones reminiscent of medieval manuscripts",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    gradient: "from-fuchsia-600 via-violet-600 to-blue-700",
    textColor: "text-white",
    accent: "border-fuchsia-400",
    description: "Neon-inspired futuristic colors with high contrast",
  },
  {
    id: "pastel-dream",
    name: "Pastel Dream",
    gradient: "from-pink-200 via-purple-200 to-blue-200",
    textColor: "text-slate-800",
    accent: "border-pink-400",
    description: "Soft and dreamy pastel tones for a gentle aesthetic",
  },
  {
    id: "dark-academia",
    name: "Dark Academia",
    gradient: "from-stone-800 via-amber-900 to-stone-900",
    textColor: "text-amber-100",
    accent: "border-amber-700",
    description: "Scholarly and vintage-inspired dark tones",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    gradient: "from-pink-500 via-purple-500 to-cyan-500",
    textColor: "text-white",
    accent: "border-pink-300",
    description: "Retro-futuristic aesthetic with bold contrasts",
  },
  {
    id: "cottagecore",
    name: "Cottagecore",
    gradient: "from-amber-200 via-lime-200 to-emerald-200",
    textColor: "text-slate-800",
    accent: "border-amber-400",
    description: "Rustic and idyllic colors inspired by rural aesthetics",
  },
  {
    id: "noir",
    name: "Noir",
    gradient: "from-gray-900 via-neutral-800 to-gray-950",
    textColor: "text-gray-200",
    accent: "border-gray-600",
    description: "Dramatic monochromatic tones inspired by film noir",
  },
  {
    id: "sunset",
    name: "Sunset",
    gradient: "from-orange-500 via-red-500 to-purple-700",
    textColor: "text-white",
    accent: "border-orange-300",
    description: "Warm and vibrant colors of a dramatic sunset",
  },
]

const fontOptions = [
  { id: "sans", name: "Sans-Serif", fontFamily: "font-sans" },
  { id: "serif", name: "Serif", fontFamily: "font-serif" },
  { id: "mono", name: "Monospace", fontFamily: "font-mono" },
  { id: "playfair", name: "Playfair Display", fontFamily: "font-playfair" },
  { id: "caveat", name: "Caveat", fontFamily: "font-caveat" },
  { id: "cormorant", name: "Cormorant Garamond", fontFamily: "font-cormorant" },
  { id: "montserrat", name: "Montserrat", fontFamily: "font-montserrat" },
  { id: "lora", name: "Lora", fontFamily: "font-lora" },
  { id: "merriweather", name: "Merriweather", fontFamily: "font-merriweather" },
  { id: "crimson", name: "Crimson Pro", fontFamily: "font-crimson" },
]

const cardLayouts = [
  { id: "square", name: "Square", aspectRatio: "aspect-square", className: "flex flex-col" },
  { id: "horizontal", name: "Horizontal", aspectRatio: "aspect-[7/3] min-h-[240px]", className: "flex flex-col" },
]

// Predefined size options
const sizeOptions = {
  square: [
    { id: "small", name: "Small", width: 400, height: 400 },
    { id: "medium", name: "Medium", width: 600, height: 600 },
    { id: "large", name: "Large", width: 800, height: 800 },
    { id: "extra-large", name: "Extra Large", width: 1000, height: 1000 },
    { id: "custom", name: "Custom", width: 600, height: 600 },
  ],
  horizontal: [
    { id: "small", name: "Small", width: 600, height: 257 },
    { id: "medium", name: "Medium", width: 800, height: 343 },
    { id: "large", name: "Large", width: 1000, height: 429 },
    { id: "extra-large", name: "Extra Large", width: 1200, height: 514 },
    { id: "custom", name: "Custom", width: 800, height: 343 },
  ],
}

// Font size scaling based on card size
const fontSizeScales = {
  small: {
    title: "text-lg",
    quote: "text-base",
    author: "text-sm",
    footer: "text-xs",
  },
  medium: {
    title: "text-xl",
    quote: "text-lg",
    author: "text-base",
    footer: "text-sm",
  },
  large: {
    title: "text-2xl",
    quote: "text-xl",
    author: "text-lg",
    footer: "text-base",
  },
  "extra-large": {
    title: "text-3xl",
    quote: "text-2xl",
    author: "text-xl",
    footer: "text-lg",
  },
  custom: {
    title: "text-xl",
    quote: "text-lg",
    author: "text-base",
    footer: "text-sm",
  },
}

// Padding scaling based on card size
const paddingScales = {
  small: {
    header: "p-3",
    content: "p-4",
    footer: "p-3",
  },
  medium: {
    header: "p-5",
    content: "p-6",
    footer: "p-5",
  },
  large: {
    header: "p-6",
    content: "p-8",
    footer: "p-6",
  },
  "extra-large": {
    header: "p-8",
    content: "p-10",
    footer: "p-8",
  },
  custom: {
    header: "p-5",
    content: "p-6",
    footer: "p-5",
  },
}

export default function QuoteCardGenerator() {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("INFJ")
  const [selectedLayout, setSelectedLayout] = useState("square")
  const [cardTitle, setCardTitle] = useState("My Quote Card")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedPalette, setSelectedPalette] = useState("")
  const [useCustomPalette, setUseCustomPalette] = useState(false)
  const [footerDescription, setFooterDescription] = useState("Generated with purpose")
  const [fontLoaded, setFontLoaded] = useState(false)

  // Size options state
  const [selectedSize, setSelectedSize] = useState("medium")
  const [customWidth, setCustomWidth] = useState(600)
  const [customHeight, setCustomHeight] = useState(600)
  const [previewScale, setPreviewScale] = useState(1)

  // Font selection state
  const [selectedFont, setSelectedFont] = useState("sans")

  // Content overflow state
  const [contentOverflow, setContentOverflow] = useState(false)

  const { toast } = useToast()
  const cardRef = useRef<HTMLDivElement>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const template = mbtiTemplates.find((t) => t.id === selectedTemplate) || mbtiTemplates[0]
  const palette = colorPalettes.find((p) => p.id === selectedPalette) || colorPalettes[0]
  const layout = cardLayouts.find((l) => l.id === selectedLayout) || cardLayouts[0]
  const font = fontOptions.find((f) => f.id === selectedFont) || fontOptions[0]

  // Get the appropriate size options based on the selected layout
  const availableSizes = sizeOptions[selectedLayout as keyof typeof sizeOptions]
  const selectedSizeOption = availableSizes.find((size) => size.id === selectedSize) || availableSizes[1]

  // Get the current dimensions based on selected size
  const currentWidth = selectedSize === "custom" ? customWidth : selectedSizeOption.width
  const currentHeight = selectedSize === "custom" ? customHeight : selectedSizeOption.height

  // Get font size and padding scales based on selected size
  const fontScale = fontSizeScales[selectedSize as keyof typeof fontSizeScales]
  const paddingScale = paddingScales[selectedSize as keyof typeof paddingScales]

  // Determine which styling to use based on whether custom palette is enabled
  const activeGradient = useCustomPalette ? palette.gradient : template.gradient
  const activeTextColor = useCustomPalette ? palette.textColor : template.textColor
  const activeAccent = useCustomPalette ? palette.accent : template.accent
  const activeDescription = useCustomPalette ? palette.description : template.description

  // Check if fonts are loaded
  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      // Create a test element to check if the font is loaded
      const testFont = async () => {
        try {
          await document.fonts.ready
          setFontLoaded(true)
        } catch (e) {
          console.error("Error loading fonts:", e)
          // Set as loaded anyway to prevent UI from being stuck
          setFontLoaded(true)
        }
      }

      testFont()
    } else {
      // Fallback for browsers without font loading API
      const timer = setTimeout(() => {
        setFontLoaded(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Calculate preview scale when layout, size, or container changes
  useEffect(() => {
    const updatePreviewScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.clientWidth
        const cardWidth = currentWidth

        // Calculate scale to fit the preview container (with some margin)
        const newScale = Math.min(1, (containerWidth - 40) / cardWidth)
        setPreviewScale(newScale)
      }
    }

    updatePreviewScale()

    // Add resize listener
    window.addEventListener("resize", updatePreviewScale)
    return () => window.removeEventListener("resize", updatePreviewScale)
  }, [currentWidth, selectedLayout, selectedSize])

  // Add an effect to check for content overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight
        setContentOverflow(isOverflowing)
      }
    }

    // Check after render and whenever content changes
    checkOverflow()

    // Use ResizeObserver to detect changes in the content area
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
  }, [quote, author, selectedSize, currentWidth, currentHeight, fontScale])

  // Function to validate word count based on layout
  const validateFooterDescription = (text: string) => {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length
    const wordLimit = selectedLayout === "square" ? 6 : 20

    if (wordCount > wordLimit) {
      toast({
        title: `Word limit exceeded`,
        description: `Please limit your footer description to ${wordLimit} words for this layout.`,
        variant: "destructive",
      })
      return false
    }
    return true
  }

  // Handle layout change
  const handleLayoutChange = (newLayout: string) => {
    setSelectedLayout(newLayout)

    // Reset to medium size when changing layouts to ensure proper aspect ratio
    setSelectedSize("medium")

    // Set default custom dimensions based on the new layout
    const defaultSize = sizeOptions[newLayout as keyof typeof sizeOptions].find((s) => s.id === "medium")
    if (defaultSize) {
      setCustomWidth(defaultSize.width)
      setCustomHeight(defaultSize.height)
    }
  }

  // Handle font change with verification
  const handleFontChange = (fontId: string) => {
    setSelectedFont(fontId)

    // Verify the font is loaded
    const selectedFontOption = fontOptions.find((f) => f.id === fontId)
    if (
      selectedFontOption &&
      selectedFontOption.id !== "sans" &&
      selectedFontOption.id !== "serif" &&
      selectedFontOption.id !== "mono"
    ) {
      // For custom fonts, show a loading toast
      const fontName = selectedFontOption.name
      toast({
        title: `Loading ${fontName} font...`,
        description: "Please wait while we prepare your selected font.",
      })
    }
  }

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

        // Ensure fonts are loaded before generating the image
        if (typeof document !== "undefined" && "fonts" in document) {
          await document.fonts.ready
        }

        const dataUrl = await toPng(cardRef.current, {
          quality: 1,
          pixelRatio: 2,
          skipFonts: false,
          width: currentWidth,
          height: currentHeight,
          fontEmbedCSS: window.document.styleSheets[0].href, // Include font CSS
        })

        const link = document.createElement("a")
        const filePrefix = useCustomPalette ? selectedPalette : selectedTemplate
        link.download = `${filePrefix}-${selectedLayout}-${selectedSize}-${selectedFont}-quote-card.png`
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
    <FontLoader>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Quote Card Generator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Your Quote Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid grid-cols-5 mb-4">
                    <TabsTrigger value="content" className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      <span className="hidden sm:inline">Content</span>
                    </TabsTrigger>
                    <TabsTrigger value="template" className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <span className="hidden sm:inline">MBTI</span>
                    </TabsTrigger>
                    <TabsTrigger value="colors" className="flex items-center gap-2">
                      <PaintBucket className="h-4 w-4" />
                      <span className="hidden sm:inline">Colors</span>
                    </TabsTrigger>
                    <TabsTrigger value="fonts" className="flex items-center gap-2">
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
                        className="h-4 w-4"
                      >
                        <path d="M4 7V4h16v3"></path>
                        <path d="M9 20h6"></path>
                        <path d="M12 4v16"></path>
                      </svg>
                      <span className="hidden sm:inline">Fonts</span>
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

                    <div className="space-y-2">
                      <Label htmlFor="footer-description">
                        Footer Description {selectedLayout === "square" ? "(max 6 words)" : "(max 20 words)"}
                      </Label>
                      <Input
                        id="footer-description"
                        value={footerDescription}
                        onChange={(e) => {
                          const newValue = e.target.value
                          if (validateFooterDescription(newValue)) {
                            setFooterDescription(newValue)
                          }
                        }}
                        placeholder="Generated with purpose"
                      />
                      <p className="text-xs text-muted-foreground">
                        This will appear in the footer of your quote card.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="template" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label>MBTI Template</Label>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="use-mbti" className="text-sm cursor-pointer">
                          Use MBTI Colors
                        </Label>
                        <input
                          type="checkbox"
                          id="use-mbti"
                          checked={!useCustomPalette}
                          onChange={() => setUseCustomPalette(false)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto p-2 scrollbar-thin">
                      {mbtiTemplates.map((template) => (
                        <div
                          key={template.id}
                          className={cn(
                            "cursor-pointer rounded-md overflow-hidden h-28 flex flex-col border-2 transition-all",
                            selectedTemplate === template.id && !useCustomPalette
                              ? template.accent
                              : "border-transparent",
                            selectedTemplate === template.id && !useCustomPalette ? "ring-2 ring-offset-2" : "",
                            useCustomPalette ? "opacity-70 hover:opacity-100" : "",
                          )}
                          onClick={() => {
                            setSelectedTemplate(template.id)
                            setUseCustomPalette(false)
                          }}
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

                  <TabsContent value="colors" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Color Palettes</Label>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="use-palette" className="text-sm cursor-pointer">
                          Use Custom Colors
                        </Label>
                        <input
                          type="checkbox"
                          id="use-palette"
                          checked={useCustomPalette}
                          onChange={() => {
                            setUseCustomPalette(true)
                            if (!selectedPalette) setSelectedPalette(colorPalettes[0].id)
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto p-2 scrollbar-thin">
                      {colorPalettes.map((palette) => (
                        <div
                          key={palette.id}
                          className={cn(
                            "cursor-pointer rounded-md overflow-hidden h-28 flex flex-col border-2 transition-all",
                            selectedPalette === palette.id && useCustomPalette ? palette.accent : "border-transparent",
                            selectedPalette === palette.id && useCustomPalette ? "ring-2 ring-offset-2" : "",
                            !useCustomPalette ? "opacity-70 hover:opacity-100" : "",
                          )}
                          onClick={() => {
                            setSelectedPalette(palette.id)
                            setUseCustomPalette(true)
                          }}
                        >
                          <div
                            className={cn(
                              "flex-1 bg-gradient-to-br w-full h-full flex items-center justify-center",
                              palette.gradient,
                            )}
                          >
                            <span className={cn("text-sm font-bold capitalize", palette.textColor)}>
                              {palette.name}
                            </span>
                          </div>
                          <div className="bg-background py-1 px-2">
                            <div className="text-center text-xs font-medium capitalize">{palette.name}</div>
                            <div className="text-center text-[10px] text-muted-foreground truncate">
                              {palette.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="fonts" className="space-y-4">
                    <Label>Font Options</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-2 scrollbar-thin">
                      {fontOptions.map((fontOption) => (
                        <div
                          key={fontOption.id}
                          className={cn(
                            "cursor-pointer rounded-md overflow-hidden border-2 transition-all",
                            selectedFont === fontOption.id ? "border-primary ring-2 ring-offset-2" : "border-muted",
                          )}
                          onClick={() => handleFontChange(fontOption.id)}
                        >
                          <div className="bg-muted w-full flex items-center justify-center p-4">
                            <div
                              className={cn(
                                "bg-background border border-border w-full py-4 flex items-center justify-center",
                                fontOption.fontFamily,
                              )}
                            >
                              <span className="text-base">{fontOption.name}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Font preview section */}
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Font Preview</h3>
                      <div className={cn("p-3 bg-background rounded border", font.fontFamily)}>
                        <p className="text-lg font-bold">The quick brown fox jumps over the lazy dog.</p>
                        <p className="text-base mt-1">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                        <p className="text-base">abcdefghijklmnopqrstuvwxyz</p>
                        <p className="text-base">0123456789</p>
                      </div>
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
                          onClick={() => handleLayoutChange(layout.id)}
                        >
                          <div
                            className={cn("bg-muted w-full flex items-center justify-center p-2", layout.aspectRatio)}
                          >
                            <div className="bg-background border border-border w-full h-full flex items-center justify-center">
                              <span className="text-xs font-medium">{layout.name}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Label className="mb-3 block">Card Size</Label>
                      <RadioGroup
                        value={selectedSize}
                        onValueChange={setSelectedSize}
                        className="grid grid-cols-2 sm:grid-cols-5 gap-3"
                      >
                        {availableSizes.map((size) => (
                          <div key={size.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={size.id} id={`size-${size.id}`} />
                            <Label htmlFor={`size-${size.id}`} className="cursor-pointer">
                              {size.name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {selectedSize === "custom" && (
                      <div className="space-y-4 p-4 border rounded-md bg-muted/30">
                        <h3 className="font-medium">Custom Dimensions</h3>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="custom-width">Width: {customWidth}px</Label>
                            <span className="text-xs text-muted-foreground">
                              {selectedLayout === "square" ? "300-1200px" : "500-1500px"}
                            </span>
                          </div>
                          <Slider
                            id="custom-width"
                            min={selectedLayout === "square" ? 300 : 500}
                            max={selectedLayout === "square" ? 1200 : 1500}
                            step={10}
                            value={[customWidth]}
                            onChange={(value) => setCustomWidth(value[0])}
                            className="py-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="custom-height">Height: {customHeight}px</Label>
                            <span className="text-xs text-muted-foreground">
                              {selectedLayout === "square" ? "300-1200px" : "200-800px"}
                            </span>
                          </div>
                          <Slider
                            id="custom-height"
                            min={selectedLayout === "square" ? 300 : 200}
                            max={selectedLayout === "square" ? 1200 : 800}
                            step={10}
                            value={[customHeight]}
                            onChange={(value) => setCustomHeight(value[0])}
                            className="py-2"
                          />
                        </div>

                        {selectedLayout === "square" && customWidth !== customHeight && (
                          <div className="p-2 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-sm rounded-md">
                            Note: For square layout, equal width and height is recommended.
                          </div>
                        )}

                        {selectedLayout === "horizontal" && Math.abs(customWidth / customHeight - 7 / 3) > 0.5 && (
                          <div className="p-2 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-sm rounded-md">
                            Note: For horizontal layout, a 7:3 aspect ratio is recommended.
                          </div>
                        )}
                      </div>
                    )}
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
            <div
              ref={previewContainerRef}
              className="relative w-full overflow-hidden bg-muted/30 rounded-lg border p-4 flex items-center justify-center"
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
                    "w-full h-full rounded-lg overflow-hidden bg-gradient-to-br shadow-lg flex flex-col",
                    activeGradient,
                    font.fontFamily,
                    !fontLoaded && "opacity-80", // Show slightly faded if fonts aren't loaded yet
                  )}
                  style={{
                    width: `${currentWidth}px`,
                    height: `${currentHeight}px`,
                  }}
                >
                  {/* Header section */}
                  <div
                    className={cn(
                      "border-b border-white/20 flex-shrink-0",
                      selectedLayout === "horizontal" ? "flex justify-between items-center" : "",
                      paddingScale.header,
                    )}
                  >
                    <h3 className={cn("font-bold", activeTextColor, fontScale.title)}>
                      {cardTitle || "My Quote Card"}
                    </h3>
                    <p className={cn("opacity-80", activeTextColor, fontScale.footer)}>{currentDate}</p>
                  </div>

                  {/* Content section */}
                  <div
                    ref={contentRef}
                    className={cn(
                      "flex-1 flex flex-col justify-center overflow-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent relative",
                      paddingScale.content,
                      "min-h-0", // This is crucial for flex child to respect parent constraints
                    )}
                  >
                    {quote ? (
                      <p
                        className={cn(
                          "mb-4 leading-relaxed whitespace-pre-line",
                          activeTextColor,
                          fontScale.quote,
                          selectedLayout === "horizontal" ? "text-center max-w-3xl mx-auto" : "",
                        )}
                      >
                        &quot;{quote}&quot;
                      </p>
                    ) : (
                      <p
                        className={cn(
                          "mb-4 italic opacity-70",
                          activeTextColor,
                          fontScale.quote,
                          selectedLayout === "horizontal" ? "text-center max-w-3xl mx-auto" : "",
                        )}
                      >
                        &quot;Your quote will appear here...&quot;
                      </p>
                    )}

                    {author ? (
                      <p
                        className={cn(
                          "font-semibold",
                          activeTextColor,
                          fontScale.author,
                          selectedLayout === "horizontal" ? "text-center" : "text-right",
                        )}
                      >
                        — {author}
                      </p>
                    ) : (
                      <p
                        className={cn(
                          "italic opacity-70",
                          activeTextColor,
                          fontScale.author,
                          selectedLayout === "horizontal" ? "text-center" : "text-right",
                        )}
                      >
                        — Author name
                      </p>
                    )}
                    {/* Content overflow indicator */}
                    {contentOverflow && (
                      <div className="absolute bottom-1 right-1 bg-white/10 backdrop-blur-sm rounded-full p-1 animate-bounce">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={cn("h-4 w-4", activeTextColor)}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Footer section */}
                  <div className={cn("border-t border-white/20 flex-shrink-0", paddingScale.footer)}>
                    <p className={cn("text-center opacity-80", activeTextColor, fontScale.footer)}>
                      {footerDescription}
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
