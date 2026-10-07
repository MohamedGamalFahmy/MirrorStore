import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

const accessoriesCollection = collection(db, "securitAccessories");

// جلب الإكسسوارات الفعالة فقط
export const getAccessories = async () => {
  const q = query(
    accessoriesCollection,
    where("active", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// إضافة إكسسوار جديد
export const addAccessory = async (accessoryData) => {
  const docRef = await addDoc(accessoriesCollection, {
    ...accessoryData,
    active: true,
  });

  return docRef.id;
};

// تعديل إكسسوار
export const updateAccessory = async (id, accessoryData) => {
  await updateDoc(
    doc(db, "securitAccessories", id),
    accessoryData
  );
};

// حذف إكسسوار
// الحذف هنا Soft Delete حتى لا يؤثر على الفواتير القديمة
export const deleteAccessory = async (id) => {
  await updateDoc(
    doc(db, "securitAccessories", id),
    {
      active: false,
    }
  );
};