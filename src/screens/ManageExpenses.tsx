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
import ExpenseItem from "../components/ExpenseItem";
import CategoryPicker from "../components/CategoryPicker";
import currencies from "../components/Currencies";
import categories from "../components/Categories";
const ManageExpenses = ({ route }: any) => {

    const navigation = useNavigation<NavigationProp<StackParamList>>();
    const { tripId } = route.params;
    const [expenses, setExpenses] = useState<any[]>([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [category, setCategory] = useState<string | null>(null);
    const [currency, setCurreny] = useState<string | null>(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const data = await getExpenses(tripId);
        setExpenses(data);
    };

    const handleAdd = async () => {
        await addExpense(tripId, { description, amount, category });
        fetchExpenses();
        setDescription('');
        setAmount('');
        setCategory(null);
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
            {!showForm ? (
                <View style={{ marginTop: 30, flex: 1 }}>
                    <FlatList
                        data={expenses}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <ExpenseItem
                                description={item.description}
                                amount={item.amount}
                                category={item.category}
                                onPressMenu={() => console.log('Show menu for', item.id)}
                            />
                        )}
                    />
                </View>
            ) : (
                <View style={{ padding: 20, flex: 1, marginTop: '10%' }}>
                    <View style={styles.formContainer}>
                        <CategoryPicker categories={categories} selectedCategory={category} onSelect={setCategory} />
                        <TextInput
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 10, flex: 0.8 }}
                        />
                    </View>
                    <View style={styles.formContainer}>
                        <CategoryPicker categories={currencies} selectedCategory={currency} onSelect={setCurreny} />
                        <TextInput
                            placeholder="Amount"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 10, flex: 0.8 }}
                        />
                    </View>

                    <Button title="Add Expense" onPress={() => handleAdd()} />
                    <Button title="Cancel" onPress={() => setShowForm(!showForm)} />
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
    editButtons: {
        backgroundColor: '#FE724C',
        borderRadius: 25,
        padding: 5,
        marginLeft: 10
    },
    expenses: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});