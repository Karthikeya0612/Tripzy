import { View, Text, StyleSheet, Button } from "react-native";

import { useNavigation } from '@react-navigation/native';
import TripForm from "./TripForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../components/Types";

type FormScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Form'>;
const Home: React.FC = () => {
    const navigation = useNavigation<FormScreenNavigationProp>();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Tripzy!</Text>
            <Text style={styles.text}>Plan your next trip with us!</Text>
            <View style={styles.container}>
                <Button
                    title="Add New Trip"
                    onPress={() => navigation.navigate('Form')}
                />
            </View>
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
    },
    text: {
        fontSize: 16,
    },
});
