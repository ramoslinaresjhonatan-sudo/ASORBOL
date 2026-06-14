import { useState, useEffect } from 'react'
import styles from './OrganigramaPage.module.css'
import { MdAccountCircle, MdPhone, MdAdd, MdClose, MdEdit, MdImage } from 'react-icons/md'
import Modal from '../../../shared/components/Modal'
import Button from '../../../shared/components/Button'
import organizationService from '../services/organizationService'
import apiClient from '../../../shared/api/apiClient'

const OrganigramaNode = ({ node, onAddClick, onRemoveClick, onEditClick, isRoot, globalBgUrl }) => {
  const [isActive, setIsActive] = useState(false)
  
  // Extract info from the backend node (Grupo)
  const miembro = node.miembros && node.miembros.length > 0 ? node.miembros[0] : null
  const nombre = miembro ? `${miembro.usuario_detalle.nombres} ${miembro.usuario_detalle.apellidos || ''}`.trim() : 'Vacante'
  const telefono = miembro ? miembro.usuario_detalle.telefono : ''
  const foto = miembro ? (miembro.foto_url || miembro.usuario_detalle.foto_url) : null

  return (
    <div className={styles.nodeWrapper}>
      <div 
        className={`${styles.node} ${isActive ? styles.activeNode : ''} ${!miembro ? styles.vacantNode : ''}`}
        onClick={() => setIsActive(!isActive)}
      >
        <div 
          className={styles.photoContainer}
          style={globalBgUrl ? { backgroundImage: `url(${globalBgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {foto ? (
            <img src={foto} alt={nombre} />
          ) : (
            <MdAccountCircle size={60} color="rgba(255,255,255,0.3)" />
          )}
        </div>
        <div className={`${styles.infoContainer} ${isActive ? styles.infoVisible : ''}`}>
          <p className={styles.puesto}>{node.nombre}</p>
          <h3 className={styles.name}>{nombre}</h3>
          {telefono && (
            <div className={styles.phone}>
              <MdPhone size={12} />
              <span>{telefono}</span>
            </div>
          )}
        </div>

        <div className={styles.nodeActions}>
          <button 
            className={styles.actionBtnAdd} 
            onClick={(e) => { e.stopPropagation(); onAddClick(node.id); }}
            title="Añadir subordinado"
          >
            <MdAdd size={20} />
          </button>
          <button 
            className={styles.actionBtnEdit} 
            onClick={(e) => { e.stopPropagation(); onEditClick(node); }}
            title="Editar / Asignar persona"
          >
            <MdEdit size={18} />
          </button>
          {!isRoot && (
            <button 
              className={styles.actionBtnRemove} 
              onClick={(e) => { e.stopPropagation(); onRemoveClick(node.id); }}
              title="Eliminar nodo"
            >
              <MdClose size={18} />
            </button>
          )}
        </div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className={styles.children}>
          {node.children.map((child) => (
            <OrganigramaNode 
              key={child.id} 
              node={child} 
              onAddClick={onAddClick} 
              onRemoveClick={onRemoveClick}
              onEditClick={onEditClick}
              isRoot={false}
              globalBgUrl={globalBgUrl}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const OrganigramaPage = () => {
  const [treeData, setTreeData] = useState(null)
  const [usuarios, setUsuarios] = useState([])
  const [niveles, setNiveles] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [targetParentId, setTargetParentId] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [nodeToEdit, setNodeToEdit] = useState(null)
  
  // Form state
  const [selectedUserId, setSelectedUserId] = useState('')
  const [nuevoNombreGrupo, setNuevoNombreGrupo] = useState('')
  const [globalBgUrl, setGlobalBgUrl] = useState('/imagenes/organigrama_bg.jpg')

  const handleBgUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('imagen', file)
      
      try {
        const { data } = await apiClient.post('/shared/imagenes/upload_organigrama_bg/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (data.url) {
          // Agregar timestamp para forzar recarga y evitar la caché del navegador
          setGlobalBgUrl(data.url + '?t=' + new Date().getTime())
        }
      } catch (error) {
        console.error('Error uploading bg:', error)
        alert('Error al subir el fondo global')
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Usar Promise.allSettled para que si falla uno, los demás sigan
      const results = await Promise.allSettled([
        organizationService.getTree(),
        organizationService.getUsuarios(),
        organizationService.getNiveles()
      ])

      const [treeRes, usersRes, levelsRes] = results

      if (treeRes.status === 'fulfilled') {
        setTreeData(treeRes.value[0] || null)
      }

      if (usersRes.status === 'fulfilled') {
        setUsuarios(usersRes.value)
      }

      if (levelsRes.status === 'fulfilled') {
        setNiveles(levelsRes.value)
      }

    } catch (error) {
      console.error("Error general en fetchData:", error)
    } finally {
      setLoading(false)
    }
  }


  const handleOpenAddModal = (parentId) => {
    setEditMode(false)
    setTargetParentId(parentId)
    setSelectedUserId('')
    setNuevoNombreGrupo('')
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (node) => {
    setEditMode(true)
    setNodeToEdit(node)
    setNuevoNombreGrupo(node.nombre)
    
    const miembro = node.miembros && node.miembros.length > 0 ? node.miembros[0] : null
    setSelectedUserId(miembro ? miembro.usuario : '')
    
    setIsModalOpen(true)
  }

  const handleRemoveNode = async (nodeId) => {
    if (window.confirm('¿Está seguro de eliminar este grupo y todos sus subordinados?')) {
      try {
        await organizationService.deleteGrupo(nodeId)
        fetchData()
      } catch (error) {
        alert("Error al eliminar el nodo")
      }
    }
  }

  const handleSaveNode = async () => {
    try {
      if (editMode && nodeToEdit) {
        // 1. Update Grupo name if changed
        if (nuevoNombreGrupo !== nodeToEdit.nombre) {
          await organizationService.updateGrupo(nodeToEdit.id, { nombre: nuevoNombreGrupo })
        }

        // 2. Update or Create Miembro (OrganigramaUsuario)
        const miembroActual = nodeToEdit.miembros && nodeToEdit.miembros.length > 0 ? nodeToEdit.miembros[0] : null
        
        if (selectedUserId) {
          if (miembroActual) {
            await organizationService.updateMiembro(miembroActual.id, {
              usuario: selectedUserId
            })
          } else {
            await organizationService.addMiembro({
              usuario: selectedUserId,
              grupo: nodeToEdit.id
            })
          }
        } else if (miembroActual && !selectedUserId) {
          // If user was cleared, maybe delete assignment?
          await organizationService.deleteMiembro(miembroActual.id)
        }
      } else {
        // Create new Grupo as child
        const nivelId = niveles.length > 0 ? niveles[0].id : 1 // Default level
        const newGrupo = await organizationService.createGrupo({
          nombre: nuevoNombreGrupo || 'Nuevo Departamento',
          codigo: `GRP-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
          nivel: nivelId,
          grupo_padre: targetParentId
        })

        // Assign user if selected
        if (selectedUserId) {
          await organizationService.addMiembro({
            usuario: selectedUserId,
            grupo: newGrupo.id
          })
        }
      }
      
      setIsModalOpen(false)
      fetchData()
    } catch (error) {
      console.error("Error saving node:", error)
      alert("Ocurrió un error al guardar los cambios.")
    }
  }

  if (loading) return <div className={styles.loading}>Cargando organigrama...</div>

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Organigrama Institucional</h1>
          <p className={styles.subtitle}>Estructura de liderazgo y departamentos</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label className="btn btn-secondary" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--color-text)' }}>
            <MdImage size={20} />
            <span>Fondo Global</span>
            <input type="file" accept="image/*" onChange={handleBgUpload} hidden />
          </label>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chartScroll}>
          {treeData ? (
            <OrganigramaNode 
              node={treeData} 
              onAddClick={handleOpenAddModal} 
              onRemoveClick={handleRemoveNode}
              onEditClick={handleOpenEditModal}
              isRoot={true}
              globalBgUrl={globalBgUrl}
            />
          ) : (
            <div className={styles.noData}>
              <p>No hay estructura definida.</p>
              <Button onClick={() => handleOpenAddModal(null)}>Crear Nodo Raíz</Button>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editMode ? "Editar Departamento / Miembro" : "Añadir Subordinado"}
      >
        <div className={styles.formGroup}>
          <label>Nombre del Departamento / Unidad</label>
          <input 
            type="text" 
            placeholder="Ej: Secretaría, Tesorería..." 
            value={nuevoNombreGrupo}
            onChange={(e) => setNuevoNombreGrupo(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Asignar Usuario</label>
          <select 
            value={selectedUserId} 
            onChange={(e) => setSelectedUserId(e.target.value)}
            className={styles.select}
          >
            <option value="">-- Sin asignar (Vacante) --</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>
                {u.nombres} {u.apellidos} ({u.correo})
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.modalActions}>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveNode}>
            {editMode ? "Guardar Cambios" : "Añadir"}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default OrganigramaPage
