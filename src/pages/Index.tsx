import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MANIPULATOR_IMG = "https://cdn.poehali.dev/projects/7ffa743a-0715-4acf-8c6f-79a42b004548/files/24ee7ae2-c99f-4ae3-87c8-fe856c9a50de.jpg";
const EXCAVATOR_IMG = "https://cdn.poehali.dev/projects/7ffa743a-0715-4acf-8c6f-79a42b004548/files/338ab1bd-a18d-4782-8f33-06b3137f142b.jpg";
const DUMPTRUCK_IMG = "https://cdn.poehali.dev/projects/7ffa743a-0715-4acf-8c6f-79a42b004548/files/75a83412-da59-4912-9520-4a0e4177f87c.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "equipment", label: "Техника" },
  { id: "services", label: "Услуги" },
  { id: "pricing", label: "Расценки" },
  { id: "contacts", label: "Контакты" },
];

const EQUIPMENT = [
  {
    id: 1,
    name: "Манипулятор",
    brand: "HIAB 160 TM-6",
    img: MANIPULATOR_IMG,
    specs: [
      { label: "Марка КМУ", value: "HIAB" },
      { label: "Модель", value: "160 TM-6" },
      { label: "Вылет стрелы", value: "17 м" },
      { label: "Грузоподъёмность стрелы", value: "7 т" },
      { label: "Длина борта", value: "8,4 м" },
      { label: "Ширина борта", value: "2,4 м" },
      { label: "Тип борта", value: "Длинномер" },
      { label: "Грузоподъёмность борта", value: "14 т" },
      { label: "Расположение КМУ", value: "За кабиной" },
      { label: "Навесное", value: "Люлька" },
    ],
    pricing: [
      { type: "Наличный расчёт", price: "2 700 ₽/час" },
      { type: "Безналичный (без НДС)", price: "2 900 ₽/час" },
      { type: "Безналичный (с НДС)", price: "3 200 ₽/час" },
    ],
    minOrder: "Минимальный заказ — 4 часа",
  },
  {
    id: 2,
    name: "Экскаватор-погрузчик",
    brand: "MST M544 S",
    img: EXCAVATOR_IMG,
    specs: [
      { label: "Марка", value: "MST" },
      { label: "Модель", value: "M544 S" },
      { label: "Колёсная база", value: "Равноколёсный" },
      { label: "Глубина копания", value: "4 м" },
      { label: "Объём ковша", value: "0,2 м³" },
      { label: "Высота выгрузки", value: "3,3 м" },
      { label: "Навесное", value: "Гидромолот, ковш" },
    ],
    pricing: [
      { type: "Наличный расчёт", price: "3 000 ₽/час" },
      { type: "Безналичный (с НДС)", price: "3 500 ₽/час" },
    ],
    minOrder: "Минимальный заказ — 4 часа (12 000 ₽)",
  },
  {
    id: 3,
    name: "Самосвал",
    brand: "Вывоз грунта и мусора",
    img: DUMPTRUCK_IMG,
    specs: [
      { label: "Грузоподъёмность", value: "25 т" },
      { label: "Услуга", value: "Вывоз грунта и строительного мусора" },
      { label: "Погрузка", value: "2 500 ₽/час" },
    ],
    pricing: [
      { type: "Наличный расчёт", price: "от 12 500 ₽" },
      { type: "Безналичный (с НДС)", price: "от 15 000 ₽" },
    ],
    minOrder: "Цены уточняйте по телефону",
  },
];

const SERVICES = [
  { icon: "Shovel", title: "Планировка участка", desc: "Выравнивание и подготовка территории под строительство или ландшафтные работы." },
  { icon: "Droplets", title: "Монтаж систем канализации", desc: "Под ключ — проектирование, земляные работы, установка септика, монтаж труб." },
  { icon: "TreePine", title: "Выкорчевывание пней", desc: "Быстрое и аккуратное удаление пней с помощью экскаватора-погрузчика." },
  { icon: "PackageOpen", title: "Установка септика", desc: "Земляные работы и монтаж септика любой сложности." },
  { icon: "Hammer", title: "Гидромолот", desc: "Разрушение бетона, асфальта и твёрдых пород — навесное оборудование к экскаватору." },
  { icon: "Truck", title: "Доставка материалов", desc: "Доставка любых грузов манипулятором-длинномером грузоподъёмностью до 14 тонн." },
];

