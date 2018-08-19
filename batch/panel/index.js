var Fs = require('fs');
var Work = require(Editor.url('packages://batch/src/work.js', 'utf8'));

Editor.Panel.extend({
  // css style for panel
  style: Fs.readFileSync(Editor.url('packages://batch/panel/index.css', 'utf8')),

  // html template for panel
  template: Fs.readFileSync(Editor.url('packages://batch/panel/index.html', 'utf8')),

  // element and variable binding
  $: {
    btn: "#run",
    loading: "#loading",
    markdown: "#markdown",
    select: "#select",
    update: "#update"
  },

  // method executed when template and styles are successfully loaded and initialized
  ready() {

    this.updateSelect();
    this.updateScript();

    this.$btn.addEventListener('confirm', () => {
      this.$loading.style.display = 'block';
      this.runScript();
    });

    this.$update.addEventListener('confirm', () => {
      this.updateSelect();
      this.updateScript();
    });

    this.$select.addEventListener('change', () => {
      this.updateMarkDown();
      this.updateScript();
    });

    this.$loading.style.display = 'none';
  },

  // register your ipc messages here
  messages: {

  },

  addSelect(name, val) {
    var node = document.createElement("option");
    node.value = val;
    node.innerHTML = name;
    this.$select.appendChild(node);
  },
  cleanSelect() {
    while (this.$select.childNodes.length > 0) {
      this.$select.removeChild(this.$select.childNodes[0]);
    }
  },
  updateSelect() {
    this.cleanSelect();
    var files = Work.getFileList();
    for (var i = 0; i < files.length; ++i) {
      this.addSelect(files[i], files[i]);
    }
    if (files[0]) {
      this.$select.value = files[0];
    }
    else {
      this.$select.value = "";
    }
    this.updateMarkDown();
  },
  updateMarkDown() {
    if (this.$select.value === "") {
      this.$markdown.value = "";
      return;
    };
    var script = Work.getScript(this.$select.value);
    // 坑!! 这里是用 value 属性控制 markdown 显示的文字内容的
    // 文档不相干的小角落有这么个例子 不小心看到了 不然卡半天
    // 神 tm 知道有这个属性
    this.$markdown.value = `\`\`\`javascript\n${script}\n\`\`\``;
  },
  updateScript() {
    var script = Work.getScript(this.$select.value);
    Work.exchangeSceneWalker(script);
  },
  runScript() {
    Work.runScript(() => {
      this.$loading.style.display = 'none';
    });
  }
});