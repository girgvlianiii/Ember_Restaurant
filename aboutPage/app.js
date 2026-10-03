const menuButton = document.querySelector(".header__menu");
const mobileMenu = document.querySelector(".mobile-menu");
const menuIcon = menuButton.querySelector("i");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");

  if (mobileMenu.classList.contains("active")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  } else {
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  }
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");

    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  });
});