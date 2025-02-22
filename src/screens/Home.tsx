import { View, Text, StyleSheet } from "react-native";

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Tripzy!</Text>
            <Text style={styles.text}>Plan your next trip with us!</Text>
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
