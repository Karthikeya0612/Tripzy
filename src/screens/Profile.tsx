import { View, Text, StyleSheet, Button } from "react-native";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
const Profile = () => { 
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Button
            title="Logout"
            onPress={handleLogout}
            color="#1c6888"
        />
        </View>
    );
}
export default Profile;
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