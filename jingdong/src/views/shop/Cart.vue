<template>
  <div class="cart">
    <div class="product">
      <div class="product__item" v-for="item in productList" :key="item._id">
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
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="https://api.iconify.design/ph/shopping-cart-simple-fill.svg?color=%234fb0f9"
          class="check__icon__img"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;{{ price.toFixed(2) }}</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

// 获取购物车数据
const useCartEffect = (shopId) => {
  const store = useStore();
  const cartList = store.state.cartList;

  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId,
      productId,
      productInfo,
      num,
    });
  };

  // 总数
  const total = computed(() => {
    const productList = cartList[shopId];
    let count = 0;
    if (productList) {
      for (const i in productList) {
        const product = productList[i];
        count += product.count;
      }
    }
    return count;
  });
  // 价格
  const price = computed(() => {
    const productList = cartList[shopId];
    let count = 0;
    if (productList) {
      for (const i in productList) {
        const product = productList[i];
        count += product.count * product.price;
      }
    }
    return count;
  });

  // 产品列表
  const productList = computed(() => {
    const productList = cartList[shopId] || [];
    return productList;
  });

  return { total, price, productList, changeCartItemInfo };
};

export default {
  name: 'CartView',
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { total, price, productList, changeCartItemInfo } = useCartEffect(shopId);
    return { total, price, productList, changeCartItemInfo };
  },
};
</script>

<style scoped lang="scss">
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.product {
  overflow-y: scroll;
  flex: 1;
  background: #fff;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;

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
      bottom: 0.12rem;
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
    color: #fff;
    text-align: center;
    line-height: 0.49rem;
    font-size: 0.14rem;
  }
}
</style>
