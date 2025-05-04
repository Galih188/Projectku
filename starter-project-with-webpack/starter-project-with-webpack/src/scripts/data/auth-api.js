import API_ENDPOINT from "../globals/api-endpoint";
import CONFIG from "../globals/config";

class AuthApi {
  static async register({ name, email, password }) {
    try {
      const response = await fetch(API_ENDPOINT.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        return { error: true, message: responseJson.message };
      }

      return { error: false, message: responseJson.message };
    } catch (error) {
      return {
        error: true,
        message: "Terjadi kesalahan. Silakan coba lagi nanti.",
      };
    }
  }

  static async login({ email, password }) {
    try {
      const response = await fetch(API_ENDPOINT.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        return { error: true, message: responseJson.message };
      }

      // Save user data to localStorage
      localStorage.setItem(
        CONFIG.AUTH_KEY,
        JSON.stringify(responseJson.loginResult)
      );

      return {
        error: false,
        message: responseJson.message,
        data: responseJson.loginResult,
      };
    } catch (error) {
      return {
        error: true,
        message: "Terjadi kesalahan. Silakan coba lagi nanti.",
      };
    }
  }

  static async logout() {
    localStorage.removeItem(CONFIG.AUTH_KEY);
    return { error: false, message: "Berhasil logout" };
  }

  static checkAuth() {
    const user = localStorage.getItem(CONFIG.AUTH_KEY);

    if (!user) {
      return { isLoggedIn: false, user: null };
    }

    return { isLoggedIn: true, user: JSON.parse(user) };
  }

  static getToken() {
    const { isLoggedIn, user } = this.checkAuth();

    if (!isLoggedIn) {
      return null;
    }

    return user.token;
  }
}

export default AuthApi;
