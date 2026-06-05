import React from 'react';
import { ShieldCheck, Users, MapPin } from 'lucide-react';

/**
 * Trust-building team block — appears at the end of every product landing.
 * Shows the real Astmed team to reinforce "real people, real distributor".
 */
export const AstmedTeamBlock: React.FC = () => {
  return (
    <section
      className="max-w-6xl mx-auto my-12 sm:my-20 px-4 sm:px-6"
      id="astmed-team-trust"
      aria-labelledby="astmed-team-trust-title"
    >
      <div className="bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden grid lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 relative">
          <img
            src="/images/team_aesthet.jpg"
            alt="Команда АстМед — федеральный дистрибьютор медицинского оборудования"
            loading="lazy"
            className="w-full h-full object-cover min-h-[260px] sm:min-h-[360px]"
          />
        </div>
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase font-mono tracking-wider bg-cyan-600 text-white px-2 py-1 rounded font-black w-fit mb-4">
            <Users className="w-3 h-3" /> Реальные люди — живое доверие
          </span>
          <h2
            id="astmed-team-trust-title"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-3"
          >
            Команда «АстМед» — ваш партнёр, а не безликий перекупщик
          </h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-5">
            Мы — официальный дистрибьютор и сертифицированный поставщик высокотехнологичной
            медицинской и косметологической аппаратуры в России. Прямые договора с фабриками,
            собственный сервис, штатные методисты и юристы — всё, чтобы вы получили результат, а
            не проблемы.
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-bold">Лицензия Росздравнадзора</span> — собственный
                инженерный центр быстрого реагирования.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Users className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-bold">Штатные методисты</span> — индивидуальное обучение с
                выдачей дипломов гос. образца.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-bold">Московский офис и склад</span> — приезжайте лично,
                познакомьтесь с командой и оборудованием.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AstmedTeamBlock;
