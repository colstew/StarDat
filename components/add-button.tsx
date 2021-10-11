import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
  addTree: () => void
}

const AddButton = ({ addTree }: Props) : JSX.Element => (
  <Button
    style={style.button}
    contentStyle={style.buttonCont}
    mode="outlined"
    icon="plus-circle"
    onPress={addTree}
  >
    Add
  </Button>
);

const style = StyleSheet.create({
  button: {
    width: '52%',
    maxWidth: 310,
    alignSelf: 'center',
  },
  buttonCont: {
    height: 46,
  },
});

export default AddButton;
