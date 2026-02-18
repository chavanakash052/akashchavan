import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:chavanakash052@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
    window.open(mailtoLink);
  };

  return (
    <section id="contact" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16 text-gradient"
        >
          Get in Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-display text-xl font-semibold text-foreground">Let's Connect</h3>
            <p className="text-muted-foreground">
              I'm always open to discussing GIS projects, geospatial analysis opportunities, or collaborations.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "chavanakash052@gmail.com", href: "mailto:chavanakash052@gmail.com" },
                { icon: Phone, label: "+91 9762667194", href: "tel:+919762667194" },
                { icon: MapPin, label: "Karad, Maharashtra, India", href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Embedded map */}
            <div className="rounded-xl overflow-hidden shadow-card mt-6">
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30725.04!2d74.18!3d17.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc183e5c6c98a39%3A0x77fb25a9a6c18e3c!2sKarad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-xl bg-card p-8 shadow-card space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1.5">Name</label>
              <input
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1.5">Email</label>
              <input
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1.5">Message</label>
              <textarea
                required
                maxLength={1000}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-hero-gradient px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
