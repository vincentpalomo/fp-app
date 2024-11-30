import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentLocation } from '../utils/locationService';
import { addMarker, updateMarker } from '../redux/markersSlice';
import CustomMarker from '../components/CustomMarker';
import MarkerSelectionSheet from '../components/MarkerSelectionSheet';
import ActionButton from '../components/ActionButton';

const HomeScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 30.471165,
    longitude: -91.147385,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedMarkerType, setSelectedMarkerType] = useState(null);
  const [showRadius, setShowRadius] = useState(true);
  const markers = useSelector(state => state.markers.markers) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    const initLocation = async () => {
      try {
        const location = await getCurrentLocation();
        if (location) {
          setUserLocation(location);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    initLocation();
  }, []);

  const handleMapLongPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
    setIsBottomSheetVisible(true);
    setSelectedMarkerType(null);
  };

  const handleMapPress = (event) => {
    if (selectedMarkerType) {
      const newMarker = {
        id: Date.now().toString(),
        type: selectedMarkerType.id.toLowerCase(),
        coordinate: event.nativeEvent.coordinate,
        isPresent: false,
        timestamp: new Date().toISOString(),
        showRadius: selectedMarkerType.id.toLowerCase() === 'camp' || 
                   selectedMarkerType.id.toLowerCase() === 'food_plot'
      };
      dispatch(addMarker(newMarker));
      setSelectedMarkerType(null);
    }
  };

  const handleMarkerSelection = (markerType) => {
    if (selectedLocation) {
      const newMarker = {
        id: Date.now().toString(),
        type: markerType.id.toLowerCase(),
        coordinate: selectedLocation,
        isPresent: false,
        timestamp: new Date().toISOString(),
        showRadius: markerType.id.toLowerCase() === 'camp' || 
                   markerType.id.toLowerCase() === 'food_plot'
      };
      dispatch(addMarker(newMarker));
      setSelectedLocation(null);
      setIsBottomSheetVisible(false);
    } else {
      setSelectedMarkerType(markerType);
      setIsBottomSheetVisible(false);
    }
  };

  const handleMarkerDragEnd = (markerId, newCoordinate) => {
    const marker = markers.find(m => m.id === markerId);
    if (marker) {
      dispatch(updateMarker({
        ...marker,
        coordinate: newCoordinate,
        lastUpdated: new Date().toISOString()
      }));
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={userLocation}
        showsUserLocation={true}
        showsCompass={true}
        onLongPress={handleMapLongPress}
        onPress={handleMapPress}
        mapType="hybrid"
      >
        {markers.map(marker => (
          <CustomMarker
            key={marker.id}
            marker={marker}
            onPress={() => navigation.navigate('MarkerDetail', { markerId: marker.id })}
            onDragEnd={handleMarkerDragEnd}
            style={{ height: 100, width: 100, borderWidth: 1, borderColor: 'red' }}
          />
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.radiusToggle}
        onPress={() => setShowRadius(!showRadius)}
      >
        <Text style={styles.radiusToggleText}>
          {showRadius ? '🔵 Hide Radius' : '⚪ Show Radius'}
        </Text>
      </TouchableOpacity>

      {selectedMarkerType && (
        <View style={styles.selectionBanner}>
          <Text style={styles.selectionText}>
            Tap on the map to place {selectedMarkerType.label}
          </Text>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => setSelectedMarkerType(null)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <ActionButton
        onPress={() => setIsBottomSheetVisible(true)}
      />
      
      <MarkerSelectionSheet
        visible={isBottomSheetVisible}
        onClose={() => {
          setIsBottomSheetVisible(false);
          setSelectedLocation(null);
        }}
        onSelectMarker={handleMarkerSelection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
  },
  radiusToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radiusToggleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  selectionBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(44, 62, 80, 0.9)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectionText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
