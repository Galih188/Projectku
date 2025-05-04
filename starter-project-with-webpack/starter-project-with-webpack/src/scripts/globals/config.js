const CONFIG = {
  BASE_URL: "https://story-api.dicoding.dev/v1",
  BASE_IMAGE_URL: "https://story-api.dicoding.dev/images/stories",
  DEFAULT_LANGUAGE: "id-id",
  CACHE_NAME: "DicodingStory-V1",
  DATABASE_NAME: "dicoding-story-database",
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: "stories",
  WEB_SOCKET_SERVER: "wss://stories-api.dicoding.dev",

  // Map Configuration
  MAP: {
    DEFAULT: {
      CENTER: [-2.548926, 118.0148634], // Indonesia center
      ZOOM: 5,
    },
    TILE_LAYERS: {
      OPEN_STREET_MAP: {
        URL: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        ATTRIBUTION:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
      CARTO_DB: {
        URL: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        ATTRIBUTION:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
      STAMEN_TERRAIN: {
        URL: "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",
        ATTRIBUTION:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
      ESRI_WORLD_IMAGERY: {
        URL: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ATTRIBUTION:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      },
    },
  },

  // Auth Configuration
  AUTH_KEY: "dicoding_story_user",

  // Web Push Notification
  PUSH_MSG_VAPID_PUBLIC_KEY:
    "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk",
  PUSH_MSG_SUBSCRIBE_URL:
    "https://story-api.dicoding.dev/v1/notifications/subscribe",
  PUSH_MSG_UNSUBSCRIBE_URL:
    "https://story-api.dicoding.dev/v1/notifications/subscribe",
};

export default CONFIG;
