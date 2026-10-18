import type { ChecklistKey, StepId } from "@/types";

/* Todo el contenido editorial vive aquí para poder editarse sin tocar la UI. */

export const BRAND = {
  name: "WENDY WUNDER",
  tool: "LA FÓRMULA DEL IMPACTO",
  descriptor: "Arma el pitch de tu negocio.",
  promise: "un mensaje que vende, convence y se recuerda.",
  intro:
    "La plantilla para presentar tu empresa a clientes, socios o inversionistas con credibilidad, datos y emoción. En 20 minutos.",
  byline: "Por Wendy Wunder · Empresaria, productora de eventos y speaker · 20 minutos",
};

export const STEP_ORDER: StepId[] = [
  "cover",
  "formula",
  "layers",
  "pitchA",
  "pitchB",
  "pathos",
  "attribute",
  "verbal",
  "noVerbal",
  "paraverbal",
  "reveal",
  "diagnosis",
];

export const STEP_LABEL: Record<StepId, string> = {
  cover: "00 · PORTADA",
  formula: "01 · LA FÓRMULA",
  layers: "02 · LAS TRES CAPAS DE LA PERSUASIÓN",
  pitchA: "03 · TU PLANTILLA DE PITCH",
  pitchB: "03 · TU PLANTILLA DE PITCH",
  pathos: "04 · PATHOS",
  attribute: "05 · DEL ATRIBUTO AL SUEÑO",
  verbal: "06 · CHECKLIST ANTES DE PRESENTAR",
  noVerbal: "06 · CHECKLIST ANTES DE PRESENTAR",
  paraverbal: "06 · CHECKLIST ANTES DE PRESENTAR",
  reveal: "07 · REVELACIÓN",
  diagnosis: "08 · DIAGNÓSTICO",
};

export const COVER = {
  eyebrow: "PLANTILLA GRATUITA · PARA EMPRESARIOS",
  lead: "Arma el pitch de tu negocio con",
  title: ["LA FÓRMULA", "DEL IMPACTO"],
  letters: ["C", "D", "E"],
  words: ["CLARIDAD", "DIRECCIÓN", "EMOCIÓN"],
  equals: "= un mensaje que vende, convence y se recuerda.",
  findTitle: "QUÉ VAS A ENCONTRAR",
  find: [
    "La fórmula",
    "Las tres capas de la persuasión",
    "Tu plantilla de pitch",
    "Checklist antes de presentar",
  ],
  cta: "EMPEZAR",
};

export const FORMULA = {
  title: "(Claridad + Dirección) × Emoción",
  text: "La mayoría de empresarios prepara bien la claridad y la dirección: los números, el plan, el siguiente paso. Pero se olvida del factor que multiplica.",
  items: [
    { letter: "C", name: "Claridad", text: "Que te entiendan sin tener que adivinar qué quieres decir." },
    { letter: "D", name: "Dirección", text: "Saber a dónde llevas la conversación y qué quieres que pase al final." },
    { letter: "E", name: "Emoción", text: "Lo que siente quien te escucha. Es lo que convierte información en decisión." },
  ],
  why: "Por qué multiplica: la claridad y la dirección se suman, pero si la emoción es cero, el resultado es cero.",
  note: "Una propuesta impecable dicha sin emoción cierra por suerte, no por conexión. Ojo: emoción no es exceso. Es carácter manejando al temperamento.",
};

export const LAYERS = {
  title: "Las tres capas de la persuasión",
  text: "Aristóteles lo planteó hace siglos: una comunicación persuade cuando combina tres elementos. Necesitas los tres; ninguno es opcional. Pero no pesan igual. Wendy lo ilustra con la mezcla que ve en las charlas TEDx que más conectan:",
  items: [
    { name: "Ethos", tag: "credibilidad", text: "Quién eres y por qué deberían creerte.", value: 10 },
    { name: "Logos", tag: "razón", text: "Datos, cifras, evidencia.", value: 25 },
    { name: "Pathos", tag: "emoción", text: "La historia que hace sentir.", value: 65 },
  ],
  quote: "Los datos sostienen la decisión. La emoción es la que la ejecuta.",
  radioTitle: "RADIOGRAFÍA DE TU PITCH ACTUAL",
  question:
    "Piensa en la última vez que presentaste tu negocio. ¿Qué porcentaje del tiempo dedicaste a cada capa? Debe sumar 100.",
  after: "Si tu pathos está por debajo de la mitad, ya sabes por dónde empezar.",
};

