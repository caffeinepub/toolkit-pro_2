import { Globe, Heart, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">
            About ToolKit Pro
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We build fast, privacy-first tools that run entirely in your browser
            — no server uploads, no data collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: Shield,
              color: "#22c55e",
              title: "Privacy First",
              desc: "All processing happens in your browser. We never see your files.",
            },
            {
              icon: Zap,
              color: "#f59e0b",
              title: "Blazing Fast",
              desc: "HTML5 Canvas and Web APIs make conversions near-instant.",
            },
            {
              icon: Globe,
              color: "#3b82f6",
              title: "Works Everywhere",
              desc: "Any modern browser on any device. No installation needed.",
            },
            {
              icon: Heart,
              color: "#ec4899",
              title: "Built with Love",
              desc: "Crafted by developers who believe great tools should be free.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-2xl p-6 flex gap-4 shadow-card"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${item.color}18` }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-1">
                  {item.title}
                </h2>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            ToolKit Pro was born from a simple frustration: why should
            converting a JPG to PDF require creating an account, uploading your
            files to a stranger's server, and waiting for an email? The answer
            is: it shouldn't.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Modern browsers are incredibly powerful. HTML5 Canvas, the File API,
            and WebAssembly can handle image processing tasks that used to
            require dedicated software. We built ToolKit Pro to put that power
            directly in your hands.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every tool we offer processes your files 100% locally. Your photos,
            documents, and data stay on your device. We're committed to keeping
            the core tools free forever.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
