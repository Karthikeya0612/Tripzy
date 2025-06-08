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
  userId: string;
  sharedWith?: string[];
}

type Callback = (trips: Trip[]) => void;
type ErrorCallback = (error: Error) => void;

export const getTrips = (
  userId: string,
  onSuccess: Callback,
  onError?: ErrorCallback
): (() => void) => {
  const tripsRef = collection(db, "trips");

  const ownedQuery = query(tripsRef, where("userId", "==", userId));
  const sharedQuery = query(tripsRef, where("sharedWith", "array-contains", userId));

  let ownedTrips: Trip[] = [];
  let sharedTrips: Trip[] = [];

  const unsubscribeOwned = onSnapshot(
    ownedQuery,
    (snapshot) => {
      ownedTrips = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Trip[];
      onSuccess([...ownedTrips, ...sharedTrips]);
    },
    (error) => {
      console.error("Error in ownedTrips listener:", error);
      if (onError) onError(error);
    }
  );

  const unsubscribeShared = onSnapshot(
    sharedQuery,
    (snapshot) => {
      sharedTrips = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Trip[];
      onSuccess([...ownedTrips, ...sharedTrips]);
    },
    (error) => {
      console.error("Error in sharedTrips listener:", error);
      if (onError) onError(error);
    }
  );

  return () => {
    unsubscribeOwned();
    unsubscribeShared();
  };
};
