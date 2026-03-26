import { Download, FlipHorizontal, FlipVertical, RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";

export default function RotateTool() {
  const { files, previews, addFiles } = useFileUpload(["image"]);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!previews[0] || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const maxSize = 400;
    const img = new Image();
    img.onload = () => {
      const rad = (rotation * Math.PI) / 180;
      const absRot = rotation % 360;
      const swapped = absRot === 90 || absRot === 270;
      const iw = img.width;
      const ih = img.height;
      const cw = swapped ? ih : iw;
      const ch = swapped ? iw : ih;
      const scale = Math.min(maxSize / cw, maxSize / ch, 1);
      canvas.width = cw * scale;
      canvas.height = ch * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(
        img,
        (-iw * scale) / 2,
        (-ih * scale) / 2,
        iw * scale,
        ih * scale,
      );
      ctx.restore();
    };
    img.src = previews[0];
  }, [previews, rotation, flipH, flipV]);

  const handleDownload = () => {
    if (!canvasRef.current || !files[0]) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rotated_${files[0].name}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Image downloaded!");
    }, "image/png");
  };

  const rotate = (deg: number) => setRotation((r) => (r + deg + 360) % 360);

  return (
    <ToolLayout
      title="Rotate Image"
      description="Rotate or flip images in any direction with live preview."
      icon={RotateCw}
      iconColor="#14b8a6"
      iconBg="rgba(20,184,166,0.12)"
    >
      <div className="space-y-6">
        <FileUpload
          onFiles={addFiles}
          accept="image/*"
          multiple={false}
          formats={["JPG", "PNG", "WEBP"]}
        />

        {files.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-3">
              <p className="text-sm font-semibold text-foreground">Rotate</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "90° CW", action: () => rotate(90) },
                  { label: "90° CCW", action: () => rotate(-90) },
                  { label: "180°", action: () => rotate(180) },
                ].map((btn) => (
                  <button
                    type="button"
                    key={btn.label}
                    onClick={btn.action}
                    className="py-2 px-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
                    data-ocid="rotate.button"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <p className="text-sm font-semibold text-foreground pt-2">Flip</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFlipH((f) => !f)}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                    flipH
                      ? "border-primary text-white"
                      : "border-border text-foreground hover:bg-accent"
                  }`}
                  style={
                    flipH
                      ? {
                          background:
                            "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)",
                        }
                      : {}
                  }
                  data-ocid="rotate.toggle"
                >
                  <FlipHorizontal className="w-4 h-4" /> Horizontal
                </button>
                <button
                  type="button"
                  onClick={() => setFlipV((f) => !f)}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                    flipV
                      ? "border-primary text-white"
                      : "border-border text-foreground hover:bg-accent"
                  }`}
                  style={
                    flipV
                      ? {
                          background:
                            "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)",
                        }
                      : {}
                  }
                  data-ocid="rotate.toggle"
                >
                  <FlipVertical className="w-4 h-4" /> Vertical
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Current rotation: {rotation}°
              </p>
              <button
                type="button"
                onClick={handleDownload}
                className="btn-gradient w-full justify-center mt-2"
                data-ocid="rotate.primary_button"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex items-center justify-center min-h-[300px]">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-80 rounded-lg border border-border"
              />
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
