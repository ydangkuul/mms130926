# VietPay Design System

## Context

VietPay is a payments product (card-based payments, transfers, rewards). This design system is derived from two source artifacts provided by the team:

- `final/VietPay-Styleguide-Blue.html` — the approved brand Style Guide (logo, primary/secondary colors, type scale, buttons, spacing, modals, photography direction). This is the **source of truth**.
- `final/VietPayDesignSystem-Blue.html` — a fuller "Design System" extension built on top of the Style Guide (design principles, full component set, tokens in three formats, accessibility, responsive behavior, UX writing, governance). Values here that go beyond the Style Guide are marked "extends the guide" in that document and in this readme, and should get brand sign-off before shipping.

No Figma file or codebase repo was attached — both sources are static HTML exports. All colors, type sizes, spacing and copy in this system are copied verbatim from those two files; nothing was invented except where explicitly flagged below.

## Brand personality

**Dynamic · Fulfillment · Customer Satisfaction** — energetic and always moving forward; complete and reliable, delivering on every commitment; customer satisfaction at the center of everything.

## Index

- `styles.css` — root stylesheet, `@import`s everything below. Link this one file.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius-shadow.css`, `motion-breakpoints.css`, `fonts.css` (real Be Vietnam Pro + JetBrains Mono webfont files under `assets/fonts/`).
- `components/` — reusable React primitives, grouped:
  - `forms/` — Button, Input, Textarea, Select, Checkbox, Radio, Switch
  - `feedback/` — Alert, Badge, Tooltip, Spinner, Skeleton
  - `navigation/` — Tabs, TopNav, BottomNav, Pagination
  - `surfaces/` — Card, Modal, Table, EmptyState
- `ui_kits/vietpay-app/` — click-through recreation of the VietPay product (login, home, transfer, cards, history, settings) built from the components above.
- `guidelines/` — foundation specimen cards feeding the Design System tab (Colors, Type, Spacing, Brand groups).
- `assets/logo/` — real VietPay logo (color + white), extracted from the brand's own file. `assets/photography/` — reference photography from the brand kit. `assets/fonts/` — real webfont binaries.
- `SKILL.md` — portable skill wrapper for use outside this environment.

## Content fundamentals

**Voice**: confident yet friendly, concise, clear, action-oriented, focused on customer outcomes. Write for a person completing a task, not for the system's structure.

**Do / Don't, by element** (from the Design System doc):
- Buttons — do: verb + object, "Send money", "Add card". Don't: "Submit", "OK", "Click here".
- Labels — do: short noun, "Card number". Don't: sentences or ALL CAPS questions.
- Helper text — do: one line, what to enter or why. Don't: repeat the label or add jargon.
- Validation — do: "Enter a 16-digit card number". Don't: "Invalid input", raw error codes.
- Errors — do: cause + fix, calm tone. Don't: blame the user or say "oops!".
- Empty states — do: what's missing + one action. Don't: just "No data".
- Confirmation — do: "Payment sent to An · ₫250k". Don't: "Success!" with no detail.

**Casing**: sentence case everywhere (titles, buttons, nav labels) except eyebrow/section labels ("BRAND STYLE GUIDE", "01", "CARD DETAILS") which are uppercase with wide letter-spacing (+0.5–2px) as a deliberate structural accent, not a voice choice.

**Person**: second person ("Your accounts, together") for product copy; imperative for actions ("Send money", "Add card").

**Emoji**: not used. The brand uses a small set of plain glyphs instead — see Iconography below.

**Vibe**: calm competence. Confident without being loud; blue is used for emphasis sparingly (one primary action per view) so when it appears, it means something.

## Visual foundations

**Color**: Primary Blue `#0073BF` is the signal color — reserved for the one primary action per view, active/selected state, links, key icons. Deep Blue `#0D3C7D` is its hover/pressed state and doubles as the semantic error color (text/icon/border on a Light Blue `#BFE0F5` surface — the surface only tints, meaning comes from the deep-blue text+icon+border). Near Black `#1C1D1B` is the default ink for text and the wordmark; Charcoal `#373A36` is body text; Gray `#696B68` is muted/secondary labels. Gold `#D7A44C` is a secondary accent for small premium highlights only (VIP badges, rewards CTA) — never a primary action, never white text on it (fails contrast), kept under ~10% of any surface. Lime Green `#73BF26` and Light Blue tint `#EAF6FD` round out the secondary/decoration palette. Success/Warning/Info semantic colors are **not** defined by the brand guide — the values in `tokens/colors.css` are palette-harmonised proposals flagged "extends the guide" pending brand approval.

**Type**: single family, Be Vietnam Pro (400/500/600/700), fallback `system-ui, sans-serif`. Chosen for clean humanist geometry, full Vietnamese diacritic support, and a look close to PruSans (a trustworthy, credential-feeling typeface) without a license. H1 48/700, H2 30/700, H3 18/600, H4 14/600, Paragraph 20/400 (intro/descriptive copy), Body 16/400 (default page text), Caption/label 14/500. H5/H6 are intentionally undefined. Headings tighten letter-spacing −0.4px; eyebrow/caption labels use +0.5–2px uppercase.

