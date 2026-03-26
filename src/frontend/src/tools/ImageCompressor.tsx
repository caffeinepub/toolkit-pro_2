import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Download, Loader2, Minimize2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export default function ImageCompressor() {
  const { files, previews, addFiles } = useFileUpload(["image"]);
  const [quality, setQuality] = useState(80);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<
    { name: string; url: string; original: number; compressed: number }[]
  >([]);

  const handleCompress = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);
    const output: typeof results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      const blob = await new Promise<Blob>((res) =>
        canvas.toBlob((b) => res(b!), "image/jpeg", quality / 100),
      );
      const ext =
        file.type === "image/png"
          ? "jpg"
          : (file.name.split(".").pop() ?? "jpg");
      const baseName = file.name.replace(/\.[^.]+$/, "");
      output.push({
        name: `${baseName}_compressed.${ext}`,
        url: URL.createObjectURL(blob),
        original: file.size,
        compressed: blob.size,
      });
      setProgress(((i + 1) / files.length) * 100);
    }

    setResults(output);
    setProcessing(false);
    toast.success("Images compressed successfully!");
  };

  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image file size while maintaining visual quality."
      icon={Minimize2}
      iconColor="#f59e0b"
      iconBg="rgba(245,158,11,0.12)"
    >
      <div className="space-y-6">
        <FileUpload
          onFiles={addFiles}
          accept="image/*"
          multiple
          formats={["JPG", "PNG", "WEBP"]}
        />

        {files.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">Quality</p>
                <span
                  className="text-sm font-bold px-2 py-0.5 rounded-lg text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)",
                  }}
                >
                  {quality}%
                </span>
              </div>
              <Slider
                min={10}
                max={100}
                step={5}
                value={[quality]}
                onValueChange={([v]) => setQuality(v)}
                className="w-full"
                data-ocid="compressor.toggle"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {previews.map((url, i) => (
                <div key={url || i} className="relative">
                  <img
                    src={url}
                    alt={files[i].name}
                    className="w-20 h-20 rounded-lg object-cover border border-border"
                  />
                  <span className="absolute -bottom-1 left-0 right-0 text-center text-[10px] text-muted-foreground">
                    {formatBytes(files[i].size)}
                  </span>
                </div>
              ))}
            </div>

            {processing && (
              <div data-ocid="compressor.loading_state">
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <button
              type="button"
              onClick={handleCompress}
              disabled={processing}
              className="btn-gradient w-full justify-center"
              data-ocid="compressor.primary_button"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Compressing...
                </>
              ) : (
                "Compress Images"
              )}
            </button>
          </div>
        )}

        {results.length > 0 && (
          <div
            className="bg-card border border-border rounded-2xl p-4 shadow-card"
            data-ocid="compressor.success_state"
          >
            <h3 className="font-semibold text-foreground mb-3">Results</h3>
            <div className="space-y-3">
              {results.map((r, i) => {
                const savings = Math.round(
                  (1 - r.compressed / r.original) * 100,
                );
                return (
                  <div
                    key={r.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                    data-ocid={`compressor.item.${i + 1}`}
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {r.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(r.original)} →{" "}
                        <span className="text-green-600 font-medium">
                          {formatBytes(r.compressed)}
                        </span>{" "}
                        <span className="text-green-600">(-{savings}%)</span>
                      </p>
                    </div>
                    <a
                      href={r.url}
                      download={r.name}
                      className="btn-gradient text-xs"
                      data-ocid={`compressor.primary_button.${i + 1}`}
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
