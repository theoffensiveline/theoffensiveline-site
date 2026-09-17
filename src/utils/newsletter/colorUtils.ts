/** Red (#bc293d) for worst values */
const RED = { r: 0xbc, g: 0x29, b: 0x3d };
/** White midpoint */
const WHITE = { r: 0xff, g: 0xff, b: 0xff };
/** Green (#227740) for best values */
const GREEN = { r: 0x22, g: 0x77, b: 0x40 };

/**
 * Red → white → green two-segment gradient, white at the midpoint of
 * [min, max]. Leaf module: imported by both compute utilities and table
 * components, so it must not pull in the API/component graph.
 */
export function interpolateColor(value: number, min: number, max: number): string {
  if (max === min) return "#f3f7f3"; // neutral when all values equal
  const ratio = (value - min) / (max - min);

  // Two-segment gradient: red → white → green (white at midpoint)
  let from, to, segmentRatio;
  if (ratio < 0.5) {
    from = RED;
    to = WHITE;
    segmentRatio = ratio * 2; // 0→1 within first half
  } else {
    from = WHITE;
    to = GREEN;
    segmentRatio = (ratio - 0.5) * 2; // 0→1 within second half
  }

  const r = Math.round(from.r + (to.r - from.r) * segmentRatio);
  const g = Math.round(from.g + (to.g - from.g) * segmentRatio);
  const b = Math.round(from.b + (to.b - from.b) * segmentRatio);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
