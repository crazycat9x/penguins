function createCard(busNumber, cityName, busStatus, button, callback){
  const wrapper = createHtmlElement({className: "bus-card"});
  const topSection = createHtmlElement({className: "top-bus-card"});
  const bottomSection = createHtmlElement({className: "bottom-bus-card"});
  const number = createHtmlElement({className: "bus-number", content: busNumber});
  const name = createHtmlElement({className: "city-name", content: cityName});
  const deleteButton = createHtmlElement({type: "button", className: "delete-button", content: "X"});
  const addButton = createHtmlElement({type: "button", className: "add-button", content: "+"});
  deleteButton.addEventListener("click", ()=> wrapper.parentNode.removeChild(wrapper)); //send to backend
  const status = createHtmlElement({className: "bus-status", content: busStatus});
  topSection.appendChild(number);
  if (button === "true")
  {
      console.log("hi");
      topSection.appendChild(deleteButton);
  }
  if (button === "false")
  {
    addButton.addEventListener("click", callback)
    topSection.appendChild(addButton);
  }
  bottomSection.appendChild(name);
  bottomSection.appendChild(status);
  wrapper.appendChild(topSection);
  wrapper.appendChild(bottomSection);
  return wrapper;
}

function renderBusListToPage(page){
  const routeDummyData = {
    "routeNumbers" : [
      {
        "number":"565",
        "name": "Botany",
        "status":"ONTIME"
      },
      {
        "number":"570",
        "name": "Remuera",
        "status":"ONTIME"
      },
      {
        "number":"572",
        "name": "Albany",
        "status":"ONTIME"
      }
    ]
  }
  const dummyData = {
    "routes" : [
      {
        "number": "667",
        "name": "Henderson",
        "status": "ONTIME"
      },
      {
        "number": "111",
        "name": "City Central",
        "status": "ONTIME"
      },
      {
        "number": "222",
        "name": "Mt Eden",
        "status": "Cancelled"
      }
    ]
  }
  const searchWrapper = createHtmlElement({className: "search-wrapper"});
  const routeListWrapper = createHtmlElement({className: "route-list-wrapper"})

  const inputForm = createHtmlElement({type: "input", className: "add-bar", additionalAttr:{"placeholder": "Add a route"}});
  page.appendChild(inputForm);

  inputForm.addEventListener("keydown", function(e){
    if (!e) { const e = window.event;}
    if (e.keyCode == 13) {
      for(const routeNumber of routeDummyData.routeNumbers.values()){

        const busRoute = createCard(routeNumber.number, routeNumber.name, routeNumber.status, "false", () => {
          routeListWrapper.appendChild(createCard(routeNumber.number, routeNumber.name, routeNumber.status, "true"));
          closeModal();});

        // console.log(busRoute);
        searchWrapper.appendChild(busRoute);
        //add event listener so that it sends the route to the backend
      }
      openModalWithData(searchWrapper);}
  }, false); //send to backend and display the result

  for (const route of dummyData.routes){
    // console.log(route);
    console.log(route.number, route.name, route.status);
    const card = createCard(route.number, route.name, route.status, "true");
    console.log(card);
    page.appendChild(routeListWrapper);
    routeListWrapper.appendChild(card);
  }
  // reqwest("GET","url")
  // .then(res => JSON.parse(res))
  // .then(data => {
  //   for(const i in data){
  //     const card = createBusCard(data.number,data.name,data.status)
  //     //card.addEventListener("click", ()=> openModalWithData("<div></div>"))
  //     page.appendChild(card)
  //   }
  // })
  return page;
}
