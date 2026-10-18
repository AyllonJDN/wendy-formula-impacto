import { Defs, Document, Font, LinearGradient, Page, Rect, Stop, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { ATTRIBUTE, BRAND, CHECKLIST_INTRO, CLOSING, COVER, DIAGNOSIS_TEXT, PATHOS, PITCH } from "@/data/content";
import type { Answers, Diagnosis } from "@/types";

Font.registerHyphenationCallback((word) => [word]);

const C = {
  black: "#0B0B0B",
  gray: "#6B6B6B",
  line: "#D9D9D9",
  orange: "#FF7A00",
  red: "#F2332B",
  magenta: "#E0127F",
  yellow: "#FFC600",
};

const s = StyleSheet.create({
  page: { paddingTop: 56, paddingBottom: 64, paddingHorizontal: 52, fontFamily: "Helvetica", color: C.black, fontSize: 10.5, lineHeight: 1.45 },
  eyebrow: { fontFamily: "Helvetica-Bold", fontSize: 8.5, letterSpacing: 1.6, color: C.gray, marginBottom: 6 },
  h1: { fontFamily: "Helvetica-Bold", fontSize: 30, lineHeight: 1.05, marginBottom: 18, color: C.magenta },
  h2: { fontFamily: "Helvetica-Bold", fontSize: 13, marginBottom: 4 },
  rule: { borderTopWidth: 0.7, borderTopColor: C.line, marginVertical: 14 },
  label: { fontFamily: "Helvetica-Bold", fontSize: 8, letterSpacing: 1.4, color: C.magenta, marginBottom: 3 },
  body: { fontSize: 11, lineHeight: 1.5 },
  muted: { color: C.gray },
  italic: { fontFamily: "Helvetica-BoldOblique" },
  footer: { position: "absolute", bottom: 28, left: 52, right: 52, flexDirection: "row", justifyContent: "space-between", fontSize: 7.5, letterSpacing: 1.2, color: C.gray, fontFamily: "Helvetica-Bold" },
});

function Gradient({ id }: { id: string }) {
  return (
    <Defs>
      <LinearGradient id={id} x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0" stopColor={C.orange} />
        <Stop offset="0.5" stopColor={C.red} />
        <Stop offset="1" stopColor={C.magenta} />
      </LinearGradient>
    </Defs>
  );
}

function Footer() {
  return (
    <>
      <View fixed style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <Svg width={595} height={8}>
          <Gradient id="topbar" />
          <Rect x={0} y={0} width={595} height={8} fill="url(#topbar)" />
        </Svg>
      </View>
    <View style={s.footer} fixed>

      <Text>{BRAND.name} · {BRAND.tool}</Text>
      <Text render={({ pageNumber }) => String(pageNumber).padStart(2, "0")} />
    </View>
    </>
  );
}

function Badge({ n }: { n: string }) {
  return (
    <View style={{ width: 24, height: 24, marginRight: 8 }}>
      <Svg width={24} height={24} style={{ position: "absolute" }}>
        <Gradient id="gb" />
        <Rect x={0} y={0} width={24} height={24} rx={6} fill="url(#gb)" />
      </Svg>
      <Text style={{ color: "#fff", fontFamily: "Helvetica-Bold", fontSize: 9, textAlign: "center", marginTop: 8 }}>{n}</Text>
    </View>
  );
}

function PageHead({ n, eyebrow, title }: { n: string; eyebrow: string; title: string }) {
  return (
    <View style={{ marginBottom: 6 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
        <Badge n={n} />
        <Text style={[s.eyebrow, { marginBottom: 0 }]}>{eyebrow}</Text>
      </View>
      <Text style={s.h1}>{title}</Text>
    </View>
  );
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View wrap={false} style={{ marginBottom: 14 }}>
      <Text style={s.label}>{label}</Text>
      <Text style={s.body}>{children}</Text>
      <View style={[s.rule, { marginTop: 10, marginBottom: 0 }]} />
    </View>
  );
}

function Bar({ name, value }: { name: string; value: number }) {
  const w = 491;
  return (
    <View style={{ marginBottom: 14 }} wrap={false}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>{name}</Text>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>{value}%</Text>
      </View>
      <Svg width={w} height={9}>
        <Gradient id={`gr-${name}`} />
        <Rect x={0} y={0} width={w} height={9} fill="#EFEFEF" />
        <Rect x={0} y={0} width={Math.max(0, (w * value) / 100)} height={9} fill={`url(#gr-${name})`} />
      </Svg>
    </View>
  );
}

export interface PdfProps {
  answers: Answers;
  diagnosis: Diagnosis;
  date: string;
}

export function DiagnosisPdf({ answers, diagnosis, date }: PdfProps) {
  const T = DIAGNOSIS_TEXT;
  return (
    <Document title={`${BRAND.tool} · Diagnóstico personal`} author={BRAND.name} subject={BRAND.descriptor}>
      {/* PÁGINA 1 · PORTADA */}
      <Page size="A4" style={[s.page, { padding: 0 }]}>
        <Svg width={595} height={842} style={{ position: "absolute", top: 0, left: 0 }}>
          <Defs>
            <LinearGradient id="cover" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={C.orange} />
              <Stop offset="0.5" stopColor={C.red} />
              <Stop offset="1" stopColor={C.magenta} />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={470} width={595} height={372} fill="url(#cover)" />
        </Svg>
        <View style={{ paddingTop: 56, paddingHorizontal: 52 }}>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 11, letterSpacing: 3 }}>{BRAND.name}</Text>
          <View style={{ marginTop: 70 }}>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 46, lineHeight: 1.0 }}>{COVER.title[0]}</Text>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 46, lineHeight: 1.05, color: C.magenta }}>{COVER.title[1]}</Text>
          </View>
          <Text style={[s.eyebrow, { marginTop: 22, fontSize: 10 }]}>DIAGNÓSTICO PERSONAL</Text>
          <View style={{ marginTop: 22 }}>
            <Text style={s.label}>FECHA</Text>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 15 }}>{date}</Text>
          </View>
        </View>
        <View style={{ position: "absolute", top: 520, left: 52, right: 52 }}>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 56, color: "#fff", letterSpacing: 4 }}>( C + D ) × E</Text>
          <View style={{ flexDirection: "row", marginTop: 26 }}>
            {COVER.letters.map((l, i) => (
              <View key={l} style={{ marginRight: 38 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 22, color: "#fff" }}>{l}</Text>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9, letterSpacing: 1.6, color: "#fff" }}>{COVER.words[i]}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>

      {/* PÁGINA 2 · TU RADIOGRAFÍA */}
      <Page size="A4" style={s.page}>
        <PageHead n="02" eyebrow={T.eyebrow} title={T.radiografia} />
        <Bar name="Ethos" value={diagnosis.mix.ethos} />
        <Bar name="Logos" value={diagnosis.mix.logos} />
        <Bar name="Pathos" value={diagnosis.mix.pathos} />
        <View style={s.rule} />
        <Text style={s.label}>ÁREA PRIORITARIA</Text>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 24, marginBottom: 10 }}>
          {diagnosis.priority === "COMPLETO" ? "TODO CUBIERTO" : diagnosis.priority}
        </Text>
        {diagnosis.interpretation.map((t) => (
          <Text key={t} style={[s.body, { marginBottom: 8 }]}>{t}</Text>
        ))}
        <Footer />
      </Page>

      {/* PÁGINA 3 · TU PITCH */}
      <Page size="A4" style={s.page}>
        <PageHead n="03" eyebrow={T.eyebrow} title={T.pitch} />
        <Block label={`${PITCH.claridad.tag} · ${PITCH.claridad.title}`}>{answers.claridad}</Block>
        <Block label={`${PITCH.direccion.tag} · ${PITCH.direccion.title}`}>{answers.direccion}</Block>
        <Block label={`${PITCH.ethos.tag} · ${PITCH.ethos.title}`}>
          {answers.ethos.map((v, i) => `${i + 1}. ${v}`).join("\n")}
        </Block>
        <Block label={`${PITCH.logos.tag} · ${PITCH.logos.title}`}>
          {answers.logos.map((v, i) => `${i + 1}. ${v}`).join("\n")}
        </Block>
        <Footer />
      </Page>

      {/* PÁGINA 4 · TU HISTORIA */}
      <Page size="A4" style={s.page}>
        <PageHead n="04" eyebrow="PATHOS" title="TU HISTORIA" />
        {PATHOS.moments.map((m, i) => (
          <View key={m.n} wrap={false} style={{ marginBottom: 14 }}>
            <Text style={s.label}>{m.n}</Text>
            <Text style={s.h2}>{m.title}</Text>
            <Text style={s.body}>{answers.pathos[i]}</Text>
            <View style={[s.rule, { marginBottom: 0 }]} />
          </View>
        ))}
        <Footer />
      </Page>

      {/* PÁGINA 5 · DEL ATRIBUTO AL SUEÑO */}
      <Page size="A4" style={s.page}>
        <PageHead n="05" eyebrow="PATHOS" title={ATTRIBUTE.title} />
        <Block label="LO QUE VENDES">{answers.atributo.vendes}</Block>
        <Block label="CÓMO LO DICE LA MAYORÍA">{answers.atributo.mayoria}</Block>
        <Block label="CÓMO LO DICES CONECTANDO">{answers.atributo.conectando}</Block>
        <Text style={[s.body, s.italic, { marginTop: 8 }]}>{ATTRIBUTE.after}</Text>
        <Footer />
      </Page>

      {/* PÁGINA 6 · TU CHECKLIST */}
      <Page size="A4" style={s.page}>
        <PageHead n="06" eyebrow={T.eyebrow} title="TU CHECKLIST" />
        {diagnosis.checklist.map((g) => (
          <View key={g.key} style={{ marginBottom: 16 }}>
            <View wrap={false} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>{g.label}</Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>{g.yes} / {g.total}</Text>
            </View>
            {g.items.map((it) => (
              <View key={it.text} wrap={false} style={{ flexDirection: "row", borderTopWidth: 0.7, borderTopColor: C.line, paddingVertical: 5 }}>
                <Text style={{ width: 78, fontFamily: "Helvetica-Bold", fontSize: 8.5, letterSpacing: 1, color: it.yes ? C.black : C.magenta }}>
                  {it.yes ? "SÍ" : "POR REVISAR"}
                </Text>
                <Text style={{ flex: 1, fontSize: 10 }}>{it.text}</Text>
              </View>
            ))}
          </View>
        ))}
        <Footer />
      </Page>

      {/* PÁGINA FINAL */}
      <Page size="A4" style={s.page}>
        <PageHead n="07" eyebrow={T.eyebrow} title={T.next} />
        <Text style={[s.body, { fontSize: 13, lineHeight: 1.5, marginBottom: 6 }]}>{diagnosis.nextStep}</Text>
        <View style={s.rule} />
        <Text style={{ fontFamily: "Helvetica-BoldOblique", fontSize: 26, marginTop: 6, marginBottom: 8 }}>{CHECKLIST_INTRO.closeTitle}</Text>
        <Text style={s.body}>
          Si te equivocas en la presentación, lo peor que pasa es que caes en cuatro patas y te vuelves a parar. Preséntalo igual.
        </Text>
        <View style={s.rule} />
        <Text style={{ fontFamily: "Helvetica-BoldOblique", fontSize: 18, lineHeight: 1.25 }}>{CLOSING.phrase}</Text>
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 12, letterSpacing: 3 }}>{BRAND.name}</Text>
        </View>
        <Footer />
      </Page>
    </Document>
  );
}
