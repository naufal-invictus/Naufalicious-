"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, Plus, Trash2, Heart, Calendar, Mail, Phone, MapPin, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// MBTI-inspired romantic templates with vibrant gradients
const mbtiTemplates = {
  INTJ: {
    name: "Mystical Strategist",
    gradient: "linear-gradient(135deg, #1a237e 0%, #7b1fa2 50%, #b71c1c 100%)",
    primary: "#1a237e", // Deep Blue
    secondary: "#7b1fa2", // Purple
    accent: "#b71c1c", // Deep Red
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #f5f5f5 0%, #e8eaf6 100%)",
    font: "'Playfair Display', serif",
    description: "Deep, mysterious, and intellectually stimulating",
  },
  INTP: {
    name: "Thoughtful Dreamer",
    gradient: "linear-gradient(135deg, #0d47a1 0%, #00838f 50%, #006064 100%)",
    primary: "#0d47a1", // Strong Blue
    secondary: "#00838f", // Teal
    accent: "#006064", // Dark Teal
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #e3f2fd 0%, #e0f7fa 100%)",
    font: "'Montserrat', sans-serif",
    description: "Imaginative, curious, and full of wonder",
  },
  ENTJ: {
    name: "Passionate Leader",
    gradient: "linear-gradient(135deg, #880e4f 0%, #4a148c 50%, #311b92 100%)",
    primary: "#880e4f", // Deep Pink
    secondary: "#4a148c", // Deep Purple
    accent: "#311b92", // Indigo
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)",
    font: "'Raleway', sans-serif",
    description: "Bold, decisive, and intensely devoted",
  },
  ENTP: {
    name: "Charming Innovator",
    gradient: "linear-gradient(135deg, #e65100 0%, #bf360c 50%, #1565c0 100%)",
    primary: "#e65100", // Deep Orange
    secondary: "#bf360c", // Deep Orange/Red
    accent: "#1565c0", // Blue
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #fff3e0 0%, #e3f2fd 100%)",
    font: "'Lato', sans-serif",
    description: "Witty, adventurous, and endlessly fascinating",
  },
  INFJ: {
    name: "Soulful Romantic",
    gradient: "linear-gradient(135deg, #4527a0 0%, #283593 50%, #ad1457 100%)",
    primary: "#4527a0", // Deep Purple
    secondary: "#283593", // Indigo
    accent: "#ad1457", // Pink
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #ede7f6 0%, #f8bbd0 100%)",
    font: "'Cormorant Garamond', serif",
    description: "Deep, empathetic, and profoundly connected",
  },
  INFP: {
    name: "Poetic Idealist",
    gradient: "linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 50%, #00695c 100%)",
    primary: "#7b1fa2", // Purple
    secondary: "#6a1b9a", // Deep Purple
    accent: "#00695c", // Teal
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #f3e5f5 0%, #e0f2f1 100%)",
    font: "'Crimson Text', serif",
    description: "Gentle, compassionate, and deeply feeling",
  },
  ENFJ: {
    name: "Devoted Inspirer",
    gradient: "linear-gradient(135deg, #c2185b 0%, #7b1fa2 50%, #00695c 100%)",
    primary: "#c2185b", // Pink
    secondary: "#7b1fa2", // Purple
    accent: "#00695c", // Teal
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #fce4ec 0%, #e0f2f1 100%)",
    font: "'Libre Baskerville', serif",
    description: "Warm, supportive, and passionately committed",
  },
  ENFP: {
    name: "Enthusiastic Dreamer",
    gradient: "linear-gradient(135deg, #f57c00 0%, #ff9800 50%, #0288d1 100%)",
    primary: "#f57c00", // Orange
    secondary: "#ff9800", // Light Orange
    accent: "#0288d1", // Light Blue
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #fff3e0 0%, #e1f5fe 100%)",
    font: "'Quicksand', sans-serif",
    description: "Vibrant, spontaneous, and full of joy",
  },
  ISTJ: {
    name: "Steadfast Protector",
    gradient: "linear-gradient(135deg, #455a64 0%, #37474f 50%, #0277bd 100%)",
    primary: "#455a64", // Blue Grey
    secondary: "#37474f", // Dark Blue Grey
    accent: "#0277bd", // Light Blue
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #eceff1 0%, #e1f5fe 100%)",
    font: "'Merriweather', serif",
    description: "Reliable, loyal, and deeply committed",
  },
  ISFJ: {
    name: "Nurturing Guardian",
    gradient: "linear-gradient(135deg, #5d4037 0%, #4e342e 50%, #558b2f 100%)",
    primary: "#5d4037", // Brown
    secondary: "#4e342e", // Dark Brown
    accent: "#558b2f", // Light Green
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #efebe9 0%, #f1f8e9 100%)",
    font: "'Source Serif Pro', serif",
    description: "Caring, attentive, and endlessly supportive",
  },
  ESTJ: {
    name: "Devoted Provider",
    gradient: "linear-gradient(135deg, #0d47a1 0%, #01579b 50%, #b71c1c 100%)",
    primary: "#0d47a1", // Blue
    secondary: "#01579b", // Dark Cyan
    accent: "#b71c1c", // Red
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #e3f2fd 0%, #ffebee 100%)",
    font: "'Roboto Slab', serif",
    description: "Dependable, structured, and deeply committed",
  },
  ESFJ: {
    name: "Harmonious Caretaker",
    gradient: "linear-gradient(135deg, #00695c 0%, #004d40 50%, #ad1457 100%)",
    primary: "#00695c", // Teal
    secondary: "#004d40", // Dark Teal
    accent: "#ad1457", // Pink
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #e0f2f1 0%, #fce4ec 100%)",
    font: "'Josefin Sans', sans-serif",
    description: "Warm, social, and genuinely caring",
  },
  ISTP: {
    name: "Adventurous Craftsman",
    gradient: "linear-gradient(135deg, #37474f 0%, #263238 50%, #ff6f00 100%)",
    primary: "#37474f", // Dark Blue Grey
    secondary: "#263238", // Very Dark Blue Grey
    accent: "#ff6f00", // Amber
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #eceff1 0%, #fff8e1 100%)",
    font: "'Fira Sans', sans-serif",
    description: "Skilled, adaptable, and excitingly unpredictable",
  },
  ISFP: {
    name: "Gentle Artist",
    gradient: "linear-gradient(135deg, #ad1457 0%, #880e4f 50%, #00695c 100%)",
    primary: "#ad1457", // Pink
    secondary: "#880e4f", // Dark Pink
    accent: "#00695c", // Teal
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #fce4ec 0%, #e0f2f1 100%)",
    font: "'Dancing Script', cursive",
    description: "Sensitive, artistic, and deeply appreciative",
  },
  ESTP: {
    name: "Passionate Adventurer",
    gradient: "linear-gradient(135deg, #bf360c 0%, #d84315 50%, #0277bd 100%)",
    primary: "#bf360c", // Deep Orange
    secondary: "#d84315", // Orange
    accent: "#0277bd", // Light Blue
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #ffccbc 0%, #e1f5fe 100%)",
    font: "'Oswald', sans-serif",
    description: "Bold, exciting, and full of passion",
  },
  ESFP: {
    name: "Joyful Entertainer",
    gradient: "linear-gradient(135deg, #ff6f00 0%, #ff8f00 50%, #d81b60 100%)",
    primary: "#ff6f00", // Amber
    secondary: "#ff8f00", // Dark Amber
    accent: "#d81b60", // Pink
    text: "#ffffff", // White
    background: "linear-gradient(135deg, #fff8e1 0%, #fce4ec 100%)",
    font: "'Pacifico', cursive",
    description: "Fun-loving, warm, and irresistibly charming",
  },
}

