import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

interface ToolCardProps {
  name: string;
  description: string;
  slug: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  index?: number;
}

export default function ToolCard({
  name,
  description,
  slug,
  icon: Icon,
  iconColor,
  iconBg,
  index = 1,
}: ToolCardProps) {
  return (
    <div
      className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 card-hover shadow-card"
      data-ocid={`tool.item.${index}`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg }}
      >
        <Icon className="w-5 h-5" style={{ color: iconColor }} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-base text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <Link to="/tools/$toolSlug" params={{ toolSlug: slug }}>
        <button
          type="button"
          className="btn-gradient w-full justify-center"
          data-ocid={`tool.primary_button.${index}`}
        >
          Try Now
        </button>
      </Link>
    </div>
  );
}
