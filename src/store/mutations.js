/* 直接更新state对象 */
import {
  RECEIVE_COMICLIST,
  RECEIVE_CHAPTERLIST
} from './mutations-types'

export default {
  [RECEIVE_COMICLIST](state,{comicList,count}){
    state.comicList = comicList
    state.count = count
  },
  [RECEIVE_CHAPTERLIST](state,{chapterList,chapterCount}){
    state.chapterList = chapterList
    state.chapterCount = chapterCount
  }
}
