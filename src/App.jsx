import { useEffect } from 'react'
import AppRouter from './app/router/AppRouter'
import useAuthStore from './app/store/useAuthStore'

function App() {
  const { theme, setTheme, customPrimaryColor, customBgColor } = useAuthStore()

  useEffect(() => {
    // Lógica para ajustar según el horario si no hay una preferencia manual clara
    const hour = new Date().getHours()
    const isDayTime = hour >= 6 && hour < 18

    // Si el tema no ha sido definido o queremos que sea automático
    if (!localStorage.getItem('theme-manually-set')) {
      setTheme(isDayTime ? 'light' : 'dark')
    }
  }, [setTheme])

  useEffect(() => {
    const root = document.documentElement
    
    // Aplicar tema (clase light/dark)
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }

    // Aplicar color primario personalizado
    if (customPrimaryColor) {
      root.style.setProperty('--color-primary', customPrimaryColor)
      root.style.setProperty('--color-primary-hover', `${customPrimaryColor}ee`)
    }

    // Aplicar fondo personalizado (solo si estamos en modo oscuro o manual)
    if (customBgColor && theme === 'dark') {
      root.style.setProperty('--bg-main', customBgColor)
    } else {
      root.style.removeProperty('--bg-main')
    }
  }, [theme, customPrimaryColor, customBgColor])

  return <AppRouter />
}

export default App
