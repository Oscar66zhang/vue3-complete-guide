<template>
  <div class="position">
    <i class="iconfont icon-position position__icon"></i>
    北京市东城区东长安街1号
    <i class="iconfont icon-bell position__notice"></i>
  </div>

  <router-link to="/search">
    <div class="search">
      <i class="iconfont icon-search"></i>
      <span class="search__text">山姆会员商店优惠商品</span>
    </div>
  </router-link>

  <div class="banner">
    <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" />
  </div>

  <div class="icons">
    <div class="icons__item" v-for="item in iconsList" :key="item.id">
      <img class="icons__item__img" :src="item.imgUrl" />
      <p class="icons__item__desc">{{ item.text }}</p>
    </div>
  </div>

  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',

  setup() {
    const iconsList = [
      {
        id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        text: '超市便利',
      },
      {
        id: 2,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png',
        text: '菜市场',
      },
      {
        id: 3,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/水果店.png',
        text: '水果店',
      },
      {
        id: 4,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/家居.png',
        text: '家居时尚',
      },
      {
        id: 5,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png',
        text: '烘焙蛋糕',
      },
      {
        id: 6,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/签到.png',
        text: '签到',
      },
      {
        id: 7,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png',
        text: '鲜花绿植',
      },
      {
        id: 8,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png',
        text: '医药健康',
      },
      {
        id: 9,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png',
        text: '大牌免运',
      },
      {
        id: 10,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/红包.png',
        text: '红包套餐',
      },
    ];

    return {
      iconsList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  &__icon {
    position: relative;
    top: 0.01rem;
    margin-right: 0.08rem;
    font-size: 0.2rem;
  }
  &__notice {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
  color: $content-fontcolor;
}

.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background: $search-bgColor;
  color: $content-fontColor;
  border-radius: 0.16rem;
  .iconfont {
    display: inline-block;
    padding: 0 0.08rem 0 0.16rem;
    font-size: 0.16rem;
  }
  &__text {
    display: inline-block;
    font-size: 0.14rem;
  }
}

.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}

.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background: $content-bgColor;
}
</style>
