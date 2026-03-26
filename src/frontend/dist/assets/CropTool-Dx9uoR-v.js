import { r as reactExports, j as jsxRuntimeExports, w as Crop, a as FileUpload, l as Label, I as Input, D as Download, u as ue } from "./index-IUYQHNyl.js";
import { u as useFileUpload, T as ToolLayout } from "./useFileUpload-Do2hdrWh.js";
function CropTool() {
  const { files, previews, addFiles } = useFileUpload(["image"]);
  const [x, setX] = reactExports.useState(0);
  const [y, setY] = reactExports.useState(0);
  const [cropW, setCropW] = reactExports.useState(0);
  const [cropH, setCropH] = reactExports.useState(0);
  const [imgSize, setImgSize] = reactExports.useState({ w: 0, h: 0 });
  const previewRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!previews[0]) return;
    const img = new Image();
    img.onload = () => {
      setImgSize({ w: img.width, h: img.height });
      setCropW(img.width);
      setCropH(img.height);
      setX(0);
      setY(0);
      drawPreview(img, 0, 0, img.width, img.height);
    };
    img.src = previews[0];
  }, [previews]);
  const drawPreview = (img, cx, cy, cw, ch) => {
    if (!previewRef.current) return;
    const canvas = previewRef.current;
    const maxW = 480;
    const scale = Math.min(maxW / cw, 1);
    canvas.width = cw * scale;
    canvas.height = ch * scale;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, canvas.width, canvas.height);
  };
  reactExports.useEffect(() => {
    if (!previews[0] || !previewRef.current) return;
    const canvas = previewRef.current;
    const img = new Image();
    const maxW = 480;
    img.onload = () => {
      const cw = cropW || imgSize.w || img.width;
      const ch = cropH || imgSize.h || img.height;
      const scale = Math.min(maxW / cw, 1);
      canvas.width = cw * scale;
      canvas.height = ch * scale;
      canvas.getContext("2d").drawImage(img, x, y, cw, ch, 0, 0, canvas.width, canvas.height);
    };
    img.src = previews[0];
  }, [x, y, cropW, cropH, previews, imgSize.w, imgSize.h]);
  const handleDownload = () => {
    if (!previews[0] || !files[0]) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropW || imgSize.w;
      canvas.height = cropH || imgSize.h;
      canvas.getContext("2d").drawImage(
        img,
        x,
        y,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `cropped_${files[0].name}`;
        a.click();
        URL.revokeObjectURL(url);
        ue.success("Cropped image downloaded!");
      }, "image/png");
    };
    img.src = previews[0];
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolLayout,
    {
      title: "Crop Tool",
      description: "Crop images to precise dimensions using coordinate inputs.",
      icon: Crop,
      iconColor: "#ec4899",
      iconBg: "rgba(236,72,153,0.12)",
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 shadow-card space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Original: ",
              imgSize.w,
              " × ",
              imgSize.h,
              "px"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "X offset (px)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: 0,
                    max: imgSize.w,
                    value: x,
                    onChange: (e) => setX(Number(e.target.value)),
                    "data-ocid": "crop.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Y offset (px)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: 0,
                    max: imgSize.h,
                    value: y,
                    onChange: (e) => setY(Number(e.target.value)),
                    "data-ocid": "crop.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Width (px)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: 1,
                    max: imgSize.w - x,
                    value: cropW,
                    onChange: (e) => setCropW(Number(e.target.value)),
                    "data-ocid": "crop.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Height (px)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: 1,
                    max: imgSize.h - y,
                    value: cropH,
                    onChange: (e) => setCropH(Number(e.target.value)),
                    "data-ocid": "crop.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleDownload,
                className: "btn-gradient w-full justify-center",
                "data-ocid": "crop.primary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  " Download Cropped"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-4 shadow-card flex items-center justify-center min-h-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "canvas",
            {
              ref: previewRef,
              className: "max-w-full max-h-72 rounded-lg border border-border"
            }
          ) })
        ] })
      ] })
    }
  );
}
export {
  CropTool as default
};
