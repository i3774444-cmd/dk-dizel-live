import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Building2, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";

const audiences = {
  auto: {
    icon: Car,
    title: "Для автовладельцев",
    tabLabel: "Автовладельцам",
    features: [
      "Бесплатная диагностика при ремонте",
      "Подменный автомобиль на время ремонта",
      <span key="1"><span className="nowrap">Гарантия 12 месяцев</span> на все работы</span>,
      "Прозрачная смета до начала работ",
      "Запчасти в наличии — ремонт за 1 день",
    ],
    modal: "individual" as const,
    cta: "Записаться",
  },
  b2b: {
    icon: Building2,
    title: "Для СТО и Автопарков",
    tabLabel: "СТО и Парки",
    features: [
      "Работа с НДС, полный пакет документов",
      "Бесплатный забор агрегатов курьером",
      "Протоколы испытаний СТБ/РСТ",
      <span key="1"><span className="nowrap">Скидки от 15%</span> при объёме</span>,
      "Приоритетное обслуживание по договору",
    ],
    modal: "b2b" as const,
    cta: "Стать партнёром",
  },
};

const AudienceSwitcher = () => {
  const [active, setActive] = useState<"auto" | "b2b">("auto");
  const { openModal } = useModal();

  return (
    <section className="container py-16">
      <div className="inline-grid grid-cols-2 gap-2 mb-8 w-full sm:w-auto">
        {(["auto", "b2b"] as const).map((key) => {
          const audience = audiences[key];
          const Icon = audience.icon;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-medium transition-all text-sm ${
                active === key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card text-foreground border border-border hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{audience.tabLabel}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold mb-6">{audiences[active].title}</h3>
          <ul className="grid sm:grid-cols-2 gap-4 mb-6">
            {audiences[active].features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            variant="hero"
            className="h-14 sm:h-11 rounded-xl text-base sm:text-sm"
            onClick={() => openModal(audiences[active].modal)}
          >
            {audiences[active].cta}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default AudienceSwitcher;