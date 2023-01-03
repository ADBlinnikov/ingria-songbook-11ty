

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


document.addEventListener("DOMContentLoaded", () => {
  hymnsPagination();
  renderABC();
  updateMusicSheetState();
});
