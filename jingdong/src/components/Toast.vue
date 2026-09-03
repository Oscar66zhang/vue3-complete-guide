<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'ToastView',
  props: ['message'],
};

// 使用 Toast 效果
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: '',
  });

  // 显示提示框
  const showToast = (message) => {
    toastData.show = true;
    toastData.toastMessage = message;
    setTimeout(() => {
      toastData.show = false;
      toastData.toastMessage = '';
    }, 2000);
  };

  const { show, toastMessage } = toRefs(toastData);
  return { show, toastMessage, toastData, showToast };
};
</script>

<style scoped lang="scss">
@import '../style/variable.scss';
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background: rgb(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: $bgColor;
}
</style>
