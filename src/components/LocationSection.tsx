import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationSection = () => {
  return (
    <section className="container py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Как добраться</h2>
      <p className="text-muted-foreground mb-10">Район ст. м. Каменная Горка</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Map embed */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-border aspect-[4/3] md:aspect-auto"
        >
          <iframe
            src="https://yandex.ru/map-widget/v1/?pt=27.4494,53.9081&z=16&l=map"
            width="100%"
            height="100%"
            className="min-h-[300px] md:min-h-full"
            style={{ border: 0 }}
            loading="lazy"
            title="DK Diesel на карте"
          />
        </motion.div>

        {/* Info + buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">г. Минск, ул. Брикета, 17Б</p>
                <p className="text-sm text-muted-foreground">район ст. м. Каменная Горка</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-medium">Пн–Сб: 9:00–19:00</p>
                <p className="text-sm text-muted-foreground">Вс — выходной</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <a href="tel:+375291440040" className="font-mono font-semibold hover:text-primary transition-colors">
                +375 29 144-00-40
              </a>
            </div>
          </div>

          {/* Route buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline-muted" className="h-12 rounded-xl" asChild>
              <a
                href="yandexnavi://build_route_on_map?lat_to=53.9081&lon_to=27.4494"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Яндекс.Навигатор
              </a>
            </Button>
            <Button variant="outline-muted" className="h-12 rounded-xl" asChild>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=53.9081,27.4494"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Google Maps
              </a>
            </Button>
          </div>

          {/* Video route placeholder */}
          <div className="glass-card rounded-2xl p-6 flex items-center gap-4 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Navigation className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Видео-маршрут</p>
              <p className="text-xs text-muted-foreground">Ваш маршрут за 30 секунд</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
