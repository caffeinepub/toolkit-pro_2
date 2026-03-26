import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { SiFacebook, SiGithub, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo + tagline */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)",
                }}
              >
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">
                ToolKit Pro
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Professional PDF and image tools for everyone. Free, fast, and
              secure.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              >
                <SiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                aria-label="X/Twitter"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Image Tools */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-foreground">
              Image Tools
            </h3>
            <ul className="space-y-2">
              {[
                ["Image to PDF", "image-to-pdf"],
                ["Image Converter", "image-converter"],
                ["Image Compressor", "image-compressor"],
                ["Image Resizer", "image-resizer"],
                ["Add Watermark", "watermark"],
              ].map(([name, slug]) => (
                <li key={slug}>
                  <Link
                    to="/tools/$toolSlug"
                    params={{ toolSlug: slug }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="nav.link"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PDF Tools */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-foreground">
              PDF Tools
            </h3>
            <ul className="space-y-2">
              {[
                ["PDF to Word", "pdf-to-word"],
                ["Word to PDF", "word-to-pdf"],
                ["Merge PDF", "merge-pdf"],
                ["Split PDF", "split-pdf"],
              ].map(([name, slug]) => (
                <li key={slug}>
                  <Link
                    to="/tools/$toolSlug"
                    params={{ toolSlug: slug }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="nav.link"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-sm mb-3 mt-4 text-foreground">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="nav.link"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="nav.link"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-foreground">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="nav.link"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="nav.link"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
