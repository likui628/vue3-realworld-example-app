import { request } from '../index'

export interface PutUserForm {
  username?: string
  bio?: string
  image?: string
  email?: string
  password?: string
}

export function putUser(userForm: PutUserForm): Promise<User> {
  return request
    .put<UserResponse>('/user', { user: userForm })
    .then((r) => r.user)
}
