// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import { getClientByCode } from "../../services/clientService";
// import { getInvoicesByClientCode } from "../../services/invoiceService";

// const ClientPortal = () => {
//   const { clientCode } = useParams();
//   const navigate = useNavigate();

//   const [client, setClient] = useState(null);
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);

//         const clientData = await getClientByCode(clientCode);

//         if (!clientData) {
//           setClient(null);
//           return;
//         }

//         setClient(clientData);

//         const invoiceData = await getInvoicesByClientCode(clientCode);

//         setInvoices(invoiceData);
//       } catch (error) {
//         console.error("Error loading client portal:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (clientCode) {
//       loadData();
//     }
//   }, [clientCode]);

//   const totalInvoices = invoices.length;

//   const totalAmount = invoices.reduce(
//     (total, invoice) => total + Number(invoice.items?.subtotal || 0),
//     0,
//   );

//   const latestInvoice = invoices[0];

//   const formatMoney = (value) => Number(value || 0).toLocaleString("ar-EG");

//   if (loading) {
//     return (
//       <div
//         dir="rtl"
//         className="min-h-screen bg-zinc-100 flex items-center justify-center"
//       >
//         <div className="text-center">
//           <div className="w-10 h-10 border-4 border-zinc-300 border-t-black rounded-full animate-spin mx-auto" />

//           <p className="font-semibold text-zinc-700 mt-4">
//             جاري تحميل بياناتك...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!client) {
//     return (
//       <div
//         dir="rtl"
//         className="min-h-screen bg-zinc-100 flex items-center justify-center px-4"
//       >
//         <div className="bg-white rounded-3xl shadow-sm border p-8 text-center max-w-md w-full">
//           <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl">
//             !
//           </div>

//           <h2 className="text-xl font-bold mt-5">العميل غير موجود</h2>

//           <p className="text-zinc-500 mt-2">
//             تأكد من كود العميل وحاول مرة أخرى.
//           </p>

//           <button
//             onClick={() => navigate("/clients")}
//             className="mt-6 bg-black text-white px-6 py-3 rounded-xl font-semibold"
//           >
//             العودة
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div dir="rtl" className="min-h-screen bg-zinc-100 text-zinc-900">
//       {/* Header */}
//       <header className="bg-black text-white">
//         <div className="max-w-6xl mx-auto px-4 py-5">
//           <div className="flex items-center justify-between gap-4">
//             <div>
//               <div className="text-2xl font-black tracking-wider">GF</div>

//               <p className="text-xs text-zinc-400 mt-1">GF for Glass</p>
//             </div>

//             <button
//               onClick={() => navigate("/")}
//               className="
//                 border border-white/20
//                 hover:bg-white/10
//                 transition
//                 rounded-xl
//                 px-4
//                 py-2
//                 text-sm
//                 font-semibold
//               "
//             >
//               الصفحة الرئيسية
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="max-w-6xl mx-auto px-4 py-6">
//         {/* Welcome */}
//         <section className="bg-white rounded-3xl border shadow-sm p-5 md:p-7">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
//             <div>
//               <p className="text-sm text-zinc-500">
//                 مرحباً بك في بوابة العملاء
//               </p>

//               <h1 className="text-2xl md:text-3xl font-black mt-1">
//                 أهلاً {client.name}
//               </h1>

//               <div className="mt-3 inline-flex items-center gap-2 bg-zinc-100 rounded-xl px-3 py-2">
//                 <span className="text-xs text-zinc-500">كود العميل</span>

//                 <span className="font-bold text-sm">{client.clientCode}</span>
//               </div>
//             </div>

//             <div className="bg-zinc-50 rounded-2xl p-4 md:min-w-[190px]">
//               <p className="text-xs text-zinc-500">حالة الحساب</p>

//               <p className="font-bold mt-1 text-green-400">عميل نشط</p>

//               <div className="flex items-center gap-2 mt-2">
//                 <span className="w-2 h-2 rounded-full bg-green-500" />
//                 <span className="text-xs text-zinc-500">الحساب متاح</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Statistics */}
//         <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
//           <div className="bg-white border rounded-2xl p-5 shadow-sm">
//             <p className="text-sm text-zinc-500">عدد الفواتير</p>