const STATS = [
  { value: "3", label: "Единицы техники" },
  { value: "24/7", label: "Режим работы" },
  { value: "4 ч", label: "Мин. заказ" },
  { value: "14 т", label: "Макс. груз" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedEq, setSelectedEq] = useState<typeof EQUIPMENT[0] | null>(null);
  const [callOpen, setCallOpen] = useState(false);
  const [callForm, setCallForm] = useState({ name: "", phone: "" });
  const [callSuccess, setCallSuccess] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openCall = () => {
    setCallSuccess(false);
    setCallForm({ name: "", phone: "" });
    setCallOpen(true);
  };

  const handleCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-8 h-8 bg-amber flex items-center justify-center">
              <span className="text-steel-dark font-display font-bold text-xs leading-none">СТ<br/>18</span>
            </div>
            <span className="font-display font-bold text-base tracking-widest uppercase text-foreground">
              СпецТехника<span className="text-amber">18</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 text-sm font-display tracking-wider uppercase transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-amber border-b-2 border-amber"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+79827931312" className="hidden md:flex items-center gap-2 text-amber font-display tracking-wider text-sm hover:text-amber/80 transition-colors">
              <Icon name="Phone" size={14} />
              +7 (982) 793-13-12
            </a>
            <Button
              onClick={openCall}
              className="hidden md:flex bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase text-sm px-5 rounded-none"
            >
              Заказать
            </Button>
            <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-6 py-3 font-display tracking-wider uppercase text-sm hover:text-amber transition-colors border-b border-border/50"
              >
                {item.label}
              </button>
            ))}
            <div className="px-6 py-4 flex flex-col gap-3">
              <a href="tel:+79827931312" className="flex items-center gap-2 text-amber font-display text-sm">
                <Icon name="Phone" size={14} /> +7 (982) 793-13-12
              </a>
              <Button onClick={() => { openCall(); setMobileOpen(false); }} className="w-full bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase rounded-none">
                Заказать
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MANIPULATOR_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/20" />
        <div className="absolute inset-0 grid-bg" />

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
              <div className="h-px w-12 bg-amber" />
              <span className="text-amber font-display tracking-widest uppercase text-sm">г. Ижевск · Удмуртия</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase leading-tight mb-6 animate-fade-in-up delay-100">
              Аренда<br />
              <span className="text-amber">спецтехники</span><br />
              в Ижевске
            </h1>

            <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-lg animate-fade-in-up delay-200">
              Манипулятор HIAB, экскаватор-погрузчик MST, самосвал. Работаем с юрлицами и физлицами. Круглосуточно 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <Button
                onClick={openCall}
                size="lg"
                className="bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase text-base px-8 py-6 rounded-none"
              >
                <Icon name="Phone" size={18} className="mr-2" />
                Позвонить / Заказать
              </Button>
              <Button
                onClick={() => scrollTo("equipment")}
                size="lg"
                variant="outline"
                className="border-foreground/30 text-foreground hover:border-amber hover:text-amber font-display tracking-wider uppercase text-base px-8 py-6 rounded-none bg-transparent"
              >
                <Icon name="ChevronDown" size={18} className="mr-2" />
                Посмотреть технику
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/90 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {STATS.map((stat, i) => (
                <div key={i} className="py-5 px-6 text-center">
                  <div className="font-display text-2xl font-bold text-amber">{stat.value}</div>
                  <div className="text-muted-foreground text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section id="equipment" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-amber" />
            <span className="text-amber font-display tracking-widest uppercase text-sm">Наш парк</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-16">Техника</h2>

          <div className="space-y-6">
            {EQUIPMENT.map((eq, i) => (
              <div key={eq.id} className="group border border-border hover:border-amber transition-all duration-300 overflow-hidden bg-card">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Фото */}
                  <div className="relative overflow-hidden h-64 lg:h-auto min-h-64">
                    <img src={eq.img} alt={eq.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:hidden" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber text-steel-dark px-3 py-1 text-xs font-display tracking-widest uppercase font-bold">
                        {eq.name}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 lg:hidden">
                      <span className="text-muted-foreground text-sm font-display">{eq.brand}</span>
                    </div>
                  </div>

                  {/* Инфо */}
                  <div className="p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="hidden lg:block mb-1">
                        <span className="text-amber font-display text-xs tracking-widest uppercase">{eq.name}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold uppercase mb-1 hidden lg:block">{eq.brand}</h3>

                      {/* Характеристики */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                        {eq.specs.map((s, j) => (
                          <div key={j} className="flex items-start gap-2 py-2 border-b border-border/50">
                            <span className="text-muted-foreground text-xs min-w-0 flex-shrink-0" style={{ minWidth: "120px" }}>{s.label}</span>
                            <span className="text-sm font-medium text-foreground">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Расценки */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Tag" size={14} className="text-amber" />
                        <span className="font-display text-xs tracking-wider uppercase text-muted-foreground">Расценки</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        {eq.pricing.map((p, j) => (
                          <div key={j} className={`flex items-center justify-between px-3 py-2 ${j === 0 ? "bg-amber/10 border border-amber/30" : "bg-steel/50"}`}>
                            <span className="text-xs text-muted-foreground">{p.type}</span>
                            <span className="font-display font-bold text-amber text-sm">{p.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground italic">{eq.minOrder}</span>
                        <Button
                          onClick={() => { setSelectedEq(eq); openCall(); }}
                          className="bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase text-xs px-5 rounded-none"
                        >
                          Заказать
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 relative overflow-hidden" style={{ background: "hsl(220, 15%, 6%)" }}>
        <div className="absolute inset-0 stripe-bg" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-amber" />
            <span className="text-amber font-display tracking-widest uppercase text-sm">Что выполняем</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-16">Услуги</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div key={i} className="group bg-card border border-border hover:border-amber p-7 transition-all duration-300">
                <div className="w-11 h-11 bg-amber/10 border border-amber/30 flex items-center justify-center mb-5 group-hover:bg-amber group-hover:border-amber transition-colors duration-300">
                  <Icon name={s.icon} size={20} className="text-amber group-hover:text-steel-dark transition-colors duration-300" fallback="Wrench" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Доп. услуги */}
          <div className="mt-10 p-6 bg-card border border-amber/30 flex flex-wrap items-center gap-4">
            <Icon name="Info" size={16} className="text-amber flex-shrink-0" />
            <span className="text-sm text-muted-foreground">Также выполняем:</span>
            {["Дизайн и планировка участков под ключ", "Монтаж систем канализации под ключ", "Доставка любых грузов"].map((s, i) => (
              <span key={i} className="bg-amber/10 border border-amber/20 text-amber text-xs font-display tracking-wider uppercase px-3 py-1">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-amber" />
            <span className="text-amber font-display tracking-widest uppercase text-sm">Стоимость</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">Расценки</h2>
          <p className="text-muted-foreground mb-16 max-w-lg">Работаем с юридическими лицами по договору и с частными лицами. НДС — 20% (ОСНО).</p>

          <div className="space-y-4">
            {/* Манипулятор */}
            <div className="border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-4 border-b border-border bg-steel/30">
                <div className="w-2 h-8 bg-amber" />
                <span className="font-display text-lg font-bold uppercase">Манипулятор HIAB 160 TM-6</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {[
                  { type: "Наличный расчёт", price: "2 700", unit: "₽/час" },
                  { type: "Без НДС", price: "2 900", unit: "₽/час" },
                  { type: "С НДС", price: "3 200", unit: "₽/час" },
                ].map((p, i) => (
                  <div key={i} className={`px-6 py-5 ${i === 0 ? "bg-amber/5" : ""}`}>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{p.type}</div>
                    <div className="font-display text-3xl font-bold text-amber">{p.price} <span className="text-base text-muted-foreground">{p.unit}</span></div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-border text-xs text-muted-foreground italic">Минимальный заказ — 4 часа</div>
            </div>

            {/* Экскаватор */}
            <div className="border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-4 border-b border-border bg-steel/30">
                <div className="w-2 h-8 bg-amber" />
                <span className="font-display text-lg font-bold uppercase">Экскаватор-погрузчик MST M544 S</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                {[
                  { type: "Наличный расчёт", price: "3 000", unit: "₽/час" },
                  { type: "С НДС", price: "3 500", unit: "₽/час" },
                ].map((p, i) => (
                  <div key={i} className={`px-6 py-5 ${i === 0 ? "bg-amber/5" : ""}`}>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{p.type}</div>
                    <div className="font-display text-3xl font-bold text-amber">{p.price} <span className="text-base text-muted-foreground">{p.unit}</span></div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-border text-xs text-muted-foreground italic">Минимальный заказ — 4 часа (12 000 ₽)</div>
            </div>

            {/* Самосвал */}
            <div className="border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-4 border-b border-border bg-steel/30">
                <div className="w-2 h-8 bg-amber" />
                <span className="font-display text-lg font-bold uppercase">Самосвал 25 т · Вывоз грунта и мусора</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {[
                  { type: "Наличный расчёт", price: "от 12 500", unit: "₽" },
                  { type: "С НДС", price: "от 15 000", unit: "₽" },
                  { type: "Погрузка", price: "2 500", unit: "₽/час" },
                ].map((p, i) => (
                  <div key={i} className={`px-6 py-5 ${i === 0 ? "bg-amber/5" : ""}`}>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{p.type}</div>
                    <div className="font-display text-3xl font-bold text-amber">{p.price} <span className="text-base text-muted-foreground">{p.unit}</span></div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-border text-xs text-muted-foreground italic">Цены уточняйте по телефону</div>
            </div>
          </div>

          <div className="mt-8 p-5 border border-amber/30 bg-amber/5 flex items-start gap-4">
            <Icon name="AlertCircle" size={18} className="text-amber flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Указанные цены носят информационный характер. Точную стоимость уточняйте по телефону —&nbsp;
              <a href="tel:+79827931312" className="text-amber hover:underline font-medium">+7 (982) 793-13-12</a>
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative overflow-hidden" style={{ background: "hsl(220, 15%, 6%)" }}>
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-amber" />
            <span className="text-amber font-display tracking-widest uppercase text-sm">Связь с нами</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-16">Контакты</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Контакты */}
            <div className="space-y-4">
              {[
                { icon: "Phone", label: "Телефон", values: ["+7 (3412) 24-24-92", "+7 (982) 793-13-12"], links: ["tel:+73412242492", "tel:+79827931312"] },
                { icon: "Mail", label: "E-mail", values: ["sts-izh@mail.ru"], links: ["mailto:sts-izh@mail.ru"] },
                { icon: "MapPin", label: "Адрес", values: ["Удмуртская Республика, г. Ижевск"], links: [null] },
                { icon: "Clock", label: "Режим работы", values: ["Круглосуточно 24/7"], links: [null] },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-5 p-5 bg-card border border-border hover:border-amber/50 transition-colors">
                  <div className="w-10 h-10 bg-amber/10 border border-amber/30 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={16} className="text-amber" fallback="Info" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{c.label}</div>
                    {c.values.map((v, j) => (
                      c.links[j] ? (
                        <a key={j} href={c.links[j]!} className="block font-display font-semibold text-base hover:text-amber transition-colors">{v}</a>
                      ) : (
                        <div key={j} className="font-display font-semibold text-base">{v}</div>
                      )
                    ))}
                  </div>
                </div>
              ))}

              {/* Реквизиты */}
              <details className="group bg-card border border-border">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:border-amber/50 transition-colors list-none">
                  <div className="flex items-center gap-3">
                    <Icon name="Building" size={14} className="text-amber" />
                    <span className="font-display text-sm tracking-wider uppercase">Реквизиты ООО «СТС»</span>
                  </div>
                  <Icon name="ChevronDown" size={16} className="text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 space-y-2 border-t border-border">
                  {[
                    ["Полное наименование", "ООО «СПЕЦТЕХСТРОЙ»"],
                    ["ИНН", "1800027797"],
                    ["КПП", "180001001"],
                    ["ОГРН", "1241800016655"],
                    ["Налогообложение", "ОСНО"],
                    ["Расчётный счёт", "40702810968000080301"],
                    ["Банк", "УДМУРТСКОЕ ОТДЕЛЕНИЕ №8618 ПАО СБЕРБАНК"],
                    ["БИК", "049401601"],
                    ["Кор. счёт", "30101810400000000601"],
                  ].map(([k, v], i) => (
                    <div key={i} className="flex gap-3 py-2 border-b border-border/40 text-sm">
                      <span className="text-muted-foreground flex-shrink-0" style={{ minWidth: "140px" }}>{k}</span>
                      <span className="font-medium break-all">{v}</span>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            {/* Форма заявки */}
            <div className="bg-card border border-border p-8">
              <h3 className="font-display text-2xl font-bold uppercase mb-6">Оставить заявку</h3>
              {callSuccess ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                    <Icon name="CheckCircle" size={28} className="text-emerald-400" />
                  </div>
                  <p className="font-display text-lg font-bold uppercase mb-2">Заявка отправлена</p>
                  <p className="text-muted-foreground text-sm">Мы перезвоним вам в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleCallSubmit} className="space-y-4">
                  <div>
                    <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">Имя *</Label>
                    <Input required value={callForm.name} onChange={(e) => setCallForm({ ...callForm, name: e.target.value })} placeholder="Иван Иванов" className="bg-background border-border rounded-none focus:border-amber" />
                  </div>
                  <div>
                    <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">Телефон *</Label>
                    <Input required value={callForm.phone} onChange={(e) => setCallForm({ ...callForm, phone: e.target.value })} placeholder="+7 (___) ___-__-__" className="bg-background border-border rounded-none focus:border-amber" />
                  </div>
                  <Button type="submit" className="w-full bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase rounded-none py-6">
                    <Icon name="Send" size={15} className="mr-2" />
                    Отправить заявку
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Перезвоним в течение 30 минут</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8" style={{ background: "hsl(220, 15%, 5%)" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-amber flex items-center justify-center">
                <span className="text-steel-dark font-display font-bold text-xs leading-none">СТ</span>
              </div>
              <div>
                <div className="font-display font-bold tracking-widest uppercase text-sm">СпецТехника<span className="text-amber">18</span></div>
                <div className="text-muted-foreground text-xs">ООО «СПЕЦТЕХСТРОЙ» · ИНН 1800027797</div>
              </div>
            </div>
            <div className="flex gap-5">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="text-muted-foreground hover:text-amber text-xs font-display tracking-wider uppercase transition-colors">
                  {item.label}
                </button>
              ))}
            </div>
            <div className="text-center">
              <a href="tel:+79827931312" className="text-amber font-display text-sm hover:text-amber/80 transition-colors">+7 (982) 793-13-12</a>
              <div className="text-muted-foreground text-xs mt-1">© 2024 СпецТехника18</div>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL ЗАКАЗА */}
      <Dialog open={callOpen} onOpenChange={setCallOpen}>
        <DialogContent className="bg-card border-border max-w-md rounded-none p-0 overflow-hidden">
          <div className="bg-amber px-8 py-5">
            <DialogTitle className="font-display text-2xl font-bold uppercase text-steel-dark tracking-wider">
              {callSuccess ? "Заявка принята!" : selectedEq ? `Заказать: ${selectedEq.name}` : "Оставить заявку"}
            </DialogTitle>
            {!callSuccess && <p className="text-steel-dark/70 text-sm mt-1">Перезвоним в течение 30 минут</p>}
          </div>
          {callSuccess ? (
            <div className="px-8 py-12 text-center">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                <Icon name="CheckCircle" size={28} className="text-emerald-400" />
              </div>
              <p className="font-display text-lg font-bold uppercase mb-2">Заявка отправлена</p>
              <p className="text-muted-foreground text-sm mb-6">Мы перезвоним вам в ближайшее время.</p>
              <Button onClick={() => setCallOpen(false)} className="bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase rounded-none px-8">
                Закрыть
              </Button>
            </div>
          ) : (
            <form onSubmit={handleCallSubmit} className="px-8 py-6 space-y-4">
              <div>
                <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">Имя *</Label>
                <Input required value={callForm.name} onChange={(e) => setCallForm({ ...callForm, name: e.target.value })} placeholder="Иван Иванов" className="bg-background border-border rounded-none focus:border-amber" />
              </div>
              <div>
                <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">Телефон *</Label>
                <Input required value={callForm.phone} onChange={(e) => setCallForm({ ...callForm, phone: e.target.value })} placeholder="+7 (___) ___-__-__" className="bg-background border-border rounded-none focus:border-amber" />
              </div>
              <Button type="submit" className="w-full bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase rounded-none py-6">
                <Icon name="Phone" size={15} className="mr-2" />
                Заказать звонок
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}