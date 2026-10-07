import { Plus } from "lucide-react";

const AddInvoiceButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
      mt-5
      w-full
      flex
      items-center
      justify-center
      gap-2
      bg-zinc-900
      hover:bg-black
      text-white
      rounded-2xl
      py-4
      font-semibold
      transition
      "
    >
      <Plus size={22} />
      إنشاء فاتورة جديدة
    </button>
  );
};

export default AddInvoiceButton;
