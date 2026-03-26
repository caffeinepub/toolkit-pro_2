import { c as createLucideIcon, j as jsxRuntimeExports, B as Link, r as reactExports, u as ue } from "./index-IUYQHNyl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function ToolLayout({
  title,
  description,
  icon: Icon,
  iconColor,
  iconBg,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors",
        "data-ocid": "tool.link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Tools"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0",
          style: { background: iconBg },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-7 h-7", style: { color: iconColor } })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: description })
      ] })
    ] }),
    children
  ] }) });
}
const MAX_SIZE = 10 * 1024 * 1024;
function useFileUpload(acceptedTypes) {
  const [files, setFiles] = reactExports.useState([]);
  const [previews, setPreviews] = reactExports.useState([]);
  const addFiles = reactExports.useCallback(
    (newFiles) => {
      var _a;
      const arr = Array.from(newFiles);
      const valid = [];
      for (const f of arr) {
        if (f.size > MAX_SIZE) {
          ue.error(`"${f.name}" exceeds 10MB file size limit`);
          continue;
        }
        if (acceptedTypes && acceptedTypes.length > 0) {
          const ext = ((_a = f.name.split(".").pop()) == null ? void 0 : _a.toLowerCase()) ?? "";
          const ok = acceptedTypes.some(
            (t) => f.type.includes(t) || t.toLowerCase().includes(ext)
          );
          if (!ok) {
            ue.error(`"${f.name}" is not a supported file type`);
            continue;
          }
        }
        valid.push(f);
      }
      const newPreviews = valid.map(
        (f) => f.type.startsWith("image/") ? URL.createObjectURL(f) : ""
      );
      setFiles((prev) => [...prev, ...valid]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
    [acceptedTypes]
  );
  const removeFile = reactExports.useCallback((index) => {
    setPreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);
  const clearFiles = reactExports.useCallback(() => {
    setPreviews((prev) => {
      for (const url of prev) {
        if (url) URL.revokeObjectURL(url);
      }
      return [];
    });
    setFiles([]);
  }, []);
  const reorderFiles = reactExports.useCallback((fromIdx, toIdx) => {
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
export {
  ToolLayout as T,
  useFileUpload as u
};
