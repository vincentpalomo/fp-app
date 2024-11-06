import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert, TouchableOpacity, PanResponder, Button } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function App() {
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

  console.log(currentLocation);

  // get coordinates of center of map
  const getCenterCoordinates = async () => {
    console.log('line 45');
    if (mapRef) {
      console.log('got in here');
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

  const pressHandler = async () => {
    console.log('clicked');
    const centerCoordinate = await getCenterCoordinates();
    console.log({ centerCoordinate });
    if (centerCoordinate) {
      setCurrentLocation(centerCoordinate);
    }
  };

  const pressHandler2 = () => {
    console.log('click 2');
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
      </MapView>

      {/* button container */}
      <View
        style={{
          margin: 10,
        }}
      >
        <Button title="Click here" onPress={() => pressHandler()}>
          Click here
        </Button>
        <Button title="Click here 2" onPress={() => pressHandler2()}>
          Click here
        </Button>
      </View>
      <Text style={{ margin: 20, textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
        Food Plot App Alpha Test Build 0.0.1
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
