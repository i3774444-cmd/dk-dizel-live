export interface CaseData {
  id: string;
  serviceSlug: string;
  title: string;
  vehicle: string;
  problem: string;
  solution: string;
  result: string;
  duration: string;
  price: string;
}

export const casesData: CaseData[] = [
  {
    id: "case-1",
    serviceSlug: "injectors",
    title: "Восстановление 4 форсунок Bosch",
    vehicle: "VW Passat B7 2.0 TDI",
    problem: "Повышенный расход топлива, чёрный дым при разгоне, неравномерная работа двигателя",
    solution: "Диагностика на стенде Bosch EPS-815, замена распылителей и обратных клапанов, калибровка подачи",
    result: "Расход снижен с 9.2 до 6.8 л/100 км, дым устранён, двигатель работает ровно",
    duration: "1 день",
    price: "480 BYN",
  },
  {
    id: "case-2",
    serviceSlug: "injectors",
    title: "Ремонт форсунок Delphi на Sprinter",
    vehicle: "Mercedes Sprinter 316 CDI",
    problem: "Стук форсунок на холодную, затруднённый пуск, ошибки по давлению в рампе",
    solution: "Замена управляющих клапанов, притирка седла, калибровка на стенде",
    result: "Пуск с первого раза, стук устранён, ошибки не возвращаются",
    duration: "1 день",
    price: "720 BYN",
  },
  {
    id: "case-3",
    serviceSlug: "dpf",
    title: "Чистка DPF на BMW X5",
    vehicle: "BMW X5 E70 3.0d",
    problem: "Горит лампа DPF, аварийный режим, потеря мощности на трассе",
    solution: "Термическая регенерация при 600°C, химическая промывка, замер противодавления до/после",
    result: "Противодавление снижено с 187 до 32 мбар, лампа погашена, мощность восстановлена",
    duration: "2 дня",
    price: "350 BYN",
  },
  {
    id: "case-4",
    serviceSlug: "dpf",
    title: "Восстановление FAP на Peugeot 308",
    vehicle: "Peugeot 308 1.6 HDi",
    problem: "Частые попытки регенерации, высокий расход масла, запах гари",
    solution: "Демонтаж, двойная термо-химическая обработка, эндоскопическая проверка керамики",
    result: "Фильтр восстановлен до 95% пропускной способности, регенерация в штатном режиме",
    duration: "2 дня",
    price: "300 BYN",
  },
  {
    id: "case-5",
    serviceSlug: "turbo",
    title: "Ремонт турбины с заменой картриджа",
    vehicle: "Audi A6 C7 3.0 TDI",
    problem: "Свист турбины, масло в интеркулере, падение наддува",
    solution: "Замена картриджа, динамическая балансировка ротора, замена уплотнений",
    result: "Давление наддува в норме, свист устранён, масложор прекратился",
    duration: "3 дня",
    price: "850 BYN",
  },
  {
    id: "case-6",
    serviceSlug: "turbo",
    title: "Ремонт актуатора турбины",
    vehicle: "Hyundai Tucson 2.0 CRDi",
    problem: "Ошибка по наддуву, турбина не выходит на полное давление",
    solution: "Диагностика актуатора, замена электромотора, калибровка геометрии",
    result: "Полное давление наддува восстановлено, ошибки сброшены",
    duration: "1 день",
    price: "280 BYN",
  },
  {
    id: "case-7",
    serviceSlug: "injector-cleaning",
    title: "Промывка 6 форсунок на Touareg",
    vehicle: "VW Touareg 3.0 TDI",
    problem: "Неравномерная работа на холостых, вибрация, повышенный расход",
    solution: "Ультразвуковая промывка 40 кГц, проверка распыла, замена уплотнений",
    result: "Равномерная работа, расход снижен на 1.2 л/100 км, вибрация устранена",
    duration: "4 часа",
    price: "360 BYN",
  },
];

export const getCasesByService = (serviceSlug: string) =>
  casesData.filter((c) => c.serviceSlug === serviceSlug);
