"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./YandexMap.module.css";
import darkStyle from "../../../customization.json";

const MAP_CENTER = [37.534, 55.749]; // [lng, lat]
const MAP_ZOOM = 13;
const API_KEY = "7ba124fd-0581-4e1e-8cbd-2eefa636a90f";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps3?: any;
  }
}

let apiLoadPromise: Promise<void> | null = null;

function loadApi(): Promise<void> {
  if (apiLoadPromise) return apiLoadPromise;

  apiLoadPromise = (async () => {
    if (window.ymaps3) return;

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/v3/?apikey=${API_KEY}&lang=ru_RU`;
      script.async = true;
      script.onload = () => {
        let attempts = 0;
        const check = () => {
          if (window.ymaps3) {
            resolve();
          } else if (attempts < 30) {
            attempts++;
            setTimeout(check, 100);
          } else {
            reject(new Error("ymaps3 not available after script load"));
          }
        };
        check();
      };
      script.onerror = () => reject(new Error("Failed to load Yandex Maps v3"));
      document.head.appendChild(script);
    });
  })();

  return apiLoadPromise;
}

export function YandexMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapInitialized.current) return;
    mapInitialized.current = true;

    async function init() {
      try {
        await loadApi();
        const el = containerRef.current;
        if (!el) return;

        await initMap(el);
        setMapLoaded(true);
      } catch (e) {
        console.warn("Yandex Maps failed to load:", e);
      }
    }

    async function initMap(el: HTMLDivElement) {
      await window.ymaps3.ready;
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls } = window.ymaps3;
      const { YMapZoomControl } = await window.ymaps3.import("@yandex/ymaps3-controls@0.0.1");

      const map = new YMap(el, {
        location: { center: MAP_CENTER, zoom: MAP_ZOOM },
        behaviors: ["drag", "pinchZoom", "dblClick"],
      });

      map.addChild(new YMapDefaultSchemeLayer({ customization: darkStyle }));
      map.addChild(new YMapDefaultFeaturesLayer());

      // Zoom controls
      map.addChild(
        new YMapControls({ position: "right" }).addChild(new YMapZoomControl())
      );

      const markerEl = document.createElement("div");
      markerEl.innerHTML = `
        <div style="position:relative;width:142px;height:142px;transform:translate(-50%,-50%)">
          <img src="/assets/images/map-pin.svg" width="142" height="142" style="display:block;opacity:0.8" />
          <span style="position:absolute;top:50%;left:50%;width:14px;height:14px;transform:translate(-50%,-50%);background:#d2b689;border-radius:50%"></span>
        </div>
      `;
      map.addChild(new YMapMarker({ coordinates: MAP_CENTER }, markerEl));
    }

    init();
  }, []);

  return (
    <div className={styles.map} ref={containerRef}>
      {!mapLoaded && (
        <>
          <img
            src="/assets/images/map.jpg"
            alt="Карта"
            className={styles.fallbackImage}
          />
          <div className={styles.pinOverlay}>
            <img src="/assets/images/map-pin.svg" alt="" width={142} height={142} />
            <span className={styles.pinDot} />
          </div>
        </>
      )}
    </div>
  );
}
