// UI translations for the homepage. The AI result is translated separately by
// Gemini; this covers the static interface so a non-English parent isn't met
// with an English wall. Falls back to English for any missing language.

export interface UIStrings {
  heroTitle: string;
  heroSub: string;
  tryHeading: string;
  dropMain: string;
  dropSub: string;
  uploading: string;
  placeholder: string;
  resultIn: string;
  submit: string;
  submitting: string;
  footer: string;
  aboutLink: string;
  samples: { school: string; eviction: string; vaccine: string };
  errShort: string;
  errPdfBig: string;
  errPdfRead: string;
  errGeneric: string;
}

const ui: Record<string, UIStrings> = {
  en: {
    heroTitle: "Understand any confusing document in 15 seconds.",
    heroSub:
      "Paste any letter, form, or notice — from school, a doctor, a court, the government, or anywhere else. We'll explain it in plain English and tell you exactly what to do.",
    tryHeading: "New here? Try a sample document:",
    dropMain: "Drop a PDF here, or tap to choose a file",
    dropSub: "We'll pull out the text — or just paste it below.",
    uploading: "Reading your PDF…",
    placeholder: "Paste the text of your letter here…",
    resultIn: "Show me the result in",
    submit: "Explain this for me",
    submitting: "Reading your document…",
    footer:
      "ClarityView explains documents. It does not give legal or medical advice. No information is shared without your choice.",
    aboutLink: "How ClarityView keeps you in control →",
    samples: {
      school: "School exam form",
      eviction: "Eviction notice",
      vaccine: "Vaccine record (Spanish)",
    },
    errShort: "Please paste a bit more text so we can understand the document.",
    errPdfBig:
      "That PDF is too big to upload (4 MB max). Try a smaller file, or copy and paste the text instead.",
    errPdfRead:
      "We couldn't read that PDF. Try a smaller file, or paste the text instead.",
    errGeneric: "Something went wrong. Please try again.",
  },
  es: {
    heroTitle: "Entienda cualquier documento confuso en 15 segundos.",
    heroSub:
      "Pegue cualquier carta, formulario o aviso — de la escuela, un médico, un tribunal, el gobierno o de cualquier otro lugar. Se lo explicaremos en palabras sencillas y le diremos exactamente qué hacer.",
    tryHeading: "¿Primera vez? Pruebe un documento de ejemplo:",
    dropMain: "Suelte un PDF aquí o toque para elegir un archivo",
    dropSub: "Extraeremos el texto — o simplemente péguelo abajo.",
    uploading: "Leyendo su PDF…",
    placeholder: "Pegue aquí el texto de su carta…",
    resultIn: "Muéstreme el resultado en",
    submit: "Explíqueme esto",
    submitting: "Leyendo su documento…",
    footer:
      "ClarityView explica documentos. No brinda asesoría legal ni médica. No se comparte ninguna información sin su consentimiento.",
    aboutLink: "Cómo ClarityView lo mantiene en control →",
    samples: {
      school: "Formulario de examen escolar",
      eviction: "Aviso de desalojo",
      vaccine: "Registro de vacunas (español)",
    },
    errShort:
      "Por favor pegue un poco más de texto para que podamos entender el documento.",
    errPdfBig:
      "Ese PDF es demasiado grande (máximo 4 MB). Pruebe con un archivo más pequeño o copie y pegue el texto.",
    errPdfRead:
      "No pudimos leer ese PDF. Pruebe con un archivo más pequeño o pegue el texto.",
    errGeneric: "Algo salió mal. Inténtelo de nuevo.",
  },
  ar: {
    heroTitle: "افهم أي مستند محيّر في 15 ثانية.",
    heroSub:
      "الصق أي رسالة أو نموذج أو إشعار — من المدرسة أو الطبيب أو المحكمة أو الحكومة أو أي مكان آخر. سنشرحه لك بكلمات بسيطة ونخبرك بالضبط بما يجب فعله.",
    tryHeading: "هل أنت جديد؟ جرّب مستندًا تجريبيًا:",
    dropMain: "أفلت ملف PDF هنا، أو اضغط لاختيار ملف",
    dropSub: "سنستخرج النص — أو الصقه في الأسفل.",
    uploading: "جارٍ قراءة ملف PDF…",
    placeholder: "الصق نص رسالتك هنا…",
    resultIn: "أظهر لي النتيجة بـ",
    submit: "اشرح لي هذا",
    submitting: "جارٍ قراءة مستندك…",
    footer:
      "كلاريتي فيو يشرح المستندات. لا يقدّم استشارة قانونية أو طبية. لا تتم مشاركة أي معلومات دون موافقتك.",
    aboutLink: "كيف يُبقيك ClarityView مُتحكِّمًا →",
    samples: {
      school: "نموذج امتحان مدرسي",
      eviction: "إشعار إخلاء",
      vaccine: "سجل التطعيمات (بالإسبانية)",
    },
    errShort: "يرجى لصق المزيد من النص حتى نتمكن من فهم المستند.",
    errPdfBig:
      "ملف PDF كبير جدًا (الحد الأقصى 4 ميغابايت). جرّب ملفًا أصغر أو انسخ النص والصقه.",
    errPdfRead: "تعذّر علينا قراءة ملف PDF. جرّب ملفًا أصغر أو الصق النص.",
    errGeneric: "حدث خطأ ما. حاول مرة أخرى.",
  },
  zh: {
    heroTitle: "15 秒看懂任何难懂的文件。",
    heroSub:
      "粘贴任何信件、表格或通知——来自学校、医生、法院、政府或其他任何地方。我们会用简单的语言为您解释，并告诉您具体该怎么做。",
    tryHeading: "第一次使用？试试示例文件：",
    dropMain: "将 PDF 拖到此处，或点击选择文件",
    dropSub: "我们会提取文字——或直接粘贴到下方。",
    uploading: "正在读取您的 PDF…",
    placeholder: "在此粘贴您的信件内容…",
    resultIn: "结果显示语言",
    submit: "为我解释",
    submitting: "正在读取您的文件…",
    footer:
      "ClarityView 解释文件。它不提供法律或医疗建议。未经您的同意，不会分享任何信息。",
    aboutLink: "ClarityView 如何让您掌握主动权 →",
    samples: {
      school: "学校考试表格",
      eviction: "驱逐通知",
      vaccine: "疫苗记录（西班牙语）",
    },
    errShort: "请粘贴更多文字，以便我们理解该文件。",
    errPdfBig: "该 PDF 太大（最大 4 MB）。请尝试更小的文件，或复制粘贴文字。",
    errPdfRead: "我们无法读取该 PDF。请尝试更小的文件，或粘贴文字。",
    errGeneric: "出了点问题。请重试。",
  },
  pt: {
    heroTitle: "Entenda qualquer documento confuso em 15 segundos.",
    heroSub:
      "Cole qualquer carta, formulário ou aviso — da escola, de um médico, de um tribunal, do governo ou de qualquer outro lugar. Vamos explicar em palavras simples e dizer exatamente o que fazer.",
    tryHeading: "É novo por aqui? Experimente um documento de exemplo:",
    dropMain: "Solte um PDF aqui ou toque para escolher um arquivo",
    dropSub: "Vamos extrair o texto — ou simplesmente cole abaixo.",
    uploading: "Lendo seu PDF…",
    placeholder: "Cole aqui o texto da sua carta…",
    resultIn: "Mostre o resultado em",
    submit: "Explique isto para mim",
    submitting: "Lendo seu documento…",
    footer:
      "O ClarityView explica documentos. Não oferece aconselhamento jurídico ou médico. Nenhuma informação é compartilhada sem o seu consentimento.",
    aboutLink: "Como o ClarityView mantém você no controle →",
    samples: {
      school: "Formulário de prova escolar",
      eviction: "Aviso de despejo",
      vaccine: "Registro de vacinas (espanhol)",
    },
    errShort:
      "Por favor, cole um pouco mais de texto para que possamos entender o documento.",
    errPdfBig:
      "Esse PDF é muito grande (máximo 4 MB). Tente um arquivo menor ou copie e cole o texto.",
    errPdfRead:
      "Não conseguimos ler esse PDF. Tente um arquivo menor ou cole o texto.",
    errGeneric: "Algo deu errado. Tente novamente.",
  },
  fr: {
    heroTitle: "Comprenez n'importe quel document déroutant en 15 secondes.",
    heroSub:
      "Collez n'importe quelle lettre, formulaire ou avis — de l'école, d'un médecin, d'un tribunal, du gouvernement ou d'ailleurs. Nous vous l'expliquerons en mots simples et vous dirons exactement quoi faire.",
    tryHeading: "Nouveau ici ? Essayez un document exemple :",
    dropMain: "Déposez un PDF ici, ou appuyez pour choisir un fichier",
    dropSub: "Nous extrairons le texte — ou collez-le simplement ci-dessous.",
    uploading: "Lecture de votre PDF…",
    placeholder: "Collez ici le texte de votre lettre…",
    resultIn: "Afficher le résultat en",
    submit: "Expliquez-moi ceci",
    submitting: "Lecture de votre document…",
    footer:
      "ClarityView explique les documents. Il ne donne pas de conseils juridiques ou médicaux. Aucune information n'est partagée sans votre accord.",
    aboutLink: "Comment ClarityView vous garde aux commandes →",
    samples: {
      school: "Formulaire d'examen scolaire",
      eviction: "Avis d'expulsion",
      vaccine: "Carnet de vaccination (espagnol)",
    },
    errShort:
      "Veuillez coller un peu plus de texte pour que nous puissions comprendre le document.",
    errPdfBig:
      "Ce PDF est trop volumineux (4 Mo maximum). Essayez un fichier plus petit ou copiez-collez le texte.",
    errPdfRead:
      "Nous n'avons pas pu lire ce PDF. Essayez un fichier plus petit ou collez le texte.",
    errGeneric: "Une erreur s'est produite. Veuillez réessayer.",
  },
  hi: {
    heroTitle: "किसी भी उलझाने वाले दस्तावेज़ को 15 सेकंड में समझें।",
    heroSub:
      "कोई भी पत्र, फ़ॉर्म या सूचना चिपकाएँ — स्कूल, डॉक्टर, अदालत, सरकार या कहीं से भी। हम इसे आसान शब्दों में समझाएँगे और बताएँगे कि आपको ठीक क्या करना है।",
    tryHeading: "नए हैं? एक नमूना दस्तावेज़ आज़माएँ:",
    dropMain: "यहाँ PDF छोड़ें, या फ़ाइल चुनने के लिए टैप करें",
    dropSub: "हम टेक्स्ट निकाल लेंगे — या नीचे चिपका दें।",
    uploading: "आपका PDF पढ़ा जा रहा है…",
    placeholder: "अपने पत्र का टेक्स्ट यहाँ चिपकाएँ…",
    resultIn: "परिणाम इस भाषा में दिखाएँ",
    submit: "मुझे यह समझाएँ",
    submitting: "आपका दस्तावेज़ पढ़ा जा रहा है…",
    footer:
      "ClarityView दस्तावेज़ समझाता है। यह कानूनी या चिकित्सा सलाह नहीं देता। आपकी सहमति के बिना कोई जानकारी साझा नहीं की जाती।",
    aboutLink: "ClarityView आपको कैसे नियंत्रण में रखता है →",
    samples: {
      school: "स्कूल परीक्षा फ़ॉर्म",
      eviction: "बेदखली नोटिस",
      vaccine: "टीकाकरण रिकॉर्ड (स्पेनिश)",
    },
    errShort: "कृपया थोड़ा और टेक्स्ट चिपकाएँ ताकि हम दस्तावेज़ समझ सकें।",
    errPdfBig:
      "यह PDF बहुत बड़ा है (अधिकतम 4 MB)। छोटी फ़ाइल आज़माएँ या टेक्स्ट कॉपी-पेस्ट करें।",
    errPdfRead:
      "हम यह PDF नहीं पढ़ सके। छोटी फ़ाइल आज़माएँ या टेक्स्ट चिपकाएँ।",
    errGeneric: "कुछ गलत हो गया। कृपया फिर से प्रयास करें।",
  },
};

export function getUI(code: string): UIStrings {
  return ui[code] ?? ui.en;
}

export function isRTL(code: string): boolean {
  return code === "ar";
}
