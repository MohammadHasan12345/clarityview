import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Latest stable free-tier Flash model. Swap to a newer one here if desired.
const MODEL = 'gemini-2.5-flash';

export interface AnalysisResult {
  doc_type: 'school' | 'legal' | 'medical' | 'government' | 'financial' | 'other';
  urgency: 'urgent' | 'normal' | 'informational';
  summary: string;
  what_this_means: string;
  checklist: { step: string; deadline: string | null; priority: 'high' | 'medium' | 'low' }[];
  key_dates: { date: string; event: string }[];
  human_review_note: string;
  detected_language: string;
}

const SYSTEM_PROMPT = `You are ClarityView, an assistant for working-class and immigrant parents who receive confusing documents about their children (school, medical, legal, government, or financial).

Your job: translate the document into plain, calm, 6th-grade English and extract action items.

Rules:
- Use 6th-grade reading level. Short sentences. Common words.
- Never give legal or medical advice. Describe and flag.
- Mark urgency 'urgent' ONLY if there is a deadline within 14 days OR if missing the deadline has serious consequences (eviction, missed surgery, lost benefits).
- If a deadline is within 7 days, that checklist item is priority "high".
- If the document is in another language, still respond in English by default.
- If you are uncertain about a fact (e.g., a date is ambiguous), say so in the summary. Do not guess.
- "summary": 2-3 sentences explaining what this document is and why it was sent.
- "what_this_means": ONE sentence — the single most important thing the parent needs to know.
- "human_review_note": If this involves legal rights, medical decisions, or money, name what a human (parent, lawyer, doctor, counselor) must still decide. If it's purely informational, write 'No critical decisions — this is for your records.'
- "detected_language": ISO 639-1 code of the original document.
- Dates must be in YYYY-MM-DD format. Use null for a checklist deadline when there is none.`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    doc_type: {
      type: Type.STRING,
      enum: ['school', 'legal', 'medical', 'government', 'financial', 'other'],
    },
    urgency: {
      type: Type.STRING,
      enum: ['urgent', 'normal', 'informational'],
    },
    summary: { type: Type.STRING },
    what_this_means: { type: Type.STRING },
    checklist: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.STRING },
          deadline: { type: Type.STRING, nullable: true },
          priority: { type: Type.STRING, enum: ['high', 'medium', 'low'] },
        },
        required: ['step', 'deadline', 'priority'],
      },
    },
    key_dates: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING },
          event: { type: Type.STRING },
        },
        required: ['date', 'event'],
      },
    },
    human_review_note: { type: Type.STRING },
    detected_language: { type: Type.STRING },
  },
  required: [
    'doc_type',
    'urgency',
    'summary',
    'what_this_means',
    'checklist',
    'key_dates',
    'human_review_note',
    'detected_language',
  ],
};

export async function analyzeDocument(
  text: string,
  targetLanguage: string = 'en'
): Promise<AnalysisResult> {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const dateContext = `Today's date is ${today}. Use it to judge urgency and deadlines.`;

  const userPrompt =
    targetLanguage === 'en'
      ? `${dateContext}\n\nAnalyze this document:\n\n---\n${text}\n---`
      : `${dateContext}\n\nAnalyze this document and respond in ${targetLanguage} (translate all string values including summary, checklist steps, and human_review_note). Keep the date formats as YYYY-MM-DD.\n\n---\n${text}\n---`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: userPrompt,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: 'application/json',
      responseSchema,
      temperature: 0.2,
    },
  });

  const raw = response.text;
  if (!raw) throw new Error('Gemini returned an empty response');

  return JSON.parse(raw) as AnalysisResult;
}
