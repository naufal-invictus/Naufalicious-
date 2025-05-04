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

const enneagramTypes = [
  { value: "1", label: "Type 1", description: "The Reformer" },
  { value: "2", label: "Type 2", description: "The Helper" },
  { value: "3", label: "Type 3", description: "The Achiever" },
  { value: "4", label: "Type 4", description: "The Individualist" },
  { value: "5", label: "Type 5", description: "The Investigator" },
  { value: "6", label: "Type 6", description: "The Loyalist" },
  { value: "7", label: "Type 7", description: "The Enthusiast" },
  { value: "8", label: "Type 8", description: "The Challenger" },
  { value: "9", label: "Type 9", description: "The Peacemaker" },
]

const wings = [
  { value: "W1", label: "Wing 1" },
  { value: "W2", label: "Wing 2" },
  { value: "W3", label: "Wing 3" },
  { value: "W4", label: "Wing 4" },
  { value: "W5", label: "Wing 5" },
  { value: "W6", label: "Wing 6" },
  { value: "W7", label: "Wing 7" },
  { value: "W8", label: "Wing 8" },
  { value: "W9", label: "Wing 9" },
]

const instinctualVariants = [
  { value: "sp", label: "Self-Preservation", description: "SP" },
  { value: "sx", label: "Sexual", description: "SX" },
  { value: "so", label: "Social", description: "SO" },
]

const gradients = {
  "1": [
    "bg-gradient-to-r from-blue-700 to-cyan-600",
    "bg-gradient-to-r from-blue-600 to-cyan-700",
    "bg-gradient-to-r from-cyan-600 to-blue-700",
  ],
  "2": [
    "bg-gradient-to-r from-red-500 to-pink-600",
    "bg-gradient-to-r from-pink-500 to-red-600",
    "bg-gradient-to-r from-rose-500 to-pink-600",
  ],
  "3": [
    "bg-gradient-to-r from-yellow-500 to-amber-600",
    "bg-gradient-to-r from-amber-500 to-yellow-600",
    "bg-gradient-to-r from-orange-500 to-amber-600",
  ],
  "4": [
    "bg-gradient-to-r from-purple-600 to-fuchsia-700",
    "bg-gradient-to-r from-fuchsia-600 to-purple-700",
    "bg-gradient-to-r from-violet-600 to-fuchsia-700",
  ],
  "5": [
    "bg-gradient-to-r from-emerald-600 to-teal-700",
    "bg-gradient-to-r from-teal-600 to-emerald-700",
    "bg-gradient-to-r from-green-600 to-teal-700",
  ],
  "6": [
    "bg-gradient-to-r from-sky-600 to-indigo-700",
    "bg-gradient-to-r from-indigo-600 to-sky-700",
    "bg-gradient-to-r from-blue-600 to-indigo-700",
  ],
  "7": [
    "bg-gradient-to-r from-amber-500 to-orange-600",
    "bg-gradient-to-r from-orange-500 to-amber-600",
    "bg-gradient-to-r from-yellow-500 to-orange-600",
  ],
  "8": [
    "bg-gradient-to-r from-red-700 to-rose-800",
    "bg-gradient-to-r from-rose-700 to-red-800",
    "bg-gradient-to-r from-pink-700 to-rose-800",
  ],
  "9": [
    "bg-gradient-to-r from-green-600 to-emerald-700",
    "bg-gradient-to-r from-emerald-600 to-green-700",
    "bg-gradient-to-r from-teal-600 to-green-700",
  ],
}

