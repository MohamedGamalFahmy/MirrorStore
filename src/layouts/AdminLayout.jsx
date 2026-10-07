import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Boxes,
  FileText,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  UserCog,
    Wrench,

} from "lucide-react";

const menu = [
  {
    name: "الرئيسية",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    name: "العملاء",
    icon: <Users size={20} />,
    path: "/dashboard/clients",
  },
  {
    name: "الأصناف",
    icon: <Boxes size={20} />,
    path: "/dashboard/products",
  },
  {
  name: "إكسسوارات السيكوريت",
  icon: <Wrench size={20} />,
  path: "/dashboard/accessories",
},
  {
    name: "الفواتير",
    icon: <FileText size={20} />,
    path: "/dashboard/invoices",
  },
  {
    name: "التقارير",
    icon: <BarChart3 size={20} />,
    path: "/dashboard/reports",
  },
  {
    name: "الإعدادات",
    icon: <Settings size={20} />,
    path: "/dashboard/settings",
  },
  {
    name: "المستخدمون",
    icon: <UserCog size={20} />,
    path: "/dashboard/users",
  },
];

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-row-reverse">
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          flex flex-col

        fixed lg:static
        top-0 right-0
        h-screen
        w-72
        bg-zinc-900
        text-white
        
        z-50
        duration-300
        ${open ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col items-center py-2">
          <div className="w-14 h-14 rounded-2xl bg-white text-zinc-900 flex justify-center items-center text-2xl font-bold">
            GF
          </div>

          <h2 className="mt-4 font-bold text-xl">Glass For Glass</h2>

          <span className="text-xs text-zinc-400">Admin Panel</span>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="mt-5 space-y-2 px-3">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 justify-end rounded-xl px-4 py-3 duration-300 ${
                  isActive
                    ? "bg-white text-black shadow-md"
                    : "hover:bg-zinc-800"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto px-3 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-end gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white duration-300"
          >
            <LogOut size={20} />
            تسجيل الخروج
          </button>
        </div>
      </aside>
      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}

        <header className="h-16 bg-white border-b border-zinc-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={24} />
            </button>

            <div>
              <h2 className="font-bold text-xl text-zinc-900">GF For Glass</h2>

              <p className="text-xs text-gray-500">نظام إدارة المحل</p>
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-4">
            <div className="text-right">
              <h3 className="font-semibold text-zinc-900">Mohamed Gamal</h3>

              <p className="text-xs text-gray-500">Administrator</p>
            </div>

            <div className="w-11 h-11 rounded-full bg-zinc-900 text-white flex justify-center items-center font-bold">
              M
            </div>
          </div>
        </header>

        {/* Pages */}

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
