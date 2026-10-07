// import { X } from "lucide-react";
// import InvoiceHeader from "./InvoiceHeader";
// import ProductSection from "./ProductSection";
// import { useEffect, useState } from "react";
// import {
//   getNextInvoiceNumber,
//   addInvoice,
// } from "../../../services/invoiceService";

// const InvoiceModal = ({ open, onClose, client }) => {
//   const [invoiceData, setInvoiceData] = useState(null);
//   const [invoiceNumber, setInvoiceNumber] = useState("");
//   const [loadingNumber, setLoadingNumber] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [paid, setPaid] = useState(0);

//   useEffect(() => {
//     if (!open) return;

//     const loadInvoiceNumber = async () => {
//       try {
//         setLoadingNumber(true);

//         const number = await getNextInvoiceNumber();

//         setInvoiceNumber(number);
//       } catch (error) {
//         console.error("Error loading invoice number:", error);
//       } finally {
//         setLoadingNumber(false);
//       }
//     };

//     loadInvoiceNumber();
//   }, [open]);
//   const subtotal = Number(invoiceData?.subtotal || 0);

//   const paidAmount = Math.min(Math.max(Number(paid) || 0, 0), subtotal);

//   const remaining = subtotal - paidAmount;

//   const paymentStatus =
//     paidAmount === 0 ? "unpaid" : paidAmount >= subtotal ? "paid" : "partial";

//   const handleSaveInvoice = async () => {
//     if (!invoiceData || invoiceData.length === 0) {
//       alert("من فضلك أضف منتج إلى الفاتورة");
//       return;
//     }

//     try {
//       setSaving(true);
//       console.log("INVOICE DATA BEFORE SAVE:", invoiceData);
//       console.log("ITEMS BEFORE SAVE:", invoiceData?.items);
//      console.log(
//   "MEASUREMENTS BEFORE SAVE:",
//   JSON.stringify(invoiceData?.items, null, 2),

//       );
//       const subtotal = Number(invoiceData?.subtotal || 0);

//       const invoice = {
//         invoiceNumber,
//         clientId: client?.id || "",
//         clientCode: client?.clientCode || "",
//         clientName: client?.name || "",

//         items: invoiceData,

//         paid: paidAmount,
//         remaining: remaining,
//         paymentStatus: paymentStatus,
//         executionStatus: "pending",

//         createdAt: new Date(),
//       };
//       const invoiceId = await addInvoice(invoice);

//       console.log("Invoice saved:", invoiceId);

//       alert("تم حفظ الفاتورة بنجاح");

//       onClose();
//     } catch (error) {
//       console.error("Error saving invoice:", error);
//       alert("حدث خطأ أثناء حفظ الفاتورة");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center">
//       <div
//         className="
//         bg-white
//         w-full
//         md:max-w-5xl
//         rounded-t-3xl
//         md:rounded-3xl
//         max-h-[95vh]
//         overflow-y-auto
//         "
//       >
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b px-5 py-4 flex items-center justify-between">
//           <button onClick={onClose}>
//             <X />
//           </button>

//           <h2 className="text-xl font-bold">إنشاء فاتورة</h2>
//         </div>

//         <div className="p-5">
//           <InvoiceHeader
//             client={client}
//             invoiceNumber={loadingNumber ? "..." : invoiceNumber}
//           />

//           <ProductSection onChange={setInvoiceData} />
//           {/* Payment */}
//           <div className="mt-6 bg-zinc-50 border rounded-2xl p-5">
//             <h3 className="font-bold text-lg mb-4">الدفع</h3>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               {/* Total */}
//               <div className="bg-white border rounded-xl p-4">
//                 <p className="text-sm text-zinc-500">إجمالي الفاتورة</p>

//                 <p className="text-xl font-black mt-1">
//                   {subtotal.toLocaleString("ar-EG")} جنيه
//                 </p>
//               </div>

//               {/* Paid */}
//               <div className="bg-white border rounded-xl p-4">
//                 <label className="block text-sm text-zinc-500 mb-2">
//                   المدفوع / العربون
//                 </label>

//                 <input
//                   type="number"
//                   min="0"
//                   max={subtotal}
//                   value={paid}
//                   onChange={(e) => setPaid(e.target.value)}
//                   className="
//           w-full
//           border
//           rounded-xl
//           px-3
//           py-2
//           font-bold
//           outline-none
//           focus:border-black
//         "
//                   placeholder="0"
//                 />
//               </div>

//               {/* Remaining */}
//               <div className="bg-white border rounded-xl p-4">
//                 <p className="text-sm text-zinc-500">المتبقي</p>

