import {
  Users,
  FileText,
  DollarSign,
  Wallet,
} from "lucide-react";

const cards = [
  {
    title: "العملاء",
    value: "0",
    icon: <Users size={28} />,
  },
  {
    title: "الفواتير",
    value: "0",
    icon: <FileText size={28} />,
  },
  {
    title: "المتبقي",
    value: "0 ج",
    icon: <Wallet size={28} />,
  },
  {
    title: "مبيعات اليوم",
    value: "0 ج",
    icon: <DollarSign size={28} />,
  },
];

const DashboardHome = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        لوحة التحكم
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg duration-300"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {card.value}
                </h2>

              </div>

              <div className="w-14 h-14 rounded-xl bg-zinc-900 text-white flex justify-center items-center">
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default DashboardHome;