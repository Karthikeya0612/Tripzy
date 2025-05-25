import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Header from "../components/Header";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from "../components/Icon";


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

    const [isStartPickerVisible, setStartPickerVisible] = useState(false);
    const [isEndPickerVisible, setEndPickerVisible] = useState(false);


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
        <View style={{ flex: 1 }}>
            <Header name="edit" />
            <ScrollView style={{ flex: 1, margin: 40 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.label}>Trip Name</Text>
                <TextInput
                    style={styles.input}
                    value={tripDetails.name}
                    onChangeText={(text) => handleChange("name", text)}
                />
                <View style={styles.dateContainer}>
                    <View>
                        <Text style={styles.label}>Start Date</Text>
                        <TouchableOpacity onPress={() => setStartPickerVisible(true)} style={styles.input}>
                            <Text>{tripDetails.startDate ? new Date(tripDetails.startDate).toDateString() : 'Select Start Date'}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.icon}><Icon name='arrow-forward' color='#1c6888' size={30} /></Text>
                    <View>
                        <Text style={styles.label}>End Date</Text>
                        <TouchableOpacity onPress={() => setEndPickerVisible(true)} style={styles.input}>
                            <Text>{tripDetails.endDate ? new Date(tripDetails.endDate).toDateString() : 'Select End Date'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={isStartPickerVisible}
                    mode="date"
                    date={tripDetails.startDate ? new Date(tripDetails.startDate) : new Date()}
                    onConfirm={(date) => {
                        handleChange("startDate", date.toISOString());
                        setStartPickerVisible(false);
                    }}
                    onCancel={() => setStartPickerVisible(false)}
                />

                <DateTimePickerModal
                    isVisible={isEndPickerVisible}
                    mode="date"
                    date={tripDetails.endDate ? new Date(tripDetails.endDate) : new Date()}
                    onConfirm={(date) => {
                        handleChange("endDate", date.toISOString());
                        setEndPickerVisible(false);
                    }}
                    onCancel={() => setEndPickerVisible(false)}
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
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleUpdateTrip}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },

    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#1c6888',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
    },
    dateButton: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        borderColor: '#1c6888',
        borderWidth: 1,
    },
    icon: {
        padding: 10,
        marginBottom: 15,
    },
    dateText: {
        fontSize: 14,
        color: '#333',
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imagePicker: {
        padding: 10,
        borderRadius: 10,
        borderColor: '#1c6888',
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: '#1c6888',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 5,
        fontSize: 13,
    }
});

export default EditTrip;
