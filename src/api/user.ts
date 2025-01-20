import { get, post } from './request'

export function addUserConfig(type: string, config: any, configId: string) {
  return post<never>(`/common.biz/bizConfig/user/${type}`, { config, configId })
}

export function getUserConfig(type: string, id: string) {
  return get<any>(`/common.biz/bizConfig/user/${type}/${id}`)
}
