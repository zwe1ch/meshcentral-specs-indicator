// specsindicator.js

module.exports.specsindicator = function (parent) {
  var plugin = {};
  plugin.parent = parent;
  plugin.meshServer = parent.parent;
  plugin.db = null;

  // Nur diese Hooks werden in die Web-UI gebündelt:
  plugin.exports = ["onWebUIStartupEnd", "goPageStart", "goPageEnd"];

  plugin.onWebUIStartupEnd = function () {
    console.log("onWebUIStartupEnd");
  };

  plugin.goPageStart = function (index, event) {
    console.log(`goPageStart(index: ${index}, event: ${event})`);
  };

  plugin.goPageEnd = async function (index, event) {
    console.log(`goPageEnd(index: ${index})`);
    if (index !== 1) return;

    // Helper-Funktion direkt hier drin definieren
    function waitForSelector(selector, { timeout = 5000 } = {}) {
      return new Promise((resolve, reject) => {
        // Sofort prüfen
        const el = document.querySelector(selector);
        if (el) return resolve(el);

        // Observer einrichten
        let timer;
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

        // Timeout, falls nichts kommt
        timer = setTimeout(() => {
          observer.disconnect();
          reject(new Error(`Timeout: Selector "${selector}" nicht gefunden`));
        }, timeout);
      });
    }

    try {
      // Und hier rufen wir ihn auf – jetzt reliably im Scope:
      const table = await waitForSelector("#xdevices > table", { timeout: 8000 });
      console.log("Tabelle gefunden:", table);

      // Beispiel: In jede Zeile an Position 1 eine neue Zelle einfügen
      Array.from(table.rows).forEach((row) => {
        const newCell = row.insertCell(1);
        newCell.textContent = "xx";
      });
    } catch (err) {
      console.warn(err.message);
    }
  };

  // Dieser Hook läuft nur auf der Server-Seite und wird nicht in die Web-UI gebündelt
  plugin.server_startup = function () {
    console.log("Server gestartet");
  };

  return plugin;
};
