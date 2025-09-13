"use client"

import { Button } from "@/components/common/Button"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { recommendations, type RecommendationConfig } from "@/lib/utils"
import OnboardingLayout from "@/components/layout/OnboardingLayout"
import FAQItem from "@/components/common/FAQItem"

function RecommendationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'dutaxidil-capsulas'
  
  const config: RecommendationConfig = recommendations[type] || recommendations['dutaxidil-capsulas']

  const handleBack = () => {
    router.push("/onboarding")
  }

  // Datos de FAQ que podrías mover a tu configuración más adelante
  const faqData = [
    {
      question: "¿Por cuánto tiempo debo utilizar el medicamento?",
      answer: "El tratamiento debe seguirse de forma continua según las indicaciones médicas. Los resultados típicamente se observan después de 3-6 meses de uso constante."
    },
    {
      question: "¿Quién fabrica este medicamento?",
      answer: "Este medicamento es fabricado por laboratorios certificados que cumplen con todos los estándares de calidad farmacéutica."
    },
    {
      question: "¿Que sucede en caso de presentar efectos adversos?",
      answer: "Si experimentas cualquier efecto adverso, debes contactar inmediatamente a tu médico o al equipo de soporte de Choiz para recibir asistencia médica apropiada."
    }
  ]

  return (
    <OnboardingLayout 
      onBack={handleBack} 
      progress={90}
      showChat={true}
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <h1 className="text-[#3b3345] text-2xl font-semibold mb-8 leading-tight">
          Tratamiento recomendado en base a tus respuestas
        </h1>

        {/* Product Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-[#3b3345] text-xl font-semibold mb-2">{config.title}</h2>
          <p className="text-[#7d7d7d] text-sm mb-8">{config.subtitle}</p>

          {/* Product Image */}
          <div className={`flex justify-center ${
            type === 'dutaxidil-gel' 
              ? 'mb-10 mt-10' 
              : 'mb-22 -mt-4'
          }`}>
            <div className="relative">
              <img
                src={config.image}
                alt={config.imageAlt}
                className="w-32 h-auto scale-250"
              />
            </div>
          </div>

          {/* Select Button */}
          <Button className="w-full bg-[#3b3345] hover:bg-[#292929] text-white rounded-full py-4 text-base font-medium">
            {config.buttonText}
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </OnboardingLayout>
  )
}

export default function PharmaceuticalRecommendation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="text-[#3b3345]">Cargando recomendación...</div>
      </div>
    }>
      <RecommendationContent />
    </Suspense>
  )
}
