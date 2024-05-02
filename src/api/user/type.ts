// 定义用户相关数据的ts类型

// 用户登录接口携带参数的ts类型
export interface RegisterFormData {
  email: string
  captcha: string
  username: string
  password: string
  password_confirm: string
}

// 定义全部接口返回数据都拥有的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface RegisterResponData {
  code: number
  message: string
  data: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface loginResponData {
  code: number
  message: string
}
