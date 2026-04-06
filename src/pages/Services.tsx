import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import { servicesData } from "@/data/services";

const Services = () => {
  const { openModal } = useModal();

  return (
    <div className="grain">
      <Breadcrumbs items={[{ label: "Услуги" }]} />

      <section className="container pt-4 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Наши услуги</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Полный цикл диагностики и ремонта дизельных систем. Оригинальное оборудование, сертифицированные специалисты.
          </p>
        </motion.div>
      </section>

      <section className="container pb-16 space-y-8">
        {servicesData.map((service, i) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{service.title}</h2>
                    <span className="font-mono text-primary font-semibold"><span className="nowrap">{service.price}</span></span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.heroDescription}</p>

                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Что включено</h3>
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 5).map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" className="h-14 sm:h-11 rounded-xl text-base sm:text-sm" asChild>
                    <Link to={`/services/${service.slug}`}>
                      Подробнее
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                  <Button variant="outline-muted" className="h-14 sm:h-11 rounded-xl text-base sm:text-sm" onClick={() => openModal("individual")}>
                    Записаться
                  </Button>
                </div>
              </div>

              <div className="lg:w-80 shrink-0">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Этапы работ</h3>
                <div className="space-y-3">
                  {service.process.map((p, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="font-mono text-xs font-bold text-primary">{j + 1}</span>
                      </div>
                      <span className="text-sm">{p.step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Cross-link */}
      <section className="container pb-16">
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/about" className="glass-card rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all group">
            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">О нашем оборудовании</h3>
            <p className="text-sm text-muted-foreground">Bosch EPS-815, Hartridge CRi-PC и другое сертифицированное оборудование</p>
          </Link>
          <Link to="/contacts" className="glass-card rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all group">
            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">Контакты и карта</h3>
            <p className="text-sm text-muted-foreground">Минск, ул. Брикета, 17Б — рядом с м. Каменная Горка</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;