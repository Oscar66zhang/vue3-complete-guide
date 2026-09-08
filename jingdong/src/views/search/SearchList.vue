<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont icon-back" @click="handleBackClick"></div>
      <div class="search__content">
        <span class="search__content__icon iconfont icon-search"></span>
        <input
          class="search__content__input"
          placeholder="搜索商品"
          v-model="keyword"
          @change="handleSearchInputChange"
        />
      </div>
    </div>
    <router-link :to="`/shop/${item.id}`" v-for="item in searchList" :key="item.id">
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { get } from '../../utils/request';
import ShopInfo from '@/components/ShopInfo.vue';

// 自定义 Hook，用于处理返回路由逻辑
const useBackRouterEffect = () => {
  const router = useRouter(); // 路由器实例，用来控制“跳转”
  const handleBackClick = () => {
    router.back();
  };
  return { handleBackClick };
};

// 搜索列表相关逻辑
const handleSearchInputChange = (e) => {
  const searchList = ref([]);
  const getSearchList = async () => {
    const result = await get('/shop/search');
    if (result?.errno === 0 && result?.data?.length) {
      searchList.value = result.data;
    }
  };

  return { searchList, getSearchList };
};

export default {
  name: 'SearchList',
  components: { ShopInfo },
  setup() {
    const route = useRoute();
    // 搜索词相关逻辑
    const keyword = ref(route.query.keyword || '');

    const { handleBackClick } = useBackRouterEffect();
    // 获取搜索列表
    const { searchList, getSearchList } = handleSearchInputChange();
    getSearchList();
    return {
      keyword,
      handleBackClick,
      searchList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
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
