import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';

const SignIn: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                Alert.alert(
                    'Email Not Verified',
                    'Please verify your email before logging in.'
                );
                return;
            }
        } catch (error: any) {
            Alert.alert('Login Failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.header} />
                <View style={styles.formContainer}>
                    <Text style={styles.appName}>Tripzy</Text>
                    <Text style={styles.subtitle}>Application title</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#999"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
                        <Text style={styles.loginText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>

                    <Text style={styles.signUpText}>
                        Don't have an account?{' '}
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signUpLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        height: '45%',
        backgroundColor: '#1c6888',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    formContainer: {
        marginHorizontal: '10%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: "5%",
        elevation: 10,
    },
    appName: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1c6888',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    forgotText: {
        textAlign: 'right',
        color: '#1c6888',
        marginBottom: 20,
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#1c6888',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    loginText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signUpText: {
        textAlign: 'center',
        color: '#555',
    },
    signUpLink: {
        color: '#1c6888',
        fontWeight: 'bold',
    },
});

