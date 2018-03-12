import axios from 'axios'
import * as types from '../mutation-types'

const musicTags = ['华语', '欧美', '日韩', '流行', '摇滚', '民谣', '原声', '轻音乐', '古典', '粤语', 'R&B']

const state = {
  musicTags,
  currentMusicTag: musicTags[0],
  tagMusics: {},
  currentTagMusics: []
}

const mutations = {
  [types.SET_CURRENT_MUSIC_TAG] (state, tag) {
    state.currentMusicTag = tag
  },
  [types.SET_TAG_MUSICS] (state, musics) {
    state.tagMusics[state.currentMusicTag] = musics
  },
  [types.SET_CURRENT_TAG_MUSICS] (state, musics) {
    state.currentTagMusics = musics
  }
}

const actions = {
  getCurrentTagMusics ({commit, state}, {count = 10, start = 0}) {
    axios.get('/api/music/search', {
      params: {
        tag: state.currentMusicTag,
        count,
        start
      }
    })
      .then(response => {
        commit(types.SET_TAG_MUSICS, response.data.musics)
        commit(types.SET_CURRENT_TAG_MUSICS, response.data.musics)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
