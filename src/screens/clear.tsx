import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  Subheading,
} from 'react-native-paper';
import { useAppDispatch } from '../redux/hooks';
import { clearAll } from '../redux/reducers';

interface Props {
  visible: boolean,
  close: () => void,
}
const Clear = ({ visible, close } : Props) : JSX.Element => {
  const dispatch = useAppDispatch();
  const clear = () => {
    dispatch(clearAll());
    close();
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={close}>
        <Dialog.Title>Clear Data</Dialog.Title>
        <Dialog.Content>
          <Subheading>
            Are you sure you want to clear all current sweeps and volume plots?
          </Subheading>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={clear}>
            Yes
          </Button>
          <Button onPress={close}>
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Clear;
