"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Download, RefreshCw, Camera, User, Shield, Type } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// SCP Foundation clearance levels
const clearanceLevels = [
  { value: "0", label: "Level 0 - Unrestricted", color: "bg-gray-500" },
  { value: "1", label: "Level 1 - Restricted", color: "bg-green-600" },
  { value: "2", label: "Level 2 - Confidential", color: "bg-blue-600" },
  { value: "3", label: "Level 3 - Secret", color: "bg-yellow-600" },
  { value: "4", label: "Level 4 - Top Secret", color: "bg-orange-600" },
  { value: "5", label: "Level 5 - Thaumiel", color: "bg-red-600" },
  { value: "6", label: "Level 6 - Cosmic Top Secret", color: "bg-purple-600" },
]

// SCP Foundation departments with styling
const departments = [
  {
    id: "research",
    name: "Research",
    primaryColor: "#1d4ed8", // blue
    secondaryColor: "#1e293b",
    accentColor: "#f8fafc",
    borderWidth: 2,
    borderRadius: 8,
    layout: "landscape",
    tagline: "Advancing Knowledge of Anomalous Phenomena",
    quote: "Secure. Contain. Protect.",
  },
  {
    id: "security",
    name: "Security",
    primaryColor: "#b91c1c", // red
    secondaryColor: "#1e1e1e",
    accentColor: "#f8fafc",
    borderWidth: 3,
    borderRadius: 0,
    layout: "landscape",
    tagline: "Protecting Foundation Assets and Personnel",
    quote: "Vigilance is the price of safety.",
  },
  {
    id: "containment",
    name: "Containment",
    primaryColor: "#ca8a04", // yellow
    secondaryColor: "#292524",
    accentColor: "#f8fafc",
    borderWidth: 2,
    borderRadius: 4,
    layout: "landscape",
    tagline: "Secure. Contain. Protect.",
    quote: "What we contain, we control.",
  },
  {
    id: "medical",
    name: "Medical",
    primaryColor: "#16a34a", // green
    secondaryColor: "#1e293b",
    accentColor: "#f8fafc",
    fontFamily: "serif",
    borderWidth: 2,
    borderRadius: 12,
    layout: "landscape",
    tagline: "Healing the Impossible",
    quote: "To heal is to understand.",
  },
  {
    id: "technical",
    name: "Technical",
    primaryColor: "#7c3aed", // purple
    secondaryColor: "#1e293b",
    accentColor: "#f8fafc",
    fontFamily: "monospace",
    borderWidth: 1,
    borderRadius: 6,
    layout: "landscape",
    tagline: "Engineering Solutions for Anomalous Challenges",
    quote: "Innovation is our greatest tool.",
  },
  {
    id: "administrative",
    name: "Administrative",
    primaryColor: "#475569", // slate
    secondaryColor: "#f8fafc",
    accentColor: "#0f172a",
    fontFamily: "serif",
    borderWidth: 1,
    borderRadius: 4,
    layout: "landscape",
    tagline: "Maintaining Order in Chaos",
    quote: "Order from chaos, structure from anomaly.",
  },
  {
    id: "mobile-task-force",
    name: "Mobile Task Force",
    primaryColor: "#0f766e", // teal
    secondaryColor: "#0c0c0c",
    accentColor: "#f8fafc",
    fontFamily: "monospace",
    borderWidth: 3,
    borderRadius: 0,
    layout: "landscape",
    tagline: "First In, Last Out",
    quote: "We face what others fear.",
  },
  {
    id: "ethics-committee",
    name: "Ethics Committee",
    primaryColor: "#4338ca", // indigo
    secondaryColor: "#f8fafc",
    accentColor: "#1e1b4b",
    fontFamily: "serif",
    borderWidth: 1,
    borderRadius: 8,
    layout: "landscape",
    tagline: "Humanity Above All",
    quote: "The moral compass in an anomalous world.",
  },
  {
    id: "o5-council",
    name: "O5 Council",
    primaryColor: "#000000", // black
    secondaryColor: "#1e1e1e",
    accentColor: "#d4af37", // gold
    fontFamily: "serif",
    borderWidth: 2,
    borderRadius: 0,
    layout: "landscape",
    tagline: "Overseer Council",
    quote: "We decide what must be done.",
  },
]

