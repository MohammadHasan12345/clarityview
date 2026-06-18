# CLAUDE.md — Working agreements for Claude Code on ClarityView

Drop this file in the root of your repo. Claude Code reads it automatically and follows these rules every session.

## Project
ClarityView — AI web app that translates confusing documents into plain English + actionable checklists for working-class and immigrant parents. Built for the USAII Global AI Hackathon 2026 (High School track, submission due **June 21, 2026**).

## The user we're building for
First-generation immigrant parents who work hourly jobs and receive English-only school, medical, government, and legal documents about their children. NOT "everyone." NOT "people." This specific user.

## Tech stack — do not change without asking
- Next.js 14 (App Router, TypeScript, src/ directory)
- Tailwind CSS v4
- Supabase (Postgres + Storage)
- Google Gemini API (`@google/genai`, latest Gemini Flash model) — switched from Anthropic Claude to use the free tier for the hackathon
- Vercel deployment via GitHub
- pdf-parse for PDF text extraction

## Hard rules

1. **Follow `CLAUDE_CODE_BUILD_PLAN.md` phase by phase.** Don't skip ahead. Confirm each phase's acceptance criteria before moving on.
2. **Always commit and push after each phase** so Vercel rebuilds and we have a live URL to test.
3. **Never put secrets in client-side code.** `ANTHROPIC_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` only in server routes.
4. **The Human-in-the-Loop banner is a feature, not a footnote.** It must be on every results page, visible without scrolling on a phone.
5. **Test on real-sized documents.** Don't ship a feature you only tested on a 2-sentence string. Use the synthetic test docs.
6. **Mobile-first.** Most parents will use this on a phone. Test every screen at 375px width.
7. **No real personal data.** Synthetic examples only.
8. **Plain English everywhere in the UI.** No jargon. 6th-grade reading level applies to buttons, errors, headers — not just AI output.

## When you're stuck
- If a Claude API response is malformed JSON: log the raw response, fix the system prompt, don't add brittle regex parsers.
- If Supabase write fails: check RLS is disabled on the documents table (we left it off for the hackathon).
- If Vercel build fails: usually a missing env var or a TypeScript error from a `process.env.X!` that's undefined.

## When you're behind schedule
Cut features in this exact order:
1. First cut: PDF upload (Phase 4). Text-only is fine.
2. Then cut: multi-language. Ship English only.
3. Then cut: the "About" page (move content to a footer paragraph).
4. NEVER cut: the Human-in-the-Loop banner, the urgency badge, or the checklist.

## Style of code I prefer
- Server components by default, `'use client'` only when needed.
- One component per file. Filename matches default export name.
- Tailwind classes inline, no `@apply`.
- Async/await over `.then`.
- Throw errors with messages; catch and log at the API route boundary.
- No premature abstraction. Two callsites = inline. Three = extract.

## How to talk to me
- Give me a TL;DR before details.
- If a decision changes the user experience (color, copy, layout), show me a screenshot or describe it before pushing.
- If you hit a question I can answer in one word, ask. Don't guess.
