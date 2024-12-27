"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { MarkerType } from "../lib/types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider} from "leaflet-geosearch";


interface SearchControlOptions {
  provider: OpenStreetMapProvider;
  style?: string;
  autoComplete?: boolean;
  autoCompleteDelay?: number;
  showMarker?: boolean;
  showPopup?: boolean;
  marker?: {
    icon: L.Icon;
  };
}

const WorldMap = ({ markers, handleDeleteMarker }: { markers: MarkerType[], handleDeleteMarker: (id: number) => void }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const circleLayerRef = useRef<L.LayerGroup | null>(null);
  const searchControlRef = useRef<L.Control | null>(null);

  // Color palette for circles
  const colors = useMemo(() => [
    "gray",
    "green",
  ], []);



  useEffect(() => {
    if (!window || !mapContainerRef.current) return;

    const map = L.map("map").setView([0, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    // Create layer groups for markers and circles
    markersLayerRef.current = L.layerGroup().addTo(map);
    circleLayerRef.current = L.layerGroup().addTo(map);

    // Initialize Geosearch
    const provider = new OpenStreetMapProvider();
    const markerIcon = L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
   /* eslint-disable @typescript-eslint/no-explicit-any */
    const searchControl = new (GeoSearchControl as any as { 
      new(options: SearchControlOptions): L.Control 
    })({
      provider: provider,
      style: 'bar',
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: true,
      showPopup: true,
      marker: {
        icon: markerIcon
      },
    });

     // Add search control to the map
    map.addControl(searchControl);
    searchControlRef.current = searchControl;
    
    markersLayerRef.current.clearLayers();
    circleLayerRef.current.clearLayers();

    markers.forEach((marker) => {
      const markerIcon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

      // Set marker coordinates
      const getOffset = ()=> (Math.random() - 0.02) * 0.2;
      marker.coordinates = [marker.lat + getOffset(), marker.long + getOffset()];

      // Create tooltip with city and country
      L.tooltip({
        permanent: true, 
        direction: 'auto', 
        opacity: 0.8, 
        offset: [-15, 0]
      })
        .setLatLng(marker.coordinates as [number, number])
        .setContent(`${marker.id} ${marker.message} ${marker.emoji}`)
        .addTo(map);

      // Add marker
    
      L.marker(marker.coordinates as [number, number], { 
        icon: markerIcon, 
        draggable: false, 
        riseOnHover: true 
      }).on('click', () => {
        // const confirm = window.confirm("Are you sure you want to delete this marker?");
        // if (!confirm) return;
        // handleDeleteMarker(marker.id);
      })
      .addTo(map);

      // Add expanding circle with dynamic radius based on marker count
      L.circle(marker.coordinates as [number, number], {
        color: colors[marker.happiness],
        fillColor: colors[marker.happiness],
        fillOpacity: 0.3,
        radius: marker.id * 5000, // Radius increases with duplicate markers
      }).addTo(circleLayerRef.current!);
    });


    // Clean up the map when the component unmounts
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [markers, colors, handleDeleteMarker]);

  // Render only on the client
  if (!window) {
    return null;
  }

  if(!markers){
    return null
  }

  // RETURN
  return (
    <>
      {window && markers && (
        <div className="w-3/4 h-96">
          <div
            ref={mapContainerRef}
            id="map"
            className="w-full h-full rounded-lg"
          ></div>
        </div>
      )}
    </>
  );
};

export default WorldMap;
