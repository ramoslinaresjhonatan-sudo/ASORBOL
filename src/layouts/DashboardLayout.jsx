import Sidebar from './Sidebar'
import Navbar from './Navbar'
import styles from './DashboardLayout.module.css'
import useAuthStore from '../app/store/useAuthStore'

const DashboardLayout = ({ children }) => {
  const { sidebarOpen, toggleSidebar } = useAuthStore()
  return (
    <div className={styles.layout}>
      <Sidebar />
      {sidebarOpen && <div className={styles.backdrop} onClick={toggleSidebar} />}
      <div className={styles.main}>
        <Navbar />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
