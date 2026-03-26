import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, Monitor, Scissors } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";

export default function SplitPdf() {
  const { files, addFiles } = useFileUpload(["pdf"]);
  const [splitAt, setSplitAt] = useState("1");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleSplit = () => {
    if (files.length === 0) return;
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
      title="Split PDF"
      description="Split a large PDF into smaller individual files."
      icon={Scissors}
      iconColor="#dc2626"
      iconBg="rgba(220,38,38,0.12)"
    >
      <div className="space-y-6">
        <FileUpload
          onFiles={addFiles}
          accept="application/pdf"
          multiple={false}
          formats={["PDF"]}
          label="Drop a PDF file here"
        />

        {files.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Scissors className="w-8 h-8" style={{ color: "#dc2626" }} />
              <div>
                <p className="font-medium text-foreground text-sm">
                  {files[0].name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(files[0].size / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Split after page number (e.g. "3" or "3,7,12")</Label>
              <Input
                value={splitAt}
                onChange={(e) => setSplitAt(e.target.value)}
                placeholder="Page numbers separated by commas"
                data-ocid="splitpdf.input"
              />
              <p className="text-xs text-muted-foreground">
                e.g. "3" splits into pages 1-3 and 4-end
              </p>
            </div>

            {processing && (
              <div data-ocid="splitpdf.loading_state">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Splitting PDF...
                  </span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {done ? (
              <div
                className="text-center p-5 bg-muted/30 rounded-xl"
                data-ocid="splitpdf.success_state"
              >
                <Monitor className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-semibold text-foreground mb-2">
                  Server-Side Processing Required
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  PDF splitting requires server-side processing. Get our desktop
                  app for full functionality.
                </p>
                <button
                  type="button"
                  className="btn-gradient"
                  data-ocid="splitpdf.secondary_button"
                >
                  Get Desktop App
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSplit}
                disabled={processing}
                className="btn-gradient w-full justify-center"
                data-ocid="splitpdf.primary_button"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Splitting...
                  </>
                ) : (
                  "Split PDF"
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
