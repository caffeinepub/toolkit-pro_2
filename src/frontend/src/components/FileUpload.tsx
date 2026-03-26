import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  sublabel?: string;
  formats?: string[];
  className?: string;
}

export default function FileUpload({
  onFiles,
  accept = "*",
  multiple = true,
  label = "Drag & drop files here",
  sublabel = "or click to browse",
  formats = ["JPG", "PNG", "PDF", "WEBP"],
  className = "",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  return (
    <div
      className={`relative bg-card border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-4 transition-all duration-200 ${
        dragging
          ? "border-primary bg-accent/30 scale-[1.01]"
          : "border-border hover:border-primary/50 hover:bg-accent/10"
      } ${className}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      data-ocid="upload.dropzone"
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
        data-ocid="upload.input"
      />
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #4a8bff22 0%, #7a4cff22 100%)",
        }}
      >
        <UploadCloud className="w-8 h-8" style={{ color: "#4a8bff" }} />
      </div>
      <div className="text-center">
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground mt-1">{sublabel}</p>
      </div>
      <button
        type="button"
        className="btn-gradient"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
        data-ocid="upload.upload_button"
      >
        Upload Files
      </button>
      {formats.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {formats.map((fmt) => (
            <span
              key={fmt}
              className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground bg-muted"
            >
              {fmt}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
