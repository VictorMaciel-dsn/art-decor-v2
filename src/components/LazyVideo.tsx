import { useEffect, useRef, useState } from "react";
import { reduceMotion } from "@/lib/gsap";

type Props = {
  src: string;
  /** Stands in until the clip is near the viewport. Optional: without one
      the box is simply held empty by width/height until the video loads. */
  poster?: string;
  label: string;
  width: number;
  height: number;
  className?: string;
};

/**
 * A clip is several megabytes, so the source is only attached once the
 * element is near the viewport — until then nothing is downloaded and the
 * poster (when there is one) stands in. Playback pauses while the video is
 * off screen, and reduced motion never autoplays: it gets controls so the
 * clip is played deliberately.
 *
 * Shared by the Automação block on the home page and the gallery.
 */
const LazyVideo = ({
  src,
  poster,
  label,
  width,
  height,
  className = "",
}: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  // Starts false to match the pre-rendered markup; React does not patch
  // attributes that differ during hydration.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // React only ever sets `muted` as a property, so it is missing from the
    // pre-rendered markup, and a hydrated video would be refused autoplay.
    el.muted = true;

    // Reduced motion never preloads: the poster stays until the visitor
    // presses play, and the controls are there for exactly that.
    if (reduceMotion) {
      setReduced(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        // Once loaded, keep it in step with visibility rather than letting
        // it loop unseen behind the rest of the page.
        if (el.src) {
          if (entry.isIntersecting) el.play().catch(() => {});
          else el.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      // Attaching src is what starts the download, so it waits for `near`.
      // Under reduced motion it is attached up front but never preloaded,
      // so the controls work without fetching anything until pressed.
      src={near || reduced ? src : undefined}
      poster={poster}
      width={width}
      height={height}
      autoPlay={!reduced}
      muted
      loop
      playsInline
      controls={reduced}
      preload="none"
      aria-label={label}
      className={`photo-warm h-auto w-full ${className}`}
    />
  );
};

export default LazyVideo;
