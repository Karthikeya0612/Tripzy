import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Define the structure of parameters for each screen
export type StackParamList = {
  TripsList: undefined;  // No params needed for Trips list
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
    };
  };
};

export type TripDetailsScreenProps = NativeStackScreenProps<StackParamList, 'TripDetails'>;