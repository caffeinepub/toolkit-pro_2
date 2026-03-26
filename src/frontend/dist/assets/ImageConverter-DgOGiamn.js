import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as FileOutput, a as FileUpload, L as LoaderCircle, D as Download, u as ue } from "./index-IUYQHNyl.js";
import { P as Progress } from "./progress-4NstpYYH.js";
import { u as useFileUpload, T as ToolLayout } from "./useFileUpload-Do2hdrWh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function ImageConverter() {
  const { files, previews, addFiles, clearFiles } = useFileUpload(["image"]);
  const [mode, setMode] = reactExports.useState("jpg-to-png");
  const [processing, setProcessing] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [results, setResults] = reactExports.useState([]);
  const handleConvert = async () => {
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
      const ctx = canvas.getContext("2d");
      if (mode === "png-to-jpg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const mimeType = mode === "jpg-to-png" ? "image/png" : "image/jpeg";
      const ext = mode === "jpg-to-png" ? "png" : "jpg";
      const blob = await new Promise(
        (res) => canvas.toBlob((b) => res(b), mimeType, 0.92)
      );
      const baseName = file.name.replace(/\.[^.]+$/, "");
      output.push({
        name: `${baseName}.${ext}`,
        url: URL.createObjectURL(blob)
      });
      setProgress((i + 1) / files.length * 100);
    }
    setResults(output);
    setProcessing(false);
    ue.success(
      `${output.length} file${output.length !== 1 ? "s" : ""} converted!`
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolLayout,
    {
      title: "Image Converter",
      description: "Convert between JPG and PNG formats with perfect quality.",
      icon: FileOutput,
      iconColor: "#22c55e",
      iconBg: "rgba(34,197,94,0.12)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-4 flex gap-3 shadow-card", children: ["jpg-to-png", "png-to-jpg"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setMode(m),
            className: `flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${mode === m ? "text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-accent"}`,
            style: mode === m ? {
              background: "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)"
            } : {},
            "data-ocid": "converter.tab",
            children: m === "jpg-to-png" ? "JPG → PNG" : "PNG → JPG"
          },
          m
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileUpload,
          {
            onFiles: addFiles,
            accept: mode === "jpg-to-png" ? "image/jpeg" : "image/png",
            formats: mode === "jpg-to-png" ? ["JPG", "JPEG"] : ["PNG"]
          }
        ),
        files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
            files.length,
            " file",
            files.length !== 1 ? "s" : "",
            " ready"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: previews.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: url,
              alt: files[i].name,
              className: "w-16 h-16 rounded-lg object-cover border border-border"
            },
            url || i
          )) }),
          processing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", "data-ocid": "converter.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleConvert,
                disabled: processing,
                className: "btn-gradient flex-1 justify-center",
                "data-ocid": "converter.primary_button",
                children: processing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  " Converting..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                  " Convert"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: clearFiles,
                className: "px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:bg-accent transition-colors",
                children: "Clear"
              }
            )
          ] })
        ] }),
        results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-2xl p-4 shadow-card",
            "data-ocid": "converter.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Converted Files" }),
                results.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: downloadAll,
                    className: "text-xs btn-gradient",
                    "data-ocid": "converter.secondary_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                      " Download All"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: results.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between p-2 rounded-lg bg-muted/50",
                  "data-ocid": `converter.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: r.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: r.url,
                        download: r.name,
                        className: "text-xs btn-gradient",
                        "data-ocid": `converter.primary_button.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                          " Download"
                        ]
                      }
                    )
                  ]
                },
                r.name
              )) })
            ]
          }
        )
      ] })
    }
  );
}
export {
  ImageConverter as default
};
