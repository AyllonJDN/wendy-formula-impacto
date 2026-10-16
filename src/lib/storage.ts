import type { Answers, StepId } from "@/types";
import { mergeAnswers } from "./answers";

const KEY = "wendy-formula-impacto:v1";

export interface Saved {
  answers: Answers;
  step: StepId | null;
}

export function loadSaved(): Saved | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      answers: mergeAnswers(parsed?.answers),
      step: typeof parsed?.step === "string" ? parsed.step : null,
    };
  } catch {
    return null;
  }
}

export function save(data: Saved) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* almacenamiento no disponible: la experiencia sigue funcionando en memoria */
  }
}

export function clearSaved() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}
