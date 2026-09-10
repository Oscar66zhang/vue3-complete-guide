<template>
  <div class="wrapper">
    <Toast v-if="show" :message="toastMessage" />
    <div class="title">
      <i class="iconfont icon-back" @click="handleBackClick"></i>
      {{ isEdit ? '编辑' : '新建' }}地址
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
import { ref, onMounted } from 'vue';
import { post, get } from '../../utils/request';
import { useRoute, useRouter } from 'vue-router';
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
    const route = useRoute();
    const id = route.query.id;
    // 判断是否是编辑地址
    const isEdit = Boolean(route.query.id);
    console.log('isEdit:', isEdit);

    const city = ref('');
    const state = ref('');
    const zipCode = ref('');
    const country = ref('');
    const address = ref('');

    const { show, toastMessage, showToast } = useToastEffect();

    const { handleBackClick } = useBackRouterEffect();

    // 获取单个地址详情
    const getAddressDetail = async () => {
      if (!isEdit) {
        return;
      }

      try {
        const result = await get(`/user/address/${id}`);

        if (result?.errno === 0) {
          const data = result.data;

          city.value = data?.city || '';
          state.value = data?.state || '';
          zipCode.value = data?.zipCode || '';
          country.value = data?.country || '';
          address.value = data?.address || '';
        } else {
          showToast(result?.message || '获取地址失败');
        }
      } catch (error) {
        console.log('Get address detail error:', error);

        showToast('获取地址失败');
      }
    };

    const handleSaveClick = async () => {
      // 表单校验
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

      // 请求参数
      const data = {
        city: city.value,
        state: state.value,
        zipCode: zipCode.value,
        country: country.value,
        address: address.value,
      };

      try {
        // 编辑地址
        if (isEdit) {
          const result = await post(`/user/updateAddress/${id}`, data);

          if (result?.errno === 0) {
            showToast('修改地址成功');

            setTimeout(() => {
              handleBackClick();
            }, 1000);
          } else {
            showToast(result?.message || '修改地址失败');
          }

          return;
        }

        // 新增地址
        const result = await post('/user/createAddress', data);

        if (result?.errno === 0) {
          showToast('新增地址成功');

          setTimeout(() => {
            handleBackClick();
          }, 1000);
        } else {
          showToast(result?.message || '新增地址失败');
        }
      } catch (error) {
        console.log('Save address error:', error);

        showToast(isEdit ? '修改地址失败' : '新增地址失败');
      }
    };

    // 页面加载
    onMounted(() => {
      getAddressDetail();
    });

    return {
      city,
      state,
      zipCode,
      country,
      address,
      isEdit,
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
