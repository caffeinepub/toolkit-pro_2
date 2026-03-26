import { r as reactExports, j as jsxRuntimeExports, S as Scissors, a as FileUpload, l as Label, I as Input, L as LoaderCircle, u as ue } from "./index-IUYQHNyl.js";
import { P as Progress } from "./progress-4NstpYYH.js";
import { u as useFileUpload, T as ToolLayout } from "./useFileUpload-Do2hdrWh.js";
import { M as Monitor } from "./monitor-BWYrzn7B.js";
function SplitPdf() {
  const { files, addFiles } = useFileUpload(["pdf"]);
  const [splitAt, setSplitAt] = reactExports.useState("1");
  const [processing, setProcessing] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [done, setDone] = reactExports.useState(false);
  const handleSplit = () => {
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
      title: "Split PDF",
      description: "Split a large PDF into smaller individual files.",
      icon: Scissors,
      iconColor: "#dc2626",
      iconBg: "rgba(220,38,38,0.12)",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-8 h-8", style: { color: "#dc2626" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: files[0].name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                (files[0].size / 1024).toFixed(0),
                " KB"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: 'Split after page number (e.g. "3" or "3,7,12")' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: splitAt,
                onChange: (e) => setSplitAt(e.target.value),
                placeholder: "Page numbers separated by commas",
                "data-ocid": "splitpdf.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: 'e.g. "3" splits into pages 1-3 and 4-end' })
          ] }),
          processing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "splitpdf.loading_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Splitting PDF..." }),
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
              "data-ocid": "splitpdf.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-10 h-10 mx-auto mb-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: "Server-Side Processing Required" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "PDF splitting requires server-side processing. Get our desktop app for full functionality." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-gradient",
                    "data-ocid": "splitpdf.secondary_button",
                    children: "Get Desktop App"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleSplit,
              disabled: processing,
              className: "btn-gradient w-full justify-center",
              "data-ocid": "splitpdf.primary_button",
              children: processing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                " Splitting..."
              ] }) : "Split PDF"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  SplitPdf as default
};
