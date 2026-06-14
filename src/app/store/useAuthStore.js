import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      sidebarOpen: true,
      theme: 'dark',
      customPrimaryColor: '#6366f1',
      customBgColor: '#0a0a14',

      setAuth: (user, token, refreshToken) =>
        set({ user, token, refreshToken }),

      logout: () =>
        set({ user: null, token: null, refreshToken: null }),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setTheme: (theme) => set({ theme }),
      setPrimaryColor: (color) => set({ customPrimaryColor: color }),
      setBgColor: (color) => set({ customBgColor: color }),

      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme-manually-set', 'true')
        set({ theme: newTheme })
      },

      isAuthenticated: () => !!get().token,

      hasRole: (roles) => {
        const user = get().user
        if (!user) return false
        return roles.includes(user.tipo)
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        customPrimaryColor: state.customPrimaryColor,
        customBgColor: state.customBgColor,
      }),
    }
  )
)

export default useAuthStore
