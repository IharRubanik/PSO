"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./YandexMap.module.css";
import darkStyle from "../../../customization.json";

const DEFAULT_CENTER = [37.534, 55.749];
const DEFAULT_ZOOM = 13;
const DEFAULT_API_KEY = "7ba124fd-0581-4e1e-8cbd-2eefa636a90f";

declare global {
  interface Window {
    ymaps3?: Record<string, unknown> & {
      ready: Promise<void>;
      import: (module: string) => Promise<Record<string, unknown>>;
    };
  }
}

let apiLoadPromise: Promise<void> | null = null;

function loadApi(apiKey: string): Promise<void> {
  if (apiLoadPromise) return apiLoadPromise;

  apiLoadPromise = (async () => {
    if (window.ymaps3) return;

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
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

export interface YandexMapProps {
  apiKey?: string | null;
  center?: { lng?: number | null; lat?: number | null } | null;
}

export function YandexMap({ apiKey, center }: YandexMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapCenter = [
    center?.lng ?? DEFAULT_CENTER[0],
    center?.lat ?? DEFAULT_CENTER[1],
  ];
  const resolvedApiKey = apiKey || DEFAULT_API_KEY;

  useEffect(() => {
    if (mapInitialized.current) return;
    mapInitialized.current = true;

    async function init() {
      try {
        await loadApi(resolvedApiKey);
        const el = containerRef.current;
        if (!el) return;

        await initMap(el);
        setMapLoaded(true);
      } catch (e) {
        console.warn("Yandex Maps failed to load:", e);
      }
    }

    async function initMap(el: HTMLDivElement) {
      const ymaps = window.ymaps3;
      if (!ymaps) return;
      await ymaps.ready;
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls } = ymaps as Record<string, new (...args: unknown[]) => { addChild: (child: unknown) => unknown }>;
      const { YMapZoomControl } = await ymaps.import("@yandex/ymaps3-controls@0.0.1") as Record<string, new (...args: unknown[]) => unknown>;

      const map = new YMap(el, {
        location: { center: mapCenter, zoom: DEFAULT_ZOOM },
        behaviors: ["drag", "pinchZoom", "dblClick"],
      });

      map.addChild(new YMapDefaultSchemeLayer({ customization: darkStyle }));
      map.addChild(new YMapDefaultFeaturesLayer());

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
      map.addChild(new YMapMarker({ coordinates: mapCenter }, markerEl));
    }

    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
