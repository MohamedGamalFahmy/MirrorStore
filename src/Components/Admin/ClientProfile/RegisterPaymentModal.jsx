
import { useEffect, useState } from "react";
import { X, Banknote, LoaderCircle } from "lucide-react";
import { registerClientPayment } from "../../../services/invoiceService";

const RegisterPaymentModal = ({
  open,
  onClose,
  client,
  onSaved,
}) => {
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (open) {
      setAmount("");
      setError("");
      setResult(null);
      setSaving(false);
    }
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    if (saving) return;
    onClose();
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const numericAmount = Number(amount);

    if (
      !amount.trim() ||
      !Number.isFinite(numericAmount) ||
      Math.round(numericAmount * 100) <= 0
    ) {
      setError("من فضلك أدخل مبلغًا صحيحًا أكبر من صفر");
      return;
    }

    setSaving(true);

    let paymentResult;

    try {
      paymentResult = await registerClientPayment({
        client,
        amount: numericAmount,
      });
    } catch (err) {
      console.error("Error registering client payment:", err);
      setError(err.message || "تعذر تسجيل الدفعة، حاول مرة أخرى");
      setSaving(false);
      return;
    }

    // تسجيل الدفعة نجح بالفعل
    setResult(paymentResult);
    setSaving(false);

    // تحديث بيانات العميل بعد نجاح الحفظ
    try {
      if (onSaved) {
        await onSaved();
      }
    } catch (err) {
      console.error(
        "Payment saved, but refreshing client data failed:",
        err
      );
    }
  };


  const money = (value) =>
    Number(value || 0).toLocaleString("ar-EG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      dir="rtl"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-2 text-green-700">
              <Banknote size={24} />
            </div>

            <div>
              <h2
                id="payment-modal-title"
                className="text-lg font-bold text-zinc-900"
              >
                تسجيل دفعة جديدة
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {client?.name || "العميل"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={saving}
            aria-label="إغلاق"
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {result ? (
          <div className="space-y-4 p-5">
            <div className="rounded-xl bg-green-50 p-4 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Banknote size={25} />
              </div>

              <p className="font-bold text-green-800">
                تم تسجيل الدفعة بنجاح
              </p>

              <p className="mt-2 text-2xl font-bold text-zinc-900">
                {money(result.amount)} جنيه
              </p>
            </div>

            <div className="space-y-3 rounded-xl border p-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-zinc-600">المبلغ الموزع على الفواتير</span>
                <strong>{money(result.allocatedAmount)} ج.م</strong>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-zinc-600">المبلغ غير الموزع</span>
                <strong>{money(result.unallocatedAmount)} ج.م</strong>
              </div>

              <div className="flex justify-between gap-3 border-t pt-3">
                <span className="text-zinc-600">رصيد العميل بعد الدفعة</span>
                <strong className="text-green-700">
                  {money(result.creditBalance)} ج.م
                </strong>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-zinc-900 py-3 font-semibold text-white hover:bg-black"
            >
              تم
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-5">
            <div>
              <label
                htmlFor="payment-amount"
                className="mb-2 block text-sm font-semibold text-zinc-700"
              >
                مبلغ الدفعة بالجنيه المصري
              </label>

              <input
                id="payment-amount"
                type="number"
                inputMode="decimal"
                min="0.01"
                step="0.01"
                required
                autoFocus
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="مثال: 1500"
                disabled={saving}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-lg outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-zinc-100"
              />
            </div>

            <div className="rounded-xl bg-zinc-50 p-3 text-sm leading-6 text-zinc-600">
              سيتم توزيع الدفعة على الفواتير المستحقة من الأقدم إلى الأحدث،
              وأي مبلغ زائد سيُضاف إلى رصيد العميل.
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={saving}
                className="flex-1 rounded-xl border border-zinc-300 py-3 font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
              >
                إلغاء
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-700 py-3 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    جاري التسجيل...
                  </>
                ) : (
                  "تأكيد تسجيل الدفعة"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPaymentModal;
