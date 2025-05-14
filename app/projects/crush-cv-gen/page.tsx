"use client"

import type React from "react"
import { useState, useRef } from "react"

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

const batmanKebabData = {
  fullName: "Batman Kebab",
  age: "35",
  email: "batman@kebab-cave.com",
  phone: "+1 (555) BAT-KEBAB",
  location: "Gotham City, Secret Kebab Alley",
  template: "ENFP" as MBTIType,
  romanticBio:
    " I may not be the hero Gotham deserves, but I'm definitely the one who knows the best late-night food spots.",
  whyChooseMe:
    "Look, I'm not saying dating me comes with free access to the Batcave, but I'm not NOT saying that either. I've been told my brooding stare can melt hearts faster than my batarangs can disarm villains..",
  futureIfYes:
    "Imagine moonlit glides across Gotham's skyline, picnics on rooftops, and having someone who will always, ALWAYS, be there to save you from awkward conversations at parties by suddenly disappearing. I promise to remember your birthday, even when Joker is threatening the city. And yes, Alfred will make breakfast.",
  reasons: [
    { text: "I have a cool car. Like, really cool. It shoots flames and everything." },
    { text: "I'm financially stable (billionaire by day, remember?)" },
    { text: "I'm literally Batman, but with a deep appreciation for Mediterranean cuisine" },
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
        padding: 0;
        margin: 0;
        box-shadow: none;
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
