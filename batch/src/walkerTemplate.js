'use strict';

module.exports = {
  'runScript': function (event) {
    try {
      //loadscript
    }
    catch (err) {
      event.reply(err, null);
      return;
    }
    event.reply(null, "script runned");
  }
};