export const PITCH = {
  title: "Tu plantilla de pitch",
  text: "Escribe primero, luego grábate contándolo sin leer. Primero conecta: sin confianza, ir directo al precio asusta.",
  claridad: {
    n: "1",
    tag: "CLARIDAD",
    title: "TU OFERTA EN UNA FRASE",
    guide: "Ayudo a [quién] a [lograr qué] mediante [cómo].",
    placeholder: "Ayudo a...",
  },
  direccion: {
    n: "2",
    tag: "DIRECCIÓN",
    title: "QUÉ QUIERES QUE PASE AL TERMINAR",
    guide: "Una sola acción: agendar una segunda reunión, firmar, visitar, probar.",
  },
  ethos: {
    n: "3",
    tag: "ETHOS",
    title: "TRES PRUEBAS DE QUE PUEDES CUMPLIR",
    guide: "Logros, trayectoria, clientes, años. Cuenta también de dónde vienes.",
    example: "31 emprendimientos, una agencia que produce 98 eventos al año y eventos para Tony Robbins.",
  },
  logos: {
    n: "4",
    tag: "LOGOS",
    title: "TRES DATOS QUE SOSTIENEN TU PROPUESTA",
    guide: "Cifras exactas. Si no sabes un dato, no lo inventes: dilo y vuelve con él.",
    example: "Hemos vendido 14 edificios antes que este, todos en la misma avenida.",
  },
  quick: {
    title: "PRUEBA RÁPIDA",
    text: "Grábate un minuto contando solo estos cuatro bloques, sin leer. ¿Qué parte te sonó forzada o te enredó?",
  },
};

export const PATHOS = {
  title: "Pathos · tu historia en cuatro momentos",
  text: "Las historias venden porque conectan. Mostrar un error te hace creíble, no débil.",
  moments: [
    { n: "MOMENTO 1", title: "Dónde estaba", hint: "El punto de partida, sin adornos." },
    { n: "MOMENTO 2", title: "El reto", hint: "Lo que salió mal o te dio miedo." },
    { n: "MOMENTO 3", title: "Lo que aprendí", hint: "El giro que cambió tu forma de hacer negocios." },
    { n: "MOMENTO 4", title: "El sueño que hoy vendo", hint: "Lo que tu cliente logra gracias a eso." },
  ],
  caseTitle: "CASO REAL DE WENDY",
  caseText:
    "Cuando tenía una empresa de toldos para matrimonios, un profesor le preguntó qué vendía. ‘Carpas, mesas, sillas, estructuras’, respondió. Él le dijo que no: vendía un sueño. Hasta que no entendió eso, no pudo gestionar de verdad una relación de ventas.",
};

export const ATTRIBUTE = {
  title: "Del atributo al sueño",
  heads: ["LO QUE VENDES", "CÓMO LO DICE LA MAYORÍA", "CÓMO LO DICE QUIEN CONECTA"],
  examples: [
    { n: "01", sells: "Un lapicero", most: "Azul, tinta indeleble.", connects: "Te acompaña a escribir tu gran historia." },
    { n: "02", sells: "Un toldo para bodas", most: "Estructura, mesas y sillas.", connects: "El escenario del día más importante." },
  ],
  mine: "LO QUE VENDES TÚ",
  fields: [
    { key: "vendes", n: "1", label: "Lo que vendes" },
    { key: "mayoria", n: "2", label: "Cómo lo diría la mayoría" },
    { key: "conectando", n: "3", label: "Cómo lo dirías conectando con el sueño" },
  ] as const,
  after:
    "Primero la emoción, después los atributos. Y vende algo que te emocione: es muy difícil vender lo que tú mismo no comprarías.",
};

export const CHECKLIST_INTRO = {
  title: "Checklist antes de presentar",
  text: "Vender y escalar no depende solo de lo que vendes, sino de cómo lo transmites: palabras, cuerpo y voz.",
  closeTitle: "Del suelo no pasas.",
  closeText:
    "Lo que Wendy aprendió en el circo: si te equivocas en la presentación, lo peor que pasa es que caes en cuatro patas y te vuelves a parar. Preséntalo igual.",
};

export const CHECKLIST: {
  key: ChecklistKey;
  label: "VERBAL" | "NO VERBAL" | "PARAVERBAL";
  title: string;
  items: string[];
}[] = [
  {
    key: "verbal",
    label: "VERBAL",
    title: "VERBAL · LO QUE DICES",
    items: [
      "Puedo decir mi oferta en una frase.",
      "Conozco los atributos de lo que vendo y el sueño que hay detrás.",
      "Tengo mis tres datos con cifras exactas.",
      "Sé qué acción le voy a pedir al final.",
    ],
  },
  {
    key: "noVerbal",
    label: "NO VERBAL",
    title: "NO VERBAL · CÓMO LO EXPRESAS",
    items: [
      "Miro a los ojos; en video, a la cámara y no a la pantalla.",
      "Postura erguida, manos visibles, sin brazos cruzados ni manos en los bolsillos.",
      "En video: estoy centrado en el encuadre y bien iluminado.",
      "Mi imagen está a la altura del precio que voy a pedir.",
    ],
  },
  {
    key: "paraverbal",
    label: "PARAVERBAL",
    title: "PARAVERBAL · CÓMO SUENA TU VOZ",
    items: [
      "Me grabé contándolo de memoria, sin leer, en un minuto.",
      "Hago una pausa antes de lo importante y después de dar el precio.",
      "Mi volumen no agobia ni aburre; mi tono tiene subidas y bajadas.",
      "No ofrezco un descuento que nadie me pidió.",
    ],
  },
];

