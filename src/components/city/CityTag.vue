<template>
  <aside class="aside-content">
    <h2 class="content-header">城市列表</h2>
    <ul>
      <li v-for="(city, index) in cities"
          :key="index"
          class="aside-item"
          :class="{active: city === currentCity}"
          @click="changeCurrentCity(city)">
        {{city.name}}
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'CityTag',
  computed: {
    cities () {
      return this.$store.state.city.cities
    },
    currentCity () {
      return this.$store.state.city.currentCity
    }
  },

  mounted () {
    if (this.cities.length === 0) {
      // 默认获取20个城市
      this.$store.dispatch('getCities', {start: 0, count: 20})
    }
  },

  methods: {
    changeCurrentCity (city) {
      this.$store.commit('SET_CURRENT_CITY', city)
    }
  }
}
</script>

<style scoped>
  .aside-item:hover{
    background: #f6f5f2;
  }
  .active{
    background: #f6f5f2;
  }
</style>
