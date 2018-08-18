function createCard(busNumber, cityName, button, callback) {
  const wrapper = createHtmlElement({ className: "bus-card" });
  const getStopInfo = () => {
    spinner.style.display = "block";
    reqwest("GET", `/stopInfo?stopId=${busNumber}`).then(res => {
      spinner.style.display = "none";
      openModalWithData(res);
    });
  };
  const topSection = createHtmlElement({ className: "top-bus-card" });
  const bottomSection = createHtmlElement({ className: "bottom-bus-card" });
  const number = createHtmlElement({
    className: "bus-number",
    content: busNumber
  });
  const name = createHtmlElement({ className: "city-name", content: cityName });
  name.addEventListener("click", getStopInfo);
  number.addEventListener("click", getStopInfo);
  const deleteButton = createHtmlElement({
    type: "button",
    className: "delete-button",
    content: "X"
  });
  const addButton = createHtmlElement({
    type: "button",
    className: "add-button",
    content: "+"
  });
  deleteButton.addEventListener("click", () =>
    reqwest("DELETE", `/route?stopNumber=${busNumber}`).then(res =>
      wrapper.parentNode.removeChild(wrapper)
    )
  ); //send to backend
  topSection.appendChild(number);
  if (button === "true") {
    console.log("hi");
    topSection.appendChild(deleteButton);
  }
  if (button === "false") {
    addButton.addEventListener("click", callback);
    topSection.appendChild(addButton);
  }
  bottomSection.appendChild(name);
  wrapper.appendChild(topSection);
  wrapper.appendChild(bottomSection);
  return wrapper;
}

async function renderBusListToPage(page) {
  const searchWrapper = createHtmlElement({ className: "search-wrapper" });
  const routeListHeading = createHtmlElement({
    className: "route-list-heading",
    content: "Monitored Route"
  });
  const routeListWrapper = createHtmlElement({
    className: "route-list-wrapper"
  });
  const inputForm = createHtmlElement({
    type: "input",
    className: "add-bar",
    additionalAttr: { placeholder: "+ Add a route (ie. 667)" }
  });
  page.appendChild(inputForm);
  page.appendChild(routeListHeading);
  inputForm.addEventListener(
    "keydown",
    async function(e) {
      if (!e) {
        const e = window.event;
      }
      if (e.keyCode == 13) {
        spinner.style.display = "block";
        const data = await reqwest("GET", `/search?query=${this.value}`).then(
          res => JSON.parse(res)
        );
        for (const routeNumber of data) {
          const busRoute = createCard(
            routeNumber.stopName,
            routeNumber.stopCode,
            "false",
            async () => {
              spinner.style.display = "block";
              await reqwest(
                "POST",
                `/newStop?stopNumber=${routeNumber.stopCode}&stopName=${
                  routeNumber.stopName
                }`
              );
              spinner.style.display = "none";
              routeListWrapper.appendChild(
                createCard(routeNumber.stopCode, routeNumber.stopName, "true")
              );
              closeModal();
            }
          );
          searchWrapper.appendChild(busRoute);
          //add event listener so that it sends the route to the backend
        }
        spinner.style.display = "none";
        openModalWithData(searchWrapper);
      }
    },
    false
  ); //send to backend and display the result

  for (const route of await reqwest("GET", "/routes").then(res =>
    JSON.parse(res)
  )) {
    console.log(route);
    const card = createCard(route.stopNumber, route.stopName, "true");
    routeListWrapper.appendChild(card);
  }

  page.appendChild(routeListWrapper);

  return page;
}
