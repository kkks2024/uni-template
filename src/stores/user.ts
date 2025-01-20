import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('dao', () => {
  const token = ref('')

  function setToken(newToken: string) {
    token.value = newToken
  }

  const userInfo = ref()

  async function syncInfo() {

  }

  return { token, userInfo, setToken, syncInfo }
})
