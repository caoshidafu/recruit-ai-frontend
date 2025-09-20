const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 解决 CodeSandbox 中的 Invalid Host header 错误
    allowedHosts: 'all',
    // 或者可以使用以下配置（推荐）
    // allowedHosts: [
    //   '.csb.app',
    //   '.codesandbox.io'
    // ],
    // 禁用主机检查（不推荐在生产环境使用）
    // disableHostCheck: true,
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  }
})
