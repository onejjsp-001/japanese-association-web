# ことばの枝｜日语联想学习

一个手机端优先的日语联想学习与随手记录网站。使用原生 HTML、CSS 和 JavaScript，不需要构建步骤或后端服务。

在线网站：<https://onejjsp-001.github.io/japanese-association-web/>

## 当前模块

- 日期
- 旧版人体
- 人体联想（新版）
- 数量与量词
- 水果联想
- 随手联想（测试版）

## 本地运行

可以直接打开 `index.html`，也可以在项目目录启动静态文件服务：

```sh
python -m http.server 8000
```

然后访问 <http://localhost:8000/>。

## 数据存储与备份

- 固定学习知识保存在项目代码中。
- 个人随手联想保存在当前浏览器的 IndexedDB 中。
- GitHub Pages 不负责个人数据云同步。
- 更换设备或浏览器前，请在“随手联想”中导出 JSON 备份，并在新环境中导入。
