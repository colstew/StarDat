import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ToggleButton,
  Text,
} from 'react-native-paper';
import { useAppSelector } from '../redux/hooks';
import { TreeNames } from '../utils/data-types';

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
}: Props) : React.ReactElement => {
  const speciesNames: TreeNames = useAppSelector((state) => state.settings.speciesNames);
  const speciesNamesShort = Object.keys(speciesNames);
  const speciesNumbers = useAppSelector((state) => state.settings.speciesNumbers);
  return (
    <>
      <ToggleButton.Row
        style={style.row}
        onValueChange={(key) => (key === null ? setSpecies('') : setSpecies(key))}
        value={species}
      >
        {speciesNamesShort.map((key) => (
          <ToggleButton
            key={key}
            style={style.button}
            icon={() => <Text>{key}</Text>}
            value={key}
          />
        ))}
      </ToggleButton.Row>

      <ToggleButton.Row
        style={style.row}
        onValueChange={(val) => (val === null ? setValue('') : setValue(val))}
        value={value}
      >
        {speciesNumbers.map((val) => (
          <ToggleButton
            key={val}
            style={style.button}
            icon={() => <Text>{val}</Text>}
            value={val}
          />
        ))}
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
