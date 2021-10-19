import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import * as UTM from 'utm';
import UTMLocation from './utm-location';

export const toUTM = (location: LocationObject): UTMLocation => {
  // if (location === undefined) return null;
  const utm = UTM.fromLatLon(
    location.coords.latitude,
    location.coords.longitude,
  );
  return { zone: utm.zoneNum + utm.zoneLetter, easting: utm.easting, northing: utm.northing };
};

const getLocation = async (): Promise<UTMLocation> => {
  const enabled = await Location.hasServicesEnabledAsync();
  const { granted } = await Location.getForegroundPermissionsAsync();
  if (enabled && granted) {
    const location = await Location.getCurrentPositionAsync(
      { accuracy: Location.Accuracy.Highest },
    );
    const loc = toUTM(location);
    // const loc = { lat: location.coords.latitude, lng: location.coords.longitude, utm };
    return loc;
  }
  throw Error('location required');
};

export default getLocation;
