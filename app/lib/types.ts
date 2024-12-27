
export interface SelectCountryProps {
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  countryId: string;
  setCountryId: React.Dispatch<React.SetStateAction<string>>;
  cityCoordinates: number[];
  setCityCoordinates: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export type MarkerType = {
  id:number;
  city: string;
  country: string;
  lat: number;
  long: number;
  coordinates: [number, number];
  message: string;
  emoji: string;
  happiness: number;
};

export type CreateMarkerType = {
  city: string;
  country: string;
  lat: number;
  long: number;
  coordinates: [number, number];
  message: string;
  emoji: string;
  happiness: number;
};
