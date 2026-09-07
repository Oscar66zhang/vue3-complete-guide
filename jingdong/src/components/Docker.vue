<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :key="item.text"
      :class="['docker__item', { 'docker__item--active': index === currentIndex }]"
    >
      <router-link :to="item.to">
        <i :class="['iconfont', item.icon]"></i>
        <div class="docker__title">
          {{ item.text }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DockerView',
  props: ['currentIndex'],
  setup() {
    const dockerList = [
      {
        icon: 'icon-homefill',
        text: '首页',
        to: { name: 'Home' },
      },
      {
        icon: 'icon-cart',
        text: '购物车',
        to: { name: 'CartList' },
      },
      {
        icon: 'icon-order',
        text: '订单',
        to: { name: 'OrderList' },
      },
      {
        icon: 'icon-my',
        text: '我的',
        to: { name: 'Home' },
      },
    ];

    return { dockerList };
  },
};
</script>

<style lang="scss" scoped>
@import '../style/variable.scss';
@import '../style/mixins.scss';

.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  color: $content-fontcolor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.07rem 0.02rem 0;
      font-size: 0.18rem;
    }

    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
