import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../componetes/PaletasDeColores.css';
import Css from './Index.module.css';
import iglesiaData from '../../Externas/iglesias.json';

const heroImg = '/imagenes/sinfondo.png';
const colegioImg = '/imagenes/colegio.png';
const sanareImg = '/imagenes/sanare.png';
const logoCeleste = '/imagenes/asorbo-Celeste.png';

const eventos = [
    { 
        name: "Campamento 'Cielos Abiertos'", 
        desc: "Un encuentro espiritual juvenil en el corazón de la naturaleza boliviana.", 
        icon: "bonfire-outline", 
        color: "var(--frosted-blue)", 
        date: "15 - 18 Agosto" 
    },
    { 
        name: "Congreso de Liderazgo", 
        desc: "Capacitación integral para directivos y líderes de todas nuestras sedes.", 
        icon: "megaphone-outline", 
        color: "var(--frozen-water)", 
        date: "22 Septiembre" 
    },
    { 
        name: "Misión Colportaje", 
        desc: "Llevando esperanza a través de la literatura en cada hogar del país.", 
        icon: "book-outline", 
        color: "var(--honeydew)", 
        date: "Todo el año" 
    },
    { 
        name: "Campaña 'Vida Sana'", 
        desc: "Jornadas gratuitas de salud preventiva y nutrición para la comunidad.", 
        icon: "heart-circle-outline", 
        color: "var(--eggshell)", 
        date: "10 Octubre" 
    }
];

const socialLinks = [
    { icon: "logo-whatsapp", color: "#25D366", label: "WhatsApp" },
    { icon: "logo-facebook", color: "#1877F2", label: "Facebook" },
    { icon: "logo-instagram", label: "Instagram", isGradient: true },
    { icon: "logo-youtube", color: "#FF0000", label: "YouTube" }
];

