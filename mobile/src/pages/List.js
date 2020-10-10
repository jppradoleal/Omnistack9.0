import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, Image, StyleSheet, Platform } from 'react-native';

import SpotList from '../Components/SpotList';

import logo from '../assets/logo.png'

export default function List() {
    const [techs, setTechs] = useState([]);

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