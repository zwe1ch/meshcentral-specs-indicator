module.exports.specsindicator = function (parent) {
  var plugin = {};
  plugin.parent = parent;
  plugin.meshServer = parent.parent;
  plugin.db = null;

  plugin.exports = ["onWebUIStartupEnd", "goPageStart", "goPageEnd"];

  plugin.onWebUIStartupEnd = function () {
    console.log("onWebUIStartupEnd");
  };

  plugin.goPageStart = function (index, event) {
    console.log(`goPageStart(index: ${index})`);
  };

  plugin.goPageEnd = async function (index, event) {
    if (index !== 1) return;

    // 1) Tabelle finden (wie gehabt)
    const table = await new Promise((resolve, reject) => {
      const sel = "#xdevices > table";
      let timer;
      const obs = new MutationObserver(() => {
        const t = document.querySelector(sel);
        if (t) {
          clearTimeout(timer);
          obs.disconnect();
          resolve(t);
        }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
      timer = setTimeout(() => {
        obs.disconnect();
        reject(new Error("Timeout waiting for table"));
      }, 8000);
      // direkt prüfen
      const t0 = document.querySelector(sel);
      if (t0) {
        clearTimeout(timer);
        obs.disconnect();
        resolve(t0);
      }
    });

    // 2) Helfer zum Einfügen der Spalte
    function addColumn(row) {
      if (row._colAdded) return;
      row._colAdded = true;
      const count = row.cells.length;
      const index = count >= 1 ? 1 : 0;
      const newCell = row.insertCell(index);
      newCell.textContent = "xx";
    }

    // 3) Bereits vorhandene Zeilen bearbeiten
    Array.from(table.rows).forEach(addColumn);

    // 4) Auf neue Zeilen lauschen
    const target = table.tBodies[0] || table;
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const n of m.addedNodes) {
          if (n.nodeType === 1 && n.tagName === "TR") {
            addColumn(n);
          }
        }
      }
    });
    mo.observe(target, { childList: true });

    console.log("Spalten-Hook aktiv");
  };

  plugin.server_startup = function () {
    console.log("Server gestartet");
  };

  return plugin;
};
