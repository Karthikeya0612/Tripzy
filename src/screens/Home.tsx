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
import { Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../components/Icon";

const { width, height } = Dimensions.get('window');

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
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1c6888" }}>
            {/* Header Section */}
            <View style={{ flex: 0.15, paddingHorizontal: 20, backgroundColor: "#1c6888", justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                    <View style={{backgroundColor: "white", borderRadius: 50, padding: 10}}>
                        <Image source={require("../../assets/tripzy.png")} style={styles.logo} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.welcome}>Hello {userName}</Text>
                        <Text style={styles.welcome}>Welcome to Tripzy!</Text>
                    </View>
                </View>
            </View>

            {/* Scrollable Trip Section */}
            <View style={{ flex: 0.85, backgroundColor: "#EAF0FF", borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    {upcoming && <TripCard title="Upcoming Trip" trip={upcoming} countdown />}
                    {ongoing && <TripCard title="Ongoing Trip" trip={ongoing} />}
                    {past && <TripCard title="Most Recent Trip" trip={past} />}

                    {trips.length === 0 && (
                        <View style={styles.centered}>
                            <Text style={{ fontSize: 18, color: "#888" }}>No trips found. Start planning your adventures!</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
            <View style={styles.addButton}>
                <TouchableOpacity onPress={() => navigation.navigate("Form")}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="plus" size={24} color="white" />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5, color: "white" }}>Create a New Trip</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

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
        paddingVertical: 20,
        paddingHorizontal: 16,

    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: width * 0.15,
        height: width * 0.15,
    },
    welcome: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
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
    addButton: {
        position: 'absolute',
        left: '55%',
        right: '2%',
        backgroundColor: '#1c6888',
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        bottom: '7%',
    },
});
