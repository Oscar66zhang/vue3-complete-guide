<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>{{ myName }}</h1>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  computed: {
    myName() {
      // 从 Vuex 的全局仓库里拿到 name，然后显示到页面上
      return this.$store.state.name;
    },
  },
  methods: {
    handleClick() {
      // 1. dispatch 方法，派发一个 action，名字叫做 change
      // 2. 感知到 change 这个 action，执行 store 中 actions 下面的 change方法
      // 3.commit提交一个叫做change的数据改变
      // 4.mutation感知到提交的change改变，执行change方法改变数据
      this.$store.dispatch("change", "hello World");
      /*
      this.$store.commit('change')
      组件
      ↓
      commit("change")
      ↓
      mutation.change()
      ↓
      修改 state
      */

      /*
      this.$store.commit("change", "hello world");
        change(state, str) {
      state.name = str;
      */
    },
  },
};
</script>
