import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface Props {
  height: string,
  setHeight: (val: string) => void,
  dbh: string,
  setDBH: (val: string) => void,
  nf: string,
  setNF: (val: string) => void,
}
const VolplotTextInput = ({
  height,
  setHeight,
  dbh,
  setDBH,
  nf,
  setNF,
}: Props) : JSX.Element => (
  <View style={style.row}>
    <TextInput
      style={style.textInputL}
      keyboardType="numeric"
      label="DBH (cm)"
      value={dbh}
      onChangeText={(text) => setDBH(text)}
    />
    <TextInput
      style={style.textInputC}
      keyboardType="numeric"
      label="Height (m)"
      value={height}
      onChangeText={(text) => setHeight(text)}
    />
    <TextInput
      style={style.textInputR}
      keyboardType="numeric"
      label="NF (%)"
      value={nf}
      onChangeText={(text) => setNF(text)}
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
