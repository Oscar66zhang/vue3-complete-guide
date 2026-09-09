<template>
  <div class="wrapper">
    <StaticPart />
    <NearBy />
  </div>
  <DockerView :currentIndex="0" />
</template>

<script>
import DockerView from '../../components/Docker.vue';
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
@import '../../style/mixins.scss';
.wrapper {
  overflow-y: auto;
  padding: 0 0.18rem 0.1rem 0.18rem;
  @include fix-content;
}
</style>
