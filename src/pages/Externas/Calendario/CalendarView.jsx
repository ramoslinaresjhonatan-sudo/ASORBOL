import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../PaletaDeColores.css';
import './PaletasDeColores.css';
import styles from './CalendarView.module.css';
import landing from '../LagingPage/Index.module.css';
import { getEventos } from '../../../modules/cronogramas/services/cronogramasService';

const Logo = '/Recursos de documentacion/imagenesPNG/logo-letra-asulOscuro-asulOscuro-blanco-horizontal.png';

const monthImages = {
    0: '/imagenes/calendario/0.png',
    1: '/imagenes/calendario/1.png',
    2: '/imagenes/calendario/2.png',
    3: '/imagenes/calendario/3.png',
    4: '/imagenes/calendario/0.png',
    5: '/imagenes/calendario/1.png',
    6: '/imagenes/calendario/2.png',
    7: '/imagenes/calendario/3.png',
    8: '/imagenes/calendario/0.png',
    9: '/imagenes/calendario/1.png',
    10: '/imagenes/calendario/2.png',
    11: '/imagenes/calendario/3.png',
};

const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
const firstDay = (y, m) => new Date(y, m, 1).getDay();

/* ─── Utilidades de fecha ─────────────────────────────────────────────────── */
// Convierte "YYYY-MM-DD" → Date local (a medianoche, sin desfase de zona horaria)
const parseDate = (str) => {
    if (!str) return null;
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
};

const dateKey = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

// ¿El evento ocurre en la fecha dada? (entre fecha_inicio y fecha_fin, ambos inclusive)
const eventOnDate = (evt, date) => {
    const start = parseDate(evt.fecha_inicio);
    if (!start) return false;
    const end = parseDate(evt.fecha_fin) || start;
    const t = date.getTime();
    return t >= start.getTime() && t <= end.getTime();
};

const eventInMonth = (evt, date) => {
    const start = parseDate(evt.fecha_inicio);
    if (!start) return false;
    const end = parseDate(evt.fecha_fin) || start;
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return start <= monthEnd && end >= monthStart;
};

const formatShort = (str) => {
    const d = parseDate(str);
    if (!d) return '—';
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};

const formatLong = (str) => {
    const d = parseDate(str);
    if (!d) return '—';
    return `${d.getDate()} de ${monthNames[d.getMonth()]} de ${d.getFullYear()}`;
};

// Estado del evento según sus fechas y el flag activo
const today0 = (() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; })();
const getEstado = (evt) => {
    if (evt.activo === false) return { label: 'Cancelado', color: '#ef4444' };
    const fin = parseDate(evt.fecha_fin);
    const inicio = parseDate(evt.fecha_inicio);
    if (fin && fin < today0) return { label: 'Finalizado', color: '#64748b' };
    if (inicio && inicio <= today0) return { label: 'En Curso', color: '#10b981' };
    return { label: 'Programado', color: 'var(--frosted-blue)' };
};

const getAficheUrl = (evt) => evt.afiche_detalle?.url || evt.afiche_url || null;
const getColor = (evt) => evt.categoria_detalle?.color || 'var(--color-principal)';

/* ─── Grilla de días ──────────────────────────────────────────────────────── */
const DayGrid = ({ date, selectedDate, onSelect, eventsByDay }) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const total = daysInMonth(year, month);
    const start = firstDay(year, month);

    const cells = [];
    for (let i = 0; i < start; i++) cells.push(<div key={`e${i}`} className={styles.dayEmpty} />);

    for (let d = 1; d <= total; d++) {
        const current = new Date(year, month, d);
        const isToday = new Date().toDateString() === current.toDateString();
        const isSel = selectedDate.toDateString() === current.toDateString();
        const dayEvents = eventsByDay[dateKey(current)] || [];

        cells.push(
            <div
                key={d}
                className={`${styles.day} ${isToday ? styles.today : ''} ${isSel ? styles.selected : ''} ${dayEvents.length ? styles.hasEvents : ''}`}
                onClick={() => onSelect(current)}
                title={dayEvents.length ? dayEvents.map(e => e.nombre).join(', ') : undefined}
            >
                <span className={styles.dayNum}>{d}</span>
                {dayEvents.length > 0 && (
                    <div className={styles.dayDots}>
                        {dayEvents.slice(0, 3).map((e, i) => (
                            <span key={i} className={styles.dot} style={{ background: getColor(e) }} />
                        ))}
                    </div>
                )}
            </div>
        );
    }
    return <div className={styles.grid}>{cells}</div>;
};

