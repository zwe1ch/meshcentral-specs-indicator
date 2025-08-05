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

    const table = document.querySelector("#xdevices > table");

    if (!table) {
      console.log("table not found");

      return;
    } else {
      console.log("table ok");
    }

    console.log(table);

    Array.from(table.rows).forEach((row) => {
      console.log(row);
      // // row.insertCell(1) erzeugt eine neue <td> an Spaltenindex 1
      // const newCell = row.insertCell(1);
      // // Optional: Inhalt oder Attribute setzen
      // newCell.textContent = "xx"; // z.B. leer
      // // newCell.classList.add('meine-klasse');
    });
  };

  plugin.server_startup = function () {
    console.log("foooooooooooooooooooooooooo");
  };

  return plugin;
};
