import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';

type ExpenseItemProps = {
    description: string;
    amount: string | number;
    category: string;
    onPressMenu: () => void;
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ description, amount, category, onPressMenu }) => {
    return (
        <TouchableOpacity onPress={onPressMenu}>
            <View style={styles.card}>
                <View style={styles.iconCircle}>
                    <Icon name={category} size={20} color="white" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{description}</Text>
                    <Text style={styles.amount}>₹ {amount}</Text>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    iconCircle: {
        backgroundColor: '#1c6888',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    amount: {
        color: '#1c6888',
        fontWeight: '500',
        marginTop: 4,
    },
});

export default ExpenseItem;
