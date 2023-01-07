import { createApp } from "https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js";
const KEY = "showMusicSheet"
function Navbar(props) {
    return {
        menuState: false,
        switchState: sessionStorage.getItem(KEY) === "true",
        toggle() {
            this.switchState = !this.switchState;
            sessionStorage.setItem(KEY, this.switchState);
            this.updateSheetsVisibility();
        },
        updateSheetsVisibility() {
            for (let paper of document.getElementsByClassName("paper")) {
                paper.style.display = this.switchState ? "block" : "none";
            }
            for (let lyrics of document.getElementsByClassName("lyrics")) {
                lyrics.style.display = this.switchState ? "none" : "inline";
            }
        }
    }
}
createApp({ Navbar }).mount("#navbar-app");
