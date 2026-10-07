import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

// =========================
// Add Product / Service
// =========================

export const addProduct = async (data) => {
  const productRef = await addDoc(collection(db, "products"), {
    ...data,
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return productRef.id;
};

// =========================
// Get Active Products
// =========================

export const getProducts = async () => {
  const productsQuery = query(
    collection(db, "products"),
    where("active", "==", true)
  );

  const snapshot = await getDocs(productsQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// =========================
// Update Product / Service
// =========================

export const updateProduct = async (id, data) => {
  const productRef = doc(db, "products", id);

  await updateDoc(productRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// =========================
// Delete Product / Service
// =========================

export const deleteProduct = async (id) => {
  const productRef = doc(db, "products", id);

  await updateDoc(productRef, {
    active: false,
    updatedAt: serverTimestamp(),
  });
};