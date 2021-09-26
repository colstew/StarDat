import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const VolplotTextInput = () : JSX.Element => (
  <View style={style.row}>
    <TextInput style={style.textInputL} keyboardType="numeric" label="DBH (cm)" />
    <TextInput style={style.textInputC} keyboardType="numeric" label="Height (m)" />
    <TextInput style={style.textInputR} value="99" keyboardType="numeric" label="NF (%)" />
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
  textInputC: {
    flex: 1,
    height: 52,
    marginLeft: 4,
    marginRight: 4,
  },
  textInputR: {
    flex: 1,
    height: 52,
    marginLeft: 4,
  },
});

export default VolplotTextInput;
