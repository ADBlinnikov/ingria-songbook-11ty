import { createApp } from "https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js";
function MusicSheet(props) {
    return {
        render() {
            const abcjs = window.ABCJS;
            for (let ref in this.$refs) {
                const abc = this.$refs[ref].getElementsByClassName("abcString").item(0);
                const paper = this.$refs[ref].getElementsByClassName("paper").item(0);
                if ((paper !== null) & (abc !== null)) {
                    const width = paper.clientWidth - 25;
                    const params = {
                        staffwidth: width,
                        wrap: {
                            minSpacing: 1,
                            maxSpacing: 1,
                            preferredMeasuresPerLine: 4
                        },
                    };
                    abcjs.renderAbc(paper.id, abc.innerHTML, params);
                }
            }
        }
    }
}
createApp({ MusicSheet }).mount("#music-app");
