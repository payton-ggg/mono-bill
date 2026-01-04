import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TimerContext } from "../context/TimerProvider";

export default function EasyPay() {
  const { money } = useContext(TimerContext);
  const navigate = useNavigate();

  return (
    <div className="fixed bg-white flex flex-col font-sans text-[#333]">
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
      <div className="h-[0.5px] w-full bg-gray-400" />
      <div className="flex-1 px-6 pt-4 pb-8 flex flex-col">
        <div className="flex justify-center mb-10">
          <img src="/question.jpg" alt="question" />
        </div>

        <table className="w-full text-sm font-medium border-separate border-spacing-y-4">
          <colgroup>
            <col className="w-1/2" />
            <col className="w-1/2" />
          </colgroup>

          <tbody className="">
            <tr className="mt-5">
              <td className="text-gray-500">Статус:</td>
              <td className="text-emerald-500 font-normal flex items-center gap-1.5">
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </td>
            </tr>

            <tr className="mt-5">
              <td className="text-gray-500">№ транзакції:</td>
              <td className="text-gray-700 font-normal">
                1{Math.floor(100000000 + Math.random() * 900000000)}
              </td>
            </tr>

            <tr className="mt-5">
              <td className="text-gray-500">Послуга:</td>
              <td className="text-gray-700 font-normal leading-tight">
                Запоріжелектротранс: разова поїздка QR
              </td>
            </tr>

            <tr>
              <td className="text-gray-500">Сума:</td>
              <td className="text-gray-700 font-normal">
                {money === "15" ? "15.00" : "7.50"}
              </td>
            </tr>

            <tr>
              <td className="text-gray-500">Комісія:</td>
              <td className="text-gray-700 font-normal">0.00</td>
            </tr>
          </tbody>
        </table>
        <table className="w-full text-sm font-medium border-separate border-spacing-y-4">
          <colgroup>
            <col className="w-1/2" />
            <col className="w-1/2" />
          </colgroup>
          <tr className="mt-5">
            <td className="text-gray-500 text-sm mb-1">Сплачено:</td>
            <td className="text-4xl font-light text-slate-700">
              {money === "15" ? "15.00" : "7.50"} грн
            </td>
          </tr>
        </table>
      </div>
      <div className="border-t border-b border-gray-300 py-4 px-6 mt-6">
        <button className="w-full flex  items-center text-gray-500 hover:text-gray-700">
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

      <div className="mx-4 mb-4 bg-linear-to-r from-blue-50 to-blue-100 rounded-2xl p-4 flex items-center relative overflow-hidden shadow-sm">
        <img src="/bottom.png" alt="knife" />
      </div>
    </div>
  );
}
