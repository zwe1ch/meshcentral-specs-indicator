function waitForSelector(selector, { timeout = 5000 } = {}) {
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
}

module.exports.specsindicator = function (parent) {
  var plugin = {};
  plugin.parent = parent;
  plugin.meshServer = parent.parent;
  plugin.db = null;

  plugin.exports = ["onWebUIStartupEnd", "goPageStart", "goPageEnd"];

  plugin.onWebUIStartupEnd = function () {
    const ver = 17;
    console.log("onWebUIStartupEnd: " + ver);
  };

  plugin.goPageStart = function (index, event) {
    console.log(`goPageStart(index: ${index}, event: ${event})`);
  };

  plugin.goPageEnd = function (index, event) {
    console.log(`goPageEnd(index: ${index}, event: ${event})`);

    if (index !== 1) {
      return;
    }

    waitForSelector("#xdevices > table")
      .then((table) => {
        console.log("Tabelle ist da:", table);
        // hier weiterarbeiten…
      })
      .catch((err) => {
        console.error(err);
      });

    // const table = document.querySelector("#xdevices > table");

    // if (!table) {
    //   console.log("table not found");

    //   return;
    // } else {
    //   console.log("table ok");
    // }

    // console.log(table);

    // Array.from(table.rows).forEach((row) => {
    //   console.log(row);
    //   // // row.insertCell(1) erzeugt eine neue <td> an Spaltenindex 1
    //   // const newCell = row.insertCell(1);
    //   // // Optional: Inhalt oder Attribute setzen
    //   // newCell.textContent = "xx"; // z.B. leer
    //   // // newCell.classList.add('meine-klasse');
    // });
  };

  plugin.server_startup = function () {
    console.log("foooooooooooooooooooooooooo");
  };

  return plugin;
};
