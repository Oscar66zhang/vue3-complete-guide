# Vue 3 完整指南学习项目

这是一个循序渐进的 Vue 3 学习与实践仓库。前半部分按主题保存可以直接在浏览器中运行的小型示例，后半部分包含 Vue CLI 工程化练习，以及一个功能较完整的仿“京东到家”移动端项目。

## 项目内容

| 目录 | 学习内容 | 运行方式 |
| --- | --- | --- |
| `01.vue-syntax-basics` | Vue 基础语法与条件渲染 | 直接打开 HTML 文件 |
| `02.vue3-basic-syntax` | Vue 3 核心语法、事件、表单与生命周期 | 直接打开 HTML 文件 |
| `03.component-exploration` | 组件、插槽、动态组件等组件化实践 | 直接打开 HTML 文件 |
| `04.vue-animations` | Transition、动画与过渡效果 | 直接打开 HTML 文件 |
| `05.vue-advanced` | Vue 进阶特性与常见模式 | 直接打开 HTML 文件 |
| `06.composition-api` | Composition API 系列练习 | 直接打开 HTML 文件 |
| `07.vue-development-tooling` | Vue CLI、路由、状态管理等工程化示例 | 进入对应 demo 安装依赖后运行 |
| `jingdong` | 仿京东到家移动端综合项目 | 使用 npm 启动 |

## 综合项目：Jingdong

`jingdong` 是本仓库的主要综合实践项目，围绕移动端到家购物流程搭建，覆盖从登录、浏览商品到地址选择和提交订单的完整业务链路。

### 已实现功能

- 用户注册、登录和前端路由鉴权
- 首页定位信息、快捷入口与附近店铺列表
- 热门搜索、店铺搜索与搜索结果展示
- 店铺详情、商品分类与商品列表
- 购物车商品增减、勾选、清空及本地持久化
- 购物车列表与订单金额计算
- 收货地址列表、新增地址、编辑地址和下单地址选择
- 订单确认、订单提交和历史订单列表
- 路由懒加载、Axios 请求封装、Toast 提示与公共样式复用

### 技术栈

- Vue 3.2
- Vue Router 4
- Vuex 4
- Axios
- Sass / SCSS
- Vue CLI 5
- ESLint

### 目录结构

```text
jingdong/
├─ public/                       # 静态资源与 HTML 模板
├─ src/
│  ├─ assets/                   # 图片资源
│  ├─ components/               # 通用组件（底部导航、店铺信息、Toast）
│  ├─ effects/                  # 可复用业务逻辑
│  ├─ router/                   # 路由配置与登录守卫
│  ├─ store/                    # Vuex 状态管理
│  ├─ style/                    # 全局样式、变量、混入与图标字体
│  ├─ utils/                    # Axios 请求封装
│  ├─ views/                    # 页面级组件
│  ├─ App.vue                   # 根组件
│  └─ main.js                   # 应用入口
├─ jd-home-delivery.apifox.json # Apifox 接口定义
├─ package.json
└─ vue.config.js                # Vue CLI 与开发代理配置
```

## 快速开始

### 环境要求

- Node.js
- npm（项目已提交 `package-lock.json`）

### 安装与启动

```bash
git clone https://github.com/Oscar66zhang/vue3-complete-guide.git
cd vue3-complete-guide/jingdong
npm install
```

在 `jingdong` 目录下创建 `.env.development`，配置本地后端或 Mock 服务地址：

```env
VUE_APP_PROXY_TARGET=http://127.0.0.1:4523/your-api-path
```

然后启动开发服务器：

```bash
npm run serve
```

启动成功后，根据终端输出访问本地地址。应用使用 Hash 路由，未登录时会自动跳转到登录页。

## 接口说明

前端统一通过 `/api` 发起请求，`vue.config.js` 会在开发环境中将请求代理到 `VUE_APP_PROXY_TARGET`。仓库中的 `jingdong/jd-home-delivery.apifox.json` 可以导入 Apifox，用于查看接口定义或搭建本地 Mock 服务。

主要接口模块包括：

- 用户注册与登录
- 首页热门店铺与搜索
- 店铺详情与商品列表
- 收货地址查询、新增与更新
- 订单创建与订单列表

`.env.development` 属于本地环境配置，不会提交到仓库。请根据自己的后端或 Mock 服务填写代理目标。

## 常用命令

以下命令均在 `jingdong` 目录中执行：

```bash
# 启动开发服务器并开启热更新
npm run serve

# 生成生产环境构建
npm run build

# 运行 ESLint 检查
npm run lint
```

## 学习建议

如果刚开始学习 Vue，可以按 `01` 到 `07` 的顺序阅读和运行示例；如果已经了解 Vue 基础，可以直接从 `jingdong/src` 入手，结合路由、状态管理、请求封装和各页面组件理解一个 Vue 3 项目的完整组织方式。

## 说明

本仓库用于 Vue 3 学习、课程练习和个人实践。页面、品牌名称及示例数据仅用于学习演示。
