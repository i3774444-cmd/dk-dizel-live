import Breadcrumbs from "@/components/Breadcrumbs";

const Privacy = () => {
  return (
    <div className="grain">
      <Breadcrumbs items={[{ label: "Политика конфиденциальности" }]} />

      <section className="container pt-4 pb-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты
            персональных данных пользователей сайта <strong className="text-foreground">dkdiesel.by</strong> (далее — Сайт),
            принадлежащего ИП Кравцов Д.А. (далее — Оператор).
          </p>

          <h2 className="text-xl font-bold text-foreground">1. Общие положения</h2>
          <p>
            Используя Сайт и предоставляя свои персональные данные через формы обратной связи,
            пользователь выражает согласие с условиями настоящей Политики.
          </p>

          <h2 className="text-xl font-bold text-foreground">2. Какие данные мы собираем</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Номер телефона</li>
            <li>Марка и модель автомобиля</li>
            <li>Описание проблемы или запроса</li>
            <li>Техническая информация (IP-адрес, тип браузера, cookies)</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground">3. Цели обработки данных</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Обработка заявок и обратная связь</li>
            <li>Расчёт стоимости услуг</li>
            <li>Улучшение качества обслуживания</li>
            <li>Выполнение требований законодательства</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground">4. Защита данных</h2>
          <p>
            Оператор принимает необходимые организационные и технические меры для защиты
            персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
          </p>

          <h2 className="text-xl font-bold text-foreground">5. Передача данных третьим лицам</h2>
          <p>
            Персональные данные не передаются третьим лицам, за исключением случаев,
            предусмотренных законодательством Республики Беларусь.
          </p>

          <h2 className="text-xl font-bold text-foreground">6. Права пользователя</h2>
          <p>
            Пользователь имеет право запросить информацию о хранимых данных, потребовать их
            изменения или удаления, обратившись по адресу{" "}
            <a href="mailto:info@dkdiesel.by" className="text-primary hover:underline">
              info@dkdiesel.by
            </a>.
          </p>

          <h2 className="text-xl font-bold text-foreground">7. Контактная информация</h2>
          <p>
            ИП Кравцов Д.А.<br />
            г. Минск, ул. Брикета, 17Б<br />
            Тел.:{" "}
            <a href="tel:+375291440040" className="text-primary hover:underline">
              +375 29 144-00-40
            </a><br />
            Email:{" "}
            <a href="mailto:info@dkdiesel.by" className="text-primary hover:underline">
              info@dkdiesel.by
            </a>
          </p>

          <div className="border-t border-border pt-6 mt-8">
            <p className="text-xs">
              Дата последнего обновления: {new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
