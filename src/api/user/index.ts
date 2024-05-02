//统一管理咱们项目用户相关的接口

import request from '../../utils/request'
import type {
  RegisterFormData,
  LoginFormData,
  loginResponData,
  RegisterResponData,
} from './type'

//项目用户相关的请求地址

enum API {
  REGISTER_URL = '/author/register',
  LOGIN_URL = '/author/login',
  GET_CAPTCHA = '/author/email/captcha',
  GET_USER_INFORMATION = '/user/list',
  POST_USER_ADD = '/user/listPageC1',
}

export const registerTest = (data: RegisterFormData) =>
  request.post<any, RegisterResponData>(API.REGISTER_URL, data)

export const loginTest = (data: LoginFormData) => {
  return request.post<any, loginResponData>(API.LOGIN_URL, data)
}

export const getCaptcha = (data: string) => {
  return request.get<any>(API.GET_CAPTCHA, {
    params: { email: data },
  })
}

export const getUserList = () => {
  return request.get<any>(API.GET_USER_INFORMATION)
}

export const postUser = (data: {
  pageSize: number
  PageNum: number
  param: { name: string }
}) => {
  return request.post<any>(API.POST_USER_ADD, data)
}

// export const postNameData = (data: {
//   pageSize: number
//   PageNum: number
//   param: { key: string }
// }) => {}
