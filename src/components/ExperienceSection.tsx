import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "GIS Analyst",
    company: "Quantox Technologies Pvt. Ltd.",
    period: "Sep 2024 – Present",
    tasks: [
      "Parcel digitization & infrastructure mapping",
      "Property taxation GIS database creation",
      "Road, river & utilities mapping",
      "Map layout and spatial data management",
    ],
  },
  {
    title: "GIS Data Operator",
    company: "JMK Infosoft Solutions",
    period: "Feb 2024 – Jul 2024",
    tasks: [
      "Drone survey property digitization",
      "Attribute & area calculation",
      "Cadastral correction & georeferencing",
    ],
  },
  {
    title: "GIS Executive",
    company: "Genesys International Corp. Ltd.",
    period: "Oct 2022 – Feb 2024",
    tasks: [
      "Google mapping & road network planning",
      "SHP & geodatabase management",
      "Spatial data validation & analysis",
      "Map visualization & stakeholder delivery",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-background grid-topo">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16 text-gradient"
        >
          Professional Experience
        </motion.h2>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-6 top-1 h-5 w-5 rounded-full bg-hero-gradient border-4 border-background" />

                <div className="rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <h3 className="font-display font-semibold text-lg text-card-foreground">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="text-primary font-medium text-sm mb-1">{exp.company}</p>
                  <p className="text-muted-foreground text-sm mb-4">{exp.period}</p>
                  <ul className="space-y-1.5">
                    {exp.tasks.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
