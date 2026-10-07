import { useState } from "react";
import AddClientForm from "../../Components/Admin/Clients/AddClientForm";
import ClientTable from "../../Components/Admin/Clients/ClientTable";

const Clients = () => {
  const [editingClient, setEditingClient] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        إدارة العملاء
      </h1>

      <AddClientForm
        editingClient={editingClient}
        onEditDone={() => setEditingClient(null)}
      />

      <div className="mt-8">
        <ClientTable
          onEdit={(client) => setEditingClient(client)}
        />
      </div>

    </div>
  );
};

export default Clients;