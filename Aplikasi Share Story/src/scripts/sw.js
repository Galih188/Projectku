self.addEventListener("push", (event) => {
  console.log("Service worker pushing...");

  async function chainPromise() {
    await self.registration.showNotification("Ada laporan baru untuk Anda!", {
      body: "Ada yang mengupload story baru nih",
    });
  }

  event.waitUntil(chainPromise());
});
