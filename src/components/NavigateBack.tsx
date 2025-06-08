import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "./Types";

export default function NavigateBack() {
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.actionButton}>
            <Icon name="arrow-left" size={24} color="#1c6888" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    actionButton: {
        position: 'absolute',
        top: "15%",
        left: "4%",
        right: "85%",
        backgroundColor: 'white',
        borderRadius: 15,
        padding: "2%",
        alignItems: 'center',
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
    },
});
