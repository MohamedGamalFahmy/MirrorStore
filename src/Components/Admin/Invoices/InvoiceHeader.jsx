
const InvoiceHeader = ({ client , invoiceNumber  }) => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("ar-EG");

  return (
    <div className="space-y-3 border-b pb-5">
      <div className="grid grid-cols-1 gap-3 text-sm">
        <div className="flex justify-between flex-row-reverse">
          <span className="text-zinc-500">رقم الفاتورة</span>

          <span className="font-semibold">{invoiceNumber || "..."}</span>
        </div>

        <div className="flex justify-between flex-row-reverse">
          <span className="text-zinc-500">التاريخ</span>

          <span>{formattedDate}</span>
        </div>

        <div className="flex justify-between flex-row-reverse">
          <span className="text-zinc-500">العميل</span>

          <span className="font-semibold">{client?.name || "-"}</span>
        </div>

        <div className="flex justify-between flex-row-reverse">
          <span className="text-zinc-500">كود العميل</span>

          <span className="font-semibold text-green-600">
            {client?.clientCode || "-"}
          </span>
        </div>

        <div className="flex justify-between flex-row-reverse">
          <span className="text-zinc-500">الهاتف</span>

          <span>{client?.phone || "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;
