"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import OnboardingLayout from "@/components/layout/OnboardingLayout"
import QuestionSection from "@/components/common/QuestionSection"
import SelectableOption from "@/components/common/SelectableOption"
import TextArea from "@/components/common/TextArea"
import { Button } from "@/components/common/Button"

export default function Onboarding() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [otherText, setOtherText] = useState("")
  const [familyHistory, setFamilyHistory] = useState("")
  const [medicalConditions, setMedicalConditions] = useState<string[]>([])
  const [mentalHealthConditions, setMentalHealthConditions] = useState<string[]>([])

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

  // Función para validar si se puede continuar
  const canContinue = () => {
    switch (currentQuestion) {
      case 1:
        // Debe tener al menos una opción seleccionada
        if (selectedOptions.length === 0) return false
        // Si seleccionó "otro", debe tener texto
        if (selectedOptions.includes("other") && otherText.trim() === "") return false
        return true
      
      case 2:
        // Debe tener una opción seleccionada
        return familyHistory !== ""
      
      case 3:
        // Debe tener al menos una opción seleccionada
        return medicalConditions.length > 0
      
      case 4:
        // Debe tener al menos una opción seleccionada
        return mentalHealthConditions.length > 0
      
      default:
        return false
    }
  }

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
    if (!canContinue()) return
    
    if (currentQuestion === 1) {
      setCurrentQuestion(2)
    } else if (currentQuestion === 2) {
      setCurrentQuestion(3)
    } else if (currentQuestion === 3) {
      setCurrentQuestion(4)
    }
  }

  const handleBack = () => {
    if (currentQuestion === 1) {
      router.push("/")
    } else if (currentQuestion === 2) {
      setCurrentQuestion(1)
    } else if (currentQuestion === 3) {
      setCurrentQuestion(2)
    } else if (currentQuestion === 4) {
      setCurrentQuestion(3)
    }
  }

  const getProgress = () => {
    switch (currentQuestion) {
      case 1: return 20
      case 2: return 40
      case 3: return 60
      case 4: return 80
      default: return 20
    }
  }

  return (
    <OnboardingLayout 
      onBack={handleBack} 
      progress={getProgress()}
    >
      {/* Question Content */}
      {currentQuestion === 1 && (
        <>
          <QuestionSection
            title="¿Tienes algún problema en el cuero cabelludo?"
            subtitle="Selecciona todas las opciones que apliquen."
          >
            {options.map((option) => (
              <SelectableOption
                key={option.id}
                id={option.id}
                label={option.label}
                isSelected={selectedOptions.includes(option.id)}
                isNoneOption={option.id === "none"}
                onClick={handleOptionChange}
              />
            ))}
          </QuestionSection>

          {selectedOptions.includes("other") && (
            <TextArea
              value={otherText}
              onChange={setOtherText}
              title="Cuéntanos cuál es el problema"
            />
          )}
        </>
      )}

      {currentQuestion === 2 && (
        <QuestionSection title="¿Hay antecedentes de caída del cabello en tu familia?">
          {familyHistoryOptions.map((option) => (
            <SelectableOption
              key={option.id}
              id={option.id}
              label={option.label}
              isSelected={familyHistory === option.id}
              isNoneOption={true}
              onClick={setFamilyHistory}
            />
          ))}
        </QuestionSection>
      )}

      {currentQuestion === 3 && (
        <QuestionSection
          title="¿Tienes o has tenido alguna de las siguientes condiciones médicas?"
          subtitle="Selecciona todas las opciones que apliquen."
        >
          {medicalConditionsOptions.map((option) => (
            <SelectableOption
              key={option.id}
              id={option.id}
              label={option.label}
              isSelected={medicalConditions.includes(option.id)}
              isNoneOption={option.id === "none"}
              onClick={handleMedicalConditionChange}
            />
          ))}
        </QuestionSection>
      )}

      {currentQuestion === 4 && (
        <QuestionSection
          title="¿Tienes o has tenido alguna de estas condiciones de salud mental?"
          subtitle="Selecciona todas las opciones que apliquen."
        >
          {mentalHealthOptions.map((option) => (
            <SelectableOption
              key={option.id}
              id={option.id}
              label={option.label}
              isSelected={mentalHealthConditions.includes(option.id)}
              isNoneOption={option.id === "none"}
              onClick={handleMentalHealthConditionChange}
            />
          ))}
        </QuestionSection>
      )}

      {/* Continue Button */}
      <div className="pb-4">
        <Button
          onClick={handleContinue}
          disabled={!canContinue()}
          variant="choiz"
          size="xl"
          className="w-full"
        >
          Continuar
        </Button>
      </div>
    </OnboardingLayout>
  )
}
