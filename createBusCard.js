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
  page.appendChild(createHtmlElement({type: "input", className: "add-bar", additionalAttr:{"placeholder": "Add a route"}}))
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
  for (const route of dummyData.routes){
    console.log(route)
    console.log(route.number, route.name, route.status)
    const card = createBusCard(route.number, route.name, route.status) //declare outside loop?
    console.log(card)
    page.appendChild(card)
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
  return page
}
