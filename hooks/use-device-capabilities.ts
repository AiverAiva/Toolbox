"use client"

import { useState, useEffect } from "react"
import type { DeviceCapability } from "@/lib/tools-config"

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState<Record<DeviceCapability, boolean>>({
    gyroscope: false,
    magnetometer: false,
    microphone: false,
    flashlight: false,
  })
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    async function checkCapabilities() {
      const result: Record<DeviceCapability, boolean> = {
        gyroscope: false,
        magnetometer: false,
        microphone: false,
        flashlight: false,
      }

      if (typeof DeviceOrientationEvent !== "undefined") {
        result.gyroscope = await probeGyroscope()
      }

      result.magnetometer = result.gyroscope

      // Check microphone (API-based is fine)
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        result.microphone = true
      }

      result.flashlight = false

      setCapabilities(result)
      setIsChecking(false)
    }

    checkCapabilities()
  }, [])

  const isCapabilityAvailable = (caps: DeviceCapability[]): boolean => {
    return caps.every((cap) => capabilities[cap])
  }

  return { capabilities, isChecking, isCapabilityAvailable }
}

async function probeGyroscope(): Promise<boolean> {
  return new Promise((resolve) => {
    let resolved = false

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Check if we received actual orientation data (not null/undefined)
      if (!resolved && (event.beta !== null || event.gamma !== null)) {
        resolved = true
        window.removeEventListener("deviceorientation", handleOrientation)
        resolve(true)
      }
    }

    // For iOS 13+, we need to request permission first
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission ===
        "function"
    ) {
      // On iOS, we can't probe without user gesture, so assume available
      // The actual permission will be requested when tool opens
      resolve(true)
      return
    }

    window.addEventListener("deviceorientation", handleOrientation)

    // Timeout after 500ms - if no data received, gyroscope not available
    setTimeout(() => {
      if (!resolved) {
        resolved = true
        window.removeEventListener("deviceorientation", handleOrientation)
        resolve(false)
      }
    }, 500)
  })
}
