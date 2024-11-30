import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMarker } from '../redux/markersSlice';
import { MARKER_TYPES } from '../constants/markerTypes';

const MarkerDetail = ({ route, navigation }) => {
  const { markerId } = route.params;
  const dispatch = useDispatch();
  const marker = useSelector(state => 
    state.markers.markers.find(m => m.id === markerId)
  );

  if (!marker) {
    return (
      <View style={styles.container}>
        <Text>Marker not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    dispatch(deleteMarker(markerId));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{MARKER_TYPES[marker.type]?.icon}</Text>
        <Text style={styles.title}>{MARKER_TYPES[marker.type]?.label}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.coordinates}>
          Latitude: {marker.coordinate.latitude.toFixed(6)}
        </Text>
        <Text style={styles.coordinates}>
          Longitude: {marker.coordinate.longitude.toFixed(6)}
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.deleteButtonText}>Delete Marker</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  details: {
    backgroundColor: '#f5f6fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  coordinates: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MarkerDetail;
