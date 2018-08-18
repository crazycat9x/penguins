function createText() {
  const text = "Enter your phone number to be notified via SMS if your bus is cancelled or arriving late";
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
  phoneNumberInput.addEventListener(
    "keydown",
    function(e) {
      if (!e) {
        const e = window.event;
      }
      if (e.keyCode == 13) {
        navToPage(categoryEnum.busList);
      }
    }
  );

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
