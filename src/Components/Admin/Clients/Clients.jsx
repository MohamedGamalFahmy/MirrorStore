import { useState } from "react";
import ClientTable from "./ClientTable";
import AddClientForm from "./AddClientForm";

const Clients = () => {
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  console.log("Refresh State =", refresh);

  return (
    <div className="p-6">
      <ClientTable
        openModal={() => setOpenModal(true)}
        refresh={refresh}
      />

      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-zinc-900 rounded-3xl p-6 w-full max-w-3xl relative">

            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-5 top-5 text-white text-3xl"
            >
              ×
            </button>

            <AddClientForm
              onClientAdded={() => {
                setRefresh((prev) => !prev);
                setOpenModal(false);
              }}
            />

          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;