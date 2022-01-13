import { ComputedRef, ref } from 'vue'
import { routerPush } from '../router'
import { userStore } from '../store/user'
import {
  deleteFollowProfile,
  postFollowProfile,
} from '../services/profile/followProfile'

interface UserProps {
  isFollowing: ComputedRef<boolean>
  username: ComputedRef<string>
  onUpdate: (newProfile: Profile) => void
}

export function useFollow({ isFollowing, username, onUpdate }: UserProps) {
  const followPending = ref(false)
  const store = userStore()

  const followProfile = async () => {
    if (!store.user) {
      return await routerPush('login')
    }
    followPending.value = true
    try {
      const func = isFollowing.value ? deleteFollowProfile : postFollowProfile
      onUpdate(await func(username.value))
    } finally {
      followPending.value = false
    }
  }
  return { followProfile, followPending }
}