type MBTIType = keyof typeof mbtiTemplates

// Batman Kebab's humorous sample data
const batmanKebabData = {
  fullName: "Batman Kebab",
  age: "35",
  email: "batman@kebab-cave.com",
  phone: "+1 (555) BAT-KEBAB",
  location: "Gotham City, Secret Kebab Alley",
  template: "ENFP" as MBTIType,
  romanticBio:
    "I may not be the hero Gotham deserves, but I'm definitely the one who knows the best late-night food spots.",
  whyChooseMe:
    "Look, I'm not saying dating me comes with free access to the Batcave, but I'm not NOT saying that either. I've been told my brooding stare can melt hearts faster than my batarangs can disarm villains.",
  futureIfYes:
    "I promise to remember your birthday, even when Joker is threatening the city. And yes, Alfred will make breakfast.",
  reasons: [
    { text: "I have a cool car. Like, really cool. It shoots flames and everything." },
    { text: "I'm financially stable (billionaire by day, remember?)" },
    { text: "I can do a really impressive gravelly voice that's great for scaring your enemies" },
  ],
  experiences: [
    { text: "I'd love to take you to my secret island that's definitely not called 'The Bat Island'" },
    { text: "We could fight crime together (or just watch crime shows while eating kebabs)" },
    { text: "We'll have fancy galas where I'll mysteriously disappear but always return with kebabs" },
  ],
  footerMessage: "With love and justice, Batman Kebab",
}

