import { motion } from "motion/react";

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-10">Last updated: March 2026</p>
        <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
          <Section title="1. Overview">
            <p>
              ToolKit Pro is committed to protecting your privacy. This policy
              explains how we handle information when you use our tools.
            </p>
          </Section>
          <Section title="2. No File Uploads">
            <p>
              All file processing in ToolKit Pro happens entirely within your
              web browser using HTML5 Canvas and Web APIs.{" "}
              <strong>Your files are never uploaded to our servers.</strong> We
              have no access to the content of any files you process.
            </p>
          </Section>
          <Section title="3. Information We Collect">
            <p>
              We collect minimal anonymous usage data to improve our services:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Pages visited and tools used (anonymized)</li>
              <li>Browser type and general location (country level)</li>
              <li>Performance metrics to optimize tool speed</li>
            </ul>
          </Section>
          <Section title="4. Cookies">
            <p>
              We use essential cookies for theme preference storage (dark/light
              mode). We may use analytics cookies from third-party services. You
              can disable cookies in your browser settings.
            </p>
          </Section>
          <Section title="5. Third-Party Services">
            <p>
              We may display advertisements through Google AdSense, which uses
              cookies to serve relevant ads. Please refer to Google's Privacy
              Policy for details on how they handle data.
            </p>
          </Section>
          <Section title="6. Contact Form">
            <p>
              If you use our contact form, we store your name, email, subject,
              and message to respond to your inquiry. This data is kept securely
              and not shared with third parties.
            </p>
          </Section>
          <Section title="7. Contact">
            <p>
              For privacy questions, contact us at:{" "}
              <a
                href="mailto:privacy@toolkitpro.app"
                className="text-primary hover:underline"
              >
                privacy@toolkitpro.app
              </a>
            </p>
          </Section>
        </div>
      </motion.div>
    </div>
  );
}
