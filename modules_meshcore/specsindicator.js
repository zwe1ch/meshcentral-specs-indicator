(function () {
  // Name muss mit dem Hook im Plugin JS übereinstimmen
  parent.expose = ["addSpecsIndicator"];

  exports.addTestColumn = function (MC) {
    MC.api.goPageEnd((pageId, ev) => {
      console.log("x");
      console.log("addSpecsIndicator", pageId);
      if (pageId !== MC.tabs.deviceListPageId) return;

      const header = document.querySelector("thead tr");
      if (!header || header.querySelector('th[data-col="testx"]')) return;

      header.insertAdjacentHTML("beforeend", '<th data-col="testx" style="width:2em; text-align:center">X</th>');

      // Bei jedem Rendering der Geräteliste "x" in jeder Zeile einfügen
      document.querySelectorAll("tbody tr").forEach((tr) => {
        if (tr.querySelector('td[data-col="testx"]')) return;
        const td = document.createElement("td");
        td.dataset.col = "testx";
        td.textContent = "x";
        td.style.textAlign = "center";
        tr.appendChild(td);
      });
    });
  };
})();
