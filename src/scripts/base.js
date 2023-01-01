if (location.hostname !== "localhost" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

function navbar() {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
}

function initMusicSheetToggleStorage() {
  const curr = localStorage.getItem("showMusicSheet");
  if (!curr) {
    localStorage.setItem("showMusicSheet", "true");
  }
}

function addMusicSheetToggleListener() {
  const $switch = document.getElementById("showMusicSheet");
  $switch.checked =
    localStorage.getItem("showMusicSheet") === "true" ? true : false;
  $switch.addEventListener("change", () => {
    localStorage.setItem("showMusicSheet", $switch.checked);
    updateMusicSheetState();
  });
}

function updateMusicSheetState() {
  const $el = document.getElementById("music-sheet");
  if ($el) {
    if (localStorage.getItem("showMusicSheet") === "false") {
      $el.style.display = "none";
    } else {
      $el.style.display = "block";
    }
  }
}

function installApp() {
  const installApp = document.getElementById("install-app");
  installApp.addEventListener("click", async () => {
    deferredPrompt.prompt();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMusicSheetToggleStorage();
  addMusicSheetToggleListener();
  navbar();
  installApp();
});
