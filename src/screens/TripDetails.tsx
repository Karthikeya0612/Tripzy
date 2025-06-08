import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { StackParamList } from '../components/Types';
import Icon from '../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import TripCard from '../components/TripCard';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import NavigateBack from '../components/NavigateBack';

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
  const [modalVisible, setModalVisible] = useState(false);

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

        <TouchableOpacity onPress={() => navigation.navigate('EditTrip', { trip })} style={[styles.actionButtons, { top: "15%" }]}>
          <Icon name="pencil" size={24} color="#1c6888" />
        </TouchableOpacity>


        <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.actionButtons, { top: "30%" }]}>
          <Icon name="delete" size={24} color="#1c6888" />
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('ManageFriends', { tripId: trip.id })} style={[styles.actionButtons, { top: "45%" }]}>
          <Icon name="account-multiple" size={24} color="#1c6888" />
        </TouchableOpacity>

        <NavigateBack />

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text>Are you sure you want to delete this?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                <TouchableOpacity onPress={() => handleDeleteTrip(trip)} style={styles.editButtons}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.editButtons}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.floatingComponent}>
          <Text style={styles.title}>{trip.name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="currency-inr" size={20} color="#1c6888" />
              <Text style={{ fontSize: 16, marginLeft: 5 }}>{trip.budget}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="calendar-month" size={20} color="#1c6888" />
              <Text style={{ fontSize: 16, marginLeft: 5 }}>{`${trip.itinerary.length} days`}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="account-multiple" size={20} color="#1c6888" />
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
          <Text style={styles.text}><Text style={styles.textHeading}>Created By: </Text>{trip.createdBy} on {formatDate(trip.createdAt ?? '', 0)}</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('ManageExpenses', { tripId: trip.id })}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="receipt" size={24} color="white" />
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
  expenseButton: {
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
  },
  editButtons: {
    backgroundColor: '#1c6888',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
  },

});

export default TripDetails;

