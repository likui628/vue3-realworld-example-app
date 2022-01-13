import { ComputedRef, ref, watch } from 'vue'
import { getProfile } from '../services/profile/getProfile'

interface UserProps {
  username: ComputedRef<string>
}

export function useProfile({ username }: UserProps) {
  const profile = ref<Profile | null>(null)

  const updateProfile = (newProfile: Profile | null) => {
    profile.value = newProfile
  }

  const fetchProfile = async () => {
    updateProfile(null)
    if (!username.value) return
    updateProfile(await getProfile(username.value))
  }
  watch(username, () => fetchProfile(), { immediate: true })

  return { profile, updateProfile }
}
