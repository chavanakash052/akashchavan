import { motion } from "framer-motion";
import { MapPin, Download, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mx-auto mb-6 h-28 w-28 rounded-full bg-hero-gradient flex items-center justify-center text-primary-foreground text-4xl font-display font-bold"
          >
            AC
          </motion.div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Akash Dinkar Chavan
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-medium mb-2">
            GIS Analyst & Geospatial Professional
          </p>
          <p className="flex items-center justify-center gap-2 text-white/60 mb-8">
            <MapPin className="h-4 w-4" />
            Karad, Maharashtra, India
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-hero-gradient px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Get in Touch
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <Download className="h-4 w-4" />
              View Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
