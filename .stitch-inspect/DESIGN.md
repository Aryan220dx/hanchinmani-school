---
name: Cinematic Academic Editorial
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3f484c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6f787d'
  outline-variant: '#bec8cd'
  surface-tint: '#006781'
  primary: '#005a71'
  on-primary: '#ffffff'
  primary-container: '#0e7490'
  on-primary-container: '#d3f1ff'
  inverse-primary: '#81d1f0'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#6718d8'
  on-tertiary: '#ffffff'
  tertiary-container: '#803ff1'
  on-tertiary-container: '#f2e8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b9eaff'
  primary-fixed-dim: '#81d1f0'
  on-primary-fixed: '#001f29'
  on-primary-fixed-variant: '#004d62'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  deep-teal: '#0E7490'
  warm-amber: '#D97706'
  violet-accent: '#7C3AED'
  surface-ice: '#F8FAFC'
  text-main: '#0F172A'
  text-muted: '#475569'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  max-width: 1280px
---

## Brand & Style

This design system is built on the philosophy of "Educational Luxury." It moves away from traditional, cluttered academic interfaces toward a cinematic, editorial experience reminiscent of high-end lifestyle journals and Apple’s educational storytelling. The brand personality is **aspirational, trustworthy, and modern**, positioning the institution as a leader in forward-thinking pedagogy.

The visual style is **Modern Corporate with Glassmorphism**. It utilizes expansive white space, high-quality photography, and layered depth to create a sense of calm and focus. Subtle motion and translucent surfaces invite exploration, while the rigid grid system maintains an air of institutional authority.

## Colors

The palette is anchored by **Deep Educational Teal**, symbolizing wisdom and stability. This is balanced by **Warm Amber**, used sparingly for high-priority calls to action and to evoke a sense of optimism and achievement. 

**Soft Backgrounds** (Surface Ice) provide a clean, non-distracting canvas, while **Subtle Violet Accents** are used for specialized academic categories or highlighting student excellence. The contrast is kept high between text and background to ensure accessibility, while secondary surfaces use very low-saturation tints of the primary teal to maintain a cohesive environment.

## Typography

The typographic scale creates a rhythmic, editorial hierarchy. **Playfair Display** is reserved for headlines and "hero" moments, lending a timeless, academic prestige to the interface. **Inter** handles all functional and body text, ensuring maximum legibility across digital devices.

For large display text, negative letter spacing is applied to create a tighter, more professional "magazine" look. Labels and secondary navigation items use slightly increased letter spacing and semi-bold weights in uppercase to distinguish them from prose.

## Layout & Spacing

This design system utilizes a **12-column fixed grid** for desktop and a **4-column fluid grid** for mobile. The layout philosophy emphasizes "the breathing room"—generous vertical margins (80px to 120px) between major sections to prevent information fatigue.

Content blocks should align to the grid but vary in width (e.g., a 10-column centered text block for readability, or a 6/6 split for imagery and copy). Horizontal spacing uses a strict 8px base unit. Side margins on desktop are expansive to maintain an "Apple-style" center-focus narrative.

## Elevation & Depth

Depth is conveyed through **Glassmorphism and Ambient Shadows**. 

1.  **Background Layers:** Use the neutral `#F8FAFC` as the base.
2.  **Surface Layers:** Elevated cards use a semi-transparent white (80% opacity) with a `20px` backdrop blur. 
3.  **Shadows:** Use highly diffused, low-opacity shadows (Blur: 40px, Spread: -10px, Color: `rgba(14, 116, 144, 0.08)`) to give the impression that elements are floating naturally over the background. 

Avoid harsh borders. Instead, use a 1px inner stroke (white) on glass elements to simulate a light-catching edge.

## Shapes

The shape language is sophisticated and approachable. All primary UI containers (cards, modals, image containers) utilize a **1.0rem (16px) corner radius**. 

Interactive elements like buttons use a slightly more pronounced roundedness to feel tactile, while small utility elements like chips or badges may use a full pill-shape to distinguish them from structural components. This consistent "softness" balances the formal serif typography.

## Components

### Buttons
Primary buttons use the Deep Teal background with white text, featuring a subtle gradient from top to bottom. Secondary buttons use a glass background with a teal border. All buttons should have a `0.3s` transition on hover, slightly increasing the shadow depth and scaling the element by 1.02x.

### Cards
Cards are the primary storytelling vehicle. They should feature large, high-resolution imagery with a "glass" overlay at the bottom for titles. Cards should not have visible borders; instead, they rely on the ambient shadow and backdrop blur for definition.

### Input Fields
Inputs are styled with a soft background (`#F1F5F9`) and a 1px border that transitions to the primary teal on focus. Labels should sit above the field in the `label-lg` style.

### Navigation
The main navigation bar is a "floating" glass element anchored to the top of the viewport. It uses high backdrop blur (30px) to ensure text remains legible as the user scrolls over varied content.

### Chips & Badges
Use these for grade levels or subject categories. They should use the `secondary` (amber) or `tertiary` (violet) colors with 10% opacity backgrounds and 100% opacity text for a refined, modern look.