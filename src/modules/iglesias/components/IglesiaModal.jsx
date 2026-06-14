import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from '../../../shared/components/Modal'
import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button'
import styles from './IglesiaModal.module.css'
import { MdMap, MdLocationOn, MdSave, MdClose, MdAutoAwesome, MdRefresh, MdCloudUpload, MdDelete } from 'react-icons/md'
import { getDepartamentos } from '../services/iglesiasService'
import { uploadImage } from '../../biblioteca/services/bibliotecaService'

const IglesiaModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [departamentos, setDepartamentos] = useState([])
  const [formData, setFormData] = useState({
    nombre: '',
    departamento: '',
    ubicacion: '',
    googleMapsLink: '',
    latitud: '',
    longitud: '',
    foto: null
  })

  useEffect(() => {
    loadDepartamentos()
  }, [])

  const loadDepartamentos = async () => {
    try {
      const data = await getDepartamentos()
      setDepartamentos(data)
    } catch (error) {
      console.error("Error cargando departamentos:", error)
    }
  }

  // Cargar datos si estamos editando
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        departamento: initialData.departamento || '',
        ubicacion: initialData.ubicacion || '',
        googleMapsLink: initialData.googleMapsLink || '',
        latitud: initialData.latitud || '',
        longitud: initialData.longitud || '',
        foto: initialData.foto_detalle || null
      })
    } else {
      setFormData({
        nombre: '',
        departamento: '',
        ubicacion: '',
        googleMapsLink: '',
        latitud: '',
        longitud: '',
        foto: null
      })
    }
  }, [initialData, isOpen])

  // Lógica para extraer coordenadas automáticamente si el link es largo
  useEffect(() => {
    if (formData.googleMapsLink.includes('@')) {
      const parts = formData.googleMapsLink.split('@')[1].split(',')
      if (parts.length >= 2) {
        setFormData(prev => ({
          ...prev,
          latitud: parts[0],
          longitud: parts[1]
        }))
      }
    }
  }, [formData.googleMapsLink])

  const interpretWithIA = async () => {
    if (!formData.googleMapsLink) return

    setIsLoading(true)
    try {
      const apiKey = import.meta.env.VITE_API_KEY_GROQ
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "Eres un asistente experto en geolocalización. Tu tarea es extraer o identificar coordenadas (latitud y longitud) a partir de un texto o link de Google Maps. Responde estrictamente en formato JSON con las llaves: 'latitud', 'longitud' y 'nombre_lugar'. Si no puedes determinar las coordenadas, devuelve valores vacíos."
            },
            {
              role: "user",
              content: `Extrae las coordenadas de este link o lugar: ${formData.googleMapsLink}`
            }
          ],
          response_format: { type: "json_object" }
        },
        { headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
      )

      const result = JSON.parse(response.data.choices[0].message.content)
      if (result.latitud && result.longitud) {
        setFormData(prev => ({
          ...prev,
          nombre: result.nombre_lugar || prev.nombre,
          latitud: result.latitud.toString(),
          longitud: result.longitud.toString()
        }))
      }
    } catch (error) {
      console.error("Error interpretando con IA:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        setIsLoading(true)
        const imageData = await uploadImage(file)
        setFormData(prev => ({ ...prev, foto: imageData.id, foto_detalle: imageData }))
      } catch (error) {
        alert("Error al subir la imagen")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar Iglesia" : "Registrar Nueva Iglesia"} size="lg">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.column}>
            {/* Sección de Foto */}
            <div className={styles.photoSection}>
              <label className={styles.label}>Foto de la Fachada</label>
              <div className={styles.photoUpload}>
                {formData.foto_detalle ? (
                  <div className={styles.photoPreviewContainer}>
                    <img src={formData.foto_detalle.url} alt="Preview" className={styles.photoPreview} />
                    <button 
                      type="button" 
                      className={styles.deletePhoto} 
                      onClick={() => setFormData(prev => ({ ...prev, foto: null, foto_detalle: null }))}
                    >
                      <MdDelete />
                    </button>
                  </div>
                ) : (
                  <label className={styles.photoLabel}>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                    <MdCloudUpload size={32} />
                    <span>{isLoading ? 'Subiendo...' : 'Subir Foto'}</span>
                  </label>
                )}
              </div>
            </div>

            <Input
              label="Nombre de la Iglesia"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Iglesia Central Santa Cruz"
              required
            />
            <div className={styles.row}>
              <div className={styles.flex1}>
                <label className={styles.label}>Departamento</label>
                <select 
                  name="departamento" 
                  value={formData.departamento} 
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="">Seleccionar...</option>
                  {departamentos.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            <Input
              label="Dirección Detallada"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              placeholder="Ej: Av. Bush entre 2do y 3er anillo"
            />
          </div>

          <div className={styles.column}>
            <div className={styles.mapHeader}>
              <MdMap /> <span>Ubicación Geográfica</span>
            </div>
            
            <div className={styles.aiInputGroup}>
              <Input
                label="Enlace de Google Maps / Nombre del Lugar"
                name="googleMapsLink"
                value={formData.googleMapsLink}
                onChange={handleChange}
                placeholder="Pegue el link o escriba el nombre..."
                icon={<MdLocationOn />}
              />
              <button 
                type="button" 
                className={styles.aiButton} 
                onClick={interpretWithIA}
                disabled={isLoading || !formData.googleMapsLink}
                title="Interpretar con IA"
              >
                {isLoading ? <MdRefresh className={styles.spin} /> : <MdAutoAwesome />}
                <span>IA</span>
              </button>
            </div>

            <div className={styles.coordRow}>
              <Input
                label="Latitud"
                name="latitud"
                value={formData.latitud}
                onChange={handleChange}
                placeholder="0.0000"
                readOnly
              />
              <Input
                label="Longitud"
                name="longitud"
                value={formData.longitud}
                onChange={handleChange}
                placeholder="0.0000"
                readOnly
              />
            </div>
            
            <div className={styles.helperText}>
              * Usa el botón <strong>IA</strong> para que la inteligencia artificial identifique las coordenadas automáticamente.
            </div>
          </div>
        </div>

        {/* Vista previa del mapa */}
        {formData.latitud && formData.longitud && (
          <div className={styles.mapPreview}>
            <div className={styles.mapHeader}>
              <MdMap /> <span>Confirmar Ubicación</span>
            </div>
            <iframe
              title="Ubicación de la iglesia"
              width="100%"
              height="200"
              frameBorder="0"
              style={{ border: 0, borderRadius: '12px' }}
              src={`https://maps.google.com/maps?q=${formData.latitud},${formData.longitud}&z=16&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className={styles.footer}>
          <Button type="button" variant="secondary" onClick={onClose} icon={<MdClose />}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" icon={<MdSave />}>
            Guardar Iglesia
          </Button>
        </div>
      </form>
    </Modal>
  )
}

IglesiaModal.DeleteConfirm = ({ isOpen, onClose, onConfirm, nombre }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Eliminación" size="sm">
    <div className={styles.deleteContent}>
      <div className={styles.warningIcon}><MdDelete size={48} /></div>
      <p>¿Estás seguro de eliminar permanentemente la iglesia <strong>{nombre}</strong>?</p>
      <p className={styles.deleteSubtitle}>Esta acción no se puede deshacer.</p>
      <div className={styles.deleteFooter}>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirm} style={{ background: '#ef4444' }}>Eliminar Ahora</Button>
      </div>
    </div>
  </Modal>
)

export default IglesiaModal
