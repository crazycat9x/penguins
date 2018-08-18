const categoryEnum = Object.freeze({
  busList: "bus list"
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

// create navigation items
Object.values(categoryEnum).forEach(cat => {
  const button = createHtmlElement({
    className: "nav-item",
    id: `link-to-${cat}`,
    content: cat
  });
  button.addEventListener("click", function() {
    navToPage(cat);
  });
  mainNavBar.appendChild(button);
});

// set up home page
// document.getElementById("link-to-home").classList.toggle("active");
// pageTitle.innerText = "home";
// renderHomePage(pageContainer);

//Register service worker
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/serviceWorker.js")
    .then(() => navigator.serviceWorker.ready)
    .then(
      registration => console.log(registration) // service worker is ready and working...
    )
    .catch(e => console.log(e));
  navigator.serviceWorker.addEventListener("message", function(event) {
    console.log(event.data.message); // Hello World !
  });
}
