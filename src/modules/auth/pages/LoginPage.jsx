  import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAuthStore from '../../../app/store/useAuthStore'
import { loginService } from '../services/authService'
import styles from './LoginPage.module.css'
import { MdOutlineMail, MdLockOutline, MdVisibility, MdVisibilityOff, MdArrowBack, MdPublic } from 'react-icons/md'

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async ({ correo, password }) => {
    setError('')
    setLoading(true)
    try {
      const data = await loginService(correo, password)
      setAuth(data.user, data.access, data.refresh)
      navigate('/dashboard')
    } catch {
      setError('Correo o contraseña incorrectos. Verifica tus datos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginWrapper}>
      
      {/* PANEL IZQUIERDO: Branding */}
      <div className={styles.brandPanel}>
        <div className={styles.brandOverlay} style={{backgroundImage: "url('/imagenes/login-bg.png')"}}></div>
        <div className={styles.brandContent}>
          <div className={styles.logoContainer}>
            <img src="/imagenes/asorbol-crema.png" alt="ASORBOL" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<h1 style="color:white; margin:0; font-size:2rem;">S</h1>'; }} />
          </div>
          <div className={styles.brandText}>
            <h2>Crece por dentro<br/>y sirve afuera.</h2>
            <p>Educación, valores y proyectos de ayuda social en un solo lugar. Únete a lo que Dios está haciendo en nuestra región.</p>
          </div>
          
          <div className={styles.glassCard}>
            <MdPublic size={40} color="#71BEE9" />
            <div>
              <strong>Presencia Nacional</strong>
              <span>Impactando vidas en cada rincón</span>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL DERECHO: Formulario */}
      <div className={styles.formPanel}>
        
        <div className={styles.mobileHeader}>
          <button type="button" className={styles.mobileBackBtn} onClick={() => navigate('/')}>
            <MdArrowBack />
          </button>
        </div>

        <div className={styles.formContainer}>
          
          <div className={styles.mobileIllustration}>
            <img src="/imagenes/login-bg.png" alt="SORBOL" />
            <div className={styles.mobileIllustrationOverlay}></div>
          </div>

          <div className={styles.loginHeader}>
            <h1>Bienvenido de nuevo</h1>
            <p>Ingresa a tu cuenta para continuar en el sistema Sorbol</p>
          </div>

          {location.state?.message && (
            <div className={styles.successMessage}>
              {location.state.message}
            </div>
          )}

          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            
            {/* Input Correo */}
            <div className={styles.inputGroup}>
              <label>Correo Electrónico</label>
              <div className={styles.inputWrapper}>
                <MdOutlineMail className={styles.inputIcon} />
                <input 
                  type="email" 
                  placeholder="ejemplo@sorbol.com" 
                  {...register('correo', { required: true })} 
                  className={errors.correo ? styles.inputError : ''}
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div className={styles.inputGroup}>
              <label>Contraseña</label>
              <div className={styles.inputWrapper}>
                <MdLockOutline className={styles.inputIcon} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  {...register('password', { required: true })} 
                  className={errors.password ? styles.inputError : ''}
                />
                <button 
                  type="button" 
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>Recordarme</span>
              </label>
              <a href="#" className={styles.forgotLink}>¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Verificando...' : 'Iniciar Sesión'}
            </button>

          </form>

          <div className={styles.loginFooter}>
            <p className={styles.registerPrompt}>
              ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
            <button className={styles.backBtn} onClick={() => navigate('/')}>
              <MdArrowBack />
              Volver al sitio principal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
