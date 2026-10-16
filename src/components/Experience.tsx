"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { BRAND, STEP_LABEL, STEP_ORDER, UI } from "@/data/content";
import { emptyAnswers } from "@/lib/answers";
import { clearSaved, loadSaved, save } from "@/lib/storage";
import { firstInvalidStep, validateStep } from "@/lib/validation";
import type { Answers, StepId } from "@/types";
import { Attribute, Checklist, Contact, PitchA, PitchB, Pathos } from "./steps/inputs";
import { Cover, Formula, Layers } from "./steps/intro";
import { Diagnosis, Reveal } from "./steps/result";

const LAST = STEP_ORDER.length - 1;
const NO_NAV: StepId[] = ["cover", "reveal", "diagnosis"];
const idxOf = (s: StepId) => STEP_ORDER.indexOf(s);

export function Experience() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [step, setStep] = useState<StepId>("cover");
  const [hydrated, setHydrated] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(() => new Set());
  const [editing, setEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // Restaurar respuestas (y posición) tras recargar.
  useEffect(() => {
    const saved = loadSaved();
    if (saved) {
      setAnswers(saved.answers);
      const bad = firstInvalidStep(saved.answers);
      const max = bad ? idxOf(bad) : LAST;
      const wanted = saved.step && idxOf(saved.step) >= 0 ? idxOf(saved.step) : 0;
      setStep(STEP_ORDER[Math.min(wanted, max)]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) save({ answers, step });
  }, [answers, step, hydrated]);

  // Al cambiar de pantalla: arriba y foco en el contenido.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    mainRef.current?.focus({ preventScroll: true });
  }, [step]);

  const errors = useMemo(() => validateStep(step, answers), [step, answers]);
  const err = useCallback(
    (key: string) => (errors[key] && (attempted || touched.has(key)) ? errors[key] : undefined),
    [errors, attempted, touched],
  );
  const touch = useCallback((key: string) => setTouched((t) => (t.has(key) ? t : new Set(t).add(key))), []);
  const update = useCallback((fn: (a: Answers) => Answers) => setAnswers(fn), []);

  const goTo = useCallback((s: StepId) => {
    setAttempted(false);
    setTouched(new Set());
    setStep(s);
  }, []);

  function next() {
    if (Object.keys(errors).length > 0) {
      setAttempted(true);
      window.setTimeout(() => {
        document.querySelector<HTMLElement>('[aria-invalid="true"], .yn-item.invalid input')?.focus();
      }, 0);
      return;
    }
    if (editing && step === "contact") {
      setEditing(false);
      goTo("diagnosis");
      return;
    }
    goTo(STEP_ORDER[Math.min(idxOf(step) + 1, LAST)]);
  }

  function back() {
    goTo(STEP_ORDER[Math.max(idxOf(step) - 1, 0)]);
  }

  function backToDiagnosis() {
    if (Object.keys(errors).length > 0) return next();
    setEditing(false);
    goTo("diagnosis");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!NO_NAV.includes(step)) next();
  }

  function restart() {
    clearSaved();
    setAnswers(emptyAnswers());
    setEditing(false);
    setConfirmOpen(false);
    goTo("cover");
  }

  const i = idxOf(step);
  const progress = Math.round((i / LAST) * 100);
  const common = { answers, update, err, touch };

  let body;
  switch (step) {
    case "cover": body = <Cover onStart={() => goTo("formula")} />; break;
    case "formula": body = <Formula />; break;
    case "layers": body = <Layers {...common} />; break;
    case "pitchA": body = <PitchA {...common} />; break;
    case "pitchB": body = <PitchB {...common} />; break;
    case "pathos": body = <Pathos {...common} />; break;
    case "attribute": body = <Attribute {...common} />; break;
    case "verbal": body = <Checklist {...common} group="verbal" index={0} />; break;
    case "noVerbal": body = <Checklist {...common} group="noVerbal" index={1} />; break;
    case "paraverbal": body = <Checklist {...common} group="paraverbal" index={2} />; break;
    case "contact": body = <Contact {...common} />; break;
    case "reveal": body = <Reveal onGo={() => goTo("diagnosis")} onBack={back} />; break;
    case "diagnosis":
      body = <Diagnosis answers={answers} onEdit={(s) => { setEditing(true); goTo(s); }} />;
      break;
  }

  const showNav = !NO_NAV.includes(step);

  return (
    <form onSubmit={onSubmit} noValidate>
      <header className="app-header">
        <div className="app-header-inner">
          <span className="wordmark">{BRAND.name}</span>
          <span className="header-section">{STEP_LABEL[step]}</span>
          <button type="button" className="link-btn" onClick={() => setConfirmOpen(true)}>{UI.restart}</button>
        </div>
        <div className="progress" role="progressbar" aria-label="Progreso" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main ref={mainRef} tabIndex={-1} className={`stage${showNav ? "" : " no-nav"}`} style={{ outline: "none" }}>
        <p className="sr-only" aria-live="polite">{STEP_LABEL[step]}</p>
        <div key={step}>{body}</div>
      </main>

      {showNav && (
        <nav className="nav" aria-label="Navegación">
          <div className="nav-inner">
            <button type="button" className="btn btn-ghost" onClick={back}>{UI.back}</button>
            <span className="nav-count">{i} / {LAST - 3}</span>
            {editing && (
              <button type="button" className="link-btn" onClick={backToDiagnosis}>{UI.backToDiagnosis}</button>
            )}
            <button type="submit" className="btn btn-primary btn-grow">{UI.next}</button>
          </div>
        </nav>
      )}

      {confirmOpen && (
        <div className="dialog-backdrop" onKeyDown={(e) => e.key === "Escape" && setConfirmOpen(false)}>
          <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="restart-msg">
            <p id="restart-msg" className="lead" style={{ fontWeight: 700 }}>{UI.restartConfirm}</p>
            <div className="dialog-actions">
              <button type="button" className="btn btn-ghost" autoFocus onClick={() => setConfirmOpen(false)}>{UI.restartNo}</button>
              <button type="button" className="btn" onClick={restart}>{UI.restartYes}</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
