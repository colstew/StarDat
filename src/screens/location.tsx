import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Loc from 'expo-location';
import {
  Button,
  Dialog,
  Portal,
  Subheading,
  ActivityIndicator,
} from 'react-native-paper';
import { LocationObject } from 'expo-location';
import { toUTM } from '../utils/get-location';

interface Props {
  visible: boolean,
  close: () => void,
}

const Location = ({ visible, close } : Props) : JSX.Element => {
  const [location, setLocation] = React.useState<LocationObject>();
  const [removeSub, setRemoveSub] = React.useState<{remove(): void;}>();

  const utmString = (loc: LocationObject) => {
    const utm = toUTM(loc);
    return `${utm.zone} ${utm.easting}m E ${utm.northing}m N`;
  };

  useEffect(() => {
    (async () => {
      try {
        const enabled = await Loc.hasServicesEnabledAsync();
        const { granted } = await Loc.getForegroundPermissionsAsync();
        if (!granted) await Loc.requestForegroundPermissionsAsync();
        if (enabled && granted && visible) {
          const remSub = await Loc.watchPositionAsync({
            accuracy: Loc.Accuracy.Highest,
            timeInterval: 1000,
          }, setLocation);
          setRemoveSub(remSub);
        } else {
          removeSub?.remove();
        }
        // throw Error('Location Screen: location required');
      } catch (err) {
        console.error(err);
      }
    })();
    return removeSub?.remove;
  }, [visible]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={close}>
        <Dialog.Title>Current Location</Dialog.Title>
        <Dialog.Content>
          {location ? (
            <>
              <Subheading>
                <Text style={{ fontWeight: 'bold' }}>Latitude: </Text>
                <Text>{location.coords.latitude}</Text>
              </Subheading>
              <Subheading>
                <Text style={{ fontWeight: 'bold' }}>Longitude: </Text>
                <Text>{location.coords.longitude}</Text>
              </Subheading>
              <Subheading>
                <Text style={{ fontWeight: 'bold' }}>UTM: </Text>
                <Text>{utmString(location)}</Text>
              </Subheading>
              <Subheading>
                <Text style={{ fontWeight: 'bold' }}>Acuracy: </Text>
                <Text>{location.coords.accuracy ? `${Math.round(location.coords.accuracy)}m` : 'unavailable'}</Text>
              </Subheading>
            </>
          ) : (
            <View style={style.loading}>
              <ActivityIndicator animating />
            </View>
          )}
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

const style = StyleSheet.create({
  loading: {
    height: 120,
    justifyContent: 'center',
  },
});
export default Location;
