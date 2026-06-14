import React from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import { Link } from 'react-router-dom';
import '../../../PaletaDeColores.css';
import styles from './DonacionesPage.module.css';
import { MdFavorite, MdCloudUpload, MdCheckCircle, MdError, MdAccountBalance, MdPerson, MdCategory, MdArrowDropDown, MdEdit } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const CATEGORIAS = [
  { value: '', label: 'Selecciona el destino' },
  { value: 'diezmo', label: 'Diezmo' },
  { value: 'salud', label: 'Salud' },
  { value: 'construccion', label: 'Donación de Construcción' },
  { value: 'misiones', label: 'Misiones' },
  { value: 'educacion', label: 'Educación' },
  { value: 'otros', label: 'Otros aportes' },
];

const Logo = '/Recursos de documentacion/imagenesPNG/logo-letra-asulOscuro-asulOscuro-blanco-horizontal.png';

const DonacionesPage = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [uploadStatus, setUploadStatus] = React.useState('idle');
  const [extractedData, setExtractedData] = React.useState(null);
  const [originante, setOriginante] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [categoria, setCategoria] = React.useState('');
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setExtractedData(null);
      setOriginante('');
      setErrorMessage('');
      const reader = new FileReader();
      reader.onloadend = async () => await analyzeWithIA(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const analyzeWithIA = async (base64Image) => {
    try {
      setUploadStatus('loading_ia');
      setErrorMessage('Analizando comprobante...');
      const { data: { text } } = await Tesseract.recognize(base64Image, 'spa');
      if (!text || text.trim().length < 10) throw new Error("No se pudo leer el texto del comprobante.");

      const apiKey = import.meta.env.VITE_API_KEY_GROQ;
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "Experto en comprobantes bancarios. Extrae: originante, id_transaccion, monto, fecha, hora. Solo JSON."
            },
            {
              role: "user",
              content: `Extrae JSON de este texto: ${text}`
            }
          ],
          response_format: { type: "json_object" }
        },
        { headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
      );

      const data = JSON.parse(response.data.choices[0].message.content);
      setExtractedData(data);
      setOriginante(data.originante || '');
      setUploadStatus('idle');
    } catch (error) {
      setErrorMessage("Error al procesar la imagen. Inténtalo de nuevo.");
      setUploadStatus('error_ia');
    }
  };

  const categoriaActual = CATEGORIAS.find(c => c.value === categoria);

  return (
    <div className={styles.page}>
      {/* ===== HEADER ===== */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.logoContainer}>
            <img src={Logo} alt="Logo" />
            <span>ASORBOL</span>
        </div>
        <nav className={styles.nav}>
            <Link to="/">Inicio</Link>
            <Link to="/#organizacion">Organización</Link>
            <Link to="/ubicaciones">Sedes</Link>
            <Link to="/calendario">Calendario</Link>
            <Link to="/#instituciones">Instituciones</Link>
            <Link to="/donaciones" className={styles.btnDonar}>Donar</Link>
        </nav>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.sectionTag}>Generosidad que restaura</span>
            <h1>Apoya nuestra misión</h1>
            <p>
              Tu donación nos permite seguir llevando esperanza y ayuda práctica a quienes más lo necesitan. Registra tu aporte de forma segura y transparente.
            </p>
          </div>
        </div>
        <div className={styles.heroWaveContainer}>
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#ffffff" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,218.7C672,213,768,139,864,117.3C960,96,1056,128,1152,154.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
      </section>

      <main className={styles.container}>
        <div className={styles.grid}>
          {/* Panel de Información Bancaria */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelIcon}><MdAccountBalance /></div>
              <h2 className={styles.sectionTitle}>Cuentas Bancarias</h2>
            </div>
            
            <div className={styles.bankList}>
              <div className={styles.bankRow}>
                <div className={styles.bankIcon}><MdAccountBalance /></div>
                <div className={styles.bankInfo}>
                  <p className={styles.bankLabel}>Banco Destino</p>
                  <p className={styles.bankValue}>Banco BNB / Banco Sol</p>
                </div>
              </div>
              <div className={styles.bankRow}>
                <div className={styles.bankIcon}><MdPerson /></div>
                <div className={styles.bankInfo}>
                  <p className={styles.bankLabel}>Titular de la cuenta</p>
                  <p className={styles.bankValue}>Sorbol S.R.L.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Carga y Resultados */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelIcon}><MdCategory /></div>
              <h2 className={styles.sectionTitle}>Registrar Aporte</h2>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.dataLabel}>Destino del Aporte</label>
              <div className={styles.selectWrapper}>
                <select className={styles.customSelect} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  {CATEGORIAS.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <MdArrowDropDown className={styles.selectArrow} size={28} />
              </div>
            </div>

            <label className={styles.dropzone}>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              {selectedImage
                ? <img src={selectedImage} alt="Preview" className={styles.preview} />
                : (
                  <div className={styles.dropInner}>
                    <MdCloudUpload size={54} />
                    <span>Sube tu comprobante bancario</span>
                    <p>Haz clic para seleccionar o arrastra la imagen</p>
                  </div>
                )}
            </label>

            {uploadStatus === 'loading_ia' && (
              <div className={`${styles.status} ${styles.statusLoad}`}>
                <AiOutlineLoading3Quarters className={styles.spin} size={22} />
                <span>{errorMessage}</span>
              </div>
            )}

            {uploadStatus === 'error_ia' && (
              <div className={`${styles.status} ${styles.statusErr}`}>
                <MdError size={24} />
                <span>{errorMessage}</span>
              </div>
            )}

            {extractedData && uploadStatus === 'idle' && (
              <div className={styles.resultsBox}>
                <div className={styles.resultsHeader}>
                  <p><MdCheckCircle size={20} /> Datos Detectados</p>
                  {categoria && <span className={styles.badge}>{categoriaActual?.label}</span>}
                </div>

                <div className={styles.dataGrid}>
                  <div className={styles.dataCellFull}>
                    <span className={styles.dataLabel}>Nombre del Originante</span>
                    <div className={styles.inputWithIcon}>
                      <MdEdit className={styles.editIcon} />
                      <input
                        className={styles.editableInput}
                        value={originante}
                        onChange={(e) => setOriginante(e.target.value)}
                        placeholder="Nombre completo"
                      />
                    </div>
                  </div>

                  <div className={styles.dataCell}>
                    <span className={styles.dataLabel}>Monto</span>
                    <span className={`${styles.dataText} ${styles.dataAmount}`}>{extractedData.monto}</span>
                  </div>

                  <div className={styles.dataCell}>
                    <span className={styles.dataLabel}>ID Transacción</span>
                    <span className={styles.dataText}>{extractedData.id_transaccion}</span>
                  </div>

                  <div className={styles.dataCell}>
                    <span className={styles.dataLabel}>Fecha</span>
                    <span className={styles.dataText}>{extractedData.fecha}</span>
                  </div>

                  <div className={styles.dataCell}>
                    <span className={styles.dataLabel}>Hora</span>
                    <span className={styles.dataText}>{extractedData.hora}</span>
                  </div>
                </div>

                <button className={styles.confirmBtn}>
                  <MdCheckCircle size={22} /> Confirmar y Registrar
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonacionesPage;
