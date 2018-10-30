<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
	name: 'App',
}
</script>
<style lang="scss">
  @import "./sassStyle/style";
  #app{
    height:100%;
  }
</style>
