import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import Icon from '../components/Icon';

const SignIn: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Main');
        } catch (error: any) {
            Alert.alert("Sign In Failed", error.message);
            setPassword('');
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

                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <Text style={styles.or}>OR</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.socialIcons}>
                        <TouchableOpacity style={styles.iconButton} >
                            <Icon name="facebook" size={24} color="#3b5998" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="google" size={24} color="#db4a39" />
                        </TouchableOpacity>
                    </View>

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
        backgroundColor: '#e5f2ff',
        justifyContent: 'center',
    },
    header: {
        height: '40%',
        backgroundColor: '#00aaff',
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
        padding: 20,
        elevation: 10,
        marginTop: "30%",
    },
    appName: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0077cc',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
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
        color: '#00aaff',
        marginBottom: 20,
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#00aaff',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    loginText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    or: {
        marginHorizontal: 10,
        color: '#aaa',
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    iconButton: {
        padding: 10,
    },
    signUpText: {
        textAlign: 'center',
        color: '#555',
    },
    signUpLink: {
        color: '#0077cc',
        fontWeight: 'bold',
    },
});

