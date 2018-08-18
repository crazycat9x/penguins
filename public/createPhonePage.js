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
