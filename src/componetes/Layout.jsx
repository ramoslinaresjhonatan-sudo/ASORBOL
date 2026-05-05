import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="premium-container">
      <nav style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
          Asorbol<span style={{ color: 'var(--primary)' }}>.</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About</Link>
          <Link to="/paletas" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Paletas</Link>
        </div>
        <button className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Login</button>
      </nav>

      {/* Aquí se renderizarán las páginas según la ruta */}
      <Outlet />

      <footer style={{ marginTop: 'auto', padding: '4rem 0', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
        © 2026 Asorbol. All rights reserved.
      </footer>
    </div>
  )
}

export default Layout
