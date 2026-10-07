import { useEffect, useState } from "react";
import { Search, Eye, Pencil, Trash2, UserPlus } from "lucide-react";
// import {openModal} from "./Clients"
import EditClientModal from "./EditClientModal";
import { useNavigate } from "react-router-dom";
import {
  subscribeClients,
  deleteClient,
} from "../../../services/clientService";

const ClientTable = ({ openModal, onEdit }) => {
  const navigate = useNavigate();
  const [editClient, setEditClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);

    const unsubscribe = subscribeClients((data) => {
      setClients(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("clients state =", clients.length);

    const result = clients.filter((client) => {
      return (
        client.name?.toLowerCase().includes(search.toLowerCase()) ||
        client.clientCode?.toLowerCase().includes(search.toLowerCase()) ||
        client.phone?.includes(search)
      );
    });

    setFilteredClients(result);
  }, [search, clients]);

  const formatDate = (date) => {
    if (!date) return "-";

    if (date.seconds) {
      return new Date(date.seconds * 1000).toLocaleDateString("ar-EG");
    }

    return new Date(date).toLocaleDateString("ar-EG");
  };
  const handleDeleteClient = async (client) => {
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف العميل "${client.name}"؟`,
    );

    if (!confirmed) return;

    try {
      await deleteClient(client.id);

      alert("تم حذف العميل بنجاح ✅");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء حذف العميل");
    }
  };
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">العملاء</h1>

        <p className="text-gray-500 mt-2 text-center">
          إدارة جميع العملاء وإضافة وتعديل بياناتهم
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="بحث..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border border-zinc-300 rounded-xl pl-10 pr-4 py-3 text-black outline-none w-full md:w-72"
              />
            </div>

            <button
              onClick={openModal}
              className="bg-zinc-900 text-white hover:bg-black  px-6 rounded-xl flex items-center justify-center gap-2 font-bold  duration-300"
            >
              <UserPlus size={20} />
              إضافة عميل
            </button>
          </div>
        </div>
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl">
          <table className="w-full text-white">
            <thead>
              <tr className="bg-zinc-800">
                <th className="py-4">الكود</th>

                <th>الاسم</th>

                <th>الهاتف</th>

                <th>تاريخ الإضافة</th>

                <th>العمليات</th>
              </tr>
            </thead>

            <tbody className="text-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-800">
                    جارى تحميل العملاء...
                  </td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">
                    لا يوجد عملاء
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50 duration-300"
                  >
                    <td className="py-5 text-center font-bold text-green-400">
                      {client.clientCode}
                    </td>

                    <td className="text-center">{client.name}</td>

                    <td className="text-center">{client.phone}</td>

                    <td className="text-center">
                      {formatDate(client.createdAt)}
                    </td>

                    <td>
                      <div className="flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            navigate(`/dashboard/clients/${client.clientCode}`);
                          }}
                          className="bg-blue-600 hover:bg-blue-500 p-2 rounded-lg duration-300"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => setEditClient(client)}
                          className="bg-yellow-500 hover:bg-yellow-400 p-2 rounded-lg duration-300"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteClient(client)}
                          className="bg-red-600 hover:bg-red-500 p-2 rounded-lg duration-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {loading ? (
            <div className="text-center text-gray-400 py-8">
              جاري تحميل العملاء...
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center text-gray-400 py-8">لا يوجد عملاء</div>
          ) : (
            filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700"
              >
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">الكود</span>

                    <span className="font-bold text-green-400">
                      {client.clientCode}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">الاسم</span>

                    <span className="text-white">{client.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">الهاتف</span>

                    <span className="text-white">{client.phone}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">تاريخ الإضافة</span>

                    <span className="text-white">
                      {formatDate(client.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/dashboard/clients/${client.clientCode}`);
                    }}
                    className="bg-blue-600 hover:bg-blue-500 p-2 rounded-lg duration-300"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => setEditClient(client)}
                    className="bg-yellow-500 hover:bg-yellow-400 p-2 rounded-lg duration-300"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteClient(client)}
                    className="bg-red-600 hover:bg-red-500 p-2 rounded-lg duration-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <EditClientModal
          client={editClient}
          open={!!editClient}
          onClose={() => setEditClient(null)}
        />
      </div>
    </div>
  );
};

export default ClientTable;
