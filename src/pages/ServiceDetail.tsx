import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, ChevronDown, Clock, Car, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewsCompact from "@/components/ReviewsCompact";
import { servicesData, getServiceBySlug } from "@/data/services";
import { getCasesByService } from "@/data/cases";
import { useState } from "react";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openModal } = useModal();
  const service = getServiceBySlug(slug || "");

  if (!service) return <Navigate to="/services" replace />;

  const related = service.relatedSlugs
    .map((s) => servicesData.find((d) => d.slug === s))
    .filter(Boolean);

  const cases = getCasesByService(service.slug);

  return (
    <div className="grain">
      <Breadcrumbs
        items={[
          { label: "Услуги", path: "/services" },
          { label: service.shortTitle },
        ]}
      />

      {/* Hero */}
      <section className="container pt-4 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <service.icon className="h-6 w-6 text-primary" />
            </div>
            <span className="font-mono text-primary font-bold text-lg">{service.price}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{service.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">{service.heroDescription}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="hero" size="lg" className="h-14 sm:h-13 rounded-xl text-base" onClick={() => openModal("individual")}>
              Записаться на ремонт
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline-muted" size="lg" className="h-14 sm:h-13 rounded-xl" onClick={() => openModal("calculator")}>
              Рассчитать стоимость
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Description + Features */}
      <section className="container pb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold mb-4">Описание</h2>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Что включено</h3>
            <ul className="space-y-3">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="container pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6">Этапы работ</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.process.map((p, i) => (
              <div key={i} className="glass-card rounded-xl p-5 flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-mono text-sm font-bold text-primary">{i + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-sm mb-0.5">{p.step}</p>
                  <p className="text-xs text-muted-foreground">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="container pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6">Частые вопросы</h2>
          <div className="space-y-3 max-w-2xl">
            {service.faq.map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Compact reviews */}
      <section className="container pb-12">
        <ReviewsCompact />
      </section>

      {/* Related cases */}
      {cases.length > 0 && (
        <section className="container pb-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold">Примеры работ</h2>
            <Link to="/cases" className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1">
              Все работы <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {cases.slice(0, 2).map((caseItem) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card texture-dots rounded-2xl p-5"
              >
                <h3 className="font-bold mb-1">{caseItem.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Car className="h-3.5 w-3.5" />
                  <span className="font-mono">{caseItem.vehicle}</span>
                </div>
                <div className="rounded-xl bg-primary/5 border border-primary/10 p-3 mb-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Результат</p>
                  <p className="text-sm font-medium text-primary">{caseItem.result}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-mono">{caseItem.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wrench className="h-3.5 w-3.5" />
                    <span className="font-mono font-semibold text-foreground">{caseItem.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container pb-12">
        <div className="rounded-2xl bg-foreground p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 grain" />
          <div className="relative z-10 max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-background mb-3">
              Готовы записаться?
            </h2>
            <p className="text-background/60 mb-6">
              Оставьте заявку — перезвоним за 7 минут и рассчитаем точную стоимость
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="hero" size="lg" className="h-14 sm:h-12 rounded-xl" onClick={() => openModal("individual")}>
                Записаться
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button
                size="lg"
                className="h-14 sm:h-12 rounded-xl border border-background/30 bg-transparent text-background hover:bg-background/15 hover:text-background"
                asChild
              >
                <Link to="/contacts">Контакты и карта</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="container pb-16">
        <h2 className="text-2xl font-bold mb-6">Другие услуги</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {related.map((r) => r && (
            <Link
              key={r.slug}
              to={`/services/${r.slug}`}
              className="glass-card rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/5 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <r.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-mono text-sm text-primary font-semibold">{r.price}</span>
              </div>
              <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{r.shortTitle}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{r.heroDescription}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left text-sm font-medium"
      >
        {question}
        <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
