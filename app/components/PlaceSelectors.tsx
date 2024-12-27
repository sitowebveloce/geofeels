"use client";

import React, { useCallback, useEffect, useState } from "react";
import SelectCountry from "./selects/SelectCountry";
import { CreateMarkerType, MarkerType } from "../lib/types";
import MessageForm from "./forms/MessageForm";
import Image from "next/image";
import {
  createNewMarkerServerAction,
  deleteMarkerServerAction,
  getAllMarkersServerAction,
} from "../_actions/MarkerActions";
import toast from "react-hot-toast";
import dynamic from 'next/dynamic'
// Avoid server side rendering on Map Component
const DynamicWorldMap = dynamic(() => import('./WorldMap'), { ssr: false })

const PlaceSelectors = () => {
  const [country, setCountry] = useState<string>("");
  const [countryId, setCountryId] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [cityCoordinates, setCityCoordinates] = useState<[number, number]>([
    0, 0,
  ]);
  const [message, setMessage] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [insertMarker, setInsertMarker] = useState<boolean>(false);
 
  // GET ALL MARKERS
  useEffect(() => {
    (async () => {
      {
        const fetchedMarkers = await getAllMarkersServerAction();
        console.log(fetchedMarkers);
        if(!fetchedMarkers.success){
          toast.error(fetchedMarkers.error)
          return;
        }
        const markersWithCoordinates = fetchedMarkers.markers.map((marker) => ({
          ...marker,
          coordinates: [marker.lat, marker.long],
        }));
        setMarkers(markersWithCoordinates);
      }
    })();
  }, []);

  // ADD NEW MARKER
  useEffect(() => {

      if(!insertMarker) return;

      let emoji = "😑";
      let happiness = 0;

      switch(true){
        case (score > 0):
          emoji = "😊";
          happiness = 1;
          break;
        case (score < 0):
          emoji = "😠";
          happiness = 0;
          break;
        default:
          emoji = "😑";
          happiness = 0;
      }

      const newMarkerObj = {
        city,
        country,
        coordinates: cityCoordinates,
        message,
        emoji,
        happiness,
      } as CreateMarkerType;

      (async () => {
        const newMarkers = await createNewMarkerServerAction(newMarkerObj);
        setMarkers(newMarkers.markers);
        toast.success('Message added successfully');
        // Reset the state
        setInsertMarker(false);
        setMessage("");
      })();

  }, [insertMarker]);

  // DELETE MARKER
  const handleDeleteMarker = useCallback(async (deleteId: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this marker?"
    );

    if (confirm) {
      const markers = await deleteMarkerServerAction(deleteId);
      // console.log(markers);
      setMarkers(markers.markers);
    }
  }, []);

  // RETURN
  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <div className="w-full max-w-72 flex gap-2 justify-around items-center">
        <Image
          className="w-8 h-8 rounded-full"
          src="/smile.png"
          alt="Extra large avatar"
          width={100}
          height={100}
        ></Image>
        <Image
          className="w-8 h-8 rounded-full"
          src="/sad.png"
          alt="Extra large avatar"
          width={100}
          height={100}
        ></Image>
      </div>

      <SelectCountry
        country={country}
        setCountry={setCountry}
        city={city}
        setCity={setCity}
        countryId={countryId}
        setCountryId={setCountryId}
        cityCoordinates={cityCoordinates}
        setCityCoordinates={setCityCoordinates}
      />

      <MessageForm
        message={message}
        setMessage={setMessage}
        cityCoordinates={cityCoordinates}
        setScore={setScore}
        setInsertMarker={setInsertMarker}
      />

      <DynamicWorldMap  markers={markers} handleDeleteMarker={handleDeleteMarker} />
    </div>
  );
};

export default PlaceSelectors;
