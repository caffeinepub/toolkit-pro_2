import { Progress } from "@/components/ui/progress";
import { Download, FileOutput, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";
import { downloadBlob } from "../utils/pdfGenerator";

type ConversionMode = "jpg-to-png" | "png-to-jpg";

export default function ImageConverter() {
  const { files, previews, addFiles, clearFiles } = useFileUpload(["image"]);
  const [mode, setMode] = useState<ConversionMode>("jpg-to-png");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ name: string; url: string }[]>([]);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);
    const output: { name: string; url: string }[] = [];

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
      const ctx = canvas.getContext("2d")!;
      if (mode === "png-to-jpg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      const mimeType = mode === "jpg-to-png" ? "image/png" : "image/jpeg";
      const ext = mode === "jpg-to-png" ? "png" : "jpg";
      const blob = await new Promise<Blob>((res) =>
        canvas.toBlob((b) => res(b!), mimeType, 0.92),
      );
      const baseName = file.name.replace(/\.[^.]+$/, "");
      output.push({
        name: `${baseName}.${ext}`,
        url: URL.createObjectURL(blob),
      });
      setProgress(((i + 1) / files.length) * 100);
    }

    setResults(output);
    setProcessing(false);
    toast.success(
      `${output.length} file${output.length !== 1 ? "s" : ""} converted!`,
    );
  };

  const downloadAll = () => {
    for (const r of results) {
      const a = document.createElement("a");
      a.href = r.url;
      a.download = r.name;
      a.click();
    }
  };

  return (
    <ToolLayout
      title="Image Converter"
      description="Convert between JPG and PNG formats with perfect quality."
      icon={FileOutput}
      iconColor="#22c55e"
      iconBg="rgba(34,197,94,0.12)"
    >
      <div className="space-y-6">
        {/* Mode selector */}
        <div className="bg-card border border-border rounded-2xl p-4 flex gap-3 shadow-card">
          {(["jpg-to-png", "png-to-jpg"] as ConversionMode[]).map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                mode === m
                  ? "text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
              style={
                mode === m
                  ? {
                      background:
                        "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)",
                    }
                  : {}
              }
              data-ocid="converter.tab"
            >
              {m === "jpg-to-png" ? "JPG → PNG" : "PNG → JPG"}
            </button>
          ))}
        </div>

        <FileUpload
          onFiles={addFiles}
          accept={mode === "jpg-to-png" ? "image/jpeg" : "image/png"}
          formats={mode === "jpg-to-png" ? ["JPG", "JPEG"] : ["PNG"]}
        />

        {files.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground mb-3">
              {files.length} file{files.length !== 1 ? "s" : ""} ready
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {previews.map((url, i) => (
                <img
                  key={url || i}
                  src={url}
                  alt={files[i].name}
                  className="w-16 h-16 rounded-lg object-cover border border-border"
                />
              ))}
            </div>
            {processing && (
              <div className="mb-4" data-ocid="converter.loading_state">
                <Progress value={progress} className="h-2" />
              </div>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleConvert}
                disabled={processing}
                className="btn-gradient flex-1 justify-center"
                data-ocid="converter.primary_button"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Converting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" /> Convert
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={clearFiles}
                className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:bg-accent transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div
            className="bg-card border border-border rounded-2xl p-4 shadow-card"
            data-ocid="converter.success_state"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Converted Files</h3>
              {results.length > 1 && (
                <button
                  type="button"
                  onClick={downloadAll}
                  className="text-xs btn-gradient"
                  data-ocid="converter.secondary_button"
                >
                  <Download className="w-3.5 h-3.5" /> Download All
                </button>
              )}
            </div>
            <div className="space-y-2">
              {results.map((r, i) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  data-ocid={`converter.item.${i + 1}`}
                >
                  <span className="text-sm text-foreground">{r.name}</span>
                  <a
                    href={r.url}
                    download={r.name}
                    className="text-xs btn-gradient"
                    data-ocid={`converter.primary_button.${i + 1}`}
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
