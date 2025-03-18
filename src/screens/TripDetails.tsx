import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { TripDetailsScreenProps } from '../components/Types';
import Icon from '../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import TripCard from '../components/TripCard';

const formatDate = (startDate: string, dayOffset: number) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayOffset);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    weekday: "short",
  });
};

const TripDetails: React.FC<TripDetailsScreenProps> = ({ route }) => {
  const { trip } = route.params;
    
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: trip.image }} style={styles.image} />
        <View style={styles.floatingComponent}>
          <Text style={styles.title}>{trip.name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="currency-rupee" size={20} color="red" />
              <Text style={{ fontSize: 16, marginLeft: 5 }}>{trip.budget}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="date-range" size={20} color="red" />
              <Text style={{ fontSize: 16, marginLeft: 5 }}>{`${trip.itinerary.length} days`}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="people" size={20} color="red" />
              <Text style={{ fontSize: 16, marginLeft: 5 }}>{trip.people}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.detailsContainer}>
          <Text style={styles.text}><Text style={styles.textHeading}>Transport: </Text> {trip.transport}</Text>
          <Text style={styles.text}><Text style={styles.textHeading}>Accommodation: </Text>{trip.accommodation}</Text>
          <Text style={styles.text}><Text style={styles.textHeading}>Notes: </Text>{trip.notes}</Text>
        </View>
          <Text style={styles.title}>Itinerary:</Text>
        <FlatList
          data={trip.itinerary}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true} // Enables horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hides scroll bar
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => (
            <TripCard day={index + 1} date={formatDate(trip.startDate, index)} plan={item} />
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E0E0E0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 350,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  textHeading: {  
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  imageContainer: {
    width: "100%",
    height: 370,
  },
  floatingComponent: {
    position: 'absolute',
    bottom: -20,
    left: '20%',
    right: '20%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 1, // To display above the image
  },
  listContainer: {
    paddingHorizontal: 10, // Adds spacing at the start & end
  },
  detailsContainer: {
    padding: 10,
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 1, 
  },

});

export default TripDetails;

