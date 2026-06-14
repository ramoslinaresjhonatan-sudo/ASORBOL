import { getUsuarios } from '../services/usuariosService'
import CrudPage from '../../../shared/components/CrudPage'
import styles from '../../_shared/ModulePage.module.css'
import { MdPersonAdd } from 'react-icons/md'

const columns = [
  { 
    key: 'foto_url', 
    label: '', 
    render: (v) => (
      <div className="table-avatar" style={{ width: '40px', height: '40px' }}>
        <img src={v || '/imagenes/default-avatar.png'} alt="Avatar" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} />
      </div>
    )
  },
  { key: 'nombres', label: 'Usuario', render: (v, row) => (
    <div className="table-user-info">
      <span className="table-user-name">{v} {row.apellidos || ''}</span>
      <span className="table-user-sub">{row.username}</span>
    </div>
  )},
  { key: 'correo', label: 'Correo' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'direccion', label: 'Dirección' },
  { key: 'fecha_nacimiento', label: 'Nacimiento', render: (v) => v || 'No reg.' },
  { key: 'tipo', label: 'Rol' },
  { key: 'fecha_registro', label: 'Registro', render: (v) => v ? new Date(v).toLocaleDateString() : 'N/A' },
  { key: 'estado', label: 'Estado', render: (v) => (
    <span className={`pill ${v ? 'pill-success' : 'pill-danger'}`}>
      {v ? 'Activo' : 'Inactivo'}
    </span>
  )},
]

const UsuariosPage = () => {
  return (
    <CrudPage
      title="Usuarios"
      subtitle="Gestión y control de acceso de personal institucional"
      columns={columns}
      fetchData={getUsuarios}
      onAdd={() => console.log('Nuevo usuario')}
      addLabel="Nuevo usuario"
      addIcon={<MdPersonAdd />}
    />
  )
}

export default UsuariosPage
