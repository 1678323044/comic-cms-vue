/*
 * 包含n个接口请求函数的模块
 * 返回值：promise对象
*/
import ajax from "./ajax"

const API_URL = 'http://106.53.110.107/comic'

//管理员登录
export const reqLoginInfo = (data) => ajax(`${API_URL}/manager/login.do`,data)

//漫画列表
export const reqComicList = (data) => ajax(`${API_URL}/manager/listbooks.do`,data)

//章节列表
export const reqChapterList = (data) => ajax(`${API_URL}/manager/pullchapters.do`,data)

//删除漫画
export const reqDelComic = (data) => ajax(`${API_URL}/manager/deletebook.do`,data)

//删除章节
export const reqDelChapter = (data) => ajax(`${API_URL}/manager/deletechapter.do`,data)

//上传图片数据
export const reqUploadPic = (data,config) => ajax(`${API_URL}/manager/uploadaddimage.do`,data,'POST',config)

//更新漫画信息
export const reqUpdateComic = (data) => ajax(`${API_URL}/manager/updatebook.do`,data,'POST')

//添加漫画信息
export const reqAddComic = (data) => ajax(`${API_URL}/manager/addbook.do`,data)

//添加漫画章节
export const reqAddChapter = (data) => ajax(`${API_URL}/manager/addchapter.do`,data,'GET')

//更新漫画章节
export const reqUpdateChapter = (data) => ajax(`${API_URL}/manager/addchapter .do`,data,'POST')

//接收漫画信息
export const reqComic = (data) => ajax(`${API_URL}/manager/mgetbook.do`,data)

//接收章节信息
export const reqChapter = (data) => ajax(`${API_URL}/manager/mgetchapter.do`,data)
