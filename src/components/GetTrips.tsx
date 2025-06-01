import { collection, query, where, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../firebaseConfig"; 
interface Trip {
    id: string;
    name: string;
    image: string;
    startDate: string;
    endDate: string;
    itinerary: string[];
    budget: string;
    transport: string;
    accommodation: string;
    notes: string;
    people: number;
}

type Callback = (trips: Trip[]) => void;
type ErrorCallback = (error: Error) => void;

export const getTrips = (
  userId: string,
  onSuccess: Callback,
  onError?: ErrorCallback
): (() => void) => {
  const tripsRef = collection(db, "trips");
  const q = query(tripsRef, where("userId", "==", userId));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const trips = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Trip[];

      onSuccess(trips);
    },
    (error) => {
      console.error("Error in getTrips listener:", error);
      if (onError) onError(error);
    }
  );

  return unsubscribe; // cleanup function
};
