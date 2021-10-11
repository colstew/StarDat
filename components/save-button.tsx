import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
  onSave: () => void
}

const SaveButton = ({ onSave }: Props) : JSX.Element => (
  <Button
    style={style.button}
    contentStyle={style.buttonCont}
    mode="contained"
    onPress={onSave}
  >
    Save
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

export default SaveButton;
