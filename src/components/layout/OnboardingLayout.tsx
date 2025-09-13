"use client"

import { ArrowLeft, MessageCircle } from "lucide-react"
import { ReactNode } from "react"

interface OnboardingLayoutProps {
  children: ReactNode
  onBack: () => void
  progress: number
  showChat?: boolean
}

export default function OnboardingLayout({ 
  children, 
  onBack, 
  progress, 
  showChat = true 
}: OnboardingLayoutProps) {
  const getProgressWidth = () => {
    return `${Math.min(Math.max(progress, 0), 100)}%`
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between">
        <ArrowLeft 
          className="w-6 h-6 text-[#3b3345] cursor-pointer" 
          onClick={onBack} 
        />
        <h1 className="text-xl logo-font font-light text-[#3b3345]">
          Choiz
        </h1>
        {showChat && (
          <MessageCircle className="w-6 h-6 text-[#3b3345]" />
        )}
        {!showChat && <div className="w-6 h-6" />}
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 pb-2">
        <div className="w-full bg-[#e0e0e0] h-1 rounded-full">
          <div
            className="bg-[#6042aa] h-1 rounded-full transition-all duration-300"
            style={{ width: getProgressWidth() }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-4">
        {children}
      </div>
    </div>
  )
}