'use client'
import { Separator } from "@/components/ui/separator"
import { Github, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-background text-muted-foreground border-t border-border">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} SonicScribe by Aryan Raj. All rights reserved.
        </div>

        <Separator className="md:hidden" />

        <div className="flex gap-4">
          <a href="https://github.com/Aryan3572" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 hover:text-foreground transition-colors" />
          </a>
          <a href="mailto:rajaryan3572@gmail.com">
            <Mail className="h-5 w-5 hover:text-foreground transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  )
}
