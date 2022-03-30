import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import * as UTM from 'utm';
import { UTMLocation } from './data-types';

export const toUTM = (location: LocationObject): UTMLocation => {
  const utm = UTM.fromLatLon(
    location.coords.latitude,
    location.coords.longitude,
  );
  const zone = utm.zoneNum + utm.zoneLetter;
  const easting = Math.round(utm.easting * 100) / 100;
  const northing = Math.round(utm.northing * 100) / 100;
  return { zone, easting, northing };
};

const getLocation = async (): Promise<UTMLocation> => {
  const enabled = await Location.hasServicesEnabledAsync();
  const { granted } = await Location.getForegroundPermissionsAsync();
  if (enabled && granted) {
    const location = await Location.getCurrentPositionAsync(
      { accuracy: Location.Accuracy.Highest },
    );
    return toUTM(location);
  }
  throw Error('location required');
};

export default getLocation;
