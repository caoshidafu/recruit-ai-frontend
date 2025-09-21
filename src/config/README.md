# 全局域名配置说明

## 简单配置方式

项目现在使用简单的全局域名配置文件：`src/config/baseURL.js`

### 如何修改后端接口域名

1. 打开 `src/config/baseURL.js` 文件
2. 修改 `BASE_URL` 的值
3. 保存文件即可

### 配置示例

```javascript
// 开发环境
const BASE_URL = 'http://localhost:8080/recruit/ai';

// 测试环境  
const BASE_URL = 'http://test-server.com/recruit/ai';

// 生产环境
const BASE_URL = 'https://api.your-domain.com/recruit/ai';
```

### 使用方式

所有API请求会自动使用这个baseURL：

```javascript
import { get, post } from '../api/index.js';

// 实际请求: http://localhost:8080/recruit/ai/jobs
const jobs = await get('/jobs');

// 实际请求: http://localhost:8080/recruit/ai/candidates  
const candidates = await post('/candidates', data);
```

## 注意事项

- 只需要修改一个文件就能切换所有接口的域名
- 确保域名格式正确，包含协议（http://或https://）
- 不要在域名末尾添加斜杠（/）
