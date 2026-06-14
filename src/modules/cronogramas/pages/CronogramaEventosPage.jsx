import { useState, useEffect } from 'react'
import Table from '../../../shared/components/Table'
import Button from '../../../shared/components/Button'
import Card from '../../../shared/components/Card'
import Loader from '../../../shared/components/Loader'
import * as cronogramasService from '../services/cronogramasService'
import styles from '../../_shared/ModulePage.module.css'
import { MdAdd, MdEdit, MdBlock, MdCheckCircle, MdDelete, MdImage } from 'react-icons/md'
import CronogramaEventoModal from '../components/CronogramaEventoModal'

/* ─── Utilidades ─────────────────────────────────────────────────────────── */
const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

// today se calcula una sola vez al cargar el módulo — estable durante la sesión
const getEstadoDisplay = (() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (row) => {
    if (row.activo === false) return { label: 'Cancelado', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' }
    const fin   = row.fecha_fin    ? new Date(row.fecha_fin)    : null
    const inicio = row.fecha_inicio ? new Date(row.fecha_inicio) : null
    if (fin && fin < today)        return { label: 'Finalizado', color: '#64748b', bg: 'rgba(100,116,139,0.1)' }
    if (inicio && inicio <= today) return { label: 'En Curso',   color: '#10b981', bg: 'rgba(16,185,129,0.1)' }
    return { label: 'Programado', color: 'var(--color-primary)', bg: 'var(--bg-active)' }
  }
})()

