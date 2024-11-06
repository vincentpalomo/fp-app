import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert, TouchableOpacity, PanResponder, Button, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

// Constants for radius
const MILE_TO_METERS = 1609.34;
const RADIUS_IN_MILES = 1;
const RADIUS_IN_METERS = RADIUS_IN_MILES * MILE_TO_METERS;

export default function App() {
  const [foodPlots, setFoodPlots] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  // useEffect to get current location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return;
      }

      const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus.status !== 'granted') {
        Alert.alert('Permission Denied', 'Background location permission is required');
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        (location) => {
          setCurrentLocation(location.coords);
        }
      );
    })();
  }, []);

  // get coordinates of center of map
  const getCenterCoordinates = async () => {
    if (mapRef) {
      try {
        const camera = await mapRef.getCamera();
        console.log({ camera });
        return {
          latitude: camera.center.latitude,
          longitude: camera.center.longitude,
        };
      } catch (error) {
        console.error('Error getting map center', error);
        return null;
      }
    }
  };

  // create food plot handler
  const createFoodPlot = (coordinate) => {
    const newFoodPlot = {
      id: Date.now(),
      coordinate: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
      radius: RADIUS_IN_METERS,
    };
    setFoodPlots([...foodPlots, newFoodPlot]);
  };

  const pressHandler = async () => {
    const centerCoordinate = await getCenterCoordinates();
    console.log({ centerCoordinate });
    if (centerCoordinate) {
      createFoodPlot(centerCoordinate);
    }
  };

  const pressHandler2 = () => {
    if (currentLocation) {
      const newFoodPlot = {
        id: Date.now(),
        coordinate: {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        isCheckedIn: false,
        radius: RADIUS_IN_METERS,
      };
      setFoodPlots([...foodPlots, newFoodPlot]);
    } else {
      Alert.alert('Error', 'Unable to get current location');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={(ref) => setMapRef(ref)}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 30.471165,
          longitude: -91.147385,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            draggable
            onDragEnd={(e) => setCurrentLocation(e.nativeEvent.coordinate)}
            pinColor="#ff3333"
          ></Marker>
        )}

        {/* Existing food plot markers */}
        {foodPlots.map((plot) => (
          <React.Fragment key={plot.id}>
            <Marker coordinate={plot.coordinate} />
            <Circle
              center={plot.coordinate}
              radius={plot.radius}
              strokeColor="rgba(0, 0, 255, 0.5)"
              fillColor="rgba(0, 0, 255, 0.3)"
            />
          </React.Fragment>
        ))}
      </MapView>

      {/* center dot */}
      <View style={styles.centerDot} />

      {/* button container */}
      <View
        style={{
          margin: 10,
          padding: 5,
          gap: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button title="Set New Food Plot" onPress={() => pressHandler()} />
        <Button title="Set Current GPS" onPress={() => pressHandler2()} />
      </View>
      <Text style={{ margin: 20, textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
        Food Plot App Alpha Test Build 0.0.1
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  centerDot: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    width: 10,
    height: 10,
    marginLeft: -5, // half of width to center
    marginTop: 5, // half of height to center
    backgroundColor: 'green', // or any color
    borderRadius: 5, // makes it a circle
    zIndex: 10, // ensures it overlays the map
  },
});
