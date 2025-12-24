export type DeviceCapability = "gyroscope" | "magnetometer" | "microphone" | "flashlight"

export interface ToolConfig {
  slug: string
  nameKey: string
  descriptionKey: string
  unavailableKey: string
  metaTitleKey: string
  metaDescriptionKey: string
  icon: string
  requiredCapabilities: DeviceCapability[]
  enabled: boolean
}

export const toolsConfig: ToolConfig[] = [
  {
    slug: "level",
    nameKey: "level",
    descriptionKey: "levelDescription",
    unavailableKey: "levelUnavailable",
    metaTitleKey: "levelMetaTitle",
    metaDescriptionKey: "levelMetaDescription",
    icon: "level",
    requiredCapabilities: ["gyroscope"],
    enabled: true,
  },
  // Placeholder tools - disabled for now
  // {
  //   slug: "compass",
  //   nameKey: "compass",
  //   descriptionKey: "compassDescription",
  //   unavailableKey: "compassUnavailable",
  //   metaTitleKey: "compassMetaTitle",
  //   metaDescriptionKey: "compassMetaDescription",
  //   icon: "compass",
  //   requiredCapabilities: ["magnetometer"],
  //   enabled: false,
  // },
]

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return toolsConfig.find((tool) => tool.slug === slug)
}

export function getEnabledTools(): ToolConfig[] {
  return toolsConfig.filter((tool) => tool.enabled)
}
