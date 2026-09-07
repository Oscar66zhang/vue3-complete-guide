# Vue 3 完整指南学习项目

这是一个用于学习和练习 Vue 3 的代码仓库，内容从基础语法、组件与动画逐步延伸到 Composition API、Vue CLI 工程化，以及一个仿京东到家移动端项目。

## 仓库内容

| 目录 | 内容 |
| --- | --- |
| `01.vue-syntax-basics` | Vue 基础语法 |
| `02.vue3-basic-syntax` | Vue 3 核心语法练习 |
| `03.component-exploration` | 组件相关练习 |
| `04.vue-animations` | 动画与过渡效果 |
| `05.vue-advanced` | Vue 进阶内容 |
| `06.composition-api` | Composition API 练习 |
| `07.vue-development-tooling` | Vue 工程化与开发工具 |
| `jingdong` | 仿京东到家移动端综合项目 |

## Jingdong 项目

`jingdong` 是仓库中的主要综合实践项目，目前包含：

- 用户注册与登录
- 首页及附近店铺展示
- 店铺详情和商品分类
- 购物车商品增减、选择与本地持久化
- 购物车列表
- 订单确认与提交
- 订单列表

### 技术栈

- Vue 3
- Vue Router 4
- Vuex 4
- Axios
- Sass / SCSS
- Vue CLI 5

### 本地运行

请先安装 Node.js，然后在仓库根目录执行：

```bash
cd jingdong
npm install
npm run serve
```

启动完成后，按照终端提示在浏览器中访问项目。

### 接口配置

开发环境通过 `/api` 代理请求后端接口，代理地址配置在 `jingdong/.env.development`：

```env
VUE_APP_PROXY_TARGET=http://127.0.0.1:4523/m1/8780078-8570225-default
```

运行项目前，请确保该接口服务可访问；也可以将它修改为自己的 Mock 或后端服务地址。

### 常用命令

在 `jingdong` 目录下执行：

```bash
# 启动开发服务器
npm run serve

# 生成生产构建
npm run build

# 检查代码规范
npm run lint
```

## 学习说明

仓库中的各章节目录主要用于记录课程示例和练习代码。若想直接查看较完整的 Vue 3 应用，可以从 `jingdong` 项目开始。
