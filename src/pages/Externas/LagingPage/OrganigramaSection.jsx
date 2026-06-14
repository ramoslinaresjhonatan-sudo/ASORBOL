import { useState, useEffect } from 'react';
import organizationService from '../../../modules/organigrama/services/organizationService';
import Css from './OrganigramaSection.module.css';

/* ─── Nodo recursivo (solo lectura) ───────────────────────────────────────── */
const OrgNode = ({ node }) => {
    const miembro = node.miembros && node.miembros.length > 0 ? node.miembros[0] : null;
    const nombre = miembro
        ? `${miembro.usuario_detalle.nombres} ${miembro.usuario_detalle.apellidos || ''}`.trim()
        : 'Vacante';
    const telefono = miembro ? miembro.usuario_detalle.telefono : '';
    const foto = miembro ? (miembro.foto_url || miembro.usuario_detalle.foto_url) : null;

    return (
        <div className={Css.nodeWrapper}>
            <div className={`${Css.node} ${!miembro ? Css.vacant : ''}`}>
                <div className={Css.photo}>
                    {foto
                        ? <img src={foto} alt={nombre} />
                        : <ion-icon name="person-outline"></ion-icon>}
                </div>
                <div className={Css.info}>
                    <span className={Css.puesto}>{node.nombre}</span>
                    <h3 className={Css.name}>{nombre}</h3>
                    {telefono && (
                        <div className={Css.phone}>
                            <ion-icon name="call-outline"></ion-icon>
                            <span>{telefono}</span>
                        </div>
                    )}
                </div>
            </div>

            {node.children && node.children.length > 0 && (
                <div className={Css.children}>
                    {node.children.map((child) => (
                        <OrgNode key={child.id} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

/* ─── Sección pública del organigrama ─────────────────────────────────────── */
const OrganigramaSection = () => {
    const [tree, setTree] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await organizationService.getTree();
                if (mounted) setTree(Array.isArray(data) ? (data[0] || null) : null);
            } catch (err) {
                console.error('Error cargando organigrama:', err);
                if (mounted) setError(true);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    return (
        <section className={Css.section} id="organigrama">
            <span className={Css.sectionTag}>Liderazgo</span>
            <h2 className={Css.sectionTitle}>Nuestro Organigrama</h2>
            <p className={Css.sectionSubtitle}>
                Conoce la estructura de liderazgo y los departamentos que sostienen
                la misión de la asociación.
            </p>

            <div className={Css.chartContainer}>
                {loading && <div className={Css.stateBox}>Cargando organigrama…</div>}
                {!loading && error && (
                    <div className={Css.stateBox}>No se pudo cargar el organigrama.</div>
                )}
                {!loading && !error && !tree && (
                    <div className={Css.stateBox}>Aún no hay una estructura definida.</div>
                )}
                {!loading && !error && tree && (
                    <div className={Css.chartScroll}>
                        <OrgNode node={tree} />
                    </div>
                )}
            </div>
        </section>
    );
};

export default OrganigramaSection;