interface Reason {
  text: string
}

interface Experience {
  text: string
}

interface CVData {
  fullName: string
  age: string
  email: string
  phone: string
  location: string
  template: MBTIType
  romanticBio: string
  whyChooseMe: string
  futureIfYes: string
  reasons: Reason[]
  experiences: Experience[]
  footerMessage: string
}

// Add custom CSS directly in the component
const styles = {
  container: `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;600&family=Raleway:wght@300;400;600&family=Lato:wght@300;400;700&family=Cormorant+Garamond:wght@400;600&family=Crimson+Text:wght@400;600&family=Libre+Baskerville:wght@400;700&family=Quicksand:wght@300;400;600&family=Merriweather:wght@300;400;700&family=Source+Serif+Pro:wght@400;600&family=Roboto+Slab:wght@300;400;700&family=Josefin+Sans:wght@300;400;600&family=Fira+Sans:wght@300;400;600&family=Dancing+Script:wght@400;700&family=Oswald:wght@300;400;600&family=Pacifico&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Montserrat', sans-serif;
      background: linear-gradient(135deg, #f5f5f5 0%, #e8eaf6 50%, #fce4ec 100%);
      color: #333;
      line-height: 1.6;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    
    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    .a4 {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      margin: 0 auto;
      background-color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: relative;
    }
    
    @media print {
      body {
        margin: 0;
        padding: 0;
        background: none;
      }
      .a4 {
        width: 210mm;
        height: 297mm;
        padding: 10mm;
        margin: 0;
        box-shadow: none;
      }
      
      h1 {
        font-size: 20pt;
      }
      
      h2 {
        font-size: 16pt;
      }
      
      p, li, span {
        font-size: 8pt;
      }
      
      .section {
        margin-bottom: 15pt;
      }
      
      .cv-footer {
        position: relative;
        bottom: auto;
        margin-top: 20pt;
      }
    }
    
    @media (max-width: 768px) {
      .a4 {
        width: 100%;
        min-height: auto;
        padding: 1rem;
      }
    }

    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section {
      margin-bottom: 2rem;
    }

    .section-title {
      position: relative;
      margin-bottom: 1.5rem;
    }

    .section-content {
      border-radius: 0.5rem;
    }

    .cv-footer {
      position: absolute;
      bottom: 20mm;
      left: 20mm;
      right: 20mm;
      text-align: center;
      padding-top: 1rem;
    }
  `,
}

