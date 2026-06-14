import { useNavigate } from 'react-router-dom'
import Card from '../../../shared/components/Card'
import styles from '../../_shared/ModulePage.module.css'
import { MdEvent, MdCategory, MdPeople } from 'react-icons/md'

const CronogramasPage = () => {
  const navigate = useNavigate()

  const modules = [
    { title: 'Eventos', desc: 'Gestionar el calendario y afiches', icon: <MdEvent size={40} />, path: '/cronogramas/eventos' },
    { title: 'Categorías', desc: 'Tipos de actividades (Misión, Retiro...)', icon: <MdCategory size={40} />, path: '/cronogramas/categorias' },
    { title: 'Público Dirigido', desc: 'Jóvenes, familias, pastores...', icon: <MdPeople size={40} />, path: '/cronogramas/dirigido' },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Módulo de Cronogramas</h1>
          <p className={styles.subtitle}>Seleccione una sección para gestionar</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {modules.map((m, i) => (
          <div 
            key={i} 
            onClick={() => navigate(m.path)}
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              background: 'var(--bg-card)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1rem'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <div style={{ color: 'var(--color-primary)', background: 'var(--bg-hover)', padding: '1rem', borderRadius: '12px' }}>
              {m.icon}
            </div>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{m.title}</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CronogramasPage
