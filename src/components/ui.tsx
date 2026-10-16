"use client";

import { useId, type ReactNode } from "react";
import type { YesNo } from "@/types";

/** Contexto mínimo que reciben los pasos para leer/editar respuestas. */
export interface FieldCtx {
  err: (key: string) => string | undefined;
  touch: (key: string) => void;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}

export function SectionTag({ n, label }: { n: string; label: string }) {
  return (
    <div className="section-tag">
      <Badge>{n}</Badge>
      <span className="eyebrow">{label}</span>
    </div>
  );
}

interface FieldProps extends FieldCtx {
  name: string;
  label: ReactNode;
  hint?: ReactNode;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
  hideLabel?: boolean;
}

export function TextField({
  name, label, hint, value, onChange, err, touch, multiline, rows = 4, placeholder, type = "text", autoComplete, inputMode, hideLabel,
}: FieldProps) {
  const id = useId();
  const error = err(name);
  const common = {
    id,
    name,
    value,
    placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": [hint ? `${id}-h` : "", error ? `${id}-e` : ""].filter(Boolean).join(" ") || undefined,
    "aria-required": true,
    onBlur: () => touch(name),
  } as const;
  return (
    <div className={`field${error ? " invalid" : ""}`}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : "label"}>{label}</label>
      {hint && <p id={`${id}-h`} className="hint">{hint}</p>}
      {multiline ? (
        <textarea {...common} className="textarea" rows={rows} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input
          {...common}
          className="input"
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && <p id={`${id}-e`} className="error" role="alert">{error}</p>}
    </div>
  );
}

export function PercentField({
  name, label, value, onChange, err, touch,
}: Pick<FieldProps, "name" | "label" | "value" | "onChange" | "err" | "touch">) {
  const id = useId();
  const error = err(name);
  return (
    <div className={`field${error ? " invalid" : ""}`}>
      <label htmlFor={id} className="label">{label}</label>
      <div className="pct">
        <input
          id={id}
          name={name}
          className="input"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={3}
          value={value}
          placeholder="0"
          aria-required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-e` : undefined}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 3))}
          onBlur={() => touch(name)}
        />
      </div>
      {error && <p id={`${id}-e`} className="error" role="alert">{error}</p>}
    </div>
  );
}

export function YesNoItem({
  name, n, text, value, onChange, error,
}: {
  name: string;
  n: number;
  text: string;
  value: YesNo;
  onChange: (v: "si" | "no") => void;
  error?: string;
}) {
  const id = useId();
  return (
    <fieldset className={`yn-item${error ? " invalid" : ""}`} style={{ border: 0, margin: 0, minWidth: 0, borderTop: "1px solid var(--ww-line)" }} aria-describedby={error ? `${id}-e` : undefined}>
      <legend className="sr-only">{text}</legend>
      <div className="yn-text" aria-hidden="true">
        <span className="yn-num">{n}.</span>
        <span>{text}</span>
      </div>
      <div className="yn-group" role="radiogroup" aria-label={text}>
        {(["si", "no"] as const).map((opt) => (
          <label className="yn-opt" key={opt}>
            <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(opt)} />
            <span className={opt}>{opt === "si" ? "SÍ" : "NO"}</span>
          </label>
        ))}
      </div>
      {error && <p id={`${id}-e`} className="error" role="alert">{error}</p>}
    </fieldset>
  );
}
