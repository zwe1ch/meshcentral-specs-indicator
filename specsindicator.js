module.exports.specsindicator = function (parent) {
  var plugin = {};
  plugin.parent = parent;
  plugin.meshServer = parent.parent;
  plugin.db = null;

  plugin.exports = ["onWebUIStartupEnd", "goPageStart", "goPageEnd"];

  plugin.onWebUIStartupEnd = function () {
    const ver = 14;
    console.log("onWebUIStartupEnd: " + ver);
  };

  plugin.goPageStart = function (index, event) {
    const ver = 14;
    console.log("goPageStart: " + ver);
    console.log("index: " + index);
  };

  plugin.goPageEnd = function (index, event) {
    const ver = 14;
    console.log("goPageEnd: " + ver);
    console.log("index: " + index);
  };

  plugin.server_startup = function () {
    console.log("foooooooooooooooooooooooooo");
  };

  return plugin;
};
