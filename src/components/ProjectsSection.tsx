import { motion } from "framer-motion";
import { Map } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";

const ProjectsSection = () => {
  const { data } = usePortfolio();
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
          {data.projects.map((p, i) => (
            <motion.div
              key={p.title + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-hero-gradient group-hover:text-white transition-colors">
                <Map className="h-6 w-6" />
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
