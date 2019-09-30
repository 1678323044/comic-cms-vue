/* 间接更新state属性 */
import {
  reqComicList,
  reqChapterList
} from '../api/index'
import {
  RECEIVE_COMICLIST,
  RECEIVE_CHAPTERLIST
} from './mutations-types'
import chapterList from "../views/chapterList/chapterList";

export default {
  //异步获取漫画列表
  async getComicList({commit},param){
    let result = await reqComicList(param)
    if (result.state === 'ok'){
      let comicList = result.data
      let count = result.count
      commit(RECEIVE_COMICLIST,{comicList,count})
    }
  },
  //异步获取章节列表
  async getChapterList({commit},param){
    let result = await reqChapterList(param)
    if (result.state === 'ok'){
      let chapterList = result.data
      let chapterCount = result.count
      commit(RECEIVE_CHAPTERLIST,{chapterList,chapterCount})
    }
  }
}
