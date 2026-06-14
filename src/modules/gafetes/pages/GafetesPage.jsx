import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import {
  MdPrint, MdDownload, MdPictureAsPdf, MdQrCode2, MdPerson, MdVerifiedUser, MdBusiness,
  MdClose, MdGroups, MdBadge, MdSearch, MdStraighten, MdSave, MdCheck
} from 'react-icons/md'
import { getUsuarios } from '../../usuarios/services/usuariosService'
import { getGafeteConfig, saveGafeteConfig } from '../services/gafetesService'
import styles from './GafetesPage.module.css'

const DEPARTAMENTOS = {
  INSTITUCIONAL: { sup: '#C5B794', inf: '#0A245E', det: '#C5B794' },
  'ESCUELA SABÁTICA': { sup: '#F4A580', inf: '#0A245E', det: '#F4A580' },
  MISIONERO: { sup: '#F3D183', inf: '#0A245E', det: '#F3D183' },
  'ASISTENCIA SOCIAL': { sup: '#72A4CD', inf: '#0A245E', det: '#72A4CD' },
  'MEDICO MISIONERO': { sup: '#ACD8DB', inf: '#0A245E', det: '#43887D' },
  PUBLICACIONES: { sup: '#E3A337', inf: '#0A1135', det: '#E3A337' },
  ADOLESCENTES: { sup: '#71BEE9', inf: '#2E3D55', det: '#FFA761' },
  COLPORTAJE: { sup: '#F18D60', inf: '#0A245E', det: '#029642' },
  TESORERÍA: { sup: '#B7812E', inf: '#0A245E', det: '#E1BB79' },
  EDUCACIÓN: { sup: '#FD6F5F', inf: '#0A245E', det: '#FCE599' },
  COMUNICACIÓN: { sup: '#F8CA64', inf: '#0A245E', det: '#592D8C' },
  MÚSICA: { sup: '#E7E3D0', inf: '#0A245E', det: '#E7E3D0' },
  FAMILIA: { sup: '#C5B794', inf: '#0A245E', det: '#C5B794' },
  MUJER: { sup: '#F18172', inf: '#0A245E', det: '#F18172' },
  JÓVENES: { sup: '#20A59A', inf: '#095A98', det: '#E1BB79' },
  NIÑOS: { sup: '#3AC0AF', inf: '#093A98', det: '#F8CA64' },
}

const SIMBOLOS = [
  { name: 'Amarillo', file: 'Logo-sinLetra-amarillo-blanco.png' },
  { name: 'Azul', file: 'Logo-sinLetra-asul-blanco.png' },
  { name: 'Azul Claro', file: 'Logo-sinLetra-asulClaro-blanco.png' },
  { name: 'Azul Oscuro', file: 'Logo-sinLetra-asulOscuro-blanco.png' },
  { name: 'B/N', file: 'Logo-sinLetra-blanco-negro.png' },
  { name: 'Naranja', file: 'Logo-sinLetra-naranja-blanco.png' },
  { name: 'Negro', file: 'Logo-sinLetra-negro-blanco.png' },
  { name: 'Oro', file: 'Logo-sinLetra-oro-blanco.png' },
]

const PRESET_COLORS = [
  '#0A245E', '#1B4F8A', '#C5B794', '#EFD19F', '#FFFFFF', '#000000', '#72A4CD', '#F4A580'
]

const DEFAULT_CONFIG = {
  colorSuperior: DEPARTAMENTOS.INSTITUCIONAL.sup,
  colorInferior: DEPARTAMENTOS.INSTITUCIONAL.inf,
  colorDetalle: DEPARTAMENTOS.INSTITUCIONAL.det,
  formaFoto: 'rect',
  tituloEvento: 'MISIÓN SORBOL',
  colorLogo: 'crema',
  orientacion: 'landscape',
  colorTexto: '#FFFFFF',
  simbolo: SIMBOLOS[7].file,
  departamento: 'INSTITUCIONAL',
}

// Datos de muestra para la vista previa (los reales salen de la BD al imprimir)
const PREVIEW_USER = {
  nombre: 'Nombre Apellido',
  cargo: 'Cargo Institucional',
  telefono: '999 999 999',
  web: 'sdarm.com',
  foto: null,
  id: '0000',
}

