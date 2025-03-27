import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const EditTrip: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { trip } = route.params as { trip: any };

    // State for editable trip details
    const [tripDetails, setTripDetails] = useState({
        name: trip.name,
        image: trip.image,
        startDate: trip.startDate,
        endDate: trip.endDate,
        budget: trip.budget,
        transport: trip.transport,
        accommodation: trip.accommodation,
        notes: trip.notes,
        people: trip.people.toString(),
    });

    // Handle input changes
    const handleChange = (field: string, value: string) => {
        setTripDetails((prev) => ({ ...prev, [field]: value }));
    };

    // Update trip in Firestore
    const handleUpdateTrip = async () => {
        try {
            const tripRef = doc(db, "trips", trip.id);
            await updateDoc(tripRef, {
                ...tripDetails,
                people: parseInt(tripDetails.people, 10),
            });
            Alert.alert("Success", "Trip updated successfully!");
            navigation.goBack();
            navigation.goBack();
        } catch (error) {
            console.error("Error updating trip:", error);
            Alert.alert("Error", "Could not update trip.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Trip Name</Text>
            <TextInput
                style={styles.input}
                value={tripDetails.name}
                onChangeText={(text) => handleChange("name", text)}
            />

            <Text style={styles.label}>Image URL</Text>
            <TextInput
                style={styles.input}
                value={tripDetails.image}
                onChangeText={(text) => handleChange("image", text)}
            />

            <Text style={styles.label}>Start Date</Text>
            <TextInput
                style={styles.input}
                value={tripDetails.startDate}
                onChangeText={(text) => handleChange("startDate", text)}
            />

            <Text style={styles.label}>End Date</Text>
            <TextInput
                style={styles.input}
                value={tripDetails.endDate}
                onChangeText={(text) => handleChange("endDate", text)}
            />

            <Text style={styles.label}>Budget</Text>
            <TextInput
                style={styles.input}
                value={tripDetails.budget}
                onChangeText={(text) => handleChange("budget", text)}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Transport</Text>
            <TextInput
                style={styles.input}
                value={tripDetails.transport}
                onChangeText={(text) => handleChange("transport", text)}
            />

            <Text style={styles.label}>Accommodation</Text>
            <TextInput
                style={styles.input}
                value={tripDetails.accommodation}
                onChangeText={(text) => handleChange("accommodation", text)}
            />

            <Text style={styles.label}>Notes</Text>
            <TextInput
                style={styles.input}
                value={tripDetails.notes}
                onChangeText={(text) => handleChange("notes", text)}
                multiline
            />

            <Text style={styles.label}>Number of People</Text>
            <TextInput
                style={styles.input}
                value={tripDetails.people}
                onChangeText={(text) => handleChange("people", text)}
                keyboardType="numeric"
            />

            <Button title="Update Trip" onPress={handleUpdateTrip} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
});

export default EditTrip;
