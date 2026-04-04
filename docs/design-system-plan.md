# Design System Standardization Plan

## 1. Visual Consistency Standards

### Grid Pattern
- ใช้ grid 5x5 lines สี `#1f1f1f` บนพื้นหลัง `#0a0a0a` ทุกหน้า
- Grid spacing: 100px intervals (100, 150, 200, 250, 300)
- ขนาด SVG: 600x400px

### Color Palette
```
Background: #0a0a0a
Grid lines: #1f1f1f
Card bg: #111
Card border: #262626

Primary accent: #38bdf8 (sky blue)
Secondary accent: #a855f7 (purple)
Tertiary accent: #f472b6 (pink)

Text muted: #666
Text lines: #333, #262626, #1f1f1f
```

### Typography
- Font family: monospace
- Size labels: 8-10px
- Chart labels: 8px
- Section headers: 10px

### Decorative Elements
- Dots มุม: สี accent อ่อน opacity 0.2-0.5
- Animation: blink/pulse 3-6s duration

---

## 2. Page Structure Standards

### List/Grid Pages (Projects, Labs)
```
<main class='border-b border-border min-h-screen'>
  <div class='container py-20'>
    // Header with count
    <div class='flex items-center gap-4 mb-12'>
      <h1 class='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
        // ALL ITEMS {count}
      </h1>
      <div class='h-px flex-1 bg-border/50' />
    </div>

    // Grid with borders
    <div class='grid grid-cols-1 md:grid-cols-2 border-t border-l border-border'>
      {items.map(item => (
        <div class='border-r border-b border-border'>
          <Card item={item} />
        </div>
      ))}
    </div>
  </div>
</main>
```

### Card Component
```
<div class='group flex flex-col h-full overflow-hidden'>
  // Cover image
  <div class='aspect-video relative overflow-hidden bg-secondary border-b border-border
              grayscale group-hover:grayscale-0 transition-all duration-500'>
    <Image fill class='object-cover group-hover:scale-105 transition-transform duration-700' />

    // Tags on hover
    <div class='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
      {tags.slice(0,2).map(tag => (
        <span class='font-mono text-[8px] px-1 border border-foreground/20 bg-background/80'>
          {tag}
        </span>
      ))}
    </div>
  </div>

  // Content
  <div class='space-y-3 flex-1 flex flex-col'>
    <div class='space-y-1 flex-1 p-4 m-0'>
      <Link class='inline-block'>
        <h3 class='text-sm font-bold uppercase tracking-widest group-hover:underline'>
          {title}
        </h3>
      </Link>
      <p class='text-xs text-muted-foreground leading-relaxed line-clamp-2'>
        {description}
      </p>
    </div>

    // Footer
    <div class='flex items-center justify-between pt-4 border-t border-border/50 p-4'>
      <div class='flex gap-2'>
        {tags.map(tag => (
          <span class='font-mono text-[9px] uppercase tracking-tighter text-muted-foreground'>
            #{tag}
          </span>
        ))}
      </div>
      <Link class='font-mono text-[9px] uppercase hover:underline'>
        View →
      </Link>
    </div>
  </div>
</div>
```

---

## 3. SVG Cover Image Standards

### Required Elements
1. **Grid background** - 5x5 lines สี `#1f1f1f`
2. **Main content** - visualize the concept ชัดเจน
3. **Animated elements** - ทุกอันต้องมี animation
4. **Decorative dots** - 2-3 จุด มุมซ้ายขวา

### Animation Standards
```css
/* Standard durations */
Quick pulse: 2s
Normal animation: 3-4s
Slow rotation: 6-8s

/* Easing */
cubic-bezier(ใช้ default) หรือ spline

/* Repeat */
repeatCount="indefinite"
```

### Chart Types (for data viz covers)
- **Bar Chart** - animated height/y
- **Line Chart** - animated path "d"
- **Pie/Donut** - rotate segments
- **Gauge** - animated needle
- **Scatter** - static points with pulse

### Component Types (for UI covers)
- **Card** - border animation
- **Button** - opacity pulse
- **Checkbox/Toggle** - state toggle
- **Dropdown** - expand/collapse
- **Table** - row highlighting

---

## 4. Component Code Display Standards

### Code Reading Pattern
```typescript
// Server component
import { readCodeFile } from '@/lib/read-code-file';

const code = readCodeFile('path/relative/to/src.tsx');

// ShowcaseWrapper receives files prop
<ShowcaseWrapper
  files={[
    { filename: 'demo.tsx', code, highlightedCode: code, language: 'tsx' },
    { filename: 'component.tsx', code: componentCode, highlightedCode: componentCode },
  ]}
>
  <Demo />
</ShowcaseWrapper>
```

### CodeBlock Requirements
- Multiple file tabs
- Copy button
- Syntax highlighting (Shiki)
- Dark theme

---

## 5. Migration Checklist

### Pages to Update
- [x] `/projects` - already standard ✓
- [x] `/labs` - updated ✓ (now uses Card component)
- [x] `/blogs` - consistent with list layout pattern ✓
- [x] `/hiking` - consistent with list layout pattern ✓
- [x] `/activities` - rebuilt with grid card layout ✓
- [x] `/music` - consistent with dashboard layout ✓

### SVG Covers to Verify
- [x] `echart.svg` - verified ✓ (grid 5x5, animations, decorative dots)
- [x] `react-virtual.svg` - verified ✓ (grid 5x5, animations, decorative dots)
- [x] `modern-css.svg` - verified ✓
- [x] `ui-components.svg` - verified ✓ (grid 5x5, animations, decorative dots)

### Components to Standardize
- [x] Card component - created reusable Card component in `src/components/card.tsx`
- [x] Image hover effects - standardized (grayscale hover + scale transform)
- [x] Tag styling - standardized (font-mono text-[9px] uppercase)
- [x] Button/Link styles - standardized (font-mono text-[9px] uppercase hover:underline)

---

## 6. File Organization

```
public/
  labs/
    echart.svg          # chart visualizations
    react-virtual.svg   # virtualization concept
    modern-css.svg      # CSS features
    ui-components.svg   # UI components

src/
  components/
    card.tsx            # reusable Card component for grid layouts
    custom-ui/          # reusable UI components
      data-table/
      tooltip/
      segmented-control/

  app/(home)/
    labs/
      page.tsx          # uses standard grid layout
      _components/      # lab-specific demos
    projects/
      page.tsx          # standard ✓
```

---

## 7. Quick Reference: CSS Classes

### Card Container
```
group flex flex-col h-full overflow-hidden
```

### Image Container
```
aspect-video relative overflow-hidden bg-secondary border-b border-border
grayscale group-hover:grayscale-0 transition-all duration-500
```

### Image
```
object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out
```

### Title
```
text-sm font-bold uppercase tracking-widest group-hover:underline
```

### Description
```
text-xs text-muted-foreground leading-relaxed line-clamp-2
```

### Tags
```
font-mono text-[9px] uppercase tracking-tighter text-muted-foreground
```

### Grid Container
```
grid grid-cols-1 md:grid-cols-2 border-t border-l border-border
```

### Grid Item
```
border-r border-b border-border
```

---

## 8. Animation Timing Reference

| Element | Duration | Effect |
|---------|----------|--------|
| Grayscale | 500ms | hover state |
| Scale image | 700ms | hover zoom |
| Tags fade | 300ms | opacity 0→1 |
| Bar grow | 4-8s | height animation |
| Line morph | 4-8s | path d attribute |
| Pie rotate | 6s | transform rotate |
| Needle move | 3s | rotate |
| Dots pulse | 3-6s | opacity |
