import { Star, ExternalLink } from "lucide-react";

const YANDEX_REVIEWS_URL =
  "https://yandex.com/maps/org/dk_dizel/245607316948/reviews/?ll=27.412966%2C53.901712&mode=search&sll=4.638846%2C52.388735&sspn=0.130463%2C0.054405&tab=reviews&text=%D0%94%D0%9A%20%D0%94%D0%B8%D0%B7%D0%B5%D0%BB%D1%8C&z=9";

const ReviewsCompact = () => {
  return (
    <div className="glass-card rounded-xl px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div className="flex gap-0.5">
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
          <Star className="h-4 w-4 text-primary fill-primary/40" />
        </div>
        <span className="font-mono font-bold text-sm">4.4</span>
        <span className="text-sm text-muted-foreground">· 120+ отзывов</span>
      </div>
      <a
        href={YANDEX_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary hover:underline inline-flex items-center gap-1.5 font-medium"
      >
        Яндекс.Карты
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
};

export default ReviewsCompact;
