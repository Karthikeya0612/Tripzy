import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Define the structure of parameters for each screen
export type StackParamList = {
  Trips: undefined;
  Home: undefined;
  Form: undefined;   // No params needed for Trips list
  ManageExpenses: {
    tripId: string; // Pass the trip ID to manage expenses
  };
  ExpenseDetails: {
    expense: { 
      tripId: string;
      id: string;
      description: string;
      amount: string;
      icon: string;
      currency: string;
    };
  }; // No params needed for Expense details
  TripDetails: { 
    trip: { 
      id: string;
      name: string;
      image: any;
      startDate: string;
      endDate: string;
      itinerary: string[];
      budget: string;
      transport: string;
      accommodation: string;
      notes: string;
      people: string;
    };
  };
  EditTrip: { 
    trip: { 
      id: string;
      name: string;
      image: any;
      startDate: string;
      endDate: string;
      itinerary: string[];
      budget: string;
      transport: string;
      accommodation: string;
      notes: string;
      people: string;
    };
  };
};

export type TripDetailsScreenProps = NativeStackScreenProps<StackParamList, 'TripDetails'>;
export type FormScreenProps = NativeStackScreenProps<StackParamList, 'Form'>;