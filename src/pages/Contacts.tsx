import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, Navigation, MessageCircle, Send } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import contacts from "@/data/contacts.json";

const Contacts = () => {
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      toast.error("Укажите номер телефона");
      return;
    }
    const text = encodeURIComponent(
      `Заявка с сайта DK Diesel\nТелефон: ${phone}\nАвтомобиль: ${carModel || "не указан"}\nСообщение: ${message || "—"}`
    );
    window.open(`https://wa.me/${contacts.phone.replace(/\s/g, '')}?text=${text}`, "_blank");
    toast.success("Перенаправляем в WhatsApp...");
  };

  return (
    <div className="grain">
      <Breadcrumbs items={[{ label: "Контакты" }]} />

      <section className="container pt-4 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Контакты</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Свяжитесь с нами любым удобным способом или приезжайте на диагностику.
          </p>
        </motion.div>
      </section>

      <section className="container pb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info + map */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 space-y-5"
            >
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">{contacts.address}</p>
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
                <a href={`tel:${contacts.phone.replace(/\s/g, '')}`} className="font-mono font-semibold hover:text-primary transition-colors">
                  {contacts.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href={`mailto:${contacts.email}`} className="font-mono text-sm hover:text-primary transition-colors">
                  {contacts.email}
                </a>
              </div>
            </motion.div>

            {/* Route buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline-muted" className="h-14 sm:h-12 rounded-xl text-base sm:text-sm" asChild>
                <a href="yandexnavi://build_route_on_map?lat_to=53.9081&lon_to=27.4494" target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-5 w-5 mr-2" />
                  Яндекс.Навигатор
                </a>
              </Button>
              <Button variant="outline-muted" className="h-14 sm:h-12 rounded-xl text-base sm:text-sm" asChild>
                <a href="https://www.google.com/maps/dir/?api=1&destination=53.9081,27.4494" target="_blank" rel="noopener noreferrer">
                  <MapPin className="h-5 w-5 mr-2" />
                  Google Maps
                </a>
              </Button>
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-border aspect-[4/3]"
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?pt=27.4494,53.9081&z=16&l=map"
                width="100%"
                height="100%"
                className="min-h-[300px]"
                style={{ border: 0 }}
                loading="lazy"
                title="DK Diesel на карте"
              />
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 md:p-8 h-fit"
          >
            <h2 className="text-2xl font-bold mb-2">Оставить заявку</h2>
            <p className="text-sm text-muted-foreground mb-6">Заполните форму — перезвоним за 7 минут</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Телефон *</label>
                <Input
                  type="tel"
                  placeholder="+375 (__) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-14 sm:h-12 rounded-xl text-base"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Марка и модель авто</label>
                <Input
                  type="text"
                  placeholder="Например: VW Passat B7 2.0 TDI"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="h-14 sm:h-12 rounded-xl text-base"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Описание проблемы</label>
                <Textarea
                  placeholder="Опишите симптомы или укажите нужную услугу..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-xl min-h-[100px] resize-none"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full h-14 rounded-xl text-base">
                <Send className="h-5 w-5 mr-2" />
                Отправить заявку
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" target="_blank" className="text-primary hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
              <div className="flex gap-2">
                <Button variant="outline-muted" className="flex-1 h-14 sm:h-11 rounded-xl text-base sm:text-sm" asChild>
                  <a href={`https://wa.me/${contacts.phone.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline-muted" className="flex-1 h-14 sm:h-11 rounded-xl text-base sm:text-sm" asChild>
                  <a href={`https://t.me/+${contacts.phone.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                    <Send className="h-5 w-5 mr-2" />
                    Telegram
                  </a>
                </Button>
              </div>
            </form>

            {/* Requisites */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Реквизиты</h3>
              <div className="text-xs text-muted-foreground font-mono space-y-1">
                <p>ИП Кравцов Д.А.</p>
                <p>УНП: 192XXXXXXX</p>
                <p>р/с BY00 XXXX XXXX XXXX XXXX XXXX XXXX</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
