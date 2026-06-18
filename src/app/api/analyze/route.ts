import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocument } from '@/lib/gemini';
import { supabaseAdmin } from '@/lib/supabase';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { text, sessionId, targetLanguage = 'en' } = await req.json();

    if (!text || text.length < 30) {
      return NextResponse.json({ error: 'Document text too short' }, { status: 400 });
    }
    if (text.length > 50000) {
      return NextResponse.json({ error: 'Document too long (max 50k chars)' }, { status: 400 });
    }

    const result = await analyzeDocument(text, targetLanguage);

    const { data, error } = await supabaseAdmin
      .from('documents')
      .insert({
        session_id: sessionId,
        raw_text: text,
        doc_type: result.doc_type,
        urgency: result.urgency,
        summary: result.summary,
        what_this_means: result.what_this_means,
        checklist: result.checklist,
        key_dates: result.key_dates,
        human_review_note: result.human_review_note,
        language: targetLanguage,
        original_language: result.detected_language,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ id: data.id, result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Analysis failed';
    console.error('[analyze]', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
