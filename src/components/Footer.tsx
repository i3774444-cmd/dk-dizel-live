import { Link } from "react-router-dom";
import MessengerLinks from "@/components/MessengerLinks";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card pb-24 md:pb-0">
      <div className="container py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">DK</span>
              </div>
              <span className="font-bold text-lg">ДК Дизель</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Профессиональный ремонт дизельных систем и чистка сажевых фильтров в Минске.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-bold text-sm mb-3">Навигация</p>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Главная", path: "/" },
                { label: "Услуги", path: "/services" },
                { label: "О компании", path: "/about" },
                { label: "Контакты", path: "/contacts" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-bold text-sm mb-3">Контакты</p>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>г. Минск, ул. Брикета, 17Б</p>
              <p>Пн–Сб: 9:00–19:00</p>
              <a href="tel:+375291440040" className="font-mono hover:text-primary transition-colors block">
                +375 29 144-00-40
              </a>
              <MessengerLinks size="sm" className="mt-2" />
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} ДК Дизель. Все права защищены.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Политика конфиденциальности
            </Link>
            <span>Минск, ул. Брикета, 17Б</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
