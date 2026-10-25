
import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Wallet,
  DollarSign,
  RefreshCw,
} from "lucide-react";

import { getAllInvoices } from "../../services/invoiceService";
import { getClients } from "../../services/clientService";

const formatMoney = (value) =>
  Math.round(Number(value) || 0).toLocaleString("en-US");

const getDateValue = (value) => {
  if (!value) return null;

  // Firebase Timestamp
  if (typeof value.toDate === "function") {
    return value.toDate();
  }

  // JavaScript Date
  if (value instanceof Date) {
    return value;
  }

  // Date string or timestamp
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const isToday = (value) => {
  const date = getDateValue(value);
  if (!date) return false;

  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

const DashboardHome = () => {
  const [stats, setStats] = useState({
    clients: 0,
    invoices: 0,
    remaining: 0,
    todaySales: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [clients, invoices] = await Promise.all([
        getClients(),
        getAllInvoices(),
      ]);

      const remaining = invoices.reduce(
        (sum, invoice) =>
          sum + Math.max(Number(invoice.remaining) || 0, 0),
        0
      );

      const todaySales = invoices.reduce((sum, invoice) => {
        if (!isToday(invoice.createdAt)) return sum;

        // total محفوظ بالفعل بعد خصم الخصم.
        return sum + (Number(invoice.total) || 0);
      }, 0);

      setStats({
        clients: clients.length,
        invoices: invoices.length,
        remaining,
        todaySales,
      });
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setError("تعذر تحميل بيانات لوحة التحكم");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const cards = [
    {
      title: "العملاء",
      value: stats.clients.toLocaleString("en-US"),
      icon: <Users size={28} />,
    },
    {
      title: "الفواتير",
      value: stats.invoices.toLocaleString("en-US"),
      icon: <FileText size={28} />,
    },
    {
      title: "المتبقي",
      value: `${formatMoney(stats.remaining)} ج`,
      icon: <Wallet size={28} />,
    },
    {
      title: "مبيعات اليوم",
      value: `${formatMoney(stats.todaySales)} ج`,
      icon: <DollarSign size={28} />,
    },
  ];

  return (
    <div dir="rtl">
      <div className="mb-8 flex items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">
          لوحة التحكم
        </h1>

        <button
          type="button"
          onClick={loadDashboard}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm font-bold hover:bg-zinc-50 disabled:opacity-50"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />
          تحديث
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
          <button
            type="button"
            onClick={loadDashboard}
            className="mr-3 font-bold underline"
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-5 shadow-sm transition duration-300 hover:shadow-lg sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 ">
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-3 break-words text-2xl font-bold sm:text-3xl">
                  {loading ? "..." : card.value}
                </h2>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white sm:h-14 sm:w-10">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-zinc-500">
      </p>
    </div>
  );
};

export default DashboardHome;