**Spacing**: strict 4px base grid — xs 4, sm 8, md 16, lg 24, xl 32, 2xl 48, 3xl 64, 4xl 96. Card inner padding 24px, compact UI 16px, buttons 12×28 (vertical×horizontal). Section gaps 48px, block gaps 24px, related items 16px. Page margin 48px desktop → 16px mobile.

**Backgrounds**: flat white or `#F5F5F4` raised surface — no gradients, no textures, no patterns. The only gradient in the whole system is a very subtle white→light-blue wash behind the Style Guide/Design System cover header. Photography is full-bleed in cards/containers, never as a page background behind text.

**Imagery**: hi-res, real people, genuine "fulfillment / satisfaction" moments (see `assets/photography/`). Color tone matches the palette — cool blues, charcoal, neutral grays; apply a subtle blue or charcoal grade to any photo brought in. Prefer photos over video; footage only when truly necessary, minimum 1080p, steady, well-graded. Never low-res, blurry, heavily compressed, or clashing in color cast.

**Animation**: fast and purposeful, never decorative. Durations: fast 120ms (hover/toggle), base 200ms (most UI), slow 320ms (modal/page). Easing `cubic-bezier(.2,0,0,1)`. Every action confirms within 100ms (state change, spinner, or toast). `prefers-reduced-motion` is always honored.

**Hover states**: primary button darkens to Deep Blue `#0D3C7D`; secondary/outline button fills with Light Blue `#BFE0F5` surface; ghost/text link text darkens to Deep Blue. General rule: color shift + `shadow-md`, cursor pointer.

**Press/active states**: Deep Blue fill, subtle scale 0.98.

**Disabled**: opacity 0.45, cursor not-allowed — never a separate gray palette.

**Focus**: persistent 3px `#BFE0F5` ring on every interactive element — never removed.

**Borders**: default 1px `#DFDFDF`; subtle dividers 1px `#EDEDED`. Interactive/emphasis borders (outline buttons, section accents) step up to 1.5–4px. Section accent = 4px top or left border in blue (or gold for the premium section) — this is the system's only "colored left border" pattern, and it is reserved for section/callout accents, not applied to ordinary cards.

**Shadows**: flat by default. `shadow-sm` (0 1px 2px, 6% black) for resting cards/subtle lift; `shadow-md` (0 4px 12px, 10% black) for dropdowns/popovers/hover; `shadow-modal` (0 20px 48px, 28% black) exclusively for modals/dialogs over a 50% black scrim. No inner shadows, no glassmorphism, no backdrop blur anywhere in the source material.

**Corner radius**: sm 4px (chips/inner), md 6px (cards), lg 8px (buttons, inputs, modals), pill 999px (badges, switch track).

**Cards**: 1px `#DFDFDF` border, 6px radius, no shadow at rest (shadow only appears on hover/elevated variants), 24px inner padding.

**Transparency/blur**: only the modal scrim, `rgba(0,0,0,.5)`, flat (no blur). No frosted-glass surfaces anywhere in the source.

**Layout**: 12-column fluid grid, 24px gutter, 1200px max container. Breakpoints sm 640 / md 768 / lg 1024 / xl 1280. Mobile: single column, bottom tab bar nav, full-width stacked CTAs, full-screen modal sheets. Desktop: top bar (+ optional rail), inline CTAs with hover states, centered 460px modals.

## Iconography

The brand does not ship a custom icon font, sprite sheet, or SVG icon set. The two source files establish one real convention: **simple Unicode glyphs used directly as icons** — `⚠` (warning/alert), `✓` (success/check), `✕` (error/close), `▾` (select caret), `✦` (empty-state mark) — always paired with the semantic color and short text, never as the sole carrier of meaning. This is what `components/feedback/Alert.jsx` and the Select caret use, and it is the pattern to keep for simple inline marks.

For anything beyond that (navigation glyphs, functional action icons in the app UI kit), the Design System document specifies a spec but ships no actual icons: *"line style, 1.5–2px stroke, 24px grid, rounded joins; key icons blue, default charcoal."* **⚠ Substitution, flagged for approval**: this system uses [Lucide](https://lucide.dev) via CDN in the UI kit, as its default 2px stroke on a 24px grid is the closest open, license-free match to that spec. If VietPay has (or commissions) a real icon set, replace the Lucide references in `ui_kits/vietpay-app/` and drop the files into `assets/icons/`.

No emoji are used anywhere in the source material.

## Intentional additions

- **Icon substitution** — see Iconography above.
- **Success / Warning / Info semantic colors** — the guide only defines Error. Proposed values are palette-harmonised and marked "extends the guide" throughout `tokens/colors.css`, component prompts, and the Colors specimen cards.
- **Skeleton, Spinner, EmptyState, Pagination, Tooltip, Table components** — the guide shows these live in the Design System doc's Components section; they're promoted to standalone reusable components here since nothing in the source contradicts that.
- **Responsive breakpoint values (640/768/1024/1280) and the 12-col grid** — explicitly flagged "extends the guide" in the source Design System document itself; carried through unchanged.

## Caveats

- No Figma file or product codebase was attached — everything above is sourced from two static HTML exports. If a Figma library or app repo exists, re-run this system against it to tighten component fidelity.
- Icons are a CDN substitution (Lucide), not a real VietPay icon set — flagged above.
- Success/Warning/Info colors are proposals pending brand sign-off, not approved brand colors.
