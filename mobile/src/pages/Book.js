import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';

import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');

    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        });

        Alert.alert('Solicitação de reserva enviada.');
        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>SUA DATA DE INTERESSE *</Text>
            <DatePicker
                date={date}
                mode="date"
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                format="YYYY-MM-DD"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                onDateChange={setDate}
                customStyles={{
                    dateInput: {
                        borderColor: 'rgba(0, 0, 0, 0)',
                        alignItems: 'flex-start',
                    },
                    placeholderText: {
                        color: '#999',
                        fontSize: 16,
                    },
                    dateText: {
                        fontSize: 16,
                        color: '#444'
                    },
                    dateIcon: {
                        display: 'none',
                    }
                }}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Encontrar spots</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? 50 : 0,
        margin: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30,
    },

    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    cancelButton: {
        marginTop: 10,
        backgroundColor: '#ccc',
    },

    buttonText: { 
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    }
})