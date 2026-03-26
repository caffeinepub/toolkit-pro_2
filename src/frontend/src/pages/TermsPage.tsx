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

export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-10">Last updated: March 2026</p>
        <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
          <Section title="1. Acceptance">
            <p>
              By using ToolKit Pro, you agree to these terms. If you do not
              agree, please do not use our services.
            </p>
          </Section>
          <Section title="2. Service Description">
            <p>
              ToolKit Pro provides browser-based PDF and image processing tools.
              All tools are provided "as is" without warranties of any kind.
            </p>
          </Section>
          <Section title="3. Acceptable Use">
            <p>
              You agree to use ToolKit Pro only for lawful purposes. You must
              not:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Use the service to process illegal content</li>
              <li>Attempt to reverse-engineer or exploit the platform</li>
              <li>Use automated tools to abuse the service</li>
            </ul>
          </Section>
          <Section title="4. Intellectual Property">
            <p>
              You retain full ownership of all files you process through ToolKit
              Pro. We claim no rights over your files or their content.
            </p>
          </Section>
          <Section title="5. Limitation of Liability">
            <p>
              ToolKit Pro is not liable for any loss of data, corruption of
              files, or damages arising from the use of our tools. Always keep
              backups of important files before processing.
            </p>
          </Section>
          <Section title="6. Advertising">
            <p>
              ToolKit Pro is supported by advertising. By using the service, you
              agree to the display of relevant advertisements.
            </p>
          </Section>
          <Section title="7. Changes">
            <p>
              We may update these terms at any time. Continued use of the
              service constitutes acceptance of the updated terms.
            </p>
          </Section>
          <Section title="8. Contact">
            <p>
              Questions about these terms:{" "}
              <a
                href="mailto:legal@toolkitpro.app"
                className="text-primary hover:underline"
              >
                legal@toolkitpro.app
              </a>
            </p>
          </Section>
        </div>
      </motion.div>
    </div>
  );
}
