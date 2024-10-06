import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function Introduction_1() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.textStyle}>Career</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#CEEB43', 
        marginBottom:-52,
        marginTop:-52,
    },
    container: {
        flex: 1,
        backgroundColor: '#CEEB43',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10
    }
});
