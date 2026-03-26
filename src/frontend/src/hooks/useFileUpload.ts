import { useCallback, useState } from "react";
import { toast } from "sonner";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export function useFileUpload(acceptedTypes?: string[]) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const arr = Array.from(newFiles);
      const valid: File[] = [];

      for (const f of arr) {
        if (f.size > MAX_SIZE) {
          toast.error(`"${f.name}" exceeds 10MB file size limit`);
          continue;
        }
        if (acceptedTypes && acceptedTypes.length > 0) {
          const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
          const ok = acceptedTypes.some(
            (t) => f.type.includes(t) || t.toLowerCase().includes(ext),
          );
          if (!ok) {
            toast.error(`"${f.name}" is not a supported file type`);
            continue;
          }
        }
        valid.push(f);
      }

      const newPreviews = valid.map((f) =>
        f.type.startsWith("image/") ? URL.createObjectURL(f) : "",
      );

      setFiles((prev) => [...prev, ...valid]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
    [acceptedTypes],
  );

  const removeFile = useCallback((index: number) => {
    setPreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setPreviews((prev) => {
      for (const url of prev) {
        if (url) URL.revokeObjectURL(url);
      }
      return [];
    });
    setFiles([]);
  }, []);

  const reorderFiles = useCallback((fromIdx: number, toIdx: number) => {
    setFiles((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, item);
      return arr;
    });
    setPreviews((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, item);
      return arr;
    });
  }, []);

  return { files, previews, addFiles, removeFile, clearFiles, reorderFiles };
}
