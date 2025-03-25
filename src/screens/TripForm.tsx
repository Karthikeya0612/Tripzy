import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, Platform, TouchableOpacity, Image } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { StackParamList } from '../components/Types'; // Adjust the import path as necessary
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '../components/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';


type FormScreenProps = NativeStackScreenProps<StackParamList, 'Form'>;

const TripForm = ({ navigation }: FormScreenProps) => {
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
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
        }).format(date);

        setStartDate(date); // Example: 28 Feb 2025 (Friday)
        hideStartDatePicker();
    };

    const handleEndDateConfirm = (date: Date) => {
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);

        setEndDate(date); // Example: 28 Feb 2025 (Friday)
        hideEndDatePicker();
        generateItineraryInputs(date);
    };
    const [budget, setBudget] = useState('');
    const [transport, setTransport] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [notes, setNotes] = useState('');
    const [itinerary, setItinerary] = useState<string[]>([]);

    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const generateItineraryInputs = (end: Date) => {
        if (!startDate || !end) return;

        // Ensure startDate is a valid Date object
        const start = new Date(startDate);
        const endDay = new Date(end);

        // Calculate the difference in days
        const diffDays = Math.floor((endDay.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        // Initialize itinerary array with empty values
        setItinerary(Array.from({ length: diffDays }, () => ''));
    };

    // Handle Itinerary Input Change
    const handleItineraryChange = (index: number, text: string) => {
        setItinerary((prev) => {
            const newItinerary = [...prev];
            newItinerary[index] = text;
            return newItinerary;
        });
    };

    // Function to handle image selection
    const pickImage = async () => {
        // Ask for permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); // Set the image preview
        }
    };


    const handleSubmit = async () => {
        if (!startDate || !endDate) {
            Alert.alert('Error', 'Please select both start and end dates.');
            return;
        }

        let imageUrl = null;

        if (image) {
            try {
                const filename = image.substring(image.lastIndexOf("/") + 1);
                const storage = getStorage();
                const storageRef = ref(storage, `tripImages/${filename}`);
                const response = await fetch(image);
                const blob = await response.blob();
    
                await uploadBytes(storageRef, blob);
                imageUrl = await getDownloadURL(storageRef);
            } catch (error) {
                console.error("Image upload error:", error);
                Alert.alert('Error', 'Failed to upload image.');
                return;
            }
        }

        const tripData = {
            name: tripName,
            startDate: startDate.toISOString(), // Convert Date to string
            endDate: endDate.toISOString(),
            budget,
            people,
            transport,
            accommodation,
            notes,
            image: imageUrl,
            itinerary // Convert string to array
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <TextInput
                    placeholder="Enter your Destination"
                    value={tripName}
                    onChangeText={setTripName}
                    style={styles.input}
                />
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={showStartDatePicker} style={styles.dateButton}>
                        <Text style={styles.dateText}>{startDate ? startDate.toDateString() : 'Select Start Date'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.icon}><Icon name='arrow-forward' color='#FE724C' size={30} /></Text>
                    <TouchableOpacity onPress={showEndDatePicker} style={styles.dateButton}>
                        <Text style={styles.dateText}>{endDate ? endDate.toDateString() : 'Select End Date'}</Text>
                    </TouchableOpacity>
                </View>

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
                {/* Dynamic Itinerary Inputs */}
                {itinerary.length > 0 && <Text style={{ marginBottom: 15, textAlign: "center", fontSize: 20 }}>Itinerary:</Text>}
                {itinerary.map((day, index) => (
                    <TextInput
                        key={index}
                        placeholder={`Day ${index + 1} Plan`}
                        value={day}
                        onChangeText={(text) => handleItineraryChange(index, text)}
                        style={styles.input}
                    />
                ))}
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

                <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        <Text style={{ color: "gray", fontWeight: "bold" }}>Pick an Image</Text>
                    </TouchableOpacity>

                    {image && (
                        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }} />
                    )}
                </View>
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 40,
    },
    input: {
        borderWidth: 1,
        borderColor: '#FE724C',
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
        borderColor: '#FE724C',
        borderWidth: 1,
    },
    icon: {
        padding: 10,
        marginBottom: 15,
    },
    dateText: {
        fontSize: 16,
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
        borderColor: '#FE724C',
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: '#FE724C',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },

});

export default TripForm;
