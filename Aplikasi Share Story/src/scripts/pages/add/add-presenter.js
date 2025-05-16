class AddStoryPresenter {
  #model;
  #view;
  #photoData;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
    this.#photoData = null;
  }

  async init() {
    try {
      // Initialize view
      this.#view.init({
        onPhotoCapture: (photoData) => this.setPhotoData(photoData),
        onSubmit: (data) => this.submitStory(data),
      });

      // Initialize camera through view
      await this.#view.initCamera();

      // Initialize map through view
      this.#view.initMap();
    } catch (error) {
      console.error("Error initializing add story page:", error);
      this.#view.showErrorMessage(
        "Gagal menginisialisasi halaman. Silakan coba lagi."
      );
    }
  }

  setPhotoData(photoData) {
    this.#photoData = photoData;
  }

  getPhotoData() {
    return this.#photoData;
  }

  async submitStory({ description, lat, lon, fileData }) {
    try {
      this.#view.showLoading();

      // Use photo from capture or file input
      let photoData = this.#photoData || fileData;

      if (!photoData) {
        throw new Error("Silakan ambil foto atau pilih file terlebih dahulu");
      }

      // Convert data URL to File object
      const photoBlob = await fetch(photoData).then((res) => res.blob());
      const photoFile = new File([photoBlob], "photo.jpg", {
        type: "image/jpeg",
      });

      // Submit story through model
      const result = await this.#model.postStory({
        description,
        photo: photoFile,
        lat: lat,
        lon: lon,
      });

      // Menampilkan pesan sukses
      this.#view.showSuccessMessage(result.message);

      // Jika story berhasil dibuat, server otomatis akan mengirim notifikasi
      // ke semua subscriber jika user telah melakukan subscribe push notification

      // Cleanup resources before redirect
      this.cleanup();

      // Redirect to home page after short delay to allow notification processing
      setTimeout(() => {
        window.location.hash = "/";
      }, 500);
    } catch (error) {
      this.#view.showErrorMessage(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }

  // Method to clean up resources
  cleanup() {
    this.#view.cleanupResources();
  }
}

export default AddStoryPresenter;
