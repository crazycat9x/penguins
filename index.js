const categoryEnum = Object.freeze({
  home: "home",
  courses: "courses",
  news: "news",
  notices: "notices",
  people: "people",
  comments: "guest book"
});

const parser = new DOMParser();
const postComment = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc";
const pageBody = document.querySelector("body");
const pageTitle = document.getElementById("title");
const pageContainer = document.getElementById("page-container");
const mainNavBar = document.getElementById("main-nav");
const navToggleButton = document.getElementById("toggle-nav-button");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalCloseButton = document.getElementById("modal-close-button");
const spinner = document.getElementById("spinner");
let concurrencyCheck = 0;

navToggleButton.addEventListener("click", function() {
  mainNavBar.classList.toggle("active")
    ? this.classList.add("active")
    : this.classList.remove("active");
});

// set up home page
document.getElementById("link-to-home").classList.toggle("active");
pageTitle.innerText = "home";
renderHomePage(pageContainer);
