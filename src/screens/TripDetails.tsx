import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackParamList } from '../components/Types';
import Icon from '../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import TripCard from '../components/TripCard';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const formatDate = (startDate: string, dayOffset: number) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayOffset);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    weekday: "short",
  });
};

type TripDetailsScreenProps = NativeStackScreenProps<StackParamList, 'TripDetails'>;



const TripDetails: React.FC<TripDetailsScreenProps> = ({ route }) => {
  const { trip } = route.params;
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handleDeleteTrip = async (trip: { id: string, image: any }) => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, trip.image); // Reference to the image in storage

      await deleteObject(imageRef)
        .then(() => console.log("Image deleted successfully"))
        .catch((error) => console.error("Error deleting image:", error));
      await deleteDoc(doc(db, "trips", trip.id));
      navigation.goBack(); // Navigate back after deletion
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: trip.image }} style={styles.image} />
        <View style={[styles.actionButtons , { top: "15%" }]}>
          <TouchableOpacity onPress={() => navigation.navigate('EditTrip', { trip })}>
            <Icon name="edit" size={24} color="#1c6888" />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.actionButtons, { top: "30%" }]}>
          <TouchableOpacity onPress={() => handleDeleteTrip(trip)}>
            <Icon name="delete" size={24} color="#1c6888" />
          </TouchableOpacity>
        </View>

        <View style={[styles.actionButtons , { top: "15%", left: "2%", right: "85%" }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#1c6888" />
          </TouchableOpacity>
        </View>

        <View style={styles.floatingComponent}>
          <Text style={styles.title}>{trip.name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="currency-rupee" size={20} color="#1c6888" />
              <Text style={{ fontSize: 16, marginLeft: 5 }}>{trip.budget}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="date-range" size={20} color="#1c6888" />
              <Text style={{ fontSize: 16, marginLeft: 5 }}>{`${trip.itinerary.length} days`}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="people" size={20} color="#1c6888" />
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
      <View style={styles.expenseButton}>
          <TouchableOpacity onPress={() => navigation.navigate('ManageExpenses', { tripId: trip.id})}>
            <View style={{flexDirection: 'row'}}>
            <Icon name="sticky-note-2" size={24} color="white" />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5, color: "white" }}>Manage Expenses</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  actionButtons: {
    position: 'absolute',
    left: '85%',
    right: '2%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 8,
    alignItems: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000',
  },
  expenseButton:{
    position: 'absolute',
    left: '50%',
    right: '2%',
    backgroundColor: '#1c6888',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    bottom: '5%',
  }

});

export default TripDetails;

