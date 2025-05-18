"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Download,
  RefreshCw,
  Camera,
  User,
  Shield,
  Type,
  FileText,
  ClipboardCheck,
  ExternalLink,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

// SCP Foundation clearance levels
const clearanceLevels = [
  {
    value: "1",
    label: "Level 1 - Restricted",
    color: "bg-green-600",
    description: "Basic access to non-sensitive information and standard containment procedures.",
    icon: "🔓",
  },
  {
    value: "2",
    label: "Level 2 - Confidential",
    color: "bg-blue-600",
    description: "Access to low-risk anomalies and research data. Standard for most research personnel.",
    icon: "🔐",
  },
  {
    value: "3",
    label: "Level 3 - Secret",
    color: "bg-yellow-600",
    description: "Access to most anomalies and containment procedures. Required for field operations.",
    icon: "🔒",
  },
  {
    value: "4",
    label: "Level 4 - Top Secret",
    color: "bg-orange-600",
    description: "Access to dangerous anomalies and sensitive research. Limited to senior personnel.",
    icon: "⚠️",
  },
  {
    value: "5",
    label: "Level 5 - Thaumiel",
    color: "bg-red-600",
    description: "Access to reality-altering anomalies and critical operations. Department heads only.",
    icon: "⚡",
  },
  {
    value: "6",
    label: "Level 6 - Cosmic Top Secret",
    color: "bg-purple-600",
    description: "Access to existential threats and O5 Council operations. Extremely restricted.",
    icon: "🌌",
  },
  {
    value: "7",
    label: "Level 7 - O5 Clearance",
    color: "bg-purple-900",
    description: "Reserved for O5 Council members only. Access to all Foundation information.",
    icon: "👁️",
  },
  {
    value: "8",
    label: "Level 8 - Overseer",
    color: "bg-black",
    description: "Full access to all Foundation information and operations. O5 Council leadership.",
    icon: "🔱",
  },
  {
    value: "9",
    label: "Level 9 - Administrator",
    color: "bg-black",
    description: "Reserved for the Administrator of the Foundation. Near-unlimited authority.",
    icon: "👑",
  },
  {
    value: "10",
    label: "Level 10 - Omni",
    color: "bg-black",
    description: "Theoretical unlimited access level. May not actually exist.",
    icon: "🔮",
  },
  {
    value: "11",
    label: "Level 11 - Esoteric",
    color: "bg-black",
    description: "Access to reality-bending operations and anomalies beyond human comprehension.",
    icon: "🌀",
  },
  {
    value: "12",
    label: "Level 12 - Terminal",
    color: "bg-black",
    description: "Access to world-ending scenarios and protocols. The highest known clearance level.",
    icon: "☠️",
  },
]

