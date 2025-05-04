"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface QRCodeProps {
  value: string
  size?: number
  bgColor?: string
  fgColor?: string
}

const QRCode: React.FC<QRCodeProps> = ({ value, size = 128, bgColor = "transparent", fgColor = "white" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const generateQRCode = async () => {
      try {
        // Simple QR code pattern generation
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set crossOrigin to anonymous for any images we might use
        ctx.canvas.crossOrigin = "anonymous"

        // Clear canvas
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, size, size)

        // Draw a simple pattern (this is a placeholder, not a real QR code)
        ctx.fillStyle = fgColor

        // Draw border
        const margin = size * 0.1
        const innerSize = size - margin * 2
        ctx.fillRect(margin, margin, innerSize, innerSize)

        // Draw inner background
        ctx.fillStyle = bgColor
        const innerMargin = margin + size * 0.05
        const innerInnerSize = innerSize - size * 0.1
        ctx.fillRect(innerMargin, innerMargin, innerInnerSize, innerInnerSize)

        // Draw pattern based on value string
        ctx.fillStyle = fgColor
        const cellSize = innerInnerSize / 8

        // Use the value string to determine the pattern
        const hash = hashString(value)

        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if ((hash[i] & (1 << j)) !== 0) {
              ctx.fillRect(innerMargin + j * cellSize, innerMargin + i * cellSize, cellSize, cellSize)
            }
          }
        }

        // Always draw the position detection patterns
        // Top-left
        drawPositionDetection(ctx, innerMargin, innerMargin, cellSize * 3)
        // Top-right
        drawPositionDetection(ctx, innerMargin + innerInnerSize - cellSize * 3, innerMargin, cellSize * 3)
        // Bottom-left
        drawPositionDetection(ctx, innerMargin, innerMargin + innerInnerSize - cellSize * 3, cellSize * 3)
      } catch (error) {
        console.error("Error generating QR code:", error)
      }
    }

    generateQRCode()
  }, [value, size, bgColor, fgColor])

  // Helper function to create a simple hash from a string
  const hashString = (str: string): number[] => {
    const result = new Array(8).fill(0)
    for (let i = 0; i < str.length; i++) {
      result[i % 8] = (result[i % 8] + str.charCodeAt(i)) % 256
    }
    return result
  }

  // Helper function to draw position detection patterns
  const drawPositionDetection = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    const cellSize = size / 3

    // Outer square
    ctx.fillRect(x, y, size, size)

    // Inner white square
    ctx.fillStyle = bgColor
    ctx.fillRect(x + cellSize, y + cellSize, cellSize, cellSize)

    // Reset fill color
    ctx.fillStyle = fgColor
  }

  return <canvas ref={canvasRef} width={size} height={size} style={{ width: size, height: size }} />
}

export default QRCode
