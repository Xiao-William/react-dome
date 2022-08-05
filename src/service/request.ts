import { getToken } from "@/utils/cookie";
import axios from "axios";
//带三方类库
import qs from 'qs'
// 配置不同环境下，调用不同接口

switch (process.env.NODE_ENV) {
    // 生产环境，部署到服务器上的环境
    case 'production':
        axios.defaults.baseURL = 'http://api.zhengqinan.cn';
        break;
    //设置测式环境的接口地址
    case 'test':
        axios.defaults.baseURL = 'http://api.zhengqinantext.cn';
        break;
    //开发环境接口地址
    default:
        axios.defaults.baseURL = 'http://api.kaifa.cn'
}
/**
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 10000  //设置十秒
axios.defaults.withCredentials = true;//例如：登录校验session和cookie
/**
 * 设置请求数据参数传递的格式，默认是json格式，但是在登录校验中后台一般设置请求格式：x-www-form-urlencoded(name=xxx,age=xxx)
 * 看服务器要求什么格式
 */
axios.defaults.transformRequest = data => qs.stringify(data)  //qs是第三方库，转换为x-www-form-urlencoded
/**
 * 设置请求拦截器：----在项目中发请求（请求没有发出去）可以做一些事情
 * 客户端->[请求拦截器]->服务器端
 * token校验（JWT）：接收到服务器的token,存储到vuex/本地存储中，每次向服务器发送请求，我们应该把token带上
 * config :发起请求的请求配置项
 */
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})
/**
 * 设置响应拦截器
 * 服务器端返回信息->[响应拦截器]->客户端js获取到信息
 * response中包含属性：
 * data：相应数据,status:响应状态码,statusText：响应状态信息,headers：响应头,config：响应提供的配置信息,request
 */
axios.interceptors.response.use(response => {
    return response.data //将主体内容返回  axios.get().then(result=>{拿到的就是响应主体})
}, error => {
    let { response } = error
    if (response) {
        switch (response.status) {
            case 404:
                break;
        }
    } else {
        if (!window.navigator.onLine) {
            return
        }
        return Promise.reject(error)
    }
})
const http = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authoriztion': getToken()
    }
})

export { http }