import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy, useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

const ImageToPdf = lazy(() => import("./tools/ImageToPdf"));
const ImageConverter = lazy(() => import("./tools/ImageConverter"));
const ImageCompressor = lazy(() => import("./tools/ImageCompressor"));
const ImageResizer = lazy(() => import("./tools/ImageResizer"));
const WatermarkTool = lazy(() => import("./tools/Watermark"));
const CropTool = lazy(() => import("./tools/CropTool"));
const RotateTool = lazy(() => import("./tools/RotateTool"));
const Base64Converter = lazy(() => import("./tools/Base64Converter"));
const PdfToWord = lazy(() => import("./tools/PdfToWord"));
const WordToPdf = lazy(() => import("./tools/WordToPdf"));
const MergePdf = lazy(() => import("./tools/MergePdf"));
const SplitPdf = lazy(() => import("./tools/SplitPdf"));

const TOOLS: Record<string, React.LazyExoticComponent<React.FC>> = {
  "image-to-pdf": ImageToPdf,
  "image-converter": ImageConverter,
  "image-compressor": ImageCompressor,
  "image-resizer": ImageResizer,
  watermark: WatermarkTool,
  crop: CropTool,
  rotate: RotateTool,
  base64: Base64Converter,
  "pdf-to-word": PdfToWord,
  "word-to-pdf": WordToPdf,
  "merge-pdf": MergePdf,
  "split-pdf": SplitPdf,
};

function ToolDispatcher() {
  const { toolSlug } = useParams({ from: "/tools/$toolSlug" });
  const navigate = useNavigate();
  const Tool = TOOLS[toolSlug];

  useEffect(() => {
    if (!Tool) {
      navigate({ to: "/" });
    }
  }, [Tool, navigate]);

  if (!Tool) return null;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <Tool />
    </Suspense>
  );
}

function RootLayout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="bottom-right" richColors />
    </ThemeProvider>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPage,
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
});
const toolRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/$toolSlug",
  component: ToolDispatcher,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  toolRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
