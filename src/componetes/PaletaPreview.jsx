import React from 'react';
import './PaletasDeColores.css';
import HeroBanner from './HeroBanner';

const PaletaPreview = () => {
  const palette = [
    { name: 'Frosted Blue', hex: '#A8DDEB', var: '--frosted-blue' },
    { name: 'Frosted Blue 2', hex: '#A8E6F0', var: '--frosted-blue-2' },
    { name: 'Frozen Water', hex: '#D4F4F3', var: '--frozen-water' },
    { name: 'Honeydew', hex: '#E8F9F1', var: '--honeydew' },
    { name: 'Soft Linen', hex: '#E2E9E1', var: '--soft-linen' },
    { name: 'Azure Mist', hex: '#D3E6E4', var: '--azure-mist' },
    { name: 'Eggshell', hex: '#EFE8D6', var: '--eggshell' },
    { name: 'Pale Slate', hex: '#CCD3DB', var: '--pale-slate' },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copiado: ${text}`);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '2rem', color: '#2d3436' }}>
      
      {/* Nuevo encabezado creativo inspirado en la imagen */}
      <HeroBanner />

      <header style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>Sistema de Colores Pastel</h1>
        <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>Paleta base, colores semánticos y fondos mesh 100% consistentes.</p>
      </header>

      <section style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '2rem' }}>Colores Base</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem'
        }}>
          {palette.map((color) => (
            <div key={color.name} className="color-card" style={{ 
              background: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              padding: '1.5rem',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <div 
                style={{ 
                  backgroundColor: `var(${color.var})`, 
                  height: '120px', 
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
                }}
                onClick={() => copyToClipboard(color.var)}
                title="Click para copiar variable"
              ></div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{color.name}</h3>
              <code style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '0.5rem' }}>{color.var}</code>
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{color.hex}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '5rem', maxWidth: '1300px', margin: '5rem auto 0' }}>
        <h2 style={{ marginBottom: '2rem' }}>Paleta Semántica Pastel</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            { name: 'Success (Éxito)', var: '--success' },
            { name: 'Warning (Aviso)', var: '--warning' },
            { name: 'Error (Error)', var: '--error' },
            { name: 'Info (Información)', var: '--info' },
          ].map((color) => (
            <div key={color.name} style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '15px', border: '1px solid #eee' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{color.name}</h4>
              <div 
                style={{ height: '60px', borderRadius: '8px', background: `var(${color.var})`, cursor: 'pointer', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)' }} 
                onClick={() => copyToClipboard(color.var)}
                title="Click para copiar variable"
              ></div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '5rem', maxWidth: '1300px', margin: '5rem auto 0' }}>
        <h2 style={{ marginBottom: '2rem' }}>Fondos Mesh Premium (Solo Pasteles)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="bg-mesh-aurora" style={{ height: '200px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
            <span style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 'bold', background: 'rgba(255,255,255,0.7)', padding: '0.5rem 1rem', borderRadius: '20px' }}>.bg-mesh-aurora</span>
          </div>
          <div className="bg-mesh-soft" style={{ height: '200px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
            <span style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 'bold', background: 'rgba(255,255,255,0.7)', padding: '0.5rem 1rem', borderRadius: '20px' }}>.bg-mesh-soft</span>
          </div>
          <div className="bg-mesh-cool" style={{ height: '200px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
            <span style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 'bold', background: 'rgba(255,255,255,0.7)', padding: '0.5rem 1rem', borderRadius: '20px' }}>.bg-mesh-cool</span>
          </div>
          <div className="bg-mesh-warm" style={{ height: '200px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
            <span style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 'bold', background: 'rgba(255,255,255,0.7)', padding: '0.5rem 1rem', borderRadius: '20px' }}>.bg-mesh-warm</span>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '5rem', maxWidth: '1300px', margin: '5rem auto 0' }}>
        <h2 style={{ marginBottom: '2rem' }}>Degradados Lineales</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div className="bg-gradient-sky-pastel" style={{ height: '120px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d3436', fontWeight: 'bold' }}>.bg-gradient-sky-pastel</div>
          <div className="bg-gradient-nature-pastel" style={{ height: '120px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d3436', fontWeight: 'bold' }}>.bg-gradient-nature-pastel</div>
          <div className="bg-gradient-warm-pastel" style={{ height: '120px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d3436', fontWeight: 'bold' }}>.bg-gradient-warm-pastel</div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h3>Degradado Animado</h3>
          <div className="bg-gradient-animated" style={{ 
            height: '150px', 
            borderRadius: '20px', 
            marginTop: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2d3436',
            fontWeight: '900',
            fontSize: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            .bg-gradient-animated
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaletaPreview;
