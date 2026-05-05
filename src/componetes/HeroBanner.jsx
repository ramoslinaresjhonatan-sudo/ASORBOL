import React from 'react';
import './PaletasDeColores.css';
import finalCutout from '../assets/final_people_cutout.png';

const HeroBanner = () => {
  return (
    <div className="bg-mesh-aurora" style={{
      position: 'relative',
      width: '100%',
      minHeight: '520px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '24px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
      margin: '2rem auto',
      maxWidth: '1300px',
      border: '1px solid rgba(255,255,255,0.5)'
    }}>
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
          
          @keyframes floatingTitle {
            0% { transform: translateY(0px) rotate(-2deg); }
            50% { transform: translateY(-15px) rotate(0deg); }
            100% { transform: translateY(0px) rotate(-2deg); }
          }

          @keyframes floatPeople {
            0% { transform: scale(1) translateY(0px); }
            50% { transform: scale(1.02) translateY(-5px); }
            100% { transform: scale(1) translateY(0px); }
          }

          .animated-title-container {
            animation: floatingTitle 6s ease-in-out infinite;
            z-index: 20;
          }

          .people-layer {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 1rem;
            z-index: 5;
            pointer-events: none;
          }

          .people-img {
            height: 85%;
            object-fit: contain;
            animation: floatPeople 8s ease-in-out infinite;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.1));
            mask-image: linear-gradient(to top, transparent 2%, black 30%);
            -webkit-mask-image: linear-gradient(to top, transparent 2%, black 30%);
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.6);
            padding: 0.8rem 2.5rem;
            border-radius: 100px;
            display: inline-block;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            margin-top: 2.5rem;
          }
        `}
      </style>

      {/* Capa de personas originales con fondo transparente y calidad mejorada */}
      <div className="people-layer">
        {/* Usamos las personas originales recortadas */}
        <img src={finalCutout} className="people-img" alt="People group" style={{ transform: 'scaleX(-1)' }} />
        <img src={finalCutout} className="people-img" alt="People group" />
      </div>

      {/* Contenido Central Premium */}
      <div style={{ position: 'relative', zIndex: 30, textAlign: 'center', padding: '2rem' }}>
        
        <div className="animated-title-container">
          <h1 style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '8.5rem',
            margin: '0',
            color: '#1b3a8a',
            lineHeight: '0.8',
            textShadow: '5px 5px 0px rgba(255,255,255,1), -2px -2px 0px rgba(255,255,255,1)',
            letterSpacing: '-2px'
          }}>
            ¡Levántate <br />
            <span style={{ fontSize: '9.5rem', display: 'inline-block', marginTop: '1rem' }}>y brilla!</span>
            
            <span style={{ position: 'absolute', right: '-70px', bottom: '60px', fontSize: '4rem' }}>✨</span>
          </h1>
        </div>
        
        <div className="glass-card">
          <span style={{
            fontSize: '2.4rem',
            fontWeight: '900',
            color: '#1b3a8a',
            letterSpacing: '10px',
            textTransform: 'uppercase',
          }}>
            2026-2028
          </span>
        </div>
        
      </div>

      {/* Efectos de luz adicionales */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'var(--frosted-blue)',
        filter: 'blur(100px)',
        opacity: 0.5,
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '250px',
        height: '250px',
        background: 'var(--honeydew)',
        filter: 'blur(120px)',
        opacity: 0.6,
        zIndex: 1
      }}></div>
    </div>
  );
};

export default HeroBanner;
