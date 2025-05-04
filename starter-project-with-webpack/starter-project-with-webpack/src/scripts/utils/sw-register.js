const swRegister = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js");
      console.log("Service worker registered:", registration);

      return registration;
    } catch (error) {
      console.error("Service worker registration failed:", error);
    }
  }
};

export default swRegister;
