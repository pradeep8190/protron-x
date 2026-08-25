# Protron X — Agent Directives & Design System Rules

## 1. Aesthetic Philosophy: Minimalist Luxury (Apple / Linear / Vercel Grade)

### ⛔ WHAT TO STRICTLY AVOID:
1. **NO Cheap Neon Colors**: No loud pinks, toxic greens, oversaturated neon blues, or generic rainbow accents.
2. **NO Cheap Purple/Gaudy Glows**: Avoid cartoonish radial purple halos or harsh color bleeding.
3. **NO Fluffy / Cluttered UI**: Eliminate unnecessary decorations, excessive text fluff, or gimmicky animations.
4. **NO Harsh Solid Border Boxes**: Never use rigid, thick, solid border lines around cards and containers. Borders must use subtle low-opacity gradients (`rgba(255, 255, 255, 0.08)` to `0.18`) that dissolve naturally into darkness.
5. **NO Unwanted Hover Lag / Flash**: Hover interactions must be buttery smooth, instant, and tactile (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

### ✨ WHAT WE WANT & MUST IMPLEMENT:
1. **Ultra-Premium Monochrome Palette**:
   - Backgrounds: Pure deep pitch black (`#000000`, `#050508`).
   - Surfaces: Obsidian glass (`rgba(10, 10, 14, 0.85)` to `#0a0a0c`).
   - Text Shades: Pure white (`#ffffff`), luminous silver (`#f4f4f5`), soft zinc (`#a1a1aa`), muted slate (`#71717a`).
   - Intentional Color: Only where strictly necessary for functional state or telemetry (subtle, desaturated, high-end).
2. **Atmospheric Lighting & Depth**:
   - Soft, high-dynamic-range top-center ambient white spotlights and light shafts.
   - Ultra-fine procedural film grain noise (`0.038` opacity) to break color banding.
   - Faint, non-intrusive hairline grid meshes with radial alpha masks.
   - Laser hairline circuit lines and micro-spark nodes.
3. **Tactile Micro-Interactions**:
   - Smooth 3D tilt, subtle scale lifts (`translateY(-4px)`), and specular rim reflections on hover.
   - Clear `cursor: pointer` on all clickable/interactive triggers.
   - Snappy copy feedback and interactive tabs.
4. **Typography Standards**:
   - Brand Name: `Comfortaa` with `font-weight: 400`.
   - Primary Body & Headings: `Inter` with tailored letter-spacing (`-0.02em` to `-0.03em`).
   - Code & Monospace: `JetBrains Mono` with high readability.

---

## 2. Engineering Architecture Rules

1. **Modular Multi-File Structure**:
   - Never put everything in a single file.
   - Every major section belongs in its dedicated folder (e.g. `src/components/home/`, `src/components/navbar/`, `src/components/bento/`, etc.).
   - Separate `.tsx` markup/logic and `.css` stylesheets for maximum maintainability.
   - Use clean `index.ts` barrel exports.
2. **Direct Execution**:
   - Do not stop to generate repeated plan/walkthrough markdown files during development unless explicitly requested. Write and iterate on code directly.
