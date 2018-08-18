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
    markdown: "#markdown"
  },

  // method executed when template and styles are successfully loaded and initialized
  ready() {
    this.$loading.style.display = 'none';

    this.$btn.addEventListener('confirm', () => {
      this.$loading.style.display = 'block';
      let script = Work.getScript("test");

      // 坑!! 这里是用 value 属性控制 markdown 显示的文字内容的
      // 文档不相干的小角落有这么个例子 不小心看到了 不然卡半天
      // 神 tm 知道有这个属性
      this.$markdown.value = `\`\`\`javascript\n${script}\n\`\`\``;

      Editor.log(
        `
      \`\`\`javascript
      ${script}
      \`\`\`
      `);

      Work.exchangeSceneWalker(script);
      Work.runScript(() => {
        this.$loading.style.display = 'none';
      });
    });

  },

  // register your ipc messages here
  messages: {

  }
});