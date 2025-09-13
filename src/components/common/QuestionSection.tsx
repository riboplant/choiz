"use client"

import { ReactNode } from "react"

interface QuestionSectionProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function QuestionSection({ 
  title, 
  subtitle, 
  children 
}: QuestionSectionProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-[#3b3345] mb-4 leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-[#666768] mb-8 text-base">{subtitle}</p>
      )}

      <div className="space-y-4 mb-8">
        {children}
      </div>
    </>
  )
}