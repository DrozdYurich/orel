
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./useUserStore";
import { useRouter } from "vue-router";
import axios from "axios";
import { apiClient } from "@/main";
export const useAuthStore = defineStore("auth", () => {
 const router = useRouter()
  const userStore = useUserStore();
  function logout() {
    userStore.removeUser();
  }
 

  async function login(user) {
    console.log(user)
    try {
         const response = await apiClient.post('/user/login', user); // ← передаём user, а не requestData
          console.log('Успешно :', response.data);
      userStore.setUser(response.data)
      console.log(userStore.getUser)
      console.log(userStore.getAuth)
      router.push('/')
    } catch (err) {
     console.log('dd')
     router.push('/auth')
    } 
  }
 async function registr(user) {
  try {
    // Используем await → ждём ответа от сервера
    const response = await apiClient.post('/user/register', user); // ← передаём user, а не requestData

    console.log('Успешно создан пользователь:', response.data);

    // Только после успешного ответа — обновляем store и редиректим
    userStore.setUser(response.data);
    console.log(userStore.getUser);
    console.log(userStore.getAuth);
    router.push('/');
  } catch (error) {
    console.error('Ошибка при регистрации:', error.response?.data || error.message);
    router.push('/auth');
  }
}
  const getIsAuth = computed(()=>isAuth.value)
  return {
    login,
    logout,
    getIsAuth,
    registr
  };
});
