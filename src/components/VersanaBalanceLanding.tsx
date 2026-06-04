import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, X, Clock, Shield, Globe2, FileCheck } from 'lucide-react';
import { logger } from '../lib/logger';

interface VersanaBalanceLandingProps {
  onBackToCatalog: () => void;
}

const BRAND = {
  bg: '#000d1f',
  primary: '#0066CC',
  accent: '#00AEEF',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(0,102,204,0.25)',
};

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').replace(/^8/, '7').replace(/^([^7])/, '7$1').slice(0, 11);
  const d = digits.padEnd(0, '');
  if (d.length <= 1) return d ? '+7 (' : '';
  const p1 = d.slice(1, 4);
  const p2 = d.slice(4, 7);
  const p3 = d.slice(7, 9);
  const p4 = d.slice(9, 11);
  let out = '+7';
  if (p1) out += ' (' + p1;
  if (p1.length === 3) out += ')';
  if (p2) out += ' ' + p2;
  if (p3) out += '-' + p3;
  if (p4) out += '-' + p4;
  return out;
}

const useFadeIn = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-fade]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('opacity-100', 'translate-y-0');
          e.target.classList.remove('opacity-0', 'translate-y-4');
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

export const VersanaBalanceLanding: React.FC<VersanaBalanceLandingProps> = ({ onBackToCatalog }) => {
  useFadeIn();
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [name2, setName2] = useState('');
  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);
  const [shake1, setShake1] = useState(false);
  const [shake2, setShake2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const submit = (which: 1 | 2) => {
    const val = which === 1 ? phone1 : phone2;
    const digits = val.replace(/\D/g, '');
    const ok = digits.length === 11;
    if (!ok) {
      if (which === 1) { setErr1(true); setShake1(true); setTimeout(() => setShake1(false), 500); }
      else { setErr2(true); setShake2(true); setTimeout(() => setShake2(false), 500); }
      return;
    }
    logger.info(`Versana Balance R2 — заявка с формы ${which}, телефон ${val}`);
    setShowModal(true);
  };

  const sectionLabel = "text-xs font-semibold tracking-[0.25em] uppercase";
  const cardCls = "rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1";

  return (
    <div className="min-h-screen text-white font-sans scroll-smooth" style={{ backgroundColor: BRAND.bg }}>
      {/* Sticky header */}
      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ backgroundColor: 'rgba(0,13,31,0.85)', borderBottom: `1px solid ${BRAND.cardBorder}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToCatalog}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Каталог
            </button>
            <div className="hidden sm:block w-px h-5 bg-white/15" />
            <div className="hidden sm:flex items-center gap-2 text-sm font-semibold">
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})` }}>GE</div>
              Versana Balance R2
            </div>
          </div>
          <button
            onClick={scrollToForm}
            className="px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-lg hover:opacity-90 transition cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})` }}
          >
            Получить расчёт
          </button>
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: `radial-gradient(800px 400px at 20% 0%, rgba(0,102,204,0.35), transparent), radial-gradient(600px 400px at 90% 30%, rgba(0,174,239,0.18), transparent)` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7" data-fade>
            <div className="flex flex-wrap gap-2 mb-6">
              {['GE HealthCare • США', 'Первичное звено', 'CE + FDA Certified'].map((b) => (
                <span key={b} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: BRAND.cardBg, border: `1px solid ${BRAND.cardBorder}`, color: 'rgba(255,255,255,0.85)' }}>
                  {b}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Надёжность GE Healthcare.<br />
              <span style={{ background: `linear-gradient(135deg, ${BRAND.accent}, ${BRAND.primary})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Цена, которая вас приятно удивит.
              </span>
            </h1>
            <p className="mt-6 text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Versana Balance R2 — умный многопрофильный аппарат для частных клиник и поликлиник: GE-качество изображения, ИИ-автоматизация и простота работы с первого дня.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {[
                ['21.5"', 'HD монитор'],
                ['3 порта', 'датчиков'],
                ['ИИ Whizz', 'автонастройка'],
                ['GE', 'с 1892 года'],
              ].map(([n, l]) => (
                <div key={l} className="rounded-xl p-4" style={{ backgroundColor: BRAND.cardBg, border: `1px solid ${BRAND.cardBorder}` }}>
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: BRAND.accent }}>{n}</div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead form */}
          <div ref={formRef} className="lg:col-span-5" data-fade>
            <div className="rounded-2xl p-6 sm:p-7 shadow-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: `1px solid ${BRAND.cardBorder}` }}>
              <div className="text-lg font-bold mb-4">🎁 Оставьте номер — получите бесплатно:</div>
              <ul className="space-y-2.5 mb-5">
                {[
                  'Персональный подбор комплектации под вашу клинику',
                  'Расчёт стоимости с датчиками за 15 минут',
                  'Сравнение Versana Balance R2 vs Mindray Consona N8 — честная таблица',
                ].map((t) => (
                  <li key={t} className="flex gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: BRAND.accent }} /> {t}
                  </li>
                ))}
              </ul>
              <input
                inputMode="tel"
                value={phone1}
                onChange={(e) => { setPhone1(formatPhone(e.target.value)); if (err1) setErr1(false); }}
                placeholder="+7 (___) ___-__-__"
                className={`w-full rounded-lg px-4 py-3 bg-black/40 text-white placeholder-white/40 outline-none transition ${shake1 ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
                style={{ border: `1px solid ${err1 ? '#ff4d6d' : 'rgba(255,255,255,0.15)'}` }}
              />
              <button
                onClick={() => submit(1)}
                className="w-full mt-3 py-3.5 rounded-lg font-semibold text-white text-base shadow-lg hover:opacity-90 transition cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})` }}
              >
                Получить подбор и расчёт →
              </button>
              <div className="text-xs text-center mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Перезвоним за 15 минут. Без навязчивых звонков.
              </div>
              <div className="text-sm text-center mt-3 font-semibold" style={{ color: '#ff9533' }}>
                ⏰ Предложение действует 48 часов
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FOR WHOM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16" data-fade>
        <div className="opacity-0 translate-y-4 transition-all duration-700" data-fade>
          <div className={sectionLabel} style={{ color: BRAND.accent }}>СПЕЦИАЛИЗАЦИИ</div>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-10">Для кого создан Versana Balance R2</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ['🏥', 'Частные многопрофильные клиники'],
            ['👨‍⚕️', 'Врачи общей практики / ВОП'],
            ['🤰', 'Гинекологи и акушеры'],
            ['🦴', 'МСК специалисты'],
            ['🩺', 'Терапевты и педиатры'],
            ['🔬', 'Небольшие диагностические центры'],
          ].map(([e, t]) => (
            <div key={t} className={cardCls} style={{ backgroundColor: BRAND.cardBg, border: `1px solid ${BRAND.cardBorder}` }} data-fade>
              <div className="text-4xl mb-3">{e}</div>
              <div className="font-semibold text-lg">{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: OBJECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div data-fade>
          <div className={sectionLabel} style={{ color: BRAND.accent }}>ЗАКРЫВАЕМ ВОЗРАЖЕНИЯ</div>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-10">6 причин выбрать Versana Balance R2</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { o: 'GE — это дорого, не потяну...', t: 'Честная цена. Полная надёжность GE.', b: 'Versana Balance R2 — это точка входа в экосистему GE HealthCare без переплаты за лишние функции. Вы получаете проверенную платформу, сервисную сеть GE и качество изображения выше класса — по цене доступнее чем вы ожидаете. CE + FDA сертификация включена.' },
            { o: 'Хватит ли возможностей для разных пациентов?', t: '3 активных порта. Любая задача.', b: 'Три одновременно активных порта датчиков — абдомен, ОБ/ГИН, МСК, сосуды, малые части — всё на одном аппарате. Широкий парк RS-Pin датчиков GE совместим со всей линейкой Versana. Один аппарат закрывает весь поток вашей клиники.' },
            { o: 'Сложно ли освоить новый аппарат?', t: 'Whizz + Scan Assistant: аппарат думает за вас.', b: 'Whizz Dynamic Image — автонастройка изображения в реальном времени без ручных регуляций. Scan Assistant ведёт врача шаг за шагом через исследование: автозахват, аннотация, измерения — всё автоматически. My Trainer: обучение прямо на экране аппарата.' },
            { o: 'Нужна ли мне хорошая качество картинки?', t: 'B-Flow + CrossXBeam: видит детали конкурентов.', b: 'B-Flow и B-Flow Color — интуитивная визуализация гемодинамики в сосудах без артефактов цветного доплера. CrossXBeam — составное формирование луча: чёткие границы тканей, минимум спеклов. SRI-HD шумоподавление — детализация на уровне аппаратов дороже класса.' },
            { o: 'Проведу ли я пункции и биопсии безопасно?', t: 'Needle Recognition: игла всегда в поле зрения.', b: 'Автоматическое выделение иглы в реальном времени при пункциях, биопсиях и инъекциях. Аппарат сам находит и подсвечивает иглу — точность и безопасность процедуры на максимуме. Для интервенционных манипуляций любой сложности.' },
            { o: 'Что если аппарат сломается?', t: 'InSite + Versana Club: GE всегда рядом.', b: 'InSite — удалённая диагностика и поддержка от GE HealthCare. Versana Club — сообщество пользователей, обучение, обмен опытом. e-Delivery: обновления системы онлайн. RSVP удалённые возможности. GE Healthcare в 160+ странах — сервис там где вы.' },
          ].map((c) => (
            <div
              key={c.t}
              data-fade
              className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 border-l-2"
              style={{ backgroundColor: BRAND.cardBg, border: `1px solid ${BRAND.cardBorder}`, borderLeftColor: 'transparent' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderLeftColor = BRAND.primary; (e.currentTarget as HTMLElement).style.borderLeftWidth = '4px'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderLeftWidth = '1px'; }}
            >
              <div className="italic text-sm mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>«{c.o}»</div>
              <h3 className="text-xl font-bold mb-3">{c.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: WOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div data-fade>
          <div className={sectionLabel} style={{ color: BRAND.accent }}>УНИКАЛЬНЫЕ ВОЗМОЖНОСТИ</div>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-10">3 фишки которые вас удивят</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ['01', 'Whizz Label — ИИ-разметка органов', 'Одно нажатие — и аппарат автоматически определяет и подписывает правую почку, желчный пузырь и печень. Никаких ручных аннотаций. Меньше кликов — больше пациентов.'],
            ['02', 'B-Flow Color — сосуды без артефактов', 'Уникальная технология GE: визуализация кровотока в реальном времени без цветовых артефактов доплера. Видите реальную гемодинамику — не интерпретацию. Эксклюзивно в линейке Versana.'],
            ['03', 'Easy 3D/4D — объём одним нажатием', 'Трёхмерная и четырёхмерная визуализация без дополнительного обучения. Покажите пациентке ребёнка в 3D — повысьте лояльность и добавьте ценность приёма.'],
          ].map(([num, title, text]) => (
            <div key={num} data-fade className={cardCls} style={{ backgroundColor: BRAND.cardBg, border: `1px solid ${BRAND.cardBorder}` }}>
              <div className="text-5xl font-extrabold opacity-30 mb-3" style={{ color: BRAND.accent }}>{num}</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: BRAND.accent }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: SPECS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div data-fade>
          <div className={sectionLabel} style={{ color: BRAND.accent }}>ТЕХНИЧЕСКИЕ ДАННЫЕ</div>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-10">Характеристики Versana Balance R2</h2>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: BRAND.cardBg, border: `1px solid ${BRAND.cardBorder}` }} data-fade>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['Монитор', '21.5" HD LED, антибликовый, регулируемый'],
                ['Touch-панель', 'Мультижестовая сенсорная панель'],
                ['Активных портов датчиков', '3 одновременно'],
                ['Совместимость датчиков', 'RS-Pin (вся линейка GE Versana)'],
                ['Режимы', 'B, M, Color Flow, PDI, PW, CW (опция), B-Flow (опция), 3D/4D (опция)'],
                ['ИИ-автоматизация', 'Whizz Dynamic Image, Whizz Label, Scan Assistant'],
                ['Иглы', 'Needle Recognition (автовыделение)'],
                ['Эластография', 'Опция'],
                ['Контрастное УЗИ', 'Опция'],
                ['Подключение', 'DICOM 3.0, USB, LAN, WiFi'],
                ['Хранилище', 'SSD ~512 ГБ'],
                ['Высота системы', '1340–1500 мм (регулируемая)'],
                ['Сервис', 'InSite™ удалённая поддержка'],
                ['Обучение', 'My Trainer (на экране), Versana Club'],
                ['Сертификация', 'CE, FDA'],
              ].map(([k, v], i) => (
                <tr key={k} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                  <td className="py-3 px-4 sm:px-6 font-medium align-top w-1/2" style={{ color: 'rgba(255,255,255,0.65)' }}>{k}</td>
                  <td className="py-3 px-4 sm:px-6 font-semibold">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 6: INCLUDED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div data-fade>
          <div className={sectionLabel} style={{ color: BRAND.accent }}>КОМПЛЕКТАЦИЯ</div>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-10">Что вы получаете</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ['🖥', 'Аппарат Versana Balance R2', 'Полная система с выбранными датчиками'],
            ['🛡', 'Гарантия GE HealthCare', 'Официальная гарантия производителя'],
            ['📡', 'InSite удалённая поддержка', 'GE диагностирует систему онлайн'],
            ['🎓', 'Обучение My Trainer', 'Встроенное обучение прямо на экране аппарата'],
            ['🔄', 'e-Delivery обновления', 'Программные обновления онлайн'],
            ['📋', 'Полный пакет документов', 'Регудостоверение, паспорт, инструкции на русском'],
          ].map(([e, t, d]) => (
            <div key={t} data-fade className={cardCls} style={{ backgroundColor: BRAND.cardBg, border: `1px solid ${BRAND.cardBorder}` }}>
              <div className="text-3xl mb-3">{e}</div>
              <div className="font-bold text-lg mb-1">{t}</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #001433 0%, #002a6e 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(600px 400px at 50% 0%, rgba(0,174,239,0.25), transparent)' }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center" data-fade>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-5">Готовы сделать первый шаг к аппарату GE?</h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Оставьте номер — подберём комплектацию и посчитаем стоимость за 15 минут. Без обязательств.
          </p>
          <ul className="space-y-2 mb-8 inline-block text-left">
            {[
              'Персональный подбор комплектации',
              'Расчёт с датчиками и опциями',
              'Честное сравнение с конкурентами в PDF',
            ].map((t) => (
              <li key={t} className="flex gap-2 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: BRAND.accent }} /> {t}
              </li>
            ))}
          </ul>
          <div className="rounded-2xl p-6 sm:p-7 max-w-xl mx-auto" style={{ backgroundColor: 'rgba(0,13,31,0.55)', border: `1px solid ${BRAND.cardBorder}` }}>
            <input
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Ваше имя"
              className="w-full rounded-lg px-4 py-3 bg-black/40 text-white placeholder-white/40 outline-none mb-3"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            />
            <input
              inputMode="tel"
              value={phone2}
              onChange={(e) => { setPhone2(formatPhone(e.target.value)); if (err2) setErr2(false); }}
              placeholder="+7 (___) ___-__-__"
              className={`w-full rounded-lg px-4 py-3 bg-black/40 text-white placeholder-white/40 outline-none transition ${shake2 ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
              style={{ border: `1px solid ${err2 ? '#ff4d6d' : 'rgba(255,255,255,0.15)'}` }}
            />
            <button
              onClick={() => submit(2)}
              className="w-full mt-4 py-3.5 rounded-lg font-semibold text-white text-base shadow-lg hover:opacity-90 transition cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})` }}
            >
              Получить подбор комплектации бесплатно →
            </button>
            <div className="text-xs text-center mt-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Перезвоним за 15 минут в рабочее время.
            </div>
            <div className="text-sm text-center mt-3 font-semibold" style={{ color: '#ff9533' }}>
              ⏰ Предложение действует 48 часов
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <span className="flex items-center gap-1.5"><FileCheck className="w-4 h-4" style={{ color: BRAND.accent }} /> CE + FDA сертификация</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" style={{ color: BRAND.accent }} /> GE HealthCare официально</span>
            <span className="flex items-center gap-1.5"><Globe2 className="w-4 h-4" style={{ color: BRAND.accent }} /> 160+ стран мира</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4" style={{ color: BRAND.accent }} /> Документы на русском</span>
          </div>
        </div>
      </section>

      {/* SECTION 8: FOOTER */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 py-10 text-xs leading-relaxed text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>
        GE Healthcare Versana Balance R2 — диагностическая ультразвуковая система. Медицинское изделие. Имеется регистрационное удостоверение. Реализация при наличии соответствующих лицензий. Характеристики соответствуют официальной документации GE HealthCare. © 2025
      </footer>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className="relative max-w-md w-full rounded-2xl p-8 text-center" style={{ backgroundColor: '#001433', border: `1px solid ${BRAND.cardBorder}` }}>
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-white/60 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-3">Заявка принята!</h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Наш специалист перезвонит вам в течение 15 минут в рабочее время и подберёт оптимальную комплектацию.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-lg font-semibold text-white cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})` }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          25%{transform:translateX(-6px)}
          50%{transform:translateX(6px)}
          75%{transform:translateX(-4px)}
        }
        [data-fade]{opacity:0;transform:translateY(16px);transition:opacity .7s ease, transform .7s ease}
        [data-fade].opacity-100{opacity:1 !important;transform:translateY(0) !important}
      `}</style>
    </div>
  );
};
