import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const SweepTextInput = () : JSX.Element => (
  <View style={style.row}>
    <TextInput style={style.textInputL} keyboardType="numeric" label="DBH (cm)" />
    <TextInput style={style.textInputR} keyboardType="numeric" label="Height (m)" />
  </View>
);

const style = StyleSheet.create({

  row: {
    flexDirection: 'row',
    marginBottom: 12, // interMargin,
  },
  textInputL: {
    flex: 1,
    height: 52,
    marginRight: 4,
  },
  textInputR: {
    flex: 1,
    height: 52,
    marginLeft: 4,
  },
});

export default SweepTextInput;
