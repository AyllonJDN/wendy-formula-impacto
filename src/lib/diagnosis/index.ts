import { CHECKLIST, DIAGNOSIS_TEXT as T } from "@/data/content";
import type { Answers, ChecklistScore, Diagnosis, DimensionResult, Priority } from "@/types";
import { parsePercent } from "@/lib/validation";

const filled = (v: string) => v.trim().length > 0;
const count = (list: string[]) => list.filter(filled).length;
const atributoDone = (a: Answers) =>
  [a.atributo.vendes, a.atributo.mayoria, a.atributo.conectando].every(filled);

/** Cuántos SÍ tiene cada bloque del checklist y qué afirmaciones quedan por revisar. */
export function getChecklistScores(a: Answers): ChecklistScore[] {
  return CHECKLIST.map((group) => {
    const answers = a.checklist[group.key];
    const items = group.items.map((text, i) => ({ text, yes: answers[i] === "si" }));
    return {
      key: group.key,
      label: group.label,
      yes: items.filter((i) => i.yes).length,
      total: items.length,
      items,
    };
  });
}

function getMix(a: Answers) {
  return {
    ethos: parsePercent(a.mix.ethos) ?? 0,
    logos: parsePercent(a.mix.logos) ?? 0,
    pathos: parsePercent(a.mix.pathos) ?? 0,
  };
}

function getDimensions(a: Answers): DimensionResult[] {
  const mix = getMix(a);
  const pathosDone = count(a.pathos) + (atributoDone(a) ? 1 : 0);
  const dims: DimensionResult[] = [
    { key: "CLARIDAD", completed: filled(a.claridad) ? 1 : 0, total: 1, isComplete: filled(a.claridad) },
    { key: "DIRECCIÓN", completed: filled(a.direccion) ? 1 : 0, total: 1, isComplete: filled(a.direccion) },
    { key: "ETHOS", completed: count(a.ethos), total: 3, declaredPercent: mix.ethos, isComplete: count(a.ethos) === 3 },
    { key: "LOGOS", completed: count(a.logos), total: 3, declaredPercent: mix.logos, isComplete: count(a.logos) === 3 },
    { key: "PATHOS", completed: pathosDone, total: 5, declaredPercent: mix.pathos, isComplete: pathosDone === 5 },
  ];
  getChecklistScores(a).forEach((s) =>
    dims.push({ key: s.label, completed: s.yes, total: s.total, isComplete: s.yes === s.total }),
  );
  return dims;
}

/**
 * Reglas transparentes:
 * 1. Pathos declarado < 50 → PATHOS.
 * 2. Si no, el bloque del checklist con menos SÍ (empate: VERBAL, NO VERBAL, PARAVERBAL).
 * 3. Todo en 4/4 → COMPLETO.
 */
export function getPrimaryPriority(a: Answers): Priority {
  if (getMix(a).pathos < 50) return "PATHOS";
  const scores = getChecklistScores(a);
  if (scores.every((s) => s.yes === s.total)) return "COMPLETO";
  // reduce con "<" estricto conserva el primero en caso de empate (orden del checklist)
  return scores.reduce((best, s) => (s.yes < best.yes ? s : best), scores[0]).label;
}

export function getStrengths(a: Answers): string[] {
  const out: string[] = [];
  if (filled(a.claridad)) out.push(T.strengths.claridad);
  if (filled(a.direccion)) out.push(T.strengths.direccion);
  if (count(a.ethos) === 3) out.push(T.strengths.ethos);
  if (count(a.logos) === 3) out.push(T.strengths.logos);
  if (count(a.pathos) === 4) out.push(T.strengths.pathos);
  if (atributoDone(a)) out.push(T.strengths.atributo);
  getChecklistScores(a).forEach((s) => {
    if (s.yes > 0) out.push(`${s.label}: ${s.yes} de ${s.total} puntos del checklist ya están cubiertos.`);
  });
  return out;
}

export function getReviewAreas(a: Answers): { title: string; items: string[] }[] {
  const areas: { title: string; items: string[] }[] = [];
  if (getMix(a).pathos < 50) areas.push({ title: "PATHOS", items: [T.pathosLow] });
  getChecklistScores(a).forEach((s) => {
    const pending = s.items.filter((i) => !i.yes).map((i) => i.text);
    if (pending.length) areas.push({ title: `${s.label} · ${s.yes} / ${s.total}`, items: pending });
  });
  return areas;
}

/** Única fuente de verdad para el resultado web y el PDF. */
export function calculateDiagnosis(a: Answers): Diagnosis {
  const priority = getPrimaryPriority(a);
  const interpretation: string[] = [];
  if (getMix(a).pathos < 50) interpretation.push(T.pathosLow);
  if (priority === "COMPLETO") {
    interpretation.push(T.allDone);
  } else if (priority !== "PATHOS") {
    const s = getChecklistScores(a).find((x) => x.label === priority)!;
    interpretation.push(
      `El bloque del checklist con menos respuestas SÍ es ${priority}: ${s.yes} de ${s.total}.`,
    );
  }
  return {
    dimensions: getDimensions(a),
    mix: getMix(a),
    checklist: getChecklistScores(a),
    strengths: getStrengths(a),
    reviewAreas: getReviewAreas(a),
    priority,
    interpretation,
    nextStep: T.nextByPriority[priority],
  };
}
