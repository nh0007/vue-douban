<template>
  <div class="activity-item" v-if="activities.length !== 0">

    <div class="content-header">
      <h2 class="activity-tag">{{activityType.text}}</h2>
      <a 
        href="javascript: void(0)"
        v-for="(type, index) in dayTypes"
        :key="index"
        class="day-type"
        :class="{'active': type === currentDayType, 'not-active': type !== currentDayType}"
        @click="changeDayType(type)"
      >
        {{type.text}}
      </a>
    </div>

    <ul class="activity-content">
      <li 
        v-for="activity in activities"
        :key="activity.id"
        class="activity-sub-item"
      >
        <a 
          :href="activity.alt"
          class="activity-image-link"
        >
          <img 
            :src="activity.image"
            class="activity-image" 
          />
        </a>
        <div class="more-info">
          <a 
            :href="activity.alt"
            class="activity-title"
          >
            {{activity.title}}
          </a>
          <p class="date-info">
            {{getDateString(activity.begin_time, activity.end_time)}}
          </p>
          <p 
            class="address-info"
            :title="activity.address"
          >
            {{activity.address}}
          </p>
          <p>
            {{activity.wisher_count + activity.participant_count}}人关注
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CityActivityContentItem',
  props: {
    activityType: {
      type: Object,
      required: true
    },
    dayTypes: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      currentDayType: this.dayTypes[0],
      activities: []
    }
  },

  computed: {
    currentCity () {
      return this.$store.state.city.currentCity
    }
  },

  mounted () {
    if (this.activities.length === 0 && this.currentCity) {
      this.getActivities()
    }
  },

  methods: {
    getActivities (start = 0, count = 6) {
      // 获取某个城市，某种的活动类型（音乐、戏剧等），在某个时间段内的活动列表
      axios.get('/api/event/list', {
        params: {
          loc: this.currentCity.id,
          day_type: this.currentDayType.value,
          type: this.activityType.value,
          start,
          count
        }
      })
        .then(response => {
          this.activities = response.data.events
        })
    },

    getDateString (startTime, endTime) {
      // 处理后台返回的起止时间格式，同一天的话返回这种格式：x月x日 19:30 - 21:30
      // 不同天的话返回这种格式：x月x日 至 y月y日
      let startDate = new Date(startTime)
      let endDate = new Date(endTime)
      let startMonth = startDate.getMonth() + 1
      let endMonth = endDate.getMonth() + 1
      let startDay = startDate.getDate()
      let endDay = endDate.getDate()
      let startHour = startDate.getHours()
      let endHour = endDate.getHours()
      let startMinute = startDate.getMinutes()
      let endMinute = endDate.getMinutes()
      let timeArray = [startHour, endHour, startMinute, endMinute]
      for (let i = 0, ii = timeArray.length; i < ii; i++) {
        if (timeArray[i] < 10) {
          timeArray[i] = `0${timeArray}`
        }
      }
      if (startMonth === endMonth && startDay === endDay) {
        return `${startMonth}月${startDay}日  ${timeArray[0]}:${timeArray[2]} - ${timeArray[1]}:${timeArray[2]}`
      } else {
        return `${startMonth}月${startDay}日  至  ${endMonth}月${endDay}日`
      }
    },

    changeDayType (type) {
      this.currentDayType = type
    }
  },

  watch: {
    currentCity () {
      this.getActivities()
    },
    currentDayType () {
      this.getActivities()
    }
  }
}
</script>

<style scoped>
  .activity-item{
    margin-bottom: 20px;
  }
  .activity-tag{
    font-weight: normal;
    font-size: 14px;
    margin-right: 40px;
  }
  .day-type{
    display: inline-block;
    height:16px;
    padding:1px 15px;
    line-height: 1.4;
    font-size: 12px;
    margin-right:10px;
    border-radius: 2px;
    font-weight: normal;
  }
  .active{
    color: #333;
    background: #e6e6e6;
  }
  .not-active{
    color: #0192b5;
  }
  .not-active:hover{
    color: #fff;
    background: #6cc1d6;
  }
  .activity-content{
    width: 100%;
    margin-top: 20px;
  }
  .activity-sub-item{
    width:50%;
    height:132px;
    display: inline-block;
    overflow: hidden;
  }
  .activity-image-link{
    float: left;
  }
  .activity-image{
    width:75px;
    height:97px;
  }
  .more-info{
    margin-left: 90px;
    padding-right: 30px;
    color: #666;
    font-size: 12px;
  }
  .activity-title{
    font-size:13px;
    color: #37a;
  }
  .activity-title:hover{
    background: #37a;
    color: #fff;
  }
  .date-info{
    margin-top: 6px;
  }
  .address-info{
    width:100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin:3px 0;
  }
</style>
