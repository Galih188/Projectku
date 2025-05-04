import CONFIG from "../globals/config";
import StoryApi from "../data/story-api";

const NotificationHelper = {
  async requestPermission() {
    if (!("Notification" in window)) {
      console.log("Browser tidak mendukung notifikasi");
      return;
    }

    const result = await Notification.requestPermission();

    if (result === "denied") {
      console.log("Notifikasi tidak diizinkan");
      return;
    }

    if (result === "default") {
      console.log("Pengguna menutup kotak dialog izin notifikasi");
      return;
    }

    console.log("Notifikasi diizinkan");

    if ("PushManager" in window) {
      this._subscribePushNotification();
    }
  },

  async _subscribePushNotification() {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;

      let subscription =
        await serviceWorkerRegistration.pushManager.getSubscription();

      if (subscription === null) {
        subscription = await serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this._urlBase64ToUint8Array(
            CONFIG.PUSH_MSG_VAPID_PUBLIC_KEY
          ),
        });

        // Send subscription to server
        await this._sendSubscriptionToServer(subscription);
      }
    } catch (error) {
      console.error("Failed to subscribe push notification:", error);
    }
  },

  async _sendSubscriptionToServer(subscription) {
    const subscriptionData = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: btoa(
          String.fromCharCode.apply(
            null,
            new Uint8Array(subscription.getKey("p256dh"))
          )
        ),
        auth: btoa(
          String.fromCharCode.apply(
            null,
            new Uint8Array(subscription.getKey("auth"))
          )
        ),
      },
    };

    await StoryApi.subscribeNotification(subscriptionData);
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  },

  showNotification({ title, options }) {
    if (!("Notification" in window)) {
      console.log("Browser tidak mendukung notifikasi");
      return;
    }

    if (Notification.permission !== "granted") {
      console.log("Izin notifikasi belum diberikan");
      return;
    }

    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, options);
    });
  },
};

export default NotificationHelper;
