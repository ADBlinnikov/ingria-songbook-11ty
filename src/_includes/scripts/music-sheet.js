class MusicSheet {
    constructor(storageKey) {
        this.storageKey = storageKey | "showMusicSheet"
        this.switch = document.getElementById("showMusicSheet");
        this.sheet = document.getElementById("music-sheet");
        this.paper = document.getElementById("paper");
        this.abcString = document.getElementById("abcString");
    }
    getState() {
        return localStorage.getItem(this.storageKey) === "true" ? true : false;
    }
    setState(state) {
        localStorage.setItem(this.storageKey, state);
    }
    renderABC() {
        if ((this.paper !== null) & (this.abcString !== null)) {
            const abcjs = window.ABCJS;
            const width = this.paper.clientWidth - 25;
            console.log(width);
            const params = {
                staffwidth: width,
                wrap: { minSpacing: 1, maxSpacing: 1, preferredMeasuresPerLine: 4 },
            };
            abcjs.renderAbc("paper", this.abcString.innerHTML, params);
        }
    }
    updateMusicSheet() {
        if (this.sheet) {
            if (this.getState()) {
                this.sheet.style.display = "block";
            } else {
                this.sheet.style.display = "none";
            }
        }
    }
    toggle() {
        if (this.switch) {
            this.switch.checked = this.getState()
            this.switch.addEventListener("change", () => {
                this.setState(this.switch.checked);
                this.updateMusicSheet();
            });
        }
    }
    init() {
        this.renderABC()
        this.toggle()
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const sheet = new MusicSheet();
    sheet.init();
});