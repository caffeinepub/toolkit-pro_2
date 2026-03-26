import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Code2,
  Crop,
  Download,
  Droplets,
  FileImage,
  FileInput,
  FileOutput,
  FileText,
  Globe,
  Maximize,
  Merge,
  Minimize2,
  RotateCw,
  Scissors,
  Shield,
  Upload,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import AdBanner from "../components/AdBanner";
import FileUpload from "../components/FileUpload";
import ToolCard from "../components/ToolCard";

const IMAGE_TOOLS = [
  {
    name: "Image to PDF",
    description: "Convert multiple images into a single PDF document quickly.",
    slug: "image-to-pdf",
    icon: FileImage,
    iconColor: "#4a8bff",
    iconBg: "rgba(74,139,255,0.12)",
  },
  {
    name: "Image Converter",
    description: "Convert between JPG and PNG formats with perfect quality.",
    slug: "image-converter",
    icon: FileOutput,
    iconColor: "#22c55e",
    iconBg: "rgba(34,197,94,0.12)",
  },
  {
    name: "Image Compressor",
    description: "Reduce image file size with a quality control slider.",
    slug: "image-compressor",
    icon: Minimize2,
    iconColor: "#f59e0b",
    iconBg: "rgba(245,158,11,0.12)",
  },
  {
    name: "Image Resizer",
    description: "Resize images to custom dimensions with aspect ratio lock.",
    slug: "image-resizer",
    icon: Maximize,
    iconColor: "#8b5cf6",
    iconBg: "rgba(139,92,246,0.12)",
  },
  {
    name: "Add Watermark",
    description:
      "Add custom text watermarks with position and opacity control.",
    slug: "watermark",
    icon: Droplets,
    iconColor: "#06b6d4",
    iconBg: "rgba(6,182,212,0.12)",
  },
  {
    name: "Crop Tool",
    description: "Crop images to precise dimensions using coordinate inputs.",
    slug: "crop",
    icon: Crop,
    iconColor: "#ec4899",
    iconBg: "rgba(236,72,153,0.12)",
  },
  {
    name: "Rotate Image",
    description: "Rotate or flip images in any direction with live preview.",
    slug: "rotate",
    icon: RotateCw,
    iconColor: "#14b8a6",
    iconBg: "rgba(20,184,166,0.12)",
  },
  {
    name: "Base64 Converter",
    description:
      "Encode images to Base64 or decode Base64 strings back to images.",
    slug: "base64",
    icon: Code2,
    iconColor: "#f97316",
    iconBg: "rgba(249,115,22,0.12)",
  },
];

const PDF_TOOLS = [
  {
    name: "PDF to Word",
    description: "Convert PDF documents to editable Word files effortlessly.",
    slug: "pdf-to-word",
    icon: FileOutput,
    iconColor: "#3b82f6",
    iconBg: "rgba(59,130,246,0.12)",
  },
  {
    name: "Word to PDF",
    description: "Transform Word documents into professional PDF files.",
    slug: "word-to-pdf",
    icon: FileInput,
    iconColor: "#7c3aed",
    iconBg: "rgba(124,58,237,0.12)",
  },
  {
    name: "Merge PDF",
    description: "Combine multiple PDF files into one unified document.",
    slug: "merge-pdf",
    icon: Merge,
    iconColor: "#16a34a",
    iconBg: "rgba(22,163,74,0.12)",
  },
  {
    name: "Split PDF",
    description: "Split a large PDF into smaller individual files.",
    slug: "split-pdf",
    icon: Scissors,
    iconColor: "#dc2626",
    iconBg: "rgba(220,38,38,0.12)",
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Fast Processing",
    description:
      "Lightning-fast conversion using your browser's native capabilities.",
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description:
      "All processing happens locally. Your files never leave your device.",
    color: "#22c55e",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description:
      "No installation needed. Works on any device with a modern browser.",
    color: "#3b82f6",
  },
  {
    icon: Download,
    title: "No Install",
    description:
      "Access all tools instantly from your browser. Nothing to install.",
    color: "#8b5cf6",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Upload",
    description:
      "Drag and drop your files or click to browse from your device.",
    icon: Upload,
  },
  {
    num: "02",
    title: "Process",
    description:
      "Choose your settings and let our tools do the work instantly.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Download",
    description:
      "Download your processed files with one click. It's that simple.",
    icon: Download,
  },
];

