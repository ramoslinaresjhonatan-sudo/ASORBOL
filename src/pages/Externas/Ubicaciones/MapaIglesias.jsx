import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Css from './MapaIglesias.module.css';

const MapaIglesias = ({ iglesias, selectedDept }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markersRef = useRef([]);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedIglesia, setSelectedIglesia] = useState(null);

    const filteredIglesias = useMemo(() => {
        if (!selectedDept) return iglesias;
        return iglesias.filter(ig => ig.departamento === selectedDept);
    }, [iglesias, selectedDept]);

    const clearMarkers = useCallback(() => {
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];
    }, []);

    // Función para obtener y dibujar la ruta
    const drawRoute = async (targetCoords) => {
        if (!userLocation || !map.current) return;

        try {
            const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${userLocation[0]},${userLocation[1]};${targetCoords[0]},${targetCoords[1]}?overview=full&geometries=geojson`
            );
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0].geometry;

                if (map.current.getSource('route')) {
                    map.current.getSource('route').setData({
                        type: 'Feature',
                        properties: {},
                        geometry: route
                    });
                } else {
                    map.current.addSource('route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: route
                        }
                    });

                    map.current.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#3b82f6',
                            'line-width': 6,
                            'line-opacity': 0.75
                        }
                    });
                }

                // Ajustar vista para ver toda la ruta
                const bounds = new maplibregl.LngLatBounds();
                route.coordinates.forEach(coord => bounds.extend(coord));
                map.current.fitBounds(bounds, {
                    padding: 100,
                    duration: 1500
                });
            }
        } catch (error) {
            console.error("Error al obtener la ruta:", error);
        }
    };

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            center: [-64.9, -17.0],
            zoom: 5.5,
            minZoom: 4, // Permitir un poco más de alejamiento si es necesario
            maxZoom: 18, // Permitir zoom profundo para rutas
            scrollZoom: true, // Habilitar para que la navegación sea útil
            doubleClickZoom: true,
            attributionControl: false
        });

        const geolocate = new maplibregl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
            showUserLocation: true
        });

        map.current.addControl(geolocate, 'top-right');

        geolocate.on('geolocate', (e) => {
            const { longitude, latitude } = e.coords;
            setUserLocation([longitude, latitude]);
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!map.current) return;

        clearMarkers();

        // Limpiar ruta previa si cambia el departamento o se deselecciona
        if (map.current.getSource('route')) {
            map.current.getSource('route').setData({
                type: 'FeatureCollection',
                features: []
            });
        }

        const bounds = new maplibregl.LngLatBounds();

        filteredIglesias.forEach((iglesia) => {
            const el = document.createElement('div');
            el.className = Css.marker;
            el.innerHTML = `
                <div class="${Css.markerPin}">
                    <span></span>
                </div>
                <div class="${Css.markerPulse}"></div>
            `;

            const popup = new maplibregl.Popup({
                offset: [0, -50],
                closeButton: false,
                className: Css.popupWrapper,
                maxWidth: '260px'
            }).setHTML(`
                <div style="font-family: 'Outfit', sans-serif; padding: 1rem;">
                    <span style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8;">
                        ${iglesia.departamento}
                    </span>
                    <h4 style="font-size: 1rem; font-weight: 800; color: #1e293b; margin: 0.4rem 0 0.8rem;">
                        ${iglesia.nombre}
                    </h4>
                    <button id="route-btn-${iglesia.nombre.replace(/\s/g, '')}" style="
                        width: 100%;
                        padding: 0.6rem;
                        background: #3b82f6;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 700;
                        cursor: pointer;
                        margin-bottom: 0.5rem;
                    ">Cómo llegar</button>
                    <a href="${iglesia.ubicacion}" target="_blank" style="
                        display:block; text-align:center; padding: 0.6rem;
                        background: #f1f5f9; color: #1e293b; border-radius: 8px;
                        text-decoration: none; font-weight: 700; font-size: 0.85rem;
                    ">Abrir Google Maps</a>
                </div>
            `);

            const marker = new maplibregl.Marker({
                element: el,
                anchor: 'bottom'
            })
                .setLngLat([iglesia.lng, iglesia.lat])
                .setPopup(popup)
                .addTo(map.current);

            popup.on('open', () => {
                const btn = document.getElementById(`route-btn-${iglesia.nombre.replace(/\s/g, '')}`);
                if (btn) {
                    btn.onclick = () => drawRoute([iglesia.lng, iglesia.lat]);
                }
            });

            markersRef.current.push(marker);
            bounds.extend([iglesia.lng, iglesia.lat]);
        });

        if (filteredIglesias.length > 0) {
            map.current.fitBounds(bounds, {
                padding: 100,
                maxZoom: selectedDept ? 10 : 5.5,
                duration: 1200
            });
        } else if (!selectedDept) {
            map.current.flyTo({ center: [-64.9, -17.0], zoom: 5.5 });
        }
    }, [filteredIglesias, selectedDept, userLocation]);

    return (
        <div className={Css.mapWrapper}>
            <div ref={mapContainer} className={Css.mapContainer} />
            {!userLocation && (
                <div className={Css.locationWarning}>
                    <ion-icon name="navigate-circle-outline"></ion-icon>
                    Activa tu ubicación para ver rutas
                </div>
            )}
            <div className={Css.mapLegend}>
                <span></span> {filteredIglesias.length} sedes en {selectedDept || 'Bolivia'}
            </div>
        </div>
    );
};

export default MapaIglesias;
