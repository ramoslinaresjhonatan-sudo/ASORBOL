import { useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../app/store/useAuthStore'
import { navItems } from '../shared/constants/navItems'
import styles from './Sidebar.module.css'
import { 
  MdKeyboardArrowDown, MdOutlineSettings, MdOutlineLightMode, MdOutlineDarkMode, 
  MdOutlineLogout, MdChevronRight 
} from 'react-icons/md'

const Sidebar = () => {
  const { user, logout, sidebarOpen, theme, toggleTheme } = useAuthStore()
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const [openGroups, setOpenGroups] = useState({})

  // Flyout que aparece al hacer hover cuando el sidebar está colapsado
  const [flyout, setFlyout] = useState(null)
  const flyoutTimer = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleGroup = (key) =>
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }))

  const handleItemEnter = (e, item) => {
    if (sidebarOpen) return
    clearTimeout(flyoutTimer.current)
    const rect = e.currentTarget.getBoundingClientRect()
    setFlyout({
      key: item.key,
      top: rect.top,
      left: rect.right,
      label: item.label,
      children: item.children,
    })
  }

  const handleItemLeave = () => {
    if (sidebarOpen) return
    flyoutTimer.current = setTimeout(() => setFlyout(null), 120)
  }

  const handleFlyoutEnter = () => clearTimeout(flyoutTimer.current)
  const handleFlyoutLeave = () => setFlyout(null)

  const filteredItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(user?.tipo)
  )

  // Items que deben tener un separador después de ellos para agrupar
  const separatorAfter = ['roles', 'biblioteca', 'auditoria']

  return (
    <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.collapsed : ''}`}>
      {/* Header con Logo Institucional */}
      <div className={styles.header}>
        <div className={styles.waveContainer}>
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className={styles.wave}>
            <path d="M0,0 L500,0 L500,100 C350,150 150,50 0,100 Z" fill="var(--color-primary)"></path>
          </svg>
        </div>
        <div className={styles.logoContainer}>
          <div className={styles.logoSymbol}>
            <img 
              src="/Recursos de documentacion/símbolo - png/Logo-sinLetra-asulOscuro-blanco.png" 
              alt="Logo" 
              className={styles.logoImg}
            />
          </div>
          {sidebarOpen && (
            <div className={styles.brandTitle}>
              <span className={styles.unionText}>UNIÓN BOLIVIANA</span>
              <span className={styles.asorbolText}>ASORBOL</span>
            </div>
          )}
        </div>
      </div>

      {/* Navegación Dinámica */}
      <nav className={styles.nav}>
        {filteredItems.map((item) => (
          <div key={item.key}>
            {item.children ? (
              <div className={styles.groupWrapper}>
                <button
                  className={`${styles.navItem} ${styles.group} ${openGroups[item.key] ? styles.groupOpen : ''}`}
                  onClick={() => sidebarOpen && toggleGroup(item.key)}
                  onMouseEnter={(e) => handleItemEnter(e, item)}
                  onMouseLeave={handleItemLeave}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {sidebarOpen && (
                    <>
                      <span className={styles.label}>{item.label}</span>
                      <MdChevronRight
                        className={`${styles.chevronNav} ${openGroups[item.key] ? styles.open : ''}`}
                      />
                    </>
                  )}
                </button>
                {openGroups[item.key] && sidebarOpen && (
                  <div className={styles.subMenu}>
                    {item.children.map((child) => (
                      <NavLink
                        key={child.key}
                        to={child.path}
                        className={({ isActive }) =>
                          `${styles.subItem} ${isActive ? styles.active : ''}`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ''}`
                }
                onMouseEnter={(e) => handleItemEnter(e, item)}
                onMouseLeave={handleItemLeave}
              >
                <span className={styles.icon}>{item.icon}</span>
                {sidebarOpen && <span className={styles.label}>{item.label}</span>}
              </NavLink>
            )}
            {separatorAfter.includes(item.key) && <div className={styles.separator} />}
          </div>
        ))}
      </nav>

      {/* Flyout en hover (solo cuando está colapsado) */}
      {!sidebarOpen && flyout && (
        <div
          className={`${styles.flyout} ${flyout.children ? styles.flyoutGroup : ''}`}
          style={{ top: flyout.top, left: flyout.left + 8 }}
          onMouseEnter={handleFlyoutEnter}
          onMouseLeave={handleFlyoutLeave}
        >
          <div className={styles.flyoutTitle}>{flyout.label}</div>
          {flyout.children && (
            <div className={styles.flyoutItems}>
              {flyout.children.map((child) => (
                <NavLink
                  key={child.key}
                  to={child.path}
                  className={({ isActive }) =>
                    `${styles.flyoutItem} ${isActive ? styles.active : ''}`
                  }
                  onClick={() => setFlyout(null)}
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer Perfil */}
      <div className={styles.footer}>
        <div className={styles.footerWave}>
           <svg viewBox="0 0 500 150" preserveAspectRatio="none" className={styles.waveBottom}>
            <path d="M0,80 C150,150 350,0 500,80 L500,150 L0,150 Z" fill="var(--color-primary)"></path>
          </svg>
        </div>
        
        <div className={styles.footerContent}>
          {userMenuOpen && sidebarOpen && (
            <div className={styles.profileMenu}>
              <button className={styles.menuItem} onClick={() => navigate('/configuracion')}>
                <MdOutlineSettings /> <span>Configuración</span>
              </button>
              <button className={styles.menuItem} onClick={toggleTheme}>
                {theme === 'dark' ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
                <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
              </button>
              <div className={styles.menuDivider} />
              <button className={`${styles.menuItem} ${styles.logout}`} onClick={handleLogout}>
                <MdOutlineLogout /> <span>Cerrar sesión</span>
              </button>
            </div>
          )}

          <button 
            className={styles.profileRow} 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className={styles.avatar}>
              {user?.nombres?.[0] || 'J'}{user?.apellidos?.[0] || 'D'}
            </div>
            {sidebarOpen && (
              <>
                <div className={styles.profileInfo}>
                  <span className={styles.profileName}>{user?.nombres || 'Jhonatan'} {user?.apellidos?.[0] || 'D'}.</span>
                  <span className={styles.profileRole}>{user?.tipo || 'Administrador'}</span>
                </div>
                <MdKeyboardArrowDown className={`${styles.chevron} ${userMenuOpen ? styles.chevronOpen : ''}`} />
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
