import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;

// Built pages arrive pre-rendered (scripts/prerender.mjs), so React adopts the
// DOM that is already painted. Only the dev server starts from an empty root.
if (root.firstElementChild) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
