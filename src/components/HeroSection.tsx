import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wrench, Shield, Clock } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import hero from "@/data/hero.json";

const HeroSection = () => {
  const { openModal } = useModal();

  return (
    <section className="relative grain min-h-[85vh] flex items-center overflow-hidden">
      <div className="container relative z-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-mono text-muted-foreground border border-border mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Минск · ул. Брикета, 17Б
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {hero.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            {hero.subtitle}{" "}
            <span className="font-mono text-foreground">
              <span className="nowrap">{hero.guarantee}</span>.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              variant="hero"
              size="lg"
              className="h-14 px-8 rounded-xl text-lg"
              onClick={() => openModal("calculator")}
            >
              Получить расчёт за 7 минут
            </Button>
            <Button variant="outline-muted" size="lg" className="h-14 px-8 rounded-xl" asChild>
              <a href="tel:+375291440040">
                +375 29 144-00-40
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {[
              { icon: Wrench, text: hero.badges[0] },
              { icon: Shield, text: <span className="nowrap">{hero.badges[1]}</span> },
              { icon: Clock, text: hero.badges[2] },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4 text-primary" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