function Index() {
    const Logo = '/imagenes/asorbolNegro.png';
    const [socialOpen, setSocialOpen] = useState(false);
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
                    <Link to="/ubicaciones">Sedes</Link>
                    <Link to="/calendario">Calendario</Link>
                    <a href="#instituciones">Instituciones</a>
                </nav>
            </header>

            {/* ===== HERO SECTION ===== */}
            <section className={Css.hero} id="inicio">
                <div className={Css.heroInner}>
                    <div className={Css.heroContent}>
                        <span className={Css.intro}>Unidos por la Esperanza</span>
                        <h1>Crece por dentro<br />y sirve afuera</h1>
                        <p>
                            Educación, valores y proyectos de ayuda social en un solo lugar. 
                            Seguimos la misión de Jesús: salvar y restaurar vidas en toda Bolivia.
                        </p>
                        <div className={Css.btnGroup}>
                            <Link to="/login" className={Css.btnPrimary} style={{textDecoration: 'none'}}>
                                Iniciar Sesión
                            </Link>
                            <button className={Css.btnSecondary}>Conócenos</button>
                        </div>
                    </div>

                    <div className={Css.heroImageContainer}>
                        <div className={Css.heroCircle}></div>
                        <img src={heroImg} alt="Comunidad" className={Css.heroImage} />
                        <span className={`${Css.heroDeco} ${Css.deco1}`}>✦</span>
                        <span className={`${Css.heroDeco} ${Css.deco2}`}>✧</span>
                        <span className={`${Css.heroDeco} ${Css.deco3}`}>✦</span>
                    </div>
                </div>
            </section>

            {/* ===== ABOUT / ORGANIZACIÓN ===== */}
            <section className={Css.aboutSection} id="organizacion">
                <span className={Css.sectionTag}>Nuestra Filosofía</span>
                <h2 className={Css.sectionTitle}>Misión que Restaura</h2>
                <p className={Css.sectionSubtitle}>
                    Creemos que el cambio real comienza en el corazón. Por eso, combinamos 
                    la formación espiritual con proyectos tangibles que impactan la sociedad, 
                    llevando el mensaje de Jesús a través del servicio y la educación integral.
                </p>
                <div className={Css.aboutGrid}>
                    <div className={Css.aboutImage}>
                        <img src={heroImg} alt="Misión" style={{background: 'var(--frosted-blue)'}} />
                    </div>
                    <div className={Css.aboutText}>
                        <h3>Unidad y Propósito</h3>
                        <p>
                            Trabajamos coordinadamente a través de diferentes roles funcionales 
                            para garantizar un servicio eficiente a la hermandad. Nuestro objetivo es 
                            mantener una estructura organizativa sólida.
                        </p>
                        <p>
                            Desde la gestión administrativa hasta las misiones locales, 
                            cada parte de nuestra estructura cumple un propósito divino y social.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== NUESTRAS SEDES (Mapa Ilustrado) ===== */}
            <section className={Css.sedesSection}>
                <div className={Css.sedesGrid}>
                    <div className={Css.sedesContent}>
                        <span className={Css.sectionTag}>Presencia Nacional</span>
                        <h2 className={Css.sectionTitle}>Estamos en toda Bolivia</h2>
                        <p className={Css.sectionSubtitle} style={{marginBottom: '2.5rem'}}>
                            Nuestra misión no tiene fronteras. Contamos con sedes, colegios y centros 
                            de salud en cada departamento, llevando esperanza y restauración a cada hogar.
                        </p>
                        <Link to="/ubicaciones" className={Css.btnPrimary}>
                            Explorar Mapa Interactivo
                        </Link>
                    </div>

                    <div className={Css.mapIllustrationContainer}>
                        <div className={Css.mapGlow}></div>
                        {/* Ilustración 3D Isométrica de Bolivia */}
                        <svg viewBox="0 0 500 500" className={Css.isometricMap}>
                            <defs>
                                <linearGradient id="pinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style={{stopColor: 'var(--frosted-blue)', stopOpacity: 1}} />
                                    <stop offset="100%" style={{stopColor: 'var(--deep-aqua)', stopOpacity: 1}} />
                                </linearGradient>
                                <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
                                    <feOffset dx="0" dy="15" result="offsetblur" />
                                    <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
                                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                            </defs>

                            {/* Base del Mapa (Isométrica) */}
                            <g transform="translate(250, 300) scale(1, 0.6) rotate(45)">
                                <rect x="-150" y="-150" width="300" height="300" rx="40" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="4" />
                                <rect x="-140" y="-140" width="280" height="280" rx="30" fill="var(--frozen-water)" />
                                
                                {/* Caminos abstractos */}
                                <path d="M-140,0 L140,0 M0,-140 L0,140 M-70,-140 L-70,140 M70,-140 L70,140" stroke="white" strokeWidth="12" strokeLinecap="round" opacity="0.5" />
                                <path d="M-140,20 C-50,20 50,-50 140,-50" fill="none" stroke="var(--frosted-blue)" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
                                
                                {/* Áreas verdes/mint */}
                                <circle cx="-80" cy="-80" r="40" fill="var(--mint-bg)" opacity="0.6" />
                                <circle cx="80" cy="80" r="30" fill="var(--mint-bg)" opacity="0.6" />
                            </g>

                            {/* Sombra del Pin en el suelo */}
                            <ellipse cx="250" cy="310" rx="30" ry="10" fill="rgba(0,0,0,0.1)" />

                            {/* Pin 3D Flotante */}
                            <g className={Css.floatingPin} filter="url(#pinShadow)">
                                <path 
                                    d="M250,280 C210,280 180,240 180,200 C180,150 210,120 250,120 C290,120 320,150 320,200 C320,240 290,280 250,280 Z" 
                                    fill="url(#pinGradient)" 
                                />
                                <circle cx="250" cy="200" r="25" fill="white" />
                                <path d="M250,280 L235,320 L250,340 L265,320 Z" fill="var(--deep-aqua)" />
                            </g>
                        </svg>
                    </div>
                </div>
            </section>

            {/* ===== CARDS / INSTITUCIONES ===== */}
            <section className={Css.servicesSection} id="instituciones">
                <div className={Css.servicesSectionInner}>
                    <span className={Css.sectionTag} style={{color: 'rgba(255,255,255,0.8)', textAlign: 'center', display: 'block'}}>Educación y Salud</span>
                    <h2 className={Css.servicesTitle}>Centros de Servicio</h2>
                    <p className={Css.servicesSubtitle}>
                        Instituciones dedicadas a la formación integral y el cuidado de la salud.
                    </p>
                    
                    <div className={Css.cardsGrid}>
                        <div className={Css.card}>
                            <div className={Css.cardImage}>
                                <img src={colegioImg} alt="Colegio" />
                            </div>
                            <span className={Css.iglesiaDept} style={{marginBottom: '1rem', display: 'inline-block'}}>Educación</span>
                            <h3>Colegio John Andrews</h3>
                            <p>Formación académica de excelencia fomentando valores integrales desde la infancia.</p>
                        </div>
                        
                        <div className={Css.card}>
                            <div className={Css.cardImage}>
                                <img src={sanareImg} alt="Sanatorio" />
                            </div>
                            <span className={Css.iglesiaDept} style={{marginBottom: '1rem', display: 'inline-block'}}>Salud</span>
                            <h3>Sanatorio Sanare</h3>
                            <p>Atención médica de calidad con un enfoque preventivo y natural para toda la familia.</p>
                        </div>
                        
                        <div className={Css.card}>
                            <div className={Css.cardImage}>
                                <img src={logoCeleste} alt="Escuela Superior" style={{objectFit: 'contain', padding: '1rem', background: '#f8fafc'}} />
                            </div>
                            <span className={Css.iglesiaDept} style={{marginBottom: '1rem', display: 'inline-block'}}>Teología</span>
                            <h3>Escuela Sinaí</h3>
                            <p>Preparación ministerial y teológica profunda para los futuros líderes espirituales.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== EVENTOS ===== */}
            <section className={Css.section} id="eventos" style={{background: 'white'}}>
                <div className={Css.container}>
                    <span className={Css.sectionTag} style={{textAlign: 'center', display: 'block'}}>Próximamente</span>
                    <h2 className={Css.sectionTitle} style={{textAlign: 'center'}}>Nuestros Eventos</h2>
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
                                <div key={i} className={Css.eventCard} style={{ background: evt.color }}>
                                    <div className={Css.eventHeader}>
                                        <span className={Css.eventDate}>{evt.date}</span>
                                        <ion-icon name={evt.icon}></ion-icon>
                                    </div>
                                    <h4>{evt.name}</h4>
                                    <p>{evt.desc}</p>
                                    <button 
                                        className={Css.eventBtn}
                                        onClick={() => setSelectedEvent(evt)}
                                    >
                                        Más información
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

            {/* ===== TESTIMONIOS ===== */}
            <section className={Css.testimonialSection}>
                <div className={Css.testimonialGrid}>
                    <div className={Css.testimonialContent}>
                        <span className={Css.sectionTag}>Inspiración</span>
                        <h2>Llamados a Servir</h2>
                        <p className={Css.testimonialQuote}>
                            "La misión no es un destino, es el camino que recorremos juntos cada día, 
                            llevando luz donde hay oscuridad y esperanza donde hay necesidad. Nuestra 
                            fuerza radica en la unidad de nuestra hermandad."
                        </p>
                        <div className={Css.testimonialAuthor}>Pr. Juan Pérez</div>
                        <div className={Css.testimonialRole}>Presidente, Unión Boliviana</div>
                    </div>
                    <div className={Css.testimonialImage}>
                        <img src={heroImg} alt="Liderazgo" style={{background: 'var(--honeydew)'}} />
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className={Css.ctaSection}>
                <div className={Css.ctaInner}>
                    <span className={Css.sectionTag}>Conéctate</span>
                    <h2>Únete a lo que Dios está haciendo</h2>
                    <p>
                        No somos solo una organización, somos una familia en movimiento. 
                        Síguenos y únete a lo que Dios está haciendo en nuestra región, 
                        llevando luz y esperanza a cada hogar.
                    </p>
                    <form className={Css.ctaForm} onSubmit={e => e.preventDefault()}>
                        <input type="email" placeholder="Tu correo electrónico" className={Css.ctaInput} required />
                        <button type="submit" className={Css.ctaBtn}>Suscribirse</button>
                    </form>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className={Css.footer}>
                <div className={Css.footerGrid}>
                    <div className={Css.footerInfo}>
                        <div className={Css.footerLogo}>
                            <img src={Logo} alt="Logo" />
                            <span>ASORBOL</span>
                        </div>
                        <p>Asociación ASDMR</p>
                        <p>Llevando esperanza y restauración a cada rincón de nuestra región.</p>
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
                        <div 
                            key={i} 
                            className={`${Css.fabItem} ${link.isGradient ? Css.instaFab : ''}`}
                            style={{ '--fab-color': link.color, '--i': i }}
                        >
                            <span className={Css.fabLabel}>{link.label}</span>
                            <ion-icon name={link.icon}></ion-icon>
                        </div>
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