class HymnsPagination {
  constructor() {
    this.target = document.getElementById("hymn-pagination");
    this.current = window.location.pathname.replace(/\/+$/g, "");
    this.list = this.getState();
    const idx = this.list.indexOf(this.current);
    this.isFirst = idx === 0;
    this.isLast = idx === this.list.length - 1;
    this.prev = this.isFirst ? "" : this.list.at(idx - 1);
    this.next = this.isLast ? "" : this.list.at(idx + 1);
  }
  getState() {
    const state = sessionStorage.getItem("list");
    if (state) {
      return window.atob(state).split(";");
    }
  }
  format(link) {
    const match = link.split("/");
    return match[match.length - 1];
  }
  paginationBar() {
    const paginationLinks = this.list.map((el) => {
      const innerHTML = this.format(el);
      if (el === this.current) {
        return `<li><a class="pagination-link is-capitalized is-current">${innerHTML}</a></li>`;
      } else {
        return `<li><a class="pagination-link is-capitalized" onclick="location.href='${el}';">${innerHTML}</a></li>`;
      }
    });
    const fragment = document.createRange().createContextualFragment(`
    <a 
        class="pagination-previous" 
        ${this.isFirst ? "disabled" : ""} 
        onclick="location.href='${this.prev}';"
    >&#8678;</a>
    <ul class="pagination-list">${paginationLinks.join("")}</ul>
    <a 
        class="pagination-next" 
        ${this.isLast ? "disabled" : ""}
        onclick="location.href='${this.next}';"
    >&#8680;</a>
    `);
    this.target.append(fragment);
  }
  init() {
    this.paginationBar();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //   hymnsPagination();
  const paging = new HymnsPagination();
  paging.init();
});
