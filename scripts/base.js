function navbar() {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
}

function initMusicSheetToggleStorage() {
  const curr = localStorage.getItem("showMusicSheet");
  if (!curr) {
    localStorage.setItem("showMusicSheet", "true");
  }
}

function addMusicSheetToggleListener() {
  const $switch = document.getElementById("showMusicSheet");
  $switch.checked =
    localStorage.getItem("showMusicSheet") === "true" ? true : false;
  $switch.addEventListener("change", () => {
    localStorage.setItem("showMusicSheet", $switch.checked);
    updateMusicSheetState();
  });
}

function updateMusicSheetState() {
  const $el = document.getElementById("music-sheet");
  if ($el) {
    if (localStorage.getItem("showMusicSheet") === "false") {
      $el.style.display = "none";
    } else {
      $el.style.display = "block";
    }
  }
}

function hymnsPagination() {
  const regex = /\/hymns\/(.*)\/$/;
  const match = window.location.pathname.match(regex);
  const list = sessionStorage.getItem("list");

  if ((list !== null) & (match !== null)) {
    const current = match[1];
    const hymns = window.atob(list).split(";");
    const pos = hymns.indexOf(current);
    function goto_hymn(name) {
      location.href = new URL(
        `/hymns/${name}`,
        window.location.origin
      ).toString();
    }
    console.log(`Pagination: list=${list} hymns=${hymns}`);
    const $navbar = document.getElementById("hymn-pagination");
    // Previous
    const $prev = document.createElement("a");
    $prev.innerHTML = "&#8678;";
    $prev.classList.add("pagination-previous");
    if (pos === 0) {
      $prev.setAttribute("disabled", "");
    } else {
      $prev.onclick = () => {
        goto_hymn(hymns[pos - 1]);
      };
    }
    $navbar.append($prev);
    // List
    const $ul = document.createElement("ul");
    $ul.classList.add("pagination-list");
    hymns.forEach((hymn, index) => {
      // Link
      const $a = document.createElement("a");
      $a.classList.add("pagination-link");
      if (hymn === current) {
        $a.classList.add("is-current");
        $a.ariaCurrent = "page";
      } else {
        $a.onclick = () => {
          goto_hymn(hymns[index]);
        };
      }
      $a.innerHTML = `${hymn}`;
      // List item
      const $li = document.createElement("li");
      $li.appendChild($a);
      $ul.append($li);
    });
    $navbar.append($ul);
    // Next
    const $next = document.createElement("a");
    $next.innerHTML = "&#8680;";
    $next.classList.add("pagination-next");
    if (pos === hymns.length - 1) {
      $next.setAttribute("disabled", "");
    } else {
      $next.onclick = () => {
        goto_hymn(hymns[pos + 1]);
      };
    }
    $navbar.append($next);
  }
}

function renderABC() {
  const paper = document.getElementById("paper");
  const abcString = document.getElementById("abcString");
  if ((paper !== null) & (abcString !== null)) {
    const abcjs = window.ABCJS;
    const width = paper.clientWidth - 25;
    console.log(width);
    const params = {
      staffwidth: width,
      wrap: { minSpacing: 1, maxSpacing: 1, preferredMeasuresPerLine: 4 },
    };
    abcjs.renderAbc("paper", abcString.innerHTML, params);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Global
  initMusicSheetToggleStorage();
  addMusicSheetToggleListener();
  navbar();
  // Path-specific
  const url = new URL(window.location);
  if (url.pathname.startsWith("/hymns/")) {
    hymnsPagination();
    renderABC();
    updateMusicSheetState();
  }
});
