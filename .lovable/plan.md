

# Plan: Fix Product Image Cropping and Button Overflow Issues

## Problem Summary
Product images are being cropped on both the Shop page (ProductCard) and the Product Detail page. The current implementation uses fixed aspect ratios with `object-cover` which crops images that don't match the expected 3:4 ratio. This is especially problematic for:
- Full-length garment photos that are taller
- User-uploaded images with varying aspect ratios

## Solution Overview
Change from fixed aspect ratios to flexible, auto-sizing containers that show the complete image without cropping, while maintaining a consistent, clean layout.

---

## Technical Changes

### 1. ProductCard.tsx - Fix Shop Grid Image Cropping

**Current Issue:** `aspect-[3/4]` with `object-cover` crops images

**Changes:**
- Replace fixed aspect ratio with `min-h-[280px] max-h-[400px]` for flexible height
- Change `object-cover` to `object-contain` to show full image
- Add background color to fill any empty space around the image
- Keep the card layout consistent with `h-full` on the container

```text
Before:
  <div className="relative aspect-[3/4] overflow-hidden">
    <img className="w-full h-full object-cover ..." />

After:
  <div className="relative min-h-[280px] max-h-[400px] overflow-hidden bg-muted/50 flex items-center justify-center">
    <img className="w-full h-full object-contain ..." />
```

### 2. ProductDetail.tsx - Fix Main Product Image Cropping

**Current Issue:** `aspect-[3/4]` with mixed `object-contain`/`object-cover` causes inconsistency

**Changes:**
- Remove the fixed `aspect-[3/4]` ratio
- Use `min-h-[400px] max-h-[600px]` on mobile, `lg:max-h-[700px]` on desktop
- Always use `object-contain` to ensure full image visibility
- Add centered flex container with background for better presentation
- Ensure navigation arrows stay properly positioned

```text
Before:
  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
    <img className="w-full h-full object-contain md:object-cover" />

After:
  <div className="relative min-h-[400px] max-h-[600px] lg:max-h-[700px] rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
    <img className="max-w-full max-h-full object-contain" />
```

### 3. Thumbnail Strip - Ensure Consistent Display

**Changes:**
- Keep thumbnails with fixed dimensions for consistent navigation
- Use `object-contain` with background to prevent thumbnail cropping

```text
Before:
  <img className="w-full h-full object-cover" />

After:
  <img className="w-full h-full object-contain bg-muted/30" />
```

### 4. Mobile Layout Fixes

**Current Issue:** Action buttons may overflow on small screens

**Changes in ProductDetail.tsx:**
- Add `overflow-x-hidden` to the main action buttons container
- Ensure buttons properly stack with `flex-wrap` on very small screens
- Add `min-w-0` to prevent flex items from overflowing
- Ensure proper padding so buttons don't touch screen edges

```text
Add to action buttons section:
  className="flex flex-col sm:flex-row gap-3 w-full min-w-0"
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/ProductCard.tsx` | Update image container to use flexible height with `object-contain` |
| `src/pages/ProductDetail.tsx` | Update main image gallery to show full images without cropping |

---

## Visual Result

**Before:**
- Images cropped to 3:4 aspect ratio
- Full-length garments cut off at bottom
- Inconsistent image display across products

**After:**
- Full images visible without cropping
- Flexible height adapts to image dimensions
- Consistent background fills empty space
- Buttons remain within frame on all screen sizes

---

## Notes

- Using `object-contain` may show background on images with different aspect ratios, but this is preferable to cropping important product details
- The muted background color ensures a clean, professional look even when images don't fill the entire container
- All new products uploaded via admin will also benefit from these fixes automatically

