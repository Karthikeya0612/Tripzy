import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, arrayUnion, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import Header from '../components/Header';
import Icon from '../components/Icon';
import { arrayRemove } from 'firebase/firestore';


const ManageFriends = ({ route }: any) => {
    const navigaton = useNavigation();
    const { tripId } = route.params;
    const [search, setSearch] = useState('');
    const [added, setAdded] = useState(false);
    interface User {
        id: string;
        name?: string;
        email?: string;
        [key: string]: any;
    }

    const [results, setResults] = useState<User[]>([]);

    const searchUsers = async () => {
        if (!search.trim()) return;

        const searchTerm = search.trim().toLowerCase();

        try {
            const q = query(
                collection(db, 'users'),
                where('email', '==', searchTerm)  // use exact match for now
            );
            const snapshot = await getDocs(q);
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setResults(users);
            console.log("Found users:", users);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    const addFriendToTrip = async (userId: string) => {
        const tripRef = doc(db, 'trips', tripId);
        await updateDoc(tripRef, {
            sharedWith: arrayUnion(userId),
        });

        setSearch('');
        setAdded(true);

    };
    const [sharedWith, setSharedWith] = useState<string[]>([]);

    useEffect(() => {
        const fetchTrip = async () => {
            const tripRef = doc(db, 'trips', tripId);
            const tripSnap = await getDoc(tripRef);

            if (tripSnap.exists()) {
                const data = tripSnap.data();
                setSharedWith(data.sharedWith || []);
            }
        };

        fetchTrip();
    }, []);

    const [sharedFriends, setSharedFriends] = useState<User[]>([]);

    useEffect(() => {
        const fetchFriends = async () => {
            if (sharedWith.length === 0) return;

            const usersQuery = query(
                collection(db, 'users'),
                where('__name__', 'in', sharedWith.slice(0, 10)) // Firestore allows max 10 items in 'in' query
            );

            const snapshot = await getDocs(usersQuery);
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSharedFriends(users);
        };

        fetchFriends();
    }, [sharedWith]);



    const removeFriendFromTrip = async (userId: string) => {
        const tripRef = doc(db, 'trips', tripId);
        await updateDoc(tripRef, {
            sharedWith: arrayRemove(userId)
        });

        setSharedWith(prev => prev.filter(id => id !== userId));
    };



    return (
        <View style={styles.container}>
            <Header name="account-multiple-plus" />
            <TextInput
                placeholder="Search user by email"
                value={search}
                autoCapitalize='none'
                onChangeText={setSearch}
                style={styles.input}
            />
            <TouchableOpacity onPress={searchUsers} style={styles.button}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 40, marginVertical: 10 }}>
                        <View >
                            <Text style={styles.name}>
                                {item.name}
                            </Text>
                            <Text style={styles.email}>
                                {item.email}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => addFriendToTrip(item.id)}>
                            <Icon name={added == false ? "account-plus" : "account-check"} size={24} color="#1c6888" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Text style={styles.subHeading}>Shared with:</Text>
            {sharedFriends.map(friend => (
                <View key={friend.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 40, marginVertical: 10 }}>
                    <View>
                        <Text style={styles.name}>{friend.name}</Text>
                        <Text style={styles.email}>{friend.email}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFriendFromTrip(friend.id)}>
                        <Icon name="account-remove" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            ))}

        </View>
    );
};

export default ManageFriends;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        marginVertical: 50,
        borderWidth: 1,
        borderColor: '#1c6888',
        padding: 10,
        marginHorizontal: 40,
    },
    button: {
        backgroundColor: '#1c6888',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
        marginHorizontal: '30%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 40,
        marginTop: 20,
    },
});
