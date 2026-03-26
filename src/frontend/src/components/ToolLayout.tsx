import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  children: React.ReactNode;
}

export default function ToolLayout({
  title,
  description,
  icon: Icon,
  iconColor,
  iconBg,
  children,
}: ToolLayoutProps) {
  return (
    <div className="min-h-[80vh] bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          data-ocid="tool.link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: iconBg }}
          >
            <Icon className="w-7 h-7" style={{ color: iconColor }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        {/* Tool content */}
        {children}
      </div>
    </div>
  );
}
