'use strict';

var Fs = require('fs');

module.exports = {

  exchangeSceneWalker(str) {
    var walker = Fs.readFileSync(Editor.url('packages://batch/src/walkerTemplate.js', "utf8"), "utf8");
    walker = walker.replace("//loadscript", str);
    Fs.writeFileSync(Editor.url('packages://batch/src/walker.js'), walker);
  },

  getScript(fileName) {
    var url = Editor.url('packages://batch/runScripts/' + fileName, "utf8");
    return Fs.readFileSync(url, "utf8");
  },

  runScript(cb) {
    // !! 这里如果执行过一个脚本后马上切换脚本再运行的话 会把第一个脚本再执行一次
    setTimeout(()=>{
      Editor.Scene.callSceneScript('batch', 'runScript', function (err, msg) {
        if (err) {
          Editor.error(err);
        }
        else {
          Editor.success(msg);
        }
        cb();
      });
    },1000);
  },

  getFileList() {
    var path = Editor.url('packages://batch/runScripts', "utf8");
    var files = Fs.readdirSync(path);

    var returner = [];
    for (var i = 0; i < files.length; ++i) {
      returner.push(files[i]);
      // if (files[i].test(/\.js$/)) {
        
      // }
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