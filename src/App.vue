<template>
  <div id="app">
    <router-view/>
    <div class="main-content">
      <router-view name="content"/>
      <router-view name="aside"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './css/style.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 13px;
}
.main-content{
  width: 936px;
  margin: 0 auto;
}
</style>
