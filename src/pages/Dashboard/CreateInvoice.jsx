import { useEffect, useState } from "react";
import { getClients } from "../../services/clientService";


const CreateInvoice = () => {

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تحميل العملاء");
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const client = clients.find(
    (item) => item.id === selectedClient
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          فاتورة جديدة
        </h1>

        <p className="text-gray-500">
          إنشاء فاتورة جديدة للعميل
        </p>
      </div>

      {/* Client */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg mb-4">
          بيانات العميل
        </h2>

        <label className="block text-sm font-semibold mb-2">
          العميل
        </label>

        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <option value="">
            اختر العميل
          </option>

          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name} - {client.code}
            </option>
          ))}
        </select>

        {/* Selected Client */}
        {client && (
          <div className="mt-4 bg-gray-50 rounded-xl p-4 space-y-2">
            <p>
              <span className="font-semibold">
                الاسم:
              </span>{" "}
              {client.name}
            </p>

            <p>
              <span className="font-semibold">
                الكود:
              </span>{" "}
              {client.code}
            </p>

            {client.phone && (
              <p>
                <span className="font-semibold">
                  الهاتف:
                </span>{" "}
                {client.phone}
              </p>
            )}
          </div>
        )}

      </div>

    </div>
  );
};

export default CreateInvoice;