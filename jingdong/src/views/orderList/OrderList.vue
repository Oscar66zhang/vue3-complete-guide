<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title">
          沃尔玛
          <span class="order__status">
            {{ item.isCanceled ? '已取消' : '已下单' }}
          </span>
        </div>

        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
              <img class="order__content__img" :src="innerItem.imgUrl" v-if="innerIndex <= 3" />
            </template>
          </div>
          <div class="order__info">
            <div class="order__info__price">¥{{ item.totalPrice }}</div>
            <div class="order__info__count">共 {{ item.totalNumber }} 件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue';
import { get } from '../../utils/request';
import Docker from '../../components/Docker.vue';
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getNearbyList = async () => {
    const result = await get('/order');
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data;
      orderList.forEach((order) => {
        const products = order.products;
        let totalPrice = 0;
        let totalNumber = 0;
        products.forEach((product) => {
          totalNumber += product?.sales || 0;
          totalPrice += product?.price * product?.sales || 0;
        });
        order.totalPrice = totalPrice;
        order.totalNumber = totalNumber;
      });

      data.list = result.data;
    }
    console.log('data:', data);
  };
  getNearbyList();
  const { list } = toRefs(data);
  return { list };
};
export default {
  name: 'OrderList',
  components: {
    Docker,
  },
  setup() {
    const { list } = useOrderListEffect();

    return { list };
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

.orders {
  .order {
    margin: 0.16rem 0.18rem;
    padding: 0.16rem;
    background: $bgColor;
    &__title {
      margin-bottom: 0.16rem;
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__status {
      float: right;
      font-size: 0.14rem;
      color: $light-fontColor;
    }
    &__content {
      display: flex;
      &__imgs {
        flex: 1;
      }
      &__img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.12rem;
      }
    }
    &__info {
      width: 0.7rem;
      &__price {
        margin-bottom: 0.04rem;
        font-size: 0.14rem;
        color: $hight-fontColor;
        text-align: right;
      }
      &__count {
        line-height: 0.14rem;
        font-size: 0.12rem;
        color: $content-fontcolor;
        text-align: right;
      }
    }
  }
}
</style>
