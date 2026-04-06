import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle, Calculator } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";

const LeadForm = () => {
  const { openModal } = useModal();

  return (
    <section className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl bg-foreground p-8 md:p-12 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5 grain" />
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-3">
            Получите расчёт стоимости
          </h2>
          <p className="text-background/60 mb-8">
            Оставьте заявку — перезвоним за 7 минут и рассчитаем стоимость ремонта
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="hero"
              size="lg"
              className="h-14 sm:h-12 rounded-xl flex-1 text-base"
              onClick={() => openModal("calculator")}
            >
              <Calculator className="h-5 w-5 mr-2" />
              Рассчитать стоимость
            </Button>
            <Button
              size="lg"
              className="h-14 sm:h-12 rounded-xl flex-1 border border-background/30 bg-transparent text-background hover:bg-background/15 hover:text-background text-base"
              onClick={() => openModal("individual")}
            >
              <Send className="h-5 w-5 mr-2" />
              Записаться
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LeadForm;
