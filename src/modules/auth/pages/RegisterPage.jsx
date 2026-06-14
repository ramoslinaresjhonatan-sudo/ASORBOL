import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { removeBackground } from '@imgly/background-removal'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '../util/cropImage'
import { registerService } from '../services/authService'
import styles from './RegisterPage.module.css'
import axios from 'axios'
import { 
  MdOutlineMail, 
  MdLockOutline, 
  MdVisibility, 
  MdVisibilityOff, 
  MdArrowBack, 
  MdPersonOutline,
  MdPublic,
  MdPhotoCamera,
  MdDelete,
  MdPhone,
  MdBadge,
  MdLocationOn,
  MdCalendarToday
} from 'react-icons/md'

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()
  
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [processingPhoto, setProcessingPhoto] = useState(false)
  
  // States para el Cropper
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [showCropper, setShowCropper] = useState(false)
  const [tempPhotoUrl, setTempPhotoUrl] = useState(null)
  const [uploadingToCloud, setUploadingToCloud] = useState(false)
  const [imgbbUrl, setImgbbUrl] = useState('')

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setProcessingPhoto(true)
      try {
        const blob = await removeBackground(file)
        const url = URL.createObjectURL(blob)
        setTempPhotoUrl(url)
        setShowCropper(true)
      } catch (err) {
        console.error("Error al quitar fondo:", err)
        const url = URL.createObjectURL(file)
        setTempPhotoUrl(url)
        setShowCropper(true)
      } finally {
        setProcessingPhoto(false)
      }
    }
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleCropConfirm = async () => {
    try {
      setUploadingToCloud(true)
      const croppedBlob = await getCroppedImg(tempPhotoUrl, croppedAreaPixels)
      const croppedFile = new File([croppedBlob], "avatar.png", { type: 'image/png' })
      
      // Subir a ImgBB
      const formData = new FormData()
      formData.append('image', croppedFile)
      
      const { data: result } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
      
      if (result.success) {
        setImgbbUrl(result.data.url)
        setPhotoPreview(result.data.url)
        setShowCropper(false)
      } else {
        throw new Error('Error al subir a ImgBB')
      }
    } catch (e) {
      console.error(e)
      setError('No se pudo subir la foto a la nube. Inténtalo de nuevo.')
    } finally {
      setUploadingToCloud(false)
    }
  }

  const removePhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
  }

  const onSubmit = async (data) => {
    if (!imgbbUrl) {
      setError('La foto de perfil es obligatoria.')
      return
    }

    setError('')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('nombres', data.nombres)
      formData.append('apellidos', data.apellidos || '')
      formData.append('correo', data.correo)
      formData.append('password', data.password)
      formData.append('telefono', data.telefono || '')
      formData.append('direccion', data.direccion || '')
      formData.append('fecha_nacimiento', data.fecha_nacimiento || '')
      formData.append('tipo_usuario', 2)
      formData.append('foto_perfil_url', imgbbUrl) // Enviamos la URL de la nube
      
      await registerService(formData)
      navigate('/login', { state: { message: 'Cuenta creada exitosamente. Por favor, inicia sesión.' } })
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la cuenta. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const password = watch('password')

  return (
    <div className={styles.loginWrapper}>
      
      {/* PANEL IZQUIERDO: Branding */}
      <div className={styles.brandPanel}>
        <div className={styles.brandOverlay} style={{backgroundImage: "url('/imagenes/login-bg.png')"}}></div>
        <div className={styles.brandContent}>
          <div className={styles.logoContainer}>
            <img src="/imagenes/asorbol-crema.png" alt="ASORBOL" />
          </div>
          <div className={styles.brandText}>
            <h2>Sé parte de<br/>nuestra misión.</h2>
            <p>Únete a SORBOL y contribuye al desarrollo de proyectos sociales y valores en nuestra comunidad.</p>
          </div>
          
          <div className={styles.glassCard}>
            <MdPublic size={40} color="#71BEE9" />
            <div>
              <strong>Comunidad Unida</strong>
              <span>Conectando personas con propósito</span>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL DERECHO: Formulario */}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          
          <div className={styles.registerHeader}>
            <h1>Crear cuenta</h1>
            <p>Únete hoy mismo a la plataforma Sorbol</p>
          </div>

          <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
            
            {/* Carga de Foto de Perfil */}
            <div className={styles.photoUploadContainer}>
              <div className={styles.photoPreviewWrapper}>
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className={`${styles.avatarPreview} ${processingPhoto ? styles.processing : ''}`} />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <MdPersonOutline />
                  </div>
                )}
                
                {processingPhoto && (
                  <div className={styles.processingOverlay}>
                    <div className={styles.miniSpinner}></div>
                    <span>IA...</span>
                  </div>
                )}

                <label htmlFor="photo-input" className={styles.photoUploadBtn}>
                  <MdPhotoCamera />
                </label>
                {photoPreview && !processingPhoto && (
                  <button type="button" className={styles.removePhotoBtn} onClick={removePhoto}>
                    <MdDelete />
                  </button>
                )}
              </div>
              <input 
                id="photo-input"
                type="file" 
                accept="image/*"
                className={styles.hiddenInput} 
                onChange={handlePhotoChange}
                disabled={processingPhoto}
              />
              <p className={styles.photoHint}>
                {processingPhoto ? 'Quitando fondo con IA...' : 'Foto de perfil (Obligatoria)'}
              </p>
            </div>

            {/* MODAL DEL CROPPER */}
            {showCropper && (
              <div className={styles.cropperModal}>
                <div className={styles.cropperContainer}>
                  <div className={styles.cropperWrap}>
                    <Cropper
                      image={tempPhotoUrl}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      cropShape="rect"
                      showGrid={false}
                    />
                  </div>
                  <div className={styles.cropperControls}>
                    <div className={styles.zoomControl}>
                      <span>Zoom</span>
                      <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(e.target.value)}
                        className={styles.zoomSlider}
                      />
                    </div>
                    <div className={styles.cropperActions}>
                      <button 
                        type="button" 
                        className={styles.cancelCropBtn} 
                        onClick={() => setShowCropper(false)}
                      >
                        Cancelar
                      </button>
                      <button 
                        type="button" 
                        className={styles.confirmCropBtn} 
                        onClick={handleCropConfirm}
                        disabled={uploadingToCloud}
                      >
                        {uploadingToCloud ? 'Subiendo...' : 'Confirmar y Subir'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fila: Nombres y Apellidos */}
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Nombres</label>
                <div className={styles.inputWrapper}>
                  <MdPersonOutline className={styles.inputIcon} />
                  <input 
                    type="text" 
                    placeholder="Ej. Juan" 
                    {...register('nombres', { required: 'El nombre es obligatorio' })} 
                    className={errors.nombres ? styles.inputError : ''}
                  />
                </div>
                {errors.nombres && <span className={styles.errorText}>{errors.nombres.message}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Apellidos</label>
                <div className={styles.inputWrapper}>
                  <MdBadge className={styles.inputIcon} />
                  <input 
                    type="text" 
                    placeholder="Ej. Pérez" 
                    {...register('apellidos')} 
                  />
                </div>
              </div>
            </div>

            {/* Fila: Correo y Fecha de Nacimiento */}
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Correo Electrónico</label>
                <div className={styles.inputWrapper}>
                  <MdOutlineMail className={styles.inputIcon} />
                  <input 
                    type="email" 
                    placeholder="ejemplo@sorbol.com" 
                    {...register('correo', { 
                      required: 'El correo es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Correo inválido"
                      }
                    })} 
                    className={errors.correo ? styles.inputError : ''}
                  />
                </div>
                {errors.correo && <span className={styles.errorText}>{errors.correo.message}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Teléfono</label>
                <div className={styles.inputWrapper}>
                  <MdPhone className={styles.inputIcon} />
                  <input 
                    type="tel" 
                    placeholder="999 999 999" 
                    {...register('telefono')} 
                  />
                </div>
              </div>
            </div>

            {/* Fila: Fecha de Nacimiento y Dirección */}
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Fecha de Nacimiento</label>
                <div className={styles.inputWrapper}>
                  <MdCalendarToday className={styles.inputIcon} />
                  <input 
                    type="date" 
                    {...register('fecha_nacimiento')} 
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Dirección (Opcional)</label>
                <div className={styles.inputWrapper}>
                  <MdLocationOn className={styles.inputIcon} />
                  <input 
                    type="text" 
                    placeholder="Calle, Ciudad, Nº..." 
                    {...register('direccion')} 
                  />
                </div>
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
                  {...register('password', { 
                    required: 'La contraseña es obligatoria',
                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                  })} 
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
              {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
            </div>

            {/* Input Confirmar Contraseña */}
            <div className={styles.inputGroup}>
              <label>Confirmar Contraseña</label>
              <div className={styles.inputWrapper}>
                <MdLockOutline className={styles.inputIcon} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  {...register('confirmPassword', { 
                    validate: value => value === password || "Las contraseñas no coinciden"
                  })} 
                  className={errors.confirmPassword ? styles.inputError : ''}
                />
              </div>
              {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>}
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Registrarse'}
            </button>

          </form>

          <div className={styles.registerFooter}>
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
            <button className={styles.backBtn} onClick={() => navigate('/')}>
              <MdArrowBack />
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
