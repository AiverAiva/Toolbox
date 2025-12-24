interface ToolIconProps {
  icon: string
  className?: string
}

export function ToolIcon({ icon, className = "w-8 h-8" }: ToolIconProps) {
  switch (icon) {
    case "level":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="8" width="20" height="8" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="9" x2="12" y2="10" />
          <line x1="12" y1="14" x2="12" y2="15" />
        </svg>
      )
    case "compass":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12,2 14,10 12,12 10,10" fill="currentColor" />
          <polygon points="12,22 14,14 12,12 10,14" strokeOpacity="0.5" />
        </svg>
      )
    case "sound":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      )
    case "flashlight":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6l-4 4h-4L6 6V4h12v2Z" />
          <path d="M10 10v10a2 2 0 0 0 4 0V10" />
          <line x1="12" y1="14" x2="12" y2="14.01" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M12 8v4l2 2" />
        </svg>
      )
  }
}
