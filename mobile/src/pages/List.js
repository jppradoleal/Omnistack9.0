import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, Text, Image, StyleSheet, Platform, Alert } from 'react-native';

import SpotList from '../Components/SpotList';

import logo from '../assets/logo.png'

export default function List() {
    const [techs, setTechs] = useState([]);
    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.10:8080', {
                query: {
                    user_id
                }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} no dia ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs
                                .split(',')
                                .map(tech=> tech.trim());
            setTechs(techsArray);
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <ScrollView>
                {techs.map(tech => <SpotList tech={tech} key={tech}/>)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 50 : 0
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    }
});