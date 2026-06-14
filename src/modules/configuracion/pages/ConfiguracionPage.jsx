import { useState } from 'react'
import useAuthStore from '../../../app/store/useAuthStore'
import Card from '../../../shared/components/Card'
import Button from '../../../shared/components/Button'
import Input from '../../../shared/components/Input'
import styles from './ConfiguracionPage.module.css'
import { MdPalette, MdPerson, MdSave } from 'react-icons/md'

const ConfiguracionPage = () => {
  const { user, customPrimaryColor, setPrimaryColor, customBgColor, setBgColor, theme, toggleTheme } = useAuthStore()
  
  const [formData, setFormData] = useState({
    nombres: user?.nombres || '',
    apellidos: user?.apellidos || '',
    correo: user?.correo || '',
    telefono: user?.telefono || '',
    fecha_nacimiento: user?.fecha_nacimiento || '',
    username: user?.username || '',
    direccion: user?.direccion || '',
  })

  const handleColorChange = (e) => {
    setPrimaryColor(e.target.value)
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    try {
      const dataToSave = {
        ...formData,
        fecha_nacimiento: formData.fecha_nacimiento || null
      }
      const { updateUsuario } = await import('../../usuarios/services/usuariosService')
      const updatedUser = await updateUsuario(user.id, dataToSave)
      
      useAuthStore.setState({ user: updatedUser })
      
      alert('Perfil actualizado correctamente')
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      const detail = error.response?.data ? JSON.stringify(error.response.data) : error.message
      alert('Error al guardar: ' + detail)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Configuración</h1>
        <p>Personaliza tu experiencia y edita tu perfil institucional.</p>
      </header>

      <div className={styles.grid}>
        {/* Sección de Personalización UI */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <MdPalette className={styles.icon} />
            <h3>Personalización</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.field}>
              <label>Color Principal (Botones, Hovers)</label>
              <div className={styles.colorPickerWrapper}>
                <input 
                  type="color" 
                  value={customPrimaryColor || '#1B4F8A'} 
                  onChange={handleColorChange}
                  className={styles.colorPicker}
                />
                <span>{customPrimaryColor || '#1B4F8A'}</span>
              </div>
            </div>

            <div className={styles.field}>
              <label>Color de Fondo (Modo Oscuro)</label>
              <div className={styles.colorPickerWrapper}>
                <input 
                  type="color" 
                  value={customBgColor || '#0F172A'} 
                  onChange={(e) => setBgColor(e.target.value)}
                  className={styles.colorPicker}
                />
                <span>{customBgColor || '#0F172A'}</span>
              </div>
            </div>

            <div className={styles.presetsSection}>
              <h4>Sugerencias de Colores</h4>
              <div className={styles.presetGroup}>
                <div className={styles.presetGrid}>
                  {['#1B4F8A', '#0A245E', '#72A4CD', '#F1BE48', '#EFD19F', '#ACD8DB'].map(color => (
                    <div 
                      key={color} 
                      className={styles.presetCircle} 
                      style={{ background: color }}
                      onClick={() => setPrimaryColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label>Modo de Visualización</label>
              <div className={styles.themeToggle}>
                <span>Tema actual: <strong>{theme === 'dark' ? 'Oscuro' : 'Claro'}</strong></span>
                <Button variant="secondary" onClick={toggleTheme} sm>
                  Cambiar a Modo {theme === 'dark' ? 'Día' : 'Noche'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Sección de Perfil de Usuario */}
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <MdPerson className={styles.icon} />
            <h3>Datos de Usuario</h3>
          </div>
          <form className={styles.cardBody} onSubmit={handleSaveProfile}>
            <div className={styles.inputRow}>
              <Input 
                label="Nombres" 
                value={formData.nombres}
                onChange={(e) => setFormData({...formData, nombres: e.target.value})}
              />
              <Input 
                label="Apellidos" 
                value={formData.apellidos}
                onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
              />
            </div>
            
            <Input 
              label="Correo Electrónico" 
              value={formData.correo}
              disabled
            />

            <div className={styles.inputRow}>
              <Input 
                label="Teléfono" 
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              />
              <Input 
                label="Fecha de Nacimiento" 
                type="date"
                value={formData.fecha_nacimiento}
                onChange={(e) => setFormData({...formData, fecha_nacimiento: e.target.value})}
              />
            </div>

            <Input 
              label="Dirección de Residencia" 
              value={formData.direccion}
              onChange={(e) => setFormData({...formData, direccion: e.target.value})}
            />

            <div className={styles.formActions}>
              <Button type="submit" variant="primary" icon={<MdSave />}>
                Guardar Cambios
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Preview Section */}
      <Card className={styles.previewCard}>
        <h3>Vista Previa de Componentes</h3>
        <div className={styles.previewGrid}>
          <Button variant="primary">Botón Primario</Button>
          <Button variant="secondary">Botón Secundario</Button>
          <div className={styles.previewItem}>
            <span className={styles.activeIcon}><MdPalette /> Icono Activo</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ConfiguracionPage
