import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../PaletaDeColores.css';
import Css from './Index.module.css';
import iglesiaData from '../../Externas/iglesias.json';
import OrganigramaSection from './OrganigramaSection';

const heroImg = '/imagenes/sinfondo.png';
const colegioImg = '/imagenes/colegio.png';
const sanareImg = '/imagenes/sanare.png';
const logoCeleste = '/imagenes/sinai.png';

const eventos = [
    {
        name: "Oración y Acción: Sopa Solidaria",
        desc: "Unámonos para ayudar al prójimo. Sopa solidaria después del servicio de oración.",
        icon: "restaurant-outline",
        color: "#72A4CD",
        date: "Hoy, 07:00 AM"
    },
    {
        name: "Sábado Joven",
        desc: "¡Estamos guardando un lugar para ti en nuestra familia reformista!",
        icon: "people-outline",
        color: "#20A59A",
        date: "17 de Agosto"
    },
    {
        name: "Taller de Geoterapia",
        desc: "Tu salud es nuestra prioridad. Obtén más información sobre terapias naturales.",
        icon: "leaf-outline",
        color: "#ACD8DB",
        date: "25 de Septiembre"
    },
    {
        name: "Estudios Bíblicos",
        desc: "Busquemos las respuestas juntos. Conoce la Biblia y profundiza tu relación con Dios.",
        icon: "book-outline",
        color: "#F3D183",
        date: "Domingos, 18:00"
    }
];

const socialLinks = [
    { icon: "logo-whatsapp", color: "#25D366", label: "WhatsApp", href: "https://wa.me/59169258172" },
    { icon: "logo-facebook", color: "#1877F2", label: "Facebook", href: "https://www.facebook.com" },
    { icon: "logo-instagram", color: "#E1306C", label: "Instagram", href: "https://www.instagram.com", isGradient: true },
    { icon: "logo-youtube", color: "#FF0000", label: "YouTube", href: "https://www.youtube.com" }
];

