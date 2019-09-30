import axios from 'axios'
import qs from 'qs'
import VueCookies from 'vue-cookie'

export default function ajax (url,data={},type='GET'){
  return new Promise(function (resolve,reject){
    let promise
    if(type === 'GET'){
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if(dataStr !== ''){
        //substring 字符串截取
        dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      VueCookies.set('JSESSIONID','E36A95BB1EDF7ED8CD03A55ADD9C0B4E','24d')
      //发送get请求
      promise = axios.get(url)
    }else{
      VueCookies.set('JSESSIONID','E36A95BB1EDF7ED8CD03A55ADD9C0B4E','24d')
      //发送post请求
      promise = axios.post(url,qs.stringify(data))
    }
    promise.then(function(response){
      resolve(response.data)
    }).catch(function(error){
      reject(error)
    })
  })
}
