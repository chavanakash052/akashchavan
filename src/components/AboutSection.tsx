import { motion } from "framer-motion";
import { Target, Globe, Satellite } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background grid-topo">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-gradient">
            About Me
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-10">
            To obtain a position in a progressive organization where I can use my GIS, remote sensing,
            and surveying skills to support spatial data management, mapping, and infrastructure planning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Target, title: "Precision Mapping", desc: "Expert in georeferencing, digitization, and spatial analysis with industry-standard tools." },
            { icon: Globe, title: "Geospatial Data", desc: "Skilled in geodatabase creation, attribute management, and topology correction." },
            { icon: Satellite, title: "Remote Sensing", desc: "Experienced with drone surveys, LiDAR systems, and GNSS equipment for field data collection." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-hero-gradient text-white">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-card-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
