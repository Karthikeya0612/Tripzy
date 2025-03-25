import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../components/Types';
import Icon from '../components/Icon';
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ScrollView } from 'react-native-gesture-handler';

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

type TripsScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Trips'>;

const Trips: React.FC = () => {
    const navigation = useNavigation<TripsScreenNavigationProp>();

    const today = new Date();

    const [listOfTrips, setTrips] = useState<Trip[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tripsRef = collection(db, "trips");
      
        // Real-time listener
        const unsubscribe = onSnapshot(tripsRef, (tripsSnapshot) => {
          const trips = tripsSnapshot.docs.map((doc) => ({
            id: doc.id, // Ensure each item has a unique key
            ...doc.data(),
          })) as Trip[];
      
          setTrips(trips);
          setLoading(false);
        });
      
        // Cleanup function to avoid memory leaks
        return () => unsubscribe();
      }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

    let ongoingTrips = listOfTrips.filter((trip) => {
        const startDate = new Date(trip.startDate);
        const endDate = new Date(trip.endDate);
        return startDate <= today && endDate >= today;
    });

    let upcomingTrips = listOfTrips.filter((trip) => {
        const startDate = new Date(trip.startDate);
        return startDate > today;
    });

    let pastTrips = listOfTrips.filter((trip) => {
        const endDate = new Date(trip.endDate);
        return endDate < today;
    });

    let formatDate = (date: string) => {
        const d = new Date(date);   
        return d.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
        });     
    }

    // Function to render trip card
    const renderTrip = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('TripDetails', { trip: item })}
        >
            <View style={styles.tripCard}>
                <Image source={{ uri: item.image }} style={styles.tripImage} />
                <View style={styles.tripInfo}>
                    <View style={styles.iconContainer}>
                        <Icon name="location-on" size={20} color="red" />
                        <Text style={styles.tripTitle}>{item.name}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="date-range" size={12} color="red" />
                        <Text style={styles.tripDate}>{formatDate(item.startDate)} - {formatDate(item.endDate)}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="people" size={16} color="red" />
                        <Text style={styles.tripPeople}>{item.people} people</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="currency-rupee" size={16} color="red" />
                        <Text style={styles.tripBudget}>{item.budget}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <FlatList
            data={[]}
            renderItem={null}
            ListHeaderComponent={() => (
                <View style={{ flex: 1, marginBottom: 45 }}>
                    {ongoingTrips.length > 0 && <Text style={styles.sectionTitle}>Ongoing Trip</Text>}
                    <FlatList
                        data={ongoingTrips}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTrip}
                    />

                    {upcomingTrips.length > 0 && <Text style={styles.sectionTitle}>Upcoming Trip</Text>}
                    <FlatList
                        data={upcomingTrips}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTrip}
                    />

                    {pastTrips.length > 0 && <Text style={styles.sectionTitle}>Past Trip</Text>}
                    <FlatList
                        data={pastTrips}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTrip}
                    />
                </View>
            )}
        />
    );

};
const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        marginLeft: 10,
    },
    tripCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tripImage: {
        width: 180,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    tripInfo: {
        flex: 1,
        justifyContent: "center",
    },
    tripTitle: {
        fontSize: 20,
        marginLeft: 5,
        fontWeight: "bold",
    },
    tripDate: {
        fontSize: 14,
        color: "gray",
        marginLeft: 5,
    },
    tripPeople: {
        fontSize: 14,
        color: "gray",
        marginLeft: 5,
    },
    tripCost: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        textAlign: "right",
    },
    iconContainer: {
        flexDirection: "row",  // Align items in a row
        alignItems: "center",  // Align to the right if needed
        marginRight: 5,
    },
    tripBudget: {
        fontSize: 16,
        fontWeight: "bold",
    },

});

export default Trips;
