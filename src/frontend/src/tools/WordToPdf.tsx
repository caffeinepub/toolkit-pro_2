import { Progress } from "@/components/ui/progress";
import { FileInput, Loader2, Monitor } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";

export default function WordToPdf() {
  const { files, addFiles } = useFileUpload(["docx", "doc", "word"]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleProcess = () => {
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
      title="Word to PDF"
      description="Transform Word documents into professional PDF files."
      icon={FileInput}
      iconColor="#7c3aed"
      iconBg="rgba(124,58,237,0.12)"
    >
      <div className="space-y-6">
        <FileUpload
          onFiles={addFiles}
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple={false}
          formats={["DOC", "DOCX"]}
          label="Drop a Word document here"
        />

        {files.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <FileInput className="w-8 h-8" style={{ color: "#7c3aed" }} />
              <div>
                <p className="font-medium text-foreground text-sm">
                  {files[0].name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(files[0].size / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>

            {processing && (
              <div data-ocid="wordtopdf.loading_state">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Converting document...
                  </span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {done ? (
              <div
                className="text-center p-6 bg-muted/30 rounded-xl"
                data-ocid="wordtopdf.success_state"
              >
                <Monitor className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-semibold text-foreground mb-2">
                  Server-Side Processing Required
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Word to PDF conversion requires server-side processing.
                  Download our desktop app for full functionality.
                </p>
                <button
                  type="button"
                  className="btn-gradient"
                  data-ocid="wordtopdf.secondary_button"
                >
                  Get Desktop App
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleProcess}
                disabled={processing}
                className="btn-gradient w-full justify-center"
                data-ocid="wordtopdf.primary_button"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Converting...
                  </>
                ) : (
                  "Convert to PDF"
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
