import { Button } from "@/components/common/Button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-purple-950 flex flex-col relative">
      <div className="flex-1 relative">
        <div className="absolute top-6 left-6 z-10">
          <h1
            className="text-white text-3xl font-light logo-font"
            style={{ color: "#ffffff", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Choiz
          </h1>
        </div>

        <div className="w-full bg-purple-950 flex items-center justify-center">
          <Image
            src="/images/home_wallpaper.jpg"
            alt="Smiling man in purple polo shirt holding phone"
            width={400}
            height={600}
            className="w-full h-full object-cover object-bottom max-w-md transform scale-150 origin-bottom"
            priority
          />
        </div>

        <div className="absolute top-[60vh] left-0 right-0 bg-white rounded-t-3xl p-6 pb-8 min-h-[40vh]">
          <div className="space-y-6">
            {/* Welcome Title */}
            <h2 className="text-2xl font-bold text-purple-600 text-center">Bienvenido a Choiz</h2>

            {/* Subtitle */}
            <p className="text-gray-600 text-center text-lg">Comienza tu tratamiento en tres pasos:</p>

            {/* Steps */}
            <div className="space-y-4 py-4">
              {/* Step 1 */}
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-gray-700 text-base">Completa tu expediente médico</span>
                  <span className="text-purple-500 text-sm font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                    2 min
                  </span>
                </div>
              </div>

              {/* Connector Line */}
              <div className="ml-3 w-px h-4 bg-gray-200"></div>

              {/* Step 2 */}
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                <span className="text-gray-700 text-base">Explora las opciones de tratamiento</span>
              </div>

              {/* Connector Line */}
              <div className="ml-3 w-px h-4 bg-gray-200"></div>

              {/* Step 3 */}
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                <span className="text-gray-700 text-base">Paga y recibe tu tratamiento</span>
              </div>
            </div>

            {/* Continue Button */}
            <Link href="/onboarding" className="block">
              <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-4 text-lg font-medium rounded-full h-auto">
                Continuar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
