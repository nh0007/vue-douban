<template>
  <div class="left-content">
    <city-activity-content-item v-for="(activityType, index) in activityTypes"
                                :key="index"
                                :activityType="activityType"
                                :dayTypes="dayTypes"/>
  </div>
</template>

<script>
import CityActivityContentItem from './CityActivityContentItem.vue'
export default {
  name: 'CityActivityContent',
  components: {
    CityActivityContentItem
  },

  computed: {
    activityTypes () {
      return this.$store.state.city.activityTypes
    },
    dayTypes () {
      return this.$store.state.city.dayTypes
    }
  }
}
</script>
