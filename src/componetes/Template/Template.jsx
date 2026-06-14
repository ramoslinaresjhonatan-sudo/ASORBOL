import { useState } from 'react'
import styles from './Template.module.css'
import { 
  MdDashboard, 
  MdPeople, 
  MdVpnKey, 
  MdAdd, 
  MdMenuBook, 
  MdSettings,
  MdArrowForward
} from 'react-icons/md'
import { HiLightningBolt } from 'react-icons/hi'

const Template = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeTab, setActiveTab] = useState('View All')

  const toggleSidebar = () => setIsExpanded(!isExpanded)

  return (
    <div className={styles.layout}>
      {/* Sidebar Section */}
      <div className={styles.sidebarContainer}>
        {/* Dark Slim Sidebar */}
        <div className={styles.sidebarSlim}>
          <div className={styles.logo}>
            <HiLightningBolt />
          </div>
          
          <div className={styles.navIcons}>
            <div className={`${styles.iconWrapper} ${styles.activeIcon}`}>
              <MdDashboard />
            </div>
            <div className={styles.iconWrapper}>
              <MdPeople />
            </div>
            <div className={styles.iconWrapper}>
              <MdVpnKey />
            </div>
            <div className={styles.iconWrapper}>
              <MdAdd />
            </div>
            <div className={styles.iconWrapper}>
              <MdMenuBook />
            </div>
            <div className={styles.iconWrapper}>
              <MdSettings />
            </div>
          </div>

          <div className={styles.profile}>
            <img src="https://i.pravatar.cc/150?u=sorbol" alt="User" />
          </div>
        </div>

        {/* Expanded White Panel */}
        <div className={`${styles.expandedPanel} ${!isExpanded ? styles.hidden : ''}`}>
          <h2 className={styles.adminTitle}>Admin</h2>

          <div className={styles.menuSection}>
            <span className={styles.sectionLabel}>Dashboard</span>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>Overview</li>
              <li className={styles.menuItem}>Network Graph</li>
              <li className={styles.menuItem}>Usage</li>
            </ul>
          </div>

          <div className={styles.menuSection}>
            <span className={styles.sectionLabel}>User Data</span>
            <ul className={styles.menuList}>
              <li 
                className={`${styles.menuItem} ${activeTab === 'View All' ? styles.activeMenuItem : ''}`}
                onClick={() => setActiveTab('View All')}
              >
                View All
              </li>
              <li className={styles.menuItem}>Active</li>
              <li className={styles.menuItem}>Inactive</li>
              <li className={styles.menuItem}>Expired</li>
            </ul>
          </div>

          <div className={styles.menuSection}>
            <span className={styles.sectionLabel}>Security</span>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>Overview</li>
              <li className={styles.menuItem}>Settings</li>
              <li className={styles.menuItem}>Maintenance</li>
              <li className={styles.menuItem}>Keys</li>
            </ul>
          </div>

          <button className={styles.expandButton} onClick={toggleSidebar}>
            <MdArrowForward style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }} />
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {children || (
          <div style={{ color: '#666' }}>
            <h2>Contenido Principal</h2>
            <p>Aquí se cargará el contenido de las páginas...</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default Template
