export default function EPassPixel() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] flex justify-center items-start py-6">
      {/* Frame (375px width) */}
      <div className="w-[375px]">
        {/* Top map */}
        <div className="relative w-full h-[260px] rounded-b-[28px] overflow-hidden">
          <img
            src="/map.png"
            alt="map"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Back button (left) */}
          <button
            aria-label="back"
            className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Sheet */}
        <div className="relative -mt-10 bg-[#141414] rounded-t-3xl pb-8 px-5 shadow-[0_-12px_30px_rgba(0,0,0,0.6)]">
          {/* Top badge */}
          <div className="flex justify-center -mt-10 mb-3">
            <div className="w-16 h-16 rounded-full bg-[#14b37f] shadow-md flex items-center justify-center border-4 border-[#101010]">
              {/* luggage icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="6"
                  y="7"
                  width="12"
                  height="10"
                  rx="1.2"
                  stroke="white"
                  strokeWidth="1.4"
                />
                <path
                  d="M9 7V6a3 3 0 0 1 6 0v1"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-center text-white text-lg font-semibold">
            Електронний квиток E-Pass
          </h1>

          <div className="flex justify-center mt-3">
            <button className="px-4 py-1 bg-[#0fb798] hover:bg-[#0da783] text-sm rounded-full font-medium flex items-center gap-2">
              <span>Подорожі</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-3">
            27 жовтня 2025, 17:56
          </p>

          <div className="mt-3 text-center">
            <div className="text-[44px] font-extrabold text-white leading-none">
              -15<span className="text-2xl font-medium">.00</span>{" "}
              <span className="text-3xl">₴</span>
            </div>
          </div>

          {/* Description / tags input */}
          <div className="mt-6">
            <div className="w-full rounded-lg bg-[#0f0f0f] p-3 text-gray-300 placeholder-gray-500">
              <input
                className="w-full bg-transparent outline-none text-sm text-gray-300"
                placeholder="Опис та #теги"
              />
            </div>
          </div>

          {/* Balance */}
          <div className="mt-4 rounded-lg bg-[#0f0f0f] p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0fb798] flex items-center justify-center shrink-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="12"
                  rx="2"
                  stroke="white"
                  strokeWidth="1.2"
                />
                <path d="M3 10h18" stroke="white" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-400">Залишок</div>
              <div className="text-white font-medium text-lg">311.84 ₴</div>
            </div>
          </div>

          {/* Payment card row */}
          <div className="mt-4 rounded-lg bg-[#0f0f0f] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8">
                {/* VISA logo simplified */}
                <svg
                  width="36"
                  height="12"
                  viewBox="0 0 36 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="0"
                    y="10"
                    fontSize="10"
                    fontFamily="sans-serif"
                    fill="#2EA6FF"
                  >
                    VISA
                  </text>
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">iPhone</div>
                <div className="text-xs text-gray-400">
                  Оплата через Apple Pay
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-sm"> </div>
          </div>

          {/* Small separator and label */}
          <div className="mt-6 flex items-center justify-center">
            <div className="text-xs text-gray-400 rounded-full border border-[#1b1b1b] px-4 py-1">
              Витратили 15 ₴ за півроку
            </div>
          </div>

          {/* Chart */}
          <div className="mt-5">
            <div className="rounded-lg bg-[#0f0f0f] p-4 h-[140px]">
              <div className="h-full flex items-end gap-3">
                {/* left axis labels column */}
                <div className="flex flex-col justify-between text-xs text-gray-500 mr-2 h-full">
                  <div>15 ₴</div>
                  <div>8 ₴</div>
                  <div>0 ₴</div>
                </div>

                {/* Chart bars container */}
                <div className="flex-1 flex items-end gap-2">
                  {/* months: тра чер лип сер вер жов (labels under) */}
                  {/* tiny bars for first months */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-4 h-6 bg-white/10 rounded-t-md"></div>
                      <div className="text-[11px] text-gray-400 mt-2">
                        {["тра", "чер", "лип", "сер", "вер"][i]}
                      </div>
                    </div>
                  ))}

                  {/* large bar for October */}
                  <div className="flex flex-col items-center gap-2 ml-auto">
                    <div className="w-6 h-32 rounded-t-md bg-gradient-to-t from-[#ff6b6b] to-[#14b37f] shadow-lg"></div>
                    <div className="text-[11px] text-gray-400 mt-2">жов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Split expense button */}
          <div className="mt-6">
            <button className="w-full py-3 rounded-xl bg-gradient-to-b from-[#0e0e0e] to-[#0b0b0b] border border-[#222] text-white font-semibold">
              Розділити витрату
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
