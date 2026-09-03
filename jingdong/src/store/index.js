import { createStore } from 'vuex';

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
    cartList: {
      // 第一层是商铺 ID
      1: {
        // 第二层是商品 ID
        // 第二层内容是商品内容以及购物数量
        1: {
          _id: '1',
          name: '番茄 250g/份',
          imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
          sales: 10,
          price: 33.6,
          originalPrice: 39.6,
          count: 2,
        },

        2: {
          _id: '2',
          name: '车厘子 250g/份',
          imgUrl: 'http://www.dell-lee.com/imgs/vue3/cherry.png',
          sales: 30,
          price: 33.6,
          originalPrice: 39.6,
          count: 1,
        },

        3: {
          _id: '3',
          name: '螃蟹 250g/份',
          imgUrl: 'http://www.dell-lee.com/imgs/vue3/crab.png',
          sales: 20,
          price: 33.6,
          originalPrice: 39.6,
          count: 1,
        },

        4: {
          _id: '4',
          name: '橙子 250g/份',
          imgUrl: 'http://www.dell-lee.com/imgs/vue3/orange.png',
          sales: 40,
          price: 15.8,
          originalPrice: 19.9,
          count: 3,
        },

        5: {
          _id: '5',
          name: '红富士苹果 500g/份',
          imgUrl:
            'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80',
          sales: 56,
          price: 12.9,
          originalPrice: 16.9,
          count: 1,
        },

        6: {
          _id: '6',
          name: '进口香蕉 500g/份',
          imgUrl:
            'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80',
          sales: 68,
          price: 9.9,
          originalPrice: 12.9,
          count: 2,
        },

        7: {
          _id: '7',
          name: '草莓 250g/盒',
          imgUrl:
            'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=300&q=80',
          sales: 42,
          price: 29.9,
          originalPrice: 35.9,
          count: 1,
        },

        8: {
          _id: '8',
          name: '蓝莓 125g/盒',
          imgUrl:
            'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=300&q=80',
          sales: 35,
          price: 25.8,
          originalPrice: 32.8,
          count: 1,
        },
      },

      // 第二家商铺暂时为空
      2: {},
    },
  },

  getters: {},

  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload;
      let shopInfo = state.cartList[shopId];
      if (!shopInfo) {
        shopInfo = {};
      }
      let product = shopInfo[productId];
      if (!product) {
        product = productInfo;
        product.count = 0;
      }
      product.count = product.count + payload.num;
      if (product.count < 0) {
        product.count = 0;
      }
      shopInfo[productId] = product;
      state.cartList[shopId] = shopInfo;
    },
  },

  actions: {},

  modules: {},
});
