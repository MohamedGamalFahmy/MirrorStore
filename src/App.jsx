import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Footer from "./Components/Footer";
import ReceptionMirorrCard from "./Products/ReceptionMirorrCard";
import ShowersCard from "./Products/ShowersCard ";
import About from "./Components/About";
import MirrorCard from "./Products/MirrorCard";
import Contactme from "./Components/Contactme";
import ScrollToTop from "./Components/ScrollToTop";
import Clients from "./pages/Clients/Clients";
import ClientDetails from "./pages/Clients/ClientProfile";
import AddClientForm from "./Components/Admin/Clients/AddClientForm";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import ClientTable from "./Components/Admin/Clients/ClientTable";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/Admin/AdminLogin";
import ProtectedRoute from "./routes/ProtectedRoute";
import Users from "./pages/Dashboard/Users";
import ClientProfile from "./pages/Clients/ClientProfile";
import Products from "./pages/Dashboard/Products";
import Invoices from "./pages/Dashboard/Invoices";
import CreateInvoice from "./pages/Dashboard/CreateInvoice";
import ClientPortal from "./pages/Clients/ClientPortal";
import ClientLogin from "./pages/Clients/ClientLogin";
import Accessories from "./pages/Dashboard/Accessories";
const Layout = () => {
  return (
    <div className="bg-black/70">
      <div className="   ">
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route
            path="/MirrorReception"
            element={<ReceptionMirorrCard />}
          ></Route>
          <Route path="/ShowersCard" element={<ShowersCard />}></Route>
          <Route path="/MirrorCard" element={<MirrorCard />}></Route>
          <Route path="/Contactme" element={<Contactme />} />

          <Route path="/AddClientForm" element={<AddClientForm />} />
          <Route path="/ClientTable" element={<ClientTable />} />

  
        </Route>
<Route path="/clients" element={<ClientLogin />} />
          <Route path="/clients/:clientCode" element={<ClientPortal />} />
        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:clientCode" element={<ClientProfile />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/new" element={<CreateInvoice />} />
          <Route path="accessories" element={<Accessories />} />
        </Route>
      </Route>,
    ),
  );
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};

export default App;