//                 <p className="text-xl font-black mt-1">
//                   {remaining.toLocaleString("ar-EG")} جنيه
//                 </p>
//               </div>
//             </div>

//             {/* Payment Status */}
//             <div className="mt-4 flex items-center justify-between bg-white border rounded-xl px-4 py-3">
//               <span className="text-sm text-zinc-500">حالة الدفع</span>

//               <span className="font-bold">
//                 {paymentStatus === "unpaid"
//                   ? "غير مدفوعة"
//                   : paymentStatus === "partial"
//                     ? "مدفوع جزئيًا"
//                     : "مدفوعة بالكامل"}
//               </span>
//             </div>
//           </div>
//           {/* Save */}
//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={handleSaveInvoice}
//               disabled={saving || loadingNumber}
//               className="
//                 bg-black
//                 text-white
//                 px-6
//                 py-3
//                 rounded-xl
//                 font-bold
//                 disabled:opacity-50
//               "
//             >
//               {saving ? "جاري الحفظ..." : "حفظ الفاتورة"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceModal;

import { X } from "lucide-react";
import InvoiceHeader from "./InvoiceHeader";
import ProductSection from "./ProductSection";
import { useEffect, useState } from "react";
import {
  getNextInvoiceNumber,
  addInvoice,
} from "../../../services/invoiceService";

