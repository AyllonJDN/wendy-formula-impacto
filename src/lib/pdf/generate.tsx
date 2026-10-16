import { pdf } from "@react-pdf/renderer";
import { calculateDiagnosis } from "@/lib/diagnosis";
import type { Answers } from "@/types";
import { DiagnosisPdf } from "./DiagnosisPdf";

export function formatDate(d: Date): string {
  return d.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
}

export function pdfFileName(nombre: string): string {
  const slug = nombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `la-formula-del-impacto-${slug || "diagnostico"}.pdf`;
}

/** Genera el PDF en el navegador a partir del mismo diagnóstico que usa la web. */
export async function generateDiagnosisPdf(answers: Answers): Promise<Blob> {
  const diagnosis = calculateDiagnosis(answers);
  return pdf(<DiagnosisPdf answers={answers} diagnosis={diagnosis} date={formatDate(new Date())} />).toBlob();
}
