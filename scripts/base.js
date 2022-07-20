// Global
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});

// Render abcjs
document.addEventListener('DOMContentLoaded', () => {
  const paper = document.getElementById("paper");
  const abcString = document.getElementById("abcString");
  if (paper !== null & abcString !== null) {
    const abcjs = window.ABCJS;
    const width = paper.clientWidth - 25
    console.log(width)
    const params = {
      staffwidth: width,
      wrap: { minSpacing: 1, maxSpacing: 1, preferredMeasuresPerLine: 4 },
    }
    abcjs.renderAbc("paper", abcString.innerHTML, params)
  }
});

// Paging for hymns
document.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location);
  const pathname = url.pathname;
  const list = url.searchParams.get('list');
  const pos = url.searchParams.get('pos');

  if (pathname.startsWith("/hymns/") & list !== null & pos !== null) {
    const hymns = window.atob(list).split(";");
    function format_href(idx) {
      const url = new URL(`/hymns/${hymns[idx]}`, window.location.origin);
      url.searchParams.set("list", list);
      url.searchParams.set("pos", hymns[idx]);
      return url.href;
    }
    console.log(`Pagination: pathname=${pathname} list=${list} pos=${pos} hymns=${hymns}`);
    const $navbar = document.getElementById('hymn-pagination');
    // Previous
    const $prev = document.createElement("a");
    $prev.innerHTML = "&#8678;";
    $prev.classList.add("pagination-previous");
    if (hymns[0] === pos) {
      $prev.setAttribute("disabled", "")
    } else {
      $prev.href = format_href(hymns.indexOf(pos) - 1);
    }
    $navbar.append($prev);
    // List
    const $ul = document.createElement("ul");
    $ul.classList.add("pagination-list");
    hymns.forEach((hymn, index) => {
      // Link
      const $a = document.createElement("a");
      $a.classList.add("pagination-link");
      if (hymn === pos) {
        $a.classList.add("is-current");
        $a.ariaCurrent = "page"
      } else {
        $a.href = format_href(index)
      }
      $a.innerHTML = `${hymn}`;
      // List item
      const $li = document.createElement("li");
      $li.appendChild($a);
      $ul.append($li);

    })
    $navbar.append($ul)
    // Next
    const $next = document.createElement("a");
    $next.innerHTML = "&#8680;";
    $next.classList.add("pagination-next");
    $next.disa = hymns[hymns.length] === pos;
    if (hymns[hymns.length] === pos) {
      $next.setAttribute("disabled", "")
    } else {
      $next.href = format_href(hymns.indexOf(pos) + 1)
    }
    $navbar.append($next);

  }
});