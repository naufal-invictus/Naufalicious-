"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Download, RefreshCw, Clock, Award, Brain, Calculator } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Update the TIME_LIMIT object to include time-based challenges
const TIME_LIMIT = {
  easy: 60,
  medium: 45,
  hard: 30,
  "1min": 60,
  "30min": 1800,
  "1hour": 3600,
}

// Update the GameMode type to include time-based challenges
type GameMode = "easy" | "medium" | "hard" | "1min" | "30min" | "1hour"
type Operation = "+" | "-" | "×" | "÷" | "mixed"
type GameType = "standard" | "timed"
type TimeChallenge = "1min" | "30min" | "60min"

type Question = {
  question: string
  answer: number
  operation: string
  operand1: number
  operand2: number
}

const TOTAL_QUESTIONS = 15
// const TIME_LIMIT = {
//   easy: 60,
//   medium: 45,
//   hard: 30,
// }

const TIME_CHALLENGE_SECONDS = {
  "1min": 60,
  "30min": 1800,
  "60min": 3600,
}

const OPERATIONS: Operation[] = ["+", "-", "×", "÷", "mixed"]

export default function MathGame() {
  const [gameMode, setGameMode] = useState<GameMode>("easy")
  const [operation, setOperation] = useState<Operation>("+")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [questionNumber, setQuestionNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT.easy)
  const [startTime, setStartTime] = useState(0)
  const [questionStartTime, setQuestionStartTime] = useState(0)
  const [averageResponseTime, setAverageResponseTime] = useState(0)
  const [totalResponseTime, setTotalResponseTime] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [fastestResponse, setFastestResponse] = useState(Number.POSITIVE_INFINITY)
  const [slowestResponse, setSlowestResponse] = useState(0)
  const [playerName, setPlayerName] = useState("")
  const [gameType, setGameType] = useState<GameType>("standard")
  const [timeChallenge, setTimeChallenge] = useState<TimeChallenge>("1min")
  const [questionsAnswered, setQuestionsAnswered] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const resultCardRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // Update the generateQuestion function to increase the difficulty of the "Easy" mode
  const generateQuestion = useCallback(() => {
    let operand1: number, operand2: number, answer: number, questionText: string
    let op: Operation = operation

    // If mixed operation is selected, randomly choose one
    if (operation === "mixed") {
      const ops: Operation[] = ["+", "-", "×", "÷"]
      op = ops[Math.floor(Math.random() * ops.length)]
    }

    // Generate operands based on difficulty
    switch (gameMode) {
      case "easy":
        operand1 = Math.floor(Math.random() * 15) + 1 // 1-15 (increased from 1-10)
        operand2 = Math.floor(Math.random() * 15) + 1 // 1-15 (increased from 1-10)
        break
      case "medium":
        operand1 = Math.floor(Math.random() * 20) + 1 // 1-20
        operand2 = Math.floor(Math.random() * 20) + 1 // 1-20
        break
      case "hard":
      case "1min":
      case "30min":
      case "1hour":
        operand1 = Math.floor(Math.random() * 50) + 1 // 1-50
        operand2 = Math.floor(Math.random() * 30) + 1 // 1-30
        break
      default:
        operand1 = Math.floor(Math.random() * 15) + 1
        operand2 = Math.floor(Math.random() * 15) + 1
    }

    // For division, ensure we have clean division (no remainders)
    if (op === "÷") {
      // For division, make sure operand2 is a factor of operand1
      operand2 = Math.floor(Math.random() * 10) + 1 // 1-10
      operand1 = operand2 * (Math.floor(Math.random() * 10) + 1) // Make operand1 a multiple of operand2
    }

    // Calculate answer based on operation
    switch (op) {
      case "+":
        answer = operand1 + operand2
        questionText = `${operand1} + ${operand2}`
        break
      case "-":
        // Ensure no negative answers
        if (operand1 < operand2) {
          ;[operand1, operand2] = [operand2, operand1]
        }
        answer = operand1 - operand2
        questionText = `${operand1} - ${operand2}`
        break
      case "×":
        answer = operand1 * operand2
        questionText = `${operand1} × ${operand2}`
        break
      case "÷":
        answer = operand1 / operand2
        questionText = `${operand1} ÷ ${operand2}`
        break
      default:
        answer = operand1 + operand2
        questionText = `${operand1} + ${operand2}`
    }

    return {
      question: questionText,
      answer,
      operation: op,
      operand1,
      operand2,
    }
  }, [gameMode, operation])

  // Update the startGame function to handle unlimited questions for time-based challenges
  const startGame = () => {
    setIsPlaying(true)
    setIsGameOver(false)
    setQuestionNumber(0)
    setScore(0)
    setQuestionsAnswered(0)

    if (gameType === "standard") {
      setTimeLeft(TIME_LIMIT[gameMode])
    } else {
      setTimeLeft(TIME_CHALLENGE_SECONDS[timeChallenge])
    }

    setStartTime(Date.now())
    setTotalResponseTime(0)
    setCorrectAnswers(0)
    setWrongAnswers(0)
    setFastestResponse(Number.POSITIVE_INFINITY)
    setSlowestResponse(0)
    nextQuestion()

    // Start the timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Move to the next question
  const nextQuestion = () => {
    const question = generateQuestion()
    setCurrentQuestion(question)
    setUserAnswer("")
    setQuestionStartTime(Date.now())

    // Focus on the input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  // Update the checkAnswer function to handle unlimited questions for time-based challenges
  const checkAnswer = () => {
    if (!currentQuestion || !isPlaying) return

    const responseTime = (Date.now() - questionStartTime) / 1000
    setTotalResponseTime((prev) => prev + responseTime)

    // Update fastest and slowest response times
    if (responseTime < fastestResponse) {
      setFastestResponse(responseTime)
    }
    if (responseTime > slowestResponse) {
      setSlowestResponse(responseTime)
    }

    const userAnswerNum = Number.parseFloat(userAnswer)
    const isCorrect = userAnswerNum === currentQuestion.answer

    if (isCorrect) {
      // Calculate points based on response time and difficulty
      let timeBonus = 0
      switch (gameMode) {
        case "easy":
          timeBonus = Math.max(0, 5 - Math.floor(responseTime))
          break
        case "medium":
        case "1min":
        case "30min":
        case "1hour":
          timeBonus = Math.max(0, 8 - Math.floor(responseTime))
          break
        case "hard":
          timeBonus = Math.max(0, 10 - Math.floor(responseTime))
          break
      }

      const basePoints = {
        easy: 10,
        medium: 20,
        hard: 30,
        "1min": 20,
        "30min": 20,
        "1hour": 20,
      }[gameMode]

      const points = basePoints + timeBonus
      setScore((prev) => prev + points)
      setCorrectAnswers((prev) => prev + 1)

      toast({
        title: "Correct!",
        description: `+${points} points${timeBonus > 0 ? ` (including ${timeBonus} speed bonus)` : ""}`,
        variant: "default",
      })
    } else {
      setWrongAnswers((prev) => prev + 1)
      toast({
        title: "Wrong!",
        description: `The correct answer was ${currentQuestion.answer}`,
        variant: "destructive",
      })
    }

    // Move to the next question or end the game
    setQuestionsAnswered((prev) => prev + 1)

    // Move to the next question or end the game
    setQuestionNumber((prev) => {
      const next = prev + 1
      // For time-based challenges, continue until time runs out
      if (["1min", "30min", "1hour"].includes(gameMode)) {
        nextQuestion()
        return next
      }
      // For regular modes, end after TOTAL_QUESTIONS
      if (next >= TOTAL_QUESTIONS) {
        endGame()
        return TOTAL_QUESTIONS
      }
      nextQuestion()
      return next
    })
  }

  // End the game
  const endGame = () => {
    setIsPlaying(false)
    setIsGameOver(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Calculate average response time
    if (questionsAnswered > 0) {
      setAverageResponseTime(totalResponseTime / questionsAnswered)
    }
  }

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and a single decimal point
    const value = e.target.value.replace(/[^0-9.]/g, "")
    // Ensure only one decimal point
    const decimalCount = (value.match(/\./g) || []).length
    if (decimalCount > 1) {
      return
    }
    setUserAnswer(value)
  }

  // Handle key press (Enter to submit)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userAnswer) {
      checkAnswer()
    }
  }

  // Update the getGrade function to handle time-based challenges
  const getGrade = () => {
    // For time-based challenges, base the grade on the number of correct answers
    if (["1min", "30min", "1hour"].includes(gameMode)) {
      if (correctAnswers >= 50) return "A+"
      if (correctAnswers >= 40) return "A"
      if (correctAnswers >= 30) return "B"
      if (correctAnswers >= 20) return "C"
      if (correctAnswers >= 10) return "D"
      return "F"
    }

    // For regular modes, use the existing logic
    const maxPossibleScore = {
      easy: TOTAL_QUESTIONS * 15, // 10 base + max 5 time bonus
      medium: TOTAL_QUESTIONS * 28, // 20 base + max 8 time bonus
      hard: TOTAL_QUESTIONS * 40, // 30 base + max 10 time bonus
    }[gameMode as "easy" | "medium" | "hard"]

    const percentage = (score / maxPossibleScore) * 100

    if (percentage >= 90) return "A+"
    if (percentage >= 80) return "A"
    if (percentage >= 70) return "B"
    if (percentage >= 60) return "C"
    if (percentage >= 50) return "D"
    return "F"
  }

  // Format time display (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
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
    ctx.fillText("Math Game Results", canvas.width / 2, 80)

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

    if (gameType === "standard") {
      ctx.fillText(`Questions: ${TOTAL_QUESTIONS}`, 100, 270)
    } else {
      ctx.fillText(`Time Challenge: ${timeChallenge}`, 100, 270)
    }

    // Add score and grade
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 36px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 330)

    ctx.fillStyle = getGradeColor(getGrade())
    ctx.font = "bold 60px Arial"
    ctx.fillText(getGrade(), canvas.width / 2, 400)

    // Add stats
    ctx.fillStyle = "#334155"
    ctx.font = "20px Arial"
    ctx.textAlign = "left"
    ctx.fillText(`Correct Answers: ${correctAnswers}/${questionsAnswered}`, 100, 460)
    ctx.fillText(`Average Response Time: ${averageResponseTime.toFixed(2)}s`, 100, 490)
    ctx.fillText(
      `Fastest Response: ${fastestResponse === Number.POSITIVE_INFINITY ? "N/A" : fastestResponse.toFixed(2) + "s"}`,
      100,
      520,
    )

    ctx.textAlign = "right"
    ctx.fillText(`Accuracy: ${((correctAnswers / questionsAnswered) * 100).toFixed(1)}%`, canvas.width - 100, 460)

    if (gameType === "standard") {
      ctx.fillText(`Time Used: ${TIME_LIMIT[gameMode] - timeLeft}s`, canvas.width - 100, 490)
    } else {
      ctx.fillText(`Time Challenge: ${timeChallenge}`, canvas.width - 100, 490)
    }

    ctx.fillText(`Slowest Response: ${slowestResponse.toFixed(2)}s`, canvas.width - 100, 520)

    // Add footer
    ctx.fillStyle = "#64748b"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Fast Math Operation Game", canvas.width / 2, 570)

    // Convert to image and download
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = `math-game-results-${date}.png`
    link.href = dataUrl
    link.click()

    toast({
      title: "Success!",
      description: "Your result card has been downloaded.",
    })
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

  // Update time limit when game mode changes
  useEffect(() => {
    if (gameType === "standard") {
      setTimeLeft(TIME_LIMIT[gameMode])
    } else {
      setTimeLeft(TIME_CHALLENGE_SECONDS[timeChallenge])
    }
  }, [gameMode, gameType, timeChallenge])

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
      <h1 className="text-3xl font-bold text-center mb-8">Fast Math Operation Game</h1>

      {!isPlaying && !isGameOver && (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Game Settings</CardTitle>
            <CardDescription>Choose your game mode and operation type</CardDescription>
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

            {/* Update the game settings UI to better integrate time-based challenges */}
            <Tabs defaultValue="standard" onValueChange={(value) => setGameType(value as GameType)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="standard">Standard Mode</TabsTrigger>
                <TabsTrigger value="timed">Time Challenge</TabsTrigger>
              </TabsList>
              <TabsContent value="standard" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Difficulty Level</Label>
                  <RadioGroup value={gameMode} onValueChange={(value) => setGameMode(value as GameMode)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="easy" id="easy" />
                      <Label htmlFor="easy">Easy (1-15)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium (1-20)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hard" id="hard" />
                      <Label htmlFor="hard">Hard (1-50)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-500 mb-2">Time Limit: {TIME_LIMIT[gameMode]} seconds</p>
                  <p className="text-sm text-gray-500">Questions: {TOTAL_QUESTIONS}</p>
                </div>
              </TabsContent>
              <TabsContent value="timed" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Time Duration</Label>
                  <RadioGroup value={timeChallenge} onValueChange={(value) => setTimeChallenge(value as TimeChallenge)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1min" id="1min-challenge" />
                      <Label htmlFor="1min-challenge">1 Minute Challenge</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30min" id="30min-challenge" />
                      <Label htmlFor="30min-challenge">30 Minute Challenge</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="60min" id="60min-challenge" />
                      <Label htmlFor="60min-challenge">1 Hour Challenge</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty Level</Label>
                  <RadioGroup value={gameMode} onValueChange={(value) => setGameMode(value as GameMode)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="easy" id="easy-timed" />
                      <Label htmlFor="easy-timed">Easy (1-15)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium-timed" />
                      <Label htmlFor="medium-timed">Medium (1-20)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hard" id="hard-timed" />
                      <Label htmlFor="hard-timed">Hard (1-50)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-500">
                    Complete as many questions as you can in{" "}
                    {timeChallenge === "60min" ? "1 hour" : timeChallenge === "30min" ? "30 minutes" : "1 minute"}
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="operation">Operation</Label>
              <Select value={operation} onValueChange={(value) => setOperation(value as Operation)}>
                <SelectTrigger id="operation">
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+">Addition (+)</SelectItem>
                  <SelectItem value="-">Subtraction (-)</SelectItem>
                  <SelectItem value="×">Multiplication (×)</SelectItem>
                  <SelectItem value="÷">Division (÷)</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
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
                  {gameType === "standard" ? `Question ${questionNumber + 1}/${TOTAL_QUESTIONS}` : "Time Challenge"}
                </CardTitle>
                <div className="text-lg font-semibold">Score: {score}</div>
              </div>
              <div className="space-y-2">
                {/* Update the time display to show minutes and hours for longer challenges */}
                <div className="flex justify-between text-sm">
                  <span>Time {gameType === "standard" ? "Left" : "Remaining"}</span>
                  <span>
                    {timeLeft >= 3600
                      ? `${Math.floor(timeLeft / 3600)}h ${Math.floor((timeLeft % 3600) / 60)}m ${timeLeft % 60}s`
                      : timeLeft >= 60
                        ? `${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`
                        : `${timeLeft}s`}
                  </span>
                </div>
                <Progress
                  value={
                    gameType === "standard"
                      ? (timeLeft / TIME_LIMIT[gameMode]) * 100
                      : (timeLeft / TIME_CHALLENGE_SECONDS[timeChallenge]) * 100
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-4">{currentQuestion?.question}</div>
                <div className="text-sm text-gray-500">
                  {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)} Mode •{" "}
                  {operation === "mixed"
                    ? "Mixed Operations"
                    : operation === "+"
                      ? "Addition"
                      : operation === "-"
                        ? "Subtraction"
                        : operation === "×"
                          ? "Multiplication"
                          : "Division"}
                </div>
                {gameType === "timed" && (
                  <div className="text-sm text-gray-500 mt-1">
                    Questions answered: {questionsAnswered} | Correct: {correctAnswers}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Your Answer</Label>
                <Input
                  id="answer"
                  ref={inputRef}
                  type="text"
                  inputMode="decimal"
                  value={userAnswer}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter your answer"
                  className="text-center text-xl"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={checkAnswer} disabled={!userAnswer} className="w-full">
                Submit Answer
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {isGameOver && (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Game Over!</CardTitle>
              <CardDescription>{playerName ? `${playerName}, here` : "Here"}'s how you did</CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={resultCardRef} className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold">Final Score</h3>
                    <div className="text-5xl font-bold">{score}</div>
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
                      <div className="text-sm font-medium">
                        {gameType === "standard" ? "Time Used" : "Challenge Time"}
                      </div>
                      <div className="text-xl font-semibold">
                        {gameType === "standard" ? `${TIME_LIMIT[gameMode] - timeLeft}s` : timeChallenge}
                      </div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Award className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Accuracy</div>
                      <div className="text-xl font-semibold">
                        {((correctAnswers / questionsAnswered) * 100).toFixed(1)}%
                      </div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Brain className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Avg. Response</div>
                      <div className="text-xl font-semibold">{averageResponseTime.toFixed(2)}s</div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Calculator className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Correct</div>
                      <div className="text-xl font-semibold">
                        {correctAnswers}/{questionsAnswered}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Update the game details display in the results card */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2">Game Details</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-gray-500">Mode:</span>{" "}
                      {gameMode.includes("min") || gameMode.includes("hour")
                        ? `Time Challenge (${gameMode})`
                        : gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}
                    </div>
                    <div>
                      <span className="text-gray-500">Game Type:</span>{" "}
                      {gameType === "standard" ? "Standard" : `${timeChallenge} Challenge`}
                    </div>
                    <div>
                      <span className="text-gray-500">Operation:</span>{" "}
                      {operation === "mixed"
                        ? "Mixed"
                        : operation === "+"
                          ? "Addition"
                          : operation === "-"
                            ? "Subtraction"
                            : operation === "×"
                              ? "Multiplication"
                              : "Division"}
                    </div>
                    <div>
                      <span className="text-gray-500">Questions Answered:</span> {questionsAnswered}
                    </div>
                    <div>
                      <span className="text-gray-500">Fastest Response:</span>{" "}
                      {fastestResponse === Number.POSITIVE_INFINITY ? "N/A" : `${fastestResponse.toFixed(2)}s`}
                    </div>
                    <div>
                      <span className="text-gray-500">Slowest Response:</span> {`${slowestResponse.toFixed(2)}s`}
                    </div>
                    <div>
                      <span className="text-gray-500">Correct Answers:</span> {correctAnswers}
                    </div>
                    <div>
                      <span className="text-gray-500">Wrong Answers:</span> {wrongAnswers}
                    </div>
                    {(gameMode === "1min" || gameMode === "30min" || gameMode === "1hour") && (
                      <div>
                        <span className="text-gray-500">Total Questions:</span> {correctAnswers + wrongAnswers}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  setIsGameOver(false)
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