// SCP Foundation roles with descriptions
const scpRoles = [
  {
    id: "researcher",
    name: "Researcher",
    description: "Specializes in studying anomalous phenomena and developing containment procedures.",
    icon: "🔬",
    minClearance: 2,
    maxClearance: 5,
    mbtiTypes: ["INTJ", "INTP", "ISTJ", "INFJ"],
    traits: {
      analytical: true,
      curious: true,
      methodical: true,
    },
  },
  {
    id: "security",
    name: "Security Officer",
    description: "Responsible for maintaining physical security of Foundation facilities and personnel.",
    icon: "🛡️",
    minClearance: 1,
    maxClearance: 4,
    mbtiTypes: ["ESTJ", "ISTJ", "ESTP", "ISFP"],
    traits: {
      protective: true,
      disciplined: true,
      vigilant: true,
    },
  },
  {
    id: "containment",
    name: "Containment Specialist",
    description: "Expert in designing and implementing containment systems for anomalous entities.",
    icon: "📦",
    minClearance: 2,
    maxClearance: 5,
    mbtiTypes: ["ISTP", "ISTJ", "INTJ", "ESTJ"],
    traits: {
      practical: true,
      detail_oriented: true,
      cautious: true,
    },
  },
  {
    id: "medical",
    name: "Medical Officer",
    description: "Provides healthcare to Foundation personnel and studies anomalous biological effects.",
    icon: "⚕️",
    minClearance: 2,
    maxClearance: 4,
    mbtiTypes: ["ISFJ", "INFJ", "ESFJ", "ENFJ"],
    traits: {
      empathetic: true,
      detail_oriented: true,
      adaptable: true,
    },
  },
  {
    id: "technical",
    name: "Technical Specialist",
    description: "Develops and maintains specialized equipment for anomaly research and containment.",
    icon: "⚙️",
    minClearance: 2,
    maxClearance: 4,
    mbtiTypes: ["INTP", "ISTP", "ENTP", "ENTJ"],
    traits: {
      innovative: true,
      analytical: true,
      problem_solving: true,
    },
  },
  {
    id: "administrative",
    name: "Administrative Officer",
    description: "Manages logistics, personnel, and resources for Foundation operations.",
    icon: "📋",
    minClearance: 1,
    maxClearance: 3,
    mbtiTypes: ["ESTJ", "ISTJ", "ESFJ", "ISFJ"],
    traits: {
      organized: true,
      detail_oriented: true,
      efficient: true,
    },
  },
  {
    id: "mtf",
    name: "Mobile Task Force Operative",
    description: "Elite field agent tasked with securing anomalies and responding to containment breaches.",
    icon: "🔫",
    minClearance: 3,
    maxClearance: 5,
    mbtiTypes: ["ESTP", "ISTP", "ENTJ", "ESTJ"],
    traits: {
      adaptable: true,
      decisive: true,
      brave: true,
    },
  },
  {
    id: "ethics",
    name: "Ethics Committee Member",
    description: "Oversees ethical considerations in Foundation research and containment procedures.",
    icon: "⚖️",
    minClearance: 4,
    maxClearance: 6,
    mbtiTypes: ["INFJ", "ENFJ", "INFP", "ENFP"],
    traits: {
      ethical: true,
      empathetic: true,
      principled: true,
    },
  },
  {
    id: "o5",
    name: "O5 Council Member",
    description: "One of the thirteen overseers who govern the Foundation with absolute authority.",
    icon: "👁️",
    minClearance: 7,
    maxClearance: 12,
    mbtiTypes: ["INTJ", "ENTJ", "INFJ", "ENFJ"],
    traits: {
      strategic: true,
      decisive: true,
      visionary: true,
    },
  },
  {
    id: "raisa",
    name: "RAISA Officer",
    description:
      "Responsible for keeping the Foundation database secure and intact, controlling access to classified information.",
    icon: "🔐",
    minClearance: 3,
    maxClearance: 6,
    mbtiTypes: ["ISTJ", "INTJ", "ESTJ", "ENTJ"],
    traits: {
      detail_oriented: true,
      systematic: true,
      disciplined: true,
    },
  },
  {
    id: "fire-suppression",
    name: "Fire Suppression Specialist",
    description: "Looks out for the Foundation's most valuable resource: staff and their wellbeing.",
    icon: "🧯",
    minClearance: 2,
    maxClearance: 4,
    mbtiTypes: ["ESFJ", "ISFJ", "ESTJ", "ISTJ"],
    traits: {
      protective: true,
      vigilant: true,
      supportive: true,
    },
  },
  {
    id: "domc",
    name: "Miscommunications Specialist",
    description:
      "Specializes in anomalies that manipulate language or communication in ways difficult to describe and contain.",
    icon: "📝",
    minClearance: 3,
    maxClearance: 5,
    mbtiTypes: ["INFJ", "ENFJ", "INTP", "ENTP"],
    traits: {
      linguistic: true,
      analytical: true,
      adaptable: true,
    },
  },
  {
    id: "intelligence",
    name: "Intelligence Agent",
    description:
      "Tasked with searching, tracking, and capturing uncontained SCP objects and gathering intelligence on hostile groups.",
    icon: "🕵️",
    minClearance: 3,
    maxClearance: 6,
    mbtiTypes: ["ISTP", "ESTP", "INTJ", "ENTJ"],
    traits: {
      observant: true,
      strategic: true,
      adaptable: true,
    },
  },
  {
    id: "external-affairs",
    name: "External Affairs Officer",
    description: "Responsible for disinformation, eliminating traces of SCP activity, and recruiting new personnel.",
    icon: "🌐",
    minClearance: 2,
    maxClearance: 5,
    mbtiTypes: ["ENFJ", "ENTJ", "ESFJ", "ESTJ"],
    traits: {
      diplomatic: true,
      communicative: true,
      strategic: true,
    },
  },
  {
    id: "engineering",
    name: "Engineering Specialist",
    description:
      "Responsible for technical maintenance, design and construction of facilities and containment chambers.",
    icon: "🔧",
    minClearance: 2,
    maxClearance: 5,
    mbtiTypes: ["ISTP", "INTP", "ESTP", "ENTP"],
    traits: {
      technical: true,
      practical: true,
      problem_solving: true,
    },
  },
  {
    id: "internal-security",
    name: "Internal Security Officer",
    description: "Part of the Foundation's secret police force, responsible for operational and information security.",
    icon: "🔍",
    minClearance: 4,
    maxClearance: 7,
    mbtiTypes: ["ISTJ", "ESTJ", "INTJ", "ENTJ"],
    traits: {
      vigilant: true,
      disciplined: true,
      analytical: true,
    },
  },
  {
    id: "logistics",
    name: "Logistics Officer",
    description:
      "Responsible for transferring resources between Foundation facilities using various transportation methods.",
    icon: "🚚",
    minClearance: 2,
    maxClearance: 4,
    mbtiTypes: ["ISTJ", "ESTJ", "ISTP", "ESTP"],
    traits: {
      organized: true,
      efficient: true,
      practical: true,
    },
  },
  {
    id: "scientific",
    name: "Scientific Officer",
    description: "Conducts research on anomalous phenomena and develops scientific understanding of SCP objects.",
    icon: "🧪",
    minClearance: 3,
    maxClearance: 5,
    mbtiTypes: ["INTP", "INTJ", "ENTP", "ENTJ"],
    traits: {
      analytical: true,
      curious: true,
      methodical: true,
    },
  },
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
    primaryColor: "#f8fafc", // slate
    secondaryColor: "#000000",
    accentColor: "#f8fafc",
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
  {
    id: "raisa",
    name: "Recordkeeping and Information Security Administration",
    primaryColor: "#4a5568", // slate gray
    secondaryColor: "#1a202c",
    accentColor: "#f8fafc",
    fontFamily: "monospace",
    borderWidth: 2,
    borderRadius: 4,
    layout: "landscape",
    tagline: "Securing Information, Preserving Knowledge",
    quote: "What is known must be protected.",
  },
  {
    id: "fire-suppression",
    name: "Fire Suppression Department",
    primaryColor: "#e53e3e", // red
    secondaryColor: "#1a202c",
    accentColor: "#f8fafc",
    fontFamily: "sans-serif",
    borderWidth: 2,
    borderRadius: 6,
    layout: "landscape",
    tagline: "Protecting Our Most Valuable Resource: Our Staff",
    quote: "Safety first, containment second.",
  },
  {
    id: "domc",
    name: "Department of Miscommunications",
    primaryColor: "#805ad5", // purple
    secondaryColor: "#1a202c",
    accentColor: "#f8fafc",
    fontFamily: "serif",
    borderWidth: 2,
    borderRadius: 5,
    layout: "landscape",
    tagline: "Interpreting the Untranslatable",
    quote: "When words fail, we speak.",
  },
  {
    id: "intelligence-agency",
    name: "Intelligence Agency",
    primaryColor: "#2c5282", // dark blue
    secondaryColor: "#1a202c",
    accentColor: "#f8fafc",
    fontFamily: "sans-serif",
    borderWidth: 2,
    borderRadius: 3,
    layout: "landscape",
    tagline: "Finding What Others Cannot See",
    quote: "Knowledge is our weapon.",
  },
  {
    id: "external-affairs",
    name: "Department of External Affairs",
    primaryColor: "#2b6cb0", // medium blue
    secondaryColor: "#1a202c",
    accentColor: "#f8fafc",
    fontFamily: "sans-serif",
    borderWidth: 2,
    borderRadius: 4,
    layout: "landscape",
    tagline: "Managing Our Public Face",
    quote: "The world sees what we allow it to see.",
  },
  {
    id: "engineering",
    name: "Engineering and Technical Service",
    primaryColor: "#dd6b20", // orange
    secondaryColor: "#1a202c",
    accentColor: "#f8fafc",
    fontFamily: "monospace",
    borderWidth: 2,
    borderRadius: 2,
    layout: "landscape",
    tagline: "Building the Impossible",
    quote: "If it can be imagined, it can be built.",
  },
  {
    id: "internal-security",
    name: "Internal Security Department",
    primaryColor: "#718096", // gray
    secondaryColor: "#1a202c",
    accentColor: "#f8fafc",
    fontFamily: "sans-serif",
    borderWidth: 3,
    borderRadius: 0,
    layout: "landscape",
    tagline: "Protecting From Within",
    quote: "Trust, but verify.",
  },
  {
    id: "logistics",
    name: "Logistics Department",
    primaryColor: "#38a169", // green
    secondaryColor: "#1a202c",
    accentColor: "#f8fafc",
    fontFamily: "sans-serif",
    borderWidth: 2,
    borderRadius: 4,
    layout: "landscape",
    tagline: "Moving Resources Where Needed",
    quote: "The right resource at the right time.",
  },
  {
    id: "scientific",
    name: "Scientific Department",
    primaryColor: "#3182ce", // blue
    secondaryColor: "#1a202c",
    accentColor: "#f8fafc",
    fontFamily: "serif",
    borderWidth: 2,
    borderRadius: 6,
    layout: "landscape",
    tagline: "Expanding the Boundaries of Knowledge",
    quote: "Understanding is the first step to containment.",
  },
]

// Add a departmentLogos object after the departments array
const departmentLogos = {
  research: "🧪",
  security: "🛡️",
  containment: "📦",
  medical: "⚕️",
  technical: "⚙️",
  administrative: "📋",
  "mobile-task-force": "🔫",
  "ethics-committee": "⚖️",
  "o5-council": "👁️",
  raisa: "🔐",
  "fire-suppression": "🧯",
  domc: "📝",
  "intelligence-agency": "🕵️",
  "external-affairs": "🌐",
  engineering: "🔧",
  "internal-security": "🔍",
  logistics: "🚚",
  scientific: "🔬",
}

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

// MBTI dimensions
const mbtiDimensions = [
  {
    name: "Energy",
    poles: ["Extraversion (E)", "Introversion (I)"],
    description: "How you interact with the world and where you get your energy",
  },
  {
    name: "Information",
    poles: ["Sensing (S)", "Intuition (N)"],
    description: "How you gather and process information",
  },
  {
    name: "Decisions",
    poles: ["Thinking (T)", "Feeling (F)"],
    description: "How you make decisions",
  },
  {
    name: "Structure",
    poles: ["Judging (J)", "Perceiving (P)"],
    description: "How you organize your life and work",
  },
]

