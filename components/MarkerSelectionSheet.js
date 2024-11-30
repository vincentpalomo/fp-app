import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import { MARKER_TYPES } from '../constants/markerTypes';

const MarkerSelectionSheet = ({ visible, onClose, onSelectMarker }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.contentContainer}>
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.title}>Select Marker Type</Text>
            <View style={styles.markerGrid}>
              {Object.values(MARKER_TYPES).map((markerType) => (
                <TouchableOpacity
                  key={markerType.id}
                  style={styles.markerButton}
                  onPress={() => {
                    onSelectMarker(markerType);
                    onClose();
                  }}
                >
                  <Text style={styles.markerIcon}>{markerType.icon}</Text>
                  <Text style={styles.markerLabel}>{markerType.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: Dimensions.get('window').height * 0.5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#000',
    opacity: 0.2,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  markerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  markerButton: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  markerLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MarkerSelectionSheet;
