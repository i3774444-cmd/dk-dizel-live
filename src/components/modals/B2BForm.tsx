import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download, CheckCircle } from "lucide-react";
import SuccessScreen from "./SuccessScreen";

const volumes = ["до 10 ед/мес", "10–50 ед/мес", "более 50 ед/мес"];
const serviceOptions = ["Ремонт Common Rail", "Чистка DPF", "Забор курьером"];

interface Props {
  onClose: () => void;
}

const B2BForm = ({ onClose }: Props) => {
  const [company, setCompany] = useState("");
  const [volume, setVolume] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("+375");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const toggleService = (s: string) => {
    setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!company.trim()) newErrors.company = true;
    if (phone.replace(/\D/g, "").length < 12) newErrors.phone = true;
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    const text = encodeURIComponent(
      `B2B заявка с сайта DK Diesel\nКомпания: ${company}\nОбъём: ${volume || "не указан"}\nУслуги: ${services.join(", ") || "не указаны"}\nКонтакт: ${contactPerson}\nТелефон: ${phone}\n\nЗапрос оптового прайса (PDF)`
    );
    window.open(`https://wa.me/375291440040?text=${text}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen onClose={onClose} message="Оптовый прайс будет отправлен на указанный номер" />;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-xl font-bold mb-1">Спец-условия для СТО и Автопарков</h3>
        <p className="text-sm text-muted-foreground">Оставьте контакт — отправим оптовый прайс (PDF)</p>
      </div>

      {/* Company */}
      <div>
        <label className="text-sm font-medium mb-1.5 block">Название компании *</label>
        <Input
          ref={inputRef}
          placeholder="ООО «Автосервис»"
          value={company}
          onChange={(e) => { setCompany(e.target.value); setErrors((p) => ({ ...p, company: false })); }}
          className={`h-12 rounded-xl ${errors.company ? "border-destructive" : ""}`}
        />
      </div>

      {/* Volume */}
      <div>
        <label className="text-sm font-medium mb-2 block">Объём</label>
        <div className="flex flex-wrap gap-2">
          {volumes.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVolume(v)}
              className={`px-3 py-2 text-xs rounded-xl border transition-all font-mono font-medium ${
                volume === v
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground hover:border-primary/50"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <label className="text-sm font-medium mb-2 block">Услуги</label>
        <div className="space-y-2.5">
          {serviceOptions.map((s) => (
            <label key={s} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={services.includes(s)}
                onCheckedChange={() => toggleService(s)}
              />
              <span className="text-sm">{s}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Контактное лицо</label>
          <Input
            placeholder="Имя"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="h-12 rounded-xl"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Телефон *</label>
          <Input
            type="tel"
            placeholder="+375..."
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: false })); }}
            className={`h-12 rounded-xl font-mono ${errors.phone ? "border-destructive" : ""}`}
          />
        </div>
      </div>
      {errors.phone && <p className="text-xs text-destructive -mt-3">Введите корректный номер</p>}

      {/* Info block */}
      <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 flex items-start gap-3">
        <Download className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Оптовый прайс (PDF)</p>
          <p className="text-xs text-muted-foreground">Будет отправлен на указанный номер после отправки заявки</p>
        </div>
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full h-14 rounded-xl text-base">
        <FileText className="h-5 w-5 mr-2" />
        Получить оптовый прайс
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <a href="/privacy" target="_blank" className="text-primary hover:underline">
          политикой конфиденциальности
        </a>
      </p>
    </motion.form>
  );
};

export default B2BForm;
