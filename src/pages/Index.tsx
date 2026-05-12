import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const HERO_IMG = "https://cdn.poehali.dev/projects/7ffa743a-0715-4acf-8c6f-79a42b004548/files/a9a41a9a-baeb-441f-b60d-671a35af722f.jpg";
const BULLDOZER_IMG = "https://cdn.poehali.dev/projects/7ffa743a-0715-4acf-8c6f-79a42b004548/files/fd523bf1-5616-458f-8d8d-2c860991e5b1.jpg";
const CRANE_IMG = "https://cdn.poehali.dev/projects/7ffa743a-0715-4acf-8c6f-79a42b004548/files/bcf0a0ad-3d02-4e1a-a5ea-f993f8089557.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "equipment", label: "Техника" },
  { id: "services", label: "Услуги" },
  { id: "pricing", label: "Расценки" },
  { id: "about", label: "О компании" },
  { id: "contacts", label: "Контакты" },
];

const EQUIPMENT = [
  {
    id: 1,
    name: "Экскаватор CAT 320",
    category: "Земляные работы",
    power: "148 л.с.",
    weight: "20 т",
    price: "от 4 500 ₽/час",
    img: HERO_IMG,
    available: true,
  },
  {
    id: 2,
    name: "Бульдозер Komatsu D85",
    category: "Планировка",
    power: "240 л.с.",
    weight: "27 т",
    price: "от 5 200 ₽/час",
    img: BULLDOZER_IMG,
    available: true,
  },
  {
    id: 3,
    name: "Автокран Liebherr LTM",
    category: "Подъём грузов",
    power: "360 л.с.",
    weight: "60 т",
    price: "от 7 800 ₽/час",
    img: CRANE_IMG,
    available: false,
  },
  {
    id: 4,
    name: "Самосвал КАМАЗ 6520",
    category: "Перевозка грузов",
    power: "400 л.с.",
    weight: "35 т",
    price: "от 2 800 ₽/час",
    img: BULLDOZER_IMG,
    available: true,
  },
  {
    id: 5,
    name: "Погрузчик JCB 3CX",
    category: "Погрузочные работы",
    power: "109 л.с.",
    weight: "8 т",
    price: "от 3 100 ₽/час",
    img: HERO_IMG,
    available: true,
  },
  {
    id: 6,
    name: "Гусеничный кран РДК-250",
    category: "Монтажные работы",
    power: "280 л.с.",
    weight: "95 т",
    price: "от 9 500 ₽/час",
    img: CRANE_IMG,
    available: true,
  },
];

const SERVICES = [
  {
    icon: "Shovel",
    title: "Земляные работы",
    desc: "Разработка котлованов, траншей, планировка участков. Опыт работы на объектах любой сложности.",
  },
  {
    icon: "Building2",
    title: "Строительные работы",
    desc: "Подготовка фундаментов, демонтаж конструкций, расчистка территорий промышленных объектов.",
  },
  {
    icon: "Truck",
    title: "Транспортировка грузов",
    desc: "Перевозка сыпучих материалов, строительного мусора и негабаритных грузов по всему региону.",
  },
  {
    icon: "ArrowUpFromLine",
    title: "Подъёмные работы",
    desc: "Монтаж металлоконструкций, подъём оборудования, установка опор и мачт до 300 тонн.",
  },
  {
    icon: "Layers",
    title: "Дорожные работы",
    desc: "Устройство насыпей, выемка грунта, профилирование дорог, уплотнение основания.",
  },
  {
    icon: "Wrench",
    title: "Техническое обслуживание",
    desc: "Сопровождение объекта с постоянным оператором, техническая поддержка 24/7.",
  },
];

const PRICING = [
  {
    title: "Почасовая аренда",
    desc: "Оплата по факту использования",
    price: "от 2 800",
    unit: "₽/час",
    features: ["Любой тип техники", "Оператор включён", "Минимум 4 часа", "Выезд на объект"],
    highlight: false,
  },
  {
    title: "Суточная аренда",
    desc: "Работа в течение смены 8–12 ч",
    price: "от 18 000",
    unit: "₽/смена",
    features: ["Скидка 20% от почасовой", "Оператор включён", "ГСМ включён", "Техподдержка"],
    highlight: true,
  },
  {
    title: "Долгосрочный контракт",
    desc: "Для крупных объектов от 1 месяца",
    price: "Договорная",
    unit: "цена",
    features: ["Персональный менеджер", "Приоритетное обслуживание", "Резервная техника", "Индивидуальные условия"],
    highlight: false,
  },
];