export const REVEAL = {
  title: "TUS RESPUESTAS YA MUESTRAN CÓMO ESTÁ CONSTRUIDO TU PITCH.",
  text: "Veamos dónde estás fuerte y qué necesitas revisar antes de volver a presentarlo.",
  cta: "VER MI DIAGNÓSTICO",
};

export const DIAGNOSIS_TEXT = {
  eyebrow: "TU DIAGNÓSTICO",
  radiografia: "TU RADIOGRAFÍA",
  built: "LO QUE YA ESTÁ CONSTRUIDO",
  review: "LO QUE NECESITAS REVISAR",
  next: "TU SIGUIENTE PASO",
  pitch: "TU PITCH",
  pathosLow:
    "Tu Pathos está por debajo de la mitad. La propia plantilla señala que este es un punto claro por donde empezar.",
  allDone:
    "Tienes cubiertos los principales elementos del checklist. Tu siguiente paso es probar el pitch completo en voz alta y observar cómo funciona frente a una persona real.",
  nextByPriority: {
    PATHOS:
      "Vuelve a contar tu pitch poniendo primero la emoción y después los atributos. Trabaja especialmente tus cuatro momentos: dónde estabas, el reto, lo que aprendiste y el sueño que hoy vendes.",
    VERBAL:
      "Revisa lo que dices antes de volver a presentarlo: oferta, atributos + sueño, cifras exactas y acción final.",
    "NO VERBAL": "Haz una prueba en cámara y revisa mirada, postura, manos, encuadre, iluminación e imagen.",
    PARAVERBAL:
      "Grábate durante un minuto sin leer. Revisa pausas, volumen, cambios de tono y qué ocurre cuando llegas al precio.",
    COMPLETO: "Preséntalo. La siguiente validación ya no ocurre escribiendo: ocurre frente a alguien real.",
  },
  strengths: {
    claridad: "Escribiste tu oferta en una frase.",
    direccion: "Definiste una acción concreta para el cierre.",
    ethos: "Ya reuniste tres pruebas para sostener tu credibilidad.",
    logos: "Ya tienes tres datos para sostener tu propuesta.",
    pathos: "Ya escribiste los cuatro momentos de tu historia.",
    atributo: "Ya conectaste lo que vendes con el sueño que hay detrás.",
  },
  pdfButton: "DESCARGAR MI DIAGNÓSTICO",
};

export const CLOSING = {
  title: "Esto fue el primer paso.",
  text: "Con esta plantilla tienes la estructura de tu pitch. Hacer que funcione frente a un cliente real es otra historia: ahí entran la voz, el cuerpo, la lectura del otro y la negociación.",
  items: [
    {
      n: "1",
      title: "Pitch de ventas en vivo",
      text: "Cómo refrasear y asegurarte de que entiendes lo que tu cliente quiere, no lo que tú quieres venderle.",
    },
    {
      n: "2",
      title: "Voz, cuerpo y cámara",
      text: "Clases de pie para trabajar presencia, gestos, tono y pausas, con feedback de Wendy.",
    },
    {
      n: "3",
      title: "Persuasión y negociación",
      text: "Técnicas para cerrar sin presionar y crear clientes que vuelven y te recomiendan.",
    },
    {
      n: "4",
      title: "Precio y oferta premium",
      text: "Cómo construir tu escalera de ofertas y cobrar lo que vales.",
    },
  ],
  phrase: "Comunicar con impacto no es un don. Es una decisión.",
  aboutTitle: "SOBRE WENDY WUNDER",
  about:
    "Empresaria con 31 emprendimientos. Lidera una agencia de más de veinte personas que produce 98 eventos al año, ha producido eventos para Tony Robbins y ha compartido escenario con John Maxwell, Deepak Chopra, Ismael Cala y Vilma Núñez.",
};

export const UI = {
  back: "VOLVER",
  next: "CONTINUAR",
  restart: "EMPEZAR DE NUEVO",
  restartConfirm: "Se borrarán todas tus respuestas. ¿Quieres empezar de nuevo?",
  restartYes: "SÍ, BORRAR",
  restartNo: "CANCELAR",
  required: "Completa este campo para continuar.",
  sum: "Los tres porcentajes deben sumar exactamente 100%.",
  pick: "Selecciona SÍ o NO para cada punto.",
  pickOne: "Selecciona SÍ o NO.",
  emailInvalid: "Escribe un correo electrónico válido.",
  phoneInvalid: "Escribe un número de WhatsApp válido (entre 7 y 15 dígitos).",
  percentInvalid: "Escribe un número entero entre 0 y 100.",
  editAnswers: "EDITAR MIS RESPUESTAS",
  backToDiagnosis: "VOLVER AL DIAGNÓSTICO",
};
