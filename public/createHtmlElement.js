const createHtmlElement = ({
  type = "div",
  id,
  className,
  content,
  additionalAttr
}) => {
  const element = document.createElement(type);
  id && (element.id = id);
  className &&
    (Array.isArray(className)
      ? className.forEach(name => element.classList.add(name))
      : element.classList.add(className));
  switch (typeof content) {
    case "string":
      element.innerHTML = content;
      break;
    case "object":
      element.appendChild(content);
      break;
  }
  additionalAttr &&
    Object.entries(additionalAttr).forEach(attr =>
      element.setAttribute(attr[0], attr[1])
    );
  return element;
};
