import styles from './CasoDeUso.module.css';

const Index = () => {
    return (
        <div className={styles.heroContainer}>
            <div className={styles.heroBackground}></div>
            <div className={styles.heroOverlay}></div>
            
            <div className={styles.heroContent}>
                <span className={styles.badge}>Módulos SORBOL</span>
                <h1>Casos de Uso</h1>
                <p>
                    Explora cómo nuestro sistema transforma la gestión social y educativa, 
                    proporcionando herramientas eficientes para un impacto real en la comunidad.
                </p>
            </div>
        </div>
    );
};

export default Index;