<template>
  <div class="left-content">
    <h2 class="content-header">豆瓣读书标签:{{currentBookTag}}</h2>

    <ul>
      <li v-for="book in currentTagBooks"
          :key="book.id"
          class="book-item">
        <a :href="book.alt" :title="book.title">
          <img :src="book.images.large"
               :alt="book.title"
               class="book-image">
        </a>
        <div class="book-info">
          <h3 class="link-title">
            <a :href="book.alt">{{book.title}}</a>
          </h3>
          <p class="book-other-info">
            {{book.author.join()}} / {{book.translator.join()}} / {{book.publisher}} / {{book.pubdate}} / {{book.price}}
          </p>
          <div>
            <span class="score-image"
                  :style="getStarStyle(book.rating.average)">
            </span>
            <span class="average-score">{{book.rating.average}}</span>
            <span class="raters-number">({{book.rating.numRaters}}人评价)</span>
          </div>
          <p class="book-summary">{{book.summary | processedSummary(80)}}</p>
          <div>
            <a :href="book.alt"
               class="buy-books">
              去豆瓣购买
            </a>
            <a :href="book.ebook_url"
               class="e-book">
              去看电子版
            </a>
          </div>
        </div>
      </li>
    </ul>

    <a class="more-book"
       href="javascript:void(0)"
       @click="loadMoreBooks">
      加载更多
    </a>
  </div>
</template>

<script>
export default {
  name: 'BookTagMoreContent',
  data () {
    return {
      // 一开始默认一页显示十本书
      bookCountPerPage: 10
    }
  },

  computed: {
    currentBookTag () {
      return this.$store.state.book.currentBookTag
    },
    currentTagBooks () {
      return this.$store.state.book.currentTagBooks.slice(0, this.bookCountPerPage)
    }
  },

  mounted () {
    if (this.currentTagBooks.length === 0) {
      this.$store.dispatch('getCurrentTagBooks', {count: 10})
    }
  },

  methods: {
    getStarStyle (score) {
      return this.myUtils.getStarStyle(score)
    },

    loadMoreBooks () {
      //  每次点击加载更多时，会加载多十条数据，若缓存中的数据满足需求，则从缓存读取，若不满足，则发送网络请求获取数据
      let bookCount = this.$store.state.book.currentTagBooks.length
      this.bookCountPerPage += 10
      if (bookCount < this.bookCountPerPage) {
        this.$store.dispatch('getCurrentTagBooks', {count: this.bookCountPerPage - bookCount, start: bookCount, type: 'merge'})
      }
    }
  },

  filters: {
    processedSummary (msg, endIndex) {
      return msg.length >= endIndex ? msg.substring(0, endIndex) + '...' : msg
    }
  }
}
</script>

<style scoped>
  .book-item{
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    zoom: 1;
  }
  .book-image{
    width: 90px;
    height: 128px;
    margin-right: 20px;
    float: left;
  }
  .book-info{
    overflow: hidden;
    zoom: 1;
  }
  .book-other-info{
    margin: 6px 0 8px;
  }
  .average-score{
    color: #e09015;
  }
  .raters-number{
    margin-left: 6px;
  }
  .book-summary{
    margin: 12px 0 10px;
    line-height: 1.6;
  }
  .buy-books{
    color: #37a;
  }
  .buy-books:hover{
    color: white;
    background: #37a;
  }
  .e-book{
    float: right;
    color: #973f31;
  }
  .e-book:hover{
    color: white;
    background: #973f31;
  }
  .more-book{
    display: block;
    height: 34px;
    line-height: 34px;
    margin-top: 15px;
    text-align: center;
    background: #f6f6f1;
    color: #37a;
  }
  .more-book:hover{
    background: #e8e8e8;
  }
</style>
