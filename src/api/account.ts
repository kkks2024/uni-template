import { post } from './request'

export interface SysUser {
  id?: string
  username?: string
  inviteCode?: string
}

export interface LoginInfo {
  account: SysUser
  token: string
}

export interface LoginParam {
  account: string
  upperId: string
}

export function loginByWallet(data: LoginParam) {
  return post<LoginInfo>('/sys/wallet/user', data)
}
