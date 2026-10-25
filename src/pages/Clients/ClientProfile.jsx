// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // import ClientHeader from "../../Components/Admin/ClientProfile/ClientHeader";
// // import ClientStats from "../../Components/Admin/ClientProfile/ClientStats";
// // import AddInvoiceButton from "../../Components/Admin/ClientProfile/AddInvoiceButton";
// // import InvoiceModal from "../../Components/Admin/Invoices/InvoiceModal";

// // import { getClientByCode } from "../../services/clientService";

// // const ClientProfile = () => {
// //   const { clientCode } = useParams();

// //   const [client, setClient] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [openInvoice, setOpenInvoice] = useState(false);

// //   useEffect(() => {
// //     const loadClient = async () => {
// //       try {
// //         setLoading(true);

// //         const data = await getClientByCode(clientCode);

// //         setClient(data);
// //       } catch (error) {
// //         console.error("Error loading client:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (clientCode) {
// //       loadClient();
// //     }
// //   }, [clientCode]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
// //         <p className="font-semibold">جاري تحميل بيانات العميل...</p>
// //       </div>
// //     );
// //   }

// //   if (!client) {
// //     return (
// //       <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
// //         <p className="font-semibold text-red-600">
// //           العميل غير موجود
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-zinc-100">
// //       <div className="max-w-7xl mx-auto p-4">

// //         <ClientHeader client={client} />

// //         <ClientStats client={client} />

// //         <AddInvoiceButton
// //           onClick={() => setOpenInvoice(true)}
// //         />

// //         <InvoiceModal
// //           open={openInvoice}
// //           onClose={() => setOpenInvoice(false)}
// //           client={client}
// //         />

// //       </div>
// //     </div>
// //   );
// // };

// // export default ClientProfile;

// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // import ClientHeader from "../../Components/Admin/ClientProfile/ClientHeader";
// // import ClientStats from "../../Components/Admin/ClientProfile/ClientStats";
// // import AddInvoiceButton from "../../Components/Admin/ClientProfile/AddInvoiceButton";
// // import InvoiceModal from "../../Components/Admin/Invoices/InvoiceModal";

// // import { getClientByCode } from "../../services/clientService";
// // import { getInvoicesByClientCode } from "../../services/invoiceService";

// // const ClientProfile = () => {
// //   const { clientCode } = useParams();

// //   const [client, setClient] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [statsLoading, setStatsLoading] = useState(true);
// //   const [openInvoice, setOpenInvoice] = useState(false);

// //   const [stats, setStats] = useState({
// //     total: 0,
// //     paid: 0,
// //     remaining: 0,
// //     invoiceCount: 0,
// //   });

// //   useEffect(() => {
// //     let cancelled = false;

// //     const loadClient = async () => {
// //       setLoading(true);
// //       setStatsLoading(true);

// //       setClient(null);
// //       setStats({
// //         total: 0,
// //         paid: 0,
// //         remaining: 0,
// //         invoiceCount: 0,
// //       });

// //       try {
// //         const data = await getClientByCode(clientCode);

// //         if (cancelled) return;

// //         setClient(data);

// //         if (!data) return;

// //         const invoices = await getInvoicesByClientCode(clientCode);

// //         if (cancelled) return;

// //         const totals = invoices.reduce(
// //           (result, invoice) => {
// //             const invoiceTotal = Number(invoice.total) || 0;
// //             const invoicePaid = Number(invoice.paid) || 0;

// //             const invoiceRemaining =
// //               invoice.remaining !== undefined &&
// //               invoice.remaining !== null
// //                 ? Math.max(0, Number(invoice.remaining) || 0)
// //                 : Math.max(0, invoiceTotal - invoicePaid);

// //             result.total += invoiceTotal;
// //             result.paid += invoicePaid;
// //             result.remaining += invoiceRemaining;

// //             return result;
// //           },
// //           {
// //             total: 0,
// //             paid: 0,
// //             remaining: 0,
// //           },
// //         );

// //         setStats({
// //           ...totals,
// //           invoiceCount: invoices.length,
// //         });
// //       } catch (error) {
// //         console.error("Error loading client profile:", error);
// //       } finally {
// //         if (!cancelled) {
// //           setLoading(false);
// //           setStatsLoading(false);
// //         }
// //       }
// //     };

