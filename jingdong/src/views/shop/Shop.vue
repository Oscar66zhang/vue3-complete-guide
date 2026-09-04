<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont icon-back" @click="handleBackClick"></div>
      <div class="search__content">
        <span class="search__content__icon iconfont icon-search"></span>
        <input class="search__content__input" placeholder="搜索商品" />
      </div>
    </div>
    <ShopInfo :item="item" :hide-border="true" v-if="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import ShopInfo from '@/components/ShopInfo.vue';
import { get } from '../../utils/request';
import { reactive, toRefs } from 'vue';
import Content from './Content.vue';
import Cart from './Cart.vue';

// 自定义 Hook，用于获取店铺信息
const useShopInfoEffect = () => {
  const route = useRoute(); // 当前路由信息，用来读取“当前页面是谁、参数是什么”
  const data = reactive({
    item: {},
  });
  const getItemData = async () => {
    const result = await get(`/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);
  return { item, getItemData };
};

// 自定义 Hook，用于处理返回路由逻辑
const useBackRouterEffect = () => {
  const router = useRouter(); // 路由器实例，用来控制“跳转”
  const handleBackClick = () => {
    router.back();
  };
  return { handleBackClick };
};

export default {
  name: 'ShopView',
  components: {
    ShopInfo,
    Content,
    Cart,
  },
  setup() {
    const { item, getItemData } = useShopInfoEffect();
    const { handleBackClick } = useBackRouterEffect();

    getItemData();

    return {
      item,
      handleBackClick,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../../style/variable.scss';

.wrapper {
  padding: 0 0.18rem;
}

.search {
  display: flex;
  margin: 0.14rem 0 0.04rem 0;
  line-height: 0.32rem;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: $content-fontColor;
    }
    &__input {
      display: block;
      width: 100%;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: none;
      height: 0.32rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
