import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, F as FileImage, a as FileUpload, X, L as LoaderCircle, D as Download, u as ue } from "./index-IUYQHNyl.js";
import { P as Progress } from "./progress-4NstpYYH.js";
import { u as useFileUpload, T as ToolLayout } from "./useFileUpload-Do2hdrWh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode);
async function fileToJpeg(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        const base64 = dataUrl.split(",")[1];
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        resolve({ jpegBytes: bytes, width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function buildPdf(pages) {
  const enc = new TextEncoder();
  const chunks = [];
  const offsets = [];
  let pos = 0;
  function str(s) {
    const b = enc.encode(s);
    chunks.push(b);
    pos += b.length;
  }
  function raw(b) {
    chunks.push(b);
    pos += b.length;
  }
  const n = pages.length;
  const totalObjs = 2 + n * 3;
  str("%PDF-1.4\n");
  offsets[1] = pos;
  str("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  const pageRefs = pages.map((_, i) => `${3 + i * 3} 0 R`).join(" ");
  offsets[2] = pos;
  str(`2 0 obj
<< /Type /Pages /Kids [${pageRefs}] /Count ${n} >>
endobj
`);
  for (let i = 0; i < n; i++) {
    const { jpegBytes, w, h } = pages[i];
    const pageW = 595;
    const pageH = 842;
    const scale = Math.min(pageW / w, pageH / h);
    const iw = Math.floor(w * scale);
    const ih = Math.floor(h * scale);
    const x = Math.floor((pageW - iw) / 2);
    const y = Math.floor((pageH - ih) / 2);
    const pid = 3 + i * 3;
    const cid = 4 + i * 3;
    const imgId = 5 + i * 3;
    offsets[pid] = pos;
    str(
      `${pid} 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}]
  /Resources << /XObject << /Im${i} ${imgId} 0 R >> >>
  /Contents ${cid} 0 R >>
endobj
`
    );
    const cs = `q ${iw} 0 0 ${ih} ${x} ${y} cm /Im${i} Do Q`;
    offsets[cid] = pos;
    str(
      `${cid} 0 obj
<< /Length ${cs.length} >>
stream
${cs}
endstream
endobj
`
    );
    offsets[imgId] = pos;
    str(
      `${imgId} 0 obj
<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h}
  /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>
stream
`
    );
    raw(jpegBytes);
    str("\nendstream\nendobj\n");
  }
  const xrefPos = pos;
  str(`xref
0 ${totalObjs + 1}
0000000000 65535 f 
`);
  for (let i = 1; i <= totalObjs; i++) {
    str(`${(offsets[i] ?? 0).toString().padStart(10, "0")} 00000 n 
`);
  }
  str(
    `trailer
<< /Size ${totalObjs + 1} /Root 1 0 R >>
startxref
${xrefPos}
%%EOF
`
  );
  const total = chunks.reduce((acc, c) => acc + c.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return new Blob([result], { type: "application/pdf" });
}
async function imagesToPdf(imageFiles, onProgress) {
  const pages = [];
  for (let i = 0; i < imageFiles.length; i++) {
    const { jpegBytes, width, height } = await fileToJpeg(imageFiles[i]);
    pages.push({ jpegBytes, w: width, h: height });
    onProgress == null ? void 0 : onProgress((i + 1) / imageFiles.length * 100);
  }
  return buildPdf(pages);
}
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function ImageToPdf() {
  const { files, previews, addFiles, removeFile, clearFiles, reorderFiles } = useFileUpload(["image"]);
  const [processing, setProcessing] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const dragIdx = reactExports.useRef(null);
  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);
    try {
      const blob = await imagesToPdf(files, (pct) => setProgress(pct));
      downloadBlob(blob, "converted.pdf");
      ue.success("PDF created and downloaded!");
    } catch {
      ue.error("Conversion failed. Please try again.");
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolLayout,
    {
      title: "Image to PDF",
      description: "Convert multiple images into a single PDF document. Drag to reorder pages.",
      icon: FileImage,
      iconColor: "#4a8bff",
      iconBg: "rgba(74,139,255,0.12)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileUpload,
          {
            onFiles: addFiles,
            accept: "image/*",
            multiple: true,
            label: "Drop images here",
            sublabel: "Supports JPG, PNG, WebP, GIF",
            formats: ["JPG", "PNG", "WEBP", "GIF"]
          }
        ),
        files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground", children: [
              files.length,
              " image",
              files.length !== 1 ? "s" : "",
              " selected"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: clearFiles,
                className: "text-xs text-muted-foreground hover:text-destructive transition-colors",
                children: "Clear all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-80 overflow-y-auto", children: files.map((file, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              draggable: true,
              onDragStart: () => {
                dragIdx.current = i;
              },
              onDragOver: (e) => e.preventDefault(),
              onDrop: () => {
                if (dragIdx.current !== null && dragIdx.current !== i) {
                  reorderFiles(dragIdx.current, i);
                  dragIdx.current = null;
                }
              },
              className: "flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-grab group",
              "data-ocid": `imagetopdf.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
                previews[i] && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: previews[i],
                    alt: file.name,
                    className: "w-12 h-12 rounded object-cover flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: file.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    (file.size / 1024).toFixed(0),
                    " KB · Page ",
                    i + 1
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeFile(i),
                    className: "opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-all",
                    "data-ocid": `imagetopdf.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                  }
                )
              ]
            },
            `${file.name}-${file.lastModified}`
          )) }),
          processing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", "data-ocid": "imagetopdf.loading_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Converting..." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                Math.round(progress),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleConvert,
              disabled: processing || files.length === 0,
              className: "btn-gradient w-full justify-center mt-4",
              "data-ocid": "imagetopdf.primary_button",
              children: processing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                " Converting..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                " Convert to PDF"
              ] })
            }
          )
        ] })
      ] })
    }
  );
}
export {
  ImageToPdf as default
};
