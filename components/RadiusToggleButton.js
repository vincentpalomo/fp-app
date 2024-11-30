import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RadiusToggleButton = ({ isVisible, onToggle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isVisible ? styles.active : styles.inactive]}
      onPress={onToggle}
    >
      <Text style={styles.buttonText}>👁️ Radius</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  active: {
    backgroundColor: '#2ecc71',
  },
  inactive: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});

export default RadiusToggleButton;
