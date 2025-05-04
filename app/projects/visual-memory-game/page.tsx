"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Download, RefreshCw, Clock, Award, Brain, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

type GameMode = "beginner" | "intermediate" | "advanced"
type GamePhase = "memorize" | "recall" | "results"

interface GameStats {
  correctPatterns: number
  totalPatterns: number
  averageResponseTime: number
  fastestResponseTime: number
  slowestResponseTime: number
  totalScore: number
}

const GRID_SIZES = {
  beginner: 3, // 3x3 grid
  intermediate: 4, // 4x4 grid
  advanced: 5, // 5x5 grid
}

const PATTERN_COUNTS = {
  beginner: 3,
  intermediate: 5,
  advanced: 7,
}

const MEMORIZE_TIMES = {
  beginner: 5, // seconds
  intermediate: 4,
  advanced: 3,
}

const ROUNDS_PER_GAME = 5

export default function VisualMemoryGame() {
  const [playerName, setPlayerName] = useState("")
  const [gameMode, setGameMode] = useState<GameMode>("beginner")
  const [isPlaying, setIsPlaying] = useState(false)
  const [gamePhase, setGamePhase] = useState<GamePhase>("memorize")
  const [grid, setGrid] = useState<boolean[][]>([])
  const [userGrid, setUserGrid] = useState<boolean[][]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [round, setRound] = useState(1)
  const [startTime, setStartTime] = useState(0)
  const [gameStats, setGameStats] = useState<GameStats>({
    correctPatterns: 0,
    totalPatterns: 0,
    averageResponseTime: 0,
    fastestResponseTime: Number.POSITIVE_INFINITY,
    slowestResponseTime: 0,
    totalScore: 0,
  })
  const [roundStats, setRoundStats] = useState<{
    correctCells: number
    totalActiveCells: number
    responseTime: number
  }>({
    correctCells: 0,
    totalActiveCells: 0,
    responseTime: 0,
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const resultCardRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Initialize or reset the game grid
  const initializeGrid = () => {
    const gridSize = GRID_SIZES[gameMode]
    const patternCount = PATTERN_COUNTS[gameMode]

    // Create empty grid
    const newGrid: boolean[][] = Array(gridSize)
      .fill(false)
      .map(() => Array(gridSize).fill(false))

    // Randomly activate cells
    let activatedCells = 0
    while (activatedCells < patternCount) {
      const row = Math.floor(Math.random() * gridSize)
      const col = Math.floor(Math.random() * gridSize)

      if (!newGrid[row][col]) {
        newGrid[row][col] = true
        activatedCells++
      }
    }

    setGrid(newGrid)

    // Initialize user grid (all cells inactive)
    const emptyUserGrid: boolean[][] = Array(gridSize)
      .fill(false)
      .map(() => Array(gridSize).fill(false))
    setUserGrid(emptyUserGrid)
  }

  // Start a new game
  const startGame = () => {
    setIsPlaying(true)
    setRound(1)
    setGamePhase("memorize")
    setGameStats({
      correctPatterns: 0,
      totalPatterns: 0,
      averageResponseTime: 0,
      fastestResponseTime: Number.POSITIVE_INFINITY,
      slowestResponseTime: 0,
      totalScore: 0,
    })

    initializeGrid()
    startMemorizePhase()
  }

  // Start the memorize phase
  const startMemorizePhase = () => {
    setGamePhase("memorize")
    setTimeLeft(MEMORIZE_TIMES[gameMode])

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
  }

  // Toggle a cell in the user grid
  const toggleCell = (rowIndex: number, colIndex: number) => {
    if (gamePhase !== "recall") return

    const newUserGrid = [...userGrid]
    newUserGrid[rowIndex][colIndex] = !newUserGrid[rowIndex][colIndex]
    setUserGrid(newUserGrid)
  }

  // Submit the user's answer
  const submitAnswer = () => {
    if (gamePhase !== "recall") return

    const responseTime = (Date.now() - startTime) / 1000
    const gridSize = GRID_SIZES[gameMode]
    let correctCells = 0
    let totalActiveCells = 0

    // Count correct cells and total active cells
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j]) {
          totalActiveCells++
          if (userGrid[i][j]) {
            correctCells++
          }
        } else if (userGrid[i][j]) {
          // Penalty for incorrect selections
          correctCells--
        }
      }
    }

    // Ensure correctCells doesn't go below 0
    correctCells = Math.max(0, correctCells)

    // Calculate score for this round
    const accuracy = totalActiveCells > 0 ? correctCells / totalActiveCells : 0
    const timeBonus = Math.max(0, 10 - Math.floor(responseTime))
    const difficultyMultiplier = gameMode === "beginner" ? 1 : gameMode === "intermediate" ? 2 : 3
    const roundScore = Math.round(accuracy * 100 * difficultyMultiplier + timeBonus * difficultyMultiplier)

    // Update round stats
    setRoundStats({
      correctCells,
      totalActiveCells,
      responseTime,
    })

    // Update game stats
    setGameStats((prev) => {
      const newTotalPatterns = prev.totalPatterns + totalActiveCells
      const newCorrectPatterns = prev.correctPatterns + correctCells
      const newTotalTime = prev.averageResponseTime * (round - 1) + responseTime
      const newAverageTime = newTotalTime / round
      const newFastestTime = Math.min(prev.fastestResponseTime, responseTime)
      const newSlowestTime = Math.max(prev.slowestResponseTime, responseTime)
      const newTotalScore = prev.totalScore + roundScore

      return {
        correctPatterns: newCorrectPatterns,
        totalPatterns: newTotalPatterns,
        averageResponseTime: newAverageTime,
        fastestResponseTime: newFastestTime,
        slowestResponseTime: newSlowestTime,
        totalScore: newTotalScore,
      }
    })

    // Show toast with round results
    toast({
      title: `Round ${round} Results`,
      description: `Score: ${roundScore} | Accuracy: ${Math.round(accuracy * 100)}% | Time: ${responseTime.toFixed(2)}s`,
      variant: accuracy >= 0.7 ? "default" : "destructive",
    })

    // Move to next round or end game
    if (round < ROUNDS_PER_GAME) {
      setRound((prev) => prev + 1)
      initializeGrid()
      startMemorizePhase()
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

  // Get a grade based on score and game mode
  const getGrade = () => {
    const maxPossibleScore =
      ROUNDS_PER_GAME * 100 * (gameMode === "beginner" ? 1 : gameMode === "intermediate" ? 2 : 3) * 1.1 // Adding 10% for perfect time bonus
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
    ctx.fillText("Visual Memory Game Results", canvas.width / 2, 80)

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
    ctx.fillText(`Mode: ${gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}`, 100, 230)
    ctx.fillText(`Rounds: ${ROUNDS_PER_GAME}`, 100, 270)

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
      `Pattern Accuracy: ${gameStats.totalPatterns > 0 ? Math.round((gameStats.correctPatterns / gameStats.totalPatterns) * 100) : 0}%`,
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
    ctx.fillText(`Correct Patterns: ${gameStats.correctPatterns}/${gameStats.totalPatterns}`, canvas.width - 100, 460)
    ctx.fillText(`Rounds Completed: ${ROUNDS_PER_GAME}`, canvas.width - 100, 490)
    ctx.fillText(`Slowest Response: ${gameStats.slowestResponseTime.toFixed(2)}s`, canvas.width - 100, 520)

    // Add footer
    ctx.fillStyle = "#64748b"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Visual Memory Game - Right Brain Enhancement", canvas.width / 2, 570)

    // Convert to image and download
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = `visual-memory-results-${date}.png`
    link.href = dataUrl
    link.click()

    toast({
      title: "Success!",
      description: "Your result card has been downloaded.",
    })
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
      <h1 className="text-3xl font-bold text-center mb-8">Visual Memory Game</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Enhance your right-brain functions by memorizing and recalling visual patterns. This game improves spatial
        memory, pattern recognition, and visual processing skills.
      </p>

      {!isPlaying && gamePhase !== "results" && (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Game Settings</CardTitle>
            <CardDescription>Choose your difficulty level</CardDescription>
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
              <RadioGroup value={gameMode} onValueChange={(value) => setGameMode(value as GameMode)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner">Beginner (3×3 grid, 3 patterns)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate (4×4 grid, 5 patterns)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced">Advanced (5×5 grid, 7 patterns)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-2">
              <p className="text-sm text-gray-500 mb-2">Memorize Time: {MEMORIZE_TIMES[gameMode]} seconds</p>
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

      {isPlaying && (
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  Round {round}/{ROUNDS_PER_GAME}
                </CardTitle>
                <div className="text-lg font-semibold">Score: {gameStats.totalScore}</div>
              </div>
              {gamePhase === "memorize" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memorize Time</span>
                    <span>{timeLeft}s</span>
                  </div>
                  <Progress value={(timeLeft / MEMORIZE_TIMES[gameMode]) * 100} />
                </div>
              )}
              <CardDescription>
                {gamePhase === "memorize" ? "Memorize the pattern!" : "Recreate the pattern you just saw"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 justify-center mb-4">
                {Array.from({ length: GRID_SIZES[gameMode] }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex gap-2">
                    {Array.from({ length: GRID_SIZES[gameMode] }).map((_, colIndex) => (
                      <button
                        key={colIndex}
                        className={cn(
                          "w-12 h-12 border rounded-md transition-colors",
                          gamePhase === "memorize" && grid[rowIndex]?.[colIndex]
                            ? "bg-blue-500 border-blue-600"
                            : gamePhase === "recall" && userGrid[rowIndex]?.[colIndex]
                              ? "bg-green-500 border-green-600"
                              : "bg-gray-100 border-gray-200 hover:bg-gray-200",
                        )}
                        onClick={() => toggleCell(rowIndex, colIndex)}
                        disabled={gamePhase === "memorize"}
                        aria-label={`Cell ${rowIndex}-${colIndex}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              {gamePhase === "recall" && (
                <Button onClick={submitAnswer} className="w-full">
                  Submit Pattern
                </Button>
              )}
              {gamePhase === "memorize" && (
                <div className="w-full text-center text-sm text-gray-500">Memorize the highlighted cells...</div>
              )}
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
                        {gameStats.totalPatterns > 0
                          ? Math.round((gameStats.correctPatterns / gameStats.totalPatterns) * 100)
                          : 0}
                        %
                      </div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Brain className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Patterns</div>
                      <div className="text-xl font-semibold">
                        {gameStats.correctPatterns}/{gameStats.totalPatterns}
                      </div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Eye className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Difficulty</div>
                      <div className="text-xl font-semibold">
                        {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2">Game Details</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-gray-500">Mode:</span>{" "}
                      {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}
                    </div>
                    <div>
                      <span className="text-gray-500">Grid Size:</span> {GRID_SIZES[gameMode]}×{GRID_SIZES[gameMode]}
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
                      <span className="text-gray-500">Correct Patterns:</span> {gameStats.correctPatterns}
                    </div>
                    <div>
                      <span className="text-gray-500">Total Patterns:</span> {gameStats.totalPatterns}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  setGamePhase("memorize")
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
