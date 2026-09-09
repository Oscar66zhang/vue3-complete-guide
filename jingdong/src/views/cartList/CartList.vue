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
    <div v-if="Object.keys(list).length === 0" class="empty">
      <i class="empty__icon iconfont icon-gouwuchekong"></i>

      <div class="empty__title">购物车还是空的</div>

      <div class="empty__desc">快去挑选一些喜欢的商品吧</div>

      <button class="empty__button" @click="handleGoShopping">去逛逛</button>
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

    // 跳转到购物车
    const handleCartClick = (key) => {
      router.push(`/orderConfirmation/${key}`);
    };

    // 跳转到首页
    const handleGoShopping = () => {
      router.push('/');
    };

    return { list, handleCartClick, handleGoShopping };
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
.wrapper {
  overflow-y: auto;
  @include fix-content;
  background: $darkBgColor;
}

.title {
  @include title;
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

.empty {
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__icon {
    margin-bottom: 0.16rem;
    font-size: 0.56rem;
    line-height: 1;
  }

  &__title {
    margin-bottom: 0.08rem;
    font-size: 0.16rem;
    font-weight: 500;
    color: $content-fontColor;
  }

  &__desc {
    margin-bottom: 0.2rem;
    font-size: 0.13rem;
    color: $light-fontColor;
  }

  &__button {
    width: 1.2rem;
    height: 0.36rem;
    border: none;
    border-radius: 0.18rem;
    background: $btn-bgColor;
    color: $bgColor;
    font-size: 0.14rem;
    cursor: pointer;
  }
}
</style>
