import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { StackParamList } from '../components/Types'; // Adjust the import path as necessary
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type FormScreenProps = NativeStackScreenProps<StackParamList, 'Form'>;

const TripForm = ({ navigation }: FormScreenProps) => {
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const [transport, setTransport] = useState('');
    const [itinerary, setItinerary] = useState('');

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
            <TextInput
                placeholder="Start Date (YYYY-MM-DD)"
                value={startDate}
                onChangeText={setStartDate}
                style={styles.input}
            />
            <TextInput
                placeholder="End Date (YYYY-MM-DD)"
                value={endDate}
                onChangeText={setEndDate}
                style={styles.input}
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
});

export default TripForm;
