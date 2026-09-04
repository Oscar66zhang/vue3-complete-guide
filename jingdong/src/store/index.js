import { createStore } from 'vuex';

// 将购物车数据存储到本地存储中
const setLocalCartList = (state) => {
  const { cartList } = state.cartList;
  const cartListString = JSON.stringify(cartList);
  localStorage.setItem('cartList', cartListString);
};

// 从本地存储中获取购物车数据
const getLocalCartList = () => {
  const cartListString = localStorage.getItem('cartList');
  return cartListString ? JSON.parse(cartListString) : {};
};

/*
createStore 创建仓库
→ app.use(store) 安装仓库
→ useStore() 获取仓库
→ store.state 读取数据
→ store.commit() 修改数据
*/

/**
 * state:     保存全局状态数据
 * mutations: 同步修改 state 中的数据
 * getters:   根据 state 计算出新的数据
 * actions:   执行异步操作，再提交 mutation
 * modules:   store 很大时拆分成多个模块
 */
export default createStore({
  state: {
    // { shopId: { shopName: '', productList: { productId: {} } } }
    cartList: getLocalCartList(),
    /*
        第一层是商铺 ID
         shopId: {
         shopName: '沃尔玛',
         第二层是商品 ID
         第二层内容是商品内容以及购物数量

         productList:{
         productId: {
          _id: '1',
          name: '番茄 250g/份',
          imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
          sales: 10,
          price: 33.6,
          originalPrice: 39.6,
          count: 2,
          },
        }
    }, */
  },

  getters: {},

  mutations: {
    // 修改购物车商品信息
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {},
      };
      let product = shopInfo.productList[productId];
      if (!product) {
        product = {
          ...productInfo,
          count: 0,
        };
      }
      product.count = product.count + payload.num;
      if (payload.num > 0) {
        product.check = true;
      }

      if (product.count < 0) {
        product.count = 0;
      }
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;

      setLocalCartList(state);
    },

    // 修改购物车商品选中状态
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId].productList[productId];
      product.check = !product.check;
      setLocalCartList(state);
    },

    // 清空购物车商品
    cleanCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};
    },

    // 全选/取消全选
    setCartItemsChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId]?.productList;

      if (products) {
        for (const key in products) {
          const product = products[key];
          product.check = true;
        }
      }
      setLocalCartList(state);
    },

    // 改变商品名称
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {},
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },
  },

  actions: {},

  modules: {},
});
