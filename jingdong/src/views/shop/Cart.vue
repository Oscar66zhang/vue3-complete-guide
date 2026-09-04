<template>
  <div class="mask" v-if="showCart && calculations.total > 0" @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
          <span
            :class="[
              'product__header__icon',
              'iconfont',
              calculations.allchecked ? 'icon-check' : 'icon-unchecked',
            ]"
            >全选</span
          >
        </div>
        <div class="product__header__clear">
          <span class="product__header__clear__btn" @click="() => cleanCartProducts(shopId)"
            >清空购物车</span
          >
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div class="product__item__check">
            <i
              :class="`iconfont ${item.check ? 'icon-check' : 'icon-unchecked'}`"
              @click="() => changeCartItemChecked(shopId, item._id)"
            />
          </div>
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin">&yen;{{ item.originalPrice }}</span>
            </p>
          </div>
          <!-- 减少数据 -->
          <div class="product__number">
            <span
              class="product__number__minus"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, -1);
                }
              "
              >-</span
            >
            {{ item.count || 0 }}
            <!-- 增加数据 -->
            <span
              class="product__number__plus"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, 1);
                }
              "
              >+</span
            >
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="https://api.iconify.design/ph/shopping-cart-simple-fill.svg?color=%234fb0f9"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;{{ calculations.price.toFixed(2) }}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{ name: 'Home' }"> 去结算 </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useCommonCartEffect } from './commonCartEffect';

// 获取购物车数据
const useCartEffect = (shopId) => {
  const store = useStore();
  const { changeCartItemInfo, cartList } = useCommonCartEffect();
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

  // 产品列表
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {};
    return productList;
  });

  // 改变购物车中商品的选中状态
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId });
  };

  // 全选/取消全选
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId });
  };

  // 清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId });
  };

  return {
    calculations,
    productList,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked,
  };
};

// 展示/隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  };
  return {
    showCart,
    handleCartShowChange,
  };
};

export default {
  name: 'CartView',
  setup() {
    const route = useRoute();
    const shopId = route.params.id;

    const {
      calculations,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
    } = useCartEffect(shopId);
    const { showCart, handleCartShowChange } = toggleCartEffect();
    return {
      handleCartShowChange,
      calculations,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      shopId,
      showCart,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bgColor;
}

.product {
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;
  &__header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: 1px solid $content-bgColor;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &__clear {
      flex: 1;
      margin-right: 0.16rem;
      text-align: right;
      &__btn {
        display: inline-block;
        color: $height-fontColor;
      }
    }
    &__all {
      width: 0.64rem;
      margin-left: 0.18rem;
    }
    &__icon {
      display: inline-block;
      margin-right: 0.1rem;
      vertical-align: top;
      color: $btn-bgColor;
      font-size: 0.16rem;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;

    &__check {
      color: $btn-bgColor;
      margin-right: 0.2rem;
      line-height: 0.5rem;
      font-size: 0.2rem;
    }

    &__detail {
      overflow: hidden;
    }

    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }

    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }

    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $height-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }

    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.26rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;
        border: 0.01rem solid $medium-fontColor;
        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &__plus {
        background: $btn-bgColor;
        color: $bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}

.check {
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      padding: 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $height-fontColor;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &__price {
      color: $height-fontColor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    font-size: 0.14rem;
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>
