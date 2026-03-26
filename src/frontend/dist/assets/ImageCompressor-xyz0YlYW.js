import { r as reactExports, j as jsxRuntimeExports, M as Minimize2, a as FileUpload, L as LoaderCircle, D as Download, u as ue } from "./index-IUYQHNyl.js";
import { P as Progress } from "./progress-4NstpYYH.js";
import { S as Slider } from "./slider-Cm_ir9DZ.js";
import { u as useFileUpload, T as ToolLayout } from "./useFileUpload-Do2hdrWh.js";
import "./index-DxfjJGHn.js";
function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
function ImageCompressor() {
  const { files, previews, addFiles } = useFileUpload(["image"]);
  const [quality, setQuality] = reactExports.useState(80);
  const [processing, setProcessing] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [results, setResults] = reactExports.useState([]);
  const handleCompress = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);
    const output = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const img = await new Promise((res, rej) => {
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
      canvas.getContext("2d").drawImage(img, 0, 0);
      const blob = await new Promise(
        (res) => canvas.toBlob((b) => res(b), "image/jpeg", quality / 100)
      );
      const ext = file.type === "image/png" ? "jpg" : file.name.split(".").pop() ?? "jpg";
      const baseName = file.name.replace(/\.[^.]+$/, "");
      output.push({
        name: `${baseName}_compressed.${ext}`,
        url: URL.createObjectURL(blob),
        original: file.size,
        compressed: blob.size
      });
      setProgress((i + 1) / files.length * 100);
    }
    setResults(output);
    setProcessing(false);
    ue.success("Images compressed successfully!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolLayout,
    {
      title: "Image Compressor",
      description: "Reduce image file size while maintaining visual quality.",
      icon: Minimize2,
      iconColor: "#f59e0b",
      iconBg: "rgba(245,158,11,0.12)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileUpload,
          {
            onFiles: addFiles,
            accept: "image/*",
            multiple: true,
            formats: ["JPG", "PNG", "WEBP"]
          }
        ),
        files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-card space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Quality" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-sm font-bold px-2 py-0.5 rounded-lg text-white",
                  style: {
                    background: "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)"
                  },
                  children: [
                    quality,
                    "%"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Slider,
              {
                min: 10,
                max: 100,
                step: 5,
                value: [quality],
                onValueChange: ([v]) => setQuality(v),
                className: "w-full",
                "data-ocid": "compressor.toggle"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Smaller file" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Better quality" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: previews.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: url,
                alt: files[i].name,
                className: "w-20 h-20 rounded-lg object-cover border border-border"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 right-0 text-center text-[10px] text-muted-foreground", children: formatBytes(files[i].size) })
          ] }, url || i)) }),
          processing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "compressor.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleCompress,
              disabled: processing,
              className: "btn-gradient w-full justify-center",
              "data-ocid": "compressor.primary_button",
              children: processing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                " Compressing..."
              ] }) : "Compress Images"
            }
          )
        ] }),
        results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-2xl p-4 shadow-card",
            "data-ocid": "compressor.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Results" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: results.map((r, i) => {
                const savings = Math.round(
                  (1 - r.compressed / r.original) * 100
                );
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between p-3 rounded-xl bg-muted/50",
                    "data-ocid": `compressor.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: r.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                          formatBytes(r.original),
                          " →",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600 font-medium", children: formatBytes(r.compressed) }),
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600", children: [
                            "(-",
                            savings,
                            "%)"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "a",
                        {
                          href: r.url,
                          download: r.name,
                          className: "btn-gradient text-xs",
                          "data-ocid": `compressor.primary_button.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                            " Download"
                          ]
                        }
                      )
                    ]
                  },
                  r.name
                );
              }) })
            ]
          }
        )
      ] })
    }
  );
}
export {
  ImageCompressor as default
};
