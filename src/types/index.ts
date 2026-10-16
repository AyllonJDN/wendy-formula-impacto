export type YesNo = "si" | "no" | null;

export type ChecklistKey = "verbal" | "noVerbal" | "paraverbal";

export interface Answers {
  /** Porcentajes como texto para permitir campos vacíos mientras se escribe. */
  mix: { ethos: string; logos: string; pathos: string };
  claridad: string;
  direccion: string;
  ethos: string[]; // 3
  logos: string[]; // 3
  pruebaRapida: string;
  pathos: string[]; // 4
  atributo: { vendes: string; mayoria: string; conectando: string };
  checklist: Record<ChecklistKey, YesNo[]>; // 4 cada uno
  contact: { nombre: string; email: string; whatsapp: string; empresa: string };
}

export type Errors = Record<string, string>;

export type StepId =
  | "cover"
  | "formula"
  | "layers"
  | "pitchA"
  | "pitchB"
  | "pathos"
  | "attribute"
  | "verbal"
  | "noVerbal"
  | "paraverbal"
  | "contact"
  | "reveal"
  | "diagnosis";

export type Priority = "PATHOS" | "VERBAL" | "NO VERBAL" | "PARAVERBAL" | "COMPLETO";

export interface DimensionResult {
  key: "CLARIDAD" | "DIRECCIÓN" | "ETHOS" | "LOGOS" | "PATHOS" | "VERBAL" | "NO VERBAL" | "PARAVERBAL";
  completed: number;
  total: number;
  /** Porcentaje declarado por la persona (solo Ethos, Logos, Pathos). */
  declaredPercent?: number;
  isComplete: boolean;
}

export interface ChecklistScore {
  key: ChecklistKey;
  label: "VERBAL" | "NO VERBAL" | "PARAVERBAL";
  yes: number;
  total: number;
  items: { text: string; yes: boolean }[];
}

export interface Diagnosis {
  dimensions: DimensionResult[];
  mix: { ethos: number; logos: number; pathos: number };
  checklist: ChecklistScore[];
  strengths: string[];
  reviewAreas: { title: string; items: string[] }[];
  priority: Priority;
  /** Texto interpretativo (reglas definidas) para web y PDF. */
  interpretation: string[];
  nextStep: string;
}
