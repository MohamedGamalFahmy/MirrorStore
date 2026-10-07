import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientLogin = () => {
  const [clientCode, setClientCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = clientCode.trim().toUpperCase();

    if (!code) return;

    navigate(`/clients/${code}`);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-zinc-100 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="text-4xl font-black text-black">
            GF
          </div>

          <h1 className="text-2xl font-bold mt-3">
            بوابة العملاء
          </h1>

          <p className="text-zinc-500 mt-2">
            ادخل كود العميل للوصول إلى حسابك
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">

          <form onSubmit={handleSubmit}>

            <label className="block font-semibold mb-2">
              كود العميل
            </label>

            <input
              type="text"
              value={clientCode}
              onChange={(e) => setClientCode(e.target.value)}
              placeholder="ادخل الكود الخاص بك  "
              className="
                w-full
                border
                border-zinc-300
                rounded-xl
                px-4
                py-3
                text-center
                text-lg
                font-semibold
                uppercase
                outline-none
                focus:border-black
              "
            />

            <button
              type="submit"
              className="
                w-full
                mt-5
                bg-black
                text-white
                rounded-xl
                py-3
                font-semibold
                hover:bg-zinc-800
                transition
              "
            >
              دخول إلى حسابي
            </button>

          </form>

        </div>

        <p className="text-center text-xs text-zinc-400 mt-6">
          GF for Glass
        </p>

      </div>
    </div>
  );
};

export default ClientLogin;