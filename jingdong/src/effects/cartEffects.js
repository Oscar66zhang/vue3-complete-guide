import { useStore } from 'vuex';
import { computed } from 'vue';

export const useCommonCartEffect = (shopId) => {
  const store = useStore();
  const cartList = store.state.cartList;
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num });
  };
  // 产品列表
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || '';
    const notEmptyProductList = {};
    for (const i in productList) {
      const product = productList[i];
      if (product.count > 0) {
        notEmptyProductList[i] = product;
      }
    }

    return notEmptyProductList;
  });

  // 商场名称
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || {};
    return shopName;
  });

  // 计算购物车中商品的总数
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList;
    const result = { total: 0, price: 0, allchecked: true };
    if (productList) {
      for (const i in productList) {
        const product = productList[i];
        // 计算购物车中商品的总数
        result.total += product.count;
        // 如果购物车中有商品选中，则计算总价
        if (product.check) {
          result.price += product.count * product.price;
        }
        // 如果购物车中有商品数量大于0，并且没有选中，则全选为false
        if (product.count > 0 && !product.check) {
          result.allchecked = false;
        }
      }
    }
    return result;
  });

  return { changeCartItemInfo, productList, shopName, calculations, cartList };
};
