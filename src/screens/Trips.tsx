import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import listOfTrips from '../components/Data';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../components/Types';

type TripsScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'TripsList'>;

const Trips: React.FC = () => {
    const navigation = useNavigation<TripsScreenNavigationProp>();
    return (
        <FlatList
            data={listOfTrips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.TripsContainer}>
                    <Text >{item.name}</Text>
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
    },
    image: {
        width: '100%',
        height: 100,
    },

});

export default Trips;
