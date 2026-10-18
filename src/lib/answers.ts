import type { Answers } from "@/types";

export function emptyAnswers(): Answers {
  return {
    mix: { ethos: "", logos: "", pathos: "" },
    claridad: "",
    direccion: "",
    ethos: ["", "", ""],
    logos: ["", "", ""],
    pruebaRapida: "",
    pathos: ["", "", "", ""],
    atributo: { vendes: "", mayoria: "", conectando: "" },
    checklist: {
      verbal: [null, null, null, null],
      noVerbal: [null, null, null, null],
      paraverbal: [null, null, null, null],
    },
  };
}

/** Mezcla datos guardados con la forma esperada (tolera versiones antiguas o corruptas). */
export function mergeAnswers(raw: unknown): Answers {
  if (!raw || typeof raw !== "object") return emptyAnswers();
  const r = raw as Partial<Answers>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const strs = (v: unknown, n: number) =>
    Array.from({ length: n }, (_, i) => (Array.isArray(v) ? str(v[i]) : ""));
  const yn = (v: unknown) =>
    Array.from({ length: 4 }, (_, i) =>
      Array.isArray(v) && (v[i] === "si" || v[i] === "no") ? (v[i] as "si" | "no") : null,
    );
  return {
    mix: { ethos: str(r.mix?.ethos), logos: str(r.mix?.logos), pathos: str(r.mix?.pathos) },
    claridad: str(r.claridad),
    direccion: str(r.direccion),
    ethos: strs(r.ethos, 3),
    logos: strs(r.logos, 3),
    pruebaRapida: str(r.pruebaRapida),
    pathos: strs(r.pathos, 4),
    atributo: {
      vendes: str(r.atributo?.vendes),
      mayoria: str(r.atributo?.mayoria),
      conectando: str(r.atributo?.conectando),
    },
    checklist: {
      verbal: yn(r.checklist?.verbal),
      noVerbal: yn(r.checklist?.noVerbal),
      paraverbal: yn(r.checklist?.paraverbal),
    },
  };
}
