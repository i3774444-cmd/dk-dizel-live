import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import MessengerLinks from "@/components/MessengerLinks";

const StickyMobileCTA = () => {
  const { openModal } = useModal();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/80 backdrop-blur-lg border-t border-border md:hidden">
      <div className="flex gap-2 items-center">
        <Button variant="hero" className="flex-1 h-12 rounded-xl" onClick={() => openModal("calculator")}>
          Получить расчёт
        </Button>
        <MessengerLinks size="sm" />
        <Button variant="outline-muted" className="h-12 w-12 rounded-xl p-0 shrink-0" asChild>
          <a href="tel:+375291440040">
            <Phone className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
