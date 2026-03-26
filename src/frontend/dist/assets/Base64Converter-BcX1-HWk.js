import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, y as CodeXml, a as FileUpload, U as Upload, T as Textarea, D as Download, u as ue } from "./index-IUYQHNyl.js";
import { u as useFileUpload, T as ToolLayout } from "./useFileUpload-Do2hdrWh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
function Base64Converter() {
  const { files, addFiles, clearFiles } = useFileUpload(["image"]);
  const [base64String, setBase64String] = reactExports.useState("");
  const [decodedPreview, setDecodedPreview] = reactExports.useState(null);
  const [mode, setMode] = reactExports.useState("encode");
  const handleEncode = () => {
    if (!files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setBase64String(result);
      ue.success("Image encoded to Base64!");
    };
    reader.readAsDataURL(files[0]);
  };
  const handleDecode = () => {
    if (!base64String.trim()) return;
    try {
      const dataUrl = base64String.startsWith("data:") ? base64String : `data:image/png;base64,${base64String}`;
      setDecodedPreview(dataUrl);
      ue.success("Base64 decoded successfully!");
    } catch {
      ue.error("Invalid Base64 string");
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(base64String).then(() => ue.success("Copied to clipboard!"));
  };
  const handleDownloadDecoded = () => {
    if (!decodedPreview) return;
    const a = document.createElement("a");
    a.href = decodedPreview;
    a.download = "decoded_image.png";
    a.click();
    ue.success("Image downloaded!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolLayout,
    {
      title: "Base64 Converter",
      description: "Encode images to Base64 strings or decode Base64 back to images.",
      icon: CodeXml,
      iconColor: "#f97316",
      iconBg: "rgba(249,115,22,0.12)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-1 flex shadow-card", children: ["encode", "decode"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setMode(m),
            className: `flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all capitalize ${mode === m ? "text-white" : "text-muted-foreground hover:bg-accent"}`,
            style: mode === m ? {
              background: "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)"
            } : {},
            "data-ocid": "base64.tab",
            children: m === "encode" ? "Image → Base64" : "Base64 → Image"
          },
          m
        )) }),
        mode === "encode" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileUpload,
            {
              onFiles: (f) => {
                addFiles(f);
                setBase64String("");
              },
              accept: "image/*",
              multiple: false,
              formats: ["JPG", "PNG", "WEBP"]
            }
          ),
          files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: files[0].name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleEncode,
                    className: "btn-gradient text-xs",
                    "data-ocid": "base64.primary_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
                      " Encode"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: clearFiles,
                    className: "text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-accent",
                    children: "Clear"
                  }
                )
              ] })
            ] }),
            base64String && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: base64String,
                  readOnly: true,
                  rows: 6,
                  className: "font-mono text-xs",
                  "data-ocid": "base64.textarea"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleCopy,
                  className: "btn-gradient w-full justify-center mt-3",
                  "data-ocid": "base64.secondary_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                    " Copy Base64"
                  ]
                }
              )
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 shadow-card space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Paste Base64 String" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: base64String,
                onChange: (e) => {
                  setBase64String(e.target.value);
                  setDecodedPreview(null);
                },
                placeholder: "data:image/png;base64,... or just the base64 encoded string",
                rows: 6,
                className: "font-mono text-xs",
                "data-ocid": "base64.textarea"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleDecode,
                disabled: !base64String.trim(),
                className: "btn-gradient w-full justify-center",
                "data-ocid": "base64.primary_button",
                children: "Decode Image"
              }
            )
          ] }),
          decodedPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-2xl p-4 shadow-card text-center",
              "data-ocid": "base64.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: decodedPreview,
                    alt: "Decoded",
                    className: "max-h-64 mx-auto rounded-lg border border-border mb-3 object-contain"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleDownloadDecoded,
                    className: "btn-gradient",
                    "data-ocid": "base64.secondary_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                      " Download Image"
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ] })
    }
  );
}
export {
  Base64Converter as default
};
