import { computed, ComputedRef, ref, watch } from 'vue'
import { getProfile } from '../services/profile/getProfile'
import {
  deleteFollowProfile,
  postFollowProfile,
} from '../services/profile/followProfile'

interface UserProps {
  username: ComputedRef<string>
}

export function useProfile({ username }: UserProps) {
  const profile = ref<Profile | null>(null)

  const fetchProfile = async () => {
    if (username.value) {
      profile.value = await getProfile(username.value)
    }
  }
  watch(username, () => fetchProfile(), { immediate: true })

  const following = computed(() => profile.value?.following)

  const followPending = ref(false)

  const followProfile = async () => {
    followPending.value = true
    try {
      const func = following.value ? deleteFollowProfile : postFollowProfile
      profile.value = await func(username.value)
    } finally {
      followPending.value = false
    }
  }
  return { profile, following, followProfile, followPending }
}
