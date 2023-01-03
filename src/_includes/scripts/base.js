if (location.hostname !== "localhost" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

function installApp() {
  const installApp = document.getElementById("install-app");
  installApp.addEventListener("click", async () => {
    deferredPrompt.prompt();
  });
}
