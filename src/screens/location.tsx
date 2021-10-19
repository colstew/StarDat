import React, { useEffect } from 'react';
import * as Loc from 'expo-location';
import {
  Button,
  Dialog,
  Portal,
  Subheading,
} from 'react-native-paper';
import { LocationObject } from 'expo-location';
import { toUTM } from '../utils/get-location';

interface Props {
  visible: boolean,
  close: () => void,
}

const round = (numb?: number | null) => {
  if (!numb) {
    return null;
  }
  return Math.round(numb);
};

const Location = ({ visible, close } : Props) : JSX.Element => {
  const [location, setLocation] = React.useState<LocationObject>();

  useEffect(() => {
    (async () => {
      await Loc.watchPositionAsync({
        accuracy: Loc.Accuracy.Highest,
        timeInterval: 1000,
      }, setLocation);
    })();
  }, []);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={close}>
        <Dialog.Title>Current Location</Dialog.Title>
        <Dialog.Content>
          <Subheading>{`Latitude: ${location?.coords.latitude}`}</Subheading>
          <Subheading>{`Longitude: ${location?.coords.longitude}`}</Subheading>
          <Subheading>{`UTM: ${location ? toUTM(location).toString() : ''}`}</Subheading>
          <Subheading>{`Acuracy (m): ${round(location?.coords.accuracy)}`}</Subheading>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={close}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Location;