// //     if (clientCode) {
// //       loadClient();
// //     }

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [clientCode]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
// //         <p className="font-semibold">
// //           جاري تحميل بيانات العميل...
// //         </p>
// //       </div>
// //     );
// //   }

// //   if (!client) {
// //     return (
// //       <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
// //         <p className="font-semibold text-red-600">
// //           العميل غير موجود
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-zinc-100">
// //       <div className="max-w-7xl mx-auto p-4 text-black">
// //         <ClientHeader client={client} />

// //         <ClientStats
// //           total={stats.total}
// //           paid={stats.paid}
// //           remaining={stats.remaining}
// //           invoiceCount={stats.invoiceCount}
// //           loading={statsLoading}
// //         />

// //         <AddInvoiceButton
// //           onClick={() => setOpenInvoice(true)}
// //         />

// //         <InvoiceModal
// //           open={openInvoice}
// //           onClose={() => setOpenInvoice(false)}
// //           client={client}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClientProfile;

// import { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import ClientHeader from "../../Components/Admin/ClientProfile/ClientHeader";
// import ClientStats from "../../Components/Admin/ClientProfile/ClientStats";
// import AddInvoiceButton from "../../Components/Admin/ClientProfile/AddInvoiceButton";
// import InvoiceModal from "../../Components/Admin/Invoices/InvoiceModal";

// import { getClientByCode } from "../../services/clientService";
// import { getInvoicesByClientCode } from "../../services/invoiceService";

// const ClientProfile = () => {
//   const { clientCode } = useParams();

//   const [client, setClient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [statsLoading, setStatsLoading] = useState(true);
//   const [openInvoice, setOpenInvoice] = useState(false);

//   const [stats, setStats] = useState({
//     total: 0,
//     paid: 0,
//     remaining: 0,
//     invoiceCount: 0,
//   });

//   // إعادة تحميل إحصائيات العميل من Firebase
//   const loadStats = useCallback(async () => {
//     if (!clientCode) return;

//     setStatsLoading(true);

//     try {
//       const invoices = await getInvoicesByClientCode(clientCode);

//       const totals = invoices.reduce(
//         (result, invoice) => {
//           const invoiceTotal = Number(invoice.total) || 0;
//           const invoicePaid = Number(invoice.paid) || 0;

//           const invoiceRemaining =
//             invoice.remaining !== undefined &&
//             invoice.remaining !== null
//               ? Math.max(0, Number(invoice.remaining) || 0)
//               : Math.max(0, invoiceTotal - invoicePaid);

//           result.total += invoiceTotal;
//           result.paid += invoicePaid;
//           result.remaining += invoiceRemaining;

//           return result;
//         },
//         {
//           total: 0,
//           paid: 0,
//           remaining: 0,
//         },
//       );

//       setStats({
//         total: Number(totals.total.toFixed(2)),
//         paid: Number(totals.paid.toFixed(2)),
//         remaining: Number(totals.remaining.toFixed(2)),
//         invoiceCount: invoices.length,
//       });
//     } catch (error) {
//       console.error("Error loading client statistics:", error);
//       throw error;
//     } finally {
//       setStatsLoading(false);
//     }
//   }, [clientCode]);

//   // تحميل بيانات العميل وإحصائياته عند فتح الصفحة
//   useEffect(() => {
//     let cancelled = false;

//     const loadClient = async () => {
//       setLoading(true);

//       try {
//         const data = await getClientByCode(clientCode);

//         if (cancelled) return;

//         setClient(data);

