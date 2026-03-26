import { Textarea } from "@/components/ui/textarea";
import { Code2, Copy, Download, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FileUpload from "../components/FileUpload";
import ToolLayout from "../components/ToolLayout";
import { useFileUpload } from "../hooks/useFileUpload";

export default function Base64Converter() {
  const { files, addFiles, clearFiles } = useFileUpload(["image"]);
  const [base64String, setBase64String] = useState("");
  const [decodedPreview, setDecodedPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleEncode = () => {
    if (!files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target!.result as string;
      setBase64String(result);
      toast.success("Image encoded to Base64!");
    };
    reader.readAsDataURL(files[0]);
  };

  const handleDecode = () => {
    if (!base64String.trim()) return;
    try {
      const dataUrl = base64String.startsWith("data:")
        ? base64String
        : `data:image/png;base64,${base64String}`;
      setDecodedPreview(dataUrl);
      toast.success("Base64 decoded successfully!");
    } catch {
      toast.error("Invalid Base64 string");
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(base64String)
      .then(() => toast.success("Copied to clipboard!"));
  };

  const handleDownloadDecoded = () => {
    if (!decodedPreview) return;
    const a = document.createElement("a");
    a.href = decodedPreview;
    a.download = "decoded_image.png";
    a.click();
    toast.success("Image downloaded!");
  };

  return (
    <ToolLayout
      title="Base64 Converter"
      description="Encode images to Base64 strings or decode Base64 back to images."
      icon={Code2}
      iconColor="#f97316"
      iconBg="rgba(249,115,22,0.12)"
    >
      <div className="space-y-6">
        {/* Mode selector */}
        <div className="bg-card border border-border rounded-2xl p-1 flex shadow-card">
          {(["encode", "decode"] as const).map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all capitalize ${
                mode === m
                  ? "text-white"
                  : "text-muted-foreground hover:bg-accent"
              }`}
              style={
                mode === m
                  ? {
                      background:
                        "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)",
                    }
                  : {}
              }
              data-ocid="base64.tab"
            >
              {m === "encode" ? "Image → Base64" : "Base64 → Image"}
            </button>
          ))}
        </div>

        {mode === "encode" ? (
          <div className="space-y-4">
            <FileUpload
              onFiles={(f) => {
                addFiles(f);
                setBase64String("");
              }}
              accept="image/*"
              multiple={false}
              formats={["JPG", "PNG", "WEBP"]}
            />
            {files.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    {files[0].name}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleEncode}
                      className="btn-gradient text-xs"
                      data-ocid="base64.primary_button"
                    >
                      <Upload className="w-3.5 h-3.5" /> Encode
                    </button>
                    <button
                      type="button"
                      onClick={clearFiles}
                      className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-accent"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                {base64String && (
                  <>
                    <Textarea
                      value={base64String}
                      readOnly
                      rows={6}
                      className="font-mono text-xs"
                      data-ocid="base64.textarea"
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="btn-gradient w-full justify-center mt-3"
                      data-ocid="base64.secondary_button"
                    >
                      <Copy className="w-4 h-4" /> Copy Base64
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-3">
              <p className="text-sm font-medium text-foreground">
                Paste Base64 String
              </p>
              <Textarea
                value={base64String}
                onChange={(e) => {
                  setBase64String(e.target.value);
                  setDecodedPreview(null);
                }}
                placeholder="data:image/png;base64,... or just the base64 encoded string"
                rows={6}
                className="font-mono text-xs"
                data-ocid="base64.textarea"
              />
              <button
                type="button"
                onClick={handleDecode}
                disabled={!base64String.trim()}
                className="btn-gradient w-full justify-center"
                data-ocid="base64.primary_button"
              >
                Decode Image
              </button>
            </div>
            {decodedPreview && (
              <div
                className="bg-card border border-border rounded-2xl p-4 shadow-card text-center"
                data-ocid="base64.success_state"
              >
                <img
                  src={decodedPreview}
                  alt="Decoded"
                  className="max-h-64 mx-auto rounded-lg border border-border mb-3 object-contain"
                />
                <button
                  type="button"
                  onClick={handleDownloadDecoded}
                  className="btn-gradient"
                  data-ocid="base64.secondary_button"
                >
                  <Download className="w-4 h-4" /> Download Image
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
