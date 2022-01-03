import { request } from '../index'

export function getUser(): Promise<User> {
  return request.get<UserResponse>('/user').then((r) => r.user)
}
