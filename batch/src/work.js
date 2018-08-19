'use strict';

var Fs = require('fs');

module.exports = {

  exchangeSceneWalker(str) {
    var walker = Fs.readFileSync(Editor.url('packages://batch/src/walkerTemplate.js', "utf8"), "utf8");
    walker = walker.replace("//loadscript", str);
    Fs.writeFileSync(Editor.url('packages://batch/src/walker.js'), walker);
  },

  getScript(fileName) {
    try {
      var url = Editor.url('packages://batch/runScripts/' + fileName, "utf8");
      return Fs.readFileSync(url, "utf8");
    }
    catch (err) {
      return false;
    }
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
  },

  getFileList() {
    var path = Editor.url('packages://batch/runScripts', "utf8");
    var files = Fs.readdirSync(path);

    var returner = [];
    for (var i = 0; i < files.length; ++i) {
      if (/\.js$/.test(files[i])) {
        returner.push(files[i]);
      }
    }

    // for (var i = 0; i < returner.length; ++i) {
    //   Editor.log(returner[i]);
    // }

    // @@ 忽略文件夹
    // @@ 递归遍历文件夹找文件
    // @@ 根据文件夹进行分类
    // @@ 自定义存放路径
    return returner;
  }

};