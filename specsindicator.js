// consoleLogger.js
var plugin = {};

// Dieser Hook läuft im Browser, sobald die UI fertig geladen ist
plugin.onWebUIStartupEnd = function () {
  console.log("✅ ConsoleLogger-Plugin geladen!");
};

// Exportiere den Hook in die Web-UI-Ebene
plugin.exports = ["onWebUIStartupEnd"];

module.exports = plugin;
