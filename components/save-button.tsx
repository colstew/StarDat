import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const SaveButton = () : JSX.Element => (
  <Button
    style={style.button}
    contentStyle={style.buttonCont}
    mode="contained"
    // onPress={}
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
