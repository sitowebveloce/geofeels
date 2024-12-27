"use client";
import { SelectCountryProps } from "@/app/lib/types";
import { City, Country, ICity, ICountry } from "country-state-city";
import { useState } from "react";

const SelectCountry = ({
  country,
  setCountry,
  city,
  setCity,
  countryId,
  setCountryId,
  setCityCoordinates,
}: SelectCountryProps) => {
  const [countryIdSelected, setCountryIdSelected] = useState<string>("");
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // GET OPTION ID
    const id = e.target.options[e.target.selectedIndex].id
    setCountryIdSelected(id);
    setCountryId(id);
    setCountry(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.options[e.target.selectedIndex].value
      .split("-")[0]
      .trim();
    setCity(cityName);
    const lat = City.getAllCities()
      .filter((c: ICity) => c.countryCode === countryIdSelected)
      .find((c: ICity) => c.name === cityName)?.latitude;
    const long = City.getAllCities()
      .filter((c: ICity) => c.countryCode === countryIdSelected)
      .find((c: ICity) => c.name === cityName)?.longitude;

      if (!lat || !long) return;
      // console.log('lat: ' + lat, 'long: ' + long, 'city: ' + cityName);
    setCityCoordinates([Number(lat), +long]);
  };

  // RETURN
  return (
    <section className="flex flex-col gap-2 w-full max-w-md">
      {/* COUNTRY SELECT HERE  */}
      <div className="text-center flex flex-col justify-center items-center w-full mb-1">
        <label
          htmlFor="country"
          className="float-left flex mb-2 text-sm font-medium text-gray-600 w-full"
        >
          Select a country
        </label>
        <select
          name="country"
          id="country"
          value={country}
          onChange={handleCountryChange}
          className="cursor-pointer h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
        >
          {Country.getAllCountries().map((country: ICountry) => (
            <option
              key={country.name}
              id={country.isoCode}
            >{`${country.name} - ${country.isoCode}`}</option>
          ))}
        </select>
      </div>
      {/* CITY SELECT HERE  */}
      <div className="text-center flex flex-col justify-center items-center w-full">
        <label
          htmlFor="country"
          className="flex float-left mb-2 text-sm font-medium text-gray-600 w-full self-start"
        >
          Select city
        </label>
        <select
          value={city + " - " + countryId}
          onChange={handleCityChange}
          disabled={!countryId}
          name="country"
          id="country"
          className="cursor-pointer disabled:cursor-not-allowed h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
        >
          {City.getAllCities()
            .filter((city: ICity) => city.countryCode === countryId)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((city: ICity, i: number) => (
              <option key={i}>{`${city.name} - ${city.countryCode}`}</option>
            ))}
        </select>
      </div>
      <div className="flex justify-center my-1"></div>
    </section>
  );
};

export default SelectCountry;
