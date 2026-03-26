import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Loader2, Maximize } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";

export default function ImageResizer() {
  const { files, previews, addFiles } = useFileUpload(["image"]);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspect, setLockAspect] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    if (files.length > 0) {
      const img = new Image();
      img.onload = () => {
        setAspectRatio(img.width / img.height);
        setWidth(String(img.width));
        setHeight(String(img.height));
      };
      img.src = URL.createObjectURL(files[0]);
    }
  }, [files]);

  const handleWidthChange = (v: string) => {
    setWidth(v);
    if (lockAspect && v) {
      setHeight(String(Math.round(Number(v) / aspectRatio)));
    }
  };

  const handleHeightChange = (v: string) => {
    setHeight(v);
    if (lockAspect && v) {
      setWidth(String(Math.round(Number(v) * aspectRatio)));
    }
  };

  const handleResize = async () => {
    if (files.length === 0 || !width || !height) return;
    setProcessing(true);
    const output: { name: string; url: string }[] = [];

    for (const file of files) {
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const url = URL.createObjectURL(file);
        const im = new Image();
        im.onload = () => {
          URL.revokeObjectURL(url);
          res(im);
        };
        im.onerror = rej;
        im.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = Number(width);
      canvas.height = Number(height);
      canvas
        .getContext("2d")!
        .drawImage(img, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob>((res) =>
        canvas.toBlob((b) => res(b!), "image/png"),
      );
      const baseName = file.name.replace(/\.[^.]+$/, "");
      output.push({
        name: `${baseName}_${width}x${height}.png`,
        url: URL.createObjectURL(blob),
      });
    }

    setResults(output);
    setProcessing(false);
    toast.success("Images resized successfully!");
  };

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to any custom dimensions with optional aspect ratio lock."
      icon={Maximize}
      iconColor="#8b5cf6"
      iconBg="rgba(139,92,246,0.12)"
    >
      <div className="space-y-6">
        <FileUpload
          onFiles={addFiles}
          accept="image/*"
          formats={["JPG", "PNG", "WEBP"]}
        />

        {files.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
            {previews[0] && (
              <img
                src={previews[0]}
                alt="Preview"
                className="max-h-40 rounded-xl border border-border mx-auto block object-contain"
              />
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Width (px)</Label>
                <Input
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  type="number"
                  min="1"
                  placeholder="Width"
                  data-ocid="resizer.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Height (px)</Label>
                <Input
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  type="number"
                  min="1"
                  placeholder="Height"
                  data-ocid="resizer.input"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="lock"
                checked={lockAspect}
                onCheckedChange={(v) => setLockAspect(v === true)}
                data-ocid="resizer.checkbox"
              />
              <Label htmlFor="lock" className="cursor-pointer">
                Maintain aspect ratio
              </Label>
            </div>
            <button
              type="button"
              onClick={handleResize}
              disabled={processing || !width || !height}
              className="btn-gradient w-full justify-center"
              data-ocid="resizer.primary_button"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Resizing...
                </>
              ) : (
                "Resize Images"
              )}
            </button>
          </div>
        )}

        {results.length > 0 && (
          <div
            className="bg-card border border-border rounded-2xl p-4 shadow-card"
            data-ocid="resizer.success_state"
          >
            <h3 className="font-semibold text-foreground mb-3">
              Resized Files
            </h3>
            {results.map((r, i) => (
              <div
                key={r.name}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/50 mb-2"
                data-ocid={`resizer.item.${i + 1}`}
              >
                <span className="text-sm text-foreground">{r.name}</span>
                <a
                  href={r.url}
                  download={r.name}
                  className="btn-gradient text-xs"
                  data-ocid={`resizer.primary_button.${i + 1}`}
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
