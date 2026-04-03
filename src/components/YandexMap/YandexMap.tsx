"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./YandexMap.module.css";

const MAP_CENTER = [55.749, 37.534]; // Москва, 1-й Красногвардейский проезд 22с1
const MAP_ZOOM = 13;
const API_KEY = "7ba124fd-0581-4e1e-8cbd-2eefa636a90f";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps?: any;
  }
}

function loadYmapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.ymaps) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Yandex Maps"));
    document.head.appendChild(script);
  });
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
        await loadYmapsScript();
        await new Promise<void>((resolve) => {
          window.ymaps.ready(() => resolve());
        });

        const el = containerRef.current;
        if (!el) return;

        const map = new window.ymaps.Map(el, {
          center: MAP_CENTER,
          zoom: MAP_ZOOM,
          controls: [],
        }, {
          suppressMapOpenBlock: true,
        });

        // Disable scroll zoom by default — enable on click so page scroll isn't hijacked
        map.behaviors.disable(["scrollZoom"]);
        el.addEventListener("click", () => {
          map.behaviors.enable(["scrollZoom"]);
        });
        el.addEventListener("mouseleave", () => {
          map.behaviors.disable(["scrollZoom"]);
        });

        // Dark style — apply filter to all panes including places (hides POI dots)
        const darkFilter = "brightness(0.2) contrast(1.1) saturate(0)";
        const paneNames = ["ground", "groundBackdrop", "places"];
        for (const name of paneNames) {
          try { map.panes.get(name)?.getElement()?.style && (map.panes.get(name).getElement().style.filter = darkFilter); } catch { /* */ }
        }

        // Don't use Placemark — it gets filtered with places pane
        // Instead, show the fallback pin (HTML overlay) positioned via CSS
        setMapLoaded(true);
      } catch {
        console.warn("Yandex Maps failed to load, showing static fallback");
      }
    }

    init();
  }, []);

  return (
    <div className={styles.map} ref={containerRef}>
      {/* Fallback static image — hidden when live map loads */}
      {!mapLoaded && (
        <img
          src="/assets/images/map.jpg"
          alt="Карта"
          className={styles.fallbackImage}
        />
      )}
      {/* HTML pin overlay — always visible, centered on map */}
      <div className={styles.pinOverlay}>
        <img src="/assets/images/map-pin.svg" alt="" width={142} height={142} />
        <span className={styles.pinDot} />
      </div>
    </div>
  );
}
