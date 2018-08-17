const navToPage = async pageName => {
  const page = document.createDocumentFragment();
  const thisLoadCheck = ++concurrencyCheck;
  let data;
  pageContainer.innerHTML = "";
  pageTitle.innerText = pageName;
  navToggleButton.classList.remove("active");
  mainNavBar.classList.remove("active");
  applyToAll(".nav-item", e => e.classList.remove("active"));
  document.getElementById(`link-to-${pageName}`).classList.add("active");
  spinner.style.display = "block";
  switch (pageName) {
    case categoryEnum.home:
      renderHomePage(page);
      break;
  }
  if (thisLoadCheck == concurrencyCheck) {
    spinner.style.display = "none";
    pageContainer.classList = `${pageName}-page`;
    pageContainer.appendChild(page);
  }
};
