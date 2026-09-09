<template>
  <div class="wrapper">
    <div class="search">
      <div class="iconfont icon-search"></div>
      <input
        class="search__area"
        type="text"
        placeholder="山姆会员商店优惠商品"
        @change="handleSearchChange"
      />
      <div class="search__cancel" @click="handleCancelSearchClick">取消</div>
    </div>
    <div class="area" v-if="history.length">
      <h4 class="area__title">
        搜索历史
        <span class="area__title__clear" @click="handleClearHistoryClick">清除搜索历史</span>
      </h4>
      <ul class="area__list">
        <li class="area__list__item" v-for="item in history" :key="item">{{ item }}</li>
      </ul>
    </div>
    <!-- 热门搜索 -->
    <div class="area">
      <h4 class="area__title">热门搜索</h4>
      <ul class="area__list">
        <li
          class="area__list__item"
          v-for="item in hotWordList"
          :key="item.id"
          @click="() => goToSearchList(item.keyword)"
        >
          {{ item.keyword }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { get } from '../../utils/request';

// 热词相关逻辑
const useHotWordListEffect = () => {
  const hotWordList = ref([]);

  const getHotWordList = async () => {
    const result = await get('/search/hot-list');
    if (result?.errno === 0 && result?.data?.length) {
      hotWordList.value = result.data;
    }
  };

  return { hotWordList, getHotWordList };
};

export default {
  name: 'SearchView',
  setup() {
    const router = useRouter();
    const history = ref(JSON.parse(localStorage.history || '[]'));
    // 当用户输入搜索内容后，执行的操作
    const handleSearchChange = (e) => {
      const searchValue = e.target.value;
      if (!searchValue) return;
      const hasValue = history.value.find((item) => item === searchValue);
      if (!hasValue) {
        history.value.push(searchValue);
        // localStorage.history 就是在浏览器的本地存储里，读取或保存一个名字叫 history 的数据
        // localStorage.setItem('history', JSON.stringify(history.value));
        localStorage.history = JSON.stringify(history.value);
      }
      router.push(`/searchList?keyword=${searchValue}`);
    };

    // 当清理历史记录时，执行的操作
    const handleClearHistoryClick = () => {
      history.value = [];
      localStorage.history = JSON.stringify([]);
    };

    // 当取消搜索时，执行的操作
    const handleCancelSearchClick = () => {
      router.back();
    };

    // 页面跳转逻辑
    const goToSearchList = (keyword) => {
      router.push(`/searchList?keyword=${keyword}`);
    };

    // 使用热词逻辑
    const { hotWordList, getHotWordList } = useHotWordListEffect();

    getHotWordList();

    return {
      history,
      handleSearchChange,
      handleClearHistoryClick,
      handleCancelSearchClick,
      hotWordList,
      goToSearchList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
.wrapper {
  margin: 0 0.18rem;
  .search {
    position: relative;
    display: flex;
    line-height: 0.32rem;
    margin-top: 0.16rem;
    color: $content-fontcolor;
    .iconfont {
      position: absolute;
      left: 0.16rem;
      color: $content-fontColor;
    }
    &__area {
      flex: 1;
      padding: 0 0.12rem 0 0.44rem;
      background: $search-bgColor;
      border-radius: 0.16rem;
      border: none;
      outline: none;
      font-size: 0.14rem;
    }
    &__cancel {
      margin-left: 0.12rem;
      font-size: 0.16rem;
    }
  }
  .area {
    margin-top: 0.24rem;
    &__title {
      line-height: 0.22rem;
      margin: 0;
      font-size: 0.16rem;
      font-weight: normal;
      color: $content-fontcolor;
      &__clear {
        float: right;
        font-size: 0.14rem;
      }
    }
    &__list {
      margin: 0 0 0 -0.1rem;
      padding: 0;
      list-style-type: none;
      &__item {
        margin-left: 0.1rem;
        margin-top: 0.12rem;
        display: inline-block;
        padding: 0 0.1rem;
        line-height: 0.32rem;
        font-size: 0.14rem;
        background: $search-bgColor;
        color: $medium-fontColor;
      }
    }
  }
}
</style>
