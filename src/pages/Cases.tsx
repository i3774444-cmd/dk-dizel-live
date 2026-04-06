import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Car, Wrench } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { casesData } from "@/data/cases";
import { servicesData } from "@/data/services";

const Cases = () => {
  return (
    <div className="grain">
      <Breadcrumbs items={[{ label: "Наши работы" }]} />

      <section className="container pt-4 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Наши работы</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Примеры реальных ремонтов с описанием проблемы, решения и результата
          </p>
        </motion.div>
      </section>

      <section className="container pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {casesData.map((caseItem, i) => {
            const service = servicesData.find((s) => s.slug === caseItem.serviceSlug);
            return (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-card texture-dots rounded-2xl p-6 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{caseItem.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Car className="h-3.5 w-3.5" />
                      <span className="font-mono">{caseItem.vehicle}</span>
                    </div>
                  </div>
                  {service && (
                    <Link
                      to={`/services/${service.slug}`}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      {service.shortTitle}
                    </Link>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Проблема</p>
                    <p className="text-sm">{caseItem.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Решение</p>
                    <p className="text-sm">{caseItem.solution}</p>
                  </div>
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Результат</p>
                    <p className="text-sm font-medium text-primary">{caseItem.result}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-mono">{caseItem.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wrench className="h-3.5 w-3.5" />
                    <span className="font-mono font-semibold text-foreground"><span className="nowrap">{caseItem.price}</span></span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Cases;