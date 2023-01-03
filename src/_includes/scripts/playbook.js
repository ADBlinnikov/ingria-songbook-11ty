class Playbook {
  constructor() {
    this.songList = document.getElementById("song-list");
    this.inputElem = document.getElementById("song-input");
    this.addSongBtn = document.getElementById("add-song-btn");
    this.startBtn = document.getElementById("start-btn");
  }
  add() {
    const val = this.inputElem.value;
    if (!val) {
      return;
    }
    // Create new list item and add it to list
    const id = `li-${val}`;
    const fragment = document.createRange().createContextualFragment(`
        <li id="${id}" class="block">
            <span class="tag is-medium">
                <div class="hymn-name">${val}</div>
                <button id="remove-btn-${val}" aria-label="Delete" class="delete is-medium"></button>
            </span>
        </li>
        `);
    fragment.getElementById(`remove-btn-${val}`).onclick = () => {
      this.remove(id);
    };
    this.songList.append(fragment);
    // Change start button state
    this.startBtn.removeAttribute("disabled");
    // Clear input and focus
    this.inputElem.value = "";
    this.inputElem.focus();
  }
  remove(id) {
    var item = document.getElementById(id);
    this.songList.removeChild(item);
    if (this.songList.childElementCount === 0) {
      this.startBtn.setAttribute("disabled", true);
    }
  }
  start() {
    // Get hymns as list
    const collection = document.getElementsByClassName("hymn-name");
    var hymns = [];
    for (let i = 0; i < collection.length; i++) {
      hymns.push(`/hymns/${collection[i].innerHTML}`);
    }
    console.log(hymns);
    // Construct URI with params
    sessionStorage.setItem("list", window.btoa(hymns.join(";")));
    // Go to hymns page
    window.location.replace(hymns[0]);
  }
  init() {
    this.addSongBtn.onclick = () => {
      this.add();
    };
    this.startBtn.onclick = () => {
      this.start();
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const playbook = new Playbook();
  playbook.init();
});
