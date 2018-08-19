'use strict';

module.exports = {
  'runScript': function (event) {
    try {
      let canvas = cc.find("Canvas");
let node = new cc.Node();
node.name = "test";
node.parent = canvas;
    }
    catch (err) {
      event.reply(err, null);
      return;
    }
    event.reply(null, "script runned");
  }
};