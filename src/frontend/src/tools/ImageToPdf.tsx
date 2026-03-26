import { Progress } from "@/components/ui/progress";
import { Download, FileImage, GripVertical, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";
import { downloadBlob, imagesToPdf } from "../utils/pdfGenerator";

export default function ImageToPdf() {
  const { files, previews, addFiles, removeFile, clearFiles, reorderFiles } =
    useFileUpload(["image"]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const dragIdx = useRef<number | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);
    try {
      const blob = await imagesToPdf(files, (pct) => setProgress(pct));
      downloadBlob(blob, "converted.pdf");
      toast.success("PDF created and downloaded!");
    } catch {
      toast.error("Conversion failed. Please try again.");
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <ToolLayout
      title="Image to PDF"
      description="Convert multiple images into a single PDF document. Drag to reorder pages."
      icon={FileImage}
      iconColor="#4a8bff"
      iconBg="rgba(74,139,255,0.12)"
    >
      <div className="space-y-6">
        <FileUpload
          onFiles={addFiles}
          accept="image/*"
          multiple
          label="Drop images here"
          sublabel="Supports JPG, PNG, WebP, GIF"
          formats={["JPG", "PNG", "WEBP", "GIF"]}
        />

        {files.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">
                {files.length} image{files.length !== 1 ? "s" : ""} selected
              </h3>
              <button
                type="button"
                onClick={clearFiles}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {files.map((file, i) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  draggable
                  onDragStart={() => {
                    dragIdx.current = i;
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (dragIdx.current !== null && dragIdx.current !== i) {
                      reorderFiles(dragIdx.current, i);
                      dragIdx.current = null;
                    }
                  }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-grab group"
                  data-ocid={`imagetopdf.item.${i + 1}`}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  {previews[i] && (
                    <img
                      src={previews[i]}
                      alt={file.name}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(0)} KB · Page {i + 1}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-all"
                    data-ocid={`imagetopdf.delete_button.${i + 1}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {processing && (
              <div className="mt-4" data-ocid="imagetopdf.loading_state">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Converting...</span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <button
              type="button"
              onClick={handleConvert}
              disabled={processing || files.length === 0}
              className="btn-gradient w-full justify-center mt-4"
              data-ocid="imagetopdf.primary_button"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Converting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Convert to PDF
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