// SCP Foundation sites with styling modifiers
const sites = [
  {
    id: "site-19",
    name: "Site-19",
    colorModifier: 0, // no change
    borderModifier: 0, // no change
    radiusModifier: 0, // no change
    watermarkText: "SITE-19",
    description: "Primary containment facility",
  },
  {
    id: "site-17",
    name: "Site-17",
    colorModifier: 20, // lighten
    borderModifier: -1, // thinner
    radiusModifier: 2, // more rounded
    watermarkText: "SITE-17",
    description: "Humanoid containment specialists",
  },
  {
    id: "site-06-3",
    name: "Site-06-3",
    colorModifier: -20, // darken
    borderModifier: 1, // thicker
    radiusModifier: -2, // less rounded
    watermarkText: "SITE-06-3",
    description: "Biological research center",
  },
  {
    id: "site-64",
    name: "Site-64",
    colorModifier: 10, // slightly lighter
    borderModifier: 0, // no change
    radiusModifier: 4, // more rounded
    watermarkText: "SITE-64",
    description: "Temporal anomaly research",
  },
  {
    id: "site-81",
    name: "Site-81",
    colorModifier: -10, // slightly darker
    borderModifier: 1, // thicker
    radiusModifier: -4, // less rounded
    watermarkText: "SITE-81",
    description: "Dimensional research",
  },
  {
    id: "area-12",
    name: "Area-12",
    colorModifier: 30, // much lighter
    borderModifier: -1, // thinner
    radiusModifier: 0, // no change
    watermarkText: "AREA-12",
    description: "Desert testing facility",
  },
  {
    id: "sector-25",
    name: "Sector-25",
    colorModifier: -30, // much darker
    borderModifier: 2, // much thicker
    radiusModifier: 0, // no change
    watermarkText: "SECTOR-25",
    description: "Deep sea research",
  },
  {
    id: "outpost-45",
    name: "Outpost-45",
    colorModifier: 0, // no change
    borderModifier: -2, // much thinner
    radiusModifier: 6, // very rounded
    watermarkText: "OUTPOST-45",
    description: "Arctic monitoring station",
  },
]

