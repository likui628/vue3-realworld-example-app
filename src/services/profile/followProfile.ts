import { request } from '../index'

export function postFollowProfile(username: string): Promise<Profile> {
  return request
    .post<profileResponse>(`/profiles/${username}/follow`)
    .then((r) => r.profile)
}

export function deleteFollowProfile(username: string): Promise<Profile> {
  return request
    .delete<profileResponse>(`/profiles/${username}/follow`)
    .then((r) => r.profile)
}
