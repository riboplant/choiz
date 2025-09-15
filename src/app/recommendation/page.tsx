"use client"

import { Button } from "@/components/common/Button"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import { recommendations, type RecommendationConfig } from "@/lib/utils"
import OnboardingLayout from "@/components/layout/OnboardingLayout"
import FAQItem from "@/components/common/FAQItem"

interface FAQData {
    question: string
    answer: string
}

interface OnboardingData {
    scalpIssues: string[]
    otherText: string
    familyHistory: string
    medicalConditions: string[]
    mentalHealthConditions: string[]
}

function RecommendationContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const type = searchParams.get("type") || "dutaxidil-capsulas"

    const [faqData, setFaqData] = useState<FAQData[]>([])
    const [isLoadingFAQ, setIsLoadingFAQ] = useState(true)
    const [faqError, setFaqError] = useState<string | null>(null)
    const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)

    const config: RecommendationConfig = recommendations[type] || recommendations["dutaxidil-capsulas"]

    useEffect(() => {
        // Load onboarding data from sessionStorage
        const savedData = sessionStorage.getItem('onboardingData')
        if (savedData) {
            setOnboardingData(JSON.parse(savedData))
        }

        const fetchFAQData = async () => {
            try {
                setIsLoadingFAQ(true)
                setFaqError(null)

                const response = await fetch("https://679938bebe2191d708b25ceb.mockapi.io/api/faqs")

                if (!response.ok) {
                    throw new Error("Error al cargar las preguntas frecuentes")
                }

                const data: FAQData[] = await response.json()
                setFaqData(data)
            } catch (error) {
                console.error("Error fetching FAQ data:", error)
                setFaqError("No se pudieron cargar las preguntas frecuentes")
                setFaqData([
                    {
                        question: "¿Por cuánto tiempo debo utilizar el medicamento?",
                        answer:
                            "El tratamiento debe seguirse de forma continua según las indicaciones médicas. Los resultados típicamente se observan después de 3-6 meses de uso constante.",
                    },
                    {
                        question: "¿Quién fabrica este medicamento?",
                        answer:
                            "Este medicamento es fabricado por laboratorios certificados que cumplen con todos los estándares de calidad farmacéutica.",
                    },
                    {
                        question: "¿Que sucede en caso de presentar efectos adversos?",
                        answer:
                            "Si experimentas cualquier efecto adverso, debes contactar inmediatamente a tu médico o al equipo de soporte de Choiz para recibir asistencia médica apropiada.",
                    },
                ])
            } finally {
                setIsLoadingFAQ(false)
            }
        }

        fetchFAQData()
    }, [])

    const getOptionLabel = (optionId: string, category: string) => {
        const optionMaps = {
            scalpIssues: {
                "pain": "Dolor repentino y/o enrojecimiento",
                "dandruff": "Caspa",
                "psoriasis": "Psoriasis",
                "sunburn": "Quemadura de sol",
                "other": "Otro",
                "none": "No, ninguno de los anteriores"
            },
            familyHistory: {
                "no": "No",
                "yes": "Sí",
                "unsure": "No estoy seguro"
            },
            medicalConditions: {
                "breast-cancer": "Cáncer de mama",
                "prostate-cancer": "Cáncer de próstata",
                "low-blood-pressure": "Presión arterial baja incontrolada",
                "autoimmune": "Otras enfermedades autoinmunes o reumáticas",
                "thyroid": "Problemas de tiroides",
                "heart-disease": "Enfermedades del corazón",
                "kidney-liver": "Enfermedades de riñón o hígado",
                "none": "No, ninguna de las anteriores"
            },
            mentalHealthConditions: {
                "depression": "Depresión",
                "bipolar": "Desorden de bipolaridad",
                "anxiety": "Ansiedad",
                "panic-attacks": "Ataques de pánico",
                "ptsd": "Desorden de estrés postraumático",
                "schizophrenia": "Esquizofrenia",
                "none": "No, ninguno de los anteriores"
            }
        }

        return optionMaps[category]?.[optionId] || optionId
    }

    const handleSelectTreatment = () => {
        if (onboardingData) {
            const responses = {
                "Producto seleccionado": config.title,
                "Problemas en el cuero cabelludo": onboardingData.scalpIssues.map(option =>
                    getOptionLabel(option, 'scalpIssues')
                ).join(', '),
                "Descripción adicional": onboardingData.otherText || "N/A",
                "Antecedentes familiares de caída del cabello": getOptionLabel(onboardingData.familyHistory, 'familyHistory'),
                "Condiciones médicas": onboardingData.medicalConditions.map(option =>
                    getOptionLabel(option, 'medicalConditions')
                ).join(', '),
                "Condiciones de salud mental": onboardingData.mentalHealthConditions.map(option =>
                    getOptionLabel(option, 'mentalHealthConditions')
                ).join(', ')
            }

            console.log("=== RESPUESTAS DEL FORMULARIO ===")
            Object.entries(responses).forEach(([question, answer]) => {
                console.log(`${question}: ${answer}`)
            })
            console.log("================================")

            // También mostrar en alert para que sea visible
            const formattedResponses = Object.entries(responses)
                .map(([question, answer]) => `${question}: ${answer}`)
                .join('\n\n')

            alert(`RESPUESTAS DEL FORMULARIO:\n\n${formattedResponses}`)
        } else {
            alert("No se encontraron datos del formulario")
        }
    }

    const handleBack = () => {
        router.push("/onboarding")
    }

    return (
        <OnboardingLayout onBack={handleBack} progress={90} showChat={true}>
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
                    <div className={`flex justify-center ${type === "dutaxidil-gel" ? "mb-10 mt-10" : "mb-22 -mt-4"}`}>
                        <div className="relative">
                            <img src={config.image || "/placeholder.svg"} alt={config.imageAlt} className="w-32 h-auto scale-250" />
                        </div>
                    </div>

                    {/* Select Button */}
                    <Button
                        onClick={handleSelectTreatment}
                        className="w-full bg-[#3b3345] hover:bg-[#292929] text-white rounded-full py-4 text-base font-medium relative z-10"
                    >
                        {config.buttonText}
                    </Button>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {isLoadingFAQ ? (
                        <div className="p-6 text-center text-[#7d7d7d]">Cargando preguntas frecuentes...</div>
                    ) : faqError ? (
                        <div className="p-6 text-center text-[#e6778d]">{faqError}</div>
                    ) : (
                        faqData.map((faq, index) => <FAQItem key={index} question={faq.question} answer={faq.answer} />)
                    )}
                </div>
            </div>
        </OnboardingLayout>
    )
}

export default function PharmaceuticalRecommendation() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
                    <div className="text-[#3b3345]">Cargando recomendación...</div>
                </div>
            }
        >
            <RecommendationContent />
        </Suspense>
    )
}