//         if (data) {
//           await loadStats();
//         } else {
//           setStats({
//             total: 0,
//             paid: 0,
//             remaining: 0,
//             invoiceCount: 0,
//           });
//           setStatsLoading(false);
//         }
//       } catch (error) {
//         if (!cancelled) {
//           console.error("Error loading client profile:", error);
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     if (clientCode) {
//       loadClient();
//     }

//     return () => {
//       cancelled = true;
//     };
//   }, [clientCode, loadStats]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
//         <p className="font-semibold">
//           جاري تحميل بيانات العميل...
//         </p>
//       </div>
//     );
//   }

//   if (!client) {
//     return (
//       <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
//         <p className="font-semibold text-red-600">
//           العميل غير موجود
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-zinc-100">
//       <div className="max-w-7xl mx-auto p-4">
//         <ClientHeader client={client} />

//         <ClientStats
//           total={stats.total}
//           paid={stats.paid}
//           remaining={stats.remaining}
//           invoiceCount={stats.invoiceCount}
//           loading={statsLoading}
//         />

//         <AddInvoiceButton
//           onClick={() => setOpenInvoice(true)}
//         />

//         <InvoiceModal
//           open={openInvoice}
//           onClose={() => setOpenInvoice(false)}
//           client={client}
//           onSaved={loadStats}
//         />
//       </div>
//     </div>
//   );
// };

// export default ClientProfile;

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ClientHeader from "../../Components/Admin/ClientProfile/ClientHeader";
import ClientStats from "../../Components/Admin/ClientProfile/ClientStats";
import AddInvoiceButton from "../../Components/Admin/ClientProfile/AddInvoiceButton";
import InvoiceModal from "../../Components/Admin/Invoices/InvoiceModal";
import RegisterPaymentModal from "../../Components/Admin/ClientProfile/RegisterPaymentModal";

import { getClientByCode } from "../../services/clientService";
import { getInvoicesByClientCode } from "../../services/invoiceService";

const ClientProfile = () => {
  const { clientCode } = useParams();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  const [openInvoice, setOpenInvoice] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    remaining: 0,
    invoiceCount: 0,
  });

  // تحميل إحصائيات الفواتير من Firebase
  const loadStats = useCallback(async () => {
    if (!clientCode) return;

    setStatsLoading(true);

    try {
      const invoices = await getInvoicesByClientCode(clientCode);

      const totals = invoices.reduce(
        (result, invoice) => {
          const invoiceTotal = Number(invoice.total) || 0;
          const invoicePaid = Number(invoice.paid) || 0;

          const invoiceRemaining =
            invoice.remaining !== undefined &&
            invoice.remaining !== null
              ? Math.max(0, Number(invoice.remaining) || 0)
              : Math.max(0, invoiceTotal - invoicePaid);

          result.total += invoiceTotal;
          result.paid += invoicePaid;
          result.remaining += invoiceRemaining;

          return result;
        },
        {
          total: 0,
          paid: 0,
          remaining: 0,
        }
      );

      setStats({
        total: Number(totals.total.toFixed(2)),
        paid: Number(totals.paid.toFixed(2)),
        remaining: Number(totals.remaining.toFixed(2)),
        invoiceCount: invoices.length,
      });
    } catch (error) {
      console.error("Error loading client statistics:", error);
      throw error;
    } finally {
      setStatsLoading(false);
    }
  }, [clientCode]);

  // تحديث بيانات العميل والإحصائيات بعد تسجيل الدفعة
  const refreshClientData = useCallback(async () => {
    const updatedClient = await getClientByCode(clientCode);

    if (updatedClient) {
      setClient(updatedClient);
    }

    await loadStats();
  }, [clientCode, loadStats]);

  // التحميل الأولي
  useEffect(() => {
    let cancelled = false;

    const loadClient = async () => {
      setLoading(true);

      try {
        const data = await getClientByCode(clientCode);

        if (cancelled) return;

        setClient(data);

        if (data) {
          await loadStats();
        } else {
          setStats({
            total: 0,
            paid: 0,
            remaining: 0,
            invoiceCount: 0,
          });

          setStatsLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error loading client profile:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (clientCode) {
      loadClient();
    } else {
      setLoading(false);
      setStatsLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [clientCode, loadStats]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
        <p className="font-semibold">
          جاري تحميل بيانات العميل...
        </p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
        <p className="font-semibold text-red-600">
          العميل غير موجود
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-7xl mx-auto p-4">
        <ClientHeader client={client} />

        <ClientStats
          total={stats.total}
          paid={stats.paid}
          remaining={stats.remaining}
          invoiceCount={stats.invoiceCount}
          loading={statsLoading}
        />

        {/* الأزرار الجديدة بجانب بعضها */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <AddInvoiceButton
            onClick={() => setOpenInvoice(true)}
          />

          <button
            type="button"
            onClick={() => setOpenPayment(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-4 font-semibold text-white transition hover:bg-green-800"
          >
            تسجيل دفعة
          </button>
        </div>

        <InvoiceModal
          open={openInvoice}
          onClose={() => setOpenInvoice(false)}
          client={client}
          onSaved={loadStats}
        />

        <RegisterPaymentModal
          open={openPayment}
          onClose={() => setOpenPayment(false)}
          client={client}
          onSaved={refreshClientData}
        />
      </div>
    </div>
  );
};

export default ClientProfile;
