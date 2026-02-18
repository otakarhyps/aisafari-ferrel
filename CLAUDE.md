# AI Safari Ferrel Website

## Project Overview

A static website archiving coaching session content for the **AI Safari Ferrel** program by We Are Animals. Each session page is built from a raw coaching transcript.

- **Tech**: Static HTML/CSS/JS — no frameworks, no build step
- **Hosting**: GitHub Pages with custom domain
- **Domain**: `aisafari-ferrel.weareanimals.ai`
- **Privacy**: All pages have `noindex, nofollow` meta tags — this site is for participants only, not the general public
- **Brand**: All visual styling follows the WAA design system (`waa-26-design-system-comprehensive.json`)

## File Structure

```
/
  CLAUDE.md              ← You are here (project memory)
  CNAME                  ← GitHub Pages custom domain
  index.html             ← Homepage with session card listing
  styles.css             ← Single stylesheet with brand design tokens
  lightbox.js            ← Image lightbox + homework checkbox localStorage persistence
  assets/
    logo.svg             ← Brand logo (dark, for light backgrounds)
    logo-inverse.svg     ← Brand logo (white, for dark backgrounds — footer)
  sessions/
    _template.html       ← Master template with placeholders and inline docs
    2026-02-05-session-1.html
    2026-02-11-session-2.html
    ...
  images/
    session-1/           ← Per-session image directories
    session-2/
    ...
```

## Creating a New Session Page

When the user provides a coaching transcript, follow these steps:

### Step 1 — Create the session file

Copy `sessions/_template.html` to `sessions/YYYY-MM-DD-session-N.html`.

- **File naming**: ISO date prefix (`YYYY-MM-DD`) + `-session-N` where N is the session number
- The date in the filename should match the session date

### Step 2 — Extract and map content from transcript

Fill in each section from the transcript. The template has inline HTML comments showing the exact markup for each section.

| Section | What to extract | Guidelines |
|---------|----------------|------------|
| **Title** | Short session title | 2-5 words, descriptive (e.g., "Prompting Fundamentals") — not the verbose transcript title |
| **Tag** | Session number + date | Format: `Session N • Month DD, YYYY` |
| **Lead** | 1-2 sentence summary | What was this session about? Write a compelling subtitle |
| **Key Takeaways** | 4-5 actionable bullets | The most important things a participant should remember |
| **What We Covered** | Multiple `<h3>` subsections | Each topic gets its own heading with `<ul>` lists, `<p>` paragraphs, and optional `<blockquote>` for memorable quotes. Include 1-2 blockquotes per session |
| **Use Cases** | Participant name + description | Each item: name (bold) + ~3 word description (e.g., "Katie — Custody calendar visualization") |
| **Questions Asked** | Q&A accordion items | Condense verbose spoken questions into clear written form. Answers: 2-3 concise sentences distilling the coach's response |
| **Homework** | Checkbox items | Exactly what was assigned — use `<input type="checkbox">` + `<span>` markup |
| **Resources** | Link list | Always include standard resources (see below) + any session-specific links |

### Step 3 — Update the homepage

Add a new session card to `index.html` before the `<!-- More session cards added here as sessions occur -->` comment:

```html
<a href="sessions/YYYY-MM-DD-session-N.html" class="session-card">
  <div class="session-card__number">N</div>
  <div class="session-card__content">
    <div class="session-card__title">Session Title</div>
    <div class="session-card__meta">Month DD, YYYY</div>
  </div>
  <span class="session-card__arrow">&rarr;</span>
</a>
```

### Step 4 — Create image directory

```bash
mkdir -p images/session-N
touch images/session-N/.gitkeep
```

## Editorial Rules

- **Facilitator name**: Always use **Otakar** (never "Otis" — use the professional name)
- **HTML entities**: Use `&mdash;` (em dash), `&ndash;` (en dash), `&amp;` — never raw characters
- **Questions cleanup**: Transcript questions are often verbose spoken language. Condense into clear, scannable written questions while preserving the original intent
- **Answer writing**: Distill the coach's response into 2-3 clear sentences. Focus on the actionable insight, not the conversational back-and-forth
- **Use Case descriptions**: Keep to ~3 words (e.g., "Finance & HR workflows", "Marketing knowledge base")
- **Blockquotes**: Include 1-2 per session in "What We Covered" for memorable quotes from the coach
- **Empty sections**: If a section has no content, show: `<p class="questions-empty">No [items] recorded for this session.</p>` and comment out the list markup with an example for reference

## Resources

**Every resource must be relevant to the specific session.** There are no "always include" resources. Curate the entire list based on what was actually discussed in the transcript or explicitly provided by the user.

Sources for resources:
- Tools, platforms, or articles mentioned during the session
- Links the user explicitly asks to include
- Resources directly relevant to the session topic

### Known resources (use only when relevant)

```html
<li><a href="https://sooper.app/ai-safari" target="_blank" rel="noopener">AI Safari Community &mdash; Join for ongoing discussions and support</a></li>
<li><a href="https://www.anthropic.com/learn/claude-for-you" target="_blank" rel="noopener">AI Fluency Framework &mdash; Anthropic's guide to effective AI interaction</a></li>
<li><a href="https://promptbase.com/" target="_blank" rel="noopener">PromptBase &mdash; Prompt marketplace and library</a></li>
<li><a href="https://prompts-market.com/" target="_blank" rel="noopener">Prompts Market &mdash; Community-curated prompt collection</a></li>
```

All resource links must have `target="_blank" rel="noopener"`.

## Section Background Pattern

The background alternation is set in CSS — no extra classes needed in HTML:

1. Session Hero — white
2. Key Takeaways — lilac (`#f4f3ff`)
3. What We Covered — white
4. Use Cases — lilac
5. Questions Asked — white (accordion items have lilac bg)
6. Homework — lilac (checkbox items have white bg)
7. Resources — dark charcoal (`#2D2725`, white text)
8. AI Safari CTA — lilac (green banner inside)
9. Footer — dark (`#0a0a0f`)

## Static Sections (identical across all session pages)

These sections never change between sessions — they're copied directly from the template:
- **Header**: Logo + "All Sessions" back link
- **AI Safari CTA Banner**: "Free Community" label, "AI Safari" title, "Join now" button → `https://sooper.app/ai-safari`
- **Footer**: Inverse logo + weareanimals.ai link + copyright with Claude Opus 4.6 credit
- **Meta tags**: `noindex, nofollow` in `<head>` of every page

## Interactive Features

- **Homework checkboxes**: Persisted via `localStorage` with key `homework:` + page pathname. Each session page has its own independent checkbox state. The JS is in `lightbox.js`
- **Image lightbox**: Click any `<figure class="lightbox-trigger">` image to open full-screen modal. Close with click, X button, or Escape key
- **Q&A accordions**: Native `<details>`/`<summary>` elements — zero JS needed. Chevron rotates on open via CSS

## Git Workflow

- Commit messages: Descriptive, summarize what was added
- Always include: `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
- Push to `origin main` — GitHub Pages deploys automatically (~60s)
- Never commit `.claude/` directory (it's in `.gitignore`)
