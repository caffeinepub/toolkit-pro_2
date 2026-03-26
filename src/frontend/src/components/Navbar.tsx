import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronDown, FileText, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const IMAGE_TOOLS = [
  { name: "Image to PDF", slug: "image-to-pdf" },
  { name: "Image Converter", slug: "image-converter" },
  { name: "Image Compressor", slug: "image-compressor" },
  { name: "Image Resizer", slug: "image-resizer" },
  { name: "Add Watermark", slug: "watermark" },
  { name: "Crop Tool", slug: "crop" },
  { name: "Rotate Image", slug: "rotate" },
  { name: "Base64 Converter", slug: "base64" },
];

const PDF_TOOLS = [
  { name: "PDF to Word", slug: "pdf-to-word" },
  { name: "Word to PDF", slug: "word-to-pdf" },
  { name: "Merge PDF", slug: "merge-pdf" },
  { name: "Split PDF", slug: "split-pdf" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)",
            }}
          >
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg gradient-text">ToolKit Pro</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
            data-ocid="nav.link"
          >
            Home
          </Link>

          {/* Tools dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors flex items-center gap-1"
              data-ocid="nav.dropdown_menu"
            >
              Tools <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-card border border-border rounded-xl shadow-card-hover p-4 w-[480px] grid grid-cols-2 gap-1 z-50">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground px-2 mb-2">
                    Image Tools
                  </p>
                  {IMAGE_TOOLS.map((t) => (
                    <Link
                      key={t.slug}
                      to="/tools/$toolSlug"
                      params={{ toolSlug: t.slug }}
                      className="block px-2 py-1.5 text-sm text-foreground hover:bg-accent rounded-lg transition-colors"
                      data-ocid="nav.link"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground px-2 mb-2">
                    PDF Tools
                  </p>
                  {PDF_TOOLS.map((t) => (
                    <Link
                      key={t.slug}
                      to="/tools/$toolSlug"
                      params={{ toolSlug: t.slug }}
                      className="block px-2 py-1.5 text-sm text-foreground hover:bg-accent rounded-lg transition-colors"
                      data-ocid="nav.link"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
            data-ocid="nav.link"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
            data-ocid="nav.link"
          >
            Contact
          </Link>
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent transition-colors text-muted-foreground"
            aria-label="Toggle dark mode"
            data-ocid="nav.toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-4.5 h-4.5" />
            ) : (
              <Moon className="w-4.5 h-4.5" />
            )}
          </button>
          <Link to="/tools/$toolSlug" params={{ toolSlug: "image-to-pdf" }}>
            <button
              type="button"
              className="btn-gradient"
              data-ocid="nav.primary_button"
            >
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 flex flex-col gap-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase mt-2">
            Image Tools
          </p>
          {IMAGE_TOOLS.map((t) => (
            <Link
              key={t.slug}
              to="/tools/$toolSlug"
              params={{ toolSlug: t.slug }}
              className="block px-3 py-2 rounded-lg text-sm hover:bg-accent"
              onClick={() => setMobileOpen(false)}
            >
              {t.name}
            </Link>
          ))}
          <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase mt-2">
            PDF Tools
          </p>
          {PDF_TOOLS.map((t) => (
            <Link
              key={t.slug}
              to="/tools/$toolSlug"
              params={{ toolSlug: t.slug }}
              className="block px-3 py-2 rounded-lg text-sm hover:bg-accent"
              onClick={() => setMobileOpen(false)}
            >
              {t.name}
            </Link>
          ))}
          <Link
            to="/about"
            className="block px-3 py-2 rounded-lg text-sm hover:bg-accent"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-lg text-sm hover:bg-accent"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
          <div className="flex items-center justify-between px-3 py-2 mt-2">
            <span className="text-sm font-medium">Dark Mode</span>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent text-muted-foreground"
            >
              {theme === "dark" ? (
                <Sun className="w-4.5 h-4.5" />
              ) : (
                <Moon className="w-4.5 h-4.5" />
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
