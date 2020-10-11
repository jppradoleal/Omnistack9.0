import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import React from 'react';
import Routes from './src/routes';

LogBox.ignoreLogs([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <>
      <StatusBar style="hidden"/>
      <Routes />
    </>
  );
}