"use client";

import { ATTRIBUTE, CHECKLIST, CHECKLIST_INTRO, CONTACT, PATHOS, PITCH } from "@/data/content";
import type { Answers, ChecklistKey } from "@/types";
import { SectionTag, TextField, YesNoItem, type FieldCtx } from "../ui";

type Update = (fn: (a: Answers) => Answers) => void;
type P = FieldCtx & { answers: Answers; update: Update };

const setAt = (list: string[], i: number, v: string) => list.map((x, idx) => (idx === i ? v : x));

function QHead({ n, tag, title, guide }: { n: string; tag: string; title: string; guide: string }) {
  return (
    <div className="stack-sm">
      <div className="q-head">
        <span className="q-n">{n} · {tag}</span>
      </div>
      <h2 className="q-title">{title}</h2>
      <p className="guide-box">{guide}</p>
    </div>
  );
}

export function PitchA({ answers, update, err, touch }: P) {
  const c = PITCH.claridad;
  const d = PITCH.direccion;
  return (
    <div className="split enter">
      <div className="split-head stack-sm">
        <SectionTag n="03" label="TU PLANTILLA DE PITCH" />
        <h1 className="h1">{PITCH.title}</h1>
        <p className="lead">{PITCH.text}</p>
      </div>
      <div className="stack" style={{ gap: 0 }}>
        <div className="q-block" style={{ borderTop: 0, paddingTop: 0 }}>
          <QHead n={c.n} tag={c.tag} title={c.title} guide={c.guide} />
          <TextField name="claridad" label="Tu oferta en una frase" hideLabel multiline rows={4} placeholder={c.placeholder}
            value={answers.claridad} onChange={(v) => update((a) => ({ ...a, claridad: v }))} err={err} touch={touch} />
        </div>
        <div className="q-block">
          <QHead n={d.n} tag={d.tag} title={d.title} guide={d.guide} />
          <TextField name="direccion" label="Qué quieres que pase al terminar" hideLabel multiline rows={3}
            value={answers.direccion} onChange={(v) => update((a) => ({ ...a, direccion: v }))} err={err} touch={touch} />
        </div>
      </div>
    </div>
  );
}

function Triple({
  base, label, values, onChange, err, touch,
}: FieldCtx & { base: "ethos" | "logos"; label: string; values: string[]; onChange: (i: number, v: string) => void }) {
  return (
    <>
      {values.map((v, i) => (
        <div className="repeat-field" key={i}>
          <span className="repeat-n" aria-hidden="true">{i + 1}.</span>
          <TextField name={`${base}.${i}`} label={`${label} ${i + 1}`} hideLabel multiline rows={2}
            value={v} onChange={(val) => onChange(i, val)} err={err} touch={touch} />
        </div>
      ))}
    </>
  );
}

export function PitchB({ answers, update, err, touch }: P) {
  const e = PITCH.ethos;
  const l = PITCH.logos;
  return (
    <div className="split enter">
      <div className="split-head stack-sm">
        <SectionTag n="03" label="TU PLANTILLA DE PITCH" />
        <h1 className="h1">{PITCH.title}</h1>
        <p className="lead">{PITCH.text}</p>
      </div>
      <div className="stack" style={{ gap: 0 }}>
        <div className="q-block" style={{ borderTop: 0, paddingTop: 0 }}>
          <QHead n={e.n} tag={e.tag} title={e.title} guide={e.guide} />
          <p className="example"><b>EJEMPLO</b>{e.example}</p>
          <Triple base="ethos" label="Prueba" values={answers.ethos} err={err} touch={touch}
            onChange={(i, v) => update((a) => ({ ...a, ethos: setAt(a.ethos, i, v) }))} />
        </div>
        <div className="q-block">
          <QHead n={l.n} tag={l.tag} title={l.title} guide={l.guide} />
          <p className="example"><b>EJEMPLO</b>{l.example}</p>
          <Triple base="logos" label="Dato" values={answers.logos} err={err} touch={touch}
            onChange={(i, v) => update((a) => ({ ...a, logos: setAt(a.logos, i, v) }))} />
        </div>
        <div className="q-block">
          <div className="stack-sm">
            <h2 className="q-title">{PITCH.quick.title}</h2>
            <p className="guide-box">{PITCH.quick.text}</p>
          </div>
          <TextField name="pruebaRapida" label={PITCH.quick.title} hideLabel multiline rows={4}
            value={answers.pruebaRapida} onChange={(v) => update((a) => ({ ...a, pruebaRapida: v }))} err={err} touch={touch} />
        </div>
      </div>
    </div>
  );
}

export function Pathos({ answers, update, err, touch }: P) {
  return (
    <div className="stack enter" style={{ gap: 40 }}>
      <div className="split">
        <div className="split-head stack-sm">
          <SectionTag n="04" label="PATHOS" />
          <h1 className="h1">{PATHOS.title}</h1>
          <p className="lead">{PATHOS.text}</p>
        </div>
        <div className="stack" style={{ gap: 0 }}>
          {PATHOS.moments.map((m, i) => (
            <div className="q-block" key={m.n} style={i === 0 ? { borderTop: 0, paddingTop: 0 } : undefined}>
              <div className="stack-sm" style={{ gap: 4 }}>
                <span className="q-n">{m.n}</span>
                <h2 className="q-title">{m.title}</h2>
                <p className="hint">{m.hint}</p>
              </div>
              <TextField name={`pathos.${i}`} label={`${m.n} · ${m.title}`} hideLabel multiline rows={4}
                value={answers.pathos[i]} onChange={(v) => update((a) => ({ ...a, pathos: setAt(a.pathos, i, v) }))}
                err={err} touch={touch} />
            </div>
          ))}
        </div>
      </div>
      <figure className="case">
        <span className="eyebrow">{PATHOS.caseTitle}</span>
        <blockquote>
          <p>{PATHOS.caseText}</p>
        </blockquote>
      </figure>
    </div>
  );
}

