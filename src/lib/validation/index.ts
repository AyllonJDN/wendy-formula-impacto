import { UI } from "@/data/content";
import type { Answers, Errors, StepId } from "@/types";

const blank = (v: string) => v.trim().length === 0;

export function parsePercent(v: string): number | null {
  if (!/^\d{1,3}$/.test(v.trim())) return null;
  const n = Number(v.trim());
  return n >= 0 && n <= 100 ? n : null;
}

export function mixTotal(mix: Answers["mix"]): number {
  return [mix.ethos, mix.logos, mix.pathos].reduce((s, v) => s + (parsePercent(v) ?? 0), 0);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidPhone(v: string): boolean {
  if (!/^\+?[\d\s\-()]+$/.test(v.trim())) return false;
  const digits = v.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

function required(errors: Errors, key: string, value: string) {
  if (blank(value)) errors[key] = UI.required;
}

export function validateStep(step: StepId, a: Answers): Errors {
  const e: Errors = {};
  switch (step) {
    case "layers": {
      let allValid = true;
      (["ethos", "logos", "pathos"] as const).forEach((k) => {
        const v = a.mix[k];
        if (blank(v)) {
          e[`mix.${k}`] = UI.required;
          allValid = false;
        } else if (parsePercent(v) === null) {
          e[`mix.${k}`] = UI.percentInvalid;
          allValid = false;
        }
      });
      if (allValid && mixTotal(a.mix) !== 100) e.mixSum = UI.sum;
      break;
    }
    case "pitchA":
      required(e, "claridad", a.claridad);
      required(e, "direccion", a.direccion);
      break;
    case "pitchB":
      a.ethos.forEach((v, i) => required(e, `ethos.${i}`, v));
      a.logos.forEach((v, i) => required(e, `logos.${i}`, v));
      required(e, "pruebaRapida", a.pruebaRapida);
      break;
    case "pathos":
      a.pathos.forEach((v, i) => required(e, `pathos.${i}`, v));
      break;
    case "attribute":
      required(e, "atributo.vendes", a.atributo.vendes);
      required(e, "atributo.mayoria", a.atributo.mayoria);
      required(e, "atributo.conectando", a.atributo.conectando);
      break;
    case "verbal":
    case "noVerbal":
    case "paraverbal": {
      a.checklist[step].forEach((v, i) => {
        if (v === null) e[`checklist.${step}.${i}`] = UI.pickOne;
      });
      if (Object.keys(e).length) e.checklistSummary = UI.pick;
      break;
    }
    case "contact": {
      required(e, "contact.nombre", a.contact.nombre);
      required(e, "contact.empresa", a.contact.empresa);
      if (blank(a.contact.email)) e["contact.email"] = UI.required;
      else if (!EMAIL.test(a.contact.email.trim())) e["contact.email"] = UI.emailInvalid;
      if (blank(a.contact.whatsapp)) e["contact.whatsapp"] = UI.required;
      else if (!isValidPhone(a.contact.whatsapp)) e["contact.whatsapp"] = UI.phoneInvalid;
      break;
    }
    default:
      break;
  }
  return e;
}

const INPUT_STEPS: StepId[] = [
  "layers",
  "pitchA",
  "pitchB",
  "pathos",
  "attribute",
  "verbal",
  "noVerbal",
  "paraverbal",
  "contact",
];

/** Primer paso con respuestas pendientes, o null si todo está completo. */
export function firstInvalidStep(a: Answers): StepId | null {
  return INPUT_STEPS.find((s) => Object.keys(validateStep(s, a)).length > 0) ?? null;
}
