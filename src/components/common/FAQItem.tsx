"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FAQItemProps {
  question: string
  answer?: string
  isExpandable?: boolean
  onClick?: () => void
}

export default function FAQItem({ 
  question, 
  answer, 
  isExpandable = true,
  onClick 
}: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (isExpandable) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className="border-b border-[#e0e0e0] last:border-b-0 ml-4 mr-2">
      <button 
        className="flex items-center justify-between w-full py-4 text-left"
        onClick={handleClick}
      >
        <span className="text-[#3b3345] text-base font-medium">
          {question}
        </span>
        {isExpandable && (
          <ChevronDown 
            className={`w-5 h-5 text-[#7d7d7d] transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        )}
      </button>
      
      {isExpanded && answer && (
        <div className="pb-4">
          <p className="text-[#666768] text-sm leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}
