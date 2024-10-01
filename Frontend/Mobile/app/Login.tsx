import React from 'react'
import { SafeAreaView, View, Text ,StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

export default function Login() {
    return (
        <SafeAreaView style={styles.loginPage}>
            <View style={styles.container}>  
                <View style={styles.signLogo}>
                    <Image style={styles.ImgLogo} source={require('../assets/images/favicon.png')}/>
                    <Text style={styles.signText}>Sign in To Jetak</Text>
                    <Text style={styles.par}>Enter and search for the professional</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputItem}>
                        <Text style={styles.label}>Email or Username</Text>
                        <TextInput
                            style={styles.input} 
                            placeholder="Enter your email or username" 
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input} 
                            placeholder="Enter your password"  
                            secureTextEntry={true}
                        />
                    </View>

                    <TouchableOpacity style={styles.forgotButton} onPress={() => console.log('Forgot Password pressed')}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={() => console.log('Sign In pressed')}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.signUpSection}>
                    <Text style={styles.par}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => console.log('Sign Up pressed')}>
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loginPage: {
        height: '100%',
        marginTop: -50,
        marginBottom:-50,
        backgroundColor: '#f0f4f7',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#ffffff',
        width: '85%',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        gap: 10
    },
    ImgLogo: {
        width: 70,
        height: 70,
        marginBottom: 15,
    },
    signText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    par: {
        fontSize: 14,
        color: '#666',
    },
    form: {
        width: '100%',
    },
    inputItem: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f9f9f9',
        width: '100%',
        height: 45,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        fontSize: 16,
        color: '#333',
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#c9492f',
        textAlign: 'right',
        marginTop: -10,
        marginBottom: 20,
    },
    forgotButton: {
        alignSelf:'center',
        marginTop: 20,
        marginBottom:-10,
    },
    loginButton: {
        backgroundColor: '#c9492f',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signUpSection: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        color: '#c9492f',
        fontWeight: 'bold',
        marginLeft: 5,
    },
})
