"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./YandexMap.module.css";
import darkStyle from "../../../customization.json";

const MAP_CENTER_V2 = [55.749, 37.534]; // [lat, lng] для API 2.1
const MAP_CENTER_V3 = [37.534, 55.749]; // [lng, lat] для API 3.0
const MAP_ZOOM = 13;
const API_KEY = "7ba124fd-0581-4e1e-8cbd-2eefa636a90f";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps3?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps?: any;
  }
}

// Try loading API 3.0 first, fallback to 2.1
async function loadApi(): Promise<"v3" | "v2"> {
  // Try v3
  if (!window.ymaps3) {
    try {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/v3/?apikey=${API_KEY}&lang=ru_RU`;
        script.async = true;
        script.onload = () => {
          // Verify ymaps3 actually loaded
          if (window.ymaps3) {
            resolve();
          } else {
            reject(new Error("ymaps3 not available after script load"));
          }
        };
        script.onerror = () => reject();
        document.head.appendChild(script);
      });
      return "v3";
    } catch {
      // v3 unavailable, falling back to 2.1
    }
  } else {
    return "v3";
  }

  // Fallback to v2
  if (!window.ymaps) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Yandex Maps"));
      document.head.appendChild(script);
    });
  }
  return "v2";
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
        const version = await loadApi();
        const el = containerRef.current;
        if (!el) return;

        if (version === "v3") {
          await initV3(el);
        } else {
          await initV2(el);
        }

        setMapLoaded(true);
      } catch (e) {
        console.warn("Yandex Maps failed to load:", e);
      }
    }

    async function initV3(el: HTMLDivElement) {
      await window.ymaps3.ready;
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls } = window.ymaps3;
      const { YMapZoomControl } = await window.ymaps3.import("@yandex/ymaps3-controls@0.0.1");

      const map = new YMap(el, {
        location: { center: MAP_CENTER_V3, zoom: MAP_ZOOM },
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
      map.addChild(new YMapMarker({ coordinates: MAP_CENTER_V3 }, markerEl));
    }

    async function initV2(el: HTMLDivElement) {
      await new Promise<void>((resolve) => {
        window.ymaps.ready(() => resolve());
      });

      const map = new window.ymaps.Map(el, {
        center: MAP_CENTER_V2,
        zoom: MAP_ZOOM,
        controls: [],
      }, { suppressMapOpenBlock: true });

      // Dark theme via CSS filter
      const groundPane = map.panes.get("ground")?.getElement();
      if (groundPane) {
        groundPane.style.filter = "invert(1) grayscale(1) brightness(0.5) contrast(1.2)";
      }

      map.behaviors.disable(["scrollZoom"]);
      el.addEventListener("click", () => map.behaviors.enable(["scrollZoom"]));
      el.addEventListener("mouseleave", () => map.behaviors.disable(["scrollZoom"]));

      const pinHtml = `
        <div style="position:relative;width:142px;height:142px;margin-left:-71px;margin-top:-71px;">
          <img src="/assets/images/map-pin.svg" width="142" height="142" style="display:block;opacity:0.8" />
          <span style="position:absolute;top:50%;left:50%;width:14px;height:14px;transform:translate(-50%,-50%);background:#d2b689;border-radius:50%"></span>
        </div>
      `;
      const CustomLayout = window.ymaps.templateLayoutFactory.createClass(pinHtml);
      const placemark = new window.ymaps.Placemark(MAP_CENTER_V2, {}, {
        iconLayout: CustomLayout,
        iconShape: { type: "Circle", coordinates: [0, 0], radius: 71 },
      });
      map.geoObjects.add(placemark);
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
