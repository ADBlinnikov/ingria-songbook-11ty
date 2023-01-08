import { createApp } from "https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js";
function Paging(props) {
    return {
        current: window.location.pathname.replace(/\/+$/g, ""),
        list: JSON.parse(sessionStorage.getItem("list")),
        get index() { return this.list.map(el => el.href).indexOf(this.current); },
        get isFirst() { return this.index === 0; },
        get isLast() { return this.index === this.list.length - 1; },
        get prev() {
            if (this.isFirst) {
                return null;
            } else {
                return this.list[this.index - 1].href;
            }
        },
        get next() {
            if (this.isLast) {
                return null;
            } else {
                return this.list[this.index + 1].href;
            }
        },
        goto(link) {
            if (link) {
                location.href = link;
            }
        }
    }
}
createApp({ Paging }).mount("#paging-app");