// Gradient color mapping for canvas rendering
const gradientColors = {
  "1": [
    { from: "#1d4ed8", to: "#0891b2" }, // blue-700 to cyan-600
    { from: "#2563eb", to: "#0e7490" }, // blue-600 to cyan-700
    { from: "#0891b2", to: "#1d4ed8" }, // cyan-600 to blue-700
  ],
  "2": [
    { from: "#ef4444", to: "#db2777" }, // red-500 to pink-600
    { from: "#ec4899", to: "#dc2626" }, // pink-500 to red-600
    { from: "#f43f5e", to: "#db2777" }, // rose-500 to pink-600
  ],
  "3": [
    { from: "#eab308", to: "#d97706" }, // yellow-500 to amber-600
    { from: "#f59e0b", to: "#ca8a04" }, // amber-500 to yellow-600
    { from: "#f97316", to: "#d97706" }, // orange-500 to amber-600
  ],
  "4": [
    { from: "#9333ea", to: "#a21caf" }, // purple-600 to fuchsia-700
    { from: "#c026d3", to: "#7e22ce" }, // fuchsia-600 to purple-700
    { from: "#7c3aed", to: "#a21caf" }, // violet-600 to fuchsia-700
  ],
  "5": [
    { from: "#059669", to: "#0f766e" }, // emerald-600 to teal-700
    { from: "#0d9488", to: "#047857" }, // teal-600 to emerald-700
    { from: "#16a34a", to: "#0f766e" }, // green-600 to teal-700
  ],
  "6": [
    { from: "#0284c7", to: "#4338ca" }, // sky-600 to indigo-700
    { from: "#4f46e5", to: "#0369a1" }, // indigo-600 to sky-700
    { from: "#2563eb", to: "#4338ca" }, // blue-600 to indigo-700
  ],
  "7": [
    { from: "#f59e0b", to: "#ea580c" }, // amber-500 to orange-600
    { from: "#f97316", to: "#d97706" }, // orange-500 to amber-600
    { from: "#eab308", to: "#ea580c" }, // yellow-500 to orange-600
  ],
  "8": [
    { from: "#b91c1c", to: "#9f1239" }, // red-700 to rose-800
    { from: "#e11d48", to: "#991b1b" }, // rose-700 to red-800
    { from: "#be185d", to: "#9f1239" }, // pink-700 to rose-800
  ],
  "9": [
    { from: "#16a34a", to: "#047857" }, // green-600 to emerald-700
    { from: "#059669", to: "#15803d" }, // emerald-600 to green-700
    { from: "#0d9488", to: "#15803d" }, // teal-600 to green-700
  ],
}

