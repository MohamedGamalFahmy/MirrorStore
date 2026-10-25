import { X } from "lucide-react";
import InvoiceHeader from "./InvoiceHeader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import ProductSection from "./ProductSection";
import { useEffect, useState } from "react";

import {
  getNextInvoiceNumber,
  addInvoice,
  updateInvoice,
} from "../../../services/invoiceService";

const InvoiceModal = ({
  open,
  onClose,
  client,
  initialInvoice = null,
  isEditing = false,
  onSaved,
}) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [loadingNumber, setLoadingNumber] = useState(false);
  const [saving, setSaving] = useState(false);
  const [creditBalance, setCreditBalance] = useState(0);
  const [loadingCredit, setLoadingCredit] = useState(false);

  useEffect(() => {
    if (!open || isEditing || !client?.id) {
      setCreditBalance(0);
      return;
    }

    let cancelled = false;

    const loadCreditBalance = async () => {
      try {
        setLoadingCredit(true);

        const clientRef = doc(db, "clients", client.id);
        const clientSnapshot = await getDoc(clientRef);

        if (!cancelled) {
          setCreditBalance(
            clientSnapshot.exists()
              ? Math.max(0, Number(clientSnapshot.data().creditBalance) || 0)
              : 0,
          );
        }
      } catch (error) {
        console.error("Error loading client credit:", error);

        if (!cancelled) {
          setCreditBalance(0);
          alert("تعذر تحميل رصيد العميل");
        }
      } finally {
        if (!cancelled) {
          setLoadingCredit(false);
        }
      }
    };

    loadCreditBalance();

    return () => {
      cancelled = true;
    };
  }, [open, isEditing, client?.id]);

  const [paid, setPaid] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [executionStatus, setExecutionStatus] = useState("waiting");

  // =========================
  // Initialize Invoice
  // =========================

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    const initializeInvoice = async () => {
      try {
        setLoadingNumber(true);

        if (isEditing && initialInvoice) {
          setInvoiceNumber(initialInvoice.invoiceNumber || "");
          setPaid(initialInvoice.paid ?? 0);
          setDiscount(initialInvoice.discount ?? 0);
          setExecutionStatus(initialInvoice.executionStatus || "waiting");
        } else {
          setInvoiceData(null);
          setPaid(0);
          setDiscount(0);
          setExecutionStatus("waiting");

          const number = await getNextInvoiceNumber();

          if (!cancelled) {
            setInvoiceNumber(number);
          }
        }
      } catch (error) {
        console.error("Error initializing invoice:", error);

        if (!cancelled) {
          alert("تعذر تحميل بيانات الفاتورة");
        }
      } finally {
        if (!cancelled) {
          setLoadingNumber(false);
        }
      }
    };

    initializeInvoice();

    return () => {
      cancelled = true;
    };
  }, [open, isEditing, initialInvoice]);

  // =========================
  // Invoice Calculations
  // =========================

  /* */
  const subtotal = Number(invoiceData?.subtotal || 0);

  const discountAmount = Math.min(Math.max(Number(discount) || 0, 0), subtotal);

  const total = Number((subtotal - discountAmount).toFixed(2));

  const cashPaidAmount = Math.min(Math.max(Number(paid) || 0, 0), total);
  const availableCredit = !isEditing ? creditBalance : 0;

  const creditApplied = Math.min(
    availableCredit,
    Math.max(0, total - cashPaidAmount),
  );

  const paidAmount = Number((cashPaidAmount + creditApplied).toFixed(2));

  const remaining = Number((total - paidAmount).toFixed(2));

  const formatMoney = (value) =>
    Math.round(Number(value) || 0).toLocaleString("en-US");

  const paymentStatus =
    paidAmount <= 0 ? "unpaid" : paidAmount >= total ? "paid" : "partial";

  // =========================
  // Save / Update Invoice
  // =========================

  const handleSaveInvoice = async () => {
    if (
      !invoiceData ||
      !Array.isArray(invoiceData.items) ||
      invoiceData.items.length === 0
    ) {
      alert("من فضلك أضف منتج إلى الفاتورة");
      return;
    }

    if (isEditing && !initialInvoice?.id) {
      alert("تعذر تحديد الفاتورة المطلوب تعديلها");
      return;
    }

    try {
      setSaving(true);

      const invoice = {
        invoiceNumber,

        clientId: initialInvoice?.clientId || client?.id || "",

        clientCode: initialInvoice?.clientCode || client?.clientCode || "",

        clientName: initialInvoice?.clientName || client?.name || "",

        items: invoiceData.items,

        subtotal,
        discount: discountAmount,
        total,

        // المبلغ النقدي فقط؛ addInvoice هيضيف رصيد العميل
        // المبلغ النقدي المدخل
        paid: isEditing
          ? cashPaidAmount + (Number(initialInvoice?.creditApplied) || 0)
          : cashPaidAmount,

        cashPaid: isEditing
          ? Number(initialInvoice?.cashPaid ?? initialInvoice?.paid ?? 0)
          : cashPaidAmount,

        creditApplied: isEditing
          ? Number(initialInvoice?.creditApplied) || 0
          : 0,

        remaining: Number(
          Math.max(
            0,
            total -
              cashPaidAmount -
              (isEditing ? Number(initialInvoice?.creditApplied) || 0 : 0),
          ).toFixed(2),
        ),

        paymentStatus:
          total -
            cashPaidAmount -
            (isEditing ? Number(initialInvoice?.creditApplied) || 0 : 0) <=
          0
            ? "paid"
            : cashPaidAmount +
                  (isEditing ? Number(initialInvoice?.creditApplied) || 0 : 0) >
                0
              ? "partial"
              : "unpaid",
        executionStatus,

        // الاحتفاظ بتاريخ الإنشاء الأصلي
        createdAt: initialInvoice?.createdAt || new Date(),
      };

      if (isEditing) {
        await updateInvoice(initialInvoice.id, invoice);
      } else {
        await addInvoice(invoice);
      }

      alert(isEditing ? "تم تعديل الفاتورة بنجاح" : "تم حفظ الفاتورة بنجاح");

      if (onSaved) {
        await onSaved();
      }

      onClose();
    } catch (error) {
      console.error("Error saving invoice:", error);

      alert(
        isEditing
          ? "حدث خطأ أثناء تعديل الفاتورة"
          : "حدث خطأ أثناء حفظ الفاتورة",
      );
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  const invoiceClient = client || {
    id: initialInvoice?.clientId || "",
    clientCode: initialInvoice?.clientCode || "",
    name: initialInvoice?.clientName || "",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center">
      <div
        className="
          bg-white
          w-full
          md:max-w-5xl
          rounded-t-3xl
          md:rounded-3xl
          max-h-[95vh]
          overflow-y-auto
        "
      >
        {/* Header */}

        <div className="sticky top-0 z-10 bg-white border-b px-5 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="إغلاق"
          >
            <X />
          </button>

          <h2 className="text-xl font-bold">
            {isEditing ? "تعديل الفاتورة" : "إنشاء فاتورة"}
          </h2>
        </div>

        <div className="p-5">
          {/* Invoice Header */}

          <InvoiceHeader
            client={invoiceClient}
            invoiceNumber={loadingNumber ? "..." : invoiceNumber}
          />

          {/* Products and Measurements */}

          <ProductSection
            key={isEditing ? initialInvoice?.id : "new-invoice"}
            onChange={setInvoiceData}
            initialItems={isEditing ? initialInvoice?.items : null}
            editKey={isEditing ? initialInvoice?.id : "new-invoice"}
          />

          {/* Payment */}

          <div className="mt-6 bg-zinc-50 border rounded-2xl p-5">
            <h3 className="font-bold text-lg mb-4">الحساب والدفع</h3>

            {/* رصيد العميل */}
            {!isEditing && (
              <div className="mb-4 bg-white border border-emerald-200 rounded-xl p-4">
                <p className="text-sm text-zinc-500">رصيد العميل المتاح</p>

                <p className="text-xl font-black text-emerald-700 mt-1">
                  {loadingCredit
                    ? "جاري تحميل الرصيد..."
                    : `${formatMoney(creditBalance)} جنيه`}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Subtotal */}

              <div className="bg-white border rounded-xl p-4">
                <p className="text-sm text-zinc-500">إجمالي الفاتورة</p>

                <p className="text-xl font-black mt-1">
                  {formatMoney(subtotal)} جنيه
                </p>
              </div>

              {/* Discount */}

              <div className="bg-white border rounded-xl p-4">
                <label className="block text-sm text-zinc-500 mb-2">
                  الخصم
                </label>

                <input
                  type="number"
                  min="0"
                  max={subtotal}
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 font-bold outline-none focus:border-black"
                  placeholder="0"
                />
              </div>

              {/* Paid */}

              <div className="bg-white border rounded-xl p-4">
                <label className="block text-sm text-zinc-500 mb-2">
                  المدفوع / العربون
                </label>

                <input
                  type="number"
                  min="0"
                  max={total}
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 font-bold outline-none focus:border-black"
                  placeholder="0"
                />
              </div>

              {/* الرصيد المستخدم */}
              {!isEditing && (
                <div className="bg-white border border-emerald-200 rounded-xl p-4">
                  <p className="text-sm text-zinc-500">
                    المخصوم من رصيد العميل
                  </p>

                  <p className="text-xl font-black text-emerald-700 mt-1">
                    {formatMoney(creditApplied)} جنيه
                  </p>
                </div>
              )}

              {/* Remaining */}

              <div className="bg-white border rounded-xl p-4">
                <p className="text-sm text-zinc-500">المتبقي</p>

                <p className="text-xl font-black mt-1">
                  {formatMoney(remaining)} جنيه
                </p>
              </div>
            </div>

            {/* Final Total */}

            <div className="mt-4 bg-black text-white rounded-xl px-4 py-4 flex items-center justify-between">
              <span className="font-semibold">الإجمالي النهائي</span>

              <span className="text-2xl font-black">
                {formatMoney(total)} جنيه
              </span>
            </div>

            {/* Payment Status */}

            <div className="mt-4 flex items-center justify-between bg-white border rounded-xl px-4 py-3">
              <span className="text-sm text-zinc-500">حالة الدفع</span>

              <span
                className={`font-bold ${
                  paymentStatus === "paid"
                    ? "text-green-600"
                    : paymentStatus === "partial"
                      ? "text-orange-600"
                      : "text-red-600"
                }`}
              >
                {paymentStatus === "unpaid"
                  ? "غير مدفوعة"
                  : paymentStatus === "partial"
                    ? "مدفوع جزئيًا"
                    : "مدفوعة بالكامل"}
              </span>
            </div>

            {/* Execution Status */}

            <div className="mt-4 bg-white border rounded-xl p-4">
              <label className="block text-sm text-zinc-500 mb-2">
                حالة التنفيذ
              </label>

              <select
                value={executionStatus}
                onChange={(e) => setExecutionStatus(e.target.value)}
                className="w-full border rounded-xl px-3 py-3 font-bold outline-none bg-white"
              >
                <option value="waiting">انتظار موافقة العميل</option>

                <option value="pending">قيد التنفيذ</option>

                <option value="ready">جاهز</option>

                <option value="delivered">تم التسليم</option>
              </select>
            </div>
          </div>

          {/* Save */}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSaveInvoice}
              disabled={saving || loadingNumber || loadingCredit}
              className="bg-black text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50"
            >
              {saving
                ? "جاري الحفظ..."
                : isEditing
                  ? "حفظ التعديلات"
                  : "حفظ الفاتورة"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
