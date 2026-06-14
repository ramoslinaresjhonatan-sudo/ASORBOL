import { useState } from 'react'
import Card from '../../../shared/components/Card'
import Table from '../../../shared/components/Table'
import Button from '../../../shared/components/Button'
import { mockRoles, mockUsuarios } from '../../../shared/data/mockData'
import styles from '../../_shared/ModulePage.module.css'
import { MdAdd, MdSecurity, MdPerson, MdSettings, MdSearch } from 'react-icons/md'
import UserPermissionsModal from '../components/UserPermissionsModal'

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

const RolesPage = () => {
  const [activeTab, setActiveTab] = useState('roles')
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [usuarios, setUsuarios] = useState(mockUsuarios.map(u => ({ ...u, permisos_manuales: [] })))

  const rolesColumns = [
    { key: 'id', label: '#' },
    { key: 'nombre', label: 'Rol', render: (v) => <strong style={{ color: 'var(--color-primary)' }}>{v}</strong> },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'permisos', label: 'Permisos Habilitados', render: (v) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {v.map((p, i) => (
          <span key={i} style={{ 
            fontSize: '0.75rem', 
            background: 'var(--bg-active)', 
            padding: '4px 10px', 
            borderRadius: '8px',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
            fontWeight: '500'
          }}>
            {PERMISSION_LABELS[p] || p}
          </span>
        ))}
      </div>
    )},
  ]

  const usersColumns = [
    { key: 'id', label: '#' },
    { key: 'nombres', label: 'Usuario', render: (v, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MdPerson color="var(--color-primary)" />
        </div>
        <div>
          <div style={{ fontWeight: 'bold' }}>{v} {row.apellidos}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{row.email}</div>
        </div>
      </div>
    )},
    { key: 'tipo', label: 'Rol Base', render: (v) => (
      <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>{v}</span>
    )},
    { key: 'permisos_manuales', label: 'Permisos Extra', render: (v) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {v.length > 0 ? v.map((p, i) => (
          <span key={i} style={{ fontSize: '0.7rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
            {PERMISSION_LABELS[p] || p}
          </span>
        )) : <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Ninguno</span>}
      </div>
    )},
    { key: 'acciones', label: 'Acciones', render: (_, row) => (
      <button 
        onClick={() => { setSelectedUser(row); setIsModalOpen(true); }}
        style={{ background: 'var(--bg-active)', color: 'var(--color-primary)', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
      >
        <MdSettings /> Gestionar
      </button>
    )}
  ]

  const filteredRoles = mockRoles.filter(role => 
    role.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUsers = usuarios.filter(user => 
    user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSavePerms = (userId, newPerms) => {
    setUsuarios(usuarios.map(u => u.id === userId ? { ...u, permisos_manuales: newPerms } : u))
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Roles y Permisos</h1>
          <p className={styles.subtitle}>Configuración de acceso y seguridad del sistema</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Buscador Dinámico */}
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '0.8rem', 
            background: 'var(--bg-hover)', padding: '8px 16px', 
            borderRadius: '12px', border: '1px solid var(--border-color)',
            minWidth: '280px'
          }}>
            <MdSearch color="var(--color-text-muted)" size={20} />
            <input 
              type="text" 
              placeholder={`Buscar ${activeTab === 'roles' ? 'rol' : 'usuario'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'none', border: 'none', color: 'var(--color-text)', fontSize: '0.9rem', width: '100%', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', background: 'var(--bg-hover)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <button 
              onClick={() => { setActiveTab('roles'); setSearchTerm(''); }}
              style={{ 
                padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600',
                background: activeTab === 'roles' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'roles' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                boxShadow: activeTab === 'roles' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                transition: 'all 0.2s'
              }}
            >Roles</button>
            <button 
              onClick={() => { setActiveTab('usuarios'); setSearchTerm(''); }}
              style={{ 
                padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600',
                background: activeTab === 'usuarios' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'usuarios' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                boxShadow: activeTab === 'usuarios' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                transition: 'all 0.2s'
              }}
            >Asignación Manual</button>
          </div>
        </div>
      </div>

      {activeTab === 'roles' ? (
        <>
          <Card>
            <Table columns={rolesColumns} data={filteredRoles} />
          </Card>

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text)' }}>Guía de Permisos del Sistema</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {Object.entries(PERMISSION_LABELS).map(([code, label], i) => (
                <div key={i} style={{ 
                  padding: '1rem', 
                  background: 'var(--bg-hover)', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}>
                  <span style={{ color: 'var(--color-text)', fontWeight: 'bold', fontSize: '0.9rem' }}>{label}</span>
                  <code style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px', alignSelf: 'flex-start' }}>{code}</code>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Card>
          <Table columns={usersColumns} data={filteredUsers} />
        </Card>
      )}

      <UserPermissionsModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedUser(null); }} 
        onSave={handleSavePerms}
        user={selectedUser}
      />
    </div>
  )
}

export default RolesPage