export function Attribute({ answers, update, err, touch }: P) {
  return (
    <div className="stack enter" style={{ gap: 44 }}>
      <div className="stack-sm">
        <SectionTag n="05" label="DEL ATRIBUTO AL SUEÑO" />
        <h1 className="h1">{ATTRIBUTE.title}</h1>
      </div>
      <div className="compare" role="table" aria-label={ATTRIBUTE.title}>
        <div className="compare-row" role="row" style={{ borderTop: 0, paddingBottom: 8 }}>
          {ATTRIBUTE.heads.map((h) => (
            <span className="eyebrow" role="columnheader" key={h}>{h}</span>
          ))}
        </div>
        {ATTRIBUTE.examples.map((ex) => (
          <div className="compare-row" role="row" key={ex.n}>
            <div className="compare-cell" role="cell"><small>{ex.n} · {ATTRIBUTE.heads[0]}</small><strong style={{ fontWeight: 800 }}>{ex.sells}</strong></div>
            <div className="compare-cell" role="cell"><small>{ATTRIBUTE.heads[1]}</small>{ex.most}</div>
            <div className="compare-cell hl" role="cell"><small style={{ fontStyle: "normal", fontFamily: "var(--font-body)" }}>{ATTRIBUTE.heads[2]}</small><strong>{ex.connects}</strong></div>
          </div>
        ))}
      </div>
      <section className="panel" aria-labelledby="mine-title">
        <h2 className="h2" id="mine-title">{ATTRIBUTE.mine}</h2>
        {ATTRIBUTE.fields.map((f) => (
          <div className="repeat-field" key={f.key}>
            <span className="repeat-n" aria-hidden="true">{f.n}.</span>
            <TextField name={`atributo.${f.key}`} label={f.label} multiline rows={2}
              value={answers.atributo[f.key]}
              onChange={(v) => update((a) => ({ ...a, atributo: { ...a.atributo, [f.key]: v } }))}
              err={err} touch={touch} />
          </div>
        ))}
      </section>
      <p className="pull" style={{ maxWidth: "30ch" }}>{ATTRIBUTE.after}</p>
    </div>
  );
}

export function Checklist({
  group, index, answers, update, err, touch,
}: P & { group: ChecklistKey; index: number }) {
  const g = CHECKLIST.find((x) => x.key === group)!;
  const last = index === 2;
  return (
    <div className="stack enter" style={{ gap: 36 }}>
      <div className="split">
        <div className="split-head stack-sm">
          <SectionTag n="06" label="CHECKLIST ANTES DE PRESENTAR" />
          <h1 className="h1">{index === 0 ? CHECKLIST_INTRO.title : g.title}</h1>
          <p className="lead">{index === 0 ? CHECKLIST_INTRO.text : `${index + 1} de 3`}</p>
          {index === 0 && <p className="eyebrow" style={{ marginTop: 8 }}>{g.title}</p>}
        </div>
        <div>
          {err("checklistSummary") && <p className="error" role="alert" style={{ marginBottom: 12 }}>{err("checklistSummary")}</p>}
          {g.items.map((text, i) => (
            <YesNoItem key={text} name={`${group}-${i}`} n={i + 1} text={text}
              value={answers.checklist[group][i]}
              error={err(`checklist.${group}.${i}`)}
              onChange={(v) => {
                update((a) => ({
                  ...a,
                  checklist: { ...a.checklist, [group]: a.checklist[group].map((x, idx) => (idx === i ? v : x)) },
                }));
                touch(`checklist.${group}.${i}`);
              }} />
          ))}
        </div>
      </div>
      {last && (
        <div className="floor">
          <p className="pull">{CHECKLIST_INTRO.closeTitle}</p>
          <p className="lead" style={{ marginTop: 12, fontWeight: 600 }}>{CHECKLIST_INTRO.closeText}</p>
        </div>
      )}
    </div>
  );
}

export function Contact({ answers, update, err, touch }: P) {
  return (
    <div className="split enter">
      <div className="split-head stack-sm">
        <SectionTag n="07" label="DATOS DE CONTACTO" />
        <h1 className="h1">{CONTACT.title}</h1>
        <p className="lead">{CONTACT.text}</p>
      </div>
      <div className="stack">
        {CONTACT.fields.map((f) => (
          <TextField key={f.key} name={`contact.${f.key}`} label={f.label} type={f.type} autoComplete={f.autoComplete}
            inputMode={f.key === "whatsapp" ? "tel" : f.key === "email" ? "email" : "text"}
            value={answers.contact[f.key]}
            onChange={(v) => update((a) => ({ ...a, contact: { ...a.contact, [f.key]: v } }))}
            err={err} touch={touch} />
        ))}
      </div>
    </div>
  );
}
