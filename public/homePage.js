const renderHomePage = page => {
  const header = createHtmlElement({});
  const button = createHtmlElement({ type: "button", content: "start" });
  button.addEventListener("click", () => navToPage(categoryEnum.phoneNum));
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
  page.appendChild(button);
  return page;
};
