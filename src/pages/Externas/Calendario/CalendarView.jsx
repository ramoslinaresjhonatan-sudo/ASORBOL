import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaletasDeColores.css';
import styles from './CalendarView.module.css';

const monthImages = {
    0: '/imagenes/calendario/0.png',
    1: '/imagenes/calendario/1.png',
    2: '/imagenes/calendario/2.png',
    3: '/imagenes/calendario/3.png',
    4: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000',
    5: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
    6: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1000',
    7: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
    8: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000',
    9: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000',
    10: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000',
    11: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=1000',
};

const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
const firstDay = (y, m) => new Date(y, m, 1).getDay();

const DayGrid = ({ date, selectedDate, onSelect }) => {
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
        cells.push(
            <div
                key={d}
                className={`${styles.day} ${isToday ? styles.today : ''} ${isSel ? styles.selected : ''}`}
                onClick={() => onSelect(current)}
            >
                {d}
            </div>
        );
    }
    return <div className={styles.grid}>{cells}</div>;
};

const SheetContent = ({ date, selectedDate, onSelect, onPrev, onNext, showNav }) => (
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
                        <button onClick={onPrev} className={styles.arrowBtn}>‹</button>
                        <button onClick={onNext} className={styles.arrowBtn}>›</button>
                    </div>
                )}
            </div>
            <div className={styles.dayNames}>
                {dayNames.map(d => <span key={d}>{d}</span>)}
            </div>
            <DayGrid date={date} selectedDate={selectedDate} onSelect={onSelect} />
        </div>
    </div>
);

const CalendarView = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [flipping, setFlipping] = useState(false);

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

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>←</button>

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
                            onSelect={setSelectedDate}
                            showNav={false}
                        />
                    </div>

                    {/* Hoja que voltea hacia arriba y adelante */}
                    <div className={`${styles.flipper} ${flipping ? styles.flipping : ''}`}>
                        <div className={styles.flipFront}>
                            <SheetContent
                                date={currentDate}
                                selectedDate={selectedDate}
                                onSelect={setSelectedDate}
                                onPrev={() => changeMonth(-1)}
                                onNext={() => changeMonth(1)}
                                showNav={true}
                            />
                        </div>
                        <div className={styles.flipBack} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;