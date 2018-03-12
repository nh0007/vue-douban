<template>
  <div class="book-type-content">

    <div class="content-header">
      <h2>最受关注图书榜</h2>
      <a v-for="(bookType, index) in bookTypes"
         :key="index"
         href="javascript:void(0)"
         class="book-type-link"
         :class="{active: bookType === currentBookType, 'not-active': bookType !== currentBookType}"
         @click="changeBookType(bookType)">
        {{bookType}}
      </a>
    </div>

    <ul class="book-list">
      <li v-for="book in currentTypeBooks"
          :key="book.id"
          class="book-item">
        <a :href="book.alt" :title="book.title">
          <img :src="book.images.large"
               :alt="book.title"
               class="book-image">
        </a>
        <div class="book-more-info">
          <h3 class="link-title">
            <a :href="book.alt">{{book.title}}</a>
          </h3>
          <p>
            <span class="score-image"
                  :style="getStarStyle(book.rating.average)">
            </span>
            <span class="average-score">{{book.rating.average}}</span>
          </p>
          <p>作者 : {{book.author.join()}}</p>
          <p>{{book.publisher}} / {{book.pubdate}}</p>
          <p class="book-details">{{book.pages}}页 / {{book.price}}元 / {{book.binding}}</p>
          <p>标签 : {{getBookTags(book.tags)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BookTypeContent',
  computed: {
    bookTypes () {
      return this.$store.state.book.bookTypes
    },
    currentBookType () {
      return this.$store.state.book.currentBookType
    },
    typeBooks () {
      return this.$store.state.book.typeBooks
    },
    currentTypeBooks () {
      return this.$store.state.book.currentTypeBooks
    }
  },

  mounted () {
    if (this.currentTypeBooks.length === 0) {
      // 默认一页显示12本书
      this.$store.dispatch('getTypeBooks', {count: 12})
    }
  },

  methods: {
    changeBookType (bookType) {
      this.$store.commit('SET_CURRENT_BOOK_TYPE', bookType)
      if (!this.typeBooks[bookType]) {
        this.$store.dispatch('getTypeBooks', {count: 12})
      } else {
        this.$store.commit('SET_CURRENT_TYPE_BOOKS', this.typeBooks[bookType])
      }
    },

    getBookTags (tags) {
      // 整理一下每本书的标签内容，方便显示
      let tagString = ''
      for (let i = 0, ii = tags.length; i < ii; i++) {
        tagString += `${tags[i].name}${i === ii - 1 ? '' : ' / '}`
      }
      tagString = tagString === '' ? '无' : tagString
      return tagString
    },

    getStarStyle (score) {
      return this.myUtils.getStarStyle(score)
    }
  }
}
</script>

<style scoped>
  .book-type-content{
    width: 100%;
    font-size: 13px;
  }
  .book-type-link{
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
  .book-list{
    margin-top: 16px;
  }
  .book-item{
    width:310px;
    display: inline-block;
    margin-bottom: 30px;
    overflow: hidden;
    vertical-align: middle;
  }
  .book-image{
    width: 95px;
    height: 137px;
    float: left;
    margin-right: 18px;
  }
  .average-score{
    color: #e09015;
  }
  .book-more-info{
    margin-right: 20px;
  }
  .book-more-info p{
    margin: 3px 0;
  }
  .book-details{
    clear: both;
    padding:15px 0 3px;
  }
</style>
