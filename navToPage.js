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
    case categoryEnum.courses:
      data = await reqwest("GET", getUrls[pageName].all);
      renderCoursesToPage(JSON.parse(data).data, page);
      break;
    case categoryEnum.news:
      data = await reqwest("GET", getUrls[pageName].all);
      renderNewsToPage(JSON.parse(data), page);
      break;
    case categoryEnum.notices:
      data = await reqwest("GET", getUrls[pageName].all);
      renderNoticesToPage(JSON.parse(data), page);
      break;
    case categoryEnum.people:
      data = await reqwest("GET", getUrls[pageName].all);
      await renderPeopleToPage(JSON.parse(data).list, page);
      break;
    case categoryEnum.comments:
      data = await reqwest("GET", getUrls[pageName].all);
      data = parser.parseFromString(data, "text/html");
      renderCommentsToPage(data, page);
      break;
  }
  if (thisLoadCheck == concurrencyCheck) {
    spinner.style.display = "none";
    pageContainer.classList = `${pageName}-page`;
    pageContainer.appendChild(page);
  }
};