//             <p className="text-3xl font-black mt-2  text-zinc-900">
//               {totalInvoices}
//             </p>

//             <p className="text-xs text-zinc-400 mt-1">فاتورة</p>
//           </div>

//           <div className="bg-white border rounded-2xl p-5 shadow-sm  text-black ">
//             <p className="text-sm text-zinc-500">إجمالي الفواتير</p>

//             <p className="text-2xl font-black mt-2 text-zinc-900">
//               {formatMoney(totalAmount)}
//             </p>

//             <p className="text-xs  mt-1 text-black">جنيه</p>
//           </div>

//           <div className="bg-white border rounded-2xl p-5 shadow-sm">
//             <p className="text-sm text-zinc-500">آخر فاتورة</p>

//             <p className="text-2xl font-black mt-2  text-zinc-900">
//               {latestInvoice ? `#${latestInvoice.invoiceNumber}` : "-"}
//             </p>

//             <p className="text-xs text-zinc-400 mt-1">أحدث فاتورة</p>
//           </div>
//         </section>

//         {/* Invoices */}
//         <section className="mt-6">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h2 className="text-xl font-black">فواتيري</h2>

//               <p className="text-sm text-zinc-500 mt-1">
//                 جميع الفواتير الخاصة بحسابك
//               </p>
//             </div>
//           </div>

//           {invoices.length === 0 ? (
//             <div className="bg-white border rounded-3xl p-10 text-center shadow-sm">
//               <p className="font-semibold text-zinc-700">
//                 لا توجد فواتير حتى الآن
//               </p>

//               <p className="text-sm text-zinc-400 mt-2">
//                 ستظهر الفواتير هنا عند إنشائها.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {invoices.map((invoice) => (
//                 <div
//                   key={invoice.id}
//                   className="
//                     bg-white
//                     border
//                     rounded-2xl
//                     p-4
//                     md:p-5
//                     shadow-sm
//                     hover:shadow-md
//                     transition
//                   "
//                 >
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-sm">
//                         GF
//                       </div>

//                       <div>
//                         <p className="font-black  text-zinc-900">
//                           فاتورة #{invoice.invoiceNumber}
//                         </p>

//                         <p className="text-sm text-zinc-500 mt-1">
//                           إجمالي الفاتورة
//                         </p>

//                         <p className="font-bold mt-1 text-black">
//                           {formatMoney(invoice.items?.subtotal)} جنيه
//                         </p>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => setSelectedInvoice(invoice)}
//                       className="
//                         w-full
//                         md:w-auto
//                         bg-black
//                         text-white
//                         px-5
//                         py-3
//                         rounded-xl
//                         text-sm
//                         font-semibold
//                         hover:bg-zinc-800
//                         transition
//                       "
//                     >
//                       عرض الفاتورة
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Invoice Modal */}
//       {selectedInvoice && (
//         <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
//           <div
//             dir="rtl"
//             className="
//               bg-white
//               w-full
//               max-w-3xl
//               max-h-[90vh]
//               overflow-y-auto
//               rounded-3xl
//               shadow-2xl
//             "
//           >
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
//               <button
//                 onClick={() => setSelectedInvoice(null)}
//                 className="
//                   w-9
//                   h-9
//                   rounded-full
//                   bg-zinc-100
//                   hover:bg-zinc-200
//                   transition
//                   text-zinc-600
//                 "
//               >
//                 ✕
//               </button>

//               <div className="text-right">
//                 <p className="text-xs text-zinc-500">GF for Glass</p>

//                 <h2 className="text-lg font-black">
//                   فاتورة #{selectedInvoice.invoiceNumber}
//                 </h2>
//               </div>
//             </div>

//             <div className="p-5">
//               {/* Client */}
//               <div className="bg-zinc-50 rounded-2xl p-4 mb-5">
//                 <p className="text-xs text-zinc-500">بيانات العميل</p>

//                 <p className="font-bold mt-1 text-red-300">
//                   {selectedInvoice.clientName}
//                 </p>

//                 <p className="text-sm text-zinc-500 mt-1">
//                   كود العميل:{" "}
//                   <span className="font-semibold text-zinc-800">
//                     {selectedInvoice.clientCode}
//                   </span>
//                 </p>
//               </div>

