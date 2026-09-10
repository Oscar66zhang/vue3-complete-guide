<template>
  <div class="wrapper">
    <div class="title">地址选择</div>

    <!-- 加载中 -->
    <div class="loading" v-if="loading">
      <div class="loading__dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="loading__title">正在获取收货地址</div>

      <div class="loading__desc">请稍候片刻</div>
    </div>

    <!-- 暂无地址 -->
    <div class="empty" v-else-if="addressList.length === 0">
      <div class="empty__icon iconfont icon-position"></div>

      <div class="empty__title">暂无收货地址</div>

      <div class="empty__desc">添加一个收货地址吧</div>

      <router-link class="empty__button" to="/addressEdit"> 新建地址 </router-link>
    </div>

    <!-- 地址列表 -->
    <div class="address" v-else>
      <div
        class="address__item"
        v-for="address in addressList"
        :key="address.id"
        @click="handleAddressClick(address.id)"
      >
        <!-- 用户姓名、手机号 -->
        <div class="address__item__header">
          <span class="address__item__name">
            {{ address.name }}
          </span>

          <span class="address__item__phone">
            {{ address.phone }}
          </span>

          <!-- 默认地址 -->
          <span class="address__item__default" v-if="address.isDefault"> 默认 </span>
        </div>

        <!-- 国家 / 州 / 城市 -->
        <div class="address__item__location">
          {{ address.country }}
          {{ address.state }}
          {{ address.city }}
          {{ address.zipCode }}
        </div>

        <!-- 详细地址 -->
        <div class="address__item__address">
          {{ address.address }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { get } from '../../utils/request.js';
import { useRoute, useRouter } from 'vue-router';

// 地址列表相关逻辑
const useAddressListEffect = () => {
  // 地址列表
  const addressList = ref([]);
  const loading = ref(true);
  // 获取地址列表
  const getAddressList = async () => {
    try {
      const result = await get('/user/address');

      if (result?.errno === 0) {
        addressList.value = result.data || [];
      } else {
        addressList.value = [];
      }
    } catch (error) {
      console.log('获取地址列表失败:', error);
      addressList.value = [];
    } finally {
      loading.value = false;
    }
  };

  return {
    addressList,
    loading,
    getAddressList,
  };
};

export default {
  name: 'AddressSelect',
  setup() {
    const router = useRouter();
    const route = useRoute();
    // 获取地址列表逻辑
    const { loading, addressList, getAddressList } = useAddressListEffect();

    const handleAddressClick = (id) => {
      const path = route.query.path;
      router.push(`${path}?addressId=${id}`);
    };

    // 页面加载完成后请求地址列表
    onMounted(() => {
      getAddressList();
    });

    return {
      addressList,
      loading,
      handleAddressClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';

.wrapper {
  overflow-y: scroll;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: $darkBgColor;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 1rem);
  text-align: center;

  &__dots {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      width: 0.08rem;
      height: 0.08rem;
      margin: 0 0.04rem;
      border-radius: 50%;
      background: #e93b3b;
      animation: loading-dot 1.2s infinite ease-in-out;

      &:nth-child(2) {
        animation-delay: 0.15s;
      }

      &:nth-child(3) {
        animation-delay: 0.3s;
      }
    }
  }

  &__title {
    margin-top: 0.16rem;
    font-size: 0.15rem;
    color: $content-fontcolor;
  }

  &__desc {
    margin-top: 0.06rem;
    font-size: 0.12rem;
    color: $light-fontColor;
  }
}

@keyframes loading-dot {
  0%,
  80%,
  100% {
    transform: scale(0.7);
    opacity: 0.4;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes loading-dot {
  0%,
  80%,
  100% {
    transform: scale(0.7);
    opacity: 0.4;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.title {
  position: relative;

  @include title;
}

.address {
  padding: 0.16rem 0.18rem;

  &__item {
    position: relative;
    box-sizing: border-box;
    padding: 0.18rem 0.52rem 0.18rem 0.16rem;
    margin-bottom: 0.16rem;
    background: $bgColor;
    border-radius: 0.08rem;

    &__header {
      display: flex;
      align-items: center;
      line-height: 0.22rem;
    }

    &__name {
      font-size: 0.16rem;
      font-weight: 500;
      color: $content-fontcolor;
    }

    &__phone {
      margin-left: 0.12rem;
      font-size: 0.14rem;
      color: $light-fontColor;
    }

    &__default {
      box-sizing: border-box;
      margin-left: 0.1rem;
      padding: 0 0.06rem;
      line-height: 0.18rem;
      border: 0.01rem solid #e93b3b;
      border-radius: 0.02rem;
      font-size: 0.1rem;
      color: #e93b3b;
    }

    &__location {
      margin-top: 0.1rem;
      line-height: 0.2rem;
      font-size: 0.13rem;
      color: $light-fontColor;
    }

    &__address {
      margin-top: 0.04rem;
      line-height: 0.22rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }

    &__arrow {
      position: absolute;
      right: 0.16rem;
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
      font-size: 0.2rem;
      color: $light-fontColor;
    }
  }
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  text-align: center;

  &__icon {
    font-size: 0.5rem;
    color: $light-fontColor;
  }

  &__title {
    margin-top: 0.2rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }

  &__desc {
    margin-top: 0.08rem;
    font-size: 0.13rem;
    color: $light-fontColor;
  }

  &__button {
    box-sizing: border-box;
    width: 1.2rem;
    height: 0.36rem;
    margin-top: 0.24rem;
    line-height: 0.36rem;
    border-radius: 0.18rem;
    text-align: center;
    text-decoration: none;
    font-size: 0.14rem;
    color: #fff;
    background: #e93b3b;
  }
}
</style>
