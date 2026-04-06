import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, ChevronDown } from "lucide-react";

import SuccessScreen from "./SuccessScreen";

const issueChips = [
  "Горит DPF/Check",
  "Чёрный дым",
  "Плохо заводится",
  "Стук в форсунках",
  "Плановое ТО",
];

const brandGroups = [
  {
    label: "Легковые",
    brands: ["BMW", "Audi", "VW", "Mercedes", "Hyundai", "Kia", "Toyota", "Renault", "Peugeot", "Opel"],
  },
  {
    label: "Коммерческие",
    brands: ["MAN", "DAF", "Scania", "Volvo", "Iveco", "MB Sprinter", "VW Crafter", "Ford Transit"],
  },
];

interface Props {
  onClose: () => void;
}

const IndividualForm = ({ onClose }: Props) => {
  const [vehicle, setVehicle] = useState("");
  const [issues, setIssues] = useState<string[]>([]);
  const [phone, setPhone] = useState("+375");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [showAllBrands, setShowAllBrands] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const toggleIssue = (issue: string) => {
    setIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue]
    );
  };

  const handleBrandClick = (brand: string) => {
    setVehicle(brand + " ");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (phone.replace(/\D/g, "").length < 12) newErrors.phone = true;
    if (!vehicle.trim()) newErrors.vehicle = true;
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    const text = encodeURIComponent(
      `Заявка с сайта DK Diesel\nАвто: ${vehicle}\nПроблемы: ${issues.join(", ") || "не указаны"}\nТелефон: ${phone}`
    );
    window.open(`https://wa.me/375291440040?text=${text}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen onClose={onClose} />;

  // Show first 8 brands by default, all on expand
  const visibleBrands = showAllBrands ? brandGroups : [{ label: "", brands: brandGroups[0].brands.slice(0, 6) }];

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-xl font-bold mb-1">Запись на диагностику и ремонт</h3>
        <p className="text-sm text-muted-foreground">Заполните форму — перезвоним за 7 минут</p>
      </div>

      {/* Vehicle */}
      <div>
        <label className="text-sm font-medium mb-1.5 block">Марка и модель авто *</label>
        <Input
          ref={inputRef}
          placeholder="Например: VW Passat B7 2.0 TDI или MAN TGX"
          value={vehicle}
          onChange={(e) => { setVehicle(e.target.value); setErrors((p) => ({ ...p, vehicle: false })); }}
          className={`h-12 rounded-xl ${errors.vehicle ? "border-destructive" : ""}`}
        />
        {errors.vehicle && <p className="text-xs text-destructive mt-1">Укажите марку и модель</p>}

        <div className="mt-2 space-y-2">
          <AnimatePresence mode="wait">
            {showAllBrands ? (
              <motion.div
                key="all"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                {brandGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-xs text-muted-foreground font-medium mb-1.5">{group.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.brands.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => handleBrandClick(b)}
                          className="px-3 py-1.5 text-xs rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="short" className="flex flex-wrap gap-1.5 items-center">
                {visibleBrands[0].brands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => handleBrandClick(b)}
                    className="px-3 py-1.5 text-xs rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                  >
                    {b}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowAllBrands(true)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors font-medium inline-flex items-center gap-1 text-muted-foreground"
                >
                  Ещё
                  <ChevronDown className="h-3 w-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Issues */}
      <div>
        <label className="text-sm font-medium mb-2 block">Симптом / услуга</label>
        <div className="flex flex-wrap gap-2">
          {issueChips.map((issue) => (
            <button
              key={issue}
              type="button"
              onClick={() => toggleIssue(issue)}
              className={`px-4 py-3 text-sm rounded-xl border transition-all font-medium ${
                issues.includes(issue)
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border text-foreground hover:border-primary/50"
              }`}
            >
              {issue}
            </button>
          ))}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm font-medium mb-1.5 block">Телефон *</label>
        <Input
          type="tel"
          placeholder="+375 29 123-45-67"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: false })); }}
          className={`h-12 rounded-xl font-mono ${errors.phone ? "border-destructive" : ""}`}
        />
        {errors.phone && (
          <p className="text-xs text-destructive mt-1">Введите корректный номер телефона</p>
        )}
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full h-14 rounded-xl text-base">
        <Send className="h-5 w-5 mr-2" />
        Записаться и получить приоритет
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

export default IndividualForm;