//               {/* Products */}
//               <div className="space-y-4">
//                 {selectedInvoice.items?.items?.map((item, index) => (
//                   <div
//                     key={item.id || index}
//                     className="border rounded-2xl p-4"
//                   >
//                     <div className="flex items-start justify-between gap-3">
//                       <div>
//                         <h3 className="font-black text-lg">
//                           {item.product?.name}
//                         </h3>
//                       </div>

//                       <span className="text-xs bg-zinc-100 px-3 py-1 rounded-lg">
//                         {item.measurements?.length || 0} مقاس
//                       </span>
//                     </div>

//                     {/* Measurements */}
//                     <div className="mt-4 space-y-4">
//                       {item.measurements?.map(
//                         (measurement, measurementIndex) => {
//                           const calculation = measurement.calculation;

//                           return (
//                             <div
//                               key={measurement.id || measurementIndex}
//                               className="bg-zinc-50 rounded-2xl p-4 border"
//                             >
//                               {/* Measurement Header */}
//                               <div className="flex items-center justify-between gap-3 mb-4">
//                                 <p className="font-bold text-black">
//                                   المقاس {measurementIndex + 1}
//                                 </p>

//                                 {calculation && (
//                                   <span className="text-xs bg-white border px-3 py-1 rounded-lg font-semibold">
//                                     إجمالي المقاس:{" "}
//                                     {formatMoney(calculation.total)} جنيه
//                                   </span>
//                                 )}
//                               </div>

//                               {/* Dimensions */}
//                               <div className="grid grid-cols-3 gap-2 text-sm">
//                                 <div className="bg-white rounded-xl p-3 border">
//                                   <p className="text-xs text-zinc-500">الطول</p>

//                                   <p className="font-black text-lg mt-1 text-zinc-900">
//                                     {measurement.length || "-"}
//                                   </p>
//                                 </div>

//                                 <div className="bg-white rounded-xl p-3 border">
//                                   <p className="text-xs text-zinc-500">العرض</p>

//                                   <p className="font-black text-lg mt-1 text-zinc-900">
//                                     {measurement.width || "-"}
//                                   </p>
//                                 </div>

//                                 <div className="bg-white rounded-xl p-3 border">
//                                   <p className="text-xs text-zinc-500">
//                                     الكمية
//                                   </p>

//                                   <p className="font-black text-lg mt-1 text-zinc-900">
//                                     {measurement.quantity || "-"}
//                                   </p>

//                                   <p className="text-[10px] text-zinc-500">
//                                     قطعة
//                                   </p>
//                                 </div>
//                               </div>

//                               {/* Calculation Details */}
//                               {calculation && (
//                                 <div className="mt-4 space-y-3">
//                                   {/* Product */}
//                                   <div className="bg-white rounded-xl border p-3">
//                                     <div className="flex items-center justify-between gap-3">
//                                       <div>
//                                         <p className="font-bold text-sm text-zinc-700">
//                                           {calculation.productCalculation?.name}
//                                         </p>

//                                         <p className="text-xs text-zinc-500 mt-1">
//                                           مساحة:{" "}
//                                           {Number(
//                                             calculation.area || 0,
//                                           ).toLocaleString("ar-EG", {
//                                             maximumFractionDigits: 2,
//                                           })}{" "}
//                                           م²
//                                         </p>
//                                       </div>

//                                       <div className="text-left">
//                                         <p className="text-xs text-zinc-500">
//                                           سعر المتر
//                                         </p>

//                                         <p className="font-bold text-zinc-700">
//                                           {formatMoney(
//                                             calculation.productCalculation
//                                               ?.unitPrice,
//                                           )}{" "}
//                                           ج
//                                         </p>
//                                       </div>
//                                     </div>

//                                     <div className="border-t mt-3 pt-3 flex justify-between text-sm">
//                                       <span className="text-zinc-500">
//                                         إجمالي المنتج
//                                       </span>

//                                       <span className="font-black">
//                                         {formatMoney(
//                                           calculation.productCalculation?.total,
//                                         )}{" "}
//                                         جنيه
//                                       </span>
//                                     </div>
//                                   </div>