export default function RomanticCVGenerator() {
  // Initialize with Batman Kebab's data
  const [cvData, setCVData] = useState<CVData>(batmanKebabData)
  const [activeTab, setActiveTab] = useState("edit")
  const cvRef = useRef<HTMLDivElement>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCVData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTemplateChange = (value: string) => {
    setCVData((prev) => ({ ...prev, template: value as MBTIType }))
  }

  const handleReasonChange = (index: number, value: string) => {
    setCVData((prev) => {
      const newReasons = [...prev.reasons]
      newReasons[index] = { text: value }
      return { ...prev, reasons: newReasons }
    })
  }

  const addReason = () => {
    setCVData((prev) => ({
      ...prev,
      reasons: [...prev.reasons, { text: "" }],
    }))
  }

  const removeReason = (index: number) => {
    setCVData((prev) => {
      const newReasons = [...prev.reasons]
      newReasons.splice(index, 1)
      return { ...prev, reasons: newReasons }
    })
  }

  const handleExperienceChange = (index: number, value: string) => {
    setCVData((prev) => {
      const newExperiences = [...prev.experiences]
      newExperiences[index] = { text: value }
      return { ...prev, experiences: newExperiences }
    })
  }

  const addExperience = () => {
    setCVData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { text: "" }],
    }))
  }

  const removeExperience = (index: number) => {
    setCVData((prev) => {
      const newExperiences = [...prev.experiences]
      newExperiences.splice(index, 1)
      return { ...prev, experiences: newExperiences }
    })
  }

  // Fixed PDF generation function using window.jspdf and window.html2canvas
  const downloadPDF = async () => {
    if (!cvRef.current) return

    setIsGeneratingPDF(true)
    setPdfError(null)

    try {
      // Use a script tag to load the libraries directly
      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script")
          script.src = src
          script.onload = () => resolve()
          script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
          document.head.appendChild(script)
        })
      }

      // Load the required libraries if not already loaded
      if (!(window as any).html2canvas) {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js")
      }

      if (!(window as any).jspdf) {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js")
      }

      // Get references to the loaded libraries
      const html2canvas = (window as any).html2canvas
      const { jsPDF } = (window as any).jspdf

      // Create a clone of the CV element for PDF generation with reduced font sizes
      const originalElement = cvRef.current
      const clonedElement = originalElement.cloneNode(true) as HTMLElement

      // Apply PDF-specific styling to the clone
      clonedElement.style.position = "absolute"
      clonedElement.style.left = "-9999px"
      clonedElement.style.top = "-9999px"
      document.body.appendChild(clonedElement)

      // Reduce font sizes in the cloned element
      const headings = clonedElement.querySelectorAll("h1, h2, h3, h4, h5, h6")
      const paragraphs = clonedElement.querySelectorAll("p, span, li")

      headings.forEach((heading: HTMLElement) => {
        const currentSize = window.getComputedStyle(heading).fontSize
        const currentSizeValue = Number.parseFloat(currentSize)
        heading.style.fontSize = `${currentSizeValue * 0.85}px` // Reduce heading size by 15%
      })

      paragraphs.forEach((paragraph: HTMLElement) => {
        const currentSize = window.getComputedStyle(paragraph).fontSize
        const currentSizeValue = Number.parseFloat(currentSize)
        paragraph.style.fontSize = `${currentSizeValue * 0.75}px` // Reduce paragraph size by 25%
      })

      // Adjust spacing for more compact layout
      const sections = clonedElement.querySelectorAll(".section")
      sections.forEach((section: HTMLElement) => {
        section.style.marginBottom = "1.5rem" // Reduce section spacing
      })

      // Make the footer position relative instead of absolute to prevent cutoff
      const footer = clonedElement.querySelector(".cv-footer")
      if (footer) {
        ;(footer as HTMLElement).style.position = "relative"
        ;(footer as HTMLElement).style.bottom = "auto"
        ;(footer as HTMLElement).style.marginTop = "2rem"
      }

      // Generate PDF using the cloned element with reduced font sizes
      const canvas = await html2canvas(clonedElement, {
        scale: 2.0, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      // Remove the cloned element from the DOM
      document.body.removeChild(clonedElement)

      const imgData = canvas.toDataURL("image/jpeg", 1.0)

      // A4 dimensions in mm
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // If content exceeds a single page, handle pagination
      if (imgHeight > 297) {
        // A4 height in mm
        let heightLeft = imgHeight
        let position = 0
        let page = 1

        // Add first page
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
        heightLeft -= 297

        // Add subsequent pages if needed
        while (heightLeft > 0) {
          position = -297 * page
          pdf.addPage()
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
          heightLeft -= 297
          page++
        }
      } else {
        // Content fits on a single page
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight)
      }

      pdf.save(`${cvData.fullName.replace(/\s+/g, "_")}_Romantic_CV.pdf`)
      setIsGeneratingPDF(false)
    } catch (error) {
      console.error("PDF generation error:", error)
      setPdfError("Failed to generate PDF. Please try again.")
      setIsGeneratingPDF(false)
    }
  }

  const template = mbtiTemplates[cvData.template]
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <style jsx global>
        {styles.container}
      </style>
      <div className="container mx-auto py-8 px-4">
        <div
          className="text-center mb-8 p-8 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #ff6b6b 0%, #6b5b95 50%, #88d8b0 100%)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Romantic CV Generator</h1>
          <p className="text-white text-lg">Create a personalized romantic CV to express your feelings</p>
          <p className="text-white text-sm mt-2">Pre-filled with Batman Kebab's humorous content</p>
        </div>

        <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="edit">Edit CV</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Edit your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" value={cvData.fullName} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={cvData.email} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={cvData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" value={cvData.location} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template">Template Style</Label>
                    <Select value={cvData.template} onValueChange={handleTemplateChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Template Style" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(mbtiTemplates).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type} - {mbtiTemplates[type as MBTIType].name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="romanticBio">Romantic Bio</Label>
                  <Textarea
                    id="romanticBio"
                    name="romanticBio"
                    value={cvData.romanticBio}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why You Should Choose Me</CardTitle>
                <CardDescription>Your persuasive, poetic paragraph</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="whyChooseMe"
                  name="whyChooseMe"
                  value={cvData.whyChooseMe}
                  onChange={handleInputChange}
                  rows={6}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Future If You Say Yes</CardTitle>
                <CardDescription>Your imaginative and affectionate future plans</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="futureIfYes"
                  name="futureIfYes"
                  value={cvData.futureIfYes}
                  onChange={handleInputChange}
                  rows={6}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reasons to Choose Me</CardTitle>
                <CardDescription>List specific reasons why they should choose you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cvData.reasons.map((reason, index) => (
                  <div key={index} className="flex items-center space-x-2 space-y-0">
                    <Input
                      value={reason.text}
                      onChange={(e) => handleReasonChange(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeReason(index)}
                      disabled={cvData.reasons.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="mt-2" onClick={addReason}>
                  <Plus className="h-4 w-4 mr-2" /> Add Reason
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hopeful Experiences</CardTitle>
                <CardDescription>Share experiences you'd love to have together</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cvData.experiences.map((experience, index) => (
                  <div key={index} className="flex items-center space-x-2 space-y-0">
                    <Input
                      value={experience.text}
                      onChange={(e) => handleExperienceChange(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExperience(index)}
                      disabled={cvData.experiences.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="mt-2" onClick={addExperience}>
                  <Plus className="h-4 w-4 mr-2" /> Add Experience
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Footer Message</CardTitle>
                <CardDescription>Add a romantic or humorous closing message</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  id="footerMessage"
                  name="footerMessage"
                  value={cvData.footerMessage}
                  onChange={handleInputChange}
                  placeholder="With love, Your Name"
                />
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setActiveTab("preview")} className="flex items-center">
                <Eye className="mr-2 h-4 w-4" /> Preview
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <div className="flex justify-between mb-4">
              <Button variant="outline" onClick={() => setActiveTab("edit")} className="flex items-center">
                Back to Edit
              </Button>
              <Button
                onClick={downloadPDF}
                className="flex items-center"
                style={{
                  background: template.primary,
                  color: "white",
                }}
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </>
                )}
              </Button>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div
                ref={cvRef}
                className="w-full"
                style={{
                  width: "210mm",
                  minHeight: "297mm",
                  maxWidth: "100%",
                  margin: "0 auto",
                  backgroundColor: "#ffffff",
                  color: "#212121",
                  padding: "20mm",
                  boxSizing: "border-box",
                  fontFamily: template.font,
                  position: "relative",
                }}
              >
                {/* Header with simplified styling */}
                <div
                  style={{
                    backgroundColor: template.primary,
                    padding: "2rem",
                    marginBottom: "1.5rem",
                    borderRadius: "0.5rem",
                    color: "white",
                  }}
                >
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-1">{cvData.fullName}</h1>
                    <p className="text-lg italic mb-3">{template.description}</p>



                    {/* Contact information */}
                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                      {cvData.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{cvData.email}</span>
                        </div>
                      )}
                      {cvData.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{cvData.phone}</span>
                        </div>
                      )}
                      {cvData.location && (
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{cvData.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Two-column layout for main content */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left column - 60% width */}
                  <div className="w-full md:w-3/5">
                    {/* Romantic Bio */}
                    {cvData.romanticBio && (
                      <div className="section">
                        <h2
                          className="section-title text-2xl font-semibold mb-4"
                          style={{
                            color: template.primary,
                            borderBottom: `2px solid ${template.primary}`,
                            paddingBottom: "0.5rem",
                          }}
                        >
                          About Me
                        </h2>
                        <div
                          className="section-content p-4 rounded-lg"
                          style={{
                            backgroundColor: "#f5f5f5",
                            borderLeft: `4px solid ${template.primary}`,
                          }}
                        >
                          <p className="text-lg leading-relaxed" style={{ fontStyle: "italic" }}>
                            {cvData.romanticBio}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Why You Should Choose Me */}
                    {cvData.whyChooseMe && (
                      <div className="section">
                        <h2
                          className="section-title text-2xl font-semibold mb-4"
                          style={{
                            color: template.primary,
                            borderBottom: `2px solid ${template.primary}`,
                            paddingBottom: "0.5rem",
                          }}
                        >
                          Why You Should Choose Me
                        </h2>
                        <div
                          className="section-content p-4 rounded-lg"
                          style={{
                            backgroundColor: "#f5f5f5",
                            borderLeft: `4px solid ${template.secondary}`,
                          }}
                        >
                          <p className="text-lg leading-relaxed">{cvData.whyChooseMe}</p>
                        </div>
                      </div>
                    )}

                    {/* Our Future If You Say Yes */}
                    {cvData.futureIfYes && (
                      <div className="section">
                        <h2
                          className="section-title text-2xl font-semibold mb-4"
                          style={{
                            color: template.primary,
                            borderBottom: `2px solid ${template.primary}`,
                            paddingBottom: "0.5rem",
                          }}
                        >
                          Our Future If You Say Yes
                        </h2>
                        <div
                          className="section-content p-6 rounded-lg"
                          style={{
                            backgroundColor: "#f5f5f5",
                            border: `1px solid ${template.secondary}`,
                          }}
                        >
                          <p className="text-lg leading-relaxed" style={{ fontStyle: "italic" }}>
                            {cvData.futureIfYes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right column - 40% width */}
                  <div className="w-full md:w-2/5">
                    {/* Reasons to Choose Me */}
                    {cvData.reasons.some((reason) => reason.text) && (
                      <div className="section">
                        <h2
                          className="section-title text-2xl font-semibold mb-4"
                          style={{
                            color: template.primary,
                            borderBottom: `2px solid ${template.primary}`,
                            paddingBottom: "0.5rem",
                          }}
                        >
                          Reasons to Choose Me
                        </h2>
                        <ul className="space-y-3">
                          {cvData.reasons.map(
                            (reason, index) =>
                              reason.text && (
                                <li
                                  key={index}
                                  className="flex items-start p-2 rounded-lg"
                                  style={{
                                    marginBottom: "0.75rem",
                                    backgroundColor: "#f5f5f5",
                                    borderLeft: `3px solid ${template.primary}`,
                                  }}
                                >
                                  <Heart
                                    className="h-5 w-5 mr-3 flex-shrink-0 mt-1"
                                    style={{
                                      color: template.primary,
                                    }}
                                  />
                                  <span className="text-base">{reason.text}</span>
                                </li>
                              ),
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Hopeful Experiences */}
                    {cvData.experiences.some((exp) => exp.text) && (
                      <div className="section">
                        <h2
                          className="section-title text-2xl font-semibold mb-4"
                          style={{
                            color: template.primary,
                            borderBottom: `2px solid ${template.primary}`,
                            paddingBottom: "0.5rem",
                          }}
                        >
                          Experiences I'd Love to Share With You
                        </h2>
                        <ul className="space-y-3">
                          {cvData.experiences.map(
                            (experience, index) =>
                              experience.text && (
                                <li
                                  key={index}
                                  className="flex items-start p-2 rounded-lg"
                                  style={{
                                    marginBottom: "0.75rem",
                                    backgroundColor: "#f5f5f5",
                                    borderLeft: `3px solid ${template.accent}`,
                                  }}
                                >
                                  <Heart
                                    className="h-5 w-5 mr-3 flex-shrink-0 mt-1"
                                    style={{
                                      color: template.accent,
                                    }}
                                  />
                                  <span className="text-base">{experience.text}</span>
                                </li>
                              ),
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>


              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={downloadPDF}
                className="flex items-center px-8 py-6 text-lg"
                style={{
                  backgroundColor: template.primary,
                  color: "white",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                }}
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-6 w-6" /> Download Your Romantic CV
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Error Dialog - Fixed HTML structure issue */}
      <Dialog open={!!pdfError} onOpenChange={() => setPdfError(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>PDF Generation Error</DialogTitle>
            <div className="text-sm text-muted-foreground">
              {pdfError}
              <div className="mt-2">Try simplifying your CV content or using a different browser.</div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
