import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface Props {
  height: string,
  setHeight: (val: string) => void,
  dbh: string,
  setDBH: (val: string) => void,
}

const SweepTextInput = ({
  height,
  setHeight,
  dbh,
  setDBH,
}: Props) : JSX.Element => (
  <View style={style.row}>
    <TextInput
      style={style.textInputL}
      value={dbh}
      onChangeText={(text) => setDBH(text)}
      keyboardType="numeric"
      label="DBH (cm)"
    />
    <TextInput
      style={style.textInputR}
      value={height}
      onChangeText={(text) => setHeight(text)}
      keyboardType="numeric"
      label="Height (m)"
    />
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
