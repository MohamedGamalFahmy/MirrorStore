import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
    deleteDoc,

} from "firebase/firestore";


import { db } from "../firebase/config";

// إضافة عميل
export const addClient = async (clientData) => {
  try {
    await addDoc(collection(db, "clients"), clientData);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// التحقق من وجود كود العميل
export const checkClientCode = async (clientCode) => {
  try {
    const q = query(
      collection(db, "clients"),
      where("clientCode", "==", clientCode)
    );

    const snapshot = await getDocs(q);

    return !snapshot.empty;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
 
// استرجاع العميل 

export const getClients = async () => {
  try {
    const snapshot = await getDocs(collection(db, "clients"));

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const subscribeClients = (callback) => {
  return onSnapshot(collection(db, "clients"), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(data);
  });
};
// استرجاع عميل بالكود
export const getClientByCode = async (clientCode) => {
  try {
    const q = query(
      collection(db, "clients"),
      where("clientCode", "==", clientCode)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];

    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// تعديل بيانات العميل
export const updateClient = async (id, clientData) => {
  try {
    const clientRef = doc(db, "clients", id);

    await updateDoc(clientRef, {
      name: clientData.name,
      phone: clientData.phone,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// حذف العميل
export const deleteClient = async (id) => {
  try {
    const clientRef = doc(db, "clients", id);

    await deleteDoc(clientRef);
  } catch (error) {
    console.log(error);
    throw error;
  }
};