import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ClientHeader from "../../Components/Admin/ClientProfile/ClientHeader";
import ClientStats from "../../Components/Admin/ClientProfile/ClientStats";
import AddInvoiceButton from "../../Components/Admin/ClientProfile/AddInvoiceButton";
import InvoiceModal from "../../Components/Admin/Invoices/InvoiceModal";

import { getClientByCode } from "../../services/clientService";

const ClientProfile = () => {
  const { clientCode } = useParams();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openInvoice, setOpenInvoice] = useState(false);

  useEffect(() => {
    const loadClient = async () => {
      try {
        setLoading(true);

        const data = await getClientByCode(clientCode);

        setClient(data);
      } catch (error) {
        console.error("Error loading client:", error);
      } finally {
        setLoading(false);
      }
    };

    if (clientCode) {
      loadClient();
    }
  }, [clientCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
        <p className="font-semibold">جاري تحميل بيانات العميل...</p>
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

        <ClientStats client={client} />

        <AddInvoiceButton
          onClick={() => setOpenInvoice(true)}
        />

        <InvoiceModal
          open={openInvoice}
          onClose={() => setOpenInvoice(false)}
          client={client}
        />

      </div>
    </div>
  );
};

export default ClientProfile;