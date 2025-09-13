"use client"

interface TextAreaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  title?: string
  rows?: number
}

export default function TextArea({
  value,
  onChange,
  placeholder = "Inserta tu respuesta aquí",
  title,
  rows = 4
}: TextAreaProps) {
  return (
    <div className="mb-8">
      {title && (
        <h3 className="text-base font-medium text-[#3b3345] mb-4">{title}</h3>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border-2 border-[#e0e0e0] rounded-xl bg-white text-[#3b3345] placeholder-[#666768] resize-none focus:border-[#6042aa] focus:outline-none transition-colors"
        rows={rows}
      />
    </div>
  )
}