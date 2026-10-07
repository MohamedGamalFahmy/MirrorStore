  import { useEffect, useState } from "react";
  import { Copy, RefreshCw, UserPlus } from "lucide-react";
  import { addClient, checkClientCode } from "../../../services/clientService";

  const AddClientForm = ({ onClientAdded }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [clientCode, setClientCode] = useState("");

    const [loading, setLoading] = useState(false);

    // توليد كود العميل
    const generateClientCode = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      let code = "GF-";

      for (let i = 0; i < 4; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }

      return code;
    };

    // التأكد أن الكود غير مكرر
    const createUniqueCode = async () => {
      let code = generateClientCode();

      while (await checkClientCode(code)) {
        code = generateClientCode();
      }

      setClientCode(code);
    };

    useEffect(() => {
      createUniqueCode();
    }, []);

    // نسخ الكود
    const handleCopyCode = async () => {
      try {
        await navigator.clipboard.writeText(clientCode);
        alert("تم نسخ كود العميل");
      } catch (error) {
        console.log(error);
      }
    };

    // توليد كود جديد
    const handleGenerateCode = async () => {
      await createUniqueCode();
    };

    // سيتم كتابة الحفظ في الجزء الثاني
    async function handleAddClient() {
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
        const exist = await checkClientCode(clientCode);

        if (exist) {
          await createUniqueCode();
          alert("تم إنشاء كود جديد لأن الكود السابق مستخدم");
          setLoading(false);
          return;
        }

        const clientData = {
          name: name.trim(),
          phone: phone.trim(),
          clientCode,
          createdAt: new Date(),
        };

        await addClient(clientData);
        console.log("Client Added");
        onClientAdded?.();
        console.log("Refresh Fired");
alert("تم إضافة العميل بنجاح ✅");

     

        setName("");
        setPhone("");
        setClientCode(generateClientCode());

        await createUniqueCode();
      } catch (error) {
        console.log(error);
        alert("حدث خطأ أثناء حفظ العميل");
      } finally {
        setLoading(false);
      }
    }

    return (
      <div className="w-full max-w-5xl mx-auto mt-10 py-2">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <UserPlus className="text-white" size={32} />

            <h2 className="text-3xl font-bold text-white">إضافة عميل جديد</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Name */}

            <div>
              <label className="text-gray-300 mb-2 block">اسم العميل</label>

              <input
                type="text"
                placeholder="اكتب اسم العميل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-gray-400 duration-300"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="text-gray-300 mb-2 block">رقم الهاتف</label>

              <input
                type="number"
                placeholder="010xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-gray-400 duration-300"
              />
            </div>
          </div>

          {/* Client Code */}

          <div className="mt-8">
            <h3 className="text-gray-300 mb-3">كود العميل</h3>

            <div className="bg-black border border-zinc-700 rounded-2xl p-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Client Code</p>

                <h2 className="text-green-400 text-4xl font-bold tracking-[8px] mt-3">
                  {clientCode}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={handleCopyCode}
                  className="flex justify-center items-center gap-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl py-3 text-white duration-300"
                >
                  <Copy size={18} />
                  نسخ
                </button>

                <button
                  onClick={handleGenerateCode}
                  className="flex justify-center items-center gap-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl py-3 text-white duration-300"
                >
                  <RefreshCw size={18} />
                  توليد جديد
                </button>
              </div>
            </div>
          </div>
          {/* Save Button */}

          <div className="mt-8">
            <button
              onClick={handleAddClient}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-200 text-black rounded-xl py-4 font-bold text-lg duration-300 disabled:opacity-60"
            >
              {loading ? "جاري حفظ العميل..." : "حفظ العميل"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default AddClientForm;
