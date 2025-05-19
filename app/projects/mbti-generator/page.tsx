"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Download, Camera, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

const mbtiTypes = [
  // Analysts (NT)
  { value: "INTJ", label: "INTJ", group: "Analysts" },
  { value: "INTP", label: "INTP", group: "Analysts" },
  { value: "ENTJ", label: "ENTJ", group: "Analysts" },
  { value: "ENTP", label: "ENTP", group: "Analysts" },
  // Diplomats (NF)
  { value: "INFJ", label: "INFJ", group: "Diplomats" },
  { value: "INFP", label: "INFP", group: "Diplomats" },
  { value: "ENFJ", label: "ENFJ", group: "Diplomats" },
  { value: "ENFP", label: "ENFP", group: "Diplomats" },
  // Sentinels (SJ)
  { value: "ISTJ", label: "ISTJ", group: "Sentinels" },
  { value: "ISFJ", label: "ISFJ", group: "Sentinels" },
  { value: "ESTJ", label: "ESTJ", group: "Sentinels" },
  { value: "ESFJ", label: "ESFJ", group: "Sentinels" },
  // Explorers (SP)
  { value: "ISTP", label: "ISTP", group: "Explorers" },
  { value: "ISFP", label: "ISFP", group: "Explorers" },
  { value: "ESTP", label: "ESTP", group: "Explorers" },
  { value: "ESFP", label: "ESFP", group: "Explorers" },
]

const gradients = {
  Analysts: [
    "bg-gradient-to-r from-purple-700 to-indigo-700",
    "bg-gradient-to-r from-purple-600 to-indigo-900",
    "bg-gradient-to-r from-violet-600 to-purple-800",
    "bg-gradient-to-r from-indigo-500 to-purple-600",
    "bg-gradient-to-r from-purple-500 to-violet-800",
  ],
  Diplomats: [
    "bg-gradient-to-r from-emerald-600 to-green-700",
    "bg-gradient-to-r from-green-500 to-teal-700",
    "bg-gradient-to-r from-teal-500 to-emerald-700",
    "bg-gradient-to-r from-green-600 to-emerald-800",
    "bg-gradient-to-r from-emerald-500 to-green-800",
  ],
  Sentinels: [
    "bg-gradient-to-r from-blue-600 to-sky-700",
    "bg-gradient-to-r from-sky-500 to-blue-800",
    "bg-gradient-to-r from-blue-500 to-cyan-700",
    "bg-gradient-to-r from-cyan-600 to-blue-700",
    "bg-gradient-to-r from-blue-700 to-sky-800",
  ],
  Explorers: [
    "bg-gradient-to-r from-orange-600 to-red-700",
    "bg-gradient-to-r from-red-500 to-orange-800",
    "bg-gradient-to-r from-amber-600 to-red-600",
    "bg-gradient-to-r from-red-600 to-amber-700",
    "bg-gradient-to-r from-orange-500 to-red-800",
  ],
}

// Gradient color mapping for canvas rendering
const gradientColors = {
  Analysts: [
    { from: "#6d28d9", to: "#4338ca" }, // purple-700 to indigo-700
    { from: "#7c3aed", to: "#312e81" }, // purple-600 to indigo-900
    { from: "#7c3aed", to: "#6b21a8" }, // violet-600 to purple-800
    { from: "#6366f1", to: "#9333ea" }, // indigo-500 to purple-600
    { from: "#8b5cf6", to: "#6b21a8" }, // purple-500 to violet-800
  ],
  Diplomats: [
    { from: "#059669", to: "#15803d" }, // emerald-600 to green-700
    { from: "#22c55e", to: "#0f766e" }, // green-500 to teal-700
    { from: "#14b8a6", to: "#047857" }, // teal-500 to emerald-700
    { from: "#16a34a", to: "#065f46" }, // green-600 to emerald-800
    { from: "#10b981", to: "#166534" }, // emerald-500 to green-800
  ],
  Sentinels: [
    { from: "#2563eb", to: "#0369a1" }, // blue-600 to sky-700
    { from: "#0ea5e9", to: "#1e40af" }, // sky-500 to blue-800
    { from: "#3b82f6", to: "#0e7490" }, // blue-500 to cyan-700
    { from: "#0891b2", to: "#1d4ed8" }, // cyan-600 to blue-700
    { from: "#1d4ed8", to: "#075985" }, // blue-700 to sky-800
  ],
  Explorers: [
    { from: "#ea580c", to: "#b91c1c" }, // orange-600 to red-700
    { from: "#ef4444", to: "#9a3412" }, // red-500 to orange-800
    { from: "#d97706", to: "#dc2626" }, // amber-600 to red-600
    { from: "#dc2626", to: "#b45309" }, // red-600 to amber-700
    { from: "#f97316", to: "#991b1b" }, // orange-500 to red-800
  ],
}

export default function MBTICardGenerator() {
  const [name, setName] = useState("")
  const [mbti, setMbti] = useState("")
  const [typology, setTypology] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [randomId, setRandomId] = useState("")
  const [creationDate, setCreationDate] = useState("")
  const [gradientIndex, setGradientIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublic, setIsPublic] = useState(true)

  const { toast } = useToast()
  const template1Ref = useRef<HTMLDivElement>(null)
  const template2Ref = useRef<HTMLDivElement>(null)

  const generateRandomId = useCallback(() => {
    const id = Math.floor(10000 + Math.random() * 90000)
    setRandomId(`#${id}`)
  }, [])

  const getCurrentDate = useCallback(() => {
    const now = new Date()
    return now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }, [])

  const getGradientByMBTI = useCallback(
    (mbtiType: string) => {
      const type = mbtiTypes.find((type) => type.value === mbtiType)
      if (!type) return gradients.Analysts[gradientIndex]
      return gradients[type.group as keyof typeof gradients][gradientIndex]
    },
    [gradientIndex],
  )

  const getHeaderGradientByMBTI = useCallback(
    (mbtiType: string) => {
      const type = mbtiTypes.find((type) => type.value === mbtiType)
      if (!type) return gradients.Analysts[(gradientIndex + 2) % 5]
      return gradients[type.group as keyof typeof gradients][(gradientIndex + 2) % 5]
    },
    [gradientIndex],
  )

  const getGradientColorsByMBTI = useCallback(
    (mbtiType: string, isHeader = false) => {
      const type = mbtiTypes.find((type) => type.value === mbtiType)
      if (!type) {
        return isHeader ? gradientColors.Analysts[(gradientIndex + 2) % 5] : gradientColors.Analysts[gradientIndex]
      }
      const group = type.group as keyof typeof gradientColors
      return isHeader ? gradientColors[group][(gradientIndex + 2) % 5] : gradientColors[group][gradientIndex]
    },
    [gradientIndex],
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Direct canvas rendering approach
  const renderToCanvas = useCallback(
    async (templateType: "template1" | "template2") => {
      if (!name || !mbti) {
        toast({
          title: "Missing information",
          description: "Please enter your name and MBTI type",
          variant: "destructive",
        })
        return null
      }

      setIsGenerating(true)

      try {
        // Create a high-resolution canvas
        const canvas = document.createElement("canvas")
        const scale = 3 // For high resolution
        canvas.width = 323 * scale
        canvas.height = 204 * scale
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          throw new Error("Could not get canvas context")
        }

        // Set canvas properties for high quality
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = "high"
        ctx.scale(scale, scale)

        // Get gradient colors based on MBTI
        const bodyGradient = getGradientColorsByMBTI(mbti)
        const headerGradient = getGradientColorsByMBTI(mbti, true)

        if (templateType === "template1") {
          // Draw Template 1
          // Header background
          const headerGrad = ctx.createLinearGradient(0, 0, 323, 0)
          headerGrad.addColorStop(0, headerGradient.from)
          headerGrad.addColorStop(1, headerGradient.to)
          ctx.fillStyle = headerGrad
          ctx.fillRect(0, 0, 323, 40)

          // Body background
          const bodyGrad = ctx.createLinearGradient(0, 0, 323, 0)
          bodyGrad.addColorStop(0, bodyGradient.from)
          bodyGrad.addColorStop(1, bodyGradient.to)
          ctx.fillStyle = bodyGrad
          ctx.fillRect(0, 40, 323, 124)

          // Footer background (same as body)
          ctx.fillStyle = bodyGrad
          ctx.fillRect(0, 164, 323, 40)

          // Header text
          ctx.fillStyle = "white"
          ctx.font = "bold 12px Inter"
          ctx.textAlign = "left"
          ctx.fillText("Typology ID", 12, 25)
          ctx.textAlign = "right"
          ctx.fillText(randomId, 311, 25)

          // Profile image area (now 4x3 rectangular)
          ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
          ctx.fillRect(22, 50, 64, 85) // Rectangular shape

          // Profile image
          if (profileImage) {
            const img = new Image()
            img.crossOrigin = "anonymous"
            await new Promise((resolve, reject) => {
              img.onload = resolve
              img.onerror = reject
              img.src = profileImage
            })
            ctx.save()
            ctx.beginPath()
            ctx.rect(22, 50, 64, 85) // Clip to rectangle
            ctx.clip()
            ctx.drawImage(img, 22, 50, 64, 85)
            ctx.restore()
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
            ctx.font = "10px Inter"
            ctx.textAlign = "center"
            ctx.fillText("No Image", 54, 82)
          }

          // Creation date
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
          ctx.font = "8px Inter"
          ctx.textAlign = "center"
          ctx.fillText(creationDate, 54, 145)

          // Public/Private badge
          ctx.fillStyle = isPublic ? "rgba(0, 200, 0, 0.8)" : "rgba(200, 0, 0, 0.8)"
          ctx.beginPath()
          ctx.arc(30, 60, 8, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = "white"
          ctx.font = "bold 8px Inter"
          ctx.textAlign = "center"
          ctx.fillText(isPublic ? "P" : "X", 30, 63)

          // User info
          ctx.fillStyle = "white"
          ctx.font = "bold 18px Inter"
          ctx.textAlign = "left"
          ctx.fillText(name || "Your Name", 108, 70)

          ctx.font = "14px Inter"
          ctx.fillText(mbti || "MBTI", 108, 90)

          ctx.font = "12px Inter"
          ctx.fillText(typology || "Typology", 108, 110)

          const mbtiGroup = mbtiTypes.find((type) => type.value === mbti)?.group || "Group"
          ctx.fillText(mbtiGroup, 108, 130)

          // Additional decorative elements
          // Horizontal line
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(108, 75)
          ctx.lineTo(300, 75)
          ctx.stroke()

          // Status indicator
          ctx.fillStyle = "white"
          ctx.font = "10px Inter"
          ctx.textAlign = "right"
          ctx.fillText(isPublic ? "PUBLIC" : "PRIVATE", 300, 60)

          // Small decorative dots
          for (let i = 0; i < 5; i++) {
            ctx.beginPath()
            ctx.arc(108 + i * 10, 140, 2, 0, Math.PI * 2)
            ctx.fill()
          }

          // Footer
          ctx.fillStyle = "white"
          ctx.font = "10px Inter"
          ctx.textAlign = "left"
          ctx.fillText(randomId, 12, 184)

          // Additional footer text
          ctx.fillStyle = "white"
          ctx.font = "8px Inter"
          ctx.textAlign = "center"
          ctx.fillText("", 160, 184)
        } else {
          // Draw Template 2
          // Background
          const bodyGrad = ctx.createLinearGradient(0, 0, 323, 0)
          bodyGrad.addColorStop(0, bodyGradient.from)
          bodyGrad.addColorStop(1, bodyGradient.to)
          ctx.fillStyle = bodyGrad
          ctx.fillRect(0, 0, 323, 204)

          // Text content
          ctx.fillStyle = "white"
          ctx.textAlign = "center"

          // Name
          ctx.font = "bold 24px Inter"
          ctx.fillText(name || "Your Name", 323 / 2, 70)

          // MBTI
          ctx.font = "bold 40px Inter"
          ctx.fillText(mbti || "MBTI", 323 / 2, 110)

          // Typology
          ctx.font = "20px Inter"
          ctx.fillText(typology || "Typology", 323 / 2, 140)

          // Creation date
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
          ctx.font = "10px Inter"
          ctx.fillText(creationDate, 323 / 2, 170)

          // Decorative elements
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
          ctx.lineWidth = 1

          // Top decorative line
          ctx.beginPath()
          ctx.moveTo(100, 30)
          ctx.lineTo(223, 30)
          ctx.stroke()

          // Bottom decorative line
          ctx.beginPath()
          ctx.moveTo(100, 180)
          ctx.lineTo(223, 180)
          ctx.stroke()

          // Corner decorations
          const cornerSize = 15

          // Top-left corner
          ctx.beginPath()
          ctx.moveTo(20, 20)
          ctx.lineTo(20, 20 + cornerSize)
          ctx.moveTo(20, 20)
          ctx.lineTo(20 + cornerSize, 20)
          ctx.stroke()

          // Top-right corner
          ctx.beginPath()
          ctx.moveTo(323 - 20, 20)
          ctx.lineTo(323 - 20, 20 + cornerSize)
          ctx.moveTo(323 - 20, 20)
          ctx.lineTo(323 - 20 - cornerSize, 20)
          ctx.stroke()

          // Bottom-left corner
          ctx.beginPath()
          ctx.moveTo(20, 204 - 20)
          ctx.lineTo(20, 204 - 20 - cornerSize)
          ctx.moveTo(20, 204 - 20)
          ctx.lineTo(20 + cornerSize, 204 - 20)
          ctx.stroke()

          // Bottom-right corner
          ctx.beginPath()
          ctx.moveTo(323 - 20, 204 - 20)
          ctx.lineTo(323 - 20, 204 - 20 - cornerSize)
          ctx.moveTo(323 - 20, 204 - 20)
          ctx.lineTo(323 - 20 - cornerSize, 204 - 20)
          ctx.stroke()
        }

        return canvas.toDataURL("image/png")
      } catch (error) {
        console.error("Error generating image:", error)
        toast({
          title: "Error",
          description: "Failed to generate the card. Please try again.",
          variant: "destructive",
        })
        return null
      } finally {
        setIsGenerating(false)
      }
    },
    [
      name,
      mbti,
      typology,
      profileImage,
      randomId,
      creationDate,
      gradientIndex,
      getGradientColorsByMBTI,
      toast,
      isPublic,
    ],
  )

  const downloadCard = useCallback(
    async (templateType: "template1" | "template2") => {
      const dataUrl = await renderToCanvas(templateType)
      if (!dataUrl) return

      const link = document.createElement("a")
      link.download = `${name}-${mbti}-${templateType}.png`
      link.href = dataUrl
      link.click()

      toast({
        title: "Success!",
        description: "Your MBTI card has been downloaded.",
      })
    },
    [name, mbti, renderToCanvas, toast],
  )

  const cycleGradient = useCallback(() => {
    const mbtiGroup = mbtiTypes.find((type) => type.value === mbti)?.group || "Analysts"
    const maxIndex = gradients[mbtiGroup as keyof typeof gradients].length - 1
    setGradientIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [mbti])

  useEffect(() => {
    generateRandomId()
    setCreationDate(getCurrentDate())
  }, [generateRandomId, getCurrentDate])

  const getMbtiGroup = (mbtiType: string) => {
    return mbtiTypes.find((type) => type.value === mbtiType)?.group || ""
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-16">
      <h1 className="text-3xl font-bold text-center mb-8">MBTI Intro Card Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Enter Your Information</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mbti">MBTI Type</Label>
            <Select value={mbti} onValueChange={setMbti}>
              <SelectTrigger>
                <SelectValue placeholder="Select your MBTI type" />
              </SelectTrigger>
              <SelectContent>
                {mbtiTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label} - {type.group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="typology">Typology</Label>
            <Input
              id="typology"
              placeholder="Enter your typology"
              value={typology}
              onChange={(e) => setTypology(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Picture</Label>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => document.getElementById("profileImageInput")?.click()}>
                <Camera className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {profileImage && (
                <div className="h-12 w-12 rounded-md overflow-hidden">
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="public-switch">Public/Private:</Label>
            <Switch id="public-switch" checked={isPublic} onCheckedChange={setIsPublic} />
            <span className="text-sm">{isPublic ? "Public" : "Private"}</span>
          </div>

          <div className="flex space-x-4">
            <Button onClick={generateRandomId}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Generate New ID
            </Button>
            <Button onClick={cycleGradient} disabled={!mbti}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Change Colors
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preview & Download</h2>

          <Tabs defaultValue="template1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="template1">Template 1</TabsTrigger>
              <TabsTrigger value="template2">Template 2</TabsTrigger>
            </TabsList>

            <TabsContent value="template1" className="mt-4">
              <Card className="p-4">
                <div
                  ref={template1Ref}
                  className="rounded-lg overflow-hidden shadow-lg mx-auto"
                  style={{
                    width: "323px",
                    height: "204px",
                    backgroundColor: "white",
                    position: "relative",
                  }}
                >
                  {/* Header */}
                  <div
                    className={`h-[40px] flex items-center justify-between px-3 text-white ${mbti ? getHeaderGradientByMBTI(mbti) : "bg-gray-700"}`}
                  >
                    <div className="text-sm font-bold">Typology ID</div>
                    <div className="text-sm">{randomId}</div>
                  </div>

                  {/* Body */}
                  <div className={`h-[124px] flex p-3 text-white ${mbti ? getGradientByMBTI(mbti) : "bg-gray-600"}`}>
                    <div className="w-1/3 flex flex-col items-center">
                      {/* Public/Private indicator */}
                      <div
                        className={`absolute top-[50px] left-[30px] w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${isPublic ? "bg-green-500" : "bg-red-500"}`}
                      >
                        {isPublic ? "P" : "X"}
                      </div>

                      {/* 4x3 rectangular profile image */}
                      <div className="w-16 h-[85px] rounded-md overflow-hidden bg-white/20 flex items-center justify-center">
                        {profileImage ? (
                          <img
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="text-xs text-center text-white/70">No Image</div>
                        )}
                      </div>
                      <div className="mt-2 text-[8px] text-white/80">{creationDate}</div>
                    </div>
                    <div className="w-2/3 pl-2">
                      <div className="font-bold text-lg leading-tight">{name || "Your Name"}</div>
                      <div className="text-sm mt-1">{mbti || "MBTI"}</div>
                      <div className="text-xs mt-1">{typology || "Typology"}</div>
                      <div className="text-xs mt-1">{getMbtiGroup(mbti) || "Group"}</div>

                      {/* Status text */}
                      <div className="absolute top-[60px] right-[20px] text-[8px]">
                        {isPublic ? "PUBLIC" : "PRIVATE"}
                      </div>

                      {/* Decorative line */}
                      <div className="w-full h-[1px] bg-white/30 mt-1"></div>

                      {/* Decorative dots */}
                      <div className="flex mt-3 space-x-2">
                        <p class="text-[8px] text-white/80 italic">Unlocking potential through typology.</p>
                      </div>   
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className={`h-[40px] flex items-center justify-between px-3 text-white ${mbti ? getGradientByMBTI(mbti) : "bg-gray-600"}`}
                  >
                    <div className="text-xs">{randomId}</div>
                    <div className="text-[8px] absolute left-1/2 transform -translate-x-1/2 bottom-[12px]">
                      
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button onClick={() => downloadCard("template1")} disabled={!name || !mbti || isGenerating}>
                    <Download className="h-4 w-4 mr-2" />
                    {isGenerating ? "Generating..." : "Download Template 1"}
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="template2" className="mt-4">
              <Card className="p-4">
                <div
                  ref={template2Ref}
                  className={`rounded-lg overflow-hidden shadow-lg mx-auto flex flex-col items-center justify-center p-6 text-white ${mbti ? getGradientByMBTI(mbti) : "bg-gray-600"}`}
                  style={{
                    width: "323px",
                    height: "204px",
                    position: "relative",
                  }}
                >
                  {/* Decorative corners */}
                  <div className="absolute top-5 left-5 w-3 h-3 border-t border-l border-white/30"></div>
                  <div className="absolute top-5 right-5 w-3 h-3 border-t border-r border-white/30"></div>
                  <div className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-white/30"></div>
                  <div className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-white/30"></div>

                  {/* Top decorative line */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-[1px] bg-white/30"></div>

                  <div className="text-center">
                    <div className="font-bold text-2xl mb-2">{name || "Your Name"}</div>
                    <div className="text-4xl font-extrabold mb-2">{mbti || "MBTI"}</div>
                    <div className="text-xl mb-4">{typology || "Typology"}</div>
                    <div className="text-xs opacity-70">{creationDate}</div>
                  </div>

                     {/* Decorative line */}
                      <div className="w-full h-[1px] bg-white/30 mt-1"></div>

                      {/* Decorative dots */}
                      <div className="flex mt-3 space-x-2">
                        <p class="text-[8px] text-white/80 italic">Unlocking potential through typology.</p>
                      </div>   
                                      <div className="flex mt-3 space-x-2">
                        <p class="text-[8px] text-white/80 italic">Unlocking potential through typology.</p>
                      </div>   

                <div className="mt-4 flex justify-center">
                  <Button onClick={() => downloadCard("template2")} disabled={!name || !mbti || isGenerating}>
                    <Download className="h-4 w-4 mr-2" />
                    {isGenerating ? "Generating..." : "Download Template 2"}
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
