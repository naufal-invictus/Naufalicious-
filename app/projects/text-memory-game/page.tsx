"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Download, RefreshCw, Clock, Award, Brain, BookOpen } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type GameDifficulty = "easy" | "medium" | "hard" | "very-hard"
type GamePhase = "instruction" | "memorize" | "recall" | "results"
type SequenceType = "words" | "symbols" | "phrases" | "mixed"

interface GameStats {
  correctSequences: number
  totalSequences: number
  averageResponseTime: number
  fastestResponseTime: number
  slowestResponseTime: number
  totalScore: number
  longestSequence: number
}

// Abstract symbols for the game
const ABSTRACT_SYMBOLS = [
  "⦿",
  "⦾",
  "◉",
  "◎",
  "◌",
  "◍",
  "◯",
  "⊕",
  "⊖",
  "⊗",
  "⊘",
  "⊙",
  "⊚",
  "⊛",
  "⊜",
  "⊝",
  "△",
  "▲",
  "▴",
  "▵",
  "▶",
  "▷",
  "▸",
  "▹",
  "►",
  "▻",
  "▼",
  "▽",
  "▾",
  "▿",
  "◀",
  "◁",
  "◂",
  "◃",
  "◄",
  "◅",
  "◆",
  "◇",
  "◈",
  "◉",
  "◊",
  "○",
  "◌",
  "◍",
  "◎",
  "●",
  "◐",
  "◑",
  "◒",
  "◓",
  "◔",
  "◕",
  "◖",
  "◗",
  "◘",
  "◙",
  "◚",
  "◛",
  "◜",
  "◝",
  "◞",
  "◟",
  "◠",
  "◡",
]

// Abstract words for the game
const ABSTRACT_WORDS = [
  "ephemeral",
  "serendipity",
  "quintessence",
  "ethereal",
  "paradigm",
  "enigma",
  "paradox",
  "axiom",
  "synthesis",
  "dichotomy",
  "juxtapose",
  "nebulous",
  "ineffable",
  "esoteric",
  "ubiquitous",
  "ambiguous",
  "cognition",
  "metaphysical",
  "transcendent",
  "sublime",
  "intrinsic",
  "extrinsic",
  "arbitrary",
  "empirical",
  "synchronicity",
  "duality",
  "entropy",
  "quantum",
  "relativity",
  "abstraction",
  "perception",
  "consciousness",
]

// Abstract phrases for the game
const ABSTRACT_PHRASES = [
  "silent echoes",
  "frozen time",
  "liquid thoughts",
  "dancing shadows",
  "forgotten memories",
  "invisible connections",
  "quantum whispers",
  "abstract reality",
  "conscious void",
  "eternal moment",
  "fragmented wholeness",
  "paradoxical truth",
  "structured chaos",
  "ordered randomness",
  "complex simplicity",
  "beautiful destruction",
  "harmonious discord",
  "organized entropy",
  "logical absurdity",
  "perfect imperfection",
]

// Difficulty settings
const DIFFICULTY_SETTINGS = {
  easy: {
    sequenceLength: { min: 3, max: 5 },
    memorizeTime: 5, // seconds
    distractionLevel: 0,
  },
  medium: {
    sequenceLength: { min: 4, max: 7 },
    memorizeTime: 4,
    distractionLevel: 1,
  },
  hard: {
    sequenceLength: { min: 5, max: 9 },
    memorizeTime: 3,
    distractionLevel: 2,
  },
  "very-hard": {
    sequenceLength: { min: 7, max: 12 },
    memorizeTime: 2,
    distractionLevel: 3,
  },
}

const ROUNDS_PER_GAME = 5

