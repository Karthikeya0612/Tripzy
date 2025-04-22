import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, FlatList } from "react-native";
import Icon from "../components/Icon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../components/Types";
import {
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenses,
} from '../components/ExpenseService';
import { useEffect, useState } from "react";
const ManageExpenses = ({ route }: any) => {

    const navigation = useNavigation<NavigationProp<StackParamList>>();
    const { tripId } = route.params;
    const [expenses, setExpenses] = useState<any[]>([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const data = await getExpenses(tripId);
        setExpenses(data);
    };

    const handleAdd = async () => {
        await addExpense(tripId, { description, amount });
        fetchExpenses();
        setDescription('');
        setAmount('');
        setShowForm(!showForm);
    };
    const handleView = () => {
        setShowForm(!showForm);
    };
    const handleUpdateView = (id: string) => {
        setUpdateId(id);
        setShowUpdate(!showUpdate);
        const expenseToUpdate = expenses.find(expense => expense.id === id);
        if (expenseToUpdate) {
            setDescription(expenseToUpdate.description);
            setAmount(expenseToUpdate.amount.toString());
        }
    };
    const handleUpdate = async () => {
        await updateExpense(tripId, updateId, { description, amount });
        fetchExpenses();
        setDescription('');
        setAmount('');
        setUpdateId('');
        setShowUpdate(!showUpdate);
        
    };

    const handleDelete = async (id: string) => {
        await deleteExpense(tripId, id);
        fetchExpenses();
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContanier}>
                    <Icon name="wallet-travel" color="white" size={50} />
                </View>
            </View>
            {!showForm && !showUpdate ? (
                <View style={{ padding: 20 }}>
                    <FlatList
                        data={expenses}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={{ marginTop: 10 }}>
                                <Text>{item.description}: ₹{item.amount}</Text>
                                <Button title="Update" onPress={() => handleUpdateView(item.id)} />
                                <Button title="Delete" onPress={() => handleDelete(item.id)} />
                            </View>
                        )}
                    />
                </View>
            ) : showForm ? (
                <View style={{ padding: 20 }}>
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 10 }}
                    />
                    <TextInput
                        placeholder="Amount"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 10 }}
                    />
                    <Button title="Add Expense" onPress={() => handleAdd()} />
                    <Button title="Cancel" onPress={() => setShowForm(!showForm)} />
                </View>
            ) : (
                <View style={{ padding: 20 }}>
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 10 }}
                    />
                    <TextInput
                        placeholder="Amount"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 10 }}
                    />
                    <Button title="Update" onPress={() => handleUpdate()} />
                    <Button title="Cancel" onPress={() => setShowUpdate(!showUpdate)} />
                </View>
            )}


            <View style={styles.addButton}>
                <TouchableOpacity onPress={() => handleView()}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="sticky-note-2" size={24} color="white" />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5, color: "white" }}>Add Expenses</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default ManageExpenses;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#FE724C',
        width: '100%',
        height: '20%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },

    iconContanier: {
        backgroundColor: '#FE724C',
        position: 'absolute',
        bottom: '-15%',
        left: '10%',
        borderColor: '#696969',
        borderWidth: 3,
        borderRadius: 10,
        padding: "3%",
    },
    actionButtons: {
        position: 'absolute',
        top: "20%",
        left: "4%",
        right: "85%",
        backgroundColor: 'white',
        borderRadius: 15,
        padding: "2%",
        alignItems: 'center',
        elevation: 5, // For Android shadow
        shadowColor: '#000',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        left: '60%',
        right: '2%',
        backgroundColor: '#FE724C',
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        elevation: 5, // For Android shadow
        shadowColor: '#000',
        bottom: '5%',
    },
});