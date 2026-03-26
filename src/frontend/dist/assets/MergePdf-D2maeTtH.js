import { r as reactExports, j as jsxRuntimeExports, A as Merge, a as FileUpload, X, L as LoaderCircle, u as ue } from "./index-IUYQHNyl.js";
import { P as Progress } from "./progress-4NstpYYH.js";
import { u as useFileUpload, T as ToolLayout } from "./useFileUpload-Do2hdrWh.js";
import { M as Monitor } from "./monitor-BWYrzn7B.js";
function MergePdf() {
  const { files, addFiles, removeFile, clearFiles } = useFileUpload(["pdf"]);
  const [processing, setProcessing] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [done, setDone] = reactExports.useState(false);
  const handleMerge = () => {
    if (files.length < 2) {
      ue.error("Please add at least 2 PDF files to merge.");
      return;
    }
    setProcessing(true);
    setProgress(0);
    setDone(false);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setProcessing(false);
        setDone(true);
        ue.info("Server-side processing required.");
      }
    }, 200);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolLayout,
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into one unified document.",
      icon: Merge,
      iconColor: "#16a34a",
      iconBg: "rgba(22,163,74,0.12)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileUpload,
          {
            onFiles: addFiles,
            accept: "application/pdf",
            multiple: true,
            formats: ["PDF"],
            label: "Drop PDF files here"
          }
        ),
        files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-card space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground", children: [
              files.length,
              " PDF",
              files.length !== 1 ? "s" : "",
              " added"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: clearFiles,
                className: "text-xs text-muted-foreground hover:text-destructive",
                children: "Clear all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-60 overflow-y-auto", children: files.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-2.5 rounded-lg bg-muted/50",
              "data-ocid": `mergepdf.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Merge,
                  {
                    className: "w-4 h-4 text-muted-foreground flex-shrink-0",
                    style: { color: "#16a34a" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-foreground truncate", children: f.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  (f.size / 1024).toFixed(0),
                  "KB"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeFile(i),
                    className: "w-6 h-6 rounded-full hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive",
                    "data-ocid": `mergepdf.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                  }
                )
              ]
            },
            `${f.name}-${f.lastModified}`
          )) }),
          processing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "mergepdf.loading_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Merging PDFs..." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" })
          ] }),
          done ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center p-5 bg-muted/30 rounded-xl",
              "data-ocid": "mergepdf.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-10 h-10 mx-auto mb-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Server-Side Processing Required" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "PDF merging requires server-side processing. Get our desktop app for full functionality." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-gradient",
                    "data-ocid": "mergepdf.secondary_button",
                    children: "Get Desktop App"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleMerge,
              disabled: processing || files.length < 2,
              className: "btn-gradient w-full justify-center",
              "data-ocid": "mergepdf.primary_button",
              children: processing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                " Merging..."
              ] }) : "Merge PDFs"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  MergePdf as default
};
