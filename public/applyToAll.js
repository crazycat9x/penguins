const applyToAll = (query, func) =>
  [...document.querySelectorAll(query)].forEach(func);

const createTable = (body, header, tableId, columnId = header) => {
  const table = createHtmlElement({ type: "table", id: tableId });
  header &&
    table.appendChild(
      createHtmlElement({
        type: "thead",
        content: header
          .map(
            (th, i) =>
              `<th class="column-${columnId[i]
                .split(" ")
                .join("-")}">${th}</th>`
          )
          .join("")
      })
    );
  body.forEach(tr =>
    table.appendChild(
      createHtmlElement({
        type: "tr",
        content: tr
          .map(
            (td, i) =>
              `<td class="column-${columnId[i]
                .split(" ")
                .join("-")}">${td}</td>`
          )
          .join("")
      })
    )
  );
  return table;
};
