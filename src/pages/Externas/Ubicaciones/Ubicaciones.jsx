import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import iglesiaData from '../iglesias.json';
import MapaIglesias from './MapaIglesias';
import Css from './Ubicaciones.module.css';

const Logo = '/imagenes/asorbolNegro.png';

function Ubicaciones() {
    const [selectedDept, setSelectedDept] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIglesias = useMemo(() => {
        return iglesiaData.filter(ig => {
            const matchesDept = selectedDept === null || ig.departamento === selectedDept;
            const matchesSearch = ig.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  ig.departamento.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesDept && matchesSearch;
        });
    }, [selectedDept, searchTerm]);

    const departamentos = [...new Set(iglesiaData.map(i => i.departamento))];

    return (
        <div className={Css.ubicacionesPage}>
            {/* Header simple para la vista de ubicaciones */}
            <header className={Css.header}>
                <Link to="/" className={Css.logoContainer}>
                    <img src={Logo} alt="Logo" />
                    <span>ASORBOL</span>
                </Link>
                <nav className={Css.nav}>
                    <Link to="/">Volver al Inicio</Link>
                </nav>
            </header>

            <div className={Css.mainContainer}>
                {/* Panel Lateral: Lista y Filtros */}
                <aside className={Css.sidebar}>
                    <div className={Css.sidebarHeader}>
                        <h2>Nuestras Sedes</h2>
                        <p>Encuentra la iglesia más cercana a ti en toda Bolivia.</p>
                        
                        <div className={Css.searchBox}>
                            <ion-icon name="search-outline"></ion-icon>
                            <input 
                                type="text" 
                                placeholder="Buscar por nombre o ciudad..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className={Css.deptFilters}>
                            <button
                                className={`${Css.filterBtn} ${selectedDept === null ? Css.filterActive : ''}`}
                                onClick={() => setSelectedDept(null)}
                            >
                                Todos
                            </button>
                            {departamentos.map(dept => (
                                <button
                                    key={dept}
                                    className={`${Css.filterBtn} ${selectedDept === dept ? Css.filterActive : ''}`}
                                    onClick={() => setSelectedDept(dept === selectedDept ? null : dept)}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={Css.iglesiasList}>
                        {filteredIglesias.length > 0 ? (
                            filteredIglesias.map((iglesia, i) => (
                                <div key={i} className={Css.iglesiaCard}>
                                    <div className={Css.iglesiaHeader}>
                                        <div className={Css.iglesiaIcon}>
                                            <ion-icon name="business-outline"></ion-icon>
                                        </div>
                                        <span className={Css.iglesiaDept}>{iglesia.departamento}</span>
                                    </div>
                                    <h4 className={Css.iglesiaNombre}>{iglesia.nombre}</h4>
                                    <div className={Css.iglesiaDetails}>
                                        <p>
                                            <ion-icon name="person-outline"></ion-icon>
                                            {iglesia.director}
                                        </p>
                                        <p>
                                            <ion-icon name="call-outline"></ion-icon>
                                            {iglesia.telefono}
                                        </p>
                                    </div>
                                    <a
                                        href={iglesia.ubicacion}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={Css.iglesiaMapBtn}
                                    >
                                        <ion-icon name="location-outline"></ion-icon>
                                        Ver en Google Maps
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className={Css.noResults}>
                                <ion-icon name="sad-outline"></ion-icon>
                                <p>No se encontraron iglesias con esa búsqueda.</p>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Área Principal: Mapa */}
                <main className={Css.mapArea}>
                    <MapaIglesias iglesias={iglesiaData} selectedDept={selectedDept} />
                </main>
            </div>
        </div>
    );
}

export default Ubicaciones;
