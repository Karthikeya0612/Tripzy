/*
const listOfTrips = [
    {
      id: "1",
      name: "Manali",
      image: require("../../assets/one.jpg"),
      startDate: "2025-03-10",
      endDate: "2025-03-15",
      itinerary: ["Day 1: Arrive & Explore Mall Road", "Day 2: Solang Valley", "Day 3: Rohtang Pass", "Day 4: Manikaran", "Day 5: Departure"],
      budget: "11,000",
      transport: "Flight + Cab",
      accommodation: "Hotel Snow Heights",
      notes: "Pack warm clothes, adventure activities included.",
      people: 2,
    },
    {
      id: "2",
      name: "Goa",
      image: require("../../assets/two.jpg"),
      startDate: "2025-04-05",
      endDate: "2025-04-10",
      itinerary: ["Day 1: North Goa Beaches", "Day 2: Dudhsagar Waterfalls", "Day 3: South Goa", "Day 4: Water Sports", "Day 5: Shopping & Departure"],
      budget: "1000",
      transport: "Flight + Bike Rental",
      accommodation: "Beach Resort",
      notes: "Carry sunscreen, beachwear, and light clothing.",
      people: 4,
    },
    {
      id: "3",
      name: "Rajasthan",
      image: require("../../assets/three.jpg"),
      startDate: "2025-02-20",
      endDate: "2025-02-25",
      itinerary: ["Day 1: Jaipur City Tour", "Day 2: Jaisalmer Fort", "Day 3: Desert Safari", "Day 4: Udaipur", "Day 5: Departure"],
      budget: "900",
      transport: "Train + Jeep Safari",
      accommodation: "Desert Camp + Hotel",
      notes: "Pack light, carry sunglasses & hats.",
      people: 3,
    },
    {
      id: "4",
      name: "Ooty",
      image: require("../../assets/four.jpg"),
      startDate: "2025-06-01",
      endDate: "2025-06-07",
      itinerary: ["Board train at Hyderabad", "Reach Mysore and start to Ooty Via Bandipur Forest Reach Mysore and start to Ooty Via Bandipur Forest Reach Mysore and start to Ooty Via Bandipur Forest Reach Mysore and start to Ooty Via Bandipur Forest", "Explore Doddabetta Peak and Lamb's Rock at Coonoor", "Back to Mysore and Board train to Hyd", "Reach Hyderabad"],
      budget: "11,750",
      transport: "Bus + Car Rental",
      accommodation: "Cottage Stay",
      notes: "Carry a jacket, enjoy fresh tea & chocolates.",
      people: 5,
    },
    {
      id: "5",
      name: "Kolkata",
      image: require("../../assets/five.jpg"),
      startDate: "2025-05-15",
      endDate: "2025-05-20",
      itinerary: ["Day 1: Victoria Memorial", "Day 2: Howrah Bridge & Park Street", "Day 3: Dakshineswar Temple", "Day 4: Food Tour", "Day 5: Departure"],
      budget: "650",
      transport: "Flight + Metro",
      accommodation: "Budget Hotel",
      notes: "Try street food, visit bookstores, and enjoy cultural sites.",
      people: 3,
    }
  ];
  
  export default listOfTrips;
import firestore from '@react-native-firebase/firestore';
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';


const TripsList = () => {
  interface Trip {
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
    people: number;
  }

  const [listOfTrips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripCollection = await firestore().collection("trips").get();
        const tripData = tripCollection.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            image: data.image,
            startDate: data.startDate,
            endDate: data.endDate,
            itinerary: data.itinerary,
            budget: data.budget,
            transport: data.transport,
            accommodation: data.accommodation,
            notes: data.notes,
            people: data.people,
          };
        });
        setTrips(tripData);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
};

export default listOfTrips;
*/