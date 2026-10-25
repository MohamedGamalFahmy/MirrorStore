
import {
  Wallet,
  BadgeCheck,
  Clock3,
  ReceiptText,
  CircleAlert,
} from "lucide-react";

const formatMoney = (value) =>
  `${Math.round(Number(value) || 0).toLocaleString("en-US")} ج`;

const ClientStats = ({
  total = 0,
  paid = 0,
  remaining = 0,
  invoiceCount = 0,
  loading = false,
}) => {
  const stats = [
    {
      title: "إجمالي الفواتير",
      value: formatMoney(total),
      icon: <Wallet size={26} />,
      bg: "bg-blue-100",
      color: "text-blue-600",
      valueColor: "text-blue-700",
    },
    {
      title: "إجمالي المدفوع",
      value: formatMoney(paid),
      icon: <BadgeCheck size={26} />,
      bg: "bg-green-100",
      color: "text-green-600",
      valueColor: "text-green-700",
    },
    {
      title: "المتبقي",
      value: formatMoney(remaining),
      icon: <Clock3 size={26} />,
      bg: "bg-red-100",
      color: "text-red-600",
      valueColor: "text-red-600",
    },
  ];

  const hasDebt = Number(remaining) > 0;

  if (loading) {
    return (
      <div className="mt-5 text-center text-zinc-500">
        جاري تحميل إحصائيات العميل...
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-4" dir="rtl">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-zinc-500 text-sm">
                {item.title}
              </h3>

              <p
                className={`text-2xl font-bold mt-2 ${item.valueColor}`}
              >
                {item.value}
              </p>
            </div>

            <div
              className={`${item.bg} ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center`}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-200">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-zinc-500 text-sm">
              عدد الفواتير
            </h3>
            <p className="text-2xl font-bold mt-2 text-zinc-800">
              {Number(invoiceCount) || 0}
            </p>
          </div>

          <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center">
            <ReceiptText size={26} />
          </div>
        </div>
      </div>

      <div
        className={`rounded-2xl p-4 border flex items-center gap-3 ${
          hasDebt
            ? "bg-red-50 border-red-200 text-red-700"
            : "bg-green-50 border-green-200 text-green-700"
        }`}
      >
        {hasDebt ? (
          <CircleAlert size={26} />
        ) : (
          <BadgeCheck size={26} />
        )}

        <div>
          <p className="font-bold text-zinc-600">
            {hasDebt ? "عليه مديونية" : "مسدد بالكامل"}
          </p>
          <p className="text-sm mt-1 text-zinc-600">
            {hasDebt
              ? `المبلغ المستحق: ${formatMoney(remaining)}`
              : "لا توجد مبالغ مستحقة على العميل"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientStats;
