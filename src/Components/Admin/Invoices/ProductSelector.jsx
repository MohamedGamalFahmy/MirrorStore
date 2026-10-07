import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productService";

const ProductSelector = ({ value, onChange }) => {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const loadProducts = async () => {
try {
const data = await getProducts();
setProducts(data);
} catch (error) {
console.error("Failed to load products:", error);
} finally {
setLoading(false);
}
};


loadProducts();

}, []);

if (loading) {
return ( <div className="border rounded-xl p-3 text-gray-500">
جاري تحميل الأصناف... </div>
);
}

return (
<select
value={value}
onChange={(e) => {
  const selectedProduct = products.find(
    (product) => product.id === e.target.value
    
  );

  onChange(selectedProduct || null);
}}className="w-full border rounded-xl p-3 text-sm"
> <option value="">اختر الصنف</option>

  {products
.filter(
  (product) =>
    product.type === "product" ||
    product.type === "securit"
)  .map((product) => (
    // <option key={product.id} value={product.id}>
    //   {product.name}
    // </option>
     <option key={product.id} value={product.id}>
  {product.name} - {product.defaultPrice} ج
  </option>
  ))}
</select>

);
};

export default ProductSelector;
