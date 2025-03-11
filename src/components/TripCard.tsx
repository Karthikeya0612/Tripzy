import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
interface TripCardProps {
    day: number;
    date: string;
    plan: string;
}

const TripCard: React.FC<TripCardProps> = ({ day, date, plan }) => {
    return (
        <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
            <Text style={styles.dayNumber}>{`Day ${day}: ${date}`}</Text>
            <Text style={styles.dayText}>{plan}</Text>
        </ScrollView>
    );
};
export default TripCard;

const styles = StyleSheet.create({
    card: {
        width: 200, // Adjust card size
        height: 200,
        backgroundColor: 'white',
        borderRadius: 15,
        marginRight: 10, // Space between cards
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
        marginBottom: 20, // Space between cards
        overflow: 'scroll', // Hides the shadow overflow

    },
    dayNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#FFA500',
        color: 'white',
        width: "100%",
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginBottom: 5,
        // Moves the number up
    },
    dayText: {
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 10,

    },
});