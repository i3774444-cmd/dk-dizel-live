import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crosshair, Wind, Gauge, Droplets } from "lucide-react";
import services from "@/data/services.json";

const icons = {
  Crosshair: Crosshair,
  Wind: Wind,
  Gauge: Gauge,
  Droplets: Droplets,
};

const ServicesBento = () => {
  return (
    <section className="container py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Наши услуги</h2>
          <p className="text-muted-foreground">Полный цикл обслуживания дизельных систем</p>
        </div>
        <Link to="/services" className="hidden sm:block text-sm text-primary hover:underline font-medium">
          Все услуги →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {services.map((service, i) => {
          const Icon = icons[service.icon as keyof typeof icons];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"}
            >
              <Link
                to={`/services/${service.slug}`}
                className="block glass-card rounded-2xl p-6 cursor-pointer transition-shadow hover:shadow-xl hover:shadow-primary/5 h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-mono text-sm text-primary font-semibold">
                    <span className="nowrap">{service.price}</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-xs font-mono text-muted-foreground mb-3">{service.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="sm:hidden mt-6 text-center">
        <Link to="/services" className="text-sm text-primary hover:underline font-medium">
          Все услуги →
        </Link>
      </div>
    </section>
  );
};

export default ServicesBento;