export default function EnneagramCardGenerator() {
  const [name, setName] = useState("")
  const [enneagramType, setEnneagramType] = useState("")
  const [wing, setWing] = useState("")
  const [instinctualVariant, setInstinctualVariant] = useState("")
  const [tritype, setTritype] = useState("")
  const [subtype, setSubtype] = useState("")
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

  const getGradientByEnneagram = useCallback(
    (type: string) => {
      if (!type || !gradients[type as keyof typeof gradients]) return "bg-gradient-to-r from-gray-600 to-gray-700"
      return gradients[type as keyof typeof gradients][gradientIndex]
    },
    [gradientIndex],
  )

  const getHeaderGradientByEnneagram = useCallback(
    (type: string) => {
      if (!type || !gradients[type as keyof typeof gradients]) return "bg-gradient-to-r from-gray-700 to-gray-800"
      const typeGradients = gradients[type as keyof typeof gradients]
      return typeGradients[(gradientIndex + 1) % typeGradients.length]
    },
    [gradientIndex],
  )

  const getGradientColorsByEnneagram = useCallback(
    (type: string, isHeader = false) => {
      if (!type || !gradientColors[type as keyof typeof gradientColors]) {
        return isHeader
          ? { from: "#374151", to: "#1f2937" } // gray-700 to gray-800
          : { from: "#4b5563", to: "#374151" } // gray-600 to gray-700
      }
      const typeGradients = gradientColors[type as keyof typeof gradientColors]
      return isHeader ? typeGradients[(gradientIndex + 1) % typeGradients.length] : typeGradients[gradientIndex]
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
      if (!name || !enneagramType) {
        toast({
          title: "Missing information",
          description: "Please enter your name and Enneagram type",
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

        // Get gradient colors based on Enneagram
        const bodyGradient = getGradientColorsByEnneagram(enneagramType)
        const headerGradient = getGradientColorsByEnneagram(enneagramType, true)

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
          ctx.fillText("Enneagram ID", 12, 25)
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
          ctx.fillText(name || "Your Name", 108, 60)

          // Enneagram info
          ctx.font = "14px Inter"
          const enneagramTypeText = enneagramType ? `Type ${enneagramType}` : "Enneagram Type"
          const wingText = wing ? `${wing}` : ""
          ctx.fillText(`${enneagramTypeText}${wingText}`, 108, 80)

          // Instinctual variant
          if (instinctualVariant) {
            const variant = instinctualVariants.find((v) => v.value === instinctualVariant)
            ctx.font = "12px Inter"
            ctx.fillText(variant?.label || instinctualVariant, 108, 100)
          }

          // Tritype
          if (tritype) {
            ctx.font = "12px Inter"
            ctx.fillText(`Tritype: ${tritype}`, 108, 120)
          }

          // Subtype
          if (subtype) {
            ctx.font = "12px Inter"
            ctx.fillText(`Subtype: ${subtype}`, 108, 140)
          }

          // Additional decorative elements
          // Horizontal line
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(108, 65)
          ctx.lineTo(300, 65)
          ctx.stroke()

          // Status indicator
          ctx.fillStyle = "white"
          ctx.font = "10px Inter"
          ctx.textAlign = "right"
          ctx.fillText(isPublic ? "PUBLIC" : "PRIVATE", 300, 60)

          // Small decorative dots
          for (let i = 0; i < 5; i++) {
            ctx.beginPath()
            ctx.arc(108 + i * 10, 150, 2, 0, Math.PI * 2)
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
          ctx.fillText(name || "Your Name", 323 / 2, 60)

          // Enneagram Type
          ctx.font = "bold 40px Inter"
          const displayType = enneagramType ? `Type ${enneagramType}` : "Enneagram"
          const displayWing = wing ? `${wing}` : ""
          ctx.fillText(`${displayType}${displayWing}`, 323 / 2, 100)

          // Instinctual variant
          if (instinctualVariant) {
            const variant = instinctualVariants.find((v) => v.value === instinctualVariant)
            ctx.font = "20px Inter"
            ctx.fillText(variant?.label || instinctualVariant, 323 / 2, 130)
          }

          // Tritype
          if (tritype) {
            ctx.font = "16px Inter"
            ctx.fillText(`Tritype: ${tritype}`, 323 / 2, 155)
          }

          // Subtype
          if (subtype) {
            ctx.font = "16px Inter"
            ctx.fillText(`Subtype: ${subtype}`, 323 / 2, 175)
          }

          // Creation date
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
          ctx.font = "10px Inter"
          ctx.fillText(creationDate, 323 / 2, 190)

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
      enneagramType,
      wing,
      instinctualVariant,
      tritype,
      subtype,
      profileImage,
      randomId,
      creationDate,
      getGradientColorsByEnneagram,
      toast,
      isPublic,
    ],
  )

  const downloadCard = useCallback(
    async (templateType: "template1" | "template2") => {
      const dataUrl = await renderToCanvas(templateType)
      if (!dataUrl) return

      const link = document.createElement("a")
      link.download = `${name}-Enneagram${enneagramType}-${templateType}.png`
      link.href = dataUrl
      link.click()

      toast({
        title: "Success!",
        description: "Your Enneagram card has been downloaded.",
      })
    },
    [name, enneagramType, renderToCanvas, toast],
  )

  const cycleGradient = useCallback(() => {
    if (!enneagramType || !gradients[enneagramType as keyof typeof gradients]) return

    const typeGradients = gradients[enneagramType as keyof typeof gradients]
    setGradientIndex((prev) => (prev >= typeGradients.length - 1 ? 0 : prev + 1))
  }, [enneagramType])

  useEffect(() => {
    generateRandomId()
    setCreationDate(getCurrentDate())
  }, [generateRandomId, getCurrentDate])

  // Filter available wings based on selected enneagram type
  const availableWings = useCallback(() => {
    if (!enneagramType) return wings

    const typeNum = Number.parseInt(enneagramType)
    const wingValues = [typeNum - 1 || 9, typeNum + 1 > 9 ? 1 : typeNum + 1]

    return wings.filter((w) => {
      const wingNum = Number.parseInt(w.value.substring(1))
      return wingValues.includes(wingNum)
    })
  }, [enneagramType])

  return (
    <div className="container mx-auto px-4 py-8 mb-16">
      <h1 className="text-3xl font-bold text-center mb-8">Enneagram Card Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Enter Your Information</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enneagramType">Enneagram Type</Label>
            <Select value={enneagramType} onValueChange={setEnneagramType}>
              <SelectTrigger>
                <SelectValue placeholder="Select your Enneagram type" />
              </SelectTrigger>
              <SelectContent>
                {enneagramTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label} - {type.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wing">Wing</Label>
            <Select value={wing} onValueChange={setWing} disabled={!enneagramType}>
              <SelectTrigger>
                <SelectValue placeholder={enneagramType ? "Select your wing" : "Select Enneagram type first"} />
              </SelectTrigger>
              <SelectContent>
                {availableWings().map((wing) => (
                  <SelectItem key={wing.value} value={wing.value}>
                    {wing.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instinctualVariant">Instinctual Variant</Label>
            <Select value={instinctualVariant} onValueChange={setInstinctualVariant}>
              <SelectTrigger>
                <SelectValue placeholder="Select your instinctual variant" />
              </SelectTrigger>
              <SelectContent>
                {instinctualVariants.map((variant) => (
                  <SelectItem key={variant.value} value={variant.value}>
                    {variant.label} ({variant.description})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tritype">Tritype</Label>
            <Input
              id="tritype"
              placeholder="Enter your tritype (e.g., 514)"
              value={tritype}
              onChange={(e) => setTritype(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtype">Subtype</Label>
            <Input
              id="subtype"
              placeholder="Enter your subtype"
              value={subtype}
              onChange={(e) => setSubtype(e.target.value)}
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
            <Button onClick={cycleGradient} disabled={!enneagramType}>
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
                    className={`h-[40px] flex items-center justify-between px-3 text-white ${enneagramType ? getHeaderGradientByEnneagram(enneagramType) : "bg-gray-700"}`}
                  >
                    <div className="text-sm font-bold">Enneagram ID</div>
                    <div className="text-sm">{randomId}</div>
                  </div>

                  {/* Body */}
                  <div
                    className={`h-[124px] flex p-3 text-white ${enneagramType ? getGradientByEnneagram(enneagramType) : "bg-gray-600"}`}
                  >
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
                      <div className="text-sm mt-1">
                        {enneagramType ? `Type ${enneagramType}` : "Enneagram Type"}{wing}
                      </div>
                      {instinctualVariant && (
                        <div className="text-xs mt-1">
                          {instinctualVariants.find((v) => v.value === instinctualVariant)?.label || instinctualVariant}
                        </div>
                      )}
                      {tritype && <div className="text-xs mt-1">Tritype: {tritype}</div>}
                      {subtype && <div className="text-xs mt-1">Subtype: {subtype}</div>}

                      {/* Status text */}
                      <div className="absolute top-[60px] right-[20px] text-[10px]">
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
                    className={`h-[40px] flex items-center justify-between px-3 text-white ${enneagramType ? getGradientByEnneagram(enneagramType) : "bg-gray-600"}`}
                  >
                    <div className="text-xs">{randomId}</div>
                    <div className="text-[8px] absolute left-1/2 transform -translate-x-1/2 bottom-[12px]">
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button onClick={() => downloadCard("template1")} disabled={!name || !enneagramType || isGenerating}>
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
                  className={`rounded-lg overflow-hidden shadow-lg mx-auto flex flex-col items-center justify-center p-6 text-white ${enneagramType ? getGradientByEnneagram(enneagramType) : "bg-gray-600"}`}
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
                    <div className="text-4xl font-extrabold mb-2">
                      {enneagramType ? `Type ${enneagramType}` : "Enneagram"}{wing}
                    </div>
                    {instinctualVariant && (
                      <div className="text-xl mb-1">
                        {instinctualVariants.find((v) => v.value === instinctualVariant)?.label || instinctualVariant}
                      </div>
                    )}
                    {tritype && <div className="text-base mb-1">Tritype: {tritype}</div>}
                    {subtype && <div className="text-base mb-2">Subtype: {subtype}</div>}
                    <div className="text-xs opacity-70">{creationDate}</div>
                  </div>

                  {/* Bottom decorative line */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-[1px] bg-white/30"></div>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button onClick={() => downloadCard("template2")} disabled={!name || !enneagramType || isGenerating}>
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
