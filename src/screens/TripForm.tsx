import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, Platform, TouchableOpacity } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { StackParamList } from '../components/Types'; // Adjust the import path as necessary
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type FormScreenProps = NativeStackScreenProps<StackParamList, 'Form'>;

const TripForm = ({ navigation }: FormScreenProps) => {
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

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
    const [itinerary, setItinerary] = useState('');

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const handleSubmit = async () => {
        const tripData = {
            name: tripName,
            startDate,
            endDate,
            budget,
            transport,
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
        <View style={styles.container}>
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
                placeholder="Mode of Transport"
                value={transport}
                onChangeText={setTransport}
                style={styles.input}
            />
            <TextInput
                placeholder="Itinerary (comma-separated)"
                value={itinerary}
                onChangeText={setItinerary}
                style={styles.input}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
