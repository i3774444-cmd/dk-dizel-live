import { motion } from "framer-motion";
import { Star, ExternalLink, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const YANDEX_REVIEWS_URL =
  "https://yandex.com/maps/org/dk_dizel/245607316948/reviews/?ll=27.412966%2C53.901712&mode=search&sll=4.638846%2C52.388735&sspn=0.130463%2C0.054405&tab=reviews&text=%D0%94%D0%9A%20%D0%94%D0%B8%D0%B7%D0%B5%D0%BB%D1%8C&z=9";

const reviews = [
  {
    name: "Алексей К.",
    rating: 5,
    date: "Март 2025",
    text: "Отличный сервис! Промыли сажевый фильтр на Passat B7 — машина поехала как новая. Всё объяснили, показали замеры до и после. Рекомендую.",
    car: "VW Passat B7",
  },
  {
    name: "Дмитрий С.",
    rating: 5,
    date: "Февраль 2025",
    text: "Ремонтировал форсунки на Sprinter. Сделали за один день, дали протокол испытаний. Цена адекватная, качество на уровне. Буду обращаться ещё.",
    car: "Mercedes Sprinter",
  },
  {
    name: "Сергей П.",
    rating: 4,
    date: "Январь 2025",
    text: "Делали диагностику турбины. Нашли проблему быстро, предложили два варианта решения. Всё прозрачно, без навязывания лишних услуг.",
    car: "BMW X5 E70",
  },
  {
    name: "Игорь Л.",
    rating: 5,
    date: "Декабрь 2024",
    text: "Приехал с горящим Check Engine, проблема была в форсунках. Ребята разобрались за полчаса, отремонтировали на следующий день. Гарантию дали 12 месяцев.",
    car: "Hyundai Santa Fe",
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < count ? "fill-primary text-primary" : "text-muted fill-muted"
        }`}
      />
    ))}
  </div>
);

const ReviewsBlock = () => {
  return (
    <section className="container py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Отзывы клиентов</h2>
          <p className="text-muted-foreground">
            Реальные отзывы на{" "}
            <a
              href={YANDEX_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Яндекс.Картах
            </a>
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
            <Star className="h-4 w-4 text-primary fill-primary/40" />
          </div>
          <span className="font-mono font-bold text-sm">4.4</span>
        </div>
      </div>

      {/* Desktop: grid, Mobile: horizontal scroll */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-sm:flex max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:-mx-4 max-sm:px-4 max-sm:gap-3 max-sm:pb-2">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-5 flex flex-col max-sm:min-w-[280px] max-sm:snap-start"
          >
            <Quote className="h-5 w-5 text-primary/30 mb-3" />
            <p className="text-sm leading-relaxed flex-1 mb-4">{review.text}</p>
            <div className="border-t border-border pt-3 mt-auto">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{review.name}</span>
                <Stars count={review.rating} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">{review.car}</span>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline-muted" className="rounded-xl" asChild>
          <a href={YANDEX_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            Все отзывы на Яндекс.Картах
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>
    </section>
  );
};

export default ReviewsBlock;
