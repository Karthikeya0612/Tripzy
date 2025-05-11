/*import { View, Text, StyleSheet, Alert, Button } from "react-native";
import Header from "../components/Header"
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Icon from "../components/Icon";
import { deleteExpense } from "../components/ExpenseService";

type Expense = {
    tripId: string;
    id: string;
    description: string;
    amount: string;
    icon: string;
    currency: string;
};

type RouteParams = {
    ExpenseDetails: {
        expense: Expense;
    };
};
const ExpenseDetails = () => {
    const route = useRoute<RouteProp<RouteParams, 'ExpenseDetails'>>();
    const { tripId, id, description, amount, icon, currency } = route.params.expense;

    const navigation = useNavigation();
    const handleDelete = async () => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this expense?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await deleteExpense(tripId, id);
                    navigation.goBack();
                }
            }
        ]);
    };

    const handleUpdate = () => {
        navigation.goBack();

    };
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={styles.iconContainer}>
                <Icon name={icon} size={40} color="white" />
            </View>

            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{description}</Text>

            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.value}>
                <Icon name={currency} size={16} color="#1c6888" /> {amount}
            </Text>

            <Text style={styles.label}>Added by:</Text>
            <Text style={styles.value}>karthik</Text>

            <View style={styles.buttonContainer}>
                <Button title="Update" onPress={handleUpdate} />
                <Button title="Delete" onPress={handleDelete} color="red" />
            </View>
        </View>
    )
}
export default ExpenseDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fdfdfd',
    },
    header: {
        backgroundColor: '#1c6888',
        borderRadius: 50,
        padding: 20,
        alignSelf: 'center',
        marginBottom: 30,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color: '#222',
        marginBottom: 10,
    },
    iconContainer: {
        backgroundColor: '#1c6888',
        padding: 20,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 30,
        gap: 12,
    },
});

function fetchExpenses() {
    throw new Error("Function not implemented.");
}
*/