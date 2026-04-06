import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Crosshair, Wind, Gauge, ArrowRight, ArrowLeft, Lock } from "lucide-react";
import SuccessScreen from "./SuccessScreen";

const systems = [
  {
    id: "injectors",
    label: "Форсунки",
    icon: Crosshair,
    variants: [
      { label: "Количество форсунок", type: "number" as const, presets: [1, 2, 3, 4, 6, 8, 10, 12], placeholder: "Введите количество" },
    ],
    basePrice: 120,
  },
  {
    id: "dpf",
    label: "DPF / Сажевый фильтр",
    icon: Wind,
    variants: [
      { label: "Тип авто", type: "choice" as const, options: ["Легковой", "Внедорожник / SUV", "Коммерческий / Грузовой"] },
    ],
    basePrice: 250,
  },
  {
    id: "turbo",
    label: "Турбина",
    icon: Gauge,
    variants: [
      { label: "Тип работ", type: "choice" as const, options: ["Диагностика", "Ремонт актуатора", "Ремонт картриджа"] },
    ],
    basePrice: 80,
  },
];

interface Props {
  onClose: () => void;
}

const CalculatorForm = ({ onClose }: Props) => {
  const [step, setStep] = useState(1);
  const [system, setSystem] = useState("");
  const [variant, setVariant] = useState("");
  const [customCount, setCustomCount] = useState("");
  const [phone, setPhone] = useState("+375");
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLInputElement>(null);

  const selectedSystem = systems.find((s) => s.id === system);
  const variantConfig = selectedSystem?.variants[0];

  const getCount = () => {
    if (variantConfig?.type === "number") {
      return parseInt(customCount) || 1;
    }
    const opts = variantConfig?.options;
    if (opts) {
      const idx = opts.indexOf(variant);
      return idx >= 0 ? idx + 1 : 1;
    }
    return 1;
  };

  const calcPrice = () => {
    if (!selectedSystem) return 0;
    return selectedSystem.basePrice * getCount();
  };

  const getVariantLabel = () => {
    if (variantConfig?.type === "number") return `${customCount} шт.`;
    return variant;
  };

  useEffect(() => {
    if (step === 3) phoneRef.current?.focus();
    if (step === 2 && variantConfig?.type === "number") countRef.current?.focus();
  }, [step, variantConfig?.type]);

  const handleSubmit = () => {
    if (phone.replace(/\D/g, "").length < 12) { setPhoneError(true); return; }
    const text = encodeURIComponent(
      `Расчёт с сайта DK Diesel\nСистема: ${selectedSystem?.label}\nТип: ${getVariantLabel()}\nОценка: от ${calcPrice()} BYN\nТелефон: ${phone}`
    );
    window.open(`https://wa.me/375291440040?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const canProceedStep2 = () => {
    if (variantConfig?.type === "number") {
      const n = parseInt(customCount);
      return n > 0 && n <= 99;
    }
    return !!variant;
  };

  if (submitted) return <SuccessScreen onClose={onClose} />;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold mb-1">Расчёт стоимости</h3>
        <p className="text-sm text-muted-foreground">Узнайте предварительную стоимость за 3 шага</p>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
            <label className="text-sm font-medium">Шаг 1: Выберите систему</label>
            {systems.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => { setSystem(s.id); setVariant(""); setCustomCount(""); setStep(2); }}
                className={`w-full flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${
                  system === s.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="font-medium">{s.label}</span>
                  <span className="block text-sm text-muted-foreground font-mono"><span className="nowrap">от {s.basePrice} BYN</span></span>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {step === 2 && selectedSystem && variantConfig && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
            <label className="text-sm font-medium">Шаг 2: {variantConfig.label}</label>

            {variantConfig.type === "number" && (
              <>
                <div className="flex flex-wrap gap-2">
                  {variantConfig.presets.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => { setCustomCount(String(n)); }}
                      className={`px-4 py-3 text-sm rounded-xl border transition-all font-mono font-medium min-w-[3.5rem] ${
                        customCount === String(n)
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div>
                  <Input
                    ref={countRef}
                    type="number"
                    min={1}
                    max={99}
                    placeholder={variantConfig.placeholder}
                    value={customCount}
                    onChange={(e) => setCustomCount(e.target.value)}
                    className="h-12 rounded-xl font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Можно указать любое количество</p>
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  disabled={!canProceedStep2()}
                  onClick={() => setStep(3)}
                  className="w-full h-12 rounded-xl"
                >
                  Далее <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </>
            )}

            {variantConfig.type === "choice" && variantConfig.options?.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setVariant(t); setStep(3); }}
                className={`w-full p-5 rounded-xl border text-left font-medium transition-all ${
                  variant === t
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            ))}

            <Button variant="ghost" size="lg" onClick={() => setStep(1)} className="text-muted-foreground h-12">
              <ArrowLeft className="h-4 w-4 mr-1" /> Назад
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            {/* Price result */}
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">Предварительная стоимость</p>
              <p className="text-3xl font-bold font-mono text-primary"><span className="nowrap">от {calcPrice()} BYN</span></p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="nowrap">{selectedSystem?.label} · {getVariantLabel()}</span>
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Телефон для фиксации цены *</label>
              <Input
                ref={phoneRef}
                type="tel"
                placeholder="+375 29 123-45-67"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setPhoneError(false); }}
                className={`h-12 rounded-xl font-mono ${phoneError ? "border-destructive" : ""}`}
              />
              {phoneError && <p className="text-xs text-destructive mt-1">Введите корректный номер</p>}
            </div>

            <Button onClick={handleSubmit} variant="hero" size="lg" className="w-full h-14 rounded-xl text-base">
              <Lock className="h-5 w-5 mr-2" />
              Зафиксировать цену
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <a href="/privacy" target="_blank" className="text-primary hover:underline">
                политикой конфиденциальности
              </a>
            </p>
            <Button variant="ghost" size="lg" onClick={() => setStep(2)} className="text-muted-foreground w-full h-12">
              <ArrowLeft className="h-4 w-4 mr-1" /> Назад
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalculatorForm;