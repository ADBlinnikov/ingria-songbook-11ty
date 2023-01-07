import { createApp } from "https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js";
function Counter(props) {
    return {
        count: 0,
        plus() {
            this.count++
        },
        minus() {
            this.count--
        }
    }
}
createApp({ Counter }).mount("#islands-app");
