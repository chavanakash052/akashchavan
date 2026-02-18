import { motion } from "framer-motion";
import { Map, Plane, Building2, Crosshair, Mountain } from "lucide-react";

const projects = [
  {
    icon: Plane,
    title: "SVAMITVA Drone Survey Mapping",
    desc: "Comprehensive drone-based property mapping for rural land records under the SVAMITVA scheme.",
  },
  {
    icon: Building2,
    title: "Property Taxation GIS Projects",
    desc: "Created geospatial databases for municipal property taxation and infrastructure planning.",
  },
  {
    icon: Mountain,
    title: "3D City Jaipur LiDAR Survey",
    desc: "Participated in large-scale LiDAR point cloud processing for 3D city model generation.",
  },
  {
    icon: Crosshair,
    title: "Ground Control Point (GCP) Collection",
    desc: "Field GCP acquisition using GNSS receivers for accurate georeferencing of aerial imagery.",
  },
  {
    icon: Map,
    title: "Drone Survey Mapping of Dams & Assets",
    desc: "High-resolution drone mapping for dam inspection and asset inventory management.",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16 text-gradient"
        >
          Projects & Field Experience
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-hero-gradient group-hover:text-white transition-colors">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-card-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
