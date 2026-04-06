import { motion } from "framer-motion";
import { CheckCircle2, Navigation, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SuccessScreenProps {
  onClose: () => void;
  message?: string;
}

const SuccessScreen = ({ onClose, message }: SuccessScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-4"
    >
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-bold mb-2">Спасибо!</h3>
      <p className="text-muted-foreground text-sm mb-8 max-w-xs">
        {message || <>Мастер свяжется с вами в течение <span className="font-mono font-semibold text-foreground">7 минут</span>.</>}
      </p>

      <div className="w-full space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Пока ждёте — постройте маршрут
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline-muted" className="h-14 rounded-xl" asChild>
            <a
              href="yandexnavi://build_route_on_map?lat_to=53.9081&lon_to=27.4494"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation className="h-5 w-5 mr-2" />
              Яндекс.Карты
            </a>
          </Button>
          <Button variant="outline-muted" className="h-14 rounded-xl" asChild>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=53.9081,27.4494"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Google Maps
            </a>
          </Button>
        </div>
        <Button
          variant="ghost"
          className="w-full h-12 text-muted-foreground"
          onClick={onClose}
        >
          Закрыть
        </Button>
      </div>
    </motion.div>
  );
};

export default SuccessScreen;
