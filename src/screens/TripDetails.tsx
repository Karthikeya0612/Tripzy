import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { TripDetailsScreenProps } from '../components/Types';  // Import the types

const TripDetails: React.FC<TripDetailsScreenProps> = ({ route }) => {
  const { trip } = route.params;  // Now TypeScript recognizes 'trip' object

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trip.name}</Text>
      <Image source={trip.image} style={styles.image} />
      <Text style={styles.text}>Start Date: {trip.startDate}</Text>
      <Text style={styles.text}>End Date: {trip.endDate}</Text>
      <Text style={styles.text}>Budget: {trip.budget}</Text>
      <Text style={styles.text}>Transport: {trip.transport}</Text>
      <Text style={styles.text}>Accommodation: {trip.accommodation}</Text>
      <Text style={styles.text}>Notes: {trip.notes}</Text>
      <View>
        <Text style={styles.text}>Itinerary:</Text>
        {trip.itinerary.map((item, index) => (
          <Text key={index} style={styles.text}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default TripDetails;
