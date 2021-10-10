import { ValidationError } from '../../types/errors'
import { request } from '../index'

export interface PostRegisterForm {
  email: string
  password: string
  username: string
}

export type PostRegisterErrors = Partial<Record<keyof PostRegisterForm, string[]>>

export async function postRegister(form: PostRegisterForm): Promise<User | any> {
  return request
    .post<UserResponse>('/users', { user: form })
    .then((res) => res.user)
    .catch(async (error) => {
      if (error instanceof ValidationError) {
        throw await error.getErrors()
      }
    })
}
