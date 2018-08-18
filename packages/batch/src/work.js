'use strict';

var Fs = require('fs');

module.exports = {

  exchangeSceneWalker(str) {
    var walker = Fs.readFileSync(Editor.url('packages://batch/src/walkerTemplate.js', "utf8"), "utf8");
    walker = walker.replace("//loadscript", str);
    Fs.writeFileSync(Editor.url('packages://batch/src/walker.js'), walker);
  },

  getScript(fileName) {
    let url = Editor.url('packages://batch/runScripts/' + fileName + '.js', "utf8");
    return Fs.readFileSync(url, "utf8");
  },

  runScript(cb) {
    Editor.Scene.callSceneScript('batch', 'runScript', function (err, msg) {
      if (err) {
        Editor.error(err);
      }
      else {
        Editor.success(msg);
      }
      cb();
    });
  }

};