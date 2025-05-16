// Service Worker untuk menangani push notification
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  return self.clients.claim();
});

self.addEventListener("push", (event) => {
  console.log("Service Worker: Push event received", event);

  const showNotification = async () => {
    try {
      let notificationData;

      if (event.data) {
        notificationData = await event.data.json();
        console.log("Push notification data:", notificationData);
      } else {
        // Fallback jika data tidak diterima
        notificationData = {
          title: "Pemberitahuan Story",
          options: {
            body: "Ada pembaruan story baru",
            icon: "/icons/icon-192x192.png",
            badge: "/icons/badge-72x72.png",
            tag: "story-notification",
          },
        };
      }

      // Tampilkan notifikasi
      await self.registration.showNotification(
        notificationData.title,
        notificationData.options
      );
    } catch (error) {
      console.error("Error showing notification:", error);

      // Fallback notification jika parsing JSON gagal
      await self.registration.showNotification("Pemberitahuan Story", {
        body: "Ada pembaruan dari aplikasi Story",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/badge-72x72.png",
        tag: "story-notification",
      });
    }
  };

  event.waitUntil(showNotification());
});

// Handler untuk klik notifikasi
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification clicked", event);

  event.notification.close();

  // Buka aplikasi dan navigasikan ke halaman beranda
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Jika ada tab yang sudah terbuka, fokuskan
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.navigate("/");
          return client.focus();
        }
      }

      // Jika tidak ada tab yang terbuka, buka tab baru
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});
