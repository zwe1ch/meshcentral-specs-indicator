/**
 * MeshCentral Plugin: Console Log
 * Schreibt beim Laden der MeshCentral-Web-UI eine Log-Nachricht in die Browser-Konsole.
 */
module.exports = function (parent, plugin) {
  // 1) Hier die Funktion benennen, die im Browser verfügbar sein soll
  plugin.exports = ["logOnDeviceList"];

  // 2) Implementierung der Browser-Funktion
  plugin.logOnDeviceList = function (MC) {
    MC.api.goPageEnd((pageId, ev) => {
      // Nur auf der "Meine Geräte"-Seite ausführen
      if (pageId !== MC.tabs.deviceListPageId) return;
      console.log(">> ConsoleLog Plugin aktiv auf Seite:", pageId);
    });
  };

  // 3) Hook nach dem vollständigen Laden der Web-UI
  plugin.onWebUIStartupEnd = () => {
    parent.logOnDeviceList();
  };
};
