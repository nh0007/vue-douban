<template>
  <aside class="aside-content">
    <h2 class="content-header">电影分类</h2>
    <ul>
      <li 
        v-for="(movieTag, index) in movieTags"
        :key="index"
        class="aside-item"
        :class="{'active-movie-tag': movieTag === currentMovieTag}"
        @click="changeMovieTag(movieTag)"
      >
        {{movieTag}}
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'MovieTag',
  computed: {
    movieTags () {
      return this.$store.state.movie.movieTags
    },
    currentMovieTag () {
      return this.$store.state.movie.currentMovieTag
    },
    tagMovies () {
      return this.$store.state.movie.tagMovies
    }
  },

  methods: {
    changeMovieTag (tag) {
      this.$store.commit('SET_CURRENT_MOVIE_TAG', tag)
      if (!this.tagMovies[tag]) {
        this.$store.dispatch('getCurrentTagMovies', {count: 20})
      } else {
        this.$store.commit('SET_CURRENT_TAG_MOVIES', this.tagMovies[tag])
      }
    }
  }
}
</script>

<style scoped>
  .aside-item:hover{
    background: #f0f3f5;
  }
  .active-movie-tag{
    background: #f0f3f5;
  }
</style>
