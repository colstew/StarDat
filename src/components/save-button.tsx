import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
  onSave: () => void,
  enabled: boolean,
  hidden : boolean,
}

const SaveButton = ({ onSave, enabled, hidden }: Props) : JSX.Element => (
  hidden ? <></> : (
    <Button
      style={style.button}
      contentStyle={style.buttonCont}
      mode="contained"
      onPress={onSave}
      disabled={!enabled}
    >
      Save
    </Button>
  )
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
