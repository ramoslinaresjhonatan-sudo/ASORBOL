import { useLocation } from 'react-router-dom'
import useAuthStore from '../app/store/useAuthStore'
import styles from './Navbar.module.css'
import { MdMenu, MdNotifications } from 'react-icons/md'

const buildBreadcrumb = (pathname) => {
  const parts = pathname.split('/').filter(Boolean)
  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
}

const Navbar = () => {
  const { toggleSidebar } = useAuthStore()
  const location = useLocation()
  const breadcrumbs = buildBreadcrumb(location.pathname)

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <MdMenu />
        </button>
        <nav className={styles.breadcrumb}>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className={styles.crumb}>
              {i > 0 && <span className={styles.sep}>/</span>}
              <span className={i === breadcrumbs.length - 1 ? styles.active : styles.inactive}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      </div>
      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <MdNotifications />
          <span className={styles.badge}>3</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
