// sameple API call to get coordinates: "https://api.mapbox.com/geocoding/v5/mapbox.places/J P NAGAR.json"
export type Area = {
  area_id: number;
  name: string;
  pin_code: number;
  coordinates: [number, number];
};

const areasNames: Area[] = [
  {
    area_id: 280,
    name: "indiranagar",
    pin_code: 560078,
    coordinates: [77.639757, 12.974614],
  },
  {
    area_id: 272,
    name: "BENSON TOWN SO",
    pin_code: 560046,
    coordinates: [77.6044, 12.9985],
  },
  {
    area_id: 259,
    name: "HSR Layout",
    pin_code: 560102,
    coordinates: [77.64, 12.91],
  },
  {
    area_id: 291,
    name: "FRAZER TOWN",
    pin_code: 560005,
    coordinates: [77.614162, 12.996865],
  },
  {
    area_id: 261,
    name: "Koramangala po",
    pin_code: 560034,
    coordinates: [77.6229, 12.9259],
  },
  {
    area_id: 239,
    name: "ELECTRONIC CITY PO",
    pin_code: 560100,
    coordinates: [77.6727, 12.8458],
  },
  {
    area_id: 302,
    name: "J P Nagar PO",
    pin_code: 560078,
    coordinates: [77.576778, 12.890542],
  },
];
export default areasNames;
