import { createApp } from "https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js";
function Playbook(props) {
    return {
        newSong: "",
        list: [],
        add() {
            if (this.newSong && !isNaN(this.newSong)) {
                this.list.push(this.newSong);
                this.newSong = "";
            }
            this.$refs.songInput.focus();
        },
        remove(index) {
            this.list.splice(index, 1);
        },
        start() {
            const hymns = this.list.map(el => `/hymns/${el}`);
            sessionStorage.setItem("list", window.btoa(hymns.join(";")));
            window.location.replace(hymns[0]);
        }
    }
}
createApp({ Playbook }).mount("#playbook-app");