import { motion } from "framer-motion";
import { Star, Play, ExternalLink } from "lucide-react";
import stats from "@/data/stats.json";

const TrustBlock = () => {
  return (
    <section className="container py-16">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl overflow-hidden aspect-video flex items-center justify-center bg-foreground/5 relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors" />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
              <Play className="h-7 w-7 text-primary-foreground ml-1" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Процесс чистки DPF</span>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {/* Yandex Rating */}
          <a
            href="https://yandex.com/maps/org/dk_dizel/245607316948/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg hover:shadow-primary/5 transition-shadow"
          >
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
              <Star className="h-5 w-5 text-primary fill-primary/40" />
            </div>
            <div>
              <p className="font-mono text-lg font-bold">4.4 / 5.0</p>
              <p className="text-xs text-muted-foreground">Яндекс · 13 отзывов</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
          </a>

          {/* Partners */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">Работаем с техникой</p>
            <div className="flex items-center gap-8">
              {["MTZ", "MAZ", "BELAZ"].map((brand) => (
                <div key={brand} className="text-xl font-bold text-foreground/30 tracking-widest">
                  {brand}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card rounded-xl p-4 text-center">
                <p className="font-mono text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="nowrap">{stat.label}</span>
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBlock;
