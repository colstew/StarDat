import React from 'react';
//  import { StyleSheet } from 'react-native';
import {
  Button, Paragraph, Dialog, Portal,
} from 'react-native-paper';

interface Props {
  visible: boolean,
  close: () => void,
}
const Export = ({ visible, close } : Props) : JSX.Element => (
  <Portal>
    <Dialog visible={visible} onDismiss={close}>
      <Dialog.Title>Export</Dialog.Title>
      <Dialog.Content>
        <Paragraph>This is simple dialog</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={close}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

//  const style = StyleSheet.create({
//  });
export default Export;
