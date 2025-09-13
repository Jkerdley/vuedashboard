import { ref } from 'vue'

export const isLoggedIn = ref(false)

export const login = () => {
  isLoggedIn.value = true
}

export const logout = () => {
  isLoggedIn.value = false
}