//                                   {/* Services */}
//                                   {calculation.servicesCalculation?.length >
//                                     0 && (
//                                     <div className="bg-white rounded-xl border p-3">
//                                       <p className="font-bold text-sm mb-3 text-zinc-700">
//                                         الخدمات
//                                       </p>

//                                       <div className="space-y-2">
//                                         {calculation.servicesCalculation.map(
//                                           (service, serviceIndex) => (
//                                             <div
//                                               key={serviceIndex}
//                                               className="border rounded-xl p-3"
//                                             >
//                                               <div className="flex items-center justify-between gap-3 text-zinc-700 ">
//                                                 <div>
//                                                   <p className="font-semibold text-sm text-zinc-700">
//                                                     {service.name}
//                                                   </p>

//                                                   <p className="text-xs text-zinc-500 mt-1">
//                                                     {Number(
//                                                       service.quantity || 0,
//                                                     ).toLocaleString("ar-EG", {
//                                                       maximumFractionDigits: 2,
//                                                     })}{" "}
//                                                     {service.unit}
//                                                     {" × "}
//                                                     {formatMoney(
//                                                       service.unitPrice,
//                                                     )}{" "}
//                                                     ج
//                                                   </p>
//                                                 </div>

//                                                 <p className="font-black text-sm whitespace-nowrap text-zinc-700">
//                                                   {formatMoney(service.total)} ج
//                                                 </p>
//                                               </div>
//                                             </div>
//                                           ),
//                                         )}
//                                       </div>

//                                       <div className="border-t mt-3 pt-3 flex justify-between text-sm">
//                                         <span className="text-zinc-500">
//                                           إجمالي الخدمات
//                                         </span>

//                                         <span className="font-black">
//                                           {formatMoney(
//                                             calculation.servicesTotal,
//                                           )}{" "}
//                                           جنيه
//                                         </span>
//                                       </div>
//                                     </div>
//                                   )}

//                                   {/* Accessories */}
//                                   {calculation.accessoriesCalculation?.length >
//                                     0 && (
//                                     <div className="bg-white rounded-xl border p-3">
//                                       <p className="font-extrabold text-base  mb-3 text-zinc-700">
//                                         إكسسوارات السيكوريت
//                                       </p>

//                                       <div className="space-y-2">
//                                         {calculation.accessoriesCalculation.map(
//                                           (accessory, accessoryIndex) => (
//                                             <div
//                                               key={accessoryIndex}
//                                               className="border rounded-xl p-3"
//                                             >
//                                               <div className="flex items-center justify-between gap-3">
//                                                 <div>
//                                                   <p className="font-semibold text-sm text-zinc-700">
//                                                     {accessory.name}
//                                                   </p>

//                                                   <p className="text-xs text-zinc-700 mt-1">
//                                                     الكمية: {accessory.quantity}{" "}
//                                                     {accessory.unit}
//                                                     {accessory.unit ===
//                                                       "عود" && (
//                                                       <>
//                                                         {" "}
//                                                         (
//                                                         {Number(
//                                                           accessory.quantity,
//                                                         ) * 6}{" "}
//                                                         متر)
//                                                       </>
//                                                     )}
//                                                   </p>
//                                                 </div>

//                                                 <div className="text-left">
//                                                   <p className="text-xs text-zinc-700">
//                                                     السعر
//                                                   </p>

//                                                   <p className="font-black text-zinc-700">
//                                                     {formatMoney(
//                                                       accessory.total,
//                                                     )}{" "}
//                                                     ج
//                                                   </p>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           ),
//                                         )}
//                                       </div>

//                                       <div className="border-t mt-3 pt-3 flex justify-between text-sm">
//                                         <span className="text-zinc-500">
//                                           إجمالي الإكسسوارات
//                                         </span>

//                                         <span className="font-black">
//                                           {formatMoney(
//                                             calculation.accessoriesTotal,
//                                           )}{" "}
//                                           جنيه
//                                         </span>
//                                       </div>
//                                     </div>
//                                   )}

//                                   {/* Measurement Total */}
//                                   <div className="bg-black text-white rounded-xl p-4">
//                                     <div className="flex items-center justify-between">
//                                       <span className="font-semibold">
//                                         إجمالي هذا المقاس
//                                       </span>

