import * as Location from 'expo-location';
import { Loc } from './contexts/state-context';

const getLocation = async (): Promise<Loc> => {
  const enabled = await Location.hasServicesEnabledAsync();
  const { granted } = await Location.getForegroundPermissionsAsync();
  if (enabled && granted) {
    const location = await Location.getCurrentPositionAsync(
      { accuracy: Location.Accuracy.Highest },
    );
    const loc = { lat: location.coords.latitude, lng: location.coords.longitude };
    return loc;
  }
  return { lat: null, lng: null };
};

export default getLocation;
