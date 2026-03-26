interface AdBannerProps {
  size?: "leaderboard" | "banner";
  className?: string;
}

export default function AdBanner({
  size = "leaderboard",
  className = "",
}: AdBannerProps) {
  return (
    <div
      className={`w-full flex justify-center my-6 ${className}`}
      data-ocid="ad.panel"
    >
      <div
        className="flex items-center justify-center rounded-xl text-muted-foreground text-xs font-medium"
        style={{
          background: "#EEF2F7",
          width: size === "leaderboard" ? "728px" : "100%",
          maxWidth: "100%",
          height: size === "leaderboard" ? "90px" : "60px",
        }}
        data-ad-slot="toolkit-pro-ad"
        data-ad-format={size === "leaderboard" ? "leaderboard" : "banner"}
      >
        Advertisement
      </div>
    </div>
  );
}
