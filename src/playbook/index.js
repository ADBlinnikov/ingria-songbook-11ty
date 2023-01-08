import { createApp } from "https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js";
function Playbook(props) {
    return {
        editing: -1,
        switchState: false,
        newSong: "",
        editedSong: "",
        list: [],
        get length() {
            return this.list.length;
        },
        add() {
            const val = this.newSong;
            if (val && !isNaN(val)) {
                this.list.push({ label: val, href: `/hymns/${val}` });
                this.newSong = "";
            }
            // this.$refs.songInput.focus();
        },
        startEdit(index) {
            this.editing = index;
            this.editedSong = this.list[index].label;
        },
        edit(index) {
            const val = this.editedSong;
            if (val && !isNaN(val)) {
                this.list[index] = { label: val, href: `/hymns/${val}` };
                this.undo();
            }
        },
        undo() {
            this.editing = -1;
            this.editedSong = "";
        },
        remove(index) {
            this.list.splice(index, 1);
            this.undo();
        },
        start() {
            sessionStorage.setItem("list", JSON.stringify(this.list));
            window.location.replace(this.list[0].href);
        },
        toggle() {
            this.switchState = !this.switchState;
            if (this.switchState) {
                // 0 Hymn
                // 1 Penitence
                // 
                // TODO add empty spaces for hymns
                this.list.splice(1, 0, { label: "Отпущение грехов", href: "/liturgy/penitence" });
            } else {
                this.list = this.list.filter(el => el.href.startsWith("/hymn"));
            }
        },
    };
}
createApp({ Playbook }).mount("#playbook-app");
