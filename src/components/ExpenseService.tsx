import { db } from '../../firebaseConfig';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';

export const addExpense = async (tripId: string, data: any) => {
  const expensesRef = collection(db, 'trips', tripId, 'expenses');
  const newDoc = await addDoc(expensesRef, data);
  return newDoc.id;
};

export const updateExpense = async (tripId: string, expenseId: string, data: any) => {
  const docRef = doc(db, 'trips', tripId, 'expenses', expenseId);
  await updateDoc(docRef, data);
};

export const deleteExpense = async (tripId: string, expenseId: string) => {
  const docRef = doc(db, 'trips', tripId, 'expenses', expenseId);
  await deleteDoc(docRef);
};

export const getExpenses = async (tripId: string) => {
  const snapshot = await getDocs(collection(db, 'trips', tripId, 'expenses'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
