<template>
  <div class="movie-time-type-content">
    <div class="content-header">
      <h2>{{currentMovieTimeType.text}}</h2>

      <a v-for="(type, index) in movieTimeTypes"
         :key="index"
         href="javascript:void(0)"
         class="movie-type-link"
         :class="{active: type === currentMovieTimeType, 'not-active': type !== currentMovieTimeType}"
         @click="changeMovieTimeType(type)">
        {{type.text}}»
      </a>

      <base-slide class="movie-slide"
                  :pageCount="pageCount"
                  :current-page="currentPage"
                  background-color="#6D98D2"
                  @change-page="changePage"
                  @change-direction="changeDirection"/>
    </div>

    <transition-group tag="div" class="movie-target" :name="transitionName">
      <ul v-for="(movies, index) in processedMovie"
          :key="index"
          class="movie-list"
          v-show="index === currentPage">
        <li v-for="movie in movies"
            :key="movie.id"
            class="movie-item">
          <a :href="movie.alt">
            <img :src="movie.images.large"
                 :alt="movie.title"
                 class="movie-image">
          </a>
          <h3 class="movie-title-target">
            <a :href="movie.alt"
               class="movie-title"
               :title="movie.title">
              {{movie.title}}
            </a>
          </h3>
          <p v-if="movie.rating.average === 0">暂无评分</p>
          <p v-if="movie.rating.average !== 0">
            <span class="score-image"
                  :style="getStarStyle(movie.rating.average)">
            </span>
            <span class="movie-score">{{movie.rating.average}}</span>
          </p>
          <p v-if="currentMovieTimeType.value === 'in_theaters'"
             class="buy-ticket"
             @click="buyTicket(movie)">
            选座购票
          </p>
          <p v-if="currentMovieTimeType.value === 'coming_soon'"
             class="movie-genres">
            类型: {{movieGenresText(movie.genres)}}
          </p>
        </li>
      </ul>
    </transition-group>

    <base-modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">您好</h3>
      <span slot="body">
        本程序并无实际购票功能，若您喜欢
        <strong>{{focusedMovie.title}}</strong>
        ，可往
        <a href="https://movie.douban.com/" class="common-link">豆瓣</a>
        查看
      </span>
    </base-modal>
  </div>
</template>

<script>
import BaseSlide from '../common/BaseSlide.vue'
import BaseModal from '../common/BaseModal.vue'
export default {
  name: 'MovieTimeTypeContent',
  components: {
    BaseSlide,
    BaseModal
  },

  data () {
    return {
      currentPage: 0,
      slideDirection: 'right',
      showModal: false,
      focusedMovie: null
    }
  },

  computed: {
    movieTimeTypes () {
      return this.$store.state.movie.movieTimeTypes
    },
    currentMovieTimeType () {
      return this.$store.state.movie.currentMovieTimeType
    },
    timeTypeMovies () {
      return this.$store.state.movie.timeTypeMovies
    },
    currentTimeTypeMovies () {
      return this.$store.state.movie.currentTimeTypeMovies
    },
    processedMovie () {
      // 每个翻滚页显示12部电影
      return this.myUtils.processedArray(this.currentTimeTypeMovies, 12)
    },
    pageCount () {
      // 通过 当前获取的电影总数/12 大致得出页数
      return Math.ceil(this.currentTimeTypeMovies.length / 12)
    },
    transitionName () {
      return this.slideDirection === 'right' ? 'move-to-right' : 'move-to-left'
    }
  },

  mounted () {
    if (!this.timeTypeMovies[this.currentMovieTimeType.value]) {
      // 默认加载48部电影
      this.$store.dispatch('getTimeTypeMovies', {start: 0, count: 48})
    }
  },

  methods: {
    changePage (page) {
      this.currentPage = page
    },

    changeDirection (direction) {
      this.slideDirection = direction
    },

    changeMovieTimeType (type) {
      this.$store.commit('SET_CURRENT_MOVIE_TIME_TYPE', type)
      if (!this.timeTypeMovies[type.value]) {
        this.$store.dispatch('getTimeTypeMovies', {start: 0, count: 48, searchParams: type.value})
      } else {
        this.$store.commit('SET_CURRENT_TIME_TYPE_MOVIES', this.timeTypeMovies[type.value])
      }
    },

    getStarStyle (score) {
      return this.myUtils.getStarStyle(score)
    },

    movieGenresText (genres) {
      return genres.length === 0 ? '暂无' : genres.join(' / ')
    },

    buyTicket (movie) {
      this.focusedMovie = movie
      this.showModal = true
    }
  }
}
</script>

<style scoped>
  .movie-time-type-content{
    margin-bottom: 60px;
  }
  .movie-slide{
    float: right;
    margin-top: 5px;
  }
  .movie-type-link{
    margin-left: 10px;
    font-weight: normal;
    font-size: 13px;
    color: #37a;
    cursor: default;
  }
  .active{
    color: #ccc;
  }
  .not-active{
    cursor: pointer;
  }
  .not-active:hover{
    color: white;
    background: #37a;
  }
  .movie-target{
    height: 560px;
    overflow: hidden;
    position: relative;
    margin-top: 16px;
  }
  .movie-list{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .movie-item{
    width: 16.66%;
    height: 50%;
    display: inline-block;
    text-align: center;
  }
  .movie-image{
    width: 115px;
    height: 160px;
  }
  .movie-title-target{
    margin: 12px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .movie-title{
    font-size: 13px;
    color: #333;
    font-weight: normal;
  }
  .movie-score{
    color: #e09015;
    font-size: 12px;
    margin-left: 2px;
  }
  .buy-ticket{
    width: 90px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    margin: 12px auto 0;
    background: #268dcd;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .movie-genres{
    margin: 12px 0;
  }
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
</style>
