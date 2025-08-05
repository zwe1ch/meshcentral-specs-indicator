module.exports.specsindicator = function (parent) {
  var plugin = {};
  plugin.parent = parent;
  plugin.meshServer = parent.parent;
  plugin.db = null;

  // 1) Helfer-Funktion direkt auf plugin binden
  plugin.waitForSelector = function (selector, { timeout = 5000 } = {}) {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);

      const observer = new MutationObserver(() => {
        const found = document.querySelector(selector);
        if (found) {
          observer.disconnect();
          clearTimeout(timer);
          resolve(found);
        }
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });

      const timer = setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Timeout: Selector "${selector}" nicht gefunden`));
      }, timeout);
    });
  };

  // 2) Nur diese Methoden exportieren MeshCentral als Hooks
  plugin.exports = ["onWebUIStartupEnd", "goPageStart", "goPageEnd"];

  plugin.onWebUIStartupEnd = function () {
    console.log("onWebUIStartupEnd");
  };

  plugin.goPageStart = function (index, event) {
    console.log("goPageStart", index, event);
  };

  plugin.goPageEnd = function (index, event) {
    console.log(`goPageEnd(index: ${index})`);
    if (index !== 1) return;

    // 3) Jetzt existiert waitForSelector im Browser und kann auf plugin referenziert werden:
    plugin
      .waitForSelector("#xdevices > table", { timeout: 8000 })
      .then((table) => {
        console.log("Tabelle gefunden:", table);
        Array.from(table.rows).forEach((row) => {
          const newCell = row.insertCell(1);
          newCell.textContent = "xx";
        });
      })
      .catch((err) => console.warn(err.message));
  };

  plugin.server_startup = function () {
    console.log("Server gestartet");
  };

  return plugin;
};
