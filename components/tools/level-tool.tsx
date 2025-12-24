"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import type { Locale, TranslationKey } from "@/lib/i18n"

interface LevelToolProps {
  t: (key: TranslationKey) => string
  locale: Locale
}

interface OrientationData {
  beta: number
  gamma: number
}

type CalibrationFeedback = "all" | "horizontal" | "vertical" | null

export function LevelTool({ t }: LevelToolProps) {
  const [orientation, setOrientation] = useState<OrientationData>({ beta: 0, gamma: 0 })
  const [offset, setOffset] = useState<OrientationData>({ beta: 0, gamma: 0 })
  const [permissionState, setPermissionState] = useState<"prompt" | "granted" | "denied">("prompt")
  const [calibrationFeedback, setCalibrationFeedback] = useState<CalibrationFeedback>(null)
  const lastOrientationRef = useRef<OrientationData>({ beta: 0, gamma: 0 })
  const alphaFilter = 0.15

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const beta = event.beta ?? 0
    const gamma = event.gamma ?? 0

    const smoothedBeta = alphaFilter * beta + (1 - alphaFilter) * lastOrientationRef.current.beta
    const smoothedGamma = alphaFilter * gamma + (1 - alphaFilter) * lastOrientationRef.current.gamma

    lastOrientationRef.current = { beta: smoothedBeta, gamma: smoothedGamma }
    setOrientation({ beta: smoothedBeta, gamma: smoothedGamma })
  }, [])

  const requestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission ===
        "function"
    ) {
      try {
        const response = await (
          DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }
        ).requestPermission()
        if (response === "granted") {
          setPermissionState("granted")
          window.addEventListener("deviceorientation", handleOrientation)
        } else {
          setPermissionState("denied")
        }
      } catch {
        setPermissionState("denied")
      }
    } else {
      setPermissionState("granted")
      window.addEventListener("deviceorientation", handleOrientation)
    }
  }

  useEffect(() => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission ===
        "function"
    ) {
      setPermissionState("prompt")
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      setPermissionState("granted")
      window.addEventListener("deviceorientation", handleOrientation)
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [handleOrientation])

  const handleCalibrateAll = () => {
    setOffset({ beta: orientation.beta, gamma: orientation.gamma })
    setCalibrationFeedback("all")
    setTimeout(() => setCalibrationFeedback(null), 1500)
  }

  const handleCalibrateHorizontal = () => {
    setOffset((prev) => ({ ...prev, gamma: orientation.gamma }))
    setCalibrationFeedback("horizontal")
    setTimeout(() => setCalibrationFeedback(null), 1500)
  }

  const handleCalibrateVertical = () => {
    setOffset((prev) => ({ ...prev, beta: orientation.beta }))
    setCalibrationFeedback("vertical")
    setTimeout(() => setCalibrationFeedback(null), 1500)
  }

  const adjustedBeta = orientation.beta - offset.beta
  const adjustedGamma = orientation.gamma - offset.gamma

  const isLevelHorizontal = Math.abs(adjustedGamma) <= 1
  const isLevelVertical = Math.abs(adjustedBeta) <= 1
  const isPerfectlyLevel = isLevelHorizontal && isLevelVertical

  const rotation = adjustedGamma

  if (permissionState === "prompt") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
        <div className="p-6 rounded-2xl bg-secondary/50 text-center max-w-sm">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="2" y="8" width="20" height="8" rx="2" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <p className="text-muted-foreground mb-4">{t("permissionRequired")}</p>
          <Button onClick={requestPermission} size="lg" className="w-full">
            {t("requestPermission")}
          </Button>
        </div>
      </div>
    )
  }

  if (permissionState === "denied") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
        <div className="p-6 rounded-2xl bg-destructive/10 text-center max-w-sm">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-destructive"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
          <p className="text-destructive font-medium">{t("permissionDenied")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
      {/* Level Indicator */}
      <div className="relative w-64 h-64">
        <div
          className={`
          absolute inset-0 rounded-full border-4 transition-colors duration-300
          ${isPerfectlyLevel ? "border-green-500" : "border-border"}
        `}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-[2px] bg-border/50" />
          <div className="absolute h-full w-[2px] bg-border/50" />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div
            className={`
              w-24 h-24 rounded-full border-4 transition-all duration-300
              ${isPerfectlyLevel ? "border-green-500 bg-green-500/20" : "border-foreground/50 bg-foreground/10"}
            `}
            style={{
              transform: `translateY(${Math.max(-60, Math.min(60, adjustedBeta * 2))}px)`,
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-3 h-3 rounded-full ${isPerfectlyLevel ? "bg-green-500" : "bg-foreground/30"}`} />
        </div>
      </div>

      {isPerfectlyLevel && <div className="text-2xl font-bold text-green-500 animate-pulse">{t("levelPerfect")}</div>}

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <div className={`p-4 rounded-xl text-center ${isLevelHorizontal ? "bg-green-500/20" : "bg-secondary"}`}>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("levelHorizontal")}</p>
          <p className={`text-2xl font-mono font-bold ${isLevelHorizontal ? "text-green-500" : "text-foreground"}`}>
            {adjustedGamma.toFixed(1)}°
          </p>
        </div>
        <div className={`p-4 rounded-xl text-center ${isLevelVertical ? "bg-green-500/20" : "bg-secondary"}`}>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("levelVertical")}</p>
          <p className={`text-2xl font-mono font-bold ${isLevelVertical ? "text-green-500" : "text-foreground"}`}>
            {adjustedBeta.toFixed(1)}°
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-xs">{t("levelHelper")}</p>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        <Button onClick={handleCalibrateAll} variant="secondary" size="lg" className="w-full relative">
          {calibrationFeedback === "all" ? (
            <span className="text-green-500">{t("calibratedAll")}</span>
          ) : (
            t("calibrateAll")
          )}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleCalibrateHorizontal}
            variant="outline"
            size="default"
            className="relative bg-transparent"
          >
            {calibrationFeedback === "horizontal" ? (
              <span className="text-green-500 text-xs">{t("calibratedHorizontal")}</span>
            ) : (
              <span className="text-xs">{t("calibrateHorizontal")}</span>
            )}
          </Button>
          <Button
            onClick={handleCalibrateVertical}
            variant="outline"
            size="default"
            className="relative bg-transparent"
          >
            {calibrationFeedback === "vertical" ? (
              <span className="text-green-500 text-xs">{t("calibratedVertical")}</span>
            ) : (
              <span className="text-xs">{t("calibrateVertical")}</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
