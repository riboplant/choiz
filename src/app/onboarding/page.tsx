"use client"

import { useState } from "react"
import { ArrowLeft, MessageCircle, Check } from "lucide-react"

export default function Onboarding() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["none"])
  const [otherText, setOtherText] = useState("")
  const [familyHistory, setFamilyHistory] = useState("")
  const [medicalConditions, setMedicalConditions] = useState<string[]>(["none"])
  const [mentalHealthConditions, setMentalHealthConditions] = useState<string[]>(["none"])

  const options = [
    { id: "pain", label: "Dolor repentino y/o enrojecimiento" },
    { id: "dandruff", label: "Caspa" },
    { id: "psoriasis", label: "Psoriasis" },
    { id: "sunburn", label: "Quemadura de sol" },
    { id: "other", label: "Otro" },
    { id: "none", label: "No, ninguno de los anteriores" },
  ]

  const familyHistoryOptions = [
    { id: "no", label: "No" },
    { id: "yes", label: "Sí" },
    { id: "unsure", label: "No estoy seguro" },
  ]

  const medicalConditionsOptions = [
    { id: "breast-cancer", label: "Cáncer de mama" },
    { id: "prostate-cancer", label: "Cáncer de próstata" },
    { id: "low-blood-pressure", label: "Presión arterial baja incontrolada" },
    { id: "autoimmune", label: "Otras enfermedades autoinmunes o reumáticas" },
    { id: "thyroid", label: "Problemas de tiroides" },
    { id: "heart-disease", label: "Enfermedades del corazón" },
    { id: "kidney-liver", label: "Enfermedades de riñón o hígado" },
    { id: "none", label: "No, ninguna de las anteriores" },
  ]

  const mentalHealthOptions = [
    { id: "depression", label: "Depresión" },
    { id: "bipolar", label: "Desorden de bipolaridad" },
    { id: "anxiety", label: "Ansiedad" },
    { id: "panic-attacks", label: "Ataques de pánico" },
    { id: "ptsd", label: "Desorden de estrés postraumático" },
    { id: "schizophrenia", label: "Esquizofrenia" },
    { id: "none", label: "No, ninguno de los anteriores" },
  ]

  const handleOptionChange = (optionId: string) => {
    if (optionId === "none") {
      setSelectedOptions(["none"])
    } else {
      const newOptions = selectedOptions.filter((id) => id !== "none")
      if (newOptions.includes(optionId)) {
        setSelectedOptions(newOptions.filter((id) => id !== optionId))
      } else {
        setSelectedOptions([...newOptions, optionId])
      }
    }
  }

  const handleMedicalConditionChange = (optionId: string) => {
    if (optionId === "none") {
      setMedicalConditions(["none"])
    } else {
      const newOptions = medicalConditions.filter((id) => id !== "none")
      if (newOptions.includes(optionId)) {
        setMedicalConditions(newOptions.filter((id) => id !== optionId))
      } else {
        setMedicalConditions([...newOptions, optionId])
      }
    }
  }

  const handleMentalHealthConditionChange = (optionId: string) => {
    if (optionId === "none") {
      setMentalHealthConditions(["none"])
    } else {
      const newOptions = mentalHealthConditions.filter((id) => id !== "none")
      if (newOptions.includes(optionId)) {
        setMentalHealthConditions(newOptions.filter((id) => id !== optionId))
      } else {
        setMentalHealthConditions([...newOptions, optionId])
      }
    }
  }

  const handleContinue = () => {
    if (currentQuestion === 1) {
      setCurrentQuestion(2)
    } else if (currentQuestion === 2) {
      setCurrentQuestion(3)
    } else if (currentQuestion === 3) {
      setCurrentQuestion(4)
    }
  }

  const handleBack = () => {
    if (currentQuestion === 2) {
      setCurrentQuestion(1)
    } else if (currentQuestion === 3) {
      setCurrentQuestion(2)
    } else if (currentQuestion === 4) {
      setCurrentQuestion(3)
    }
  }


  const getProgressWidth = () => {
    switch (currentQuestion) {
      case 1:
        return "20%"
      case 2:
        return "40%"
      case 3:
        return "60%"
      case 4:
        return "80%"
      default:
        return "20%"
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between">
        <ArrowLeft className="w-6 h-6 text-[#3b3345] cursor-pointer" onClick={handleBack} />
        <h1 className="text-xl logo-font font-light text-[#3b3345]">Choiz</h1>
        <MessageCircle className="w-6 h-6 text-[#3b3345]" />
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
        {currentQuestion === 1 ? (
          // Question 1 Content
          <>
            <h2 className="text-2xl font-semibold text-[#3b3345] mb-4 leading-tight">
              ¿Tienes algún problema en el cuero cabelludo?
            </h2>

            <p className="text-[#666768] mb-8 text-base">Selecciona todas las opciones que apliquen.</p>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {options.map((option) => {
                const isSelected = selectedOptions.includes(option.id)
                const isNoneOption = option.id === "none"

                return (
                  <div
                    key={option.id}
                    onClick={() => handleOptionChange(option.id)}
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
                    <span className="text-[#3b3345] text-base font-medium">{option.label}</span>
                  </div>
                )
              })}
            </div>

            {/* Other Text Input */}
            {selectedOptions.includes("other") && (
              <div className="mb-8">
                <h3 className="text-base font-medium text-[#3b3345] mb-4">Cuéntanos cuál es el problema</h3>
                <textarea
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder="Inserta tu respuesta aquí"
                  className="w-full p-4 border-2 border-[#e0e0e0] rounded-xl bg-white text-[#3b3345] placeholder-[#666768] resize-none focus:border-[#6042aa] focus:outline-none transition-colors"
                  rows={4}
                />
              </div>
            )}
          </>
        ) : currentQuestion === 2 ? (
          <>
            <h2 className="text-2xl font-semibold text-[#3b3345] mb-8 leading-tight">
              ¿Hay antecedentes de caída del cabello en tu familia?
            </h2>

            {/* Family History Options */}
            <div className="space-y-4 mb-8">
              {familyHistoryOptions.map((option) => {
                const isSelected = familyHistory === option.id

                return (
                  <div
                    key={option.id}
                    onClick={() => setFamilyHistory(option.id)}
                    className={`
                      flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${isSelected ? "border-[#3b3345] bg-white" : "border-[#e0e0e0] bg-white hover:border-[#d3d3d3]"}
                    `}
                  >
                    <div
                      className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0
                      ${isSelected ? "border-[#3b3345] bg-[#3b3345]" : "border-[#d3d3d3]"}
                    `}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-[#3b3345] text-base font-medium">{option.label}</span>
                  </div>
                )
              })}
            </div>

          </>
        ) : currentQuestion === 3 ? (
          <>
            <h2 className="text-2xl font-semibold text-[#3b3345] mb-4 leading-tight">
              ¿Tienes o has tenido alguna de las siguientes condiciones médicas?
            </h2>

            <p className="text-[#666768] mb-8 text-base">Selecciona todas las opciones que apliquen.</p>

            {/* Medical Conditions Options */}
            <div className="space-y-4 mb-8">
              {medicalConditionsOptions.map((option) => {
                const isSelected = medicalConditions.includes(option.id)
                const isNoneOption = option.id === "none"

                return (
                  <div
                    key={option.id}
                    onClick={() => handleMedicalConditionChange(option.id)}
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
                    <span className="text-[#3b3345] text-base font-medium">{option.label}</span>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-[#3b3345] mb-4 leading-tight">
              ¿Tienes o has tenido alguna de estas condiciones de salud mental?
            </h2>

            <p className="text-[#666768] mb-8 text-base">Selecciona todas las opciones que apliquen.</p>

            {/* Mental Health Conditions Options */}
            <div className="space-y-4 mb-8">
              {mentalHealthOptions.map((option) => {
                const isSelected = mentalHealthConditions.includes(option.id)
                const isNoneOption = option.id === "none"

                return (
                  <div
                    key={option.id}
                    onClick={() => handleMentalHealthConditionChange(option.id)}
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
                    <span className="text-[#3b3345] text-base font-medium">{option.label}</span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Continue Button */}
      <div className="px-6 pb-8">
        <button
          onClick={handleContinue}
          className="w-full bg-[#3b3345] text-white py-4 rounded-full text-lg font-semibold hover:bg-[#292929] transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
