const reqwest = (type, url, data = null, async = true) =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(type, url, async);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      this.status >= 200 && this.status < 400
        ? resolve(this.response)
        : reject(this.response);
    };
    request.send(data);
  });