/* ─── Mapea un usuario de la BD a los datos del gafete ───────────────────── */
const mapUserToBadge = (u) => ({
  nombre: `${u.nombres || ''} ${u.apellidos || ''}`.trim() || 'Sin nombre',
  cargo: u.tipo || 'Miembro',
  telefono: u.telefono || '999 999 999',
  web: 'sdarm.com',
  foto: u.foto_url || null,
  id: u.id,
})

const initials = (u) =>
  `${(u.nombres || '')[0] || ''}${(u.apellidos || '')[0] || ''}`.toUpperCase() || '?'

const ColorSelect = ({ label, value, onChange }) => (
  <div className={styles.colorPickerSection}>
    <label>{label}</label>
    <div className={styles.colorPalette}>
      {PRESET_COLORS.map(color => (
        <div
          key={color}
          className={`${styles.colorCircle} ${value === color ? styles.activeColor : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
      <div className={styles.customColorBtn}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.hiddenColorInput}
        />
        <span>+</span>
      </div>
    </div>
  </div>
)

const BadgeFront = ({ userData, badgeConfig }) => (
  <div
    className={`${styles.badgeCard} ${styles[badgeConfig.orientacion]}`}
    style={{ backgroundColor: badgeConfig.colorInferior, color: badgeConfig.colorTexto }}
  >
    <div className={styles.lanyardSlot}></div>
    <div className={styles.topSection} style={{ backgroundColor: badgeConfig.colorSuperior }}></div>
    <div className={styles.photoSection}>
      <div
        className={styles.photoFrame}
        style={{
          borderColor: badgeConfig.colorDetalle,
          borderRadius: badgeConfig.formaFoto === 'circle' ? '50%' : '25px'
        }}
      >
        {userData.foto ? (
          <img src={userData.foto} alt="User" />
        ) : (
          <div className={styles.placeholderIcon}>
            <MdPerson />
          </div>
        )}
      </div>
    </div>
    <div className={styles.contentSection}>
      <h2 className={styles.userName} style={{ color: badgeConfig.colorTexto }}>{userData.nombre || 'Nombre Apellido'}</h2>
      <p className={styles.userRole} style={{ color: badgeConfig.colorTexto, opacity: 0.8 }}>{userData.cargo || 'Cargo Institucional'}</p>
      <div className={styles.separator} style={{ backgroundColor: badgeConfig.colorDetalle }}></div>
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <MdBusiness size={14} style={{ color: badgeConfig.colorDetalle }} />
          <span style={{ color: badgeConfig.colorTexto }}>{userData.web || 'sdarm.com'}</span>
        </div>
        <div className={styles.contactItem}>
          <MdVerifiedUser size={14} style={{ color: badgeConfig.colorDetalle }} />
          <span style={{ color: badgeConfig.colorTexto }}>{userData.telefono || '999 999 999'}</span>
        </div>
      </div>
    </div>
    <div className={styles.footerBranding}>
      <img
        src={`/Recursos de documentacion/símbolo - png/${badgeConfig.simbolo}`}
        alt="Logo"
        className={styles.footerLogo}
      />
      <div className={styles.orgInfo}>
        <span style={{ color: badgeConfig.colorTexto, opacity: 0.6 }}>SEVENTH DAY ADVENTIST</span>
        <strong style={{ color: badgeConfig.colorTexto }}>REFORM MOVEMENT</strong>
      </div>
    </div>
  </div>
)

const BadgeBack = ({ userData, badgeConfig }) => (
  <div
    className={`${styles.badgeCard} ${styles.badgeBack} ${styles[badgeConfig.orientacion]}`}
    style={{ backgroundColor: badgeConfig.colorInferior, color: badgeConfig.colorTexto }}
  >
    <div className={styles.lanyardSlot}></div>
    <div className={styles.backContent}>
      <div className={styles.backHeader}>
        <img src={`/Recursos de documentacion/símbolo - png/${badgeConfig.simbolo}`} alt="Logo" className={styles.backLogo} />
        <h3 style={{ color: badgeConfig.colorDetalle }}>{badgeConfig.tituloEvento}</h3>
      </div>

      <div className={styles.termsSection}>
        <p style={{ color: badgeConfig.colorTexto, opacity: 0.8 }}>Esta credencial es personal e intransferible. Debe portarse en un lugar visible durante las actividades institucionales.</p>
      </div>

      <div className={styles.qrSection}>
        <div className={styles.qrLabel} style={{ color: badgeConfig.colorTexto }}>VERIFICACIÓN DIGITAL</div>
        <div className={styles.qrWrapper}>
          <MdQrCode2 />
        </div>
      </div>

      <div className={styles.emergencyInfo}>
        <strong style={{ color: badgeConfig.colorTexto, opacity: 0.6 }}>CONTACTO DE EMERGENCIA</strong>
        <span style={{ color: badgeConfig.colorTexto }}>+591 700 000 00</span>
      </div>

      <div className={styles.backFooter} style={{ borderTopColor: `${badgeConfig.colorDetalle}22` }}>
        <span style={{ color: badgeConfig.colorTexto, opacity: 0.6 }}>www.sorbol.org</span>
        <div className={styles.idNumber} style={{ color: badgeConfig.colorTexto }}>ID: {userData.id}</div>
      </div>
    </div>
  </div>
)

/* ─── Modal de impresión ──────────────────────────────────────────────────── */
const PrintModal = ({
  onClose, onPrint, onDownloadPdf, generating, usuarios, loading,
  mode, setMode,
  search, setSearch, filterTipo, setFilterTipo,
  birthFrom, setBirthFrom, birthTo, setBirthTo,
  includeBack, setIncludeBack,
  selectedId, setSelectedId, selectedIds, setSelectedIds,
}) => {
  const tipos = [...new Set(usuarios.map(u => u.tipo).filter(Boolean))]

  const filteredUsers = usuarios.filter(u => {
    const fullName = `${u.nombres || ''} ${u.apellidos || ''}`.toLowerCase()
    if (search && !fullName.includes(search.toLowerCase())) return false
    if (filterTipo && (u.tipo || '') !== filterTipo) return false
    if (birthFrom && (!u.fecha_nacimiento || u.fecha_nacimiento < birthFrom)) return false
    if (birthTo && (!u.fecha_nacimiento || u.fecha_nacimiento > birthTo)) return false
    return true
  })

  const allSelected = filteredUsers.length > 0 && filteredUsers.every(u => selectedIds.includes(u.id))
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(selectedIds.filter(id => !filteredUsers.some(u => u.id === id)))
    } else {
      setSelectedIds([...new Set([...selectedIds, ...filteredUsers.map(u => u.id)])])
    }
  }
  const toggleOne = (id) =>
    setSelectedIds(selectedIds.includes(id) ? selectedIds.filter(x => x !== id) : [...selectedIds, id])

  const countToPrint = mode === 'individual' ? (selectedId ? 1 : 0) : selectedIds.length

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}><MdPrint /> Imprimir Gafetes</div>
          <button className={styles.modalClose} onClick={onClose}><MdClose /></button>
        </div>

        <div className={styles.modalBody}>
          {/* Modo individual / grupal */}
          <div className={styles.modeToggle}>
            <button
              className={`${styles.modeCard} ${mode === 'individual' ? styles.modeActive : ''}`}
              onClick={() => setMode('individual')}
            >
              <MdBadge />
              <div><strong>Individual</strong><span>Un solo gafete</span></div>
            </button>
            <button
              className={`${styles.modeCard} ${mode === 'grupal' ? styles.modeActive : ''}`}
              onClick={() => setMode('grupal')}
            >
              <MdGroups />
              <div><strong>Grupal</strong><span>Varios a la vez</span></div>
            </button>
          </div>

          {/* Filtros */}
          <div className={styles.filtersGrid}>
            <div className={`${styles.filterField} ${styles.full}`}>
              <label><MdSearch size={12} /> Buscar por nombre</label>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Nombre o apellido..." />
            </div>
            <div className={styles.filterField}>
              <label>Rol / Cargo</label>
              <select value={filterTipo} onChange={e => setFilterTipo(e.target.value)}>
                <option value="">Todos</option>
                {tipos.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className={styles.filterField}>
              <label>Fecha de nacimiento</label>
              <div className={styles.dateRange}>
                <input type="date" value={birthFrom} onChange={e => setBirthFrom(e.target.value)} />
                <span>a</span>
                <input type="date" value={birthTo} onChange={e => setBirthTo(e.target.value)} />
              </div>
            </div>
          </div>

          <label className={styles.includeBackRow}>
            <input type="checkbox" checked={includeBack} onChange={e => setIncludeBack(e.target.checked)} />
            Incluir reverso del gafete
          </label>

          {/* Encabezado de lista */}
          <div className={styles.userListHeader}>
            <span>
              {loading ? 'Cargando usuarios…' : `${filteredUsers.length} usuario(s)`}
            </span>
            {mode === 'grupal' && filteredUsers.length > 0 && (
              <button className={styles.selectAllBtn} onClick={toggleSelectAll}>
                {allSelected ? 'Quitar todos' : 'Seleccionar todos'}
              </button>
            )}
          </div>

          {/* Lista de usuarios */}
          <div className={styles.userList}>
            {!loading && filteredUsers.length === 0 && (
              <div className={styles.emptyUsers}>No hay usuarios que coincidan con los filtros.</div>
            )}

            {filteredUsers.map(u => {
              const isSel = mode === 'individual'
                ? selectedId === String(u.id)
                : selectedIds.includes(u.id)
              return (
                <label key={u.id} className={`${styles.userRow} ${isSel ? styles.userSelected : ''}`}>
                  {mode === 'individual' ? (
                    <input
                      type="radio"
                      className={styles.userRadio}
                      checked={selectedId === String(u.id)}
                      onChange={() => setSelectedId(String(u.id))}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(u.id)}
                      onChange={() => toggleOne(u.id)}
                    />
                  )}
                  <div className={styles.userAvatar}>
                    {u.foto_url ? <img src={u.foto_url} alt="" /> : initials(u)}
                  </div>
                  <div className={styles.userMeta}>
                    <strong>{`${u.nombres || ''} ${u.apellidos || ''}`.trim() || u.correo}</strong>
                    <span>{u.tipo || 'Miembro'}{u.fecha_nacimiento ? ` · ${u.fecha_nacimiento}` : ''}</span>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <div className={styles.sizeNote}>
            <MdStraighten size={14} /> CR80 · 86×54 mm (300 dpi)
          </div>
          <div className={styles.footerActions}>
            <button className={styles.secondaryBtn} onClick={onClose}>Cancelar</button>
            <button className={styles.secondaryBtn} onClick={onDownloadPdf} disabled={countToPrint === 0 || generating}>
              <MdPictureAsPdf /> {generating ? 'Generando…' : 'Descargar PDF'}
            </button>
            <button className={styles.primaryBtn} onClick={onPrint} disabled={countToPrint === 0 || generating}>
              <MdPrint /> Imprimir {countToPrint > 0 ? `(${countToPrint})` : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const GafetesPage = () => {
  const [badgeConfig, setBadgeConfig] = useState(DEFAULT_CONFIG)

  /* ── Persistencia del diseño ── */
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  /* ── Estado del modal de impresión ── */
  const [printOpen, setPrintOpen] = useState(false)
  const [usuarios, setUsuarios] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [mode, setMode] = useState('individual')
  const [search, setSearch] = useState('')
  const [filterTipo, setFilterTipo] = useState('')
  const [birthFrom, setBirthFrom] = useState('')
  const [birthTo, setBirthTo] = useState('')
  const [includeBack, setIncludeBack] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [printList, setPrintList] = useState([])
  const [generating, setGenerating] = useState(false)

  // Cargar el diseño guardado en el servidor al montar
  useEffect(() => {
    getGafeteConfig()
      .then(cfg => {
        if (cfg && Object.keys(cfg).length) {
          setBadgeConfig(prev => ({ ...prev, ...cfg }))
        }
      })
      .catch(err => console.error('No se pudo cargar el diseño guardado:', err))
  }, [])

  const handleSaveConfig = async () => {
    setSaving(true)
    setSaved(false)
    try {
      await saveGafeteConfig(badgeConfig)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      console.error('Error guardando el diseño:', err)
      alert('No se pudo guardar el diseño.')
    } finally {
      setSaving(false)
    }
  }

  // Abrir el modal y cargar los usuarios la primera vez (lazy)
  const openPrintModal = () => {
    setPrintOpen(true)
    if (usuarios.length || loadingUsers) return
    setLoadingUsers(true)
    getUsuarios()
      .then(data => setUsuarios(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error cargando usuarios:', err))
      .finally(() => setLoadingUsers(false))
  }

  const handleDeptChange = (deptName) => {
    const colors = DEPARTAMENTOS[deptName]
    setBadgeConfig({
      ...badgeConfig,
      departamento: deptName,
      colorSuperior: colors.sup,
      colorInferior: colors.inf,
      colorDetalle: colors.det,
      tituloEvento: deptName === 'INSTITUCIONAL' ? 'MISIÓN SORBOL' : deptName
    })
  }

  // Resuelve la lista de gafetes a generar según el modo y la selección
  const resolveList = () => {
    if (mode === 'individual') {
      const u = usuarios.find(x => String(x.id) === String(selectedId))
      return u ? [mapUserToBadge(u)] : []
    }
    return usuarios.filter(u => selectedIds.includes(u.id)).map(mapUserToBadge)
  }

  const handlePrint = () => {
    const list = resolveList()
    if (!list.length) {
      alert('Selecciona al menos un usuario para imprimir.')
      return
    }
    setPrintList(list)
    setPrintOpen(false)
    // Espera a que el portal de impresión se renderice antes de abrir el diálogo
    setTimeout(() => window.print(), 150)
  }

  const handleDownloadPdf = async () => {
    const list = resolveList()
    if (!list.length) {
      alert('Selecciona al menos un usuario para generar el PDF.')
      return
    }

    setPrintList(list)
    setGenerating(true)
    try {
      // Espera a que el área (fuera de pantalla) renderice los gafetes
      await new Promise(r => setTimeout(r, 280))

      const isLandscape = badgeConfig.orientacion === 'landscape'
      const pw = isLandscape ? 86 : 54   // ancho página en mm (CR80)
      const ph = isLandscape ? 54 : 86   // alto  página en mm
      const pdf = new jsPDF({ orientation: isLandscape ? 'landscape' : 'portrait', unit: 'mm', format: [pw, ph] })

      const cells = document.querySelectorAll('#gafete-print-root .pdf-cell')
      for (let i = 0; i < cells.length; i++) {
        const card = cells[i].firstElementChild
        const canvas = await html2canvas(card, {
          scale: 3,            // ~alta resolución para impresión
          backgroundColor: null,
          useCORS: true,
          logging: false,
        })
        const img = canvas.toDataURL('image/png')
        if (i > 0) pdf.addPage([pw, ph], isLandscape ? 'landscape' : 'portrait')
        pdf.addImage(img, 'PNG', 0, 0, pw, ph)
      }

      pdf.save('gafetes.pdf')
      setPrintOpen(false)
    } catch (err) {
      console.error('Error generando PDF:', err)
      alert('No se pudo generar el PDF.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Generador de Gafetes</h1>
          <p>Diseña la plantilla institucional · se guarda para todas las máquinas</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.secondaryBtn}>
            <MdDownload /> Descargar PNG
          </button>
          <button className={styles.secondaryBtn} onClick={handleSaveConfig} disabled={saving}>
            {saved ? <MdCheck /> : <MdSave />} {saving ? 'Guardando…' : saved ? 'Guardado' : 'Guardar diseño'}
          </button>
          <button className={styles.primaryBtn} onClick={openPrintModal}>
            <MdPrint /> Imprimir Gafete
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        {/* Panel de Configuración */}
        <section className={styles.configPanel}>
          <div className={`${styles.card} ${styles.configCard}`}>
            <h3>Ajustes de Diseño</h3>

            <div className={styles.inputGroup}>
              <label>Título del Evento</label>
              <input
                type="text"
                value={badgeConfig.tituloEvento}
                onChange={(e) => setBadgeConfig({ ...badgeConfig, tituloEvento: e.target.value })}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Departamento</label>
              <select
                className={styles.selectInput}
                value={badgeConfig.departamento}
                onChange={(e) => handleDeptChange(e.target.value)}
              >
                {Object.keys(DEPARTAMENTOS).map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>

            <ColorSelect
              label="Fondo Superior"
              value={badgeConfig.colorSuperior}
              onChange={(val) => setBadgeConfig({ ...badgeConfig, colorSuperior: val })}
            />

            <ColorSelect
              label="Fondo Inferior"
              value={badgeConfig.colorInferior}
              onChange={(val) => setBadgeConfig({ ...badgeConfig, colorInferior: val })}
            />

            <ColorSelect
              label="Detalles y Bordes"
              value={badgeConfig.colorDetalle}
              onChange={(val) => setBadgeConfig({ ...badgeConfig, colorDetalle: val })}
            />

            <ColorSelect
              label="Color de Texto"
              value={badgeConfig.colorTexto}
              onChange={(val) => setBadgeConfig({ ...badgeConfig, colorTexto: val })}
            />

            <div className={styles.inputGroup}>
              <label>Símbolo Institucional</label>
              <div className={styles.symbolGrid}>
                {SIMBOLOS.map((sim, idx) => (
                  <div
                    key={idx}
                    className={`${styles.symbolOption} ${badgeConfig.simbolo === sim.file ? styles.activeSymbol : ''}`}
                    onClick={() => setBadgeConfig({ ...badgeConfig, simbolo: sim.file })}
                    title={sim.name}
                  >
                    <img src={`/Recursos de documentacion/símbolo - png/${sim.file}`} alt={sim.name} />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Orientación</label>
              <div className={styles.toggleGroup}>
                <button
                  className={badgeConfig.orientacion === 'landscape' ? styles.activeToggle : ''}
                  onClick={() => setBadgeConfig({ ...badgeConfig, orientacion: 'landscape' })}
                >Horizontal</button>
                <button
                  className={badgeConfig.orientacion === 'portrait' ? styles.activeToggle : ''}
                  onClick={() => setBadgeConfig({ ...badgeConfig, orientacion: 'portrait' })}
                >Vertical</button>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Forma de la Foto</label>
              <div className={styles.toggleGroup}>
                <button
                  className={badgeConfig.formaFoto === 'rect' ? styles.activeToggle : ''}
                  onClick={() => setBadgeConfig({ ...badgeConfig, formaFoto: 'rect' })}
                >Cuadrada</button>
                <button
                  className={badgeConfig.formaFoto === 'circle' ? styles.activeToggle : ''}
                  onClick={() => setBadgeConfig({ ...badgeConfig, formaFoto: 'circle' })}
                >Circular</button>
              </div>
            </div>
          </div>
        </section>

        {/* Vista Previa del Gafete */}
        <section className={styles.previewPanel}>
          <div className={`${styles.badgeContainer} ${styles[badgeConfig.orientacion]}`}>
            <BadgeFront userData={PREVIEW_USER} badgeConfig={badgeConfig} />
            <BadgeBack userData={PREVIEW_USER} badgeConfig={badgeConfig} />
          </div>
          <p className={styles.hint}>* Vista previa · los datos (nombre, cargo, foto) salen de los usuarios al imprimir · 86×54 mm (CR80)</p>
        </section>
      </main>

      {/* Modal de impresión */}
      {printOpen && (
        <PrintModal
          onClose={() => setPrintOpen(false)}
          onPrint={handlePrint}
          usuarios={usuarios}
          loading={loadingUsers}
          onDownloadPdf={handleDownloadPdf}
          generating={generating}
          mode={mode} setMode={setMode}
          search={search} setSearch={setSearch}
          filterTipo={filterTipo} setFilterTipo={setFilterTipo}
          birthFrom={birthFrom} setBirthFrom={setBirthFrom}
          birthTo={birthTo} setBirthTo={setBirthTo}
          includeBack={includeBack} setIncludeBack={setIncludeBack}
          selectedId={selectedId} setSelectedId={setSelectedId}
          selectedIds={selectedIds} setSelectedIds={setSelectedIds}
        />
      )}

      {/* Área de impresión / captura PDF (fuera de pantalla) — renderizada fuera de #root */}
      {createPortal(
        <div className={styles.printRoot} id="gafete-print-root">
          {printList.map((ud, i) => (
            <React.Fragment key={i}>
              <div className={`${styles.printCell} ${styles[badgeConfig.orientacion]} pdf-cell`}>
                <BadgeFront userData={ud} badgeConfig={badgeConfig} />
              </div>
              {includeBack && (
                <div className={`${styles.printCell} ${styles[badgeConfig.orientacion]} pdf-cell`}>
                  <BadgeBack userData={ud} badgeConfig={badgeConfig} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>,
        document.body
      )}
    </div>
  )
}

export default GafetesPage
