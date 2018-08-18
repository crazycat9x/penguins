function createBusCard(busNumber, cityName, busStatus){
  const wrapper = createHtmlElement({className: "bus-card"})
  const number = createHtmlElement({className: "bus-number", content: busNumber})
  const name = createHtmlElement({className: "city-name", content: cityName})
  const deleteButton = createHtmlElement({type: "button", className: "delete-button"})
  const status = createHtmlElement({className: "bus-status", content: busStatus})
  wrapper.appendChild(number)
  wrapper.appendChild(deleteButton)
  wrapper.appendChild(name)
  wrapper.appendChild(status)
  return wrapper
}

function renderBusListToPage(page){
  const routeDummyData = {
    routeNumbers : [
      {
        "number": "267"
      },
      {
        "number":"366"
      },
      {
        "number":"565"
      },
      {
        "number":"570"
      },
      {
        "number":"572"
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
  const inputForm = createHtmlElement({type: "input", className: "add-bar", additionalAttr:{"placeholder": "Add a route"}});
  page.appendChild(inputForm);

  inputForm.addEventListener("keydown", function(e){
    if (!e) { const e = window.event;}
    if (e.keyCode == 13) { openModalWithData(this.value); }
  }, false); //send to backend and display the result

  for (const route of dummyData.routes){
    console.log(route);
    console.log(route.number, route.name, route.status);
    const card = createBusCard(route.number, route.name, route.status); //declare outside loop?
    console.log(card);
    page.appendChild(card);
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