// Helper function to adjust color brightness
function adjustColorBrightness(hex: string, percent: number) {
  // Convert hex to RGB
  let r = Number.parseInt(hex.substring(1, 3), 16)
  let g = Number.parseInt(hex.substring(3, 5), 16)
  let b = Number.parseInt(hex.substring(5, 7), 16)

  // Adjust brightness
  r = Math.min(255, Math.max(0, r + (r * percent) / 100))
  g = Math.min(255, Math.max(0, g + (g * percent) / 100))
  b = Math.min(255, Math.max(0, b + (b * percent) / 100))

  // Convert back to hex
  return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g).toString(16).padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`
}

export default function SCPIDCardGenerator() {
  const { toast } = useToast()
  const cardRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("content")

  // Card content state
  const [formData, setFormData] = useState({
    name: "Dr. Jane Doe",
    id: "SCP-" + Math.floor(10000 + Math.random() * 90000).toString(),
    department: "research",
    site: "site-19",
    clearanceLevel: "3",
    position: "Senior Researcher",
    photo: "",
    useDefaultPhoto: true,
    issueDate: new Date().toISOString().split("T")[0],
    fontFamily: "sans-serif",
  })

  // Generate random ID when component mounts
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      id: "SCP-" + Math.floor(10000 + Math.random() * 90000).toString(),
    }))
  }, [])

  // Handle form data changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            photo: event.target?.result as string,
            useDefaultPhoto: false,
          }))
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  // Handle switch toggle
  const handleSwitchChange = (name: string, checked: boolean) => {
    if (name === "useDefaultPhoto") {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    }
  }

  // Generate random ID
  const generateRandomID = () => {
    setFormData((prev) => ({
      ...prev,
      id: "SCP-" + Math.floor(10000 + Math.random() * 90000).toString(),
    }))
    toast({
      title: "ID Updated",
      description: "A new random ID has been generated.",
    })
  }

  // Download card as image
  const downloadCard = () => {
    if (cardRef.current) {
      toast({
        title: "Generating Image",
        description: "Please wait while we prepare your ID card...",
      })

      toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        quality: 4,      })
        .then((dataUrl) => {
          const link = document.createElement("a")
          link.download = `${formData.name.replace(/\s+/g, "_")}_SCP_ID_Card.png`
          link.href = dataUrl
          link.click()

          toast({
            title: "Download Complete",
            description: "Your SCP ID card has been downloaded.",
          })
        })
        .catch((err) => {
          console.error(err)
          toast({
            title: "Download Failed",
            description: "There was an error generating your ID card.",
            variant: "destructive",
          })
        })
    }
  }

  // Reset to default settings
  const resetDefaults = () => {
    setFormData({
      name: "Dr",
      id: "SCP-" + Math.floor(10000 + Math.random() * 90000).toString(),
      department: "research",
      site: "site-19",
      clearanceLevel: "3",
      position: "Senior Researcher",
      photo: "",
      useDefaultPhoto: true,
      issueDate: new Date().toISOString().split("T")[0],
      fontFamily: "sans-serif",
    })

    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    })
  }

  // Get clearance level color
  const getClearanceLevelColor = () => {
    const level = clearanceLevels.find((l) => l.value === formData.clearanceLevel)
    return level ? level.color : "bg-gray-500"
  }

  // Get clearance level label
  const getClearanceLevelLabel = () => {
    const level = clearanceLevels.find((l) => l.value === formData.clearanceLevel)
    return level ? level.label : "Unknown"
  }

  // Get department styling
  const getDepartmentStyling = () => {
    const department = departments.find((d) => d.id === formData.department)
    const site = sites.find((s) => s.id === formData.site)

    if (!department || !site) return departments[0]

    // Apply site modifiers to department styling
    const primaryColor = adjustColorBrightness(department.primaryColor, site.colorModifier)
    const borderWidth = Math.max(0, department.borderWidth + site.borderModifier)
    const borderRadius = Math.max(0, department.borderRadius + site.radiusModifier)

    return {
      ...department,
      primaryColor,
      borderWidth,
      borderRadius,
      watermarkText: site.watermarkText,
      siteDescription: site.description,
    }
  }

  // Get current styling
  const currentStyle = getDepartmentStyling()

  // Get department quote
  const getDepartmentQuote = () => {
    const department = departments.find((d) => d.id === formData.department)
    return department?.quote || "Secure. Contain. Protect."
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">SCP Foundation ID Card Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Controls */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Personnel Information</span>
              </TabsTrigger>
              <TabsTrigger value="photo" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span>Photo</span>
              </TabsTrigger>
              <TabsTrigger value="style" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span>Typography</span>
              </TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Personnel Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Dr. Jane Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="id">ID Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="id"
                          name="id"
                          value={formData.id}
                          onChange={handleFormChange}
                          placeholder="SCP-12345"
                        />
                        <Button variant="outline" size="icon" onClick={generateRandomID} title="Generate Random ID">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleFormChange}
                        placeholder="Senior Researcher"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => handleSelectChange("department", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="site">Site</Label>
                      <Select value={formData.site} onValueChange={(value) => handleSelectChange("site", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select site" />
                        </SelectTrigger>
                        <SelectContent>
                          {sites.map((site) => (
                            <SelectItem key={site.id} value={site.id}>
                              {site.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clearanceLevel">Clearance Level</Label>
                      <Select
                        value={formData.clearanceLevel}
                        onValueChange={(value) => handleSelectChange("clearanceLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select clearance level" />
                        </SelectTrigger>
                        <SelectContent>
                          {clearanceLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issueDate">Issue Date</Label>
                      <Input
                        id="issueDate"
                        name="issueDate"
                        type="date"
                        value={formData.issueDate}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Photo Tab */}
            <TabsContent value="photo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Photo Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch
                      id="useDefaultPhoto"
                      checked={formData.useDefaultPhoto}
                      onCheckedChange={(checked) => handleSwitchChange("useDefaultPhoto", checked)}
                    />
                    <Label htmlFor="useDefaultPhoto">Use Default SCP Logo as Photo</Label>
                  </div>

                  {!formData.useDefaultPhoto && (
                    <div className="space-y-4">
                      <Label htmlFor="photoUpload">Upload Photo</Label>
                      <Input id="photoUpload" type="file" accept="image/*" onChange={handlePhotoUpload} />

                      {formData.photo && (
                        <div className="mt-4">
                          <Label>Photo Preview</Label>
                          <div className="mt-2 border rounded-md overflow-hidden w-32 h-32">
                            <img
                              src={formData.photo || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="style" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Typography Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <RadioGroup
                      value={formData.fontFamily}
                      onValueChange={(value) => handleSelectChange("fontFamily", value)}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sans-serif" id="sans-serif" />
                        <Label htmlFor="sans-serif" className="font-sans">
                          Sans-serif
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="serif" id="serif" />
                        <Label htmlFor="serif" className="font-serif">
                          Serif
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex flex-wrap gap-4">
            <Button onClick={downloadCard} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download ID Card
            </Button>

            <Button variant="outline" onClick={resetDefaults} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>

          <div
            ref={cardRef}
            className={cn(
              "relative overflow-hidden transition-all duration-300",
              currentStyle.layout === "landscape" ? "w-[350px] h-[220px]" : "w-[220px] h-[350px]",
              "flex flex-col",
            )}
            style={{
              backgroundColor: currentStyle.secondaryColor,
              color: currentStyle.accentColor,
              borderRadius: `${currentStyle.borderRadius}px`,
              border: `${currentStyle.borderWidth}px solid ${currentStyle.primaryColor}`,
              fontFamily: formData.fontFamily,
            }}
          >
            {/* Header */}
            <div
              className="p-2 flex items-center justify-between"
              style={{ backgroundColor: currentStyle.primaryColor }}
            >
              <div>
                <h3 className="font-bold text-lg">SCP FOUNDATION</h3>
              </div>
              <div className="text-xs font-mono">{formData.id}</div>
            </div>

            {/* Content */}
            <div className="flex-1 p-3 flex">
              {/* Photo Section */}
              <div className="mr-3 flex flex-col">
                <div className="w-20 h-24 overflow-hidden border-2" style={{ borderColor: currentStyle.primaryColor }}>
                  {formData.useDefaultPhoto ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <img
                        src="https://img.icons8.com/?size=512&id=ESxutivXGIed&format=png"
                        alt="SCP Logo"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  ) : formData.photo ? (
                    <img
                      src={formData.photo || "/placeholder.svg"}
                      alt="ID Photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <User className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="text-[8px] mt-1 text-center">{formData.issueDate}</div>
              </div>

              {/* Info Section */}
              <div className="flex-1 text-sm">
                <h4 className="font-bold text-base mb-1">{formData.name}</h4>

                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2">
                  <div>
                    <p className="text-xs opacity-70">Position:</p>
                    <p className="text-xs">{formData.position}</p>
                  </div>

                  <div>
                    <p className="text-xs opacity-70">Department:</p>
                    <p className="text-xs">{departments.find((d) => d.id === formData.department)?.name}</p>
                  </div>

                  <div>
                    <p className="text-xs opacity-70">Site:</p>
                    <p className="text-xs">{sites.find((s) => s.id === formData.site)?.name}</p>
                  </div>

                  <div>
                    <p className="text-xs opacity-70">Clearance:</p>
                    <div className="flex items-center gap-1">
                      <span className={`inline-block w-3 h-3 rounded-full ${getClearanceLevelColor()}`}></span>
                      <p className="text-xs">Level {formData.clearanceLevel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="p-2 text-[10px] flex justify-between items-center relative"
              style={{ backgroundColor: "transparent" }}
            >
              {/* Quote on the left side */}
              <div className="text-left italic opacity-80 max-w-[80%] truncate">"{getDepartmentQuote()}"</div>

              {/* Bottom-right Logo */}
              <div className="w-5 h-5 bg-transparent overflow-hidden flex items-center justify-center">
                <img
                  src="https://i.ibb.co/9mRqNgbV/6e9ba3777b760aa9994af3b520146b0c.png"
                  alt="SCP Logo"
                  className="w-4 h-4 object-contain"
                />
              </div>
            </div>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 rotate-45 text-4xl font-bold">
              {currentStyle.watermarkText}
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Click "Download ID Card" to save your customized SCP ID card</p>
          </div>

          {/* Site and Department Info */}
          <div className="mt-6 w-full">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Selected Department & Site Info</CardTitle>
              </CardHeader>
              <CardContent className="py-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-semibold">
                      {departments.find((d) => d.id === formData.department)?.name} Department
                    </p>
                    <p className="text-xs text-gray-500">
                      {departments.find((d) => d.id === formData.department)?.tagline}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">{sites.find((s) => s.id === formData.site)?.name}</p>
                    <p className="text-xs text-gray-500">{sites.find((s) => s.id === formData.site)?.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
