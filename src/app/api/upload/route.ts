import { NextRequest, NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Please upload a PDF file." },
        { status: 400 }
      );
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "That file is too big (10MB max)." },
        { status: 400 }
      );
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    const pdf = await getDocumentProxy(buffer);
    const { text: extracted } = await extractText(pdf, { mergePages: true });
    const text = (extracted || "").trim();
    if (text.length < 30) {
      return NextResponse.json(
        {
          error:
            "We couldn't read enough text from this PDF. It may be a scanned image — try pasting the text instead.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ text });
  } catch (err: unknown) {
    console.error("[upload]", err);
    return NextResponse.json(
      { error: "We couldn't read this PDF. Try pasting the text instead." },
      { status: 500 }
    );
  }
}
