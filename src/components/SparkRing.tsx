import { useEffect, useRef } from "react";
import { reduceMotion } from "@/lib/motion";
import { loadGsap, type GsapModule } from "@/lib/loadGsap";

/** Near-white warm highlight: the thin trail, the sparks and the core of the head. */
const PALE = "248,236,205";
/** The gold of the spark itself — a stop brighter than the --gold ring so it blooms. */
const GOLD = "232,207,148";
/** The canvas is this many px larger than the button (half on each side). */
const MARGIN = 180;
/** One full lap of the border, at rest. */
const LAP_MS = 5200;
/** How long the trail stays visible. */
const TRAIL_MS = 400;
/** Button height the effect's numbers were calibrated against. */
const REFERENCE_HEIGHT = 50;
const MAX_DPR = 1.6;

type TrailPoint = { x: number; y: number; t: number };
type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  t: number;
  life: number;
  size: number;
};

const run = (
  el: HTMLElement,
  cv: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  gsap: GsapModule["gsap"],
) => {
  const heat = { v: 0 };

  let cssWidth = 0;
  let cssHeight = 0;
  let cx = 0;
  let cy = 0;
  /** Corner radius of the button, clamped to half its shorter side. */
  let radius = 0;
  let runX = 0;
  let runY = 0;
  let perimeter = 0;
  /** 1 at the reference size; smaller buttons scale the glow down with them. */
  let scale = 1;
  /** The outline path, rebuilt only when the measurements change. */
  let outline: Path2D | null = null;
  let sizing = 0;

  /* The head only ever changes size, never colour: drawn once into its own
     canvas, then it is just a drawImage — no per-frame gradient. */
  const GLOW = 64;
  const head = document.createElement("canvas");
  head.width = head.height = GLOW * 2;
  const headCtx = head.getContext("2d");
  if (headCtx) {
    const g = headCtx.createRadialGradient(GLOW, GLOW, 0, GLOW, GLOW, GLOW);
    g.addColorStop(0, "rgba(255,252,244,.95)");
    g.addColorStop(0.2, `rgba(${PALE},.8)`);
    g.addColorStop(0.55, `rgba(${GOLD},.3)`);
    g.addColorStop(1, `rgba(${GOLD},0)`);
    headCtx.fillStyle = g;
    headCtx.fillRect(0, 0, GLOW * 2, GLOW * 2);
  }

  const measure = () => {
    // offsetWidth/Height: layout size, immune to ancestor transforms (the
    // magnetic pull and the Reveal wrapper both use them).
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;

    // These buttons are rounded rectangles, not pills — the radius comes
    // from the computed style so the path follows the real corners.
    const declared = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    radius = Math.min(declared, w / 2, h / 2);
    runX = Math.max(0, w - 2 * radius);
    runY = Math.max(0, h - 2 * radius);
    perimeter = 2 * runX + 2 * runY + 2 * Math.PI * radius;
    scale = Math.min(1, Math.max(0.55, h / REFERENCE_HEIGHT));

    const margin = MARGIN * scale;
    cssWidth = Math.round(w + margin);
    cssHeight = Math.round(h + margin);
    cx = cssWidth / 2;
    cy = cssHeight / 2;
    outline = null; // measurements moved: the path is rebuilt next frame

    // Sizing the canvas invalidates layout, so it waits for the next frame.
    // Written here, the next button's read would force a reflow per button.
    cancelAnimationFrame(sizing);
    sizing = requestAnimationFrame(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      cv.width = Math.round(cssWidth * dpr);
      cv.height = Math.round(cssHeight * dpr);
      cv.style.width = `${cssWidth}px`;
      cv.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  };

  /**
   * Distance along the rounded rectangle → (x, y). Walks it clockwise from
   * the top-left corner's end: top edge, top-right arc, right edge, and so
   * on back around.
   */
  const at = (distance: number) => {
    let d = ((distance % perimeter) + perimeter) % perimeter;
    const left = cx - (runX / 2 + radius);
    const right = cx + (runX / 2 + radius);
    const top = cy - (runY / 2 + radius);
    const bottom = cy + (runY / 2 + radius);
    const arc = (Math.PI / 2) * radius;

    if (d < runX) return { x: left + radius + d, y: top };
    d -= runX;
    if (d < arc) {
      const a = -Math.PI / 2 + d / radius;
      return {
        x: right - radius + radius * Math.cos(a),
        y: top + radius + radius * Math.sin(a),
      };
    }
    d -= arc;
    if (d < runY) return { x: right, y: top + radius + d };
    d -= runY;
    if (d < arc) {
      const a = d / radius;
      return {
        x: right - radius + radius * Math.cos(a),
        y: bottom - radius + radius * Math.sin(a),
      };
    }
    d -= arc;
    if (d < runX) return { x: right - radius - d, y: bottom };
    d -= runX;
    if (d < arc) {
      const a = Math.PI / 2 + d / radius;
      return {
        x: left + radius + radius * Math.cos(a),
        y: bottom - radius + radius * Math.sin(a),
      };
    }
    d -= arc;
    if (d < runY) return { x: left, y: bottom - radius - d };
    d -= runY;
    const a = Math.PI + d / radius;
    return {
      x: left + radius + radius * Math.cos(a),
      y: top + radius + radius * Math.sin(a),
    };
  };

  const trail: TrailPoint[] = [];
  const sparks: Spark[] = [];
  let position = 0;
  let lastT = 0;
  let onScreen = false;
  let running = false;
  // While scrolling the loop draws every other frame: the motion is driven
  // by dt, so the spark keeps its speed and the scroll gets the headroom.
  let scrolling = false;
  let scrollEnd = 0;
  let skip = false;
  const onScroll = () => {
    scrolling = true;
    clearTimeout(scrollEnd);
    scrollEnd = window.setTimeout(() => (scrolling = false), 160);
  };

  const clear = () => {
    trail.length = 0;
    sparks.length = 0;
    ctx.clearRect(0, 0, cssWidth, cssHeight);
  };

  const frame = () => {
    const t = performance.now();
    if (!perimeter) {
      lastT = t;
      return;
    }
    skip = scrolling && !skip;
    if (skip) return;
    const dt = Math.min(48, t - (lastT || t));
    lastT = t;
    const { v: hot } = heat;

    // Advance the spark: at full heat the lap runs 2.6x faster.
    position += (perimeter / LAP_MS) * dt * (1 + hot * 1.6);
    const { x: px, y: py } = at(position);

    // Tangent (direction of travel) and normal.
    const before = at(position - 1.5);
    const after = at(position + 1.5);
    let tx = after.x - before.x;
    let ty = after.y - before.y;
    const len = Math.hypot(tx, ty) || 1;
    tx /= len;
    ty /= len;
    const nx = ty;
    const ny = -tx;

    trail.push({ x: px, y: py, t });
    while (trail.length && t - trail[0].t > TRAIL_MS) trail.shift();

    const count = (dt / 16) * (0.9 + hot * 2.4);
    for (let i = 0; i < count; i++) {
      if (i > 0 && Math.random() > count - i) break;
      const ahead = (0.06 + Math.random() * 0.16) * scale;
      const sideways = (0.015 + Math.random() * 0.075) * scale;
      sparks.push({
        x: px,
        y: py,
        vx: tx * ahead + nx * sideways,
        vy: ty * ahead + ny * sideways,
        t,
        life: 420 + Math.random() * 620,
        size: (0.9 + Math.random() * 1.5) * Math.max(0.75, scale),
      });
    }

    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.globalCompositeOperation = "lighter"; // additive: this is what reads as light
    ctx.lineCap = "round";

    // Hairline around the whole perimeter (path built only when size changes).
    if (!outline) {
      outline = new Path2D();
      for (let d = 0; d <= perimeter; d += 6) {
        const q = at(d);
        if (d === 0) outline.moveTo(q.x, q.y);
        else outline.lineTo(q.x, q.y);
      }
      outline.closePath();
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${GOLD},${(0.1 + hot * 0.14).toFixed(3)})`;
    ctx.stroke(outline);

    // Trail: a thick gold stroke under a thin near-white one, both fading
    // off with the square of their age.
    for (let i = 1; i < trail.length; i++) {
      const a = trail[i - 1];
      const b = trail[i];
      const k = 1 - (t - b.t) / TRAIL_MS;
      if (k <= 0) continue;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineWidth = (2 + 10 * k * k) * scale;
      ctx.strokeStyle = `rgba(${GOLD},${(0.16 * k * k * (1 + hot)).toFixed(3)})`;
      ctx.stroke();
      ctx.lineWidth = (1 + 2.2 * k * k) * scale;
      ctx.strokeStyle = `rgba(${PALE},${(0.5 * k * k * (1 + hot * 0.5)).toFixed(3)})`;
      ctx.stroke();
    }

    // Sparks: thrown along the direction of travel, then braking.
    for (let i = sparks.length - 1; i >= 0; i--) {
      const q = sparks[i];
      const age = t - q.t;
      const fraction = age / q.life;
      if (fraction >= 1) {
        sparks.splice(i, 1);
        continue;
      }
      const brake = 1 - (1 - Math.min(1, age / 900)) ** 2;
      const x = q.x + q.vx * age * (1 - brake * 0.55);
      const y = q.y + q.vy * age * (1 - brake * 0.55);
      const alpha = (1 - fraction) * (1 - fraction);
      ctx.fillStyle = `rgba(${PALE},${(alpha * 0.85).toFixed(3)})`;
      ctx.fillRect(x - q.size / 2, y - q.size / 2, q.size, q.size);
      ctx.fillStyle = `rgba(${GOLD},${(alpha * 0.3).toFixed(3)})`;
      ctx.fillRect(x - q.size, y - q.size, q.size * 2, q.size * 2);
    }

    // The head: always the same glow, only rescaled and breathing a little.
    const r = (11 + hot * 9) * scale * (1 + 0.12 * Math.sin(t / 110));
    ctx.drawImage(head, px - r, py - r, r * 2, r * 2);

    ctx.globalCompositeOperation = "source-over";
  };

  const sync = () => {
    const shouldRun = onScreen && !document.hidden;
    if (shouldRun && !running) {
      lastT = 0;
      gsap.ticker.add(frame);
      running = true;
    } else if (!shouldRun && running) {
      gsap.ticker.remove(frame);
      running = false;
      clear();
    }
  };

  const warm = () =>
    gsap.to(heat, { v: 1, duration: 0.5, ease: "power2.out", overwrite: true });
  const cool = () =>
    gsap.to(heat, { v: 0, duration: 0.9, ease: "power2.inOut", overwrite: true });

  const observer = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    },
    { rootMargin: "20% 0px" },
  );
  // Also catches the label swapping on mobile and the font arriving, not
  // just a window resize.
  // Its first callback is the initial measurement, delivered when layout is clean.
  const resize = new ResizeObserver(measure);

  observer.observe(el);
  resize.observe(el);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("scroll", onScroll, { passive: true });
  el.addEventListener("pointerenter", warm);
  el.addEventListener("pointerleave", cool);
  el.addEventListener("focus", warm);
  el.addEventListener("blur", cool);

  return () => {
    gsap.ticker.remove(frame);
    gsap.killTweensOf(heat);
    cancelAnimationFrame(sizing);
    observer.disconnect();
    resize.disconnect();
    document.removeEventListener("visibilitychange", sync);
    window.removeEventListener("scroll", onScroll);
    clearTimeout(scrollEnd);
    el.removeEventListener("pointerenter", warm);
    el.removeEventListener("pointerleave", cool);
    el.removeEventListener("focus", warm);
    el.removeEventListener("blur", cool);
  };
};

/**
 * The gold spark that runs the border of a button in a loop. Mounted inside
 * `.btn-solid` / `.btn-outline`, which keep their own static ring and hover;
 * this draws only the travelling head, its trail and the sparks it throws.
 *
 * The loop joins gsap.ticker only while the button is on screen and the tab
 * is active, and halves its frame rate during scroll. Under
 * prefers-reduced-motion it never animates at all — the CSS button stands on
 * its own.
 */
const SparkRing = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current?.parentElement as HTMLElement | null;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx || reduceMotion) return;

    let cancelled = false;
    let stop: (() => void) | undefined;
    // Measuring the button forces layout, so it waits until after first paint.
    loadGsap().then(({ gsap }) => {
      if (!cancelled) stop = run(el, cv, ctx, gsap);
    });

    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return <canvas ref={canvas} className="spark-ring" aria-hidden="true" />;
};

export default SparkRing;
