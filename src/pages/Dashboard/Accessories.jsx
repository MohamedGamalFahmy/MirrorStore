import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import {
  addAccessory,
  deleteAccessory,
  getAccessories,
  updateAccessory,
} from "../../services/accessoryService";

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [type, setType] = useState("set");
  const loadAccessories = async () => {
    try {
      setLoading(true);
      const data = await getAccessories();
      setAccessories(data);
    } catch (error) {
      console.error("Error loading accessories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccessories();
  }, []);

  const resetForm = () => {
    setCode("");
    setName("");
    setDefaultPrice("");
    setType("set");
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (accessory) => {
    setEditingId(accessory.id);
    setCode(accessory.code || "");
    setName(accessory.name || "");
    setDefaultPrice(accessory.defaultPrice ?? "");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleSave = async () => {
    if (!code.trim() || !name.trim() || !defaultPrice) {
      alert("من فضلك أكمل البيانات");
      return;
    }

    const data = {
      code: code.trim(),
      name: name.trim(),
      defaultPrice: Number(defaultPrice),
      type,
    };

    try {
      if (editingId) {
        await updateAccessory(editingId, data);
        alert("تم تعديل الإكسسوار بنجاح");
      } else {
        await addAccessory(data);
        alert("تم إضافة الإكسسوار بنجاح");
      }

      closeModal();
      await loadAccessories();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الحفظ");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا الإكسسوار؟");

    if (!confirmed) return;

    try {
      await deleteAccessory(id);
      await loadAccessories();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">إكسسوارات السيكوريت</h1>

          <p className="text-gray-500 mt-1">
            إدارة الأطقم والإكسسوارات وأسعارها
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-zinc-900 text-white px-5 py-3 rounded-xl hover:bg-zinc-800 duration-300"
        >
          <Plus size={18} />
          إضافة إكسسوار
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            جاري تحميل الإكسسوارات...
          </div>
        ) : accessories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            لا توجد إكسسوارات حاليًا
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-semibold">الكود</th>
                  <th className="p-4 font-semibold">الإكسسوار</th>
                  <th className="p-4 font-semibold">السعر</th>
                  <th className="p-4 font-semibold text-center">الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {accessories.map((accessory) => (
                  <tr
                    key={accessory.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="p-4">{accessory.code}</td>

                    <td className="p-4 font-medium">{accessory.name}</td>

                    <td className="p-4">
                      {Number(accessory.defaultPrice || 0).toLocaleString(
                        "ar-EG",
                      )}{" "}
                      ج
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(accessory)}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                          title="تعديل"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(accessory.id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          title="حذف"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-xl font-bold">
                {editingId ? "تعديل الإكسسوار" : "إضافة إكسسوار"}
              </h2>

              <button type="button" onClick={closeModal} className="p-1">
                <X />
              </button>
            </div>

            {/* Form */}
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  كود الإكسسوار
                </label>

                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-zinc-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  اسم الإكسسوار
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-zinc-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  اسم الإكسسوار
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-zinc-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  السعر الافتراضي
                </label>

                <input
                  type="number"
                  value={defaultPrice}
                  onChange={(e) => setDefaultPrice(e.target.value)}
                  placeholder="السعر"
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-zinc-200"
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="w-full bg-zinc-900 text-white rounded-xl py-3 font-semibold hover:bg-zinc-800"
              >
                {editingId ? "حفظ التعديل" : "إضافة الإكسسوار"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accessories;
