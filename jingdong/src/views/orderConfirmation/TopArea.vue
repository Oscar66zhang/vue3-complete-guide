<template>
  <div class="top">
    <div class="top__bgcolor"></div>
    <div class="top__header">
      <i class="iconfont top__header__back icon-back" @click="handleBackClick"></i>
      确认订单
    </div>
    <div class="top__receiver" @click="handleAddressClick">
      <div class="top__receiver__title">收货地址</div>

      <!-- 有地址 -->
      <template v-if="hasAddress">
        <div class="top__receiver__address">
          {{ addressInfo.country }}
          {{ addressInfo.state }}
          {{ addressInfo.city }}
          {{ addressInfo.address }}
        </div>

        <div class="top__receiver__info">
          <span class="top__receiver__info__name">
            {{ addressInfo.name }}
          </span>

          <span class="top__receiver__info__phone">
            {{ addressInfo.phone }}
          </span>
        </div>
      </template>

      <!-- 没有地址 -->
      <div v-else class="top__receiver__empty">请选择收货地址</div>

      <i class="iconfont top__receiver__icon icon-back"></i>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { get } from '../../utils/request.js';
export default {
  name: 'TopArea',
  setup() {
    // 单个收货地址信息
    const addressInfo = reactive({
      id: '',
      name: '',
      phone: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      address: '',
      isDefault: false,
    });
    const router = useRouter();
    const route = useRoute();
    const addressId = route.query.addressId;
    const handleAddressClick = () => {
      router.push(`/addressSelect?path=${route.path}`);
    };
    const handleBackClick = () => {
      router.back();
    };

    // 获取单个地址详情
    const getAddressDetail = async () => {
      // 没有 addressId 就不请求
      if (!addressId) {
        return;
      }
      try {
        const result = await get(`/user/address/${addressId}`);
        if (result?.errno === 0) {
          // 将接口数据一次性写入 reactive 对象
          Object.assign(addressInfo, result.data);
        }
      } catch (error) {
        console.log('获取收货地址失败:', error);
      }
    };

    onBeforeMount(() => {
      getAddressDetail();
    });

    return {
      hasAddress: !!addressId,
      addressInfo,
      handleBackClick,
      handleAddressClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba($btn-bgColor, 0) 4%, $btn-bgColor 50%);
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: 0.1rem;
    line-height: 0.24rem;
    color: $bgColor;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      left: 0.18rem;
      font-size: 0.22rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    min-height: 1.11rem;
    background-color: $bgColor;
    border-radius: 0.04rem;
    &__title {
      line-height: 0.22rem;
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__address {
      line-height: 0.2rem;
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }

    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name {
        margin-right: 0.06rem;
        line-height: 0.18rem;
        font-size: 0.12rem;
        color: $medium-fontColor;
      }
    }
    &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color: $medium-fontColor;
      font-size: 0.2rem;
    }
  }
}
</style>
