export default class UTMLocation {
  constructor(zone: string, easting: number, northing: number) {
    this.zone = zone;
    this.easting = easting;
    this.northing = northing;
  }

  readonly zone: string;

  readonly easting: number;

  readonly northing: number;

  toString(): string {
    return `${this.zone} ${this.easting}m E ${this.northing}m N`;
  }
}
