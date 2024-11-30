import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Switch,
  TextInput,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMarker, updateMarker } from '../redux/markersSlice';
import { MARKER_TYPES } from '../constants/markerTypes';

const MarkerDetail = ({ route, navigation }) => {
  const { markerId } = route.params;
  const dispatch = useDispatch();
  const marker = useSelector(state => 
    state.markers.markers.find(m => m.id === markerId)
  );
  
  const [notes, setNotes] = useState(marker?.notes || '');
  const [isEditingType, setIsEditingType] = useState(false);

  if (!marker) return null;

  const handlePresenceToggle = (value) => {
    dispatch(updateMarker({
      ...marker,
      isPresent: value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleSaveNotes = () => {
    dispatch(updateMarker({
      ...marker,
      notes,
      lastUpdated: new Date().toISOString()
    }));
    Alert.alert('Success', 'Notes saved successfully');
  };

  const handleMarkerTypeChange = (newType) => {
    dispatch(updateMarker({
      ...marker,
      type: newType.id.toLowerCase(),
      lastUpdated: new Date().toISOString()
    }));
    setIsEditingType(false);
  };

  const renderMarkerTypeSelector = () => {
    return (
      <View style={styles.markerTypeContainer}>
        <Text style={styles.sectionTitle}>Select Marker Type</Text>
        <View style={styles.markerTypeGrid}>
          {Object.values(MARKER_TYPES).map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.markerTypeButton,
                marker.type === type.id.toLowerCase() && styles.selectedMarkerType
              ]}
              onPress={() => handleMarkerTypeChange(type)}
            >
              <Text style={styles.markerTypeIcon}>{type.icon}</Text>
              <Text style={styles.markerTypeLabel}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconContainer}
          onPress={() => setIsEditingType(!isEditingType)}
        >
          <Text style={styles.icon}>
            {MARKER_TYPES[marker.type.toUpperCase()]?.icon}
          </Text>
          <Text style={styles.changeTypeText}>Tap to change</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {MARKER_TYPES[marker.type.toUpperCase()]?.label}
        </Text>
      </View>

      {isEditingType && renderMarkerTypeSelector()}

      <View style={styles.details}>
        <View style={styles.presenceContainer}>
          <Text style={styles.presenceText}>Currently Present</Text>
          <Switch
            value={marker.isPresent}
            onValueChange={handlePresenceToggle}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={marker.isPresent ? '#2196F3' : '#f4f3f4'}
          />
        </View>
        
        <Text style={styles.coordinates}>
          Latitude: {marker.coordinate.latitude.toFixed(6)}
        </Text>
        <Text style={styles.coordinates}>
          Longitude: {marker.coordinate.longitude.toFixed(6)}
        </Text>
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add notes about this location..."
          textAlignVertical="top"
        />
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveNotes}
        >
          <Text style={styles.saveButtonText}>Save Notes</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            "Delete Marker",
            "Are you sure you want to delete this marker?",
            [
              { text: "Cancel", style: "cancel" },
              { 
                text: "Delete", 
                onPress: () => {
                  dispatch(deleteMarker(markerId));
                  navigation.goBack();
                },
                style: "destructive"
              }
            ]
          );
        }}
      >
        <Text style={styles.deleteButtonText}>Delete Marker</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: 4,
  },
  changeTypeText: {
    fontSize: 12,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 8,
  },
  details: {
    backgroundColor: '#f5f6fa',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  presenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  presenceText: {
    fontSize: 16,
    color: '#34495e',
  },
  coordinates: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
  notesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  markerTypeContainer: {
    padding: 16,
    backgroundColor: '#f5f6fa',
    margin: 16,
    borderRadius: 8,
  },
  markerTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  markerTypeButton: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedMarkerType: {
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd',
  },
  markerTypeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  markerTypeLabel: {
    fontSize: 14,
    color: '#2c3e50',
  },
});

export default MarkerDetail;
