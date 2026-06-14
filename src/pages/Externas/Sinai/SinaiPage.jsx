import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../.././../PaletaDeColores.css';
import Css from './SinaiPage.module.css';

const Logo = '/Recursos de documentacion/imagenesPNG/logo-letra-asulOscuro-asulOscuro-blanco-horizontal.png';

// Imágenes
const imgHero = '/imagenes/sinai.png';
const imgComunidad = '/imagenes/grupoDePersona.png';
const imgValores = '/imagenes/values-community.png';
const imgColegio = '/imagenes/colegio.png';

// Redes sociales
const socialLinks = [
  { icon: 'logo-whatsapp', color: '#25D366', label: 'WhatsApp', href: 'https://wa.me/59169258172' },
  { icon: 'logo-facebook', color: '#1877F2', label: 'Facebook', href: 'https://facebook.com' },
  { icon: 'logo-instagram', color: '#E1306C', label: 'Instagram', href: 'https://instagram.com', isGradient: true },
  { icon: 'logo-youtube', color: '#FF0000', label: 'YouTube', href: 'https://youtube.com' },
];

// Datos de contacto
const contactos = [
  { icon: 'location-outline', label: 'Ubicación', value: 'Tolomosa Grande — Tarija, Bolivia' },
  { icon: 'mail-outline', label: 'Correo', value: 'asdmrasorbol@gmail.com', href: 'mailto:asdmrasorbol@gmail.com' },
  { icon: 'call-outline', label: 'Teléfono', value: '+591 (pendiente de asignación)' },
  { icon: 'logo-facebook', label: 'Facebook', value: 'Asociación ASDMR-Oficial', href: 'https://facebook.com' },
];

const stats = [
  { value: '12', unit: 'meses', label: 'de formación integral' },
  { value: '100%', unit: 'virtual', label: 'estudia desde donde estés' },
  { value: '360', unit: 'horas', label: 'certificadas por CISA' },
  { value: 'Bs 350', unit: 'matrícula', label: 'para comenzar' },
];

const perfilItems = [
  { icon: 'person-outline',           text: '17 años de edad en adelante' },
  { icon: 'heart-outline',            text: 'Deseo genuino de servir a Dios y a la sociedad' },
  { icon: 'book-outline',             text: 'Interés en profundizar la fe y el crecimiento espiritual' },
  { icon: 'medical-outline',          text: 'Formarse en salud integral y principios teológicos' },
  { icon: 'shield-checkmark-outline', text: 'Compromiso, responsabilidad y disciplina formativa' },
  { icon: 'people-outline',           text: 'Apertura a actividades comunitarias y misioneras' },
  { icon: 'leaf-outline',             text: 'Voluntad de vivir un estilo de vida saludable integral' },
  { icon: 'document-text-outline',    text: 'Disposición a acatar los reglamentos institucionales' },
];

const requisitos = [
  { num: '01', text: 'Aprobar la prueba de ingreso con mínimo 71 puntos' },
  { num: '02', text: 'Presentar Título de Bachiller' },
  { num: '03', text: 'Fotocopia del documento de identidad' },
  { num: '04', text: '4 fotografías tamaño 4×4 cm con fondo blanco' },
  { num: '05', text: 'Carta de recomendación del pastor o misionero de campo' },
  { num: '06', text: 'Certificado de bautismo (opcional)' },
];

const sem1 = {
  teologica: ['Hermenéutica I','Historia Eclesiástica','Soteriología','Homilética y Oratoria','Doctrina','Hebreo','Profecía I','Escatología'],
  salud: ['Anatomía Básica','Teología de la Salud','Primeros Auxilios','Semiología','Medicina Natural I'],
  complementaria: ['Industria y Emprendimiento'],
};

const sem2 = {
  teologica: ['Hermenéutica II','Liderazgo y Administración Eclesiástica','Griego','Profecía II','Apologética','Ética y Psicología Pastoral','Geografía Bíblica'],
  salud: ['Fisiología Básica','Medicina Natural II','Fisioterapia','Agricultura Orgánica'],
  ministerial: ['Música','Pedagogía y Didáctica','Práctica Ministerial','Práctica de Evangelismo Personal'],
};