//                                       <span className="text-lg font-black ">
//                                         {formatMoney(calculation.total)} جنيه
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         },
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Total */}
//               <div className="mt-6   rounded-2xl p-5">
//                 <div className="flex items-center text-black justify-between">
//                   <span className="font-semibold">إجمالي الفاتورة</span>

//                   <span className="text-2xl font-black text-black">
//                     {formatMoney(selectedInvoice.items?.subtotal)} جنيه
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClientPortal;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getClientByCode } from "../../services/clientService";
import { getInvoicesByClientCode } from "../../services/invoiceService";

const ClientPortal = () => {
  const { clientCode } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const clientData = await getClientByCode(clientCode);

        if (!clientData) {
          setClient(null);
          return;
        }

        setClient(clientData);

        const invoiceData = await getInvoicesByClientCode(clientCode);

        setInvoices(invoiceData);
      } catch (error) {
        console.error("Error loading client portal:", error);
      } finally {
        setLoading(false);
      }
    };

    if (clientCode) {
      loadData();
    }
  }, [clientCode]);

  const totalInvoices = invoices.length;

  const totalAmount = invoices.reduce(
    (total, invoice) => total + Number(invoice.total || 0),
    0,
  );

  const totalPaid = invoices.reduce(
    (total, invoice) => total + Number(invoice.paid || 0),
    0,
  );

  const totalRemaining = invoices.reduce(
    (total, invoice) => total + Number(invoice.remaining || 0),
    0,
  );

  const latestInvoice = invoices[0];

  const formatMoney = (value) => Number(value || 0).toLocaleString("ar-EG");

  const formatDate = (value) => {
    if (!value) return "-";

    try {
      const date =
        typeof value?.toDate === "function" ? value.toDate() : new Date(value);

      if (Number.isNaN(date.getTime())) return "-";

      return date.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "-";
    }
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case "paid":
        return "مدفوعة بالكامل";

      case "partial":
        return "مدفوعة جزئيًا";

      default:
        return "غير مدفوعة";
    }
  };

  const getExecutionStatusText = (status) => {
    switch (status) {
      case "waiting":
        return "في انتظار موافقة العميل";
        
      case "pending":
        return "قيد التنفيذ";

      case "ready":
        return "جاهزة";

      case "delivered":
        return "تم التسليم";

      default:
        return "قيد الانتظار العميل";
    }
  };

  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-zinc-100 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-black rounded-full animate-spin mx-auto" />

          <p className="font-semibold text-zinc-700 mt-4">
            جاري تحميل بياناتك...
          </p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-zinc-100 flex items-center justify-center px-4"
      >
        <div className="bg-white rounded-3xl shadow-sm border p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl">
            !
          </div>

          <h2 className="text-xl font-bold mt-5">العميل غير موجود</h2>

          <p className="text-zinc-500 mt-2">
            تأكد من كود العميل وحاول مرة أخرى.
          </p>

          <button
            onClick={() => navigate("/clients")}
            className="mt-6 bg-black text-white px-6 py-3 rounded-xl font-semibold"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-zinc-100 text-zinc-900">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-black tracking-wider">GF</div>

              <p className="text-xs text-zinc-400 mt-1">GF for Glass</p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="
                border border-white/20
                hover:bg-white/10
                transition
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
              "
            >
              الصفحة الرئيسية
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Welcome */}
        <section className="bg-white rounded-3xl border shadow-sm p-5 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-sm text-zinc-500">
                مرحباً بك في بوابة العملاء
              </p>

              <h1 className="text-2xl md:text-3xl font-black mt-1 text-black">
                أهلاً {client.name}
              </h1>

              <div className="mt-3 inline-flex items-center gap-2 bg-zinc-100 rounded-xl px-3 py-2">
                <span className="text-xs text-zinc-500">كود العميل</span>

                <span className="font-bold text-sm text-black">
                  {client.clientCode}
                </span>
              </div>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-4 md:min-w-[190px]">
              <p className="text-xs text-zinc-500">حالة الحساب</p>

              <p className="font-bold mt-1 text-black">عميل نشط</p>

              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />

                <span className="text-xs text-zinc-500">الحساب متاح</span>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-zinc-500">عدد الفواتير</p>

            <p className="text-3xl font-black mt-2 text-black">
              {totalInvoices}
            </p>

            <p className="text-xs text-zinc-400 mt-1">فاتورة</p>
          </div>

          <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-zinc-500">إجمالي الفواتير</p>

            <p className="text-2xl font-black mt-2 text-black">
              {formatMoney(totalAmount)}
            </p>

            <p className="text-xs text-zinc-500 mt-1">جنيه</p>
          </div>

          <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-zinc-500">المتبقي</p>

            <p className="text-2xl font-black mt-2 text-black">
              {formatMoney(totalRemaining)}
            </p>

            <p className="text-xs text-zinc-400 mt-1">جنيه</p>
          </div>
        </section>

        {/* Invoices */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-black">فواتيري</h2>

              <p className="text-sm text-zinc-500 mt-1">
                جميع الفواتير الخاصة بحسابك
              </p>
            </div>
          </div>

          {invoices.length === 0 ? (
            <div className="bg-white border rounded-3xl p-10 text-center shadow-sm">
              <p className="font-semibold text-zinc-700">
                لا توجد فواتير حتى الآن
              </p>

              <p className="text-sm text-zinc-400 mt-2">
                ستظهر الفواتير هنا عند إنشائها.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="
                    bg-white
                    border
                    rounded-2xl
                    p-4
                    md:p-5
                    shadow-sm
                    hover:shadow-md
                    transition
                  "
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-sm">
                        GF
                      </div>

                      <div>
                        <p className="font-black text-black">
                          فاتورة #{invoice.invoiceNumber}
                        </p>

                        <p className="text-xs text-zinc-500 mt-1">
                          {formatDate(invoice.createdAt)}
                        </p>

                        <p className="font-bold mt-2 text-black">
                          {formatMoney(invoice.total)} جنيه
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-zinc-100 text-black px-2 py-1 rounded-lg font-semibold">
                            {getPaymentStatusText(invoice.paymentStatus)}
                          </span>

                          <span className="text-xs bg-zinc-100 text-black px-2 py-1 rounded-lg font-semibold">
                            {getExecutionStatusText(invoice.executionStatus)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedInvoice(invoice)}
                      className="
                        w-full
                        md:w-auto
                        bg-black
                        text-white
                        px-5
                        py-3
                        rounded-xl
                        text-sm
                        font-semibold
                        hover:bg-zinc-800
                        transition
                      "
                    >
                      عرض الفاتورة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div
            dir="rtl"
            className="
              bg-white
              w-full
              max-w-3xl
              max-h-[90vh]
              overflow-y-auto
              rounded-3xl
              shadow-2xl
            "
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-zinc-100
                  hover:bg-zinc-200
                  transition
                  text-zinc-600
                "
              >
                ✕
              </button>

              <div className="text-right">
                <p className="text-xs text-zinc-500">GF for Glass</p>

                <h2 className="text-lg font-black text-black">
                  فاتورة #{selectedInvoice.invoiceNumber}
                </h2>

                <p className="text-xs text-zinc-500 mt-1">
                  {formatDate(selectedInvoice.createdAt)}
                </p>
              </div>
            </div>

            <div className="p-5">
              {/* Client */}
              <div className="bg-zinc-50 rounded-2xl p-4 mb-5">
                <p className="text-xs text-zinc-500">بيانات العميل</p>

                <p className="font-bold mt-1 text-black">
                  {selectedInvoice.clientName}
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  كود العميل:{" "}
                  <span className="font-semibold text-black">
                    {selectedInvoice.clientCode}
                  </span>
                </p>
              </div>

              {/* Products */}
              <div className="space-y-4">
                {selectedInvoice.items?.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="border rounded-2xl p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-black text-lg text-black">
                          {item.product?.name}
                        </h3>
                      </div>

                      <span className="text-xs bg-zinc-100 text-black px-3 py-1 rounded-lg font-semibold">
                        {item.measurements?.length || 0} مقاس
                      </span>
                    </div>

                    {/* Measurements */}
                    <div className="mt-4 space-y-4">
                      {item.measurements?.map(
                        (measurement, measurementIndex) => {
                          const calculation = measurement.calculation;

                          return (
                            <div
                              key={measurement.id || measurementIndex}
                              className="bg-zinc-50 rounded-2xl p-4 border"
                            >
                              {/* Measurement Header */}
                              <div className="flex items-center justify-between gap-3 mb-4">
                                <p className="font-bold text-black">
                                  المقاس {measurementIndex + 1}
                                </p>

                                {calculation && (
                                  <span className="text-xs bg-white border px-3 py-1 rounded-lg font-semibold text-black">
                                    إجمالي المقاس:{" "}
                                    {formatMoney(calculation.total)} جنيه
                                  </span>
                                )}
                              </div>

                              {/* Dimensions */}
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div className="bg-white rounded-xl p-3 border">
                                  <p className="text-xs text-zinc-500">الطول</p>

                                  <p className="font-black text-lg mt-1 text-black">
                                    {measurement.length || "-"}
                                  </p>
                                </div>

                                <div className="bg-white rounded-xl p-3 border">
                                  <p className="text-xs text-zinc-500">العرض</p>

                                  <p className="font-black text-lg mt-1 text-black">
                                    {measurement.width || "-"}
                                  </p>
                                </div>

                                <div className="bg-white rounded-xl p-3 border">
                                  <p className="text-xs text-zinc-500">
                                    الكمية
                                  </p>

                                  <p className="font-black text-lg mt-1 text-black">
                                    {measurement.quantity || "-"}
                                  </p>

                                  <p className="text-[10px] text-zinc-500">
                                    قطعة
                                  </p>
                                </div>
                              </div>

                              {/* Calculation Details */}
                              {calculation && (
                                <div className="mt-4 space-y-3">
                                  {/* Product */}
                                  <div className="bg-white rounded-xl border p-3">
                                    <div className="flex items-center justify-between gap-3">
                                      <div>
                                        <p className="font-bold text-sm text-black">
                                          {calculation.productCalculation?.name}
                                        </p>

                                        <p className="text-xs text-zinc-500 mt-1">
                                          مساحة:{" "}
                                          {Number(
                                            calculation.area || 0,
                                          ).toLocaleString("ar-EG", {
                                            maximumFractionDigits: 2,
                                          })}{" "}
                                          م²
                                        </p>
                                      </div>

                                      <div className="text-left">
                                        <p className="text-xs text-zinc-500">
                                          سعر المتر
                                        </p>

                                        <p className="font-bold text-black">
                                          {formatMoney(
                                            calculation.productCalculation
                                              ?.unitPrice,
                                          )}{" "}
                                          ج
                                        </p>
                                      </div>
                                    </div>

                                    <div className="border-t mt-3 pt-3 flex justify-between text-sm">
                                      <span className="text-zinc-500">
                                        إجمالي المنتج
                                      </span>

                                      <span className="font-black text-black">
                                        {formatMoney(
                                          calculation.productCalculation?.total,
                                        )}{" "}
                                        جنيه
                                      </span>
                                    </div>
                                  </div>

                                  {/* Services */}
                                  {calculation.servicesCalculation?.length >
                                    0 && (
                                    <div className="bg-white rounded-xl border p-3">
                                      <p className="font-bold text-sm mb-3 text-black">
                                        الخدمات
                                      </p>

                                      <div className="space-y-2">
                                        {calculation.servicesCalculation.map(
                                          (service, serviceIndex) => (
                                            <div
                                              key={serviceIndex}
                                              className="border rounded-xl p-3"
                                            >
                                              <div className="flex items-center justify-between gap-3">
                                                <div>
                                                  <p className="font-semibold text-sm text-black">
                                                    {service.name}
                                                  </p>

                                                  <p className="text-xs text-zinc-500 mt-1">
                                                    {Number(
                                                      service.quantity || 0,
                                                    ).toLocaleString("ar-EG", {
                                                      maximumFractionDigits: 2,
                                                    })}{" "}
                                                    {service.unit} ×{" "}
                                                    {formatMoney(
                                                      service.unitPrice,
                                                    )}{" "}
                                                    ج
                                                  </p>
                                                </div>

                                                <p className="font-black text-sm whitespace-nowrap text-black">
                                                  {formatMoney(service.total)} ج
                                                </p>
                                              </div>
                                            </div>
                                          ),
                                        )}
                                      </div>

                                      <div className="border-t mt-3 pt-3 flex justify-between text-sm">
                                        <span className="text-zinc-500">
                                          إجمالي الخدمات
                                        </span>

                                        <span className="font-black text-black">
                                          {formatMoney(
                                            calculation.servicesTotal,
                                          )}{" "}
                                          جنيه
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Accessories */}
                                  {calculation.accessoriesCalculation?.length >
                                    0 && (
                                    <div className="bg-white rounded-xl border p-3">
                                      <p className="font-extrabold text-base mb-3 text-black">
                                        إكسسوارات السيكوريت
                                      </p>

                                      <div className="space-y-2">
                                        {calculation.accessoriesCalculation.map(
                                          (accessory, accessoryIndex) => (
                                            <div
                                              key={accessoryIndex}
                                              className="border rounded-xl p-3"
                                            >
                                              <div className="flex items-center justify-between gap-3">
                                                <div>
                                                  <p className="font-semibold text-sm text-black">
                                                    {accessory.name}
                                                  </p>

                                                  <p className="text-xs text-black mt-1">
                                                    الكمية: {accessory.quantity}{" "}
                                                    {accessory.unit}
                                                    {accessory.unit ===
                                                      "عود" && (
                                                      <>
                                                        {" "}
                                                        (
                                                        {Number(
                                                          accessory.quantity,
                                                        ) * 6}{" "}
                                                        متر)
                                                      </>
                                                    )}
                                                  </p>
                                                </div>

                                                <div className="text-left">
                                                  <p className="text-xs text-zinc-500">
                                                    السعر
                                                  </p>

                                                  <p className="font-black text-black">
                                                    {formatMoney(
                                                      accessory.total,
                                                    )}{" "}
                                                    ج
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          ),
                                        )}
                                      </div>

                                      <div className="border-t mt-3 pt-3 flex justify-between text-sm">
                                        <span className="text-zinc-500">
                                          إجمالي الإكسسوارات
                                        </span>

                                        <span className="font-black text-black">
                                          {formatMoney(
                                            calculation.accessoriesTotal,
                                          )}{" "}
                                          جنيه
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Measurement Total */}
                                  <div className="bg-black text-white rounded-xl p-4">
                                    <div className="flex items-center justify-between">
                                      <span className="font-semibold">
                                        إجمالي هذا المقاس
                                      </span>

                                      <span className="text-lg font-black">
                                        {formatMoney(calculation.total)} جنيه
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Invoice Summary */}
              <div className="mt-6 border rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">الإجمالي قبل الخصم</span>

                  <span className="font-bold text-black">
                    {formatMoney(selectedInvoice.subtotal)} جنيه
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">الخصم</span>

                  <span className="font-bold text-black">
                    {formatMoney(selectedInvoice.discount)} جنيه
                  </span>
                </div>

                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="font-bold text-black">الإجمالي النهائي</span>

                  <span className="text-2xl font-black text-black">
                    {formatMoney(selectedInvoice.total)} جنيه
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-zinc-50 border rounded-xl p-4">
                    <p className="text-xs text-zinc-500">المدفوع</p>

                    <p className="text-xl font-black mt-1 text-black">
                      {formatMoney(selectedInvoice.paid)} جنيه
                    </p>
                  </div>

                  <div className="bg-zinc-50 border rounded-xl p-4">
                    <p className="text-xs text-zinc-500">المتبقي</p>

                    <p className="text-xl font-black mt-1 text-black">
                      {formatMoney(selectedInvoice.remaining)} جنيه
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border rounded-xl p-4">
                    <p className="text-xs text-zinc-500">حالة الدفع</p>

                    <p className="font-bold mt-1 text-black">
                      {getPaymentStatusText(selectedInvoice.paymentStatus)}
                    </p>
                  </div>

                  <div className="border rounded-xl p-4">
                    <p className="text-xs text-zinc-500">حالة التنفيذ</p>

                    <p className="font-bold mt-1 text-black">
                      {getExecutionStatusText(selectedInvoice.executionStatus)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPortal;
