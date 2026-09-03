<template>
  <div class="wrapper">
    <StaticPart />
    <NearBy />
  </div>
  <DockerView />
</template>

<script>
import DockerView from './Docker.vue';
import NearBy from './Nearby.vue';
import StaticPart from './StaticPart.vue';
export default {
  name: 'HomeView',
  components: {
    StaticPart,
    NearBy,
    DockerView,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem 0.1rem 0.18rem;
}
</style>
