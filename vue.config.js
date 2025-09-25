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
    },
    
    // 跨域代理配置
    proxy: {
      '/api': {
        target: 'https://is-ehr-recruit2.test.gifshow.com',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api': '/recruit'
        },
        onProxyReq: function(proxyReq, req) {
          // 添加必要的请求头
          console.log('代理请求:', req.method, req.url, '-> ', proxyReq.path);
        },
        onProxyRes: function(proxyRes) {
          // 处理响应头，确保跨域
          proxyRes.headers['access-control-allow-origin'] = '*';
          proxyRes.headers['access-control-allow-methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
          proxyRes.headers['access-control-allow-headers'] = 'Content-Type,Authorization,X-Requested-With';
        },
        onError: function(err) {
          console.error('代理错误:', err);
        }
      }
    }
  }
})
