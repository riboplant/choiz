import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface RecommendationConfig {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  buttonText: string;
}

export const recommendations: Record<string, RecommendationConfig> = {
  "dutaxidil-capsulas": {
    id: "dutaxidil-capsulas",
    title: "DUTAXIDIL® Cápsulas",
    subtitle: "Dutasterida 0.5 mg + Minoxidil 2.5 mg + Biotina 2.5 mg",
    image: "/images/capsulas.png",
    imageAlt: "Dutaxidil Supplement Bottle",
    buttonText: "Seleccionar",
  },
  "minoxidil-capsulas": {
    id: "minoxidil-capsulas",
    title: "Minoxidil® Cápsulas",
    subtitle: "Minoxidil 2.5 mg + Biotina 2.5 mg",
    image: "/images/capsulas.png",
    imageAlt: "Minoxidil Supplement Bottle",
    buttonText: "Seleccionar",
  },
  "dutaxidil-gel": {
    id: "dutaxidil-gel",
    title: "DUTAXIDIL® Gel",
    subtitle: "Dutasterida 0.1% + Minoxidil 5 % + Tretinoína 1% + Hidrocortisona 1%",
    image: "/images/gel.png",
    imageAlt: "Dutaxidil Gel",
    buttonText: "Seleccionar",
  },
};

export function getRecommendationType(medicalConditions: string[]): string {
  // Caso 1: No tiene ninguna condición médica
  if (medicalConditions.includes("none")) {
    return "dutaxidil-capsulas";
  }

  // Caso 2: Tiene cáncer de mama o próstata
  if (
    medicalConditions.includes("breast-cancer") ||
    medicalConditions.includes("prostate-cancer")
  ) {
    return "minoxidil-capsulas";
  }

  // Caso 3: Tiene otras condiciones médicas
  return "dutaxidil-gel";
}