export default function TextMemoryGame() {
  const [playerName, setPlayerName] = useState("")
  const [difficulty, setDifficulty] = useState<GameDifficulty>("medium")
  const [sequenceType, setSequenceType] = useState<SequenceType>("words")
  const [isPlaying, setIsPlaying] = useState(false)
  const [gamePhase, setGamePhase] = useState<GamePhase>("instruction")
  const [currentSequence, setCurrentSequence] = useState<string[]>([])
  const [userInput, setUserInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [round, setRound] = useState(1)
  const [startTime, setStartTime] = useState(0)
  const [gameStats, setGameStats] = useState<GameStats>({
    correctSequences: 0,
    totalSequences: 0,
    averageResponseTime: 0,
    fastestResponseTime: Number.POSITIVE_INFINITY,
    slowestResponseTime: 0,
    totalScore: 0,
    longestSequence: 0,
  })
  const [roundStats, setRoundStats] = useState({
    isCorrect: false,
    responseTime: 0,
    sequenceLength: 0,
  })
  const [distractions, setDistractions] = useState<string[]>([])

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultCardRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Generate a sequence based on the selected type and difficulty
  const generateSequence = useCallback(() => {
    const settings = DIFFICULTY_SETTINGS[difficulty]
    const length =
      Math.floor(Math.random() * (settings.sequenceLength.max - settings.sequenceLength.min + 1)) +
      settings.sequenceLength.min

    const sequence: string[] = []
    let sourceArray: string[] = []

    switch (sequenceType) {
      case "words":
        sourceArray = ABSTRACT_WORDS
        break
      case "symbols":
        sourceArray = ABSTRACT_SYMBOLS
        break
      case "phrases":
        sourceArray = ABSTRACT_PHRASES
        break
      case "mixed":
        // Combine all types with weighted distribution
        sourceArray = [...ABSTRACT_WORDS, ...ABSTRACT_SYMBOLS, ...ABSTRACT_PHRASES]
        break
    }

    // Generate the sequence
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * sourceArray.length)
      sequence.push(sourceArray[randomIndex])
    }

    return sequence
  }, [difficulty, sequenceType])

  // Generate distractions based on difficulty
  const generateDistractions = useCallback(() => {
    const settings = DIFFICULTY_SETTINGS[difficulty]
    if (settings.distractionLevel === 0) return []

    const distractionCount = settings.distractionLevel * 2
    const distractions: string[] = []

    // Mix of symbols and words for distractions
    const distractionPool = [...ABSTRACT_SYMBOLS, ...ABSTRACT_WORDS.slice(0, 10)]

    for (let i = 0; i < distractionCount; i++) {
      const randomIndex = Math.floor(Math.random() * distractionPool.length)
      distractions.push(distractionPool[randomIndex])
    }

    return distractions
  }, [difficulty])

  // Start a new game
  const startGame = () => {
    setIsPlaying(true)
    setRound(1)
    setGamePhase("instruction")
    setGameStats({
      correctSequences: 0,
      totalSequences: 0,
      averageResponseTime: 0,
      fastestResponseTime: Number.POSITIVE_INFINITY,
      slowestResponseTime: 0,
      totalScore: 0,
      longestSequence: 0,
    })

    startNextRound()
  }

  // Start the next round
  const startNextRound = () => {
    const sequence = generateSequence()
    setCurrentSequence(sequence)
    setDistractions(generateDistractions())
    setUserInput("")
    setGamePhase("instruction")

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Start the memorize phase
  const startMemorizePhase = () => {
    setGamePhase("memorize")
    const settings = DIFFICULTY_SETTINGS[difficulty]
    setTimeLeft(settings.memorizeTime)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          startRecallPhase()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Start the recall phase
  const startRecallPhase = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setGamePhase("recall")
    setStartTime(Date.now())

    // Focus on the input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  // Check the user's answer
  const checkAnswer = () => {
    if (gamePhase !== "recall") return

    const responseTime = (Date.now() - startTime) / 1000
    const userSequence = userInput.trim().split(/\s+/)

    // Check if the sequences match
    let isCorrect = true
    if (userSequence.length !== currentSequence.length) {
      isCorrect = false
    } else {
      for (let i = 0; i < currentSequence.length; i++) {
        if (userSequence[i].toLowerCase() !== currentSequence[i].toLowerCase()) {
          isCorrect = false
          break
        }
      }
    }

    // Update round stats
    setRoundStats({
      isCorrect,
      responseTime,
      sequenceLength: currentSequence.length,
    })

    // Update game stats
    setGameStats((prev) => {
      const newTotalSequences = prev.totalSequences + 1
      const newCorrectSequences = prev.correctSequences + (isCorrect ? 1 : 0)
      const newTotalTime = prev.averageResponseTime * (round - 1) + responseTime
      const newAverageTime = newTotalTime / round
      const newFastestTime = Math.min(prev.fastestResponseTime, responseTime)
      const newSlowestTime = Math.max(prev.slowestResponseTime, responseTime)
      const newLongestSequence = Math.max(prev.longestSequence, currentSequence.length)

      // Calculate score for this round
      const difficultyMultiplier = {
        easy: 1,
        medium: 2,
        hard: 3,
        "very-hard": 5,
      }[difficulty]

      const sequenceLengthBonus = currentSequence.length * 5
      const timeBonus = Math.max(0, 10 - Math.floor(responseTime))
      const roundScore = isCorrect
        ? Math.round((100 + sequenceLengthBonus) * difficultyMultiplier + timeBonus * difficultyMultiplier)
        : 0

      return {
        correctSequences: newCorrectSequences,
        totalSequences: newTotalSequences,
        averageResponseTime: newAverageTime,
        fastestResponseTime: newFastestTime,
        slowestResponseTime: newSlowestTime,
        totalScore: prev.totalScore + roundScore,
        longestSequence: newLongestSequence,
      }
    })

    // Show toast with round results
    toast({
      title: isCorrect ? "Correct!" : "Incorrect!",
      description: isCorrect
        ? `Great job! You recalled the sequence in ${responseTime.toFixed(2)}s`
        : `The correct sequence was: ${currentSequence.join(" ")}`,
      variant: isCorrect ? "default" : "destructive",
    })

    // Move to next round or end game
    if (round < ROUNDS_PER_GAME) {
      setRound((prev) => prev + 1)
      startNextRound()
    } else {
      endGame()
    }
  }

  // End the game
  const endGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setGamePhase("results")
    setIsPlaying(false)
  }

  // Get a grade based on score and difficulty
  const getGrade = () => {
    const maxPossibleScore =
      ROUNDS_PER_GAME *
      150 *
      {
        easy: 1,
        medium: 2,
        hard: 3,
        "very-hard": 5,
      }[difficulty]

    const percentage = (gameStats.totalScore / maxPossibleScore) * 100

    if (percentage >= 90) return "A+"
    if (percentage >= 80) return "A"
    if (percentage >= 70) return "B"
    if (percentage >= 60) return "C"
    if (percentage >= 50) return "D"
    return "F"
  }

  // Get color for grade
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "#15803d" // Green
      case "B":
        return "#0369a1" // Blue
      case "C":
        return "#ca8a04" // Yellow
      case "D":
        return "#ea580c" // Orange
      default:
        return "#b91c1c" // Red
    }
  }

  // Download result card as image
  const downloadResultCard = () => {
    if (!resultCardRef.current) return

    const canvas = document.createElement("canvas")
    canvas.width = 800
    canvas.height = 600
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      toast({
        title: "Error",
        description: "Could not create canvas context",
        variant: "destructive",
      })
      return
    }

    // Set background
    ctx.fillStyle = "#f8fafc" // Light background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add border
    ctx.strokeStyle = "#94a3b8"
    ctx.lineWidth = 10
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

    // Add header
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 40px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Abstract Text Memory Game Results", canvas.width / 2, 80)

    // Add player name
    ctx.font = "bold 30px Arial"
    ctx.fillText(playerName || "Anonymous Player", canvas.width / 2, 130)

    // Add date
    const date = new Date().toLocaleDateString()
    ctx.font = "20px Arial"
    ctx.fillText(date, canvas.width / 2, 160)

    // Add divider
    ctx.strokeStyle = "#cbd5e1"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(100, 180)
    ctx.lineTo(canvas.width - 100, 180)
    ctx.stroke()

    // Add game info
    ctx.fillStyle = "#334155"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "left"
    ctx.fillText(`Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1).replace("-", " ")}`, 100, 230)
    ctx.fillText(`Sequence Type: ${sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)}`, 100, 270)

    // Add score and grade
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 36px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`Score: ${gameStats.totalScore}`, canvas.width / 2, 330)

    ctx.fillStyle = getGradeColor(getGrade())
    ctx.font = "bold 60px Arial"
    ctx.fillText(getGrade(), canvas.width / 2, 400)

    // Add stats
    ctx.fillStyle = "#334155"
    ctx.font = "20px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      `Accuracy: ${gameStats.totalSequences > 0 ? Math.round((gameStats.correctSequences / gameStats.totalSequences) * 100) : 0}%`,
      100,
      460,
    )
    ctx.fillText(`Average Response Time: ${gameStats.averageResponseTime.toFixed(2)}s`, 100, 490)
    ctx.fillText(
      `Fastest Response: ${gameStats.fastestResponseTime === Number.POSITIVE_INFINITY ? "N/A" : gameStats.fastestResponseTime.toFixed(2) + "s"}`,
      100,
      520,
    )

    ctx.textAlign = "right"
    ctx.fillText(
      `Correct Sequences: ${gameStats.correctSequences}/${gameStats.totalSequences}`,
      canvas.width - 100,
      460,
    )
    ctx.fillText(`Longest Sequence: ${gameStats.longestSequence} items`, canvas.width - 100, 490)
    ctx.fillText(`Slowest Response: ${gameStats.slowestResponseTime.toFixed(2)}s`, canvas.width - 100, 520)

    // Add footer
    ctx.fillStyle = "#64748b"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Abstract Text Memory Game - Cognitive Enhancement", canvas.width / 2, 570)

    // Convert to image and download
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = `text-memory-results-${date}.png`
    link.href = dataUrl
    link.click()

    toast({
      title: "Success!",
      description: "Your result card has been downloaded.",
    })
  }

  // Handle key press (Enter to submit)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && gamePhase === "recall") {
      checkAnswer()
    }
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 mb-16">
      <h1 className="text-3xl font-bold text-center mb-8">Abstract Text Memory Game</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Challenge your cognitive abilities with this abstract text-based memory game. Memorize sequences of words,
        symbols, or phrases and test your recall capacity.
      </p>

      {!isPlaying && gamePhase !== "results" && (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Game Settings</CardTitle>
            <CardDescription>Choose your difficulty level and sequence type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playerName">Your Name</Label>
              <Input
                id="playerName"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <RadioGroup value={difficulty} onValueChange={(value) => setDifficulty(value as GameDifficulty)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="easy" id="easy" />
                  <Label htmlFor="easy">Easy (3-5 items, 5s memorize)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium (4-7 items, 4s memorize)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hard" id="hard" />
                  <Label htmlFor="hard">Hard (5-9 items, 3s memorize)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-hard" id="very-hard" />
                  <Label htmlFor="very-hard">Very Hard (7-12 items, 2s memorize)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Sequence Type</Label>
              <RadioGroup value={sequenceType} onValueChange={(value) => setSequenceType(value as SequenceType)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="words" id="words" />
                  <Label htmlFor="words">Abstract Words (ephemeral, paradigm, etc.)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="symbols" id="symbols" />
                  <Label htmlFor="symbols">Abstract Symbols (⦿, ◉, △, etc.)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phrases" id="phrases" />
                  <Label htmlFor="phrases">Abstract Phrases (silent echoes, etc.)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed">Mixed (combination of all types)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-2">
              <p className="text-sm text-gray-500 mb-2">
                Memorize Time: {DIFFICULTY_SETTINGS[difficulty].memorizeTime} seconds
              </p>
              <p className="text-sm text-gray-500">Rounds: {ROUNDS_PER_GAME}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startGame} className="w-full">
              Start Game
            </Button>
          </CardFooter>
        </Card>
      )}

      {isPlaying && gamePhase === "instruction" && (
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                Round {round}/{ROUNDS_PER_GAME}
              </CardTitle>
              <CardDescription>Get ready to memorize the sequence</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">You will be shown a sequence of {currentSequence.length} items.</p>
              <p className="mb-4">
                You'll have {DIFFICULTY_SETTINGS[difficulty].memorizeTime} seconds to memorize them.
              </p>
              <p className="mb-4">After that, you'll need to recall and type them in the exact same order.</p>
              <p className="text-sm text-gray-500 italic">
                {difficulty === "hard" || difficulty === "very-hard"
                  ? "Watch out for distractions that may appear on screen!"
                  : "Focus and concentrate on the sequence."}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={startMemorizePhase} className="w-full">
                I'm Ready
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {isPlaying && gamePhase === "memorize" && (
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Memorize!</CardTitle>
                <div className="text-lg font-semibold">{timeLeft}s</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Time Left</span>
                  <span>{timeLeft}s</span>
                </div>
                <Progress value={(timeLeft / DIFFICULTY_SETTINGS[difficulty].memorizeTime) * 100} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center min-h-[200px] relative">
                <div className="text-center space-y-4">
                  {currentSequence.map((item, index) => (
                    <div key={index} className="text-xl font-medium">
                      {item}
                    </div>
                  ))}
                </div>

                {/* Distractions */}
                {distractions.length > 0 && (
                  <>
                    {distractions.map((distraction, index) => (
                      <div
                        key={index}
                        className="absolute text-gray-400 animate-pulse"
                        style={{
                          top: `${Math.random() * 80 + 10}%`,
                          left: `${Math.random() * 80 + 10}%`,
                          transform: `rotate(${Math.random() * 40 - 20}deg)`,
                          opacity: 0.7,
                          fontSize: `${Math.random() * 0.5 + 0.8}rem`,
                        }}
                      >
                        {distraction}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center text-sm text-gray-500">Memorize the sequence above...</div>
            </CardFooter>
          </Card>
        </div>
      )}

      {isPlaying && gamePhase === "recall" && (
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Recall the Sequence</CardTitle>
              <CardDescription>Type the items in the exact order they appeared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">
                  {sequenceType === "words"
                    ? "Type each word separated by spaces"
                    : sequenceType === "symbols"
                      ? "Type each symbol separated by spaces"
                      : sequenceType === "phrases"
                        ? "Type each phrase exactly as shown, separated by spaces"
                        : "Type each item separated by spaces"}
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Round {round}/{ROUNDS_PER_GAME} •{" "}
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1).replace("-", " ")} Difficulty
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recall">Your Answer</Label>
                <Input
                  id="recall"
                  ref={inputRef}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type the sequence here..."
                  className="text-center"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={checkAnswer} disabled={!userInput.trim()} className="w-full">
                Submit Answer
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {gamePhase === "results" && (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Game Complete!</CardTitle>
              <CardDescription>{playerName ? `${playerName}, here` : "Here"}'s how you did</CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={resultCardRef} className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold">Final Score</h3>
                    <div className="text-5xl font-bold">{gameStats.totalScore}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Grade:{" "}
                      <span className="font-semibold" style={{ color: getGradeColor(getGrade()) }}>
                        {getGrade()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Clock className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Avg. Response</div>
                      <div className="text-xl font-semibold">{gameStats.averageResponseTime.toFixed(2)}s</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Award className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Accuracy</div>
                      <div className="text-xl font-semibold">
                        {gameStats.totalSequences > 0
                          ? Math.round((gameStats.correctSequences / gameStats.totalSequences) * 100)
                          : 0}
                        %
                      </div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Brain className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Sequences</div>
                      <div className="text-xl font-semibold">
                        {gameStats.correctSequences}/{gameStats.totalSequences}
                      </div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg">
                      <BookOpen className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Longest</div>
                      <div className="text-xl font-semibold">{gameStats.longestSequence} items</div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2">Game Details</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-gray-500">Difficulty:</span>{" "}
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1).replace("-", " ")}
                    </div>
                    <div>
                      <span className="text-gray-500">Sequence Type:</span>{" "}
                      {sequenceType.charAt(0).toUpperCase() + sequenceType.slice(1)}
                    </div>
                    <div>
                      <span className="text-gray-500">Fastest Response:</span>{" "}
                      {gameStats.fastestResponseTime === Number.POSITIVE_INFINITY
                        ? "N/A"
                        : `${gameStats.fastestResponseTime.toFixed(2)}s`}
                    </div>
                    <div>
                      <span className="text-gray-500">Slowest Response:</span>{" "}
                      {`${gameStats.slowestResponseTime.toFixed(2)}s`}
                    </div>
                    <div>
                      <span className="text-gray-500">Correct Sequences:</span> {gameStats.correctSequences}
                    </div>
                    <div>
                      <span className="text-gray-500">Total Sequences:</span> {gameStats.totalSequences}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  setGamePhase("instruction")
                  setIsPlaying(false)
                }}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
              <Button onClick={downloadResultCard} className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Download Result Card
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
