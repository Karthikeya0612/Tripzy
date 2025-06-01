import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { getTrips } from "../components/GetTrips";
import { useNavigation } from "@react-navigation/native";
import { differenceInDays, isAfter, isBefore, isWithinInterval, parseISO, format } from "date-fns";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../components/Types";
import { doc, getDoc } from "firebase/firestore";


type FormScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Form'>;
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
const HomeScreen = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState<string | null>(null);

    const navigation = useNavigation<FormScreenNavigationProp>();

    useEffect(() => {
        let unsubscribeTrips: (() => void) | null = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserName(userData.name || '');
                    }
                } catch (error) {
                    console.error('Error fetching user name:', error);
                }
                unsubscribeTrips = getTrips(
                    user.uid,
                    (tripList) => {
                        const sortedTrips = tripList.sort(
                            (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
                        );
                        setTrips(sortedTrips);
                        setLoading(false);
                    },
                    (error) => {
                        console.error("Error loading trips:", error);
                        setTrips([]);
                        setLoading(false);
                    }
                );
            } else {
                if (unsubscribeTrips) {
                    unsubscribeTrips();
                    unsubscribeTrips = null;
                }
                setTrips([]);
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeTrips) {
                unsubscribeTrips();
                unsubscribeTrips = null;
            }
        };
    }, []);


    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1c6888" />
            </View>
        );
    }

    // Categorize Trips
    const now = new Date();
    const upcoming = trips.filter(trip => isAfter(parseISO(trip.startDate), now)).sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())[0];
    const ongoing = trips.find(trip => isWithinInterval(now, {
        start: parseISO(trip.startDate),
        end: parseISO(trip.endDate),
    }));
    const past = trips
        .filter(trip => isBefore(parseISO(trip.endDate), now))
        .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())[0];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo */}
            <Image source={require("../../assets/tripzy.png")} style={styles.logo} />

            {/* Welcome */}
            <Text style={styles.welcome}>Welcome to Tripzy! {userName}</Text>

            {/* Create Trip Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Form")}
            >
                <Text style={styles.buttonText}>+ Create a New Trip</Text>
            </TouchableOpacity>

            {/* Sections */}
            {upcoming && (
                <TripCard title="Upcoming Trip" trip={upcoming} countdown />
            )}
            {ongoing && (
                <TripCard title="Ongoing Trip" trip={ongoing} />
            )}
            {past && (
                <TripCard title="Most Recent Trip" trip={past} />
            )}
        </ScrollView>
    );
};

// 🔹 Reusable TripCard component
const TripCard = ({ title, trip, countdown = false }: { title: string; trip: Trip; countdown?: boolean }) => {
    const daysLeft = countdown
        ? differenceInDays(parseISO(trip.startDate), new Date())
        : null;

    return (
        <View style={styles.card}>
            <Image source={{ uri: trip.image || "https://via.placeholder.com/300" }} style={styles.cardImage} />
            {countdown && (
                <View style={styles.countdownOverlay}>
                    <Text style={styles.countdownText}>{daysLeft} Days to go</Text>
                </View>
            )}
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardTripName}>{trip.name}</Text>
                <Text style={{ fontSize: 16, color: '#555' }}>
                    {format(parseISO(trip.startDate), 'dd MMM yyyy')} - {format(parseISO(trip.endDate), 'dd MMM yyyy')}
                </Text>

            </View>
        </View>
    );
};

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f2f2f2",
        paddingBottom: 100,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 10,
    },
    welcome: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#1c6888",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignSelf: "center",
        marginBottom: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 24,
        overflow: "hidden",
        elevation: 4,
        marginHorizontal: "2%",
    },
    cardImage: {
        width: "100%",
        height: 160,
    },
    countdownOverlay: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#1c6888",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    countdownText: {
        color: "white",
        fontWeight: "bold",
    },
    cardContent: {
        padding: 12,
    },
    cardTitle: {
        fontSize: 14,
        color: "#888",
    },
    cardTripName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardDates: {
        color: "#555",
        marginTop: 4,
    },
});
