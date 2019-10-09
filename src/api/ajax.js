import axios from 'axios'
import qs from 'qs'

export default function ajax (url,data={},type='GET',config){
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
      //发送get请求
      promise = axios.get(url)
    }else{
      //发送post请求
      if (config === ''){
        promise = axios.post(url,qs.stringify(data))
      }else {
        promise = axios.post(url, data,config)
      }
    }
    promise.then(function(response){
      resolve(response.data)
    }).catch(function(error){
      reject(error)
    })
  })
}