/* ─── Componente principal ───────────────────────────────────────────────── */
const CronogramaEventosPage = () => {
  const [eventos,    setEventos]    = useState([])
  const [categorias, setCategorias] = useState([])
  const [dirigidos,  setDirigidos]  = useState([])
  const [usuarios,   setUsuarios]   = useState([])
  const [loading,    setLoading]    = useState(true)

  const [isModalOpen,       setIsModalOpen]       = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedEvento,    setSelectedEvento]    = useState(null)
  const [eventoToDelete,    setEventoToDelete]    = useState(null)

  useEffect(() => { fetchData() }, [])

  // Carga completa — solo en el montaje inicial
  const fetchData = async () => {
    setLoading(true)
    try {
      const [eData, cData, dData, uData] = await Promise.all([
        cronogramasService.getEventos(),
        cronogramasService.getCategorias(),
        cronogramasService.getDirigidos(),
        cronogramasService.getUsuarios()
      ])
      setEventos(eData)
      setCategorias(cData)
      setDirigidos(dData)
      setUsuarios(uData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Recarga solo eventos — tras create/update/delete/toggle (categorias y dirigidos no cambian)
  const refreshEventos = async () => {
    try {
      const data = await cronogramasService.getEventos()
      setEventos(data)
    } catch (error) {
      console.error('Error refreshing eventos:', error)
    }
  }

  /* ── Acciones ── */
  const handleEdit = (evento) => {
    setSelectedEvento(evento)
    setIsModalOpen(true)
  }

  const handleToggleStatus = async (row) => {
    try {
      await cronogramasService.toggleEventoStatus(row.id, row.activo)
      refreshEventos()
    } catch (error) {
      console.error('Error al cambiar estado:', error)
    }
  }

  const confirmDelete = async () => {
    if (!eventoToDelete) return
    try {
      await cronogramasService.deleteEvento(eventoToDelete.id)
      setIsDeleteModalOpen(false)
      setEventoToDelete(null)
      refreshEventos()
    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }

  const handleSave = async (formData) => {
    try {
      if (selectedEvento) {
        await cronogramasService.updateEvento(selectedEvento.id, formData)
      } else {
        await cronogramasService.createEvento(formData)
      }
      setIsModalOpen(false)
      setSelectedEvento(null)
      refreshEventos()
    } catch (error) {
      console.error('Error al guardar:', error)
      throw error
    }
  }

  /* ── Columnas de la tabla ── */
  const columns = [
    {
      key: 'afiche_detalle',
      label: 'Afiche',
      render: (v, row) => {
        const url = v?.url || row.afiche_url || null
        return url ? (
          <div style={{ width: '48px', height: '68px', flexShrink: 0 }}>
            <img
              src={url}
              alt="Afiche"
              style={{ width: '48px', height: '68px', objectFit: 'cover', borderRadius: '6px', display: 'block' }}
            />
          </div>
        ) : (
          <div style={{
            width: '48px', height: '68px', borderRadius: '6px',
            background: 'var(--bg-active)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <MdImage size={20} color="var(--color-text-muted)" />
          </div>
        )
      }
    },
    {
      key: 'nombre',
      label: 'Evento',
      render: (v, row) => {
        const nombre = v || row.evento || '—'
        const encargadoNombre = row.encargado_detalle?.nombre
        return (
          <div>
            <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem' }}>{nombre}</div>
            {encargadoNombre && (
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                Enc: {encargadoNombre}
              </div>
            )}
            {row.lugar && (
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                📍 {row.lugar}
              </div>
            )}
          </div>
        )
      }
    },
    {
      key: 'categoria',
      label: 'Categoría',
      render: (v, row) => {
        const cat = categorias.find(c => c.id === (v ?? row.categoriaId))
        return cat ? (
          <span style={{
            fontSize: '0.8rem', fontWeight: 600,
            color: 'var(--color-primary)',
            background: 'var(--bg-active)',
            padding: '3px 10px', borderRadius: '20px'
          }}>
            {cat.nombre}
          </span>
        ) : <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>—</span>
      }
    },
    {
      key: 'dirigido',
      label: 'Dirigido a',
      render: (v, row) => {
        const ids = v || row.dirigidoIds || []
        if (!ids.length) return <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>—</span>
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '180px' }}>
            {ids.map(id => {
              const d = dirigidos.find(x => x.id === id)
              return d ? (
                <span key={id} className="pill" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  {d.nombre}
                </span>
              ) : null
            })}
          </div>
        )
      }
    },
    {
      key: 'fecha_inicio',
      label: 'Fechas',
      render: (v, row) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {/* Fecha inicio — resaltado verde */}
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            borderLeft: '3px solid #10b981', paddingLeft: '8px',
            fontSize: '0.82rem', fontWeight: 600,
            color: 'var(--color-text)',
            background: 'rgba(16,185,129,0.06)',
            borderRadius: '0 6px 6px 0', paddingRight: '8px', paddingTop: '2px', paddingBottom: '2px'
          }}>
            ▶ {formatDate(v)}
          </span>
          {/* Fecha fin — resaltado rojo */}
          {row.fecha_fin && (
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              borderLeft: '3px solid #ef4444', paddingLeft: '8px',
              fontSize: '0.82rem', fontWeight: 500,
              color: 'var(--color-text-muted)',
              background: 'rgba(239,68,68,0.06)',
              borderRadius: '0 6px 6px 0', paddingRight: '8px', paddingTop: '2px', paddingBottom: '2px'
            }}>
              ◼ {formatDate(row.fecha_fin)}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'activo',
      label: 'Estado',
      render: (_, row) => {
        const s = getEstadoDisplay(row)
        return (
          <span
            className="pill"
            style={{ background: s.bg, color: s.color, fontWeight: 700, fontSize: '0.78rem', border: `1px solid ${s.color}33` }}
          >
            {s.label}
          </span>
        )
      }
    },
    {
      key: 'acciones',
      label: 'Acciones',
      render: (_, row) => (
        <div className="table-actions">
          {/* Editar */}
          <button
            className="btn-action btn-edit"
            onClick={() => handleEdit(row)}
            title="Editar evento"
          >
            <MdEdit size={18} />
          </button>

          {/* Activar / Cancelar */}
          <button
            className="btn-action"
            onClick={() => handleToggleStatus(row)}
            style={{
              color:      row.activo ? '#ef4444' : '#10b981',
              background: row.activo ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)'
            }}
            title={row.activo ? 'Cancelar evento' : 'Reactivar evento'}
          >
            {row.activo ? <MdBlock size={18} /> : <MdCheckCircle size={18} />}
          </button>

          {/* Eliminar — solo si está cancelado */}
          {!row.activo && (
            <button
              className="btn-action btn-delete"
              onClick={() => { setEventoToDelete(row); setIsDeleteModalOpen(true) }}
              title="Eliminar permanentemente"
            >
              <MdDelete size={18} />
            </button>
          )}
        </div>
      )
    }
  ]

  /* ── Render ── */
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Eventos del Cronograma</h1>
          <p className={styles.subtitle}>Gestión integral de actividades institucionales</p>
        </div>
        <Button
          icon={<MdAdd />}
          onClick={() => { setSelectedEvento(null); setIsModalOpen(true) }}
        >
          Crear Nuevo Evento
        </Button>
      </div>

      {loading ? (
        <Card>
          <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
            <Loader />
          </div>
        </Card>
      ) : (
        <Table columns={columns} data={eventos} />
      )}

      {/* Modal crear / editar */}
      <CronogramaEventoModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedEvento(null) }}
        onSave={handleSave}
        initialData={selectedEvento}
        categorias={categorias}
        dirigidos={dirigidos}
        usuarios={usuarios}
      />

      {/* Modal confirmar eliminación */}
      <CronogramaEventoModal.DeleteConfirm
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setEventoToDelete(null) }}
        onConfirm={confirmDelete}
        nombre={eventoToDelete?.nombre || eventoToDelete?.evento}
      />
    </div>
  )
}

export default CronogramaEventosPage
