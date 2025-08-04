module.exports = function (parent, plugin) {
  // 1. Funktion exportieren
  plugin.exports = ["addSpecsIndicator"];
  // 2. Browser-Code definieren
  plugin.addSpecsIndicator = function (MC) {
    MC.api.goPageEnd((pageId, ev) => {
      console.log("addSpecsIndicator", pageId);
      if (pageId !== MC.tabs.deviceListPageId) return;
      const header = document.querySelector("thead tr");
      if (!header || header.querySelector('th[data-col="testx"]')) return;
      header.insertAdjacentHTML("beforeend", '<th data-col="testx" style="width:2em; text-align:center">X</th>');
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
  // 3. Hook beim UI-Start
  plugin.onWebUIStartupEnd = () => {
    parent.addSpecsIndicator();
  };
};
