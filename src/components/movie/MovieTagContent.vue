<template>
  <div class="left-content">
    <div class="content-header">
      <h2>{{currentMovieTag}}</h2>

      <base-slide class="movie-tag-content-slide"
                  :pageCount="pageCount"
                  :current-page="currentPage"
                  background-color="#6D98D2"
                  @change-page="changePage"
                  @change-direction="changeDirection"/>
    </div>

    <transition-group tag="div" class="movie-content" :name="transitionName">
      <ul v-for="(movies, index) in processedMovies"
          :key="index"
          class="movie-list"
          v-show="index === currentPage">
        <li v-for="movie in movies"
            :key="movie.id">
          <a :href="movie.alt">
            <img :src="movie.images.large"
                 :alt="movie.title"
                 class="movie-image">
          </a>
          <h3 class="link-title">
            <a :href="movie.alt"
               :title="movie.title">
              {{movie.title}}
            </a>
          </h3>
          <p class="movie-score">
            评分：
            <span>{{movie.rating.average}}</span>
          </p>
          <p class="movie-year">上映时间：{{movie.year}}</p>
        </li>
      </ul>
    </transition-group>
  </div>
</template>

<script>
import BaseSlide from '../common/BaseSlide.vue'
export default {
  name: 'MovieTagContent',
  components: {
    BaseSlide
  },

  data () {
    return {
      currentPage: 0,
      slideDirection: 'right'
    }
  },

  computed: {
    currentMovieTag () {
      return this.$store.state.movie.currentMovieTag
    },
    tagMovies () {
      return this.$store.state.movie.tagMovies
    },
    currentTagMovies () {
      return this.$store.state.movie.currentTagMovies
    },
    processedMovies () {
      // 每个翻滚页显示10部电影
      return this.myUtils.processedArray(this.currentTagMovies, 10)
    },
    pageCount () {
      // 通过 当前获取的电影总数/10 大致得出页数
      return Math.ceil(this.currentTagMovies.length / 10)
    },
    transitionName () {
      return this.slideDirection === 'right' ? 'move-to-right' : 'move-to-left'
    }
  },

  mounted () {
    if (!this.tagMovies[this.currentMovieTag]) {
      // 默认显示20部电影
      this.$store.dispatch('getCurrentTagMovies', {count: 20})
    }
  },

  methods: {
    changePage (page) {
      this.currentPage = page
    },

    changeDirection (direction) {
      this.slideDirection = direction
    }
  }
}
</script>

<style scoped>
  .movie-tag-content-slide{
    float: right;
    margin-top: 5px;
  }
  .movie-content{
    width: 100%;
    height: 560px;
    position: relative;
    overflow: hidden;
    margin-top: 16px;
  }
  .movie-list{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .movie-list li{
    width: 20%;
    height: 50%;
    display: inline-block;
    overflow: hidden;
    text-align: center;
  }
  .movie-image{
    width: 115px;
    height: 160px;
  }
  .link-title{
    margin-top: 6px;
  }
  .movie-info{
    margin: 5px 0 0;
  }
  .movie-title{
    color: #37a;
    margin-right: 3px;
  }
  .movie-year,
  .movie-score{
    margin-top: 10px;
  }
  .movie-score span{
    color: #e09015;
  }
</style>
