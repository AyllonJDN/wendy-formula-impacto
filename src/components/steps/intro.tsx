"use client";

import { COVER, FORMULA, LAYERS, BRAND } from "@/data/content";
import { mixTotal, parsePercent } from "@/lib/validation";
import type { Answers } from "@/types";
import { PercentField, SectionTag, type FieldCtx } from "../ui";

export function Cover({ onStart }: { onStart: () => void }) {
  return (
    <div className="stack enter" style={{ gap: 44 }}>
      <div className="cover-grid">
        <div className="stack-sm cover-copy" style={{ gap: 22 }}>
          <p className="eyebrow eyebrow-pill">{COVER.eyebrow}</p>
          <p className="lead" style={{ fontWeight: 700 }}>{COVER.lead}</p>
          <h1 className="display cover-title">
            {COVER.title[0]}
            <br />
            <span className="grad-text">{COVER.title[1]}</span>
          </h1>
          <p className="lead" style={{ fontWeight: 800 }}>{BRAND.descriptor}</p>
          <p className="muted">{BRAND.byline}</p>
          <p className="muted" style={{ maxWidth: "44ch" }}>{BRAND.intro}</p>
          <div>
            <button type="button" className="btn btn-primary btn-grow" onClick={onStart}>
              {COVER.cta} →
            </button>
          </div>
        </div>
        <figure className="hero-photo">
          <span className="hero-blob" aria-hidden="true" />
          <span className="hero-dots" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/wendy.png" alt="Wendy Wunder" width={1428} height={1932} fetchPriority="high" />
        </figure>
      </div>

      <div className="formula-band" role="group" aria-label="( C + D ) × E">
        <div className="formula-big" aria-hidden="true">( C + D ) × E</div>
        <div className="formula-legend">
          {COVER.letters.map((l, i) => (
            <div key={l}>
              <b>{l}</b>
              <span>{COVER.words[i]}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 22, fontWeight: 800 }}>{COVER.equals}</p>
      </div>

      <div style={{ maxWidth: 640 }}>
        <p className="eyebrow" style={{ marginBottom: 14 }}>{COVER.findTitle}</p>
        <ol className="find-list">
          {COVER.find.map((t, i) => (
            <li key={t}>
              <span>{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function Formula() {
  return (
    <div className="stack enter" style={{ gap: 40 }}>
      <div className="split">
        <div className="split-head">
          <SectionTag n="01" label="LA FÓRMULA" />
          <h1 className="h1">{FORMULA.title}</h1>
        </div>
        <p className="lead">{FORMULA.text}</p>
      </div>
      <div className="cde">
        {FORMULA.items.map((it) => (
          <div className="cde-item" key={it.letter}>
            <div className="cde-letter" aria-hidden="true">{it.letter}</div>
            <div className="stack-sm" style={{ gap: 6 }}>
              <h2 className="h2">{it.name}</h2>
              <p className="muted">{it.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="split">
        <p className="callout lead it">{FORMULA.why}</p>
        <p className="callout lead">{FORMULA.note}</p>
      </div>
    </div>
  );
}

export function Layers({
  answers, update, err, touch,
}: FieldCtx & { answers: Answers; update: (fn: (a: Answers) => Answers) => void }) {
  const total = mixTotal(answers.mix);
  const allFilled = (["ethos", "logos", "pathos"] as const).every((k) => parsePercent(answers.mix[k]) !== null);
  const ok = allFilled && total === 100;
  const set = (k: "ethos" | "logos" | "pathos") => (v: string) =>
    update((a) => ({ ...a, mix: { ...a.mix, [k]: v } }));
  return (
    <div className="stack enter" style={{ gap: 48 }}>
      <div className="split">
        <div className="split-head stack-sm">
          <SectionTag n="02" label="LAS TRES CAPAS DE LA PERSUASIÓN" />
          <h1 className="h1">{LAYERS.title}</h1>
        </div>
        <div className="stack">
          <p className="lead">{LAYERS.text}</p>
          <ul aria-label={LAYERS.title}>
            {LAYERS.items.map((it) => (
              <li className="layer-row" key={it.name}>
                <div className="layer-top">
                  <span className="layer-name">
                    {it.name} <span className="muted" style={{ fontWeight: 500, fontFamily: "var(--font-body)", fontSize: "1rem" }}>· {it.tag}</span>
                  </span>
                  <span className="layer-pct">{it.value}%</span>
                </div>
                <p className="muted">{it.text}</p>
                <div className="bar" aria-hidden="true"><span style={{ width: `${it.value}%` }} /></div>
              </li>
            ))}
          </ul>
          <p className="pull">{LAYERS.quote}</p>
        </div>
      </div>

      <section className="panel" aria-labelledby="radio-title">
        <h2 className="h2" id="radio-title">{LAYERS.radioTitle}</h2>
        <p className="lead">{LAYERS.question}</p>
        <div className="mix-grid">
          <PercentField name="mix.ethos" label="Ethos" value={answers.mix.ethos} onChange={set("ethos")} err={err} touch={touch} />
          <PercentField name="mix.logos" label="Logos" value={answers.mix.logos} onChange={set("logos")} err={err} touch={touch} />
          <PercentField name="mix.pathos" label="Pathos" value={answers.mix.pathos} onChange={set("pathos")} err={err} touch={touch} />
        </div>
        <div className={`total ${ok ? "ok" : total > 100 ? "bad" : ""}`} aria-live="polite">
          <span>TOTAL: {total} / 100</span>
          <span className="bar tbar" aria-hidden="true"><span style={{ width: `${Math.min(total, 100)}%` }} /></span>
        </div>
        {err("mixSum") && <p className="error" role="alert">{err("mixSum")}</p>}
        <p className="it">{LAYERS.after}</p>
      </section>
    </div>
  );
}
