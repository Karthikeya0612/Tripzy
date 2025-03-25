import { View, Text, StyleSheet, Button, Image, ImageBackground, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../components/Types";
import React from "react";

type FormScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Form'>;
const Home: React.FC = () => {
    const navigation = useNavigation<FormScreenNavigationProp>();
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/tripzy.jpg')}  style={{width: '100%', height: '100%', flex: 1}}>
            <Text style={styles.title}>Welcome to Tripzy!</Text>
            <Text style={styles.text}>Plan your next trip here!</Text>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Form')} style={styles.button}>
                    <Text style={styles.buttonText}>Add a New Trip</Text>
                </TouchableOpacity>
                        
                        
            </View>
            </ImageBackground>
        </View>
    );
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '60%',

    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        marginTop: '20%',
        padding: 10,
        backgroundColor: '#FE724C',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }

});
