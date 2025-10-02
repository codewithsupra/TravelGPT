"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
//@ts-ignore
import "mapbox-gl/dist/mapbox-gl.css";
import { useTripDetails } from "@/app/provider";

export type GeoCoordinates = { latitude: number; longitude: number };

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates?: GeoCoordinates;
  place_address?: string;
  ticket_pricing?: string;
  time_travel_each_location?: string;
  best_time_to_visit?: string;
};

export type Itinerary = {
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[];
};

function GlobalMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { tripDetailInfo } = useTripDetails();
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = String(process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "");

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 20], // neutral start
      zoom: 1.6,
      projection: "globe",
    });

    mapRef.current = map;

    // Add controls (optional)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // When map is ready, add markers if we already have tripDetailInfo
    map.on("load", () => {
      if (tripDetailInfo) {
        addMarkersToMap(map, tripDetailInfo.itinerary);
      }
    });

    // If tripDetailInfo arrives after map load, watch and add markers
    // (we'll rely on the effect below to handle updates)

    return () => {
      // cleanup
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // If tripDetailInfo changes (arrives later), add markers / update bounds
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !tripDetailInfo) return;

    // If map already loaded, add markers
    if (map.loaded()) {
      addMarkersToMap(map, tripDetailInfo.itinerary);
    } else {
      map.on("load", () => addMarkersToMap(map, tripDetailInfo.itinerary));
    }
  }, [tripDetailInfo]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "85vh",
        borderRadius: 20,
      }}
    />
  );
}

function addMarkersToMap(map: mapboxgl.Map, itinerary: Itinerary[]) {
  // remove any existing markers/popups from previous runs if needed
  // (you can store references in map's custom property if desired)
  const coords: [number, number][] = [];

  // iterate through all days & activities
  itinerary.forEach((day) => {
    day.activities.forEach((act) => {
      const lat = act.geo_coordinates?.latitude;
      const lng = act.geo_coordinates?.longitude;
      if (typeof lat === "number" && typeof lng === "number") {
        coords.push([lng, lat]);

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          act.place_name ?? "Activity"
        );

        const marker = new mapboxgl.Marker({ color: "red" })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);

        // optional: you can store marker on the map object for later cleanup:
        // (map as any)._markers = (map as any)._markers ?? []; (map as any)._markers.push(marker);
      }
    });
  });

  // Fit map to bounds if we have coords
  if (coords.length > 0) {
    const bounds = coords.reduce(function (b, c) {
      return b.extend(c as [number, number]);
    }, new mapboxgl.LngLatBounds(coords[0] as [number, number], coords[0] as [number, number]));
    map.fitBounds(bounds, { padding: 60, maxZoom: 12, duration: 1000 });
  }
}

export default GlobalMap;
