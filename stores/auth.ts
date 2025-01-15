interface loginData {
  login: string;
  password: string;
}

interface User {
  login: string;
  role: string;
}

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie("token");
  const refreshToken = useCookie("refreshToken");
  const user = useCookie<User | null>("user");
  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: loginData) {
    try {
      const data = await $fetch<{
        token: string;
        user: User;
        refreshToken: string;
      }>(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        body: {
          login: credentials.login,
          password: credentials.password,
        },
      });

      if (data) {
        token.value = data.token;
        refreshToken.value = data.refreshToken;
        user.value = data.user;
        return { success: true };
      }
    } catch (error: any) {
      const message = error.response?._data?.message;
      logout();
      return { success: false, message };
    }
  }

  async function fetchUser() {
    try {
      const data = await $fetch<{ login: string; role: string }>(
        `${import.meta.env.VITE_API_URL}/auth/fetch`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "x-refresh-token": `${refreshToken.value}`,
          },
          responseType: "json",
          onResponse({ response }) {
            const newToken = response.headers.get("x-new-access-token");
            if (newToken) {
              token.value = newToken;
            }
          },
        }
      );

      if (data) {
        user.value = { login: data.login, role: data.role };
      }
    } catch (error: any) {
      logout();
    }
  }

  function logout(): void {
    token.value = null;
    refreshToken.value = null;
    user.value = null;
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    fetchUser,
    logout,
    refreshToken,
  };
});
