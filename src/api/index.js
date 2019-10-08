/*
 * 包含n个接口请求函数的模块
 * 返回值：promise对象
*/
import ajax from "./ajax"

//const API_URL = 'http://106.53.110.107/comic'
const API_URL = '/api'

export const reqLoginInfo = (data) => ajax(`${API_URL}/manager/login.do`,data)

export const reqComicList = (data) => ajax(`${API_URL}/manager/listbooks.do`,data)

export const reqChapterList = (data) => ajax(`${API_URL}/manager/pullchapters.do`,data)

export const reqDelComic = (data) => ajax(`${API_URL}/manager/deletebook.do`,data)

export const reqDelChapter = (data) => ajax(`${API_URL}/manager/deletechapter.do`,data)

export const reqUploadPic = (data,config) => ajax(`${API_URL}/manager/uploadaddimage.do`,data,'POST',config)
