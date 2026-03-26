import { r as reactExports, j as jsxRuntimeExports, b as FileOutput, a as FileUpload, L as LoaderCircle, u as ue } from "./index-IUYQHNyl.js";
import { P as Progress } from "./progress-4NstpYYH.js";
import { u as useFileUpload, T as ToolLayout } from "./useFileUpload-Do2hdrWh.js";
import { M as Monitor } from "./monitor-BWYrzn7B.js";
function PdfToWord() {
  const { files, addFiles } = useFileUpload(["pdf"]);
  const [processing, setProcessing] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [done, setDone] = reactExports.useState(false);
  const handleProcess = () => {
    if (files.length === 0) return;
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
      title: "PDF to Word",
      description: "Convert PDF documents to editable Word files.",
      icon: FileOutput,
      iconColor: "#3b82f6",
      iconBg: "rgba(59,130,246,0.12)",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileUpload,
          {
            onFiles: addFiles,
            accept: "application/pdf",
            multiple: false,
            formats: ["PDF"],
            label: "Drop a PDF file here"
          }
        ),
        files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-card space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileOutput, { className: "w-8 h-8", style: { color: "#3b82f6" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: files[0].name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                (files[0].size / 1024).toFixed(0),
                " KB"
              ] })
            ] })
          ] }),
          processing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "pdftoword.loading_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Analyzing PDF..." }),
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
              className: "text-center p-6 bg-muted/30 rounded-xl",
              "data-ocid": "pdftoword.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-12 h-12 mx-auto mb-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Server-Side Processing Required" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "PDF to Word conversion requires server-side processing. Download our desktop app for full functionality." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-gradient",
                    "data-ocid": "pdftoword.secondary_button",
                    children: "Get Desktop App"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleProcess,
              disabled: processing,
              className: "btn-gradient w-full justify-center",
              "data-ocid": "pdftoword.primary_button",
              children: processing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                " Processing..."
              ] }) : "Convert to Word"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  PdfToWord as default
};
