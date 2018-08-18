const renderHomePage = page => {
  header = createHtmlElement({});
  header.appendChild(
    createHtmlElement({
      type: "h1",
      content: "Penguin Welcome",
      className: "big-title"
    })
  );
  header.appendChild(
    createHtmlElement({
      type: "h2",
      className: "smaller-title",
      content: "Penguin notifies you if your bus is cancelled or late"
    })
  );
  page.appendChild(header);
  page.appendChild(createHtmlElement({ type: "button", content: "start" }));
  return page;
};
