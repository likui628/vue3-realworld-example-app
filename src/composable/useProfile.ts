import { ComputedRef, ref, watch } from 'vue'
import { getProfile } from '../services/profile/getProfile'

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
  return { profile }
}
