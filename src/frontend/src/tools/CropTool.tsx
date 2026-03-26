import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crop, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";

export default function CropTool() {
  const { files, previews, addFiles } = useFileUpload(["image"]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [cropW, setCropW] = useState(0);
  const [cropH, setCropH] = useState(0);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const previewRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!previews[0]) return;
    const img = new Image();
    img.onload = () => {
      setImgSize({ w: img.width, h: img.height });
      setCropW(img.width);
      setCropH(img.height);
      setX(0);
      setY(0);
      drawPreview(img, 0, 0, img.width, img.height);
    };
    img.src = previews[0];
  }, [previews]);

  const drawPreview = (
    img: HTMLImageElement,
    cx: number,
    cy: number,
    cw: number,
    ch: number,
  ) => {
    if (!previewRef.current) return;
    const canvas = previewRef.current;
    const maxW = 480;
    const scale = Math.min(maxW / cw, 1);
    canvas.width = cw * scale;
    canvas.height = ch * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!previews[0] || !previewRef.current) return;
    const canvas = previewRef.current;
    const img = new Image();
    const maxW = 480;
    img.onload = () => {
      const cw = cropW || imgSize.w || img.width;
      const ch = cropH || imgSize.h || img.height;
      const scale = Math.min(maxW / cw, 1);
      canvas.width = cw * scale;
      canvas.height = ch * scale;
      canvas
        .getContext("2d")!
        .drawImage(img, x, y, cw, ch, 0, 0, canvas.width, canvas.height);
    };
    img.src = previews[0];
  }, [x, y, cropW, cropH, previews, imgSize.w, imgSize.h]);

  const handleDownload = () => {
    if (!previews[0] || !files[0]) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropW || imgSize.w;
      canvas.height = cropH || imgSize.h;
      canvas
        .getContext("2d")!
        .drawImage(
          img,
          x,
          y,
          canvas.width,
          canvas.height,
          0,
          0,
          canvas.width,
          canvas.height,
        );
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `cropped_${files[0].name}`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Cropped image downloaded!");
      }, "image/png");
    };
    img.src = previews[0];
  };

  return (
    <ToolLayout
      title="Crop Tool"
      description="Crop images to precise dimensions using coordinate inputs."
      icon={Crop}
      iconColor="#ec4899"
      iconBg="rgba(236,72,153,0.12)"
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
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-4">
              <p className="text-sm text-muted-foreground">
                Original: {imgSize.w} × {imgSize.h}px
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>X offset (px)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={imgSize.w}
                    value={x}
                    onChange={(e) => setX(Number(e.target.value))}
                    data-ocid="crop.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Y offset (px)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={imgSize.h}
                    value={y}
                    onChange={(e) => setY(Number(e.target.value))}
                    data-ocid="crop.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Width (px)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={imgSize.w - x}
                    value={cropW}
                    onChange={(e) => setCropW(Number(e.target.value))}
                    data-ocid="crop.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Height (px)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={imgSize.h - y}
                    value={cropH}
                    onChange={(e) => setCropH(Number(e.target.value))}
                    data-ocid="crop.input"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="btn-gradient w-full justify-center"
                data-ocid="crop.primary_button"
              >
                <Download className="w-4 h-4" /> Download Cropped
              </button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex items-center justify-center min-h-[280px]">
              <canvas
                ref={previewRef}
                className="max-w-full max-h-72 rounded-lg border border-border"
              />
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
