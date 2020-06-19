import request from '@/utils/request.js'

export const _API_ImgCode = '/apps.account.getCaptcha' // 获取图片验证码链接

export const _API_LoginPsw = data => request.get('/apps.account.login', data) // 密码登录

export const _API_GetCode6 = data => request.get('/apps.account.verifycode', data) // 获取手机验证码
export const _API_LoginCode = data => request.get('/apps.account.loginvcode', data) // 手机验证码登录

export const _API_ResetPsw = data => request.post('/apps.account.forget', data) // 重置密码

export const _API_Reg = data => request.post('/apps.account.register', data) // 注册

