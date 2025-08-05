module.exports.specsindicator = function (parent) {
  var plugin = {};
  plugin.parent = parent;
  plugin.meshServer = parent.parent;
  plugin.db = null;

  plugin.exports = ["onWebUIStartupEnd", "goPageStart", "goPageEnd"];

  plugin.onWebUIStartupEnd = function () {
    const ver = 16;
    console.log("onWebUIStartupEnd: " + ver);
  };

  plugin.goPageStart = function (index, event) {
    console.log(`goPageStart(index: ${index}, event: ${event})`);

    if (index !== 1) {
      return;
    }

    const table = document.querySelector("#xdevices > table");

    console.log(table);

    Array.from(table.rows).forEach((row) => {
      // row.insertCell(1) erzeugt eine neue <td> an Spaltenindex 1
      const newCell = row.insertCell(1);
      // Optional: Inhalt oder Attribute setzen
      newCell.textContent = "xx"; // z.B. leer
      // newCell.classList.add('meine-klasse');
    });
  };

  plugin.goPageEnd = function (index, event) {
    console.log(`goPageEnd(index: ${index}, event: ${event})`);

    if (index !== 1) {
      return;
    }

    const table = document.querySelector("#xdevices > table");

    console.log(table);

    Array.from(table.rows).forEach((row) => {
      // row.insertCell(1) erzeugt eine neue <td> an Spaltenindex 1
      const newCell = row.insertCell(1);
      // Optional: Inhalt oder Attribute setzen
      newCell.textContent = "xx"; // z.B. leer
      // newCell.classList.add('meine-klasse');
    });
  };

  plugin.server_startup = function () {
    console.log("foooooooooooooooooooooooooo");
  };

  return plugin;
};
