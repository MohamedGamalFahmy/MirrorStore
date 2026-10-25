
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
  serverTimestamp,
  getDoc,
  runTransaction,
} from "firebase/firestore";

import { db } from "../firebase/config";

// تحويل المبالغ إلى قروش لتجنب أخطاء الكسور الحسابية
const toCents = (value) =>
  Math.round((Number(value) || 0) * 100);

const fromCents = (value) =>
  Number((value / 100).toFixed(2));

// قراءة تاريخ الفاتورة
const getInvoiceTime = (invoice) => {
  const value = invoice.createdAt;

  if (value?.toMillis) {
    return value.toMillis();
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value).getTime();
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
};

// ترتيب الفواتير من الأقدم إلى الأحدث
const sortInvoicesOldestFirst = (invoices) => {
  return [...invoices].sort((a, b) => {
    const timeA = getInvoiceTime(a);
    const timeB = getInvoiceTime(b);

    if (timeA && timeB && timeA !== timeB) {
      return timeA - timeB;
    }

    // رقم الفاتورة بديل للفواتير التي لا تملك تاريخًا صالحًا
    return (
      (Number.parseInt(a.invoiceNumber, 10) || 0) -
      (Number.parseInt(b.invoiceNumber, 10) || 0)
    );
  });
};

// إنشاء رقم الفاتورة التالي
export const getNextInvoiceNumber = async () => {
  try {
    const snapshot = await getDocs(collection(db, "invoices"));

    let maxNumber = 0;

    snapshot.docs.forEach((invoiceDoc) => {
      const data = invoiceDoc.data();
      const number = parseInt(data.invoiceNumber, 10);

      if (!isNaN(number) && number > maxNumber) {
        maxNumber = number;
      }
    });

    return String(maxNumber + 1).padStart(6, "0");
  } catch (error) {
    console.error("Error getting invoice number:", error);
    throw error;
  }
};

// حفظ فاتورة جديدة

export const addInvoice = async (invoiceData) => {
  try {
    if (!invoiceData.clientId) {
      throw new Error("بيانات العميل غير موجودة");
    }

    const clientRef = doc(db, "clients", invoiceData.clientId);
    const invoiceRef = doc(collection(db, "invoices"));

    const result = await runTransaction(db, async (transaction) => {
      // قراءة بيانات العميل قبل أي كتابة
      const clientSnapshot = await transaction.get(clientRef);

      if (!clientSnapshot.exists()) {
        throw new Error("العميل غير موجود في قاعدة البيانات");
      }

      const clientData = clientSnapshot.data();

      const creditCents = Math.max(
        0,
        toCents(clientData.creditBalance)
      );

      const totalCents = Math.max(
        0,
        toCents(invoiceData.total)
      );

      const cashPaidCents = Math.max(
        0,
        Math.min(totalCents, toCents(invoiceData.paid))
      );

      // الرصيد المتاح بعد خصم المبلغ المدفوع نقدًا
      const remainingAfterCash = Math.max(
        0,
        totalCents - cashPaidCents
      );

      // تطبيق رصيد العميل على المتبقي فقط
      const creditAppliedCents = Math.min(
        creditCents,
        remainingAfterCash
      );

      const paidCents = cashPaidCents + creditAppliedCents;
      const remainingCents = totalCents - paidCents;
      const newCreditCents = creditCents - creditAppliedCents;

      const savedInvoice = {
        ...invoiceData,
        cashPaid: fromCents(cashPaidCents),
        creditApplied: fromCents(creditAppliedCents),
        paid: fromCents(paidCents),
        remaining: fromCents(remainingCents),
        paymentStatus:
          remainingCents <= 0
            ? "paid"
            : paidCents > 0
              ? "partial"
              : "unpaid",
        createdAt: invoiceData.createdAt || new Date(),
      };

      // حفظ الفاتورة وتحديث الرصيد ذريًا
      transaction.set(invoiceRef, savedInvoice);

      transaction.update(clientRef, {
        creditBalance: fromCents(newCreditCents),
        updatedAt: new Date(),
      });

      return {
        invoiceId: invoiceRef.id,
        cashPaid: fromCents(cashPaidCents),
        creditApplied: fromCents(creditAppliedCents),
        paid: fromCents(paidCents),
        remaining: fromCents(remainingCents),
        creditBalance: fromCents(newCreditCents),
      };
    });

    return result.invoiceId;
  } catch (error) {
    console.error("Error adding invoice:", error);
    throw error;
  }
};


