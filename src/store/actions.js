/* 间接更新state属性 */
import {
  reqComicList,
  reqChapterList,
  reqChapter,
  reqComic
} from '../api/index'
import {
  RECEIVE_COMICLIST,
  RECEIVE_CHAPTERLIST,
  RECEIVE_CHAPTER,
  RECEIVE_COMIC
} from './mutations-types'

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
  },
  //异步获取漫画信息
  async getComic({commit},param){
      let result = await reqComic(param)
      if(result.state === 'ok'){
        let comic = result.data
        commit(RECEIVE_COMIC,{comic})
      }
  },
  //异步获取章节信息
  async getChapter({commit},param){
    let result = await reqChapter(param)
    if (result.state === 'ok'){
      let chapter = result.data
      commit(RECEIVE_CHAPTER,{chapter})
    }
  }
}
