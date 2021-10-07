import { ValidationError } from '../../types/errors'
import { request } from '../index'

export interface PostLoginForm {
  email: string
  password: string
}

export async function postLogin(form: PostLoginForm): Promise<any> {
  return request
    .post<UserResponse>('/users/login', { user: form })
    .then((res) => res.user)
    .catch(async (error) => {
      if (error instanceof ValidationError) {
        throw await error.getErrors()
      }
    })
}
