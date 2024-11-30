import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { MARKER_TYPES } from '../constants/markerTypes';
import MapPinSvg from './MapPinSvg';

// Define exact dimensions
const MARKER_WIDTH = 26;
const MARKER_HEIGHT = 46;
const PADDING = 8;

const CustomMarker = ({ marker, onPress, onDragEnd }) => {
  if (!marker || !marker.coordinate) return null;

  const markerColor = marker.isPresent ? '#27ae60' : '#e74c3c';
  const markerType = MARKER_TYPES[marker.type.toUpperCase()];

  return (
    <Marker
      key={`${marker.id}-${marker.isPresent}`}
      coordinate={marker.coordinate}
      onPress={onPress}
      anchor={{ x: 0.5, y: 1.0 }}
      draggable={true}
      onDragEnd={(e) => onDragEnd(marker.id, e.nativeEvent.coordinate)}
      pinColor={markerColor}
    >
      {/* <View style={styles.markerContainer}>
        <View style={styles.markerWrapper}>
          <MapPinSvg 
            color={markerColor} 
            width={MARKER_WIDTH} 
            height={MARKER_HEIGHT}
          />
          <View style={styles.emojiContainer}>
            <Text style={styles.emojiText}>{markerType?.icon}</Text>
          </View>
        </View>
      </View> */}
    </Marker>
  );
};


const styles = StyleSheet.create({
  markerContainer: {
    width: MARKER_WIDTH,
    height: MARKER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  markerWrapper: {
    width: MARKER_WIDTH,
    height: MARKER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  emojiContainer: {
    position: 'absolute',
    top: MARKER_HEIGHT * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    width: MARKER_WIDTH,
    overflow: 'visible',
    zIndex: 1,
  },
  emojiText: {
    fontSize: MARKER_WIDTH * 0.5,
    textAlign: 'center',
  },
});

export default CustomMarker;
