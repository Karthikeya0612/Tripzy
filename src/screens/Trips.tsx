import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import listOfTrips from '../components/Data';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../components/Types';

type TripsScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Trips'>;

const Trips: React.FC = () => {
    const navigation = useNavigation<TripsScreenNavigationProp>();
    return (
        <FlatList
            data={listOfTrips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.TripsContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TripDetails', { trip: item })}>
                        <Image
                            source={item.image} // Ensure image exists
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
            )}
        />

    );
};
const styles = StyleSheet.create({
    TripsContainer: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 350,
        height: 400,
        borderRadius: 20,

    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    }

});

export default Trips;
