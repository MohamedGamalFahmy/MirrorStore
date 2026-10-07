import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import { updateClient } from "../../../services/clientService";

const EditClientModal = ({ client, open, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (client) {
      setName(client.name || "");
      setPhone(client.phone || "");
    }
  }, [client]);

  if (!open || !client) return null;

  const handleUpdate = async () => {
    if (!name.trim() || !phone.trim()) {
      alert("من فضلك أدخل اسم العميل ورقم الهاتف");
      return;
    }

    if (phone.length < 11) {
      alert("رقم الهاتف غير صحيح");
      return;
    }

    setLoading(true);

    try {
      await updateClient(client.id, {
        name: name.trim(),
        phone: phone.trim(),
      });

      alert("تم تعديل بيانات العميل بنجاح ✅");
      onClose();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تعديل العميل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg bg-zinc-900 rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            تعديل بيانات العميل
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">

          <div>
            <label className="block text-gray-300 mb-2">
              اسم العميل
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              رقم الهاتف
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              كود العميل
            </label>

            <div className="bg-black border border-zinc-700 rounded-xl px-4 py-3 text-green-400 font-bold">
              {client.clientCode}
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-200 text-black rounded-xl py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Save size={20} />
            {loading ? "جاري الحفظ..." : "حفظ التعديل"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditClientModal;