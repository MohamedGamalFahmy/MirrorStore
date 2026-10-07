import { useEffect, useState } from "react";
import AddProductModal from "../../Components/Admin/Products/AddProductModal";
import EditProductModal from "../../Components/Admin/Products/EditProductModal";
import {
  getProducts,
  deleteProduct,
} from "../../services/productService";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تحميل الأصناف");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `هل أنت متأكد من تعطيل "${product.name}"؟`
    );

    if (!confirmed) return;

    try {
      await deleteProduct(product.id);

      alert("تم حذف الصنف");

      loadProducts();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء حذف الصنف");
    }
  };

  return (
    <div className="space-y-6">

      {/* Add Modal */}
      <AddProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          loadProducts();
        }}
      />

      {/* Edit Modal */}
      <EditProductModal
        open={openEditModal}
        product={selectedProduct}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedProduct(null);
          loadProducts();
        }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold">
            الأصناف
          </h1>

          <p className="text-gray-500">
            إدارة أصناف الزجاج والأسعار
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="
            bg-zinc-900
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-zinc-800
            duration-300
          "
        >
          + إضافة صنف
        </button>

      </div>

      {/* Products */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="space-y-4">

          {products.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              لا توجد أصناف حاليًا
            </p>
          ) : (
            products.map((product) => (

              <div
                key={product.id}
                className="
                  border
                  rounded-2xl
                  p-4
                  flex
                  flex-col
                  gap-3
                  text-right
                "
              >

                {/* Name + Type */}
                <div className="flex items-center justify-between gap-3">

                  <h3 className="font-bold text-lg">
                    {product.name}
                  </h3>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      product.type === "service"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.type === "service"
                      ? "خدمة"
                      : "صنف"}
                  </span>

                </div>

                {/* Code */}
                <p className="text-gray-500">
                  الكود: {product.code}
                </p>

                {/* Price */}
                <p className="font-semibold text-zinc-700">
                  السعر: {product.defaultPrice} ج
                </p>

                {/* Unit */}
                <p className="text-gray-500">
                  الوحدة:{" "}
                  {product.unit === "m2"
                    ? "متر مربع"
                    : product.unit === "linear_meter"
                    ? "متر طولي"
                    : product.unit === "piece"
                    ? "قطعة"
                    : product.unit}
                </p>

                {/* Actions */}
                <div className="flex gap-2 pt-2">

                  <button
                    type="button"
                    onClick={() => handleEdit(product)}
                    className="
                      flex-1
                      border
                      border-zinc-300
                      rounded-xl
                      py-2
                      hover:bg-zinc-100
                    "
                  >
                    تعديل
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(product)}
                    className="
                      flex-1
                      bg-red-600
                      text-white
                      rounded-xl
                      py-2
                      hover:bg-red-700
                    "
                  >
                    حذف
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  );
};

export default Products;