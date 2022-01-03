import { request } from '../index'

export function getProfile(username: string): Promise<Profile> {
  return request
    .get<profileResponse>(`/profiles/${username}`)
    .then((r) => r.profile)
}
