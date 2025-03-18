import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, Platform, TouchableOpacity, Image } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { StackParamList } from '../components/Types'; // Adjust the import path as necessary
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from 'react-native-gesture-handler';


type FormScreenProps = NativeStackScreenProps<StackParamList, 'Form'>;

const TripForm = ({ navigation }: FormScreenProps) => {
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [people, setPeople] = useState('');

    // Show/Hide Pickers
    const showStartDatePicker = () => setStartDatePickerVisibility(true);
    const hideStartDatePicker = () => setStartDatePickerVisibility(false);

    const showEndDatePicker = () => setEndDatePickerVisibility(true);
    const hideEndDatePicker = () => setEndDatePickerVisibility(false);

    // Handle Date Selection
    const handleStartDateConfirm = (date: Date) => {
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            weekday: 'long'
        }).format(date);

        setStartDate(formattedDate); // Example: 28 Feb 2025 (Friday)
        hideStartDatePicker();
    };

    const handleEndDateConfirm = (date: Date) => {
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            weekday: 'long'
        }).format(date);

        setEndDate(formattedDate); // Example: 28 Feb 2025 (Friday)
        hideEndDatePicker();
    };
    const [budget, setBudget] = useState('');
    const [transport, setTransport] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [notes, setNotes] = useState('');
    const [itinerary, setItinerary] = useState('');

    const [image, setImage] = useState<string | null>(null);

    // Function to handle image selection
    const pickImage = async () => {
        // Ask for permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            return;
        }

        // Open image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
            allowsEditing: true, // Enable cropping
            aspect: [4, 3], // Crop aspect ratio (optional)
            quality: 1, // Image quality (1 = highest)
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); // Set selected image URI
        }
    };

    const handleSubmit = async () => {
        const tripData = {
            name: tripName,
            startDate,
            endDate,
            budget,
            people,
            transport,
            accommodation,
            notes,
            image,
            itinerary: itinerary.split(','), // Convert string to array
        };

        try {
            await addDoc(collection(db, 'trips'), tripData);
            Alert.alert('Success', 'Trip added successfully!');
            navigation.goBack(); // Return to Home Screen
        } catch (error) {
            console.error('Error adding trip:', error);
            Alert.alert('Error', 'Failed to add trip.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                placeholder="Trip Name"
                value={tripName}
                onChangeText={setTripName}
                style={styles.input}
            />
            <Text style={styles.label}>Start Date:</Text>
            <TouchableOpacity onPress={showStartDatePicker} style={styles.dateButton}>
                <Text style={styles.dateText}>{startDate || 'Select Start Date'}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>End Date:</Text>
            <TouchableOpacity onPress={showEndDatePicker} style={styles.dateButton}>
                <Text style={styles.dateText}>{endDate || 'Select End Date'}</Text>
            </TouchableOpacity>

            {/* Start Date Picker */}
            <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={handleStartDateConfirm}
                onCancel={hideStartDatePicker}
            />

            {/* End Date Picker */}
            <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                onConfirm={handleEndDateConfirm}
                onCancel={hideEndDatePicker}
            />
            <TextInput
                placeholder="Budget"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Number of People"
                value={people}
                onChangeText={setPeople}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Mode of Transport"
                value={transport}
                onChangeText={setTransport}
                style={styles.input}
            />
            <TextInput
                placeholder="Accomodation"
                value={accommodation}
                onChangeText={setAccommodation}
                style={styles.input}
            />
            <TextInput
                placeholder="Notes"
                value={notes}
                onChangeText={setNotes}
                style={styles.input}
            />
            <TextInput
                placeholder="Itinerary (comma-separated)"
                value={itinerary}
                onChangeText={setItinerary}
                style={styles.input}
            />
            <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                <TouchableOpacity onPress={pickImage} style={{ padding: 10, backgroundColor: "#FFA07A", borderRadius: 10 }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Pick an Image</Text>
                </TouchableOpacity>

                {image && (
                    <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }} />
                )}
            </View>
            <Button title="Submit" onPress={handleSubmit}  />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    dateButton: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    }
});

export default TripForm;
