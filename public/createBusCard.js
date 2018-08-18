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
    addButton.addEventListener("click", () => {
      spinner.style.display = "block";
      reqwest(
        "POST",
        `/newStop?stopNumber=${busNumber}&stopName=${cityName}`
      ).then(res => {
        spinner.style.display = "none";
        callback.appendChild(createCard(cityName, busNumber, "true"));
        closeModal();
      });
    });
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
    function(e) {
      if (!e) {
        const e = window.event;
      }
      if (e.keyCode == 13) {
        searchWrapper.innerHTML = "";
        spinner.style.display = "block";
        reqwest("GET", `/search?query=${this.value}`)
          .then(res => JSON.parse(res))
          .then(data => {
            for (routeNumber of data) {
              console.log(routeNumber.stopName, routeNumber.stopCode);
              const busRoute = createCard(
                routeNumber.stopName,
                routeNumber.stopCode,
                "false",
                routeListWrapper
              );
              searchWrapper.appendChild(busRoute);
              //add event listener so that it sends the route to the backend
            }
            spinner.style.display = "none";
            openModalWithData(searchWrapper);
          });
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

function createText() {
  const text = "Penguin notifies you of bus cancellation through SMS";
  const textWrapper = createHtmlElement({ className: "text-wrapper" });
  const phoneText = createHtmlElement({
    className: "phone-text",
    content: text
  });
  textWrapper.appendChild(phoneText);

  return textWrapper;
}
function createPhoneNumInput() {
  const phoneInputWrapper = createHtmlElement({
    className: "phone-input-wrapper"
  });
  const phoneNumberInput = createHtmlElement({
    type: "input",
    className: "phone-number-input",
    additionalAttr: { placeholder: "(+64) ......" }
  });
  const nextButton = createHtmlElement({
    type: "button",
    className: "next-button",
    content: "Next"
  }); //No functionality
  nextButton.addEventListener("click", () => navToPage(categoryEnum.busList));
  phoneInputWrapper.appendChild(phoneNumberInput);
  phoneInputWrapper.appendChild(nextButton);

  return phoneInputWrapper;
}
function renderPhoneSignUpToPage(page) {
  const wrapper = createHtmlElement({ className: "phone-wrapper" });
  wrapper.appendChild(createText());
  wrapper.appendChild(createPhoneNumInput());
  page.appendChild(wrapper);

  return page;
}
