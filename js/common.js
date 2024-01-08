if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/js/service-worker.js")
    .then(function (registration) {
      console.log("Service Worker Registered", registration);
    })
    .catch(function (error) {
      console.log("Service Worker Registration failed", error);
    });
}
