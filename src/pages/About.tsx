import { motion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import about from "@/data/about.json";

const About = () => {
  return (
    <div className="grain">
      <Breadcrumbs items={[{ label: "О компании" }]} />
      <section className="container py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">О компании</h1>
          <div className="glass-card rounded-2xl p-8">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{about.text}</p>
            <h2 className="text-2xl font-bold mb-4">Оборудование</h2>
            <p className="text-muted-foreground">{about.equipment}</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
