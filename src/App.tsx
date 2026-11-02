import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projetos from "./pages/Projetos";
import NotFound from "./pages/NotFound";

/**
 * The route table on its own, so the build-time prerender
 * (src/entry-server.tsx) renders exactly the same tree under a StaticRouter.
 */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/projetos" element={<Projetos />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE — and to
        ROUTES in src/lib/seo.ts and scripts/prerender.mjs */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
