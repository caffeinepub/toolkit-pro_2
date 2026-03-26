import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download, Droplets } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";

type Position =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export default function WatermarkTool() {
  const { files, previews, addFiles } = useFileUpload(["image"]);
  const [text, setText] = useState("ToolKit Pro");
  const [position, setPosition] = useState<Position>("center");
  const [fontSize, setFontSize] = useState(40);
  const [opacity, setOpacity] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !files[0] || !previews[0]) return;
    const canvas = canvasRef.current;
    const img = new Image();
    img.onload = () => {
      const maxW = 500;
      const scale = Math.min(maxW / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.lineWidth = 1;
      const scaledFont = Math.max(10, fontSize * scale);
      ctx.font = `bold ${scaledFont}px Inter, sans-serif`;
      ctx.textAlign = "center";

      let x = canvas.width / 2;
      let y = canvas.height / 2;
      const pad = 20;
      const tm = ctx.measureText(text);
      const th = scaledFont;

      if (position === "top-left") {
        x = pad + tm.width / 2;
        y = pad + th;
      } else if (position === "top-right") {
        x = canvas.width - pad - tm.width / 2;
        y = pad + th;
      } else if (position === "bottom-left") {
        x = pad + tm.width / 2;
        y = canvas.height - pad;
      } else if (position === "bottom-right") {
        x = canvas.width - pad - tm.width / 2;
        y = canvas.height - pad;
      }

      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1;
    };
    img.src = previews[0];
  }, [files, previews, text, position, fontSize, opacity]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `watermarked_${files[0].name}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Watermarked image downloaded!");
    }, "image/png");
  };

  return (
    <ToolLayout
      title="Add Watermark"
      description="Add custom text watermarks to your images with position and opacity control."
      icon={Droplets}
      iconColor="#06b6d4"
      iconBg="rgba(6,182,212,0.12)"
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
            {/* Controls */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-4">
              <div className="space-y-1.5">
                <Label>Watermark Text</Label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Your watermark..."
                  data-ocid="watermark.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Position</Label>
                <Select
                  value={position}
                  onValueChange={(v) => setPosition(v as Position)}
                >
                  <SelectTrigger data-ocid="watermark.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Font Size</Label>
                  <span className="text-sm font-medium text-foreground">
                    {fontSize}px
                  </span>
                </div>
                <Slider
                  min={12}
                  max={120}
                  step={4}
                  value={[fontSize]}
                  onValueChange={([v]) => setFontSize(v)}
                  data-ocid="watermark.toggle"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Opacity</Label>
                  <span className="text-sm font-medium text-foreground">
                    {opacity}%
                  </span>
                </div>
                <Slider
                  min={10}
                  max={100}
                  step={5}
                  value={[opacity]}
                  onValueChange={([v]) => setOpacity(v)}
                  data-ocid="watermark.toggle"
                />
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="btn-gradient w-full justify-center"
                data-ocid="watermark.primary_button"
              >
                <Download className="w-4 h-4" /> Download Watermarked
              </button>
            </div>

            {/* Preview */}
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
