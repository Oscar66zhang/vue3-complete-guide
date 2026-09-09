<template>
  <div class="wrapper">
    <Toast v-if="show" :message="toastMessage" />
    <div class="title">
      <i class="iconfont icon-back" @click="handleBackClick"></i>
      新建地址
      <span class="title__save" @click="handleSaveClick">保存</span>
    </div>
    <div class="content">
      <div class="content__item">
        <span class="content__item__label">所在城市:</span>
        <input v-model="city" class="content__item__input" placeholder="请输入所在城市" />
      </div>

      <div class="content__item">
        <span class="content__item__label">州 / 省:</span>
        <input v-model="state" class="content__item__input" placeholder="请输入州或省" />
      </div>

      <div class="content__item">
        <span class="content__item__label">邮政编码:</span>
        <input v-model="zipCode" class="content__item__input" placeholder="请输入邮政编码" />
      </div>

      <div class="content__item">
        <span class="content__item__label">国家:</span>
        <input v-model="country" class="content__item__input" placeholder="请输入国家" />
      </div>

      <div class="content__item">
        <span class="content__item__label">详细地址:</span>
        <input
          v-model="address"
          class="content__item__input"
          placeholder="请输入街道、门牌号等详细地址"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { post } from '../../utils/request';
import { useRouter } from 'vue-router';
import Toast, { useToastEffect } from '../../components/Toast.vue';

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter(); // 路由器实例，用来控制“跳转”
  const handleBackClick = () => {
    router.back();
  };
  return { handleBackClick };
};

export default {
  name: 'AddressEdit',
  components: { Toast },
  setup() {
    const city = ref('');
    const state = ref('');
    const zipCode = ref('');
    const country = ref('');
    const address = ref('');

    const { show, toastMessage, showToast } = useToastEffect();

    const { handleBackClick } = useBackRouterEffect();

    const handleSaveClick = async () => {
      if (
        !city.value.trim() ||
        !state.value.trim() ||
        !zipCode.value.trim() ||
        !country.value.trim() ||
        !address.value.trim()
      ) {
        showToast('内容必填');
        return;
      }

      const result = await post('/user/createAddress', {
        city: city.value,
        state: state.value,
        zipCode: zipCode.value,
        country: country.value,
        address: address.value,
      });

      if (result?.errno === 0) {
        showToast('新增地址成功');

        setTimeout(() => {
          handleBackClick();
        }, 1000);
      } else {
        showToast(result?.message || '新增地址失败');
      }
    };

    return {
      city,
      state,
      zipCode,
      country,
      address,
      handleBackClick,
      handleSaveClick,
      show,
      toastMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
.wrapper {
  overflow: scroll;
  position: relative;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background: $darkBgColor;
}

.title {
  @include title;
  .iconfont {
    position: absolute;
    left: 0.1rem;
    width: 0.3rem;
    font-size: 0.24rem;
    color: $content-fontColor;
  }
  &__save {
    position: absolute;
    right: 0.18rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
  }
}

.content {
  margin-top: 0.12rem;
  padding: 0 0.18rem;
  background: $bgColor;
  &__item {
    display: flex;
    overflow: hidden;
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 0.01rem solid $content-bgColor;
    font-size: 0.14rem;
    &__label {
      color: $content-fontcolor;
    }
    &__input {
      flex: 1;
      border: none;
      outline: none;
    }
  }
}
</style>
