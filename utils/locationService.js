// import Geolocation from 'react-native-geolocation-service';
// import { PermissionsAndroid, Platform } from 'react-native';

// const requestLocationPermission = async () => {
//   if (Platform.OS === 'ios') {
//     try {
//       const granted = await Geolocation.requestAuthorization('whenInUse');
//       return granted === 'granted';
//     } catch (err) {
//       return false;
//     }
//   }

//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'This app needs access to your location to show your position on the map.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       return false;
//     }
//   }
//   return false;
// };

// export const getCurrentLocation = () => {
//   return new Promise(async (resolve, reject) => {
//     const hasPermission = await requestLocationPermission();

//     if (!hasPermission) {
//       reject(new Error('Location permission not granted'));
//       return;
//     }

//     Geolocation.getCurrentPosition(
//       position => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       error => reject(error),
//       { 
//         enableHighAccuracy: true, 
//         timeout: 15000, 
//         maximumAge: 10000 
//       }
//     );
//   });
// };

// export const watchLocation = (callback) => {
//   return Geolocation.watchPosition(
//     position => {
//       callback({
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       });
//     },
//     error => console.error(error),
//     { 
//       enableHighAccuracy: true,
//       distanceFilter: 10, // Minimum distance (in meters) between updates
//       interval: 5000, // Minimum time (in milliseconds) between updates
//       fastestInterval: 2000, // Fastest rate at which your app can handle updates
//     }
//   );
// };

// export const clearLocationWatch = (watchId) => {
//   Geolocation.clearWatch(watchId);
// };

// export const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Earth's radius in km
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLon = (lon2 - lon1) * Math.PI / 180;
//   const a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//     Math.sin(dLon/2) * Math.sin(dLon/2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   return R * c; // Distance in km
// };


// src/utils/locationService.js
import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  try {
    // Request permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return null;
    }

    // Get current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};