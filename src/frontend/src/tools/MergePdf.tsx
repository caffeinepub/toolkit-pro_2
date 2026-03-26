import { Progress } from "@/components/ui/progress";
import { Loader2, Merge, Monitor, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";

export default function MergePdf() {
  const { files, addFiles, removeFile, clearFiles } = useFileUpload(["pdf"]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleMerge = () => {
    if (files.length < 2) {
      toast.error("Please add at least 2 PDF files to merge.");
      return;
    }
    setProcessing(true);
    setProgress(0);
    setDone(false);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setProcessing(false);
        setDone(true);
        toast.info("Server-side processing required.");
      }
    }, 200);
  };

  return (
    <ToolLayout
      title="Merge PDF"
      description="Combine multiple PDF files into one unified document."
      icon={Merge}
      iconColor="#16a34a"
      iconBg="rgba(22,163,74,0.12)"
    >
      <div className="space-y-6">
        <FileUpload
          onFiles={addFiles}
          accept="application/pdf"
          multiple
          formats={["PDF"]}
          label="Drop PDF files here"
        />

        {files.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                {files.length} PDF{files.length !== 1 ? "s" : ""} added
              </h3>
              <button
                type="button"
                onClick={clearFiles}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((f, i) => (
                <div
                  key={`${f.name}-${f.lastModified}`}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50"
                  data-ocid={`mergepdf.item.${i + 1}`}
                >
                  <Merge
                    className="w-4 h-4 text-muted-foreground flex-shrink-0"
                    style={{ color: "#16a34a" }}
                  />
                  <span className="flex-1 text-sm text-foreground truncate">
                    {f.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {(f.size / 1024).toFixed(0)}KB
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="w-6 h-6 rounded-full hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive"
                    data-ocid={`mergepdf.delete_button.${i + 1}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {processing && (
              <div data-ocid="mergepdf.loading_state">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Merging PDFs...</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {done ? (
              <div
                className="text-center p-5 bg-muted/30 rounded-xl"
                data-ocid="mergepdf.success_state"
              >
                <Monitor className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-semibold text-foreground mb-2">
                  Server-Side Processing Required
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  PDF merging requires server-side processing. Get our desktop
                  app for full functionality.
                </p>
                <button
                  type="button"
                  className="btn-gradient"
                  data-ocid="mergepdf.secondary_button"
                >
                  Get Desktop App
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleMerge}
                disabled={processing || files.length < 2}
                className="btn-gradient w-full justify-center"
                data-ocid="mergepdf.primary_button"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Merging...
                  </>
                ) : (
                  "Merge PDFs"
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
