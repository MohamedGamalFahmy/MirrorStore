import { ArrowRight, Phone, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClientHeader = ({ client }) => {
  const navigate = useNavigate();

  const firstLetter = client?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      {/* رجوع */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-600 mb-5 hover:text-black transition"
      >
        <ArrowRight size={20} />
        رجوع
      </button>

      {/* بيانات العميل */}
      <div className="flex flex-col items-center text-center gap-3">

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-zinc-900 text-white flex items-center justify-center text-3xl font-bold">
          {firstLetter}
        </div>

        {/* الاسم */}
        <h1 className="text-2xl font-bold">
          {client?.name}
        </h1>

        {/* الكود */}
        <div className="flex items-center gap-2 text-zinc-500">
          <Hash size={18} />
          <span>{client?.clientCode}</span>
        </div>

        {/* الهاتف */}
        <div className="flex items-center gap-2 text-zinc-500">
          <Phone size={18} />
          <span>{client?.phone}</span>
        </div>

      </div>
    </div>
  );
};

export default ClientHeader;