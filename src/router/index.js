import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import comicList from '../views/comicList/comicList'
import login from '../views/login/login'
import chapterList from '../views/chapterList/chapterList'
import addComic from '../views/addComic/addComic'
import updateComic from '../views/updateComic/updateComic'
import addChapter from "../views/addChapter/addChapter";
import updateChapter from '../views/updateChapter/updateChapter'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/comicList',
      component: comicList,
      meta: {
        showComponent: true
      }
    },
    {
      path: '/chapterList',
      component: chapterList,
      meta: {
        showComponent: true
      }
    },
    {
      path: '/addComic',
      component: addComic,
      meta: {
        showComponent: true
      }
    },
    {
      path: '/updateComic',
      component: updateComic,
      meta: {
        showComponent: true
      }
    },
    {
      path: '/addChapter',
      component: addChapter,
      meta: {
        showComponent: true
      }
    },
    {
      path: '/updateChapter',
      component: updateChapter,
      meta: {
        showComponent: true
      }
    }
  ]
})
