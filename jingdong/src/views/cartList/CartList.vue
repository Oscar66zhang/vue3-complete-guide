<template>
  <div class="wrapper">
    <div class="title">我的全部购物车</div>
    <div class="cart" v-for="(cart, key) in list" :key="key" @click="() => handleCartClick(key)">
      <div class="cart__title">{{ cart.shopName }}</div>
      <div class="cart__item" v-for="(product, innerKey) in cart.productList" :key="innerKey">
        <img class="cart__image" :src="product.imgUrl" />
        <div class="cart__content">
          <p class="cart__content__title">{{ product.name }}</p>
          <p class="cart__content__price">
            <span class="yen">&yen;</span>
            {{ product.price }}x{{ product.count }}
            <span class="cart__content__total"
              ><span class="yen">&yen;</span>{{ (product.price * product.count).toFixed(2) }}</span
            >
          </p>
        </div>
      </div>
      <div class="cart__total">共计{{ cart.total }}件</div>
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>
<script>
import Docker from '../../components/Docker.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CartList',
  components: {
    Docker,
  },
  setup() {
    const list = JSON.parse(localStorage.cartList || '[]');
    // 计算机购物车总件数的逻辑
    for (const i in list) {
      const cart = list[i];
      const productList = cart.productList;
      let total = 0;
      for (const j in productList) {
        const product = productList[j];
        total += product.count;
      }
      cart.total = total;
    }
    // 处理点击
    const router = useRouter();

    const handleCartClick = (key) => {
      router.push(`/orderConfirmation/${key}`);
    };

    return { list, handleCartClick };
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: rgb(248, 248, 248);
}

.title {
  line-height: 0.44rem;
  background: $bgColor;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
}

.cart {
  margin: 0.16rem;
  padding-bottom: 0.16rem;
  background: $bgColor;
  &__title {
    padding: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
    @include ellipsis;
  }
  &__item {
    display: flex;
    padding: 0 0.16rem 0.16rem 0.16rem;
    margin-bottom: 0.16rem;
  }
  &__image {
    margin-right: 0.16rem;
    width: 0.46rem;
    height: 0.46rem;
  }
  &__content {
    flex: 1;
    .yen {
      font-size: 0.12rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: 0;
      font-size: 0.14rem;
      color: $hight-fontColor;
    }
    &__total {
      float: right;
      color: $dark-fontColor;
    }
  }
  &__total {
    line-height: 0.28rem;
    margin: 0 0.16rem 0.16rem 0.16rem;
    font-size: 0.14rem;
    color: $light-fontColor;
    text-align: center;
    background: $search-bgColor;
  }
}
</style>