// جلب فواتير عميل معين، من الأحدث إلى الأقدم
export const getInvoicesByClientCode = async (clientCode) => {
  try {
    const q = query(
      collection(db, "invoices"),
      where("clientCode", "==", clientCode)
    );

    const snapshot = await getDocs(q);

    const invoices = snapshot.docs.map((invoiceDoc) => ({
      id: invoiceDoc.id,
      ...invoiceDoc.data(),
    }));

    invoices.sort((a, b) =>
      String(b.invoiceNumber).localeCompare(
        String(a.invoiceNumber),
        undefined,
        { numeric: true }
      )
    );

    return invoices;
  } catch (error) {
    console.error("Error getting client invoices:", error);
    throw error;
  }
};

// جلب جميع الفواتير
export const getAllInvoices = async () => {
  try {
    const snapshot = await getDocs(collection(db, "invoices"));

    const invoices = snapshot.docs.map((invoiceDoc) => ({
      id: invoiceDoc.id,
      ...invoiceDoc.data(),
    }));

    invoices.sort((a, b) =>
      String(b.invoiceNumber).localeCompare(
        String(a.invoiceNumber),
        undefined,
        { numeric: true }
      )
    );

    return invoices;
  } catch (error) {
    console.error("Error getting all invoices:", error);
    throw error;
  }
};

// تعديل فاتورة موجودة

export const updateInvoice = async (invoiceId, invoiceData) => {
  try {
    if (!invoiceId) {
      throw new Error("رقم سجل الفاتورة غير موجود");
    }

    const invoiceRef = doc(db, "invoices", invoiceId);
    const invoiceSnapshot = await getDoc(invoiceRef);

    if (!invoiceSnapshot.exists()) {
      throw new Error("الفاتورة غير موجودة");
    }

    const oldInvoice = invoiceSnapshot.data();

    await updateDoc(invoiceRef, {
      ...invoiceData,

      // الاحتفاظ ببيانات الدفع السابقة عند عدم إرسالها
      paid: invoiceData.paid ?? oldInvoice.paid ?? 0,
      cashPaid: invoiceData.cashPaid ?? oldInvoice.cashPaid ?? 0,
      creditApplied:
        oldInvoice.creditApplied ?? invoiceData.creditApplied ?? 0,

      updatedAt: new Date(),
    });

    return invoiceId;
  } catch (error) {
    console.error("Error updating invoice:", error);
    throw error;
  }
};

// حذف فاتورة
export const deleteInvoice = async (invoiceId) => {
  try {
    if (!invoiceId) {
      throw new Error("رقم سجل الفاتورة غير موجود");
    }

    await deleteDoc(doc(db, "invoices", invoiceId));

    return invoiceId;
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw error;
  }
};

// ================================================
// تسجيل دفعة وتوزيعها على أقدم فواتير العميل
// ================================================


