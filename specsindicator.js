// specsindicator.js

module.exports.specsindicator = function (parent) {
  var plugin = {};
  plugin.parent = parent;
  plugin.meshServer = parent.parent;
  plugin.db = null;

  // 1) Exportiere hier auch den Helfer waitForSelector!
  plugin.exports = ["onWebUIStartupEnd", "goPageStart", "goPageEnd", "waitForSelector"];

  /**
   * 2) Der Helfer wird jetzt ins Web-UI gebündelt
   */
  plugin.waitForSelector = function (selector, { timeout = 5000 } = {}) {
    return new Promise((resolve, reject) => {
      // Sofort prüfen
      const el = document.querySelector(selector);
      if (el) return resolve(el);

      // Observer einrichten
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
      const timer = setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Timeout: Selector "${selector}" nicht gefunden`));
      }, timeout);
    });
  };

  /**
   * 3) Hooks, die MeshCentral aufruft
   */
  plugin.onWebUIStartupEnd = function () {
    console.log("onWebUIStartupEnd");
    // z.B. Versions-Log, initiale UI-Injektionen, o.Ä.
  };

  plugin.goPageStart = function (index, event) {
    console.log(`goPageStart(index: ${index}, event: ${event})`);
    // z.B. Navigation-Logik oder Cleanup vor Seitenwechsel
  };

  plugin.goPageEnd = async function (index, event) {
    console.log(`goPageEnd(index: ${index}, event: ${event})`);
    if (index !== 1) return; // nur bei Seite mit Index 1 ausführen

    try {
      // 4) Hier rufen wir unseren Helfer auf
      const table = await this.waitForSelector("#xdevices > table", { timeout: 8000 });
      console.log("Tabelle gefunden:", table);

      // Beispiel: In jede Zeile an zweiter Stelle eine Zelle einfügen
      Array.from(table.rows).forEach((row) => {
        const newCell = row.insertCell(1);
        newCell.textContent = "xx";
      });
    } catch (err) {
      console.warn(err.message);
    }
  };

  /**
   * Optional: Server-seitiger Hook
   */
  plugin.server_startup = function () {
    console.log("Server gestartet");
  };

  return plugin;
};
