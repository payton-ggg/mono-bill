import { useContext, useState } from "react";
import { TimerContext } from "../context/TimerProvider";
import { Link } from "react-router-dom";

function SetTimer() {
  const { times, setTimerValues, money, setMoney } = useContext(TimerContext);
  
  const [localTimes, setLocalTimes] = useState(times);
  const [localMoney, setLocalMoney] = useState(money);

  const handleSave = () => {
    setTimerValues(localTimes);
    setMoney(localMoney);
    alert("Налаштування збережено!");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="p-2 bg-[#1e1e1e] rounded-full hover:bg-[#252525] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </Link>
        <h1 className="text-xl font-bold tracking-tight">Налаштування</h1>
        <div className="w-10"></div>
      </div>

      <div className="max-w-md mx-auto space-y-8">
        {/* Monobank Card Mockup or Icon */}
        <div className="bg-linear-to-br from-[#2c2c2c] to-[#1a1a1a] rounded-3xl p-6 shadow-xl border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <img src="/bag.png" alt="" className="w-20 h-20" />
             </div>
             <div className="relative z-10">
                <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">E-Pass Pixel</div>
                <div className="text-2xl font-bold">Mono Control</div>
             </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          <section>
            <h2 className="text-gray-500 text-xs uppercase tracking-widest mb-4 font-bold px-1">Час входу</h2>
            <div className="bg-[#1e1e1e] rounded-2xl p-4 border border-white/5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Поточний вхід (Current)</label>
                <input
                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all text-emerald-400"
                  type="text"
                  value={localTimes.current}
                  onChange={(e) => setLocalTimes({...localTimes, current: e.target.value})}
                  placeholder="24 квітня 2026, 14:30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Попередній вхід (Previous)</label>
                <input
                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all text-gray-400"
                  type="text"
                  value={localTimes.previous}
                  onChange={(e) => setLocalTimes({...localTimes, previous: e.target.value})}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-gray-500 text-xs uppercase tracking-widest mb-4 font-bold px-1">Фінанси</h2>
            <div className="bg-[#1e1e1e] rounded-2xl p-4 border border-white/5">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Сума проїзду</label>
                <input
                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all text-white font-mono"
                  type="text"
                  placeholder="15.00"
                  value={localMoney}
                  onChange={(e) => setLocalMoney(e.target.value)}
                />
                <p className="text-[10px] text-gray-600 px-1">Введіть суму з копійками (напр. 15.00)</p>
              </div>
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="pt-4 space-y-3">
            <button 
              onClick={handleSave}
              className="w-full bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-900/20 active:scale-95 transition-all"
            >
              Зберегти налаштування
            </button>
            <Link 
              to="/easy-pay"
              className="w-full bg-[#1e1e1e] text-gray-400 font-medium py-4 rounded-2xl flex justify-center items-center hover:text-white transition-colors"
            >
              Переглянути EasyPay
            </Link>
        </div>
      </div>
    </div>
  );
}

export default SetTimer;
