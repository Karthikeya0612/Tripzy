import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, Button, FlatList, Alert } from "react-native";
import Icon from "../components/Icon";
import { addExpense, updateExpense, getExpenses, deleteExpense } from '../components/ExpenseService';
import { useCallback, useEffect, useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
import CategoryPicker from "../components/CategoryPicker";
import currencies from "../components/Currencies";
import icons from "../components/Icons";
import Header from "../components/Header";
import { useFocusEffect } from "@react-navigation/native";

const ManageExpenses = ({ route }: any) => {

    const { tripId } = route.params;
    const [expenses, setExpenses] = useState<any[]>([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [showUpdate, setShowUpdate] = useState(false);
    const [icon, setIcon] = useState<string | null>(icons.length > 0 ? icons[0].value : null);
    const [currency, setCurreny] = useState<string | null>(currencies.length > 0 ? currencies[0].value : null);
    const [mode, setMode] = useState<'list' | 'add' | 'update' | 'view' | 'delete'>('list');
    const [selectedExpenseId, setSelectedExpenseId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        if (!icon && icons.length > 0) {
            setIcon(icons[0].value);
        }
    }, [icons]);

    useEffect(() => {
        if (!currency && currencies.length > 0) {
            setCurreny(currencies[0].value);
        }
    }, [currencies]);

    const fetchExpenses = async () => {
        const data = await getExpenses(tripId);
        setExpenses(data);
    };

    const handleAdd = async () => {
        await addExpense(tripId, { description, amount, icon, currency });
        fetchExpenses();
        setDescription('');
        setAmount('');
        setIcon(icons[0].value);
        setCurreny(currencies[0].value);
        setSelectedExpenseId('');
        setMode('list');
    };

    const handleDelete = async () => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this expense?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await deleteExpense(tripId, selectedExpenseId);
                    fetchExpenses();
                    setMode('list');
                }
            }
        ]);

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
    switch (mode) {
        case 'list':
            return (
                <View style={styles.container}>
                    <Header />
                    <View style={{ marginTop: 30, flex: 1 }}>
                        <FlatList
                            data={expenses}
                            keyExtractor={item => item.id}
                            extraData={expenses}
                            renderItem={({ item }) => (
                                <ExpenseItem
                                    tripId={tripId}
                                    id={item.id}
                                    description={item.description}
                                    amount={item.amount}
                                    icon={item.icon}
                                    currency={item.currency}
                                    onPress={() => {
                                        setSelectedExpenseId(item.id);
                                        setDescription(item.description);
                                        setAmount(item.amount.toString());
                                        setIcon(item.icon);
                                        setCurreny(item.currency);
                                        setMode('view');
                                    }}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.addButton}>
                        <TouchableOpacity onPress={() => setMode('add')}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="sticky-note-2" size={24} color="white" />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5, color: "white" }}>Add Expenses</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        case 'add':
            return (
                <View style={styles.container}>
                    <Header />
                    <View style={{ padding: 20, flex: 1, marginTop: '10%' }}>
                        <View style={styles.formContainer}>
                            <CategoryPicker categories={icons} selectedCategory={icon} onSelect={setIcon} />
                            <TextInput
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                                style={styles.formInput}
                            />
                        </View>
                        <View style={styles.formContainer}>
                            <CategoryPicker categories={currencies} selectedCategory={currency} onSelect={setCurreny} />
                            <TextInput
                                placeholder="Amount"
                                value={amount}
                                onChangeText={setAmount}
                                keyboardType="numeric"
                                style={styles.formInput}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => handleAdd()} style={styles.editButtons}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setMode('list')} style={styles.editButtons}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        case 'view':
            return (
                <View style={styles.container}>
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

                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => setMode('update')} style={styles.editButtons}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete()} style={styles.editButtons}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>Delete</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        case 'update':
            return (
                <View style={styles.container}>
                    <Header />
                    <View style={{ padding: 20, flex: 1, marginTop: '10%' }}>
                        <View style={styles.formContainer}>
                            <CategoryPicker categories={icons} selectedCategory={icon} onSelect={setIcon} />
                            <TextInput
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                                style={styles.formInput}
                            />
                        </View>
                        <View style={styles.formContainer}>
                            <CategoryPicker categories={currencies} selectedCategory={currency} onSelect={setCurreny} />
                            <TextInput
                                placeholder="Amount"
                                value={amount}
                                onChangeText={setAmount}
                                keyboardType="numeric"
                                style={styles.formInput}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => handleAdd()} style={styles.editButtons}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editButtons}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        case 'delete':
            break;
    }

}
export default ManageExpenses;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        left: '60%',
        right: '2%',
        backgroundColor: '#1c6888',
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        elevation: 5,
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
        paddingHorizontal: 10,
    },
    formInput: {
        flex: 0.85,
        borderBottomWidth: 1,
        borderColor: '#1c6888',
        borderRadius: 8,
        padding: 10,
        width: '45%',
        marginHorizontal: 5,
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