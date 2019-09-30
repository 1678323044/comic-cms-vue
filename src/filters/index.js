import Vue from 'vue'

Vue.filter('filterState',function (data) {
  switch (data) {
    case 1 :
      return '存稿'
    case 2 :
      return '发布'
  }
})

Vue.filter('filterEndState',function (data) {
  switch (data) {
    case 0 :
      return '连载'
    case 1 :
      return '完结'
  }
})
