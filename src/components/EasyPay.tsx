import { useNavigate } from "react-router-dom";

export default function EasyPay() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#333]">
      {/* Header with Close Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pt-4 pb-8 flex flex-col">
        {/* Logo/Icon Area */}
        <div className="flex justify-center mb-10">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Question Mark */}
            <path
              d="M40 25C40 18 45 15 50 15C58 15 62 20 62 28C62 38 50 40 50 55"
              stroke="#5F7D8C"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="50" cy="68" r="3" fill="#5F7D8C" />

            {/* Exclamation Mark - positioned to look like the logo */}
            <path
              d="M68 25V55"
              stroke="#5F7D8C"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="68" cy="68" r="3" fill="#5F7D8C" />

            {/* Decorative dots/lines at bottom */}
            <path
              d="M40 78H70"
              stroke="#5F7D8C"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Custom SVG approximation of the logo */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              className="text-slate-500"
            >
              <path
                d="M35 15C35 5 55 5 55 20C55 35 35 40 35 60"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="35" cy="75" r="4" fill="currentColor" />

              <path
                d="M65 15V60"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="65" cy="75" r="4" fill="currentColor" />

              <path
                d="M25 85H75"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0 15"
                strokeDashoffset="0"
              />
              <circle cx="25" cy="85" r="2" fill="currentColor" />
              <circle cx="50" cy="85" r="2" fill="currentColor" />
              <circle cx="75" cy="85" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-5 text-sm">
          <div className="flex justify-between items-start">
            <span className="text-gray-500">Статус:</span>
            <span className="text-emerald-500 font-medium flex items-center gap-1.5">
              Проведений
              <div className="bg-emerald-500 rounded-full p-0.5">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-gray-500">№ транзакції:</span>
            <span className="text-gray-700">1734467309</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-gray-500">Послуга:</span>
            <span className="text-gray-700 text-right max-w-[60%] leading-tight">
              Запоріжелектротранс: разова поїздка QR
            </span>
          </div>

          <div className="flex justify-between items-start pt-2">
            <span className="text-gray-500">Сума:</span>
            <span className="text-gray-700">15.00</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-gray-500">Комісія:</span>
            <span className="text-gray-700">0.00</span>
          </div>
        </div>

        {/* Total Amount */}
        <div className="mt-10 mb-8 flex justify-between items-end">
          <span className="text-gray-500 text-sm mb-1">Сплачено:</span>
          <span className="text-4xl font-light text-slate-700">15.00 грн</span>
        </div>
      </div>

      {/* Receipt Link */}
      <div className="border-t border-b border-gray-100 py-4 px-6 mb-6">
        <button className="w-full flex justify-between items-center text-gray-500 hover:text-gray-700">
          <span>Квитанція</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Footer Banner */}
      <div className="mx-4 mb-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 flex items-center relative overflow-hidden shadow-sm">
        <div className="mr-4 -ml-2 -mb-4 z-10">
          {/* <img
            src={horseImage}
            alt="Pixel Horse"
            className="w-16 h-16 object-contain"
            style={{ imageRendering: "pixelated" }}
          /> */}
        </div>
        <div className="flex-1 z-10">
          <p
            className="font-bold text-slate-600 text-lg tracking-wide drop-shadow-sm"
            style={{ fontFamily: "monospace" }}
          >
            Грай, скачи,
            <br />
            вигравай!
          </p>
        </div>
      </div>
    </div>
  );
}
