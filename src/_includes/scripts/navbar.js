class Navbar {
  constructor(target = ".navbar-burger") {
    this.target = target;
    this.elements = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );
  }
  init() {
    this.elements.forEach((el) => {
      el.addEventListener("click", () => {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        const target = document.getElementById(el.dataset.target);
        el.classList.toggle("is-active");
        target.classList.toggle("is-active");
      });
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const navbar = new Navbar();
  navbar.init();
});
