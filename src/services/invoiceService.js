import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/config";

// إنشاء رقم الفاتورة التالي
export const getNextInvoiceNumber = async () => {
  try {
    const snapshot = await getDocs(collection(db, "invoices"));

    let maxNumber = 0;

    snapshot.docs.forEach((doc) => {
      const data = doc.data();

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

// حفظ الفاتورة
export const addInvoice = async (invoiceData) => {
  try {
    const docRef = await addDoc(
      collection(db, "invoices"),
      invoiceData
    );

    return docRef.id;
  } catch (error) {
    console.error("Error adding invoice:", error);
    throw error;
  }
};
// جلب فواتير عميل معين
export const getInvoicesByClientCode = async (clientCode) => {
  try {
    const q = query(
      collection(db, "invoices"),
      where("clientCode", "==", clientCode)
    );

    const snapshot = await getDocs(q);

    const invoices = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ترتيب من الأحدث للأقدم
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
  export const getAllInvoices = async () => {
  try {
    const snapshot = await getDocs(collection(db, "invoices"));

    const invoices = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    invoices.sort((a, b) =>
      String(b.invoiceNumber).localeCompare(
        String(a.invoiceNumber),
        undefined,
        { numeric: true },
      ),
    );

    return invoices;
  } catch (error) {
    console.error("Error getting all invoices:", error);
    throw error;
  }
};
