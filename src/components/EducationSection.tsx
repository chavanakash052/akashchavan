import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";

const EducationSection = () => {
  const { data } = usePortfolio();
  return (
    <section id="education" className="py-24 bg-background grid-topo">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16 text-gradient"
        >
          Education
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {data.education.map((e, i) => (
            <motion.div
              key={e.degree + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-card p-6 shadow-card"
            >
              <GraduationCap className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-display font-semibold text-card-foreground mb-1">{e.degree}</h3>
              {e.institution && <p className="text-sm text-muted-foreground mb-2">{e.institution}</p>}
              {e.score && (
                <span className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
                  {e.score}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
