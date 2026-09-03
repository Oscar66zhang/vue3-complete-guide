import { createStore } from "vuex";
// VueX 数据管理框架
// VueX 创建了一个全局唯一的仓库，用来存放全局的数据
export default createStore({
  state: {
    name: "dell",
  },
  getters: {},
  // mutations:专门负责修改 Vuex 中的 state 数据
  //mutation 只写同步代码，不要写异步代码
  // commit 和 mutation 做关联
  mutations: {
    // 第四步，对应的 mutation 被执行
    change(state, str) {
      // 第五部，在 mutation 里面修改数据
      state.name = str;
    },
  },
  // actions：Vuex 里专门负责处理“业务逻辑”的地方
  // dispatch 和 actions 做关联
  actions: {
    //第二步，store 感知到你触发了一个叫做 change 的 action，执行 change 方法。
    change(store, str) {
      //第三步，提交一个 commit 触发一个 mutation
      setTimeout(() => {
        store.commit("change", str);
      }, 2000);
    },
  },
  modules: {},
});
