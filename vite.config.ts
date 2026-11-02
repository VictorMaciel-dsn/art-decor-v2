import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

const PHOTO_QUALITY = "75";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    // `ANALYZE=1 npx vite build` writes the bundle treemap to stats.html.
    process.env.ANALYZE ? visualizer({ filename: "stats.html", gzipSize: true }) : null,
    // Photos are resized and converted to WebP at import time, so replacing a
    // file in src/assets/img is all it takes — no build step to remember.
    // A plain `?w=900&format=webp` import returns the URL; add `&srcset` to
    // get a srcset string instead. See src/components/Img.tsx.
    imagetools({
      defaultDirectives: (url) => {
        // `?meta` just reports the source's width/height — no renditions.
        if (url.searchParams.has("meta")) {
          return new URLSearchParams({ as: "meta:width;height" });
        }
        if (!url.searchParams.has("hq")) return new URLSearchParams();

        // `?hq&as=url` asks for the single <img src> fallback rather than
        // the srcset. Without its own directives it would emit the largest
        // rendition in the SOURCE format — which for a PNG photo is several
        // megabytes, heavier than the original. One mid-size WebP instead:
        // it is only ever used where srcset is unsupported.
        if (url.searchParams.get("as") === "url") {
          return new URLSearchParams({
            format: "webp",
            quality: PHOTO_QUALITY,
            w: "1280",
            withoutEnlargement: "true",
          });
        }

        return new URLSearchParams({
          format: "webp",
          quality: PHOTO_QUALITY,
          w: "400;540;760;1080;1280;1520;1920",
          withoutEnlargement: "true",
          as: "srcset",
        });
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
