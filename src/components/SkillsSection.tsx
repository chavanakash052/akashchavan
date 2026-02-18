import { motion } from "framer-motion";

const technicalSkills = [
  "Georeferencing & Digitization",
  "Geodatabase & Shapelayer Creation",
  "Geoprocessing & Spatial Analysis",
  "Map Layout & Cartography",
  "Attribute Data Management",
  "Topology Correction",
];

const software = [
  { name: "ArcGIS", level: 90 },
  { name: "QGIS", level: 85 },
  { name: "Google Earth Pro", level: 80 },
  { name: "AutoCAD", level: 75 },
];

const equipment = [
  "Leica GS16",
  "Trimble R12",
  "LiDAR Pegasus System",
  "GNSS Survey Equipment",
];

const languages = ["Marathi", "Hindi", "English"];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16 text-gradient"
        >
          Skills & Tools
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-card p-8 shadow-card"
          >
            <h3 className="font-display text-xl font-semibold mb-6 text-card-foreground">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {technicalSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Software */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-card p-8 shadow-card"
          >
            <h3 className="font-display text-xl font-semibold mb-6 text-card-foreground">
              Software Proficiency
            </h3>
            <div className="space-y-4">
              {software.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-card-foreground">{s.name}</span>
                    <span className="text-muted-foreground">{s.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full bg-hero-gradient"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Equipment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-card p-8 shadow-card"
          >
            <h3 className="font-display text-xl font-semibold mb-6 text-card-foreground">
              Equipment & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {equipment.map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary"
                >
                  {e}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-card p-8 shadow-card"
          >
            <h3 className="font-display text-xl font-semibold mb-6 text-card-foreground">
              Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {languages.map((l) => (
                <span
                  key={l}
                  className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
                >
                  {l}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