const STATS = [
  { value: "12+", label: "Лет на рынке" },
  { value: "85", label: "Единиц техники" },
  { value: "3 400+", label: "Выполненных объектов" },
  { value: "24/7", label: "Режим работы" },
];

const TIME_SLOTS = [
  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<typeof EQUIPMENT[0] | null>(null);
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [bookingTime, setBookingTime] = useState("");
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", comment: "" });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [filterCat, setFilterCat] = useState("Все");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openBooking = (eq?: typeof EQUIPMENT[0]) => {
    setSelectedEquipment(eq || null);
    setBookingSuccess(false);
    setBookingDate(undefined);
    setBookingTime("");
    setBookingForm({ name: "", phone: "", comment: "" });
    setBookingOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const categories = ["Все", ...Array.from(new Set(EQUIPMENT.map((e) => e.category)))];
  const filtered = filterCat === "Все" ? EQUIPMENT : EQUIPMENT.filter((e) => e.category === filterCat);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber flex items-center justify-center">
              <span className="text-steel-dark font-display font-bold text-sm">ТП</span>
            </div>
            <span className="font-display font-bold text-lg tracking-widest uppercase text-foreground">
              ТехноПром
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
            <Button
              onClick={() => openBooking()}
              className="hidden md:flex bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase text-sm px-5 rounded-none"
            >
              Оставить заявку
            </Button>
            <button
              className="lg:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
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
                className="block w-full text-left px-6 py-3 font-display tracking-wider uppercase text-sm hover:text-amber hover:bg-steel transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="px-6 py-4">
              <Button
                onClick={() => { openBooking(); setMobileOpen(false); }}
                className="w-full bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase rounded-none"
              >
                Оставить заявку
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 grid-bg" />

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
              <div className="h-px w-12 bg-amber" />
              <span className="text-amber font-display tracking-widest uppercase text-sm">
                Промышленная техника
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase leading-tight mb-6 animate-fade-in-up delay-100">
              Аренда
              <br />
              <span className="text-amber">спецтехники</span>
              <br />
              любой сложности
            </h1>

            <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-lg animate-fade-in-up delay-200">
              85 единиц тяжёлой техники. Опытные операторы. Работаем 24/7 на объектах по всему региону.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <Button
                onClick={() => openBooking()}
                size="lg"
                className="bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase text-base px-8 py-6 rounded-none"
              >
                <Icon name="CalendarCheck" size={20} className="mr-2" />
                Забронировать технику
              </Button>
              <Button
                onClick={() => scrollTo("equipment")}
                size="lg"
                variant="outline"
                className="border-foreground/30 text-foreground hover:border-amber hover:text-amber font-display tracking-wider uppercase text-base px-8 py-6 rounded-none bg-transparent"
              >
                <Icon name="ChevronDown" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/90 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {STATS.map((stat, i) => (
                <div key={i} className="py-6 px-6 text-center animate-fade-in-up" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                  <div className="font-display text-3xl font-bold text-amber">{stat.value}</div>
                  <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
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
            <span className="text-amber font-display tracking-widest uppercase text-sm">Каталог</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
              Наша техника
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className={`px-4 py-2 text-xs font-display tracking-wider uppercase border transition-colors ${
                    filterCat === cat
                      ? "bg-amber text-steel-dark border-amber"
                      : "border-border text-muted-foreground hover:border-amber hover:text-amber"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((eq, i) => (
              <div
                key={eq.id}
                className="group bg-card border border-border hover:border-amber transition-all duration-300 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={eq.img}
                    alt={eq.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-display tracking-wider uppercase ${
                    eq.available ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {eq.available ? "Доступна" : "Занята"}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-amber/90 text-steel-dark px-2 py-1 text-xs font-display tracking-wider uppercase">
                      {eq.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-xl font-bold uppercase mb-3">{eq.name}</h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-steel p-3">
                      <div className="text-muted-foreground text-xs mb-1">Мощность</div>
                      <div className="font-display font-semibold text-sm">{eq.power}</div>
                    </div>
                    <div className="bg-steel p-3">
                      <div className="text-muted-foreground text-xs mb-1">Масса</div>
                      <div className="font-display font-semibold text-sm">{eq.weight}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-amber font-bold text-lg">{eq.price}</span>
                    <Button
                      onClick={() => openBooking(eq)}
                      disabled={!eq.available}
                      className="bg-amber text-steel-dark hover:bg-amber/90 disabled:opacity-40 disabled:cursor-not-allowed font-display tracking-wider uppercase text-xs px-4 rounded-none"
                    >
                      Забронировать
                    </Button>
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
            <span className="text-amber font-display tracking-widest uppercase text-sm">Что мы делаем</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-16">
            Услуги
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="group bg-card border border-border hover:border-amber p-8 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber/10 border border-amber/30 flex items-center justify-center mb-6 group-hover:bg-amber group-hover:border-amber transition-colors duration-300">
                  <Icon name={s.icon} size={22} className="text-amber group-hover:text-steel-dark transition-colors duration-300" fallback="Wrench" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
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
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-16">
            Расценки
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((p, i) => (
              <div
                key={i}
                className={`relative border p-8 transition-all duration-300 ${
                  p.highlight
                    ? "border-amber bg-amber/5"
                    : "border-border bg-card hover:border-amber/50"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-8 bg-amber px-4 py-1">
                    <span className="text-steel-dark font-display text-xs tracking-widest uppercase font-bold">
                      Популярный выбор
                    </span>
                  </div>
                )}
                <h3 className="font-display text-xl font-bold uppercase mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{p.desc}</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-display text-4xl font-bold text-amber">{p.price}</span>
                  <span className="text-muted-foreground text-sm">{p.unit}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <div className="w-4 h-4 bg-amber/20 flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={10} className="text-amber" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => openBooking()}
                  className={`w-full font-display tracking-wider uppercase rounded-none ${
                    p.highlight
                      ? "bg-amber text-steel-dark hover:bg-amber/90"
                      : "bg-transparent border border-foreground/30 text-foreground hover:border-amber hover:text-amber"
                  }`}
                >
                  Оставить заявку
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 relative overflow-hidden" style={{ background: "hsl(220, 15%, 6%)" }}>
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-amber" />
                <span className="text-amber font-display tracking-widest uppercase text-sm">Наша история</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-8">
                О компании
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-foreground font-medium">ТехноПром</span> — ведущая компания по аренде промышленной спецтехники в регионе. С 2012 года мы обеспечиваем надёжное оборудование для строительных, горнодобывающих и инфраструктурных проектов.
                </p>
                <p>
                  Наш парк насчитывает более 85 единиц техники ведущих мировых брендов: Caterpillar, Komatsu, Liebherr, КАМАЗ. Каждая машина проходит регулярное техническое обслуживание.
                </p>
                <p>
                  Мы работаем с промышленными предприятиями, строительными холдингами и частными застройщиками. Крупнейшие объекты включают дорожное строительство, горнодобычу и промышленное возведение зданий.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-10">
                {[
                  { icon: "Shield", text: "Страхование всей техники" },
                  { icon: "Clock", text: "Работа без выходных 24/7" },
                  { icon: "Users", text: "Опытные операторы в штате" },
                  { icon: "Headphones", text: "Техподдержка на объекте" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber/10 border border-amber/30 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={14} className="text-amber" fallback="Check" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-amber/20" />
              <img
                src={CRANE_IMG}
                alt="О компании"
                className="w-full h-80 lg:h-96 object-cover relative z-10"
              />
              <div className="absolute bottom-0 right-0 z-20 bg-background border border-border p-6">
                <div className="font-display text-4xl font-bold text-amber">12+</div>
                <div className="text-sm text-muted-foreground">лет на рынке</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-amber" />
            <span className="text-amber font-display tracking-widest uppercase text-sm">Связь с нами</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-16">
            Контакты
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 123-45-67", sub: "Бесплатно по России" },
                { icon: "Mail", label: "Email", value: "info@technoprom.ru", sub: "Ответим в течение часа" },
                { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Промышленная, 14", sub: "Пн–Вс: 07:00–22:00" },
                { icon: "Clock", label: "Режим работы", value: "Круглосуточно 24/7", sub: "Диспетчерская служба" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-5 p-5 bg-card border border-border hover:border-amber/50 transition-colors">
                  <div className="w-10 h-10 bg-amber/10 border border-amber/30 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={18} className="text-amber" fallback="Info" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{c.label}</div>
                    <div className="font-display font-semibold text-lg">{c.value}</div>
                    <div className="text-muted-foreground text-sm">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border p-8">
              <h3 className="font-display text-2xl font-bold uppercase mb-6">Быстрая заявка</h3>
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Имя и организация
                  </Label>
                  <Input
                    placeholder="ООО Строймаш / Иван Петров"
                    className="bg-background border-border rounded-none focus:border-amber"
                  />
                </div>
                <div>
                  <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Телефон
                  </Label>
                  <Input
                    placeholder="+7 (___) ___-__-__"
                    className="bg-background border-border rounded-none focus:border-amber"
                  />
                </div>
                <div>
                  <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Тип техники и объём работ
                  </Label>
                  <Input
                    placeholder="Экскаватор, земляные работы, 3 дня"
                    className="bg-background border-border rounded-none focus:border-amber"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase rounded-none py-6 mt-2"
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10" style={{ background: "hsl(220, 15%, 5%)" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber flex items-center justify-center">
                <span className="text-steel-dark font-display font-bold text-sm">ТП</span>
              </div>
              <div>
                <div className="font-display font-bold tracking-widest uppercase text-foreground">ТехноПром</div>
                <div className="text-muted-foreground text-xs">Аренда промышленной техники</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-muted-foreground hover:text-amber text-xs font-display tracking-wider uppercase transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="text-muted-foreground text-xs text-center">
              © 2024 ТехноПром. Все права защищены.
            </div>
          </div>
        </div>
      </footer>

      {/* BOOKING DIALOG */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="bg-card border-border max-w-lg rounded-none p-0 overflow-hidden">
          <div className="bg-amber px-8 py-5">
            <DialogTitle className="font-display text-2xl font-bold uppercase text-steel-dark tracking-wider">
              {bookingSuccess ? "Заявка принята!" : "Бронирование техники"}
            </DialogTitle>
            {selectedEquipment && !bookingSuccess && (
              <p className="text-steel-dark/70 text-sm mt-1">{selectedEquipment.name}</p>
            )}
          </div>

          {bookingSuccess ? (
            <div className="px-8 py-12 text-center">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={32} className="text-emerald-400" />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase mb-3">Ваша заявка принята</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Наш менеджер свяжется с вами в течение 30 минут для подтверждения бронирования.
              </p>
              <Button
                onClick={() => setBookingOpen(false)}
                className="bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase rounded-none px-8"
              >
                Закрыть
              </Button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="px-8 py-6 space-y-5">
              {!selectedEquipment && (
                <div>
                  <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Тип техники
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-background border-border rounded-none focus:border-amber">
                      <SelectValue placeholder="Выберите технику..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border rounded-none">
                      {EQUIPMENT.filter((e) => e.available).map((eq) => (
                        <SelectItem key={eq.id} value={String(eq.id)} className="font-body">
                          {eq.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Дата начала
                  </Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="w-full flex items-center gap-2 px-3 py-2 bg-background border border-border hover:border-amber text-left text-sm transition-colors"
                      >
                        <Icon name="Calendar" size={14} className="text-amber flex-shrink-0" />
                        <span className={bookingDate ? "text-foreground" : "text-muted-foreground"}>
                          {bookingDate ? format(bookingDate, "dd MMM", { locale: ru }) : "Выбрать дату"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-border rounded-none" align="start">
                      <Calendar
                        mode="single"
                        selected={bookingDate}
                        onSelect={(d) => { setBookingDate(d); setCalendarOpen(false); }}
                        disabled={(date) => date < new Date()}
                        className="rounded-none"
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Время подачи
                  </Label>
                  <Select value={bookingTime} onValueChange={setBookingTime}>
                    <SelectTrigger className="bg-background border-border rounded-none focus:border-amber">
                      <SelectValue placeholder="Выбрать..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border rounded-none max-h-52">
                      {TIME_SLOTS.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                  Имя и организация *
                </Label>
                <Input
                  required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  placeholder="ООО Строймаш / Иван Петров"
                  className="bg-background border-border rounded-none focus:border-amber"
                />
              </div>

              <div>
                <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                  Телефон *
                </Label>
                <Input
                  required
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                  className="bg-background border-border rounded-none focus:border-amber"
                />
              </div>

              <div>
                <Label className="font-display text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                  Комментарий
                </Label>
                <Input
                  value={bookingForm.comment}
                  onChange={(e) => setBookingForm({ ...bookingForm, comment: e.target.value })}
                  placeholder="Адрес объекта, объём работ..."
                  className="bg-background border-border rounded-none focus:border-amber"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-amber text-steel-dark hover:bg-amber/90 font-display tracking-wider uppercase rounded-none py-6"
              >
                <Icon name="CheckSquare" size={16} className="mr-2" />
                Подтвердить бронирование
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}