import { useState, useEffect } from 'react'
import Modal from '../../../shared/components/Modal'
import Button from '../../../shared/components/Button'
import styles from './UserPermissionsModal.module.css'
import { MdSave, MdClose, MdSecurity, MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md'
import { mockRoles } from '../../../shared/data/mockData'

const PERMISSION_LABELS = {
  'inventory.*': 'Administración Total de Biblioteca',
  'inventory.view_libro': 'Ver Catálogo de Libros',
  'inventory.add_libro': 'Registrar Libros',
  'inventory.change_libro': 'Editar Libros',
  'inventory.view_autor': 'Ver Autores',
  'inventory.view_categoria': 'Ver Categorías',
  'locations.*': 'Administración Total de Iglesias',
  'locations.view_iglesia': 'Ver Mapa de Iglesias',
  'finance.*': 'Administración Total de Finanzas',
  'finance.view_pago': 'Ver Historial de Pagos',
  'finance.add_pago': 'Registrar Pagos Manuales',
  'finance.change_pago': 'Validar / Aprobar Pagos',
  'finance.view_validacionia': 'Ver Resultados de IA',
  'users.*': 'Administración de Usuarios',
  'users.view_user': 'Ver Perfiles y Gafetes',
  'audit.*': 'Ver Auditoría del Sistema'
}

const UserPermissionsModal = ({ isOpen, onClose, onSave, user }) => {
  const [selectedPerms, setSelectedPerms] = useState([])
  
  // Obtener permisos del rol base del usuario
  const roleData = mockRoles.find(r => r.nombre === user?.tipo)
  const inheritedPerms = roleData?.permisos || []

  useEffect(() => {
    if (user && user.permisos_manuales) {
      setSelectedPerms(user.permisos_manuales)
    } else {
      setSelectedPerms([])
    }
  }, [user, isOpen])

  const togglePermission = (code) => {
    // No permitir quitar un permiso que ya viene heredado del rol (a menos que se quiera manejar exclusiones, pero aquí manejamos sumas)
    if (inheritedPerms.includes(code) || inheritedPerms.includes(code.split('.')[0] + '.*')) return

    setSelectedPerms(prev => 
      prev.includes(code) ? prev.filter(p => p !== code) : [...prev, code]
    )
  }

  const isInherited = (code) => {
    const root = code.split('.')[0] + '.*'
    return inheritedPerms.includes(code) || inheritedPerms.includes(root)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(user.id, selectedPerms)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Gestionar Accesos: ${user?.nombres}`} size="lg">
      <div className={styles.info}>
        <MdSecurity size={24} color="var(--color-primary)" />
        <div>
          <p>Rol Base: <strong>{user?.tipo}</strong></p>
          <p className={styles.subtitle}>Los permisos marcados con <MdCheckCircle color="#10b981" size={14} /> son heredados del rol y no se pueden quitar desde aquí.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {Object.entries(PERMISSION_LABELS).map(([code, label]) => {
            const inherited = isInherited(code)
            const manual = selectedPerms.includes(code)
            const active = inherited || manual

            return (
              <div 
                key={code} 
                className={`${styles.permItem} ${active ? styles.active : ''} ${inherited ? styles.inherited : ''}`}
                onClick={() => !inherited && togglePermission(code)}
              >
                <div className={styles.icon}>
                  {inherited ? <MdCheckCircle color="#10b981" /> : (manual ? <MdCheckCircle color="var(--color-primary)" /> : <MdRadioButtonUnchecked />)}
                </div>
                <div className={styles.text}>
                  <span className={styles.label}>{label}</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <code className={styles.code}>{code}</code>
                    {inherited && <span className={styles.tagInherited}>Heredado</span>}
                    {manual && <span className={styles.tagManual}>Manual</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className={styles.footer}>
          <Button type="button" variant="secondary" onClick={onClose} icon={<MdClose />}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" icon={<MdSave />}>
            Guardar Cambios
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default UserPermissionsModal
