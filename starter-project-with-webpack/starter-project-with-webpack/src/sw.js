import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { clientsClaim } from "workbox-core";

// Mengklaim klien & menghindari waiting
self.skipWaiting();
clientsClaim();

// Precaching files manifest
precacheAndRoute(self.__WB_MANIFEST);

// Cache CSS, JS, dan Web Worker
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "worker",
  new StaleWhileRevalidate({
    cacheName: "assets-cache",
  })
);

// Cache images
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache API
registerRoute(
  ({ url }) => url.origin === "https://story-api.dicoding.dev",
  new NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60, // 1 hour
      }),
    ],
  })
);

// Cache map tiles
registerRoute(
  ({ url }) =>
    url.origin.includes("tile.openstreetmap.org") ||
    url.origin.includes("basemaps.cartocdn.com") ||
    url.origin.includes("stamen-tiles") ||
    url.origin.includes("server.arcgisonline.com"),
  new CacheFirst({
    cacheName: "maps-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

// Push notification
self.addEventListener("push", (event) => {
  console.log("Push event received:", event);

  let notificationData = {
    title: "Notifikasi Baru",
    options: {
      body: "Ini adalah notifikasi default.",
      icon: "./public/icons/icon-192x192.png",
      badge: "./public/icons/icon-72x72.png",
    },
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        title: data.title || notificationData.title,
        options: {
          ...notificationData.options,
          ...data.options,
        },
      };
    } catch (error) {
      console.error("Error parsing push data:", error);
    }
  }

  event.waitUntil(
    self.registration.showNotification(
      notificationData.title,
      notificationData.options
    )
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Jika sudah ada jendela aplikasi yang terbuka, fokuskan
      if (clientList.length > 0) {
        return clientList[0].focus();
      }

      // Jika tidak ada jendela yang terbuka, buka jendela baru
      return clients.openWindow("/");
    })
  );
});