const FAQ = [
  {
    q: "Are my files safe and private?",
    a: "Yes! All file processing happens entirely in your browser using HTML5 Canvas and Web APIs. Your files are never uploaded to any server.",
  },
  {
    q: "What is the maximum file size?",
    a: "We support files up to 10MB per file. For larger files, we recommend compressing them first using our Image Compressor tool.",
  },
  {
    q: "What image formats are supported?",
    a: "We support JPG, PNG, GIF, WebP, and BMP formats for image tools. PDF tools support standard PDF files and .docx for Word documents.",
  },
  {
    q: "Can I convert multiple files at once?",
    a: "Yes! Most of our tools support batch processing. You can upload multiple files at once and process them all together.",
  },
  {
    q: "Is ToolKit Pro really free?",
    a: "Absolutely! All basic tools are completely free to use with no registration required. We plan to keep core features free forever.",
  },
  {
    q: "Why are PDF conversion tools showing desktop app notice?",
    a: "Advanced PDF conversion requires server-side processing. Our browser-based tools cover image operations fully. For PDF conversion, we offer a desktop app solution.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleHeroUpload = (files: File[]) => {
    if (files.length > 0) {
      navigate({
        to: "/tools/$toolSlug",
        params: { toolSlug: "image-to-pdf" },
      });
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-4 pt-10 pb-16 relative">
        {/* Decorative blobs */}
        <div
          className="absolute left-0 top-0 w-64 h-64 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{ background: "#EEF2FF" }}
        />
        <div
          className="absolute right-0 top-24 w-48 h-48 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{ background: "#F3F6FF" }}
        />

        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-gradient rounded-3xl p-10 md:p-16 relative overflow-hidden"
          >
            {/* Hero text */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                All-in-One Free PDF &amp; Image Tools
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Convert, Compress, Edit &amp; Manage Files Easily
              </p>
            </div>

            {/* Upload area */}
            <div className="max-w-xl mx-auto">
              <FileUpload
                onFiles={handleHeroUpload}
                accept="image/*,application/pdf"
                className="bg-white/95 backdrop-blur"
                formats={["JPG", "PNG", "PDF", "WEBP", "GIF"]}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Ad Banner */}
      <div className="max-w-[1100px] mx-auto px-4">
        <AdBanner size="leaderboard" />
      </div>

      {/* Image Tools */}
      <section className="section-gap px-4">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">
              Image Tools
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Powerful browser-based image editing tools
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {IMAGE_TOOLS.map((tool, i) => (
                <ToolCard key={tool.slug} {...tool} index={i + 1} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Middle Ad Banner */}
      <div className="max-w-[1100px] mx-auto px-4">
        <AdBanner size="leaderboard" />
      </div>

      {/* PDF Tools */}
      <section className="section-gap px-4">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">
              PDF Tools
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Professional PDF management tools
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PDF_TOOLS.map((tool, i) => (
                <ToolCard key={tool.slug} {...tool} index={i + 1} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-gap px-4 bg-muted/30">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">
              Platform Features
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Why thousands of users choose ToolKit Pro
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="bg-card border border-border rounded-2xl p-6 text-center shadow-card"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${f.color}18` }}
                  >
                    <f.icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-gap px-4">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">
              How It Works
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Three simple steps to process your files
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
              {STEPS.map((step, i) => (
                <>
                  <div
                    key={step.num}
                    className="flex-1 flex flex-col items-center text-center px-6"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-card"
                      style={{
                        background:
                          "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)",
                      }}
                    >
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-bold text-primary mb-1">
                      {step.num}
                    </span>
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ChevronRight className="w-6 h-6 text-muted-foreground hidden md:block flex-shrink-0" />
                  )}
                </>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-gap px-4 bg-muted/30">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">
              Top Questions
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Everything you need to know about ToolKit Pro
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Accordion type="multiple" className="space-y-2">
                {FAQ.slice(0, 3).map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={`left-${item.q.slice(0, 15)}`}
                    className="bg-card border border-border rounded-xl px-4 data-[state=open]:shadow-card"
                  >
                    <AccordionTrigger className="text-sm font-semibold text-foreground text-left hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Accordion type="multiple" className="space-y-2">
                {FAQ.slice(3).map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={`right-${item.q.slice(0, 15)}`}
                    className="bg-card border border-border rounded-xl px-4 data-[state=open]:shadow-card"
                  >
                    <AccordionTrigger className="text-sm font-semibold text-foreground text-left hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Ad */}
      <div className="max-w-[1100px] mx-auto px-4">
        <AdBanner size="leaderboard" />
      </div>
    </div>
  );
}