// SCP Personality Test Questions - MBTI-inspired but SCP-themed
const personalityQuestions = [
  // Extraversion (E) vs. Introversion (I) questions
  {
    id: "q1",
    dimension: "E/I",
    question: "During a containment breach, you would prefer to:",
    options: [
      {
        id: "q1a",
        text: "Coordinate with a team to secure the anomaly",
        mbti: "E",
        traits: { teamwork: 3, leadership: 2 },
      },
      {
        id: "q1b",
        text: "Work independently to analyze the breach and develop a solution",
        mbti: "I",
        traits: { analytical: 3, independent: 2 },
      },
      {
        id: "q1c",
        text: "Establish a command center to direct containment efforts",
        mbti: "E",
        traits: { leadership: 3, strategic: 2 },
      },
      {
        id: "q1d",
        text: "Focus on documenting the anomaly's behavior during the breach",
        mbti: "I",
        traits: { detail_oriented: 3, methodical: 2 },
      },
    ],
  },
  {
    id: "q2",
    dimension: "E/I",
    question: "When researching a new anomaly, you prefer to:",
    options: [
      {
        id: "q2a",
        text: "Discuss theories and findings with colleagues",
        mbti: "E",
        traits: { collaborative: 3, communicative: 2 },
      },
      {
        id: "q2b",
        text: "Spend time alone with your thoughts and observations",
        mbti: "I",
        traits: { reflective: 3, focused: 2 },
      },
      {
        id: "q2c",
        text: "Lead a research team with diverse expertise",
        mbti: "E",
        traits: { leadership: 3, collaborative: 2 },
      },
      {
        id: "q2d",
        text: "Create detailed documentation and analysis before sharing findings",
        mbti: "I",
        traits: { analytical: 3, methodical: 2 },
      },
    ],
  },
  {
    id: "q3",
    dimension: "E/I",
    question: "After a stressful containment situation, you recover best by:",
    options: [
      {
        id: "q3a",
        text: "Debriefing with your team and discussing the experience",
        mbti: "E",
        traits: { social: 3, expressive: 2 },
      },
      {
        id: "q3b",
        text: "Taking time alone to process and document your observations",
        mbti: "I",
        traits: { introspective: 3, reserved: 2 },
      },
      {
        id: "q3c",
        text: "Organizing a social gathering to relieve tension",
        mbti: "E",
        traits: { social: 3, supportive: 2 },
      },
      {
        id: "q3d",
        text: "Reviewing containment protocols to identify improvements",
        mbti: "I",
        traits: { analytical: 3, detail_oriented: 2 },
      },
    ],
  },

  // Sensing (S) vs. Intuition (N) questions
  {
    id: "q4",
    dimension: "S/N",
    question: "When examining an anomalous object, you first focus on:",
    options: [
      {
        id: "q4a",
        text: "Observable physical properties and measurable data",
        mbti: "S",
        traits: { practical: 3, detail_oriented: 2 },
      },
      {
        id: "q4b",
        text: "Potential patterns and theoretical implications",
        mbti: "N",
        traits: { conceptual: 3, theoretical: 2 },
      },
      {
        id: "q4c",
        text: "Comparing it to previously documented anomalies",
        mbti: "S",
        traits: { methodical: 3, systematic: 2 },
      },
      {
        id: "q4d",
        text: "Considering how it might connect to larger anomalous phenomena",
        mbti: "N",
        traits: { visionary: 3, abstract: 2 },
      },
    ],
  },
  {
    id: "q5",
    dimension: "S/N",
    question: "When developing containment procedures, you prioritize:",
    options: [
      {
        id: "q5a",
        text: "Proven methods with established effectiveness",
        mbti: "S",
        traits: { methodical: 3, pragmatic: 2 },
      },
      {
        id: "q5b",
        text: "Innovative approaches that address unique anomalous properties",
        mbti: "N",
        traits: { innovative: 3, visionary: 2 },
      },
      {
        id: "q5c",
        text: "Detailed step-by-step protocols that leave nothing to chance",
        mbti: "S",
        traits: { detail_oriented: 3, systematic: 2 },
      },
      {
        id: "q5d",
        text: "Adaptable frameworks that can evolve with new discoveries",
        mbti: "N",
        traits: { adaptable: 3, conceptual: 2 },
      },
    ],
  },
  {
    id: "q6",
    dimension: "S/N",
    question: "In your reports on anomalous entities, you tend to:",
    options: [
      {
        id: "q6a",
        text: "Focus on precise descriptions and concrete observations",
        mbti: "S",
        traits: { factual: 3, systematic: 2 },
      },
      {
        id: "q6b",
        text: "Explore theoretical connections and potential implications",
        mbti: "N",
        traits: { abstract: 3, speculative: 2 },
      },
      {
        id: "q6c",
        text: "Include comprehensive data tables and measurement records",
        mbti: "S",
        traits: { detail_oriented: 3, methodical: 2 },
      },
      {
        id: "q6d",
        text: "Propose new research directions and hypothetical scenarios",
        mbti: "N",
        traits: { innovative: 3, visionary: 2 },
      },
    ],
  },

  // Thinking (T) vs. Feeling (F) questions
  {
    id: "q7",
    dimension: "T/F",
    question: "When deciding whether to terminate a sentient anomaly, you primarily consider:",
    options: [
      {
        id: "q7a",
        text: "Logical analysis of threat level and containment viability",
        mbti: "T",
        traits: { logical: 3, objective: 2 },
      },
      {
        id: "q7b",
        text: "Ethical implications and potential for humane alternatives",
        mbti: "F",
        traits: { ethical: 3, empathetic: 2 },
      },
      {
        id: "q7c",
        text: "Cost-benefit analysis of resources required for containment",
        mbti: "T",
        traits: { rational: 3, analytical: 2 },
      },
      {
        id: "q7d",
        text: "The entity's demonstrated capacity for suffering or consciousness",
        mbti: "F",
        traits: { compassionate: 3, principled: 2 },
      },
    ],
  },
  {
    id: "q8",
    dimension: "T/F",
    question: "When a containment breach results in casualties, your first concern is:",
    options: [
      {
        id: "q8a",
        text: "Analyzing what went wrong to prevent future incidents",
        mbti: "T",
        traits: { analytical: 3, strategic: 2 },
      },
      {
        id: "q8b",
        text: "Addressing the human impact and supporting affected personnel",
        mbti: "F",
        traits: { compassionate: 3, supportive: 2 },
      },
      {
        id: "q8c",
        text: "Implementing immediate procedural changes based on the failure",
        mbti: "T",
        traits: { decisive: 3, systematic: 2 },
      },
      {
        id: "q8d",
        text: "Ensuring proper recognition and memorialization of those lost",
        mbti: "F",
        traits: { empathetic: 3, considerate: 2 },
      },
    ],
  },
  {
    id: "q9",
    dimension: "T/F",
    question: "In evaluating a new containment protocol, you focus most on:",
    options: [
      {
        id: "q9a",
        text: "Efficiency, effectiveness, and resource optimization",
        mbti: "T",
        traits: { rational: 3, efficient: 2 },
      },
      {
        id: "q9b",
        text: "Impact on personnel wellbeing and ethical considerations",
        mbti: "F",
        traits: { considerate: 3, harmonious: 2 },
      },
      {
        id: "q9c",
        text: "Statistical probability of success based on similar cases",
        mbti: "T",
        traits: { analytical: 3, logical: 2 },
      },
      {
        id: "q9d",
        text: "Creating a supportive environment for the containment team",
        mbti: "F",
        traits: { supportive: 3, empathetic: 2 },
      },
    ],
  },

  // Judging (J) vs. Perceiving (P) questions
  {
    id: "q10",
    dimension: "J/P",
    question: "Your approach to anomaly research is typically:",
    options: [
      {
        id: "q10a",
        text: "Following a structured plan with clear objectives and timelines",
        mbti: "J",
        traits: { organized: 3, methodical: 2 },
      },
      {
        id: "q10b",
        text: "Adapting your approach as new information emerges",
        mbti: "P",
        traits: { adaptable: 3, flexible: 2 },
      },
      {
        id: "q10c",
        text: "Creating detailed research protocols before beginning work",
        mbti: "J",
        traits: { systematic: 3, disciplined: 2 },
      },
      {
        id: "q10d",
        text: "Exploring multiple avenues of inquiry simultaneously",
        mbti: "P",
        traits: { curious: 3, multitasking: 2 },
      },
    ],
  },
  {
    id: "q11",
    dimension: "J/P",
    question: "When faced with an unexpected anomalous behavior, you prefer to:",
    options: [
      {
        id: "q11a",
        text: "Quickly establish new protocols to address the situation",
        mbti: "J",
        traits: { decisive: 3, structured: 2 },
      },
      {
        id: "q11b",
        text: "Observe and gather more data before determining a course of action",
        mbti: "P",
        traits: { curious: 3, open_minded: 2 },
      },
      {
        id: "q11c",
        text: "Consult established contingency plans and modify as needed",
        mbti: "J",
        traits: { methodical: 3, prepared: 2 },
      },
      {
        id: "q11d",
        text: "Experiment with different approaches to see what works best",
        mbti: "P",
        traits: { experimental: 3, adaptable: 2 },
      },
    ],
  },
  {
    id: "q12",
    dimension: "J/P",
    question: "Your workspace at the Foundation is typically:",
    options: [
      {
        id: "q12a",
        text: "Organized with clear systems and everything in its place",
        mbti: "J",
        traits: { orderly: 3, disciplined: 2 },
      },
      {
        id: "q12b",
        text: "Adaptable with multiple projects in various stages of completion",
        mbti: "P",
        traits: { spontaneous: 3, multitasking: 2 },
      },
      {
        id: "q12c",
        text: "Meticulously labeled and categorized for maximum efficiency",
        mbti: "J",
        traits: { systematic: 3, detail_oriented: 2 },
      },
      {
        id: "q12d",
        text: "Creative and evolving, with space for unexpected inspirations",
        mbti: "P",
        traits: { flexible: 3, innovative: 2 },
      },
    ],
  },

  // Additional SCP-specific questions
  {
    id: "q13",
    dimension: "SCP",
    question: "Which aspect of the Foundation's mission do you find most compelling?",
    options: [
      {
        id: "q13a",
        text: "Protecting humanity from anomalous threats",
        traits: { protective: 3, dutiful: 2 },
        departmentAffinity: ["security", "containment", "mtf"],
      },
      {
        id: "q13b",
        text: "Understanding the nature of reality through anomalous study",
        traits: { curious: 3, analytical: 2 },
        departmentAffinity: ["research", "technical"],
      },
      {
        id: "q13c",
        text: "Ensuring ethical treatment of sentient anomalies",
        traits: { ethical: 3, empathetic: 2 },
        departmentAffinity: ["ethics", "medical"],
      },
      {
        id: "q13d",
        text: "Maintaining order and structure in chaotic situations",
        traits: { organized: 3, systematic: 2 },
        departmentAffinity: ["administrative", "containment"],
      },
      {
        id: "q13e",
        text: "Developing new technologies based on anomalous properties",
        traits: { innovative: 3, technical: 2 },
        departmentAffinity: ["technical", "research"],
      },
      {
        id: "q13f",
        text: "Preserving knowledge for future generations",
        traits: { scholarly: 3, detail_oriented: 2 },
        departmentAffinity: ["research", "administrative"],
      },
    ],
  },
  {
    id: "q14",
    dimension: "SCP",
    question: "In a high-risk anomalous situation, you are most likely to:",
    options: [
      {
        id: "q14a",
        text: "Take direct action to neutralize or contain the threat",
        traits: { brave: 3, decisive: 2 },
        departmentAffinity: ["mtf", "security"],
      },
      {
        id: "q14b",
        text: "Analyze the situation to understand the anomaly's properties",
        traits: { analytical: 3, methodical: 2 },
        departmentAffinity: ["research", "technical"],
      },
      {
        id: "q14c",
        text: "Coordinate resources and personnel for an optimal response",
        traits: { leadership: 3, strategic: 2 },
        departmentAffinity: ["administrative", "o5"],
      },
      {
        id: "q14d",
        text: "Ensure protocols are followed to minimize harm",
        traits: { cautious: 3, principled: 2 },
        departmentAffinity: ["ethics", "containment"],
      },
      {
        id: "q14e",
        text: "Document the anomaly's behavior for future reference",
        traits: { detail_oriented: 3, scholarly: 2 },
        departmentAffinity: ["research", "administrative"],
      },
      {
        id: "q14f",
        text: "Develop specialized equipment to address the specific threat",
        traits: { innovative: 3, technical: 2 },
        departmentAffinity: ["technical", "research"],
      },
    ],
  },
  {
    id: "q15",
    dimension: "SCP",
    question: "Your ideal role in the Foundation would involve:",
    options: [
      {
        id: "q15a",
        text: "Field operations and direct interaction with anomalies",
        traits: { hands_on: 3, adaptable: 2 },
        departmentAffinity: ["mtf", "containment"],
      },
      {
        id: "q15b",
        text: "Laboratory research and theoretical analysis",
        traits: { scientific: 3, detail_oriented: 2 },
        departmentAffinity: ["research", "technical"],
      },
      {
        id: "q15c",
        text: "Personnel management and organizational oversight",
        traits: { administrative: 3, interpersonal: 2 },
        departmentAffinity: ["administrative", "o5"],
      },
      {
        id: "q15d",
        text: "Specialized expertise in a specific domain",
        traits: { specialized: 3, focused: 2 },
        departmentAffinity: ["medical", "technical"],
      },
      {
        id: "q15e",
        text: "Strategic planning and high-level decision making",
        traits: { strategic: 3, leadership: 2 },
        departmentAffinity: ["o5", "administrative"],
      },
      {
        id: "q15f",
        text: "Diplomatic relations with anomalous entities or groups",
        traits: { diplomatic: 3, communicative: 2 },
        departmentAffinity: ["ethics", "administrative"],
      },
    ],
  },
  {
    id: "q16",
    dimension: "SCP",
    question: "When dealing with classified information, you prioritize:",
    options: [
      {
        id: "q16a",
        text: "Strict adherence to information security protocols",
        traits: { systematic: 3, disciplined: 2 },
        departmentAffinity: ["raisa", "internal-security"],
      },
      {
        id: "q16b",
        text: "Ensuring information is accessible to those who need it",
        traits: { practical: 3, efficient: 2 },
        departmentAffinity: ["administrative", "logistics"],
      },
      {
        id: "q16c",
        text: "Analyzing patterns in data to extract new insights",
        traits: { analytical: 3, detail_oriented: 2 },
        departmentAffinity: ["research", "scientific"],
      },
      {
        id: "q16d",
        text: "Determining what information can be safely shared with the public",
        traits: { strategic: 3, communicative: 2 },
        departmentAffinity: ["external-affairs", "administrative"],
      },
      {
        id: "q16e",
        text: "Identifying and correcting miscommunications or translation errors",
        traits: { linguistic: 3, detail_oriented: 2 },
        departmentAffinity: ["domc", "ethics"],
      },
      {
        id: "q16f",
        text: "Gathering intelligence from various sources to form a complete picture",
        traits: { observant: 3, analytical: 2 },
        departmentAffinity: ["intelligence-agency", "mtf"],
      },
    ],
  },
  {
    id: "q17",
    dimension: "SCP",
    question: "Your approach to Foundation staff wellbeing is:",
    options: [
      {
        id: "q17a",
        text: "Ensuring physical safety through proper protocols and equipment",
        traits: { protective: 3, practical: 2 },
        departmentAffinity: ["fire-suppression", "security"],
      },
      {
        id: "q17b",
        text: "Providing psychological support and monitoring mental health",
        traits: { empathetic: 3, supportive: 2 },
        departmentAffinity: ["medical", "fire-suppression"],
      },
      {
        id: "q17c",
        text: "Creating efficient systems that reduce unnecessary stress and workload",
        traits: { organized: 3, efficient: 2 },
        departmentAffinity: ["logistics", "administrative"],
      },
      {
        id: "q17d",
        text: "Designing safer containment procedures to minimize risk",
        traits: { cautious: 3, detail_oriented: 2 },
        departmentAffinity: ["containment", "engineering"],
      },
      {
        id: "q17e",
        text: "Ensuring ethical treatment and reasonable work expectations",
        traits: { ethical: 3, principled: 2 },
        departmentAffinity: ["ethics", "o5-council"],
      },
      {
        id: "q17f",
        text: "Maintaining clear communication to prevent dangerous misunderstandings",
        traits: { communicative: 3, clear: 2 },
        departmentAffinity: ["domc", "external-affairs"],
      },
    ],
  },
  {
    id: "q18",
    dimension: "SCP",
    question: "Which of these specialized Foundation roles appeals to you most?",
    options: [
      {
        id: "q18a",
        text: "Information security and database management",
        traits: { systematic: 3, detail_oriented: 2 },
        departmentAffinity: ["raisa", "technical"],
      },
      {
        id: "q18b",
        text: "Undercover intelligence gathering and anomaly tracking",
        traits: { observant: 3, adaptable: 2 },
        departmentAffinity: ["intelligence-agency", "mtf"],
      },
      {
        id: "q18c",
        text: "Engineering and technical maintenance of containment systems",
        traits: { technical: 3, practical: 2 },
        departmentAffinity: ["engineering", "technical"],
      },
      {
        id: "q18d",
        text: "Interpreting and containing communication-based anomalies",
        traits: { linguistic: 3, analytical: 2 },
        departmentAffinity: ["domc", "research"],
      },
      {
        id: "q18e",
        text: "Staff safety, wellbeing, and emergency response",
        traits: { protective: 3, supportive: 2 },
        departmentAffinity: ["fire-suppression", "medical"],
      },
      {
        id: "q18f",
        text: "Logistics and resource management across facilities",
        traits: { organized: 3, efficient: 2 },
        departmentAffinity: ["logistics", "administrative"],
      },
    ],
  },
]

