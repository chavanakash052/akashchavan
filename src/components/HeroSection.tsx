import { motion } from "framer-motion";
import { MapPin, Download, ChevronDown, Linkedin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";
import { usePortfolio } from "@/hooks/usePortfolio";

const HeroSection = () => {
  const { data, resumeUrl } = usePortfolio();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mx-auto mb-6 h-36 w-36 rounded-full overflow-hidden border-4 border-white/30 shadow-lg"
          >
            <img src={profilePhoto} alt={data.name} className="h-full w-full object-cover" />
          </motion.div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">{data.name}</h1>
          <p className="text-lg md:text-xl text-white/80 font-medium mb-2">{data.title}</p>
          <p className="flex items-center justify-center gap-2 text-white/60 mb-8">
            <MapPin className="h-4 w-4" />
            {data.location}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-hero-gradient px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Get in Touch
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            )}
            <a
              href="https://www.linkedin.com/in/akash-chavan-53a8541b9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 text-white/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
