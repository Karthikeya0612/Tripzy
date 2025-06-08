import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "./Icon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "./Types";
import NavigateBack from "./NavigateBack";

interface HeaderProps {
    name: string;
}

const Header = ({ name }: HeaderProps) => {
    const navigation = useNavigation<NavigationProp<StackParamList>>();
    return (
        <View style={styles.header}>
            <NavigateBack />
            <View style={styles.iconContanier}>
                <Icon name={name} color="white" size={50} />
            </View>
        </View>
    )
}
export default Header;
const styles = StyleSheet.create({

    header: {
        backgroundColor: '#1c6888',
        width: '100%',
        height: '20%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    iconContanier: {
        backgroundColor: '#1c6888',
        position: 'absolute',
        bottom: '-15%',
        left: '10%',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
        padding: "3%",
    },
})