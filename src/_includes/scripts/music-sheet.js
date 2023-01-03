class MusicSheet {
  constructor(storageKey) {
    this.storageKey = storageKey | "showMusicSheet";
    this.switch = document.getElementById("showMusicSheet");
    this.sheets = Array.from(document.getElementsByClassName("music-sheet"));
  }
  getState() {
    return localStorage.getItem(this.storageKey) === "true" ? true : false;
  }
  setState(state) {
    localStorage.setItem(this.storageKey, state);
  }
  renderABC() {
    const abcjs = window.ABCJS;
    this.sheets.forEach((el) => {
      const paper = el.getElementsByClassName("paper").item(0);
      const abcString = el.getElementsByClassName("abcString").item(0);
      if ((paper !== null) & (abcString !== null)) {
        const width = paper.clientWidth - 25;
        const params = {
          staffwidth: width,
          wrap: { minSpacing: 1, maxSpacing: 1, preferredMeasuresPerLine: 4 },
        };
        abcjs.renderAbc(paper.id, abcString.innerHTML, params);
      }
    });
  }
  updateVisibility() {
    const state = this.getState();
    this.sheets.forEach((el) => {
      if (state) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });
  }
  toggle() {
    if (this.switch) {
      // Initialise from store
      this.switch.checked = this.getState();
      this.updateVisibility();
      // Change event
      this.switch.addEventListener("change", () => {
        this.setState(this.switch.checked);
        this.updateVisibility();
      });
    }
  }
  init() {
    this.toggle();
    this.renderABC();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const sheet = new MusicSheet();
  sheet.init();
});
