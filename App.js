import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 30.471165,
          longitude: -91.147385,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
      ></MapView>
      <Text style={{ margin: 20, textAlign: 'center' }}>Food Plot App Alpha Test Build 0.0.1</Text>
      <StatusBar style="auto" />
    </View>
  );
}
