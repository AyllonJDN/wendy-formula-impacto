"use client";

import { useState } from "react";
import { ATTRIBUTE, BRAND, CHECKLIST_INTRO, CLOSING, DIAGNOSIS_TEXT as T, PATHOS, PITCH, REVEAL, UI } from "@/data/content";
import { calculateDiagnosis } from "@/lib/diagnosis";
import type { Answers, StepId } from "@/types";
import { Badge } from "../ui";

export function Reveal({ onGo, onBack }: { onGo: () => void; onBack: () => void }) {
  const [leaving, setLeaving] = useState(false);
  return (
    <div className={`reveal enter${leaving ? " leaving" : ""}`}>
      <span className="badge" aria-hidden="true">07</span>
      <h1 className="display h1" style={{ lineHeight: 1.02 }}>{REVEAL.title}</h1>
      <p className="lead muted" style={{ maxWidth: "46ch" }}>{REVEAL.text}</p>
      <div className="dx-actions">
        <button type="button" className="btn btn-primary btn-grow" disabled={leaving}
          onClick={() => { setLeaving(true); window.setTimeout(onGo, 700); }}>
          {REVEAL.cta}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onBack} disabled={leaving}>{UI.back}</button>
      </div>
    </div>
  );
}

function Bar({ name, value }: { name: string; value: number }) {
  return (
    <li className="layer-row">
      <div className="layer-top">
        <span className="layer-name">{name}</span>
        <span className="layer-pct">{value}%</span>
      </div>
      <div className="bar" role="img" aria-label={`${name} ${value}%`}><span style={{ width: `${value}%` }} /></div>
    </li>
  );
}

function PitchRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pitch-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function Diagnosis({
  answers, onEdit,
}: {
  answers: Answers;
  onEdit: (step: StepId) => void;
}) {
  const dx = calculateDiagnosis(answers);
  const [busy, setBusy] = useState(false);
  const [pdfError, setPdfError] = useState("");

  async function download() {
    setBusy(true);
    setPdfError("");
    try {
      const { generateDiagnosisPdf, pdfFileName } = await import("@/lib/pdf/generate");
      const blob = await generateDiagnosisPdf(answers);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFileName();
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch {
      setPdfError("No pudimos generar el PDF. Inténtalo de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  const allDone = dx.priority === "COMPLETO";

  return (
    <article className="enter">
      <header className="dx-head">
        <div className="stack-sm" style={{ gap: 16 }}>
          <div className="section-tag"><Badge>08</Badge><span className="eyebrow">{T.eyebrow}</span></div>
          <h1 className="dx-name">{BRAND.tool}</h1>
        </div>
        <p className="formula-big grad-text" aria-label="( C + D ) × E">( C + D ) × E</p>
      </header>

      <section className="dx-section" aria-labelledby="dx-rad">
        <h2 className="dx-title" id="dx-rad">{T.radiografia}</h2>
        <ul style={{ maxWidth: 720 }}>
          <Bar name="Ethos" value={dx.mix.ethos} />
          <Bar name="Logos" value={dx.mix.logos} />
          <Bar name="Pathos" value={dx.mix.pathos} />
        </ul>
        <div><button type="button" className="link-btn" onClick={() => onEdit("layers")}>EDITAR PORCENTAJES</button></div>
      </section>

      <section className="dx-section" aria-labelledby="dx-built">
        <h2 className="dx-title" id="dx-built">{T.built}</h2>
        <ul className="dx-list" style={{ maxWidth: 720 }}>
          {dx.strengths.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>

      <section className="dx-section" aria-labelledby="dx-review">
        <h2 className="dx-title" id="dx-review">{T.review}</h2>
        <div className="priority">
          <span className="eyebrow" style={{ color: "rgba(255,255,255,.85)" }}>PRIORIDAD</span>
          <b>{allDone ? "TODO CUBIERTO" : dx.priority}</b>
          {dx.interpretation.map((t) => <p key={t} style={{ marginTop: 12, fontWeight: 600, maxWidth: "60ch" }}>{t}</p>)}
        </div>
        {dx.reviewAreas.filter((r) => !(r.title === "PATHOS")).map((r) => (
          <div className="review-group" key={r.title} style={{ maxWidth: 720 }}>
            <h3>{r.title}</h3>
            <ul className="dx-list review">
              {r.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="dx-section" aria-labelledby="dx-next">
        <h2 className="dx-title" id="dx-next">{T.next}</h2>
        <p className="next-step">{dx.nextStep}</p>
      </section>

      <section className="dx-section" aria-labelledby="dx-pitch">
        <h2 className="dx-title" id="dx-pitch">{T.pitch}</h2>
        <dl className="pitch-grid">
          <div>
            <PitchRow label={`${PITCH.claridad.tag} · OFERTA`}>{answers.claridad}</PitchRow>
            <PitchRow label={`${PITCH.direccion.tag}`}>{answers.direccion}</PitchRow>
            {answers.ethos.map((v, i) => <PitchRow key={`e${i}`} label={`ETHOS ${i + 1}`}>{v}</PitchRow>)}
            {answers.logos.map((v, i) => <PitchRow key={`l${i}`} label={`LOGOS ${i + 1}`}>{v}</PitchRow>)}
          </div>
          <div>
            {PATHOS.moments.map((m, i) => (
              <PitchRow key={m.n} label={`PATHOS · ${m.n} · ${m.title.toUpperCase()}`}>{answers.pathos[i]}</PitchRow>
            ))}
            <PitchRow label={`${ATTRIBUTE.title.toUpperCase()} · ${ATTRIBUTE.heads[0]}`}>{answers.atributo.vendes}</PitchRow>
            <PitchRow label={ATTRIBUTE.heads[1]}>{answers.atributo.mayoria}</PitchRow>
            <PitchRow label={ATTRIBUTE.heads[2]}>{answers.atributo.conectando}</PitchRow>
          </div>
        </dl>
        <div className="dx-actions" style={{ marginTop: 8 }}>
          <button type="button" className="btn btn-primary btn-grow" onClick={download} disabled={busy}>
            {busy ? "GENERANDO…" : T.pdfButton}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => onEdit("layers")}>{UI.editAnswers}</button>
        </div>
        <p role="status" className="error" hidden={!pdfError}>{pdfError}</p>
      </section>

      <section className="dx-section" aria-labelledby="dx-floor">
        <p className="big-phrase" id="dx-floor">{CHECKLIST_INTRO.closeTitle}</p>
        <p className="lead" style={{ maxWidth: "52ch" }}>{CHECKLIST_INTRO.closeText}</p>
      </section>

      <section className="dx-section" aria-labelledby="dx-close">
        <div className="split">
          <div className="split-head stack-sm">
            <h2 className="h1" id="dx-close">{CLOSING.title}</h2>
            <p className="lead">{CLOSING.text}</p>
          </div>
          <ol>
            {CLOSING.items.map((it) => (
              <li className="closing-item" key={it.n}>
                <span className="closing-n">{it.n}</span>
                <div className="stack-sm" style={{ gap: 4 }}>
                  <h3 className="h2">{it.title}</h3>
                  <p className="muted">{it.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="dx-section">
        <p className="big-phrase grad-text">{CLOSING.phrase}</p>
        <div className="split" style={{ marginTop: 12 }}>
          <div className="stack-sm">
            <h2 className="dx-title">{CLOSING.aboutTitle}</h2>
            <p>{CLOSING.about}</p>
          </div>
        </div>
      </section>
    </article>
  );
}
