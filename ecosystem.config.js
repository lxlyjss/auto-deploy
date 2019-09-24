module.exports = {
  apps: [
    {
      // 测试环境
      name: "auto-deploy",
      // 项目启动入口文件
      script: "./app.js",
      // 项目环境变量
      env: {
        "NODE_ENV": "development"
      }
    }
  ]
}
