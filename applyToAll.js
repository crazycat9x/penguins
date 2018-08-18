const applyToAll = (query, func) =>
  [...document.querySelectorAll(query)].forEach(func);