import {
  Wallet,
  BadgeCheck,
  Clock3,
} from "lucide-react";

const ClientStats = () => {
  const stats = [
    {
      title: "إجمالي الفواتير",
      value: "25,000 ج",
      icon: <Wallet size={26} />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "إجمالي المدفوع",
      value: "18,000 ج",
      icon: <BadgeCheck size={26} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "المتبقي",
      value: "7,000 ج",
      icon: <Clock3 size={26} />,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="mt-5 space-y-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-200"
        >
          <div className="flex items-center justify-between flex-row-reverse" >

            <div>
              <h3 className="text-zinc-500 text-sm">
                {item.title}
              </h3>

              <p className="text-2xl font-bold mt-2 border-none text-red-400 ">
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
    </div>
  );
};

export default ClientStats;