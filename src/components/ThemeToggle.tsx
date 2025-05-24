
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.remove("light")
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
      root.classList.add("light")
    }
  }, [isDark])

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsDark(!isDark)}
      className="w-9 h-9"
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
