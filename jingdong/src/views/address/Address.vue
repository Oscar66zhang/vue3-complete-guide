<template>
  <div class="wrapper">
    <div class="title">
      我的地址
      <span class="title__create">
        <router-link to="/addressEdit"> 新建 </router-link>
      </span>
    </div>
    <div class="empty" v-if="addressList.length === 0">暂无购物数据</div>

    <div class="address" v-else>
      <div class="address__item" v-for="address in addressList" :key="address.id">
        <p class="address__item__basic">
          {{ address.name }}
          <span class="address__item__phone">{{ address.phone }}</span>
        </p>
        <p class="address__item__address">{{ address.address }}</p>
        <i class="iconfont icon-back"></i>
      </div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import Docker from '../../components/Docker.vue';
import { get } from '../../utils/request';
import { ref } from 'vue';

// 地址列表相关逻辑
const useAddressListEffect = () => {
  const addressList = ref([]);

  const getAddressList = async () => {
    const result = await get('/user/address');
    if (result?.errno === 0 && result?.data?.length) {
      addressList.value = result.data;
    }
  };

  return { addressList, getAddressList };
};

export default {
  name: 'AddressView',
  components: {
    Docker,
  },
  setup() {
    const { addressList, getAddressList } = useAddressListEffect();
    getAddressList();
    return { addressList };
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';

.wrapper {
  overflow-y: auto;
  background: $darkBgColor;
  @include fix-content;
}

.title {
  position: relative;
  @include title;
  &__create {
    position: absolute;
    right: 0.18rem;
    margin-right: 0.18rem;
    font-size: 0.14rem;
    a {
      text-decoration: none;
      color: $content-fontcolor;
    }
  }
}

.address {
  margin: 0.16rem 0.18rem 0 0.18rem;
  &__item {
    position: relative;
    box-sizing: border-box;
    padding: 0.18rem 0.63rem 0.18rem 0.16rem;
    margin-bottom: 0.16rem;
    background: $bgColor;
    border-radius: 0.04rem;
    &__basic {
      line-height: 0.2rem;
      margin: 0;
      font-size: 0.14rem;
      color: $light-fontColor;
    }
    &__phone {
      margin-left: 0.66rem;
    }
    &__address {
      line-height: 0.2rem;
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
  }
  .iconfont {
    position: absolute;
    right: 0.16rem;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
    color: $light-fontColor;
    font-size: 0.2rem;
  }
}

.empty {
  margin-top: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.16rem;
  color: $light-fontColor;
}
</style>
