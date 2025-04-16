import { View, Text, StyleSheet } from "react-native";

const ManageExpenses = () => { 
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        </View>
    );
}
export default ManageExpenses;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});