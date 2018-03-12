import axios from 'axios'
import * as types from '../mutation-types'

const bookTags = [
  {tagName: '文学', subTags: ['小说', '随笔', '散文', '诗歌', '童话', '名著', '港台', '外国文学', '中国文学', '日本文学', '古典文学']},
  {tagName: '流行', subTags: ['漫画', '推理', '绘本', '青春', '科幻', '言情', '武侠', '奇幻', '悬疑', '穿越', '魔幻', '校园']},
  {tagName: '文化', subTags: ['历史', '哲学', '传记', '设计', '建筑', '电影', '回忆录', '音乐', '心理学', '社会学', '国学', '艺术史']},
  {tagName: '生活', subTags: ['旅行', '励志', '职场', '美食', '教育', '灵修', '健康', '家居', '爱情', '女性', '摄影', '家居']},
  {tagName: '经管', subTags: ['经济学', '管理', '商业', '金融', '营销', '理财', '股票', '企业史', '创业', '投资', '广告', '策划']},
  {tagName: '科技', subTags: ['科普', '互联网', '编程', '交互设计', '算法', '通信', '神经网络', '用户体验', '程序', '科技', 'web']}
]

const bookTypes = ['虚构类', '非虚构类']

const state = {
  bookTags,
  currentBookTags: bookTags[0],
  currentBookTag: bookTags[0].subTags[0],
  tagBooks: {},
  currentTagBooks: [],
  bookTypes,
  currentBookType: bookTypes[0],
  typeBooks: {},
  currentTypeBooks: []
}

const mutations = {
  [types.SET_CURRENT_BOOK_TAGS] (state, tags) {
    state.currentBookTags = tags
  },
  [types.SET_CURRENT_BOOK_TAG] (state, tag) {
    state.currentBookTag = tag
  },
  [types.SET_TAG_BOOKS] (state, {books, type}) {
    // 当type为merge时，会将新的数据与原来的数据合并
    if (type !== 'merge') {
      state.tagBooks[state.currentBookTag] = books
    } else {
      state.tagBooks[state.currentBookTag] = state.tagBooks[state.currentBookTag].concat(books)
    }
  },
  [types.SET_CURRENT_TAG_BOOKS] (state, {books, type}) {
    // 当type为merge时，会将新的数据与原来的数据合并
    if (type !== 'merge') {
      state.currentTagBooks = books
    } else {
      state.currentTagBooks = state.currentTagBooks.concat(books)
    }
  },
  [types.SET_CURRENT_BOOK_TYPE] (state, type) {
    state.currentBookType = type
  },
  [types.SET_TYPE_BOOKS] (state, books) {
    state.typeBooks[state.currentBookType] = books
  },
  [types.SET_CURRENT_TYPE_BOOKS] (state, books) {
    state.currentTypeBooks = books
  }
}

const actions = {
  getCurrentTagBooks ({commit, state}, {count = 10, start = 0, type}) {
    axios.get('./api/book/search', {
      params: {
        tag: state.currentBookTag,
        count,
        start
      }
    })
      .then(response => {
        commit(types.SET_TAG_BOOKS, {books: response.data.books, type})
        commit(types.SET_CURRENT_TAG_BOOKS, {books: response.data.books, type})
      })
  },
  getTypeBooks ({commit, state}, {count = 10, start = 0}) {
    axios.get('./api/book/search', {
      params: {
        q: state.currentBookType,
        count,
        start
      }
    })
      .then(response => {
        commit(types.SET_TYPE_BOOKS, response.data.books)
        commit(types.SET_CURRENT_TYPE_BOOKS, response.data.books)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