const SheetContent = ({ date, selectedDate, onSelect, onPrev, onNext, showNav, eventsByDay }) => (
    <div className={styles.sheetInner}>
        <div className={styles.posterSide}>
            <img src={monthImages[date.getMonth()]} alt="poster" className={styles.posterImg} />
            <div className={styles.posterCaption}>
                <h2 className={styles.posterMonthName}>{monthNames[date.getMonth()].toUpperCase()}</h2>
            </div>
        </div>

        <div className={styles.calSide}>
            <div className={styles.calHeader}>
                <span className={styles.calNum}>{String(date.getMonth() + 1).padStart(2, '0')}</span>
                <div className={styles.calHeaderInfo}>
                    <h1 className={styles.calMonthName}>{monthNames[date.getMonth()]}</h1>
                    <span className={styles.calYear}>{date.getFullYear()}</span>
                </div>
                {showNav && (
                    <div className={styles.calArrows}>
                        <button onClick={onPrev} className={styles.arrowBtn} aria-label="Mes anterior">
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </button>
                        <button onClick={onNext} className={styles.arrowBtn} aria-label="Mes siguiente">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.dayNames}>
                {dayNames.map(d => <span key={d}>{d}</span>)}
            </div>
            <DayGrid date={date} selectedDate={selectedDate} onSelect={onSelect} eventsByDay={eventsByDay} />
        </div>
    </div>
);

/* ─── Tarjeta de evento en el panel ───────────────────────────────────────── */
const EventCard = ({ evt, onOpen }) => {
    const estado = getEstado(evt);
    const afiche = getAficheUrl(evt);
    const color = getColor(evt);

    return (
        <button className={styles.eventCard} style={{ '--evt-color': color }} onClick={() => onOpen(evt)}>
            <div className={styles.eventThumb}>
                {afiche
                    ? <img src={afiche} alt={evt.nombre} />
                    : <div className={styles.eventThumbEmpty}><ion-icon name="calendar-outline"></ion-icon></div>}
            </div>

            <div className={styles.eventBody}>
                <div className={styles.eventTitleRow}>
                    <h3 className={styles.eventName}>{evt.nombre}</h3>
                    <span className={styles.statusPill} style={{ color: estado.color, borderColor: estado.color }}>
                        {estado.label}
                    </span>
                </div>

                <div className={styles.metaRow}>
                    {evt.categoria_detalle && (
                        <span className={styles.catChip} style={{ background: color }}>
                            {evt.categoria_detalle.nombre}
                        </span>
                    )}
                    <span className={styles.metaItem}>
                        <ion-icon name="calendar-clear-outline"></ion-icon>
                        {formatShort(evt.fecha_inicio)}
                        {evt.fecha_fin && evt.fecha_fin !== evt.fecha_inicio ? ` → ${formatShort(evt.fecha_fin)}` : ''}
                    </span>
                    {evt.lugar && <span className={styles.metaItem}><ion-icon name="location-outline"></ion-icon>{evt.lugar}</span>}
                    {evt.encargado_detalle?.nombre && <span className={styles.metaItem}><ion-icon name="person-outline"></ion-icon>{evt.encargado_detalle.nombre}</span>}
                </div>

                {evt.descripcion && <p className={styles.eventDesc}>{evt.descripcion}</p>}

                {evt.dirigido_detalle?.length > 0 && (
                    <div className={styles.pillRow}>
                        {evt.dirigido_detalle.map(d => (
                            <span key={d.id} className={styles.pill}>{d.nombre}</span>
                        ))}
                    </div>
                )}
            </div>
        </button>
    );
};

/* ─── Modal de detalle completo ───────────────────────────────────────────── */
const EventModal = ({ evt, onClose }) => {
    if (!evt) return null;
    const estado = getEstado(evt);
    const afiche = getAficheUrl(evt);
    const color = getColor(evt);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={onClose}>✕</button>

                <div className={styles.modalPoster} style={{ background: color }}>
                    {afiche
                        ? <img src={afiche} alt={evt.nombre} />
                        : <div className={styles.modalPosterEmpty}><ion-icon name="calendar-outline"></ion-icon></div>}
                </div>

                <div className={styles.modalInfo}>
                    <span className={styles.statusPill} style={{ color: estado.color, borderColor: estado.color }}>
                        {estado.label}
                    </span>
                    <h2 className={styles.modalTitle}>{evt.nombre}</h2>

                    {evt.categoria_detalle && (
                        <span className={styles.catChip} style={{ background: color, marginBottom: '0.5rem' }}>
                            {evt.categoria_detalle.nombre}
                        </span>
                    )}

                    {evt.descripcion && <p className={styles.modalDesc}>{evt.descripcion}</p>}

                    <div className={styles.modalDetails}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}><ion-icon name="calendar-clear-outline"></ion-icon>Inicio</span>
                            <span className={styles.detailValue}>{formatLong(evt.fecha_inicio)}</span>
                        </div>
                        {evt.fecha_fin && (
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}><ion-icon name="flag-outline"></ion-icon>Fin</span>
                                <span className={styles.detailValue}>{formatLong(evt.fecha_fin)}</span>
                            </div>
                        )}
                        {evt.lugar && (
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}><ion-icon name="location-outline"></ion-icon>Lugar</span>
                                <span className={styles.detailValue}>{evt.lugar}</span>
                            </div>
                        )}
                        {evt.encargado_detalle?.nombre && (
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}><ion-icon name="person-outline"></ion-icon>Encargado</span>
                                <span className={styles.detailValue}>{evt.encargado_detalle.nombre}</span>
                            </div>
                        )}
                        {evt.dirigido_detalle?.length > 0 && (
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}><ion-icon name="people-outline"></ion-icon>Dirigido a</span>
                                <span className={styles.detailValue}>
                                    <div className={styles.pillRow}>
                                        {evt.dirigido_detalle.map(d => (
                                            <span key={d.id} className={styles.pill}>{d.nombre}</span>
                                        ))}
                                    </div>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── Componente principal ────────────────────────────────────────────────── */
const CalendarView = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [flipping, setFlipping] = useState(false);

    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dayFilter, setDayFilter] = useState(null);     // fecha seleccionada para filtrar
    const [openEvent, setOpenEvent] = useState(null);     // evento abierto en el modal
    const [scrolled, setScrolled] = useState(false);

    // Efecto de sombra del header al hacer scroll (igual que el landing)
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await getEventos();
                if (mounted) setEventos(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error cargando eventos:', err);
                if (mounted) setError('No se pudieron cargar los eventos.');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    // Mapa: clave de día → eventos que ocurren ese día (para los puntos en la grilla)
    const eventsByDay = useMemo(() => {
        const map = {};
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const total = daysInMonth(year, month);
        for (let d = 1; d <= total; d++) {
            const day = new Date(year, month, d);
            const list = eventos.filter(e => eventOnDate(e, day));
            if (list.length) map[dateKey(day)] = list;
        }
        return map;
    }, [eventos, currentDate]);

    // Eventos visibles en el panel: filtrados por día o todos (ordenados por fecha de inicio)
    const visibleEvents = useMemo(() => {
        if (dayFilter) return eventos.filter(e => eventOnDate(e, dayFilter));
        return [...eventos].sort((a, b) => (a.fecha_inicio || '').localeCompare(b.fecha_inicio || ''));
    }, [eventos, dayFilter]);

    const monthEvents = useMemo(
        () => eventos.filter(e => eventInMonth(e, currentDate)),
        [eventos, currentDate]
    );

    const upcomingEvents = useMemo(
        () => eventos.filter(e => {
            const end = parseDate(e.fecha_fin) || parseDate(e.fecha_inicio);
            return end && end >= today0 && e.activo !== false;
        }),
        [eventos]
    );

    const changeMonth = (offset) => {
        if (flipping) return;
        const nd = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
        setNextDate(nd);
        setFlipping(true);
        setTimeout(() => {
            setCurrentDate(nd);
            setFlipping(false);
        }, 700);
    };

    const handleSelectDay = (date) => {
        setSelectedDate(date);
        const has = eventos.some(e => eventOnDate(e, date));
        setDayFilter(has ? date : null);
    };

    return (
        <div className={styles.page}>
            {/* ===== HEADER (igual que el landing) ===== */}
            <header className={`${landing.header} ${scrolled ? landing.scrolled : ''}`}>
                <Link to="/" className={landing.logoContainer} style={{ textDecoration: 'none' }}>
                    <img src={Logo} alt="Logo" />
                    <span>ASORBOL</span>
                </Link>
                <nav className={landing.nav}>
                    <Link to="/">Inicio</Link>
                    <Link to="/ubicaciones">Sedes</Link>
                    <Link to="/calendario">Calendario</Link>
                    <Link to="/donaciones" className={landing.btnDonar}>Donar</Link>
                </nav>
            </header>

            <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Volver">
                <ion-icon name="arrow-back-outline"></ion-icon>
            </button>

            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.sectionTag}>Agenda institucional</span>
                    <h1>Calendario ASORBOL</h1>
                    <p>
                        Actividades, encuentros y programas organizados para acompañar la vida de la iglesia en cada etapa del año.
                    </p>
                    <div className={styles.heroActions}>
                        <button className={styles.btnPrimary} onClick={() => setDayFilter(null)}>
                            Ver todos
                        </button>
                        <Link to="/" className={styles.btnSecondary}>Inicio</Link>
                    </div>
                </div>
                <div className={styles.heroStats}>
                    <div className={styles.statCard}>
                        <span>{eventos.length}</span>
                        <p>Eventos registrados</p>
                    </div>
                    <div className={styles.statCard}>
                        <span>{monthEvents.length}</span>
                        <p>Este mes</p>
                    </div>
                    <div className={styles.statCard}>
                        <span>{upcomingEvents.length}</span>
                        <p>Próximos</p>
                    </div>
                </div>
            </section>

            <div className={styles.layout}>
                <div className={styles.calendar}>
                    {/* Espiral oscuro */}
                    <div className={styles.rings}>
                        {[...Array(11)].map((_, i) => (
                            <div key={i} className={styles.ringUnit}>
                                <div className={styles.ringBack} />
                                <div className={styles.ringFront} />
                            </div>
                        ))}
                    </div>

                    {/* Hojas apiladas (Efecto de bloque de papel grueso) */}
                    <div className={styles.stack8} />
                    <div className={styles.stack7} />
                    <div className={styles.stack6} />
                    <div className={styles.stack5} />
                    <div className={styles.stack4} />
                    <div className={styles.stack3} />
                    <div className={styles.stack2} />
                    <div className={styles.stack1} />

                    {/* Escena 3D */}
                    <div className={styles.scene}>
                        {/* Hoja inferior (se revela) */}
                        <div className={styles.under}>
                            <SheetContent
                                date={nextDate}
                                selectedDate={selectedDate}
                                onSelect={handleSelectDay}
                                showNav={false}
                                eventsByDay={eventsByDay}
                            />
                        </div>

                        {/* Hoja que voltea hacia arriba y adelante */}
                        <div className={`${styles.flipper} ${flipping ? styles.flipping : ''}`}>
                            <div className={styles.flipFront}>
                                <SheetContent
                                    date={currentDate}
                                    selectedDate={selectedDate}
                                    onSelect={handleSelectDay}
                                    onPrev={() => changeMonth(-1)}
                                    onNext={() => changeMonth(1)}
                                    showNav={true}
                                    eventsByDay={eventsByDay}
                                />
                            </div>
                            <div className={styles.flipBack} />
                        </div>
                    </div>
                </div>

                {/* ===== PANEL DE EVENTOS ===== */}
                <div className={styles.eventsPanel}>
                    <div className={styles.panelHeader}>
                        <div>
                            <h2 className={styles.panelTitle}>
                                {dayFilter
                                    ? `Eventos del ${dayFilter.getDate()} de ${monthNames[dayFilter.getMonth()]}`
                                    : 'Todos los eventos'}
                            </h2>
                            <p className={styles.panelSubtitle}>
                                {loading ? 'Cargando…' : `${visibleEvents.length} evento(s)`}
                            </p>
                        </div>
                        {dayFilter && (
                            <button className={styles.clearFilter} onClick={() => setDayFilter(null)}>
                                Ver todos ✕
                            </button>
                        )}
                    </div>

                    {loading && <div className={styles.stateBox}>Cargando eventos…</div>}
                    {error && !loading && <div className={styles.stateBox}>{error}</div>}
                    {!loading && !error && visibleEvents.length === 0 && (
                        <div className={styles.stateBox}>
                            {dayFilter ? 'No hay eventos para este día.' : 'No hay eventos registrados.'}
                        </div>
                    )}

                    {!loading && !error && visibleEvents.length > 0 && (
                        <div className={styles.eventsList}>
                            {visibleEvents.map(evt => (
                                <EventCard key={evt.id} evt={evt} onOpen={setOpenEvent} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de detalle */}
            <EventModal evt={openEvent} onClose={() => setOpenEvent(null)} />
        </div>
    );
};

export default CalendarView;