export const registerClientPayment = async ({ client, amount }) => {
  if (!client?.id || !client?.clientCode) {
    throw new Error("بيانات العميل أو رقم سجله غير موجودة");
  }

  const amountCents = toCents(amount);

  if (!Number.isFinite(Number(amount)) || amountCents <= 0) {
    throw new Error("من فضلك أدخل مبلغ دفعة صحيحًا أكبر من صفر");
  }

  try {
    const clientRef = doc(db, "clients", client.id);
    const paymentRef = doc(collection(db, "clientPayments"));

    // جلب معرفات فواتير العميل خارج المعاملة
    const invoicesQuery = query(
      collection(db, "invoices"),
      where("clientCode", "==", client.clientCode)
    );

    const invoicesQuerySnapshot = await getDocs(invoicesQuery);

    // الاحتفاظ بمراجع المستندات فقط
    const invoiceRefs = invoicesQuerySnapshot.docs.map(
      (invoiceDoc) => doc(db, "invoices", invoiceDoc.id)
    );

    const result = await runTransaction(db, async (transaction) => {
      // قراءة العميل وكل الفواتير داخل المعاملة قبل أي كتابة
      const [clientSnapshot, ...invoiceSnapshots] = await Promise.all([
        transaction.get(clientRef),
        ...invoiceRefs.map((invoiceRef) =>
          transaction.get(invoiceRef)
        ),
      ]);

      if (!clientSnapshot.exists()) {
        throw new Error("سجل العميل غير موجود في قاعدة البيانات");
      }

      const invoices = invoiceSnapshots
        .filter((snapshot) => snapshot.exists())
        .map((snapshot) => ({
          id: snapshot.id,
          ...snapshot.data(),
        }));

      // توزيع الدفعة على أقدم الفواتير أولًا
      const oldestFirst = sortInvoicesOldestFirst(invoices);

      let amountLeft = amountCents;
      let allocatedCents = 0;

      const allocations = [];
      const invoiceUpdates = [];

      for (const invoice of oldestFirst) {
        if (amountLeft <= 0) break;

        const totalCents = Math.max(0, toCents(invoice.total));
        const paidCents = Math.min(
          totalCents,
          Math.max(0, toCents(invoice.paid))
        );

        const remainingCents = Math.max(
          0,
          totalCents - paidCents
        );

        if (remainingCents <= 0) continue;

        const appliedCents = Math.min(
          amountLeft,
          remainingCents
        );

        const newPaidCents = paidCents + appliedCents;
        const newRemainingCents = totalCents - newPaidCents;

        invoiceUpdates.push({
          ref: doc(db, "invoices", invoice.id),
          data: {
            paid: fromCents(newPaidCents),
            remaining: fromCents(newRemainingCents),
            paymentStatus:
              newRemainingCents <= 0
                ? "paid"
                : newPaidCents > 0
                  ? "partial"
                  : "unpaid",
            updatedAt: new Date(),
          },
        });

        allocations.push({
          invoiceId: invoice.id,
          invoiceNumber: invoice.invoiceNumber || "",
          amount: fromCents(appliedCents),
        });

        amountLeft -= appliedCents;
        allocatedCents += appliedCents;
      }

      // تحديثات الفواتير + العميل + سجل الدفعة
      if (invoiceUpdates.length + 2 > 500) {
        throw new Error(
          "عدد الفواتير كبير جدًا لتوزيع الدفعة في عملية واحدة"
        );
      }

      const unallocatedCents = amountCents - allocatedCents;

      const currentCreditCents = Math.max(
        0,
        toCents(clientSnapshot.data().creditBalance)
      );

      const newCreditCents =
        currentCreditCents + unallocatedCents;

      // كل القراءات انتهت قبل بدء الكتابة
      for (const update of invoiceUpdates) {
        transaction.update(update.ref, update.data);
      }

      transaction.update(clientRef, {
        creditBalance: fromCents(newCreditCents),
        updatedAt: new Date(),
      });

      transaction.set(paymentRef, {
        clientId: client.id,
        clientCode: client.clientCode,
        clientName: client.name || "",
        amount: fromCents(amountCents),
        allocatedAmount: fromCents(allocatedCents),
        unallocatedAmount: fromCents(unallocatedCents),
        allocations,
        createdAt: serverTimestamp(),
      });

      return {
        paymentId: paymentRef.id,
        amount: fromCents(amountCents),
        allocatedAmount: fromCents(allocatedCents),
        unallocatedAmount: fromCents(unallocatedCents),
        creditBalance: fromCents(newCreditCents),
        allocations,
      };
    });

    return result;
  } catch (error) {
    console.error("Error registering client payment:", error);
    throw error;
  }
};


// جلب سجل دفعات عميل معين
export const getClientPaymentsByClientCode = async (clientCode) => {
  try {
    const q = query(
      collection(db, "clientPayments"),
      where("clientCode", "==", clientCode)
    );

    const snapshot = await getDocs(q);

    const payments = snapshot.docs.map((paymentDoc) => ({
      id: paymentDoc.id,
      ...paymentDoc.data(),
    }));

    payments.sort((a, b) => {
      const timeA = getInvoiceTime(a);
      const timeB = getInvoiceTime(b);
      return timeB - timeA;
    });

    return payments;
  } catch (error) {
    console.error("Error getting client payments:", error);
    throw error;
  }
};
