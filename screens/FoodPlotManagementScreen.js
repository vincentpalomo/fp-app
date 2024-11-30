import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addFoodPlot, updateFoodPlot } from '../redux/foodPlotsSlice';
import { getCurrentLocation } from '../utils/locationService';

const FoodPlotManagementScreen = ({ route, navigation }) => {
  const { plotId, mode } = route.params;
  const dispatch = useDispatch();
  const plot = useSelector(state => 
    state.foodPlots.plots.find(p => p.id === plotId)
  );

  const [name, setName] = useState(plot?.name || '');
  const [isPresent, setIsPresent] = useState(plot?.isPresent || false);
  const [notes, setNotes] = useState(plot?.notes || '');

  const handleSave = async () => {
    const location = await getCurrentLocation();
    const plotData = {
      id: plotId || Date.now().toString(),
      name,
      isPresent,
      notes,
      location,
      lastUpdated: new Date().toISOString(),
    };

    if (mode === 'create') {
      dispatch(addFoodPlot(plotData));
    } else {
      dispatch(updateFoodPlot(plotData));
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Plot Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter plot name"
        />

        <Text style={styles.label}>Present at Plot</Text>
        <Switch
          value={isPresent}
          onValueChange={setIsPresent}
          style={styles.switch}
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Enter notes"
          multiline
          numberOfLines={4}
        />

        <Button
          title={mode === 'create' ? 'Create Plot' : 'Update Plot'}
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
  },
  switch: {
    marginBottom: 20,
  },
});

export default FoodPlotManagementScreen;
