<template>
  <div>
    <input v-model="inputValue" />
    <button @click="handleAddItem" class="button">提交</button>

    <ul>
      <list-item v-for="(item, index) in list" :key="index" :msg="item">{{
        item
      }}</list-item>
    </ul>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import ListItem from "./components/ListItem.vue";
export default {
  name: "App",
  components: {
    ListItem,
  },
  setup() {
    const inputValue = ref("");
    const list = reactive([]);

    const handleAddItem = () => {
      list.push(inputValue.value);
      inputValue.value = "";
    };
    return { handleAddItem, list, inputValue };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.button {
  margin-left: 20px;
  color: red;
}
</style>
