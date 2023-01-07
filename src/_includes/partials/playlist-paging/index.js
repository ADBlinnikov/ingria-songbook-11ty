import { createApp } from "https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js";
function Paging(props) {
    return {
        current: window.location.pathname.replace(/\/+$/g, ""),
        list: window.atob(sessionStorage.getItem("list")).split(";"),
        index() { return this.list.indexOf(this.current); },
        isFirst() { return this.index() === 0; },
        isLast() { return this.index() === this.list.length - 1; },
        prev() { return this.list[this.index() - 1]; },
        next() { return this.list[this.index() + 1]; },
        format(link) {
            const match = link.split("/");
            return match[match.length - 1];
        },
        goto(link) {
            if (link) {
                location.href = link;
            }
        }
    }
}
createApp({ Paging }).mount("#paging-app");
