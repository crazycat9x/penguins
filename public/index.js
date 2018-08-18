const categoryEnum = Object.freeze({
  home: "home",
  busList: "bus list",
  phoneNum: "phone num"
});

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
document.getElementById("link-to-home").classList.toggle("active");
navToPage("home");