function Index() {
    const Logo = '/Recursos de documentacion/imagenesPNG/logo-letra-asulOscuro-asulOscuro-blanco-horizontal.png';
    const [socialOpen, setSocialOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeEvent, setActiveEvent] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    React.useEffect(() => {
        const handleScrollHeader = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScrollHeader);

        const carousel = document.getElementById('eventsCarousel');
        if (!carousel) return;

        const handleScroll = () => {
            const cardWidth = carousel.querySelector(`.${Css.eventCard}`).offsetWidth + 32;
            const index = Math.round(carousel.scrollLeft / cardWidth);
            setActiveEvent(index);
        };

        carousel.addEventListener('scroll', handleScroll);

        const interval = setInterval(() => {
            if (!isPaused && !selectedEvent) {
                const cardWidth = carousel.querySelector(`.${Css.eventCard}`).offsetWidth + 32;
                const nextIndex = (activeEvent + 1) % eventos.length;
                carousel.scrollTo({ left: cardWidth * nextIndex, behavior: 'smooth' });
            }
        }, 4000);

        return () => {
            window.removeEventListener('scroll', handleScrollHeader);
            carousel.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, [activeEvent, isPaused, selectedEvent]);

    return (
        <div className={Css.landingPage}>

            {/* ===== HEADER ===== */}
            <header className={`${Css.header} ${scrolled ? Css.scrolled : ''}`}>
                <div className={Css.logoContainer}>
                    <img src={Logo} alt="Logo" />
                    <span>ASORBOL</span>
                </div>
                <nav className={Css.nav}>
                    <a href="#inicio">Inicio</a>
                    <a href="#organizacion">Organización</a>
                    <a href="#organigrama">Organigrama</a>
                    <Link to="/ubicaciones">Sedes</Link>
                    <Link to="/calendario">Calendario</Link>
                    <a href="#instituciones">Instituciones</a>
                    <Link to="/donaciones" className={Css.btnDonar}>Donar</Link>
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
                        <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
                        <a href="#organizacion" onClick={() => setMenuOpen(false)}>Organización</a>
                        <a href="#organigrama" onClick={() => setMenuOpen(false)}>Organigrama</a>
                        <Link to="/ubicaciones" onClick={() => setMenuOpen(false)}>Sedes</Link>
                        <Link to="/calendario" onClick={() => setMenuOpen(false)}>Calendario</Link>
                        <a href="#instituciones" onClick={() => setMenuOpen(false)}>Instituciones</a>
                        <Link to="/donaciones" className={Css.btnDonar} onClick={() => setMenuOpen(false)}>Donar</Link>
                    </nav>
                </div>
            )}

            {/* ===== HERO SECTION ===== */}
            <section className={Css.hero} id="inicio">
                <div className={Css.heroInner}>
                    <div className={Css.heroContent}>
                        <span className={Css.intro}>Un solo nombre, una sola imagen, un mismo mensaje</span>
                        <h1>Movimiento de<br />Reforma</h1>
                        <p>
                            Es hora de encontrar la paz en medio del caos. Es hora de ser luz en medio de la oscuridad. Es hora de tener y traer esperanza para un mundo nuevo.
                        </p>
                        <div className={Css.btnGroup}>
                            <Link to="/login" className={Css.btnPrimary} style={{ textDecoration: 'none' }}>
                                Iniciar Sesión
                            </Link>
                            <button className={Css.btnSecondary}>Conócenos</button>
                        </div>
                    </div>
                </div>
               
                <div className={Css.heroWaveContainer}>
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="var(--color-complementario-3)" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,218.7C672,213,768,139,864,117.3C960,96,1056,128,1152,154.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* ===== ABOUT / ORGANIZACIÓN ===== */}
            <section className={Css.aboutSection} id="organizacion">
                <span className={Css.sectionTag}>Nuestra Misión</span>
                <h2 className={Css.sectionTitle}>Restauración y Evolución</h2>
                <p className={Css.sectionSubtitle}>
                    Llevar el evangelio de Cristo a todos con una voz unida e inspiradora. Dirigir la atención del mundo hacia la restauración de los principios de Dios y demostrar su amor de forma práctica.
                </p>
                <div className={Css.aboutGrid}>
                    <div className={Css.aboutImage}>
                        <img src="/imagenes/values-community.png" alt="Nuestra Misión y Valores" />
                    </div>
                    <div className={Css.aboutText}>
                        <h3>Valores y Posicionamiento</h3>
                        <p>
                            Creemos firmemente en el <strong>amor, el conocimiento de la Biblia y la unión</strong>. Somos una iglesia que ayuda en la restauración y crecimiento de las personas a través del amor a Dios y al prójimo.
                        </p>
                        <p>
                            Mantenemos un enfoque constante en la observancia del sábado y promovemos un estilo de vida saludable a través de terapias naturales y una dieta vegetariana. Todo esto con un propósito claro: <em>Para que todos sean uno.</em>
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== ORGANIGRAMA (vista pública) ===== */}
            <OrganigramaSection />

            {/* ===== NUESTRAS SEDES (Mapa Ilustrado) ===== */}
            <div className={Css.waveBlock} style={{ background: 'var(--color-complementario-3)' }}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#ffffff" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,250.7C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>
            <section className={Css.sedesSection} id="sedes">
                <div className={Css.sedesGrid}>
                    <div className={Css.sedesContent}>
                        <span className={Css.sectionTag}>Presencia Nacional</span>
                        <h2 className={Css.sectionTitle}>Estamos en toda Bolivia</h2>
                        <p className={Css.sectionSubtitle} style={{ marginBottom: '2.5rem' }}>
                            Nuestra misión no tiene fronteras. Contamos con sedes, colegios y centros
                            de salud en cada departamento, llevando esperanza y restauración a cada hogar.
                        </p>
                        <Link to="/ubicaciones" className={Css.btnPrimary}>
                            Explorar Mapa Interactivo
                        </Link>
                    </div>

                    <div className={Css.mapIllustrationContainer}>
                        <img src="/imagenes/mapa-icono-azul.png" alt="Sedes Sorbol" className={Css.mapImage} />
                    </div>
                </div>
            </section>
            
            {/* ===== CARDS / INSTITUCIONES ===== */}
            <section className={Css.servicesSection} id="instituciones">
                <div className={Css.servicesWaveContainer}>
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#ffffff" fillOpacity="1" d="M0,128L80,149.3C160,171,320,213,480,213.3C640,213,800,171,960,138.7C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                </div>
                <div className={Css.servicesSectionInner}>
                    <span className={Css.sectionTag} style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', display: 'block' }}>Educación y Salud</span>
                    <h2 className={Css.servicesTitle}>Centros de Servicio</h2>
                    <p className={Css.servicesSubtitle}>
                        Instituciones dedicadas a la formación integral y el cuidado de la salud.
                    </p>

                    <div className={Css.cardsGrid}>
                        <div className={Css.card}>
                            <div className={Css.cardImage}>
                                <img src={colegioImg} alt="Colegio" />
                            </div>
                            <span className={Css.iglesiaDept} style={{ marginBottom: '1rem', display: 'inline-block' }}>Educación</span>
                            <h3>Colegio John Andrews</h3>
                            <p>Formación académica de excelencia fomentando valores integrales desde la infancia.</p>
                        </div>

                        <div className={Css.card}>
                            <div className={Css.cardImage}>
                                <img src={sanareImg} alt="Sanatorio" />
                            </div>
                            <span className={Css.iglesiaDept} style={{ marginBottom: '1rem', display: 'inline-block' }}>Salud</span>
                            <h3>Sanatorio Sanare</h3>
                            <p>Atención médica de calidad con un enfoque preventivo y natural para toda la familia.</p>
                        </div>

                        <Link to="/escuela-sinai" style={{ textDecoration: 'none' }}>
                        <div className={Css.card} style={{ cursor: 'pointer' }}>
                            <div className={Css.cardImage}>
                                <img src={logoCeleste} alt="Escuela Superior" style={{ objectFit: 'contain', padding: '1rem', background: '#f8fafc' }} />
                            </div>
                            <span className={Css.iglesiaDept} style={{ marginBottom: '1rem', display: 'inline-block' }}>Teología</span>
                            <h3>Escuela Sinaí</h3>
                            <p>Preparación ministerial y teológica profunda para los futuros líderes espirituales.</p>
                            <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-principal)', letterSpacing: '0.5px' }}>
                                Conocer más →
                            </span>
                        </div>
                        </Link>
                    </div>
                </div>
            </section>
            
            <div className={Css.waveBlock} style={{ background: 'var(--color-complementario-4)' }}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#f8fafc" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,144C672,160,768,224,864,245.3C960,267,1056,245,1152,213.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* ===== EVENTOS ===== */}
            
            <section className={Css.carouselSection} id="eventos">
                <div className={Css.container}>
                    <span className={Css.sectionTag} style={{ textAlign: 'center', display: 'block' }}>Próximamente</span>
                    <h2 className={Css.sectionTitle} style={{ textAlign: 'center' }}>Nuestros Eventos</h2>
                    <p className={Css.sectionSubtitle}>
                        Únete a nuestras actividades y fortalece tu fe en comunidad.
                    </p>

                    <div className={Css.eventsCarouselWrapper}>
                        <div
                            className={Css.eventsGrid}
                            id="eventsCarousel"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {eventos.map((evt, i) => (
                                <div key={i} className={Css.eventCard} style={{ backgroundColor: evt.color, color: 'white' }}>
                                    <div className={Css.eventHeader}>
                                        <span className={Css.eventDate} style={{ color: 'rgba(255,255,255,0.9)' }}>{evt.date}</span>
                                        <ion-icon name={evt.icon} style={{ color: 'white' }}></ion-icon>
                                    </div>
                                    <h4 style={{ color: 'white' }}>{evt.name}</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.9)' }}>{evt.desc}</p>
                                    <button
                                        className={Css.eventBtn}
                                        onClick={() => setSelectedEvent(evt)}
                                        style={{ backgroundColor: 'white', color: evt.color }}
                                    >
                                        Ver evento
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Indicadores visuales */}
                        <div className={Css.carouselIndicators}>
                            {eventos.map((_, i) => (
                                <button
                                    key={i}
                                    className={`${Css.indicator} ${i === activeEvent ? Css.indicatorActive : ''}`}
                                    onClick={() => {
                                        const carousel = document.getElementById('eventsCarousel');
                                        const cardWidth = carousel.querySelector(`.${Css.eventCard}`).offsetWidth + 32; // card + gap
                                        carousel.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MODAL DE EVENTO ===== */}
            {selectedEvent && (
                <div className={Css.modalOverlay} onClick={() => setSelectedEvent(null)}>
                    <div className={Css.modalContent} onClick={e => e.stopPropagation()} style={{ background: selectedEvent.color }}>
                        <button className={Css.closeBubble} onClick={() => setSelectedEvent(null)}>
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                        <div className={Css.modalInner}>
                            <div className={Css.modalHeader}>
                                <ion-icon name={selectedEvent.icon}></ion-icon>
                                <span className={Css.modalDate}>{selectedEvent.date}</span>
                            </div>
                            <h2>{selectedEvent.name}</h2>
                            <p className={Css.modalDesc}>{selectedEvent.desc}</p>
                            <div className={Css.modalDetails}>
                                <p><strong>Ubicación:</strong> Sede Central ASORBOL</p>
                                <p><strong>Horario:</strong> 09:00 AM - 17:00 PM</p>
                                <p><strong>Registro:</strong> Abierto para todo público</p>
                            </div>
                            <button className={Css.modalActionBtn}>Inscribirme ahora</button>
                        </div>
                    </div>
                </div>
            )}
            <div className={Css.waveBlock} style={{ background: '#f8fafc' }}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="rgba(239, 209, 159, 0.1)" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            {/* ===== TESTIMONIOS ===== */}
            <section className={Css.testimonialSection}>
                <div className={Css.testimonialGrid}>
                    <div className={Css.testimonialContent}>
                        <span className={Css.sectionTag}>Manifiesto</span>
                        <h2>Llamados a Unirnos</h2>
                        <p className={Css.testimonialQuote}>
                            "La batalla no tiene por qué ser solitaria, juntos podemos fortalecernos en la fe y unirnos para restaurar lo perdido, para evolucionar como familias, como iglesia y como sociedad."
                        </p>
                        <div className={Css.testimonialAuthor}>Movimiento de Reforma</div>
                        <div className={Css.testimonialRole}>Iglesia Adventista del Séptimo Día</div>
                    </div>
                </div>
            </section>
            <div className={Css.waveBlock} style={{ background: 'rgba(239, 209, 159, 0.1)' }}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="var(--color-principal)" fillOpacity="1" d="M0,64L80,96C160,128,320,192,480,218.7C640,245,800,235,960,197.3C1120,160,1280,96,1360,64L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
            </div>
            <div className={Css.waveBlock} style={{ background: 'var(--color-principal)' }}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#0f172a" fillOpacity="1" d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,192C672,203,768,181,864,176C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            {/* ===== FOOTER ===== */}
            <footer className={Css.footer}>
                <div className={Css.footerGrid}>
                    <div className={Css.footerInfo}>
                        <div className={Css.footerLogo}>
                            <img src={Logo} alt="Logo" />
                            <span>ASORBOL</span>
                        </div>
                        <p>Movimiento de Reforma de la Iglesia Adventista del Séptimo Día</p>
                        <p>Hablar a la gente sobre el amor de Dios. Promover la unidad, la salud y apoyar a los necesitados.</p>
                    </div>

                    <div className={Css.footerLinks}>
                        <h4>Navegación</h4>
                        <a href="#inicio">Inicio</a>
                        <a href="#organizacion">Organización</a>
                        <Link to="/ubicaciones">Sedes</Link>
                        <Link to="/calendario">Calendario</Link>
                    </div>

                    <div className={Css.footerContact}>
                        <h4>Contacto</h4>
                        <div className={Css.contactItem}>
                            <ion-icon name="call-outline"></ion-icon>
                            <span>69258172</span>
                        </div>
                        <div className={Css.contactItem}>
                            <ion-icon name="mail-outline"></ion-icon>
                            <span>asdmrasorbol@gmail.com</span>
                        </div>
                        <div className={Css.contactItem}>
                            <ion-icon name="logo-facebook"></ion-icon>
                            <span>Asociación ASDMR-Oficial</span>
                        </div>
                    </div>
                </div>
                <div className={Css.footerBottom}>
                    <p>© 2026 ASORBOL — Asociación ASDMR. Todos los derechos reservados.</p>
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
                <button className={Css.fabToggle} onClick={() => setSocialOpen(!socialOpen)}>
                    <ion-icon name={socialOpen ? "close-outline" : "share-social-outline"}></ion-icon>
                </button>
            </div>

        </div>
    );
}

export default Index;