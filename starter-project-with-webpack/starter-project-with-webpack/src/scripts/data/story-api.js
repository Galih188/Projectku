import API_ENDPOINT from "../globals/api-endpoint";
import AuthApi from "./auth-api";

class StoryApi {
  static async getAllStories(page = 1, size = 10, includeLocation = 0) {
    try {
      const token = AuthApi.getToken();

      if (!token) {
        return { error: true, message: "Anda belum login" };
      }

      const response = await fetch(
        API_ENDPOINT.GET_ALL_STORIES(page, size, includeLocation),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseJson = await response.json();

      if (responseJson.error) {
        return { error: true, message: responseJson.message };
      }

      return {
        error: false,
        message: "Stories fetched successfully",
        data: responseJson.listStory,
      };
    } catch (error) {
      return {
        error: true,
        message: "Terjadi kesalahan. Silakan coba lagi nanti.",
      };
    }
  }

  static async getStoryDetail(id) {
    try {
      const token = AuthApi.getToken();

      if (!token) {
        return { error: true, message: "Anda belum login" };
      }

      const response = await fetch(API_ENDPOINT.GET_STORY_DETAIL(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        return { error: true, message: responseJson.message };
      }

      return {
        error: false,
        message: "Story fetched successfully",
        data: responseJson.story,
      };
    } catch (error) {
      return {
        error: true,
        message: "Terjadi kesalahan. Silakan coba lagi nanti.",
      };
    }
  }

  static async addStory({ description, photo, lat = null, lon = null }) {
    try {
      const token = AuthApi.getToken();

      // Create FormData object
      const formData = new FormData();
      formData.append("description", description);
      formData.append("photo", photo);

      if (lat !== null && lon !== null) {
        formData.append("lat", lat);
        formData.append("lon", lon);
      }

      const url = token ? API_ENDPOINT.ADD_STORY : API_ENDPOINT.ADD_STORY_GUEST;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        return { error: true, message: responseJson.message };
      }

      return { error: false, message: "Story added successfully" };
    } catch (error) {
      return {
        error: true,
        message: "Terjadi kesalahan. Silakan coba lagi nanti.",
      };
    }
  }

  static async subscribeNotification(subscriptionData) {
    try {
      const token = AuthApi.getToken();

      if (!token) {
        return { error: true, message: "Anda belum login" };
      }

      const response = await fetch(API_ENDPOINT.SUBSCRIBE_NOTIFICATION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subscriptionData),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        return { error: true, message: responseJson.message };
      }

      return {
        error: false,
        message: "Successfully subscribed to notifications",
        data: responseJson.data,
      };
    } catch (error) {
      return {
        error: true,
        message: "Terjadi kesalahan. Silakan coba lagi nanti.",
      };
    }
  }

  static async unsubscribeNotification(endpoint) {
    try {
      const token = AuthApi.getToken();

      if (!token) {
        return { error: true, message: "Anda belum login" };
      }

      const response = await fetch(API_ENDPOINT.UNSUBSCRIBE_NOTIFICATION, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ endpoint }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        return { error: true, message: responseJson.message };
      }

      return {
        error: false,
        message: "Successfully unsubscribed from notifications",
      };
    } catch (error) {
      return {
        error: true,
        message: "Terjadi kesalahan. Silakan coba lagi nanti.",
      };
    }
  }
}

export default StoryApi;
