import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, x as RotateCw, a as FileUpload, D as Download, u as ue } from "./index-IUYQHNyl.js";
import { u as useFileUpload, T as ToolLayout } from "./useFileUpload-Do2hdrWh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3", key: "1i73f7" }],
  ["path", { d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3", key: "saxlbk" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 14v2", key: "8jcxud" }],
  ["path", { d: "M12 8v2", key: "1woqiv" }],
  ["path", { d: "M12 2v2", key: "tus03m" }]
];
const FlipHorizontal = createLucideIcon("flip-horizontal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3", key: "14bfxa" }],
  ["path", { d: "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3", key: "14rx03" }],
  ["path", { d: "M4 12H2", key: "rhcxmi" }],
  ["path", { d: "M10 12H8", key: "s88cx1" }],
  ["path", { d: "M16 12h-2", key: "10asgb" }],
  ["path", { d: "M22 12h-2", key: "14jgyd" }]
];
const FlipVertical = createLucideIcon("flip-vertical", __iconNode);
function RotateTool() {
  const { files, previews, addFiles } = useFileUpload(["image"]);
  const [rotation, setRotation] = reactExports.useState(0);
  const [flipH, setFlipH] = reactExports.useState(false);
  const [flipV, setFlipV] = reactExports.useState(false);
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!previews[0] || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const maxSize = 400;
    const img = new Image();
    img.onload = () => {
      const rad = rotation * Math.PI / 180;
      const absRot = rotation % 360;
      const swapped = absRot === 90 || absRot === 270;
      const iw = img.width;
      const ih = img.height;
      const cw = swapped ? ih : iw;
      const ch = swapped ? iw : ih;
      const scale = Math.min(maxSize / cw, maxSize / ch, 1);
      canvas.width = cw * scale;
      canvas.height = ch * scale;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(
        img,
        -iw * scale / 2,
        -ih * scale / 2,
        iw * scale,
        ih * scale
      );
      ctx.restore();
    };
    img.src = previews[0];
  }, [previews, rotation, flipH, flipV]);
  const handleDownload = () => {
    if (!canvasRef.current || !files[0]) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rotated_${files[0].name}`;
      a.click();
      URL.revokeObjectURL(url);
      ue.success("Image downloaded!");
    }, "image/png");
  };
  const rotate = (deg) => setRotation((r) => (r + deg + 360) % 360);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolLayout,
    {
      title: "Rotate Image",
      description: "Rotate or flip images in any direction with live preview.",
      icon: RotateCw,
      iconColor: "#14b8a6",
      iconBg: "rgba(20,184,166,0.12)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileUpload,
          {
            onFiles: addFiles,
            accept: "image/*",
            multiple: false,
            formats: ["JPG", "PNG", "WEBP"]
          }
        ),
        files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 shadow-card space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Rotate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
              { label: "90° CW", action: () => rotate(90) },
              { label: "90° CCW", action: () => rotate(-90) },
              { label: "180°", action: () => rotate(180) }
            ].map((btn) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: btn.action,
                className: "py-2 px-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors",
                "data-ocid": "rotate.button",
                children: btn.label
              },
              btn.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground pt-2", children: "Flip" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setFlipH((f) => !f),
                  className: `py-2 px-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${flipH ? "border-primary text-white" : "border-border text-foreground hover:bg-accent"}`,
                  style: flipH ? {
                    background: "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)"
                  } : {},
                  "data-ocid": "rotate.toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FlipHorizontal, { className: "w-4 h-4" }),
                    " Horizontal"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setFlipV((f) => !f),
                  className: `py-2 px-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${flipV ? "border-primary text-white" : "border-border text-foreground hover:bg-accent"}`,
                  style: flipV ? {
                    background: "linear-gradient(135deg, #4a8bff 0%, #7a4cff 100%)"
                  } : {},
                  "data-ocid": "rotate.toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FlipVertical, { className: "w-4 h-4" }),
                    " Vertical"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Current rotation: ",
              rotation,
              "°"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleDownload,
                className: "btn-gradient w-full justify-center mt-2",
                "data-ocid": "rotate.primary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  " Download"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-4 shadow-card flex items-center justify-center min-h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "canvas",
            {
              ref: canvasRef,
              className: "max-w-full max-h-80 rounded-lg border border-border"
            }
          ) })
        ] })
      ] })
    }
  );
}
export {
  RotateTool as default
};
