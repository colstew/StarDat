import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ToggleButton,
  Text,
} from 'react-native-paper';

interface Props {
  species: string,
  setSpecies: (val: string) => void,
  value: string,
  setValue: (val: string) => void,
}
const TreeButtons = ({
  species,
  setSpecies,
  value,
  setValue,
}: Props) : React.ReactElement => (
  <>
    <ToggleButton.Row
      style={style.row}
      onValueChange={(val) => (val === null ? setSpecies('') : setSpecies(val))}
      value={species}
    >
      <ToggleButton style={style.button} icon={() => <Text>S</Text>} value="S" />
      <ToggleButton style={style.button} icon={() => <Text>F</Text>} value="F" />
      <ToggleButton style={style.button} icon={() => <Text>B</Text>} value="B" />
      <ToggleButton style={style.button} icon={() => <Text>H</Text>} value="H" />
      <ToggleButton style={style.button} icon={() => <Text>C</Text>} value="C" />
    </ToggleButton.Row>

    <ToggleButton.Row
      style={style.row}
      onValueChange={(val) => (val === null ? setValue('') : setValue(val))}
      value={value}
    >
      <ToggleButton style={style.button} icon={() => <Text>75</Text>} value="75" />
      <ToggleButton style={style.button} icon={() => <Text>175</Text>} value="175" />
      <ToggleButton style={style.button} icon={() => <Text>375</Text>} value="375" />
      <ToggleButton style={style.button} icon={() => <Text>575</Text>} value="575" />
      <ToggleButton style={style.button} icon={() => <Text>875</Text>} value="875" />
    </ToggleButton.Row>
  </>
);

const style = StyleSheet.create({
  // row: baseLayout.inputRow,
  row: {
    flexDirection: 'row',
    marginBottom: 12, // interMargin from theme
  },
  button: {
    flex: 1,
    height: 58,
  },
});

export default TreeButtons;
