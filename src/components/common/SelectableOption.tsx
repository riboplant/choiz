"use client"

import { Check } from "lucide-react"

interface SelectableOptionProps {
  id: string
  label: string
  isSelected: boolean
  isNoneOption?: boolean
  onClick: (id: string) => void
}

export default function SelectableOption({
  id,
  label,
  isSelected,
  isNoneOption = false,
  onClick
}: SelectableOptionProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`
        flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
        ${
          isSelected
            ? isNoneOption
              ? "border-[#3b3345] bg-white"
              : "border-[#6042aa] bg-white"
            : "border-[#e0e0e0] bg-white hover:border-[#d3d3d3]"
        }
      `}
    >
      <div
        className={`
        w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0
        ${
          isSelected
            ? isNoneOption
              ? "border-[#3b3345] bg-[#3b3345]"
              : "border-[#6042aa] bg-[#6042aa]"
            : "border-[#d3d3d3]"
        }
      `}
      >
        {isSelected && <Check className="w-4 h-4 text-white" />}
      </div>
      <span className="text-[#3b3345] text-base font-medium">{label}</span>
    </div>
  )
}