// Helper function to adjust color brightness\
function adjustColorBrightness(hex: string, percent: number) {
  try {
    // Ensure hex is a valid string and has the correct format
    if (!hex || typeof hex !== "string" || !hex.startsWith("#") || hex.length !== 7) {
      return "#1e293b" // Default color if invalid
    }

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
  } catch (error) {
    console.error("Error adjusting color brightness:", error)
    return "#1e293b" // Default color if error
  }
}

export default function SCPIDCardGenerator() {
  const { toast } = useToast()
  const cardRef = useRef<HTMLDivElement>(null)
  const resultCardRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("test")

  // Personality test state
  const [testState, setTestState] = useState({
    currentQuestion: 0,
    answers: {} as Record<string, string>,
    completed: false,
    mbtiScores: {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    },
    mbtiType: "",
    traits: {
      analytical: 0,
      protective: 0,
      ethical: 0,
      technical: 0,
      disciplined: 0,
      empathetic: 0,
      innovative: 0,
      curious: 0,
      decisive: 0,
      pragmatic: 0,
      cautious: 0,
      teamwork: 0,
      leadership: 0,
      independent: 0,
      collaborative: 0,
      communicative: 0,
      reflective: 0,
      focused: 0,
      social: 0,
      expressive: 0,
      introspective: 0,
      reserved: 0,
      practical: 0,
      detail_oriented: 0,
      conceptual: 0,
      theoretical: 0,
      methodical: 0,
      visionary: 0,
      factual: 0,
      systematic: 0,
      abstract: 0,
      speculative: 0,
      logical: 0,
      objective: 0,
      compassionate: 0,
      supportive: 0,
      rational: 0,
      efficient: 0,
      considerate: 0,
      harmonious: 0,
      organized: 0,
      adaptable: 0,
      flexible: 0,
      structured: 0,
      open_minded: 0,
      orderly: 0,
      spontaneous: 0,
      multitasking: 0,
      dutiful: 0,
      brave: 0,
      strategic: 0,
      principled: 0,
      hands_on: 0,
      scientific: 0,
      administrative: 0,
      interpersonal: 0,
      specialized: 0,
    },
    departmentAffinities: {
      research: 0,
      security: 0,
      containment: 0,
      medical: 0,
      technical: 0,
      administrative: 0,
      mtf: 0,
      ethics: 0,
      o5: 0,
    },
    result: {
      role: "",
      clearanceLevel: "",
      description: "",
      explanation: "",
    },
  })

  // Card content state
  const [formData, setFormData] = useState({
    name: "",
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
    try {
      setFormData((prev) => ({
        ...prev,
        id: "SCP-" + Math.floor(10000 + Math.random() * 90000).toString(),
      }))
    } catch (error) {
      console.error("Error generating random ID:", error)
    }
  }, [])

  // Handle form data changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    try {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    } catch (error) {
      console.error("Error handling form change:", error)
    }
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    try {
      setFormData((prev) => ({ ...prev, [name]: value }))
    } catch (error) {
      console.error("Error handling select change:", error)
    }
  }

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
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
    } catch (error) {
      console.error("Error handling photo upload:", error)
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your photo.",
        variant: "destructive",
      })
    }
  }

  // Handle switch toggle
  const handleSwitchChange = (name: string, checked: boolean) => {
    try {
      if (name === "useDefaultPhoto") {
        setFormData((prev) => ({ ...prev, [name]: checked }))
      }
    } catch (error) {
      console.error("Error handling switch change:", error)
    }
  }

  // Generate random ID
  const generateRandomID = () => {
    try {
      setFormData((prev) => ({
        ...prev,
        id: "SCP-" + Math.floor(10000 + Math.random() * 90000).toString(),
      }))
      toast({
        title: "ID Updated",
        description: "A new random ID has been generated.",
      })
    } catch (error) {
      console.error("Error generating random ID:", error)
      toast({
        title: "ID Generation Failed",
        description: "There was an error generating a new ID.",
        variant: "destructive",
      })
    }
  }

  // Download card as image
  const downloadCard = () => {
    try {
      if (cardRef.current) {
        toast({
          title: "Generating Image",
          description: "Please wait while we prepare your ID card...",
        })

        toPng(cardRef.current, {
          cacheBust: true,
          pixelRatio: 3,
          quality: 4,
        })
          .then((dataUrl) => {
            const link = document.createElement("a")
            link.download = `${formData.name.replace(/\s+/g, "_") || "SCP"}_ID_Card.png`
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
    } catch (error) {
      console.error("Error downloading card:", error)
      toast({
        title: "Download Failed",
        description: "There was an error generating your ID card.",
        variant: "destructive",
      })
    }
  }

  // Replace the downloadResultCard function with this empty function
  const downloadResultCard = () => {
    // Function removed as requested
    console.log("Download result feature has been removed")
  }

  // Reset to default settings
  const resetDefaults = () => {
    try {
      setFormData({
        name: "",
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
    } catch (error) {
      console.error("Error resetting defaults:", error)
      toast({
        title: "Reset Failed",
        description: "There was an error resetting to default values.",
        variant: "destructive",
      })
    }
  }

  // Reset personality test
  const resetTest = () => {
    try {
      setTestState({
        currentQuestion: 0,
        answers: {},
        completed: false,
        mbtiScores: {
          E: 0,
          I: 0,
          S: 0,
          N: 0,
          T: 0,
          F: 0,
          J: 0,
          P: 0,
        },
        mbtiType: "",
        traits: {
          analytical: 0,
          protective: 0,
          ethical: 0,
          technical: 0,
          disciplined: 0,
          empathetic: 0,
          innovative: 0,
          curious: 0,
          decisive: 0,
          pragmatic: 0,
          cautious: 0,
          teamwork: 0,
          leadership: 0,
          independent: 0,
          collaborative: 0,
          communicative: 0,
          reflective: 0,
          focused: 0,
          social: 0,
          expressive: 0,
          introspective: 0,
          reserved: 0,
          practical: 0,
          detail_oriented: 0,
          conceptual: 0,
          theoretical: 0,
          methodical: 0,
          visionary: 0,
          factual: 0,
          systematic: 0,
          abstract: 0,
          speculative: 0,
          logical: 0,
          objective: 0,
          compassionate: 0,
          supportive: 0,
          rational: 0,
          efficient: 0,
          considerate: 0,
          harmonious: 0,
          organized: 0,
          adaptable: 0,
          flexible: 0,
          structured: 0,
          open_minded: 0,
          orderly: 0,
          spontaneous: 0,
          multitasking: 0,
          dutiful: 0,
          brave: 0,
          strategic: 0,
          principled: 0,
          hands_on: 0,
          scientific: 0,
          administrative: 0,
          interpersonal: 0,
          specialized: 0,
        },
        departmentAffinities: {
          research: 0,
          security: 0,
          containment: 0,
          medical: 0,
          technical: 0,
          administrative: 0,
          mtf: 0,
          ethics: 0,
          o5: 0,
        },
        result: {
          role: "",
          clearanceLevel: "",
          description: "",
          explanation: "",
        },
      })
    } catch (error) {
      console.error("Error resetting test:", error)
    }
  }

  // Handle personality test answer selection
  const handleAnswerSelect = (questionId: string, optionId: string) => {
    try {
      // Find the selected option
      const question = personalityQuestions.find((q) => q.id === questionId)
      const option = question?.options.find((o) => o.id === optionId)

      if (question && option) {
        // Update answers
        setTestState((prev) => ({
          ...prev,
          answers: {
            ...prev.answers,
            [questionId]: optionId,
          },
        }))

        // Update MBTI scores if applicable
        if (option.mbti) {
          setTestState((prev) => {
            const updatedScores = { ...prev.mbtiScores }
            updatedScores[option.mbti as keyof typeof updatedScores] += 1
            return {
              ...prev,
              mbtiScores: updatedScores,
            }
          })
        }

        // Update traits based on the selected option
        if (option.traits) {
          setTestState((prev) => {
            const updatedTraits = { ...prev.traits }

            // Add trait values from the selected option
            Object.entries(option.traits).forEach(([trait, value]) => {
              if (trait in updatedTraits) {
                updatedTraits[trait as keyof typeof updatedTraits] += value
              }
            })

            return {
              ...prev,
              traits: updatedTraits,
            }
          })
        }

        // Update department affinities if applicable
        if (option.departmentAffinity) {
          setTestState((prev) => {
            const updatedAffinities = { ...prev.departmentAffinities }

            option.departmentAffinity.forEach((dept) => {
              if (dept in updatedAffinities) {
                updatedAffinities[dept as keyof typeof updatedAffinities] += 1
              }
            })

            return {
              ...prev,
              departmentAffinities: updatedAffinities,
            }
          })
        }

        // Move to next question or complete the test
        if (testState.currentQuestion < personalityQuestions.length - 1) {
          setTestState((prev) => ({
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
          }))
        } else {
          // Calculate results
          calculateResults()
        }
      }
    } catch (error) {
      console.error("Error handling answer selection:", error)
      toast({
        title: "Error",
        description: "There was an error processing your answer. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Calculate personality test results
  const calculateResults = () => {
    try {
      // Determine MBTI type
      const mbtiScores = testState.mbtiScores
      const mbtiType = [
        mbtiScores.E > mbtiScores.I ? "E" : "I",
        mbtiScores.S > mbtiScores.N ? "S" : "N",
        mbtiScores.T > mbtiScores.F ? "T" : "F",
        mbtiScores.J > mbtiScores.P ? "J" : "P",
      ].join("")

      // Determine dominant traits
      const traits = testState.traits
      const sortedTraits = Object.entries(traits)
        .filter(([_, value]) => value > 0) // Filter out traits with zero value
        .sort((a, b) => b[1] - a[1])

      // Safely get traits, providing defaults if not enough traits have values
      const primaryTrait = sortedTraits.length > 0 ? sortedTraits[0][0] : "analytical"
      const secondaryTrait = sortedTraits.length > 1 ? sortedTraits[1][0] : "methodical"
      const tertiaryTrait = sortedTraits.length > 2 ? sortedTraits[2][0] : "disciplined"

      // Determine department affinities
      const departmentAffinities = testState.departmentAffinities
      const sortedDepartments = Object.entries(departmentAffinities)
        .filter(([_, value]) => value > 0) // Filter out departments with zero affinity
        .sort((a, b) => b[1] - a[1])

      // Default to research if no department has affinity
      const primaryDepartment = sortedDepartments.length > 0 ? sortedDepartments[0][0] : "research"

      // Find roles that match the MBTI type
      const matchingRoles = scpRoles.filter((role) => role.mbtiTypes.includes(mbtiType))

      // Determine role based on MBTI, traits, and department affinities
      let roleId = ""
      let explanation = ""

      if (matchingRoles.length > 0) {
        // If there are MBTI matches, prioritize those that also match department affinity
        const departmentMatchingRoles = matchingRoles.filter((role) => role.id === primaryDepartment)

        if (departmentMatchingRoles.length > 0) {
          roleId = departmentMatchingRoles[0].id
          explanation = `Your exceptional ${primaryTrait.replace("_", " ")} nature aligns perfectly with the ${departmentMatchingRoles[0].name} role.`
        } else {
          // Otherwise use the first MBTI match
          roleId = matchingRoles[0].id
          explanation = `Your natural strengths in ${primaryTrait.replace("_", " ")} and ${secondaryTrait.replace("_", " ")} make you well-suited for the ${matchingRoles[0].name} role.`
        }
      } else {
        // If no MBTI matches, use department affinity and traits
        roleId = primaryDepartment
        explanation = `Your exceptional ${primaryTrait.replace("_", " ")}, ${secondaryTrait.replace("_", " ")}, and ${tertiaryTrait.replace("_", " ")} traits make you well-suited for the ${scpRoles.find((r) => r.id === primaryDepartment)?.name || "Specialist"} role.`
      }

      // Determine clearance level based on traits, role, and MBTI
      const roleInfo = scpRoles.find((r) => r.id === roleId)
      let clearanceLevel = roleInfo ? roleInfo.minClearance.toString() : "2"

      if (roleInfo) {
        // Base clearance on role's minimum clearance
        let calculatedClearance = roleInfo.minClearance

        // Adjust based on traits
        if ((traits.analytical || 0) > 7 || (traits.strategic || 0) > 7) calculatedClearance += 1
        if ((traits.ethical || 0) > 8 || (traits.principled || 0) > 8) calculatedClearance += 1
        if ((traits.disciplined || 0) > 6 && (traits.protective || 0) > 6) calculatedClearance += 1
        if ((traits.leadership || 0) > 8) calculatedClearance += 1

        // MBTI adjustments
        if (mbtiType.includes("NT")) calculatedClearance += 1 // NT types tend to be strategic thinkers
        if (mbtiType === "INTJ" || mbtiType === "ENTJ") calculatedClearance += 1 // Natural leaders

        // Cap at role's maximum clearance
        calculatedClearance = Math.min(calculatedClearance, roleInfo.maxClearance)

        // Special case for O5
        if (
          (roleId === "ethics" && (traits.ethical || 0) > 8 && (traits.analytical || 0) > 6) ||
          ((traits.strategic || 0) > 8 && (traits.decisive || 0) > 7)
        ) {
          roleId = "o5"
          calculatedClearance = 7 // O5 minimum
          explanation = `Your exceptional ${primaryTrait.replace("_", " ")} and ${secondaryTrait.replace("_", " ")} abilities mark you for the highest levels of oversight.`
        }

        clearanceLevel = calculatedClearance.toString()
      }

      // Update form data based on results
      setFormData((prev) => ({
        ...prev,
        department:
          roleId === "mtf"
            ? "mobile-task-force"
            : roleId === "ethics"
              ? "ethics-committee"
              : roleId === "o5"
                ? "o5-council"
                : roleId === "raisa"
                  ? "raisa"
                  : roleId === "fire-suppression"
                    ? "fire-suppression"
                    : roleId === "domc"
                      ? "domc"
                      : roleId === "intelligence"
                        ? "intelligence-agency"
                        : roleId === "external-affairs"
                          ? "external-affairs"
                          : roleId === "engineering"
                            ? "engineering"
                            : roleId === "internal-security"
                              ? "internal-security"
                              : roleId === "logistics"
                                ? "logistics"
                                : roleId === "scientific"
                                  ? "scientific"
                                  : roleId,
        position: roleInfo?.name || "Specialist",
        clearanceLevel: clearanceLevel,
      }))

      // Set results
      setTestState((prev) => ({
        ...prev,
        completed: true,
        mbtiType: mbtiType,
        result: {
          role: roleInfo?.name || "Specialist",
          clearanceLevel: clearanceLevel,
          description: roleInfo?.description || "",
          explanation: explanation,
        },
      }))
    } catch (error) {
      console.error("Error calculating results:", error)
      toast({
        title: "Error",
        description: "There was an error calculating your results. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Get clearance level color
  const getClearanceLevelColor = (level = formData.clearanceLevel) => {
    try {
      const levelObj = clearanceLevels.find((l) => l.value === level)
      return levelObj ? levelObj.color : "bg-gray-500"
    } catch (error) {
      console.error("Error getting clearance level color:", error)
      return "bg-gray-500"
    }
  }

  // Get clearance level label
  const getClearanceLevelLabel = (level = formData.clearanceLevel) => {
    try {
      const levelObj = clearanceLevels.find((l) => l.value === level)
      return levelObj ? levelObj.label : "Unknown"
    } catch (error) {
      console.error("Error getting clearance level label:", error)
      return "Unknown"
    }
  }

  // Get clearance level description
  const getClearanceLevelDescription = (level = formData.clearanceLevel) => {
    try {
      const levelObj = clearanceLevels.find((l) => l.value === level)
      return levelObj ? levelObj.description : ""
    } catch (error) {
      console.error("Error getting clearance level description:", error)
      return ""
    }
  }

  // Get clearance level icon
  const getClearanceLevelIcon = (level = formData.clearanceLevel) => {
    try {
      const levelObj = clearanceLevels.find((l) => l.value === level)
      return levelObj ? levelObj.icon : "🔒"
    } catch (error) {
      console.error("Error getting clearance level icon:", error)
      return "🔒"
    }
  }

  // Get department styling
  const getDepartmentStyling = () => {
    try {
      const department = departments.find((d) => d.id === formData.department) || departments[0]
      const site = sites.find((s) => s.id === formData.site) || sites[0]

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
    } catch (error) {
      console.error("Error getting department styling:", error)
      return departments[0] // Return default department styling
    }
  }

  // Get current styling
  const currentStyle = getDepartmentStyling()

  // Get department quote
  const getDepartmentQuote = () => {
    try {
      const department = departments.find((d) => d.id === formData.department)
      return department?.quote || "Secure. Contain. Protect."
    } catch (error) {
      console.error("Error getting department quote:", error)
      return "Secure. Contain. Protect."
    }
  }

  // Get role icon
  const getRoleIcon = (position = formData.position) => {
    try {
      const role = scpRoles.find((r) => r.name === position)
      return role?.icon || "🔬"
    } catch (error) {
      console.error("Error getting role icon:", error)
      return "🔬"
    }
  }

  // Apply test results to ID card
  const applyResultsToCard = () => {
    try {
      if (testState.completed && formData.name) {
        toast({
          title: "Results Applied",
          description: "Your personality test results have been applied to your ID card.",
        })
        setActiveTab("content")
      } else if (!formData.name) {
        toast({
          title: "Name Required",
          description: "Please enter your name before applying results.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Test Incomplete",
          description: "Please complete the personality test first.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error applying results to card:", error)
      toast({
        title: "Error",
        description: "There was an error applying your results. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Calculate test progress percentage
  const getTestProgress = () => {
    try {
      if (testState.completed) return 100
      return (testState.currentQuestion / personalityQuestions.length) * 100
    } catch (error) {
      console.error("Error calculating test progress:", error)
      return 0
    }
  }

  // Get MBTI description
  const getMBTIDescription = (type: string) => {
    try {
      const descriptions: Record<string, string> = {
        INTJ: "The Architect - Strategic, innovative, and focused on improving systems.",
        INTP: "The Logician - Analytical, theoretical, and driven by understanding complex concepts.",
        ENTJ: "The Commander - Decisive, strategic leader focused on efficiency and results.",
        ENTP: "The Debater - Innovative problem-solver who enjoys intellectual challenges.",
        INFJ: "The Advocate - Insightful, principled, with a strong sense of purpose.",
        INFP: "The Mediator - Idealistic, empathetic, guided by inner values and ethics.",
        ENFJ: "The Protagonist - Charismatic leader focused on helping others develop.",
        ENFP: "The Campaigner - Enthusiastic, creative, with strong people skills.",
        ISTJ: "The Inspector - Practical, detail-oriented, and reliable.",
        ISFJ: "The Defender - Dedicated, protective, focused on meeting others' needs.",
        ESTJ: "The Supervisor - Organized, practical leader who values tradition and order.",
        ESFJ: "The Provider - Caring, social, focused on harmony and cooperation.",
        ISTP: "The Virtuoso - Practical problem-solver with excellent technical skills.",
        ISFP: "The Composer - Sensitive, artistic, with strong personal values.",
        ESTP: "The Dynamo - Action-oriented, adaptable, focused on immediate results.",
        ESFP: "The Performer - Spontaneous, energetic, and people-oriented.",
      }

      return descriptions[type] || "Personality type with unique combination of traits and preferences."
    } catch (error) {
      console.error("Error getting MBTI description:", error)
      return "Personality type with unique combination of traits and preferences."
    }
  }

  // Safely get current question
  const getCurrentQuestion = () => {
    try {
      if (testState.currentQuestion >= 0 && testState.currentQuestion < personalityQuestions.length) {
        return personalityQuestions[testState.currentQuestion]
      }
      return personalityQuestions[0]
    } catch (error) {
      console.error("Error getting current question:", error)
      return personalityQuestions[0]
    }
  }

  // Current question for the test
  const currentQuestion = getCurrentQuestion()

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-950 text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-2">SCP Foundation Personnel Classification System</h1>
      <p className="text-center text-gray-400 mb-8">CLASSIFIED - LEVEL 3 CLEARANCE REQUIRED</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Controls */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4 bg-gray-800">
              <TabsTrigger value="test" className="flex items-center gap-2 data-[state=active]:bg-gray-700">
                <FileText className="h-4 w-4" />
                <span>Test</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-gray-700">
                <User className="h-4 w-4" />
                <span>Personnel Info</span>
              </TabsTrigger>
              <TabsTrigger value="photo" className="flex items-center gap-2 data-[state=active]:bg-gray-700">
                <Camera className="h-4 w-4" />
                <span>Photo</span>
              </TabsTrigger>
              <TabsTrigger value="style" className="flex items-center gap-2 data-[state=active]:bg-gray-700">
                <Type className="h-4 w-4" />
                <span>Typography</span>
              </TabsTrigger>
              <TabsTrigger value="logos" className="flex items-center gap-2 data-[state=active]:bg-gray-700">
                <Shield className="h-4 w-4" />
                <span>Logos</span>
              </TabsTrigger>
            </TabsList>

            {/* Personality Test Tab */}
            <TabsContent value="test" className="space-y-4">
              <Card className="border-2 border-gray-800 bg-gray-900 text-gray-100">
                <CardHeader className="bg-gray-800 border-b border-gray-700">
                  <CardTitle className="flex items-center gap-2 text-gray-100">
                    <ClipboardCheck className="h-5 w-5" />
                    SCP Foundation Personnel Classification Test
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Complete this assessment to determine your optimal role and clearance level within the Foundation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 pb-4">
                  {!testState.completed ? (
                    <>
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-1">
                          <span>
                            Question {testState.currentQuestion + 1} of {personalityQuestions.length}
                          </span>
                          <span>{Math.round(getTestProgress())}% Complete</span>
                        </div>
                        <Progress value={getTestProgress()} className="h-2 bg-gray-800" />
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>

                        <div className="space-y-3">
                          {currentQuestion.options.map((option) => (
                            <div
                              key={option.id}
                              onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                              className="p-4 border border-gray-700 rounded-md hover:bg-gray-800 cursor-pointer transition-colors"
                            >
                              {option.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="inline-block p-3 rounded-full bg-gray-800 mb-4">
                          <span className="text-4xl">{getRoleIcon(testState.result.role)}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{testState.result.role}</h3>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span
                            className={`inline-block w-3 h-3 rounded-full ${getClearanceLevelColor(testState.result.clearanceLevel)}`}
                          ></span>
                          <span>{getClearanceLevelLabel(testState.result.clearanceLevel)}</span>
                          <span>{getClearanceLevelIcon(testState.result.clearanceLevel)}</span>
                        </div>
                        <p className="text-gray-300 mb-4">{testState.result.description}</p>

                        <div className="bg-gray-800 p-4 rounded-md mb-4">
                          <p className="italic text-gray-300">{testState.result.explanation}</p>
                        </div>
                      </div>

                      <div
                        ref={resultCardRef}
                        className="p-6 border-2 border-gray-700 rounded-md bg-gray-800 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 opacity-5 flex items-center justify-center">
                          <img
                            src="https://i.ibb.co/9mRqNgbV/6e9ba3777b760aa9994af3b520146b0c.png"
                            alt="SCP Logo"
                            className="w-64 h-64 object-contain"
                          />
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-900 rounded-full">
                              <span className="text-3xl">{getRoleIcon(testState.result.role)}</span>
                            </div>
                            <div>
                              <h4 className="text-xl font-bold">{testState.result.role}</h4>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`inline-block w-3 h-3 rounded-full ${getClearanceLevelColor(testState.result.clearanceLevel)}`}
                                ></span>
                                <span>{getClearanceLevelLabel(testState.result.clearanceLevel)}</span>
                                <span>{getClearanceLevelIcon(testState.result.clearanceLevel)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p>{testState.result.description}</p>
                            <p className="text-gray-300 italic">{testState.result.explanation}</p>
                            <p className="text-sm text-gray-400">
                              Clearance: {getClearanceLevelDescription(testState.result.clearanceLevel)}
                            </p>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
                            <div className="text-xs text-gray-400">SCP FOUNDATION</div>
                            <div className="text-xs text-gray-400">CLASSIFIED</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={resetTest}
                          variant="outline"
                          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-100 border-gray-700"
                        >
                          <RefreshCw className="h-4 w-4" />
                          Retake Test
                        </Button>
                        <Button
                          onClick={applyResultsToCard}
                          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-100"
                        >
                          <ClipboardCheck className="h-4 w-4" />
                          Apply to ID Card
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-100 border-gray-700"
                          asChild
                        >
                          <a
                            href="https://naufalicious.vercel.app/projects/scp-card-generator"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            SCP Card Generator
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-gray-700 bg-gray-800 text-xs text-gray-400">
                  <p>
                    NOTICE: This test is for Foundation personnel classification purposes only. Results are
                    confidential.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4">
              <Card className="border border-gray-800 bg-gray-900 text-gray-100">
                <CardHeader className="bg-gray-800 border-b border-gray-700">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Personnel Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder=""
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="id" className="text-gray-300">
                        ID Number
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="id"
                          name="id"
                          value={formData.id}
                          onChange={handleFormChange}
                          placeholder="SCP-12345"
                          className="bg-gray-800 border-gray-700 text-gray-100"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={generateRandomID}
                          title="Generate Random ID"
                          className="bg-gray-800 hover:bg-gray-700 border-gray-700"
                        >
                          <RefreshCw className="h-4 w-4 text-gray-300" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-gray-300">
                        Position
                      </Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleFormChange}
                        placeholder="Senior Researcher"
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-gray-300">
                        Department
                      </Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => handleSelectChange("department", value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="site" className="text-gray-300">
                        Site
                      </Label>
                      <Select value={formData.site} onValueChange={(value) => handleSelectChange("site", value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                          <SelectValue placeholder="Select site" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                          {sites.map((site) => (
                            <SelectItem key={site.id} value={site.id}>
                              {site.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clearanceLevel" className="text-gray-300">
                        Clearance Level
                      </Label>
                      <Select
                        value={formData.clearanceLevel}
                        onValueChange={(value) => handleSelectChange("clearanceLevel", value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                          <SelectValue placeholder="Select clearance level" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                          {clearanceLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issueDate" className="text-gray-300">
                        Issue Date
                      </Label>
                      <Input
                        id="issueDate"
                        name="issueDate"
                        type="date"
                        value={formData.issueDate}
                        onChange={handleFormChange}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Photo Tab */}
            <TabsContent value="photo" className="space-y-4">
              <Card className="border border-gray-800 bg-gray-900 text-gray-100">
                <CardHeader className="bg-gray-800 border-b border-gray-700">
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Photo Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch
                      id="useDefaultPhoto"
                      checked={formData.useDefaultPhoto}
                      onCheckedChange={(checked) => handleSwitchChange("useDefaultPhoto", checked)}
                    />
                    <Label htmlFor="useDefaultPhoto" className="text-gray-300">
                      Use Default SCP Logo as Photo
                    </Label>
                  </div>

                  {!formData.useDefaultPhoto && (
                    <div className="space-y-4">
                      <Label htmlFor="photoUpload" className="text-gray-300">
                        Upload Photo
                      </Label>
                      <Input
                        id="photoUpload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />

                      {formData.photo && (
                        <div className="mt-4">
                          <Label className="text-gray-300">Photo Preview</Label>
                          <div className="mt-2 border border-gray-700 rounded-md overflow-hidden w-32 h-32">
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
              <Card className="border border-gray-800 bg-gray-900 text-gray-100">
                <CardHeader className="bg-gray-800 border-b border-gray-700">
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Typography Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Font Family</Label>
                    <RadioGroup
                      value={formData.fontFamily}
                      onValueChange={(value) => handleSelectChange("fontFamily", value)}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sans-serif" id="sans-serif" />
                        <Label htmlFor="sans-serif" className="font-sans text-gray-300">
                          Sans-serif
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="serif" id="serif" />
                        <Label htmlFor="serif" className="font-serif text-gray-300">
                          Serif
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monospace" id="monospace" />
                        <Label htmlFor="monospace" className="font-mono text-gray-300">
                          Monospace
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex flex-wrap gap-4">
            <Button
              onClick={downloadCard}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-100"
            >
              <Download className="h-4 w-4" />
              Download ID Card
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
                {formData.department in departmentLogos ? (
                  <span className="text-lg">
                    {departmentLogos[formData.department as keyof typeof departmentLogos]}
                  </span>
                ) : (
                  <img
                    src="https://i.ibb.co/9mRqNgbV/6e9ba3777b760aa9994af3b520146b0c.png"
                    alt="SCP Logo"
                    className="w-4 h-4 object-contain"
                  />
                )}
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
            <Card className="border border-gray-800 bg-gray-900 text-gray-100">
              <CardHeader className="py-3 bg-gray-800 border-b border-gray-700">
                <CardTitle className="text-sm">Selected Department & Site Info</CardTitle>
              </CardHeader>
              <CardContent className="py-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">
                        {formData.department in departmentLogos
                          ? departmentLogos[formData.department as keyof typeof departmentLogos]
                          : "🏢"}
                      </span>
                      <p className="font-semibold">
                        {departments.find((d) => d.id === formData.department)?.name} Department
                      </p>
                    </div>
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

          {/* Clearance Level Info */}
          <div className="mt-4 w-full">
            <Card className="border border-gray-800 bg-gray-900 text-gray-100">
              <CardHeader className="py-3 bg-gray-800 border-b border-gray-700">
                <CardTitle className="text-sm">Clearance Level Information</CardTitle>
              </CardHeader>
              <CardContent className="py-3 text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-block w-3 h-3 rounded-full ${getClearanceLevelColor()}`}></span>
                  <p className="font-semibold">{getClearanceLevelLabel()}</p>
                  <span>{getClearanceLevelIcon()}</span>
                </div>
                <p className="text-xs text-gray-500">{getClearanceLevelDescription()}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