const pasos = [
  { num: '01', title: 'Examen de Admisión', desc: '30 de abril · 70 preguntas · 60 min · Nota mínima: 71 pts', accent: '#1B4F8A' },
  { num: '02', title: 'Verificación de Requisitos', desc: 'Entrega y validación de la documentación requerida', accent: '#43887D' },
  { num: '03', title: 'Registro', desc: 'Ingreso de datos del estudiante al sistema institucional', accent: '#ACD8DB' },
  { num: '04', title: 'Firma de Compromiso', desc: 'Aceptación formal de la normativa institucional', accent: '#F1BE48' },
  { num: '05', title: 'Cancelación', desc: 'Matrícula Bs 350 + primera mensualidad Bs 1.200', accent: '#EFD19F' },
];

const uniformeMujeres = [
  'Vestido midi color azul petróleo (debajo de la pantorrilla)',
  'Blusa blanca',
  'Corbatín color guindo',
  'Medias blancas',
  'Zapatos negros cerrados',
];

const uniformeVarones = [
  'Traje completo color azul petróleo',
  'Blazer o saco color blanco',
  'Cinturón delgado color vino',
  'Zapatos formales cerrados color vino',
];

export default function SinaiPage() {
  const [scrolled, setScrolled] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [instOpen, setInstOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={Css.page}>

      {/* ===== HEADER ===== */}
      <header className={`${Css.header} ${scrolled ? Css.scrolled : ''}`}>
        <div className={Css.headerLeft}>
          <Link to="/" className={Css.logoContainer}>
            <img src={Logo} alt="Logo" />
            <span>ASORBOL</span>
          </Link>

          <div className={Css.instDivider} />

          {/* Selector de institución (muestra la vista actual) */}
          <div className={Css.instSelector}>
            <button className={Css.instCurrent} onClick={() => setInstOpen(!instOpen)}>
              <ion-icon name="school-outline"></ion-icon>
              <span>Escuela Sinaí</span>
              <ion-icon name="chevron-down-outline" className={`${Css.instChevron} ${instOpen ? Css.instChevronOpen : ''}`}></ion-icon>
            </button>

            {instOpen && (
              <>
                <div className={Css.instBackdrop} onClick={() => setInstOpen(false)} />
                <div className={Css.instMenu}>
                  <span className={Css.instMenuTitle}>Instituciones</span>

                  <Link to="/escuela-sinai" className={`${Css.instItem} ${Css.instItemActive}`} onClick={() => setInstOpen(false)}>
                    <span className={Css.instDot} style={{ background: '#1B4F8A' }} />
                    <div className={Css.instItemText}>
                      <strong>Escuela Sinaí</strong>
                      <small>Teología</small>
                    </div>
                    <ion-icon name="checkmark-circle" className={Css.instCheck}></ion-icon>
                  </Link>

                  <Link to="/#instituciones" className={Css.instItem} onClick={() => setInstOpen(false)}>
                    <span className={Css.instDot} style={{ background: '#43887D' }} />
                    <div className={Css.instItemText}>
                      <strong>Colegio John Andrews</strong>
                      <small>Educación</small>
                    </div>
                  </Link>

                  <Link to="/#instituciones" className={Css.instItem} onClick={() => setInstOpen(false)}>
                    <span className={Css.instDot} style={{ background: '#72A4CD' }} />
                    <div className={Css.instItemText}>
                      <strong>Sanatorio Sanare</strong>
                      <small>Salud</small>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <nav className={Css.nav}>
          <a href="#identidad">Institución</a>
          <a href="#admision">Admisión</a>
          <a href="#pensum">Pensum</a>
          <a href="#proceso">Inscripción</a>
          <Link to="/login" className={Css.btnLogin}>Iniciar Sesión</Link>
        </nav>

        <button
          className={Css.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span></span><span></span><span></span>
        </button>
      </header>

      {menuOpen && (
        <div className={Css.mobileMenu}>
          <div className={Css.mobileMenuBackdrop} onClick={() => setMenuOpen(false)} />
          <nav className={Css.mobileNav}>
            <a href="#identidad" onClick={() => setMenuOpen(false)}>Institución</a>
            <a href="#admision" onClick={() => setMenuOpen(false)}>Admisión</a>
            <a href="#pensum" onClick={() => setMenuOpen(false)}>Pensum</a>
            <a href="#proceso" onClick={() => setMenuOpen(false)}>Inscripción</a>
            <Link to="/login" className={Css.btnLogin} onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
          </nav>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section className={Css.hero} id="inicio">
        <div className={Css.heroGlow} />

        {/* Imagen lateral derecha — absoluta, con forma orgánica */}
        <div className={Css.heroImageWrap}>
          <div className={Css.heroImageGlow} />
        </div>

        <div className={Css.heroInner}>
          <div className={Css.heroContent}>
            <span className={Css.heroEyebrow}>Escuela Médico Misionera · ASORBOL</span>
            <h1 className={Css.heroTitle}>
              Escuela Médico<br />Misionera
              <span className={Css.heroGold}> "Sinaí"</span>
            </h1>
            <div className={Css.heroImageMobile}>
              <img src={imgHero} alt="Logo Escuela Sinaí" className={Css.heroImageMobileImg} />
            </div>
            <p className={Css.heroSub}>
              Restaurando vidas para servir a Dios y a la humanidad.
            </p>
            <div className={Css.heroBadges}>
              <span className={Css.badge}><ion-icon name="school-outline"></ion-icon> 12 meses</span>
              <span className={Css.badge}><ion-icon name="wifi-outline"></ion-icon> 100% Virtual</span>
              <span className={Css.badge}><ion-icon name="ribbon-outline"></ion-icon> Cert. CISA</span>
            </div>
            <div className={Css.heroCtas}>
              <a href="#proceso" className={Css.ctaPrimary}>Quiero inscribirme</a>
              <a href="#admision" className={Css.ctaSecondary}>Ver requisitos</a>
            </div>
          </div>
        </div>

        <div className={Css.heroWave}>
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
            <path fill="#F2F1EF" fillOpacity="1" d="M0,128L60,117.3C120,107,240,85,360,90.7C480,96,600,128,720,138.7C840,149,960,139,1080,122.7C1200,107,1320,85,1380,74.7L1440,64L1440,200L0,200Z" />
          </svg>
        </div>
      </section> 
      {/* ===== STATS Tarija ===== */}
      <section className={Css.statsSection}>
        <div className={Css.statsHeader}>
          <span className={Css.sectionTag}>El programa en números</span>
          <h2 className={Css.statsSectionTitle}>Todo lo que necesitas saber</h2>
        </div>
        <div className={Css.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={Css.statCard}>
              <span className={Css.statValue}>{s.value}</span>
              <span className={Css.statUnit}>{s.unit}</span>
              <span className={Css.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* wave */}
      <div className={Css.waveBlock} style={{ background: '#F2F1EF' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,120L0,120Z" />
        </svg>
      </div>

      {/* ===== IDENTIDAD ===== */}
      <section className={Css.identidadSection} id="identidad">
        <div className={Css.container}>
          <span className={Css.sectionTag}>¿Quiénes somos?</span>
          <h2 className={Css.sectionTitle}>Una institución al servicio de Dios y la humanidad</h2>
          <p className={Css.sectionSub}>
            La Escuela Médico Misionera "Sinaí" es una institución denominacional donde el conocimiento se une con el propósito de servir. Aquí se cultiva una vida de entrega que busca restaurar integralmente al ser humano.
          </p>

          <div className={Css.identidadGrid}>
            <div className={Css.identidadCard} style={{ '--card-accent': '#1B4F8A' }}>
              <div className={Css.identidadIcon}><ion-icon name="heart-outline"></ion-icon></div>
              <h3>Misión</h3>
              <p>Formar hombres y mujeres con un profundo compromiso con Dios y la sociedad, capacitándolos en principios de salud integral, servicio misionero y desarrollo del carácter, para atender necesidades físicas, mentales y espirituales.</p>
            </div>
            <div className={Css.identidadCard} style={{ '--card-accent': '#43887D' }}>
              <div className={Css.identidadIcon}><ion-icon name="eye-outline"></ion-icon></div>
              <h3>Visión</h3>
              <p>Ser una institución formadora de referencia en el ámbito médico misionero, reconocida por preparar personas íntegras que vivan el servicio como un estilo de vida, promoviendo la restauración del ser humano.</p>
            </div>
            <div className={Css.identidadCard} style={{ '--card-accent': '#F1BE48' }}>
              <div className={Css.identidadIcon}><ion-icon name="ribbon-outline"></ion-icon></div>
              <h3>Certificación</h3>
              <p>El egresado recibirá el título de <strong>Médico Misionero</strong> otorgado por la Misión ASDMR, más el certificado de <strong>CISA con valor curricular de 360 horas académicas</strong>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMUNIDAD (galería) ===== */}
      <section className={Css.comunidadSection}>
        <div className={Css.container}>
          <div className={Css.comunidadGrid}>
            <div className={Css.comunidadText}>
              <span className={Css.sectionTag}>El inicio de tu llamado</span>
              <h2 className={Css.sectionTitle} style={{ textAlign: 'left' }}>Más que una institución, una familia que sirve</h2>
              <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Aquí el llamado al servicio se convierte en acción. Formamos personas comprometidas con el bienestar físico, espiritual y comunitario, capaces de impactar vidas con <strong style={{ color: '#1B4F8A' }}>amor, fe y conocimiento</strong>.
              </p>
              <div className={Css.comunidadPills}>
                <span className={Css.comunidadPill}>Vida devocional</span>
                <span className={Css.comunidadPill}>Servicio misionero</span>
                <span className={Css.comunidadPill}>Salud integral</span>
                <span className={Css.comunidadPill}>Carácter cristiano</span>
              </div>
            </div>
            <div className={Css.comunidadGallery}>
              <div className={Css.galleryMain}>
                <img src={imgComunidad} alt="Comunidad estudiantil" />
              </div>
              <div className={Css.gallerySmall}>
                <img src={imgValores} alt="Valores y comunidad" />
              </div>
              <div className={Css.gallerySmall}>
                <img src={imgColegio} alt="Formación" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* wave */}
      <div className={Css.waveBlock} style={{ background: '#ffffff' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#0A245E" fillOpacity="1" d="M0,32L80,48C160,64,320,96,480,101.3C640,107,800,85,960,69.3C1120,53,1280,43,1360,37.3L1440,32L1440,120L0,120Z" />
        </svg>
      </div>

      {/* ===== ADMISIÓN ===== */}
      <section className={Css.admisionSection} id="admision">
        <div className={Css.container}>
          <span className={Css.sectionTagLight}>Proceso de admisión</span>
          <h2 className={Css.sectionTitleLight}>¿Quién puede postular?</h2>

          <div className={Css.admisionGrid}>
            <div className={Css.admisionBlock}>
              <h3 className={Css.admisionBlockTitle}>
                <span className={Css.admisionDot} style={{ background: '#ACD8DB' }} />
                Perfil del postulante
              </h3>
              <div className={Css.perfilGrid}>
                {perfilItems.map((item, i) => (
                  <div key={i} className={Css.perfilCard}>
                    <span className={Css.perfilIcon}><ion-icon name={item.icon}></ion-icon></span>
                    <span className={Css.perfilText}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={Css.admisionBlock}>
              <h3 className={Css.admisionBlockTitle}>
                <span className={Css.admisionDot} style={{ background: '#F1BE48' }} />
                Requisitos de inscripción
              </h3>
              <ol className={Css.reqList}>
                {requisitos.map((r, i) => (
                  <li key={i} className={Css.reqItem}>
                    <span className={Css.reqNum}>{r.num}</span>
                    <span>{r.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* wave */}
      <div className={Css.waveBlock} style={{ background: '#0A245E' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#F2F1EF" fillOpacity="1" d="M0,80L80,69.3C160,59,320,37,480,42.7C640,48,800,80,960,85.3C1120,91,1280,69,1360,58.7L1440,48L1440,120L0,120Z" />
        </svg>
      </div>

      {/* ===== PENSUM ===== */}
      <section className={Css.pensumSection} id="pensum">
        <div className={Css.container}>
          <span className={Css.sectionTag}>Plan académico</span>
          <h2 className={Css.sectionTitle}>Pensum Académico</h2>
          <p className={Css.sectionSub}>
            Dos semestres con clases alternadas en horarios de mañana y tarde, complementadas con cursillos y talleres especializados.
          </p>

          <div className={Css.pensumGrid}>
            {/* Semestre 1 */}
            <div className={Css.semCard}>
              <div className={Css.semHeader}>
                <span className={Css.semNum}>01</span>
                <h3>Primer Semestre</h3>
              </div>
              <div className={Css.areaBlock}>
                <span className={Css.areaTag} style={{ background: 'rgba(27,79,138,0.15)', color: '#1B4F8A' }}>Área Teológica</span>
                <ul className={Css.materiaList}>
                  {sem1.teologica.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
              <div className={Css.areaBlock}>
                <span className={Css.areaTag} style={{ background: 'rgba(67,136,125,0.15)', color: '#43887D' }}>Área de Salud</span>
                <ul className={Css.materiaList}>
                  {sem1.salud.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
              <div className={Css.areaBlock}>
                <span className={Css.areaTag} style={{ background: 'rgba(241,190,72,0.2)', color: '#9A7210' }}>Complementaria</span>
                <ul className={Css.materiaList}>
                  {sem1.complementaria.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>

            {/* Semestre 2 */}
            <div className={Css.semCard}>
              <div className={Css.semHeader}>
                <span className={Css.semNum}>02</span>
                <h3>Segundo Semestre</h3>
              </div>
              <div className={Css.areaBlock}>
                <span className={Css.areaTag} style={{ background: 'rgba(27,79,138,0.15)', color: '#1B4F8A' }}>Área Teológica</span>
                <ul className={Css.materiaList}>
                  {sem2.teologica.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
              <div className={Css.areaBlock}>
                <span className={Css.areaTag} style={{ background: 'rgba(67,136,125,0.15)', color: '#43887D' }}>Área de Salud</span>
                <ul className={Css.materiaList}>
                  {sem2.salud.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
              <div className={Css.areaBlock}>
                <span className={Css.areaTag} style={{ background: 'rgba(172,216,219,0.3)', color: '#2D6E74' }}>Formación Ministerial</span>
                <ul className={Css.materiaList}>
                  {sem2.ministerial.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* wave */}
      <div className={Css.waveBlock} style={{ background: '#F2F1EF' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#0A245E" fillOpacity="1" d="M0,48L80,58.7C160,69,320,91,480,96C640,101,800,91,960,74.7C1120,59,1280,37,1360,26.7L1440,16L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
        </svg>
      </div>

      {/* ===== INVERSIÓN + UNIFORME ===== */}
      <section className={Css.inversionSection}>
        <div className={Css.container}>
          <div className={Css.inversionGrid}>
            <div className={Css.inversionBlock}>
              <span className={Css.sectionTag}>Inversión</span>
              <h2 className={Css.sectionTitle} style={{ fontSize: '2.5rem' }}>Costos del programa</h2>
              <div className={Css.costoCards}>
                <div className={Css.costoCard}>
                  <span className={Css.costoLabel}>Matrícula</span>
                  <span className={Css.costoValue}>Bs 350</span>
                  <span className={Css.costoNote}>pago único al ingresar</span>
                </div>
                <div className={Css.costoCard} style={{ borderColor: '#1B4F8A', background: 'rgba(27,79,138,0.04)' }}>
                  <span className={Css.costoLabel}>Mensualidad</span>
                  <span className={Css.costoValue} style={{ color: '#1B4F8A' }}>Bs 1.200</span>
                  <span className={Css.costoNote}>durante los 12 meses</span>
                </div>
              </div>
            </div>

            <div className={Css.uniformeBlock}>
              <span className={Css.sectionTag}>Uniforme</span>
              <h2 className={Css.sectionTitle} style={{ fontSize: '2.5rem' }}>Presentación institucional</h2>
              <div className={Css.uniformeGrid}>
                <div className={Css.uniformeCard}>
                  <h4><ion-icon name="female-outline"></ion-icon> Mujeres</h4>
                  <ul>
                    {uniformeMujeres.map((u, i) => <li key={i}>{u}</li>)}
                  </ul>
                </div>
                <div className={Css.uniformeCard}>
                  <h4><ion-icon name="male-outline"></ion-icon> Varones</h4>
                  <ul>
                    {uniformeVarones.map((u, i) => <li key={i}>{u}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* wave */}
      <div className={Css.waveBlock} style={{ background: '#F2F1EF' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#0f172a" fillOpacity="1" d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,53,1360,48L1440,43L1440,120L0,120Z" />
        </svg>
      </div>

      {/* ===== BANNER SEDE (foto real con parallax) ===== */}
      

      {/* ===== PROCESO DE INSCRIPCIÓN ===== */}
      <section className={Css.procesoSection} id="proceso">
        <div className={Css.container}>
          <span className={Css.sectionTagLight}>Inscripción {new Date().getFullYear()}</span>
          <h2 className={Css.sectionTitleLight}>Proceso paso a paso</h2>
          <p className={Css.sectionSubLight}>Sigue estos pasos para formar parte de la Escuela Sinaí.</p>

          <div className={Css.pasosList}>
            {pasos.map((paso, i) => (
              <div key={i} className={Css.pasoItem}>
                <div className={Css.pasoNumWrapper}>
                  <div className={Css.pasoNum} style={{ background: paso.accent }}>
                    {paso.num}
                  </div>
                  {i < pasos.length - 1 && <div className={Css.pasoLine} />}
                </div>
                <div className={Css.pasoContent}>
                  <h4>{paso.title}</h4>
                  <p>{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXAMEN ===== */}
      <section className={Css.examenSection}>
        <div className={Css.container}>
          <div className={Css.examenCard}>

            {/* Panel izquierdo — fecha destacada */}
            <div className={Css.examenDatePanel}>
              <span className={Css.examenDateLabel}>Fecha del examen</span>
              <div className={Css.examenDateBig}>
                <span className={Css.examenDateNum}>30</span>
                <span className={Css.examenDateMonth}>Abril</span>
              </div>
              <span className={Css.examenYear}>2026</span>
              <div className={Css.examenFreeBadge}>
                <ion-icon name="ribbon-outline"></ion-icon> Sin costo de inscripción
              </div>
            </div>

            {/* Panel derecho — detalles */}
            <div className={Css.examenDetails}>
              <span className={Css.examenEyebrow}>Examen de admisión</span>
              <h3 className={Css.examenTitle}>Todo lo que debes saber</h3>
              <p className={Css.examenDesc}>El examen evalúa principios fundamentales de la fe. Es la puerta de entrada a tu formación.</p>

              <div className={Css.examenPills}>
                <div className={Css.examenPill}><strong>70</strong><span>preguntas</span></div>
                <div className={Css.examenPill}><strong>60</strong><span>minutos</span></div>
                <div className={Css.examenPill}><strong>71</strong><span>pts mínimo</span></div>
              </div>

              <div className={Css.examenTipsGrid}>
                <div className={Css.examenTipCard}>
                  <ion-icon name="time-outline"></ion-icon>
                  <span>Administra bien el tiempo durante el examen</span>
                </div>
                <div className={Css.examenTipCard}>
                  <ion-icon name="eye-outline"></ion-icon>
                  <span>Lee cada pregunta con cuidado antes de responder</span>
                </div>
                <div className={Css.examenTipCard}>
                  <ion-icon name="book-outline"></ion-icon>
                  <span>Repasa los materiales bibliográficos recomendados</span>
                </div>
                <div className={Css.examenTipCard}>
                  <ion-icon name="star-outline"></ion-icon>
                  <span>Prepárate repasando los principios de la fe</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== UBICACIÓN ===== */}
      <section className={Css.ubicacionSection} id="ubicacion">
        <div className={Css.container}>
          <span className={Css.sectionTag} style={{ textAlign: 'center', display: 'block' }}>Dónde estamos</span>
          <h2 className={Css.sectionTitle}>Nuestra ubicación</h2>
          <p className={Css.sectionSub}>
            La sede de la Escuela Médico Misionera "Sinaí" se encuentra en Tolomosa Grande, Tarija — Bolivia.
          </p>

          <div className={Css.ubicacionGrid}>
            <div className={Css.mapWrap}>
              <iframe
                title="Ubicación Escuela Sinaí"
                src="https://maps.google.com/maps?q=Tolomosa%20Grande%20Tarija%20Bolivia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className={Css.ubicacionInfo}>
              <h3>Información de contacto</h3>
              <div className={Css.contactList}>
                {contactos.map((c, i) => (
                  c.href ? (
                    <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className={Css.contactItem}>
                      <span className={Css.contactIcon}><ion-icon name={c.icon}></ion-icon></span>
                      <span className={Css.contactBody}>
                        <span className={Css.contactLabel}>{c.label}</span>
                        <span className={Css.contactValue}>{c.value}</span>
                      </span>
                    </a>
                  ) : (
                    <div key={i} className={Css.contactItem}>
                      <span className={Css.contactIcon}><ion-icon name={c.icon}></ion-icon></span>
                      <span className={Css.contactBody}>
                        <span className={Css.contactLabel}>{c.label}</span>
                        <span className={Css.contactValue}>{c.value}</span>
                      </span>
                    </div>
                  )
                ))}
              </div>

              <a
                href="https://maps.google.com/maps?q=Tolomosa%20Grande%20Tarija%20Bolivia"
                target="_blank"
                rel="noopener noreferrer"
                className={Css.mapBtn}
              >
                <ion-icon name="location-outline"></ion-icon>
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* wave */}
      <div className={Css.waveBlock} style={{ background: '#f8fafc' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#0A245E" fillOpacity="1" d="M0,32L80,48C160,64,320,96,480,101.3C640,107,800,85,960,69.3C1120,53,1280,43,1360,37.3L1440,32L1440,120L0,120Z" />
        </svg>
      </div>

      {/* ===== CTA / FOOTER ===== */}
      <footer className={Css.footer}>
        <div className={Css.footerInner}>
          <span className={Css.footerTag}>Una llamada al servicio</span>
          <h2 className={Css.footerTitle}>
            "Restaurando vidas para<br />servir a Dios y a la humanidad"
          </h2>
          <p className={Css.footerSub}>
            Escuela Médico Misionera "Sinaí" · Misión Adventista del Séptimo Día Movimiento de Reforma
          </p>
          <div className={Css.footerCtas}>
            <Link to="/" className={Css.footerBtnSecondary}><ion-icon name="arrow-back-outline"></ion-icon> Volver al inicio</Link>
            <a href="mailto:asdmrasorbol@gmail.com" className={Css.footerBtnPrimary}>Solicitar información</a>
          </div>

          {/* Contacto + Redes */}
          <div className={Css.footerContact}>
            <div className={Css.footerContactItem}>
              <ion-icon name="location-outline"></ion-icon>
              <span>Tolomosa Grande — Tarija, Bolivia</span>
            </div>
            <div className={Css.footerContactItem}>
              <ion-icon name="mail-outline"></ion-icon>
              <a href="mailto:asdmrasorbol@gmail.com">asdmrasorbol@gmail.com</a>
            </div>
            <div className={Css.footerContactItem}>
              <ion-icon name="call-outline"></ion-icon>
              <span>+591 (pendiente de asignación)</span>
            </div>
          </div>

          <div className={Css.footerSocial}>
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={Css.footerSocialBtn}
                style={{ '--social-color': s.color }}
                aria-label={s.label}
              >
                <ion-icon name={s.icon}></ion-icon>
              </a>
            ))}
          </div>

          <div className={Css.footerBottom}>
            <p>© 2026 ASORBOL — Todos los derechos reservados</p>
          </div>
        </div>
      </footer>

      {/* ===== SOCIAL FAB ===== */}
      <div className={`${Css.socialFab} ${socialOpen ? Css.fabOpen : ''}`}>
        <div className={Css.fabMenu}>
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${Css.fabItem} ${link.isGradient ? Css.instaFab : ''}`}
              style={{ '--fab-color': link.color, '--i': i }}
            >
              <span className={Css.fabLabel}>{link.label}</span>
              <ion-icon name={link.icon}></ion-icon>
            </a>
          ))}
        </div>
        <button className={Css.fabToggle} onClick={() => setSocialOpen(!socialOpen)} aria-label="Redes sociales">
          <ion-icon name={socialOpen ? 'close-outline' : 'share-social-outline'}></ion-icon>
        </button>
      </div>

    </div>
  );
}
