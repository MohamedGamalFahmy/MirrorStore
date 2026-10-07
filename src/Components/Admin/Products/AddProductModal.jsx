import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { addProduct } from "../../../services/productService";
import { getAccessories } from "../../../services/accessoryService";

const AddProductModal = ({ open, onClose }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [type, setType] = useState("product");
  const [unit, setUnit] = useState("m2");

  const [accessories, setAccessories] = useState([]);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  // جلب أطقم السيكوريت
  useEffect(() => {
    const loadAccessories = async () => {
      try {
        const data = await getAccessories();
        setAccessories(data);
      } catch (error) {
        console.error("Error loading accessories:", error);
      }
    };

    if (open) {
      loadAccessories();
    }
  }, [open]);

  // اختيار / إلغاء طقم
  const toggleAccessory = (accessoryId) => {
    setSelectedAccessories((prev) =>
      prev.includes(accessoryId)
        ? prev.filter((id) => id !== accessoryId)
        : [...prev, accessoryId],
    );
  };

  const handleSave = async () => {
    if (!code || !name || !defaultPrice) {
      alert("من فضلك أكمل البيانات");
      return;
    }

    try {
      await addProduct({
        code,
        name,
        defaultPrice: Number(defaultPrice),
        type,
        unit: type === "service" ? unit : "m2",

        // الأطقم المتاحة لهذا الصنف
        availableAccessories: type === "securit" ? selectedAccessories : [],
      });

      alert("تم إضافة الصنف بنجاح");

      setCode("");
      setName("");
      setDefaultPrice("");
      setType("product");
      setUnit("m2");
      setSelectedAccessories([]);

      onClose();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-bold text-xl">إضافة صنف</h2>

          <button type="button" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">النوع</label>

            <select
              value={type}
              onChange={(e) => {
                const newType = e.target.value;

                setType(newType);

                if (newType !== "securit") {
                  setSelectedAccessories([]);
                }
              }}
              className="w-full border rounded-xl p-3"
            >
              <option value="product">صنف عادي</option>
              <option value="securit">سيكوريت</option>
              <option value="service">خدمة</option>
            </select>
          </div>
          {/* Code */}
          <input
            type="text"
            placeholder="كود الصنف"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          {/* Name */}
          <input
            type="text"
            placeholder={type === "service" ? "اسم الخدمة" : "اسم الصنف"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          {/* Price */}
          <input
            type="number"
            placeholder="السعر الافتراضي"
            value={defaultPrice}
            onChange={(e) => setDefaultPrice(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

       

          {/* Accessories */}
          {type === "securit" && (
            <div>
              <label className="block text-sm font-semibold mb-2">
                أطقم السيكوريت المتاحة
              </label>

              {accessories.length === 0 ? (
                <div className="border rounded-xl p-3 text-sm text-gray-500 text-center">
                  لا توجد أطقم مضافة حاليًا
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-xl p-3">
                  {accessories.map((accessory) => {
                    const selected = selectedAccessories.includes(accessory.id);

                    return (
                      <button
                        key={accessory.id}
                        type="button"
                        onClick={() => toggleAccessory(accessory.id)}
                        className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl border duration-200 text-right ${
                          selected
                            ? "border-zinc-900 bg-zinc-100"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{accessory.name}</p>

                          <p className="text-xs text-gray-500">
                            {accessory.code}
                          </p>
                        </div>

                        <div className="text-sm font-semibold">
                          {Number(accessory.defaultPrice || 0).toLocaleString(
                            "ar-EG",
                          )}{" "}
                          ج
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {selectedAccessories.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  تم اختيار {selectedAccessories.length} طقم
                </p>
              )}
            </div>
          )}

          {/* Save */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-zinc-900 text-white rounded-xl py-3"
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