const InvoiceModal = ({ open, onClose, client }) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [loadingNumber, setLoadingNumber] = useState(false);
  const [saving, setSaving] = useState(false);

  const [paid, setPaid] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [executionStatus, setExecutionStatus] = useState("waiting");

  // =========================
  // Load Invoice Number
  // =========================

  useEffect(() => {
    if (!open) return;

    const loadInvoiceNumber = async () => {
      try {
        setLoadingNumber(true);

        const number = await getNextInvoiceNumber();

        setInvoiceNumber(number);
      } catch (error) {
        console.error("Error loading invoice number:", error);
      } finally {
        setLoadingNumber(false);
      }
    };

    loadInvoiceNumber();
  }, [open]);

  // =========================
  // Invoice Calculations
  // =========================

  const subtotal = Number(invoiceData?.subtotal || 0);

  const discountAmount = Math.min(
    Math.max(Number(discount) || 0, 0),
    subtotal,
  );

  const total = subtotal - discountAmount;

  const paidAmount = Math.min(
    Math.max(Number(paid) || 0, 0),
    total,
  );

  const remaining = total - paidAmount;

  const paymentStatus =
    paidAmount === 0
      ? "unpaid"
      : paidAmount >= total
        ? "paid"
        : "partial";

  // =========================
  // Save Invoice
  // =========================

  const handleSaveInvoice = async () => {
    // التأكد من وجود بيانات الفاتورة
    if (!invoiceData || !invoiceData.items || invoiceData.items.length === 0) {
      alert("من فضلك أضف منتج إلى الفاتورة");
      return;
    }

    try {
      setSaving(true);

      console.log("========== INVOICE BEFORE SAVE ==========");
      console.log("Invoice Data:", invoiceData);
      console.log("Items:", invoiceData.items);
      console.log("Subtotal:", subtotal);
      console.log("Discount:", discountAmount);
      console.log("Total:", total);
      console.log("Paid:", paidAmount);
      console.log("Remaining:", remaining);
      console.log("Payment Status:", paymentStatus);
      console.log("Execution Status:", executionStatus);
      console.log("=========================================");

      const invoice = {
        // =========================
        // Basic Information
        // =========================

        invoiceNumber,

        clientId: client?.id || "",
        clientCode: client?.clientCode || "",
        clientName: client?.name || "",

        // =========================
        // Invoice Items
        // =========================

        items: invoiceData.items,

        // =========================
        // Financial Information
        // =========================

        subtotal,

        discount: discountAmount,

        total,

        paid: paidAmount,

        remaining,

        paymentStatus,

        // =========================
        // Execution
        // =========================

        executionStatus,

        // =========================
        // Date
        // =========================

        createdAt: new Date(),
      };

      const invoiceId = await addInvoice(invoice);

      console.log("Invoice saved successfully:", invoiceId);

      alert("تم حفظ الفاتورة بنجاح");

      onClose();
    } catch (error) {
      console.error("Error saving invoice:", error);

      alert("حدث خطأ أثناء حفظ الفاتورة");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center">
      <div
        className="
          bg-white
          w-full
          md:max-w-5xl
          rounded-t-3xl
          md:rounded-3xl
          max-h-[95vh]
          overflow-y-auto
        "
      >
        {/* =========================
            Header
        ========================= */}

        <div className="sticky top-0 z-10 bg-white border-b px-5 py-4 flex items-center justify-between">
          <button onClick={onClose}>
            <X />
          </button>

          <h2 className="text-xl font-bold">
            إنشاء فاتورة
          </h2>
        </div>

        <div className="p-5">

          {/* =========================
              Invoice Header
          ========================= */}

          <InvoiceHeader
            client={client}
            invoiceNumber={
              loadingNumber ? "..." : invoiceNumber
            }
          />

          {/* =========================
              Products
          ========================= */}

          <ProductSection onChange={setInvoiceData} />

          {/* =========================
              Payment
          ========================= */}

          <div className="mt-6 bg-zinc-50 border rounded-2xl p-5">

            <h3 className="font-bold text-lg mb-4">
              الحساب والدفع
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Subtotal */}

              <div className="bg-white border rounded-xl p-4">
                <p className="text-sm text-zinc-500">
                  إجمالي الفاتورة
                </p>

                <p className="text-xl font-black mt-1">
                  {subtotal.toLocaleString("ar-EG")} جنيه
                </p>
              </div>

              {/* Discount */}

              <div className="bg-white border rounded-xl p-4">

                <label className="block text-sm text-zinc-500 mb-2">
                  الخصم
                </label>

                <input
                  type="number"
                  min="0"
                  max={subtotal}
                  value={discount}
                  onChange={(e) =>
                    setDiscount(e.target.value)
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-3
                    py-2
                    font-bold
                    outline-none
                    focus:border-black
                  "
                  placeholder="0"
                />

              </div>

              {/* Paid */}

              <div className="bg-white border rounded-xl p-4">

                <label className="block text-sm text-zinc-500 mb-2">
                  المدفوع / العربون
                </label>

                <input
                  type="number"
                  min="0"
                  max={total}
                  value={paid}
                  onChange={(e) =>
                    setPaid(e.target.value)
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-3
                    py-2
                    font-bold
                    outline-none
                    focus:border-black
                  "
                  placeholder="0"
                />

              </div>

              {/* Remaining */}

              <div className="bg-white border rounded-xl p-4">

                <p className="text-sm text-zinc-500">
                  المتبقي
                </p>

                <p className="text-xl font-black mt-1">
                  {remaining.toLocaleString("ar-EG")} جنيه
                </p>

              </div>

            </div>

            {/* Final Total */}

            <div className="mt-4 bg-black text-white rounded-xl px-4 py-4 flex items-center justify-between">

              <span className="font-semibold">
                الإجمالي النهائي
              </span>

              <span className="text-2xl font-black">
                {total.toLocaleString("ar-EG")} جنيه
              </span>

            </div>

            {/* Payment Status */}

            <div className="mt-4 flex items-center justify-between bg-white border rounded-xl px-4 py-3">

              <span className="text-sm text-zinc-500">
                حالة الدفع
              </span>

              <span
                className={`font-bold ${
                  paymentStatus === "paid"
                    ? "text-green-600"
                    : paymentStatus === "partial"
                      ? "text-orange-600"
                      : "text-red-600"
                }`}
              >
                {paymentStatus === "unpaid"
                  ? "غير مدفوعة"
                  : paymentStatus === "partial"
                    ? "مدفوع جزئيًا"
                    : "مدفوعة بالكامل"}
              </span>

            </div>

            {/* =========================
                Execution Status
            ========================= */}

            <div className="mt-4 bg-white border rounded-xl p-4">

              <label className="block text-sm text-zinc-500 mb-2">
                حالة التنفيذ
              </label>

              <select
                value={executionStatus}
                onChange={(e) =>
                  setExecutionStatus(e.target.value)
                }
                className="
                  w-full
                  border
                  rounded-xl
                  px-3
                  py-3
                  font-bold
                  outline-none
                  bg-white
                "
              > <option value="waiting">
                 انتظار موافقه العميل
                </option>
                <option value="pending">
                  قيد التنفيذ
                </option>

                <option value="ready">
                  جاهز
                </option>

                <option value="delivered">
                  تم التسليم
                </option>
              </select>

            </div>

          </div>

          {/* =========================
              Save
          ========================= */}

          <div className="mt-6 flex justify-end">

            <button
              onClick={handleSaveInvoice}
              disabled={saving || loadingNumber}
              className="
                bg-black
                text-white
                px-6
                py-3
                rounded-xl
                font-bold
                disabled:opacity-50
              "
            >
              {saving
                ? "جاري الحفظ..."
                : "حفظ الفاتورة"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;

