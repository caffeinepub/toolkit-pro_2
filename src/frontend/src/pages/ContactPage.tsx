import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, MessageSquare, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export default function ContactPage() {
  const { actor, isFetching } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSending(true);
    try {
      if (actor) {
        await actor.submitForm(
          form.name,
          form.email,
          form.subject || "General Inquiry",
          form.message,
        );
      }
      setSent(true);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <div
                className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                style={{ background: "rgba(74,139,255,0.12)" }}
              >
                <Mail className="w-5 h-5" style={{ color: "#4a8bff" }} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">
                hello@toolkitpro.app
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <div
                className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                style={{ background: "rgba(139,92,246,0.12)" }}
              >
                <MessageSquare
                  className="w-5 h-5"
                  style={{ color: "#8b5cf6" }}
                />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                Response Time
              </h3>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4"
              data-ocid="contact.panel"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    data-ocid="contact.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subject: e.target.value }))
                  }
                  data-ocid="contact.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  data-ocid="contact.textarea"
                />
              </div>
              <button
                type="submit"
                className="btn-gradient w-full justify-center"
                disabled={sending || isFetching || sent}
                data-ocid="contact.submit_button"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : sent ? (
                  "Message Sent!"
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
              {sent && (
                <p
                  className="text-center text-sm text-green-600 dark:text-green-400"
                  data-ocid="contact.success_state"
                >
                  ✓ Thank you! We'll be in touch soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
