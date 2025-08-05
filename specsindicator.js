// specsindicator.js

module.exports.specsindicator = function (parent) {
  var plugin = {};
  plugin.parent = parent;
  plugin.meshServer = parent.parent;
  plugin.db = null;

  // 1) Nun auch unseren Helfer exportieren:
  plugin.exports = [
    "onWebUIStartupEnd",
    "goPageStart",
    "goPageEnd",
    "waitForSelector" // <<< hier mit hinzufügen
  ];

  // 2) Helfer definieren – wird in den WebUI-Bundle aufgenommen
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

  // 3) Hooks, die MeshCentral ins UI lädt
  plugin.onWebUIStartupEnd = function () {
    console.log("onWebUIStartupEnd");
  };

  plugin.goPageStart = function (index, event) {
    console.log(`goPageStart(index: ${index}, event: ${event})`);
  };

  plugin.goPageEnd = async function (index, event) {
    console.log(`goPageEnd(index: ${index}, event: ${event})`);
    if (index !== 1) return;

    try {
      // 4) Jetzt wirklich über die Closure-Variable aufrufen:
      const table = await plugin.waitForSelector("#xdevices > table", { timeout: 8000 });
      console.log("Tabelle gefunden:", table);

      // Beispiel: neue Zelle in jeder Zeile einfügen
      Array.from(table.rows).forEach((row) => {
        const newCell = row.insertCell(1);
        newCell.textContent = "xx";
      });
    } catch (err) {
      console.warn(err.message);
    }
  };

  plugin.server_startup = function () {
    console.log("Server gestartet");
  };

  return plugin;
};
