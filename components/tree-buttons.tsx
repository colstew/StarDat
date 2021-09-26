import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ToggleButton,
  Text,
} from 'react-native-paper';

const TreeButtons = () : React.ReactElement => {
  const [species, setSpecies] = React.useState('S');
  const [value, setValue] = React.useState('75');
  return (
    <>
      <ToggleButton.Row style={style.row} onValueChange={(val) => setSpecies(val)} value={species}>
        <ToggleButton style={style.button} icon={() => <Text>S</Text>} value="S" />
        <ToggleButton style={style.button} icon={() => <Text>F</Text>} value="F" />
        <ToggleButton style={style.button} icon={() => <Text>B</Text>} value="B" />
        <ToggleButton style={style.button} icon={() => <Text>H</Text>} value="H" />
        <ToggleButton style={style.button} icon={() => <Text>C</Text>} value="C" />
      </ToggleButton.Row>

      <ToggleButton.Row style={style.row} onValueChange={(val) => setValue(val)} value={value}>
        <ToggleButton style={style.button} icon={() => <Text>75</Text>} value="75" />
        <ToggleButton style={style.button} icon={() => <Text>175</Text>} value="175" />
        <ToggleButton style={style.button} icon={() => <Text>375</Text>} value="375" />
        <ToggleButton style={style.button} icon={() => <Text>575</Text>} value="575" />
        <ToggleButton style={style.button} icon={() => <Text>875</Text>} value="875" />
      </ToggleButton.Row>
    </>
  );
};

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
