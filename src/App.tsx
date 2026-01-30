import { useContext } from "react";
import { TimerContext } from "./context/TimerProvider";
import { Link } from "react-router-dom";

export default function EPassPixel() {
  const { timer, money } = useContext(TimerContext);
  const months = {
    1: "січ",
    2: "лют",
    3: "бер",
    4: "кві",
    5: "тра",
    6: "чер",
    7: "лип",
    8: "сер",
    9: "вер",
    10: "жов",
    11: "лис",
    12: "гру",
  };

  const date = new Date();
  const mon = [];
  for (let i = 5; i >= 1; i--) {
    mon.push(
      months[
        (date.getMonth() >= 5
          ? date.getMonth() + 2 - i
          : date.getMonth() + 1 - i) as keyof typeof months
      ]
    );
  }
  const monthsList = mon.slice(0, 3);

  return (
    <div className="h-full overflow-y-auto overscroll-none bg-[#1e1e1e] flex justify-center items-start">
      <Link to="/set-timer" className="absolute z-100 w-7 h-7 top-4 left-4">
        <img src="/arr.png" />
      </Link>
      <div className="absolute top-4 left-4">
        <button className="text-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="w-full">
        <div className="relative w-full h-[150px] rounded-b-[28px] overflow-hidden">
          <img
            src="/map.png"
            alt="map"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="relative bg-[#272727] -mt-6 rounded-t-3xl pb-8">
          <div className="flex justify-center absolute left-1/2 -translate-x-1/2 -mt-8 mb-3">
            <div className="w-16 h-16 rounded-full bg-[#22a475] shadow-md flex items-center justify-center">
              <img src="/bag.png" alt="bag" className="h-[32px] w-[32px]" />
            </div>
          </div>

          <div className="h-10" />

          <h1 className="text-center text-white text-lg font-semibold">
            Електронний квиток E-Pass
          </h1>

          <div className="flex justify-center mt-3">
            <button className="px-4 py-1 bg-[#02908b] text-sm rounded-full font-normal text-white flex items-center gap-2">
              <span>Подорожі</span>
              <img src="/pencil.svg" className="w-3 h-3 " alt="" />
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-3">{timer}</p>

          <div className="mt-3 mb-4 text-center">
            <div className="text-[44px] font-semibold text-white leading-none">
              -{money}
              <span className="text-2xl">
                {money}
              </span>{" "}
              <span className="text-3xl">₴</span>
            </div>
          </div>

          <div className="bg-[#1e1e1e] py-4">
            <div className="mx-4">
              <div className="">
                <div className="w-full rounded-lg bg-[#272727] p-3 text-gray-300 placeholder-gray-500">
                  <input
                    className="w-full bg-transparent outline-none text-md text-gray-300"
                    placeholder="Опис та #теги"
                  />
                </div>
              </div>

              {/* Balance */}
              <div className="mt-4 rounded-lg bg-[#272727] p-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#059a93] flex items-center justify-center shrink-0">
                  <img
                    src="/wallet.png"
                    className="h-[18px] w-[18px]"
                    alt="wallet"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400">Залишок</div>
                  <div className="text-white font-normal text-md">811.84 ₴</div>
                </div>
              </div>

              {/* Payment card row */}
              <div className="mt-4 rounded-lg bg-[#272727] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8">
                    <img src="/visa.png" alt="" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">
                      Оплата через Apple Pay
                    </div>
                    <div className="text-white font-normal">iPhone</div>
                  </div>
                </div>
                <div className="text-gray-400 text-sm"> </div>
              </div>

              {/* Small separator and label */}
              <div className="mt-6 flex items-center justify-center">
                <div className="text-xs text-gray-400 rounded-full border border-[#545454] px-4 py-1">
                  Витратили 135 ₴ за півроку
                </div>
              </div>

              {/* Chart */}
              <div className="mt-5">
                <div className="rounded-lg bg-[#272727] p-4 h-[140px] relative overflow-hidden">
                  {/* ГОРИЗОНТАЛЬНЫЕ ЛИНИИ */}
                  <div className="absolute left-12 right-4 top-[34px] h-px bg-white/10 border-dashed border-t border-white/10"></div>
                  <div className="absolute left-12 right-4 top-[74px] h-px bg-white/10 border-dashed border-t border-white/10"></div>
                  <div className="absolute left-12 right-4 bottom-[26px] h-px bg-white/10"></div>

                  <div className="h-full flex items-end gap-3 relative z-10">
                    {/* ЛЕВАЯ Ось значений */}
                    <div className="flex flex-col text-right justify-between text-[11px] text-gray-500 mr-2 h-full py-[6px]">
                      <div>90 ₴</div>
                      <div>45 ₴</div>
                      <div>0 ₴</div>
                    </div>

                    {/* СТОЛБЦЫ */}

                    {/* Маленькие 5 месяцев */}
                    <div className="flex-1 flex items-end relative top-3 justify-between pr-4">
                      {monthsList.map((m, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-4 h-[4px] rounded-sm bg-white/30"></div>
                          <div className="text-[10px] text-gray-400 mt-2">
                            {m}
                          </div>
                        </div>
                      ))}

                      {/* Большой столбец */}
                      <div className="flex flex-col items-center">
                        <div className="w-[12px] h-[80px] rounded-sm bg-linear-to-b from-[#14B39C] to-[#EB9191] shadow-md"></div>
                        <div className="text-[10px] text-gray-400 mt-2">
                          {mon[4]}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-[12px] h-[40px] rounded-sm bg-linear-to-b from-[#14B39C] to-[#EB9191] shadow-md"></div>
                        <div className="text-[10px] text-gray-400 mt-2">
                          {mon[3]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Split expense button */}
          <img src="/buttons.png" className="w-full" alt="but" />
        </div>
      </div>
    </div>
  );
}
