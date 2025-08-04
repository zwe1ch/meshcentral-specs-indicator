module.exports = function (parent, plugin) {
  plugin.onWebUIStartupEnd = () => {
    // Registriert Client-Funktion im Browser
    parent.addTestColumn();
  };
